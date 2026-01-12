import "../App.css"

export default function Node({ nodeId, workflow, setWorkflow }) {

  if (!nodeId) return null;     

  const node = workflow.nodes[nodeId];
  if (!node) return null;     

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
            padding: "10px 14px",
            borderRadius: "10px",
            border: "2px solid rgba(255,255,255,0.3)",
            outline: "none",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
            transition: "all 0.2s ease",
            width: "100%",
            cursor: "text"
          }}

        />

        {node.type === "action" && (
          <button onClick={() => addActionAfter(nodeId)}>+</button>
        )}
      </div>

      <div style={{ gap: 10, display:"flex", marginTop:"5px", marginLeft:"-15px" }}>
        <div>
          {node.type === "action" && (
            <button onClick={() => addBranchAfter(nodeId)}>⇄</button>
          )}
        </div>

        <div>
          {nodeId !== workflow.startNodeId && node.type === "action" && (
            <button onClick={() => deleteNode(nodeId)}>🗑</button>
          )}
        </div>
      </div>

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
          <div style={{ textAlign: "center", border: "1px dotted black", padding: "5px", borderRadius: "10px" }}>
            <div>True</div>
            <Node nodeId={node.children.true} workflow={workflow} setWorkflow={setWorkflow} />
          </div>

          <div style={{ textAlign: "center", border: "1px dotted black", padding: "5px", borderRadius: "10px" }}>
            <div>False</div>
            <Node nodeId={node.children.false} workflow={workflow} setWorkflow={setWorkflow} />
          </div>
        </div>
      )}
    </div>
  );

}