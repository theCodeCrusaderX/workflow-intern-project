import "./App.css";

import { useState } from "react";

export default function App() {
  const [workflow, setWorkflow] = useState({
    startNodeId: "1",
    nodes: {
      "1": { id: "1", type: "action", label: "Start", children: { main: "2" } },
      "2": { id: "2", type: "action", label: "Send Email", children: { main: "3" } },
      "3": {
        id: "3",
        type: "branch",
        label: "User Paid?",
        children: { true: "4", false: "5" }
      },
      "4": { id: "4", type: "end", label: "Thank You", children: {} },
      "5": { id: "5", type: "end", label: "Ask to Pay", children: {} }
    }
  });

  return (
    <div style={{ padding: 40 }}>
      <Node nodeId={workflow.startNodeId} workflow={workflow} setWorkflow={setWorkflow} />
    </div>
  );
}


function Node({ nodeId, workflow, setWorkflow }) {


  if (!nodeId) return null;     // 👈 very important

  const node = workflow.nodes[nodeId];
  if (!node) return null;      // 👈 safety guard

  function addBranchAfter(parentId) {
    const branchId = Date.now().toString();
    const trueId = (Date.now() + 1).toString();
    const falseId = (Date.now() + 2).toString();

    setWorkflow(prev => {
      const parent = prev.nodes[parentId];
      const oldChild = parent.children.main;

      return {
        ...prev,
        nodes: {
          ...prev.nodes,

          // new branch node
          [branchId]: {
            id: branchId,
            type: "branch",
            label: "Condition",
            children: {
              true: trueId,
              false: falseId
            }
          },

          // true path continues old flow
          [trueId]: {
            id: trueId,
            type: "action",
            label: "True Path",
            children: { main: oldChild }
          },

          // false path ends
          [falseId]: {
            id: falseId,
            type: "end",
            label: "False End",
            children: {}
          },

          // parent now points to branch
          [parentId]: {
            ...parent,
            children: { main: branchId }
          }
        }
      };
    });
  }


  function addActionAfter(parentId) {
    const newId = Date.now().toString();

    setWorkflow(prev => {
      const parent = prev.nodes[parentId];
      const oldChild = parent.children.main;

      return {
        ...prev,
        nodes: {
          ...prev.nodes,
          [newId]: {
            id: newId,
            type: "action",
            label: "New Step",
            children: { main: oldChild }
          },
          [parentId]: {
            ...parent,
            children: { main: newId }
          }
        }
      };
    });
  }


  function deleteNode(targetId) {
    setWorkflow(prev => {
      const newNodes = { ...prev.nodes };
      let parentId = null;
      let parentKey = null;

      // find parent of target
      for (const id in newNodes) {
        const n = newNodes[id];
        for (const key in n.children) {
          if (n.children[key] === targetId) {
            parentId = id;
            parentKey = key;
          }
        }
      }

      if (!parentId) return prev; // should not happen for Start

      const target = newNodes[targetId];
      const parent = newNodes[parentId];

      // figure out what should replace the deleted node
      let replacement = null;

      if (target.type === "action") {
        replacement = target.children.main || null;
      }

      if (target.type === "branch") {
        // we connect parent to true path
        replacement = target.children.true;
      }

      // reconnect parent
      newNodes[parentId] = {
        ...parent,
        children: {
          ...parent.children,
          [parentKey]: replacement
        }
      };

      // remove deleted node
      delete newNodes[targetId];

      return {
        ...prev,
        nodes: newNodes
      };
    });
  }




  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 30 }}>

      {/* Node box */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          value={node.label}
          onChange={(e) => {
            const newLabel = e.target.value;
            setWorkflow(prev => ({
              ...prev,
              nodes: {
                ...prev.nodes,
                [nodeId]: {
                  ...prev.nodes[nodeId],
                  label: newLabel
                }
              }
            }));
          }}
          style={{
            padding: "8px 12px",
            border: "2px solid black",
            borderRadius: 6,
            textAlign: "center",
            fontWeight: "bold"
          }}
        />

        {node.type === "action" && (
          <button onClick={() => addActionAfter(nodeId)}>＋</button>
        )}
      </div>

      {node.type === "action" && (
        <button onClick={() => addBranchAfter(nodeId)}>⇄</button>
      )}

      {nodeId !== workflow.startNodeId && node.type === "action" && (
        <button onClick={() => deleteNode(nodeId)}>🗑</button>
      )}



      {/* Down arrow */}
      {node.type === "action" && node.children.main && <div>↓</div>}

      {/* Action child */}
      {node.type === "action" && node.children.main && (
        <Node
          nodeId={node.children.main}
          workflow={workflow}
          setWorkflow={setWorkflow}
        />
      )}


      {/* Branch children */}
      {node.type === "branch" && (
        <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div>True</div>
            <Node nodeId={node.children.true} workflow={workflow} setWorkflow={setWorkflow} />
          </div>

          <div style={{ textAlign: "center" }}>
            <div>False</div>
            <Node nodeId={node.children.false} workflow={workflow} setWorkflow={setWorkflow} />
          </div>
        </div>
      )}
    </div>
  );

}



