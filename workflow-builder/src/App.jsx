import "./App.css";

import { useState } from "react";
import Node from "./component/Node";

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
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  function updateWorkflow(newWorkflow) {
    setHistory(h => [...h, workflow]);
    setFuture([]);
    setWorkflow(newWorkflow);
  }

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-around", gap: 10, marginBottom: "100px" }}>
        <div>
          <label>click save, to save the workflow!</label>
          <br />
          <button style={{ maxWidth: "fit-content", fontSize: "20px", padding: "5px", borderRadius: "10px" }} onClick={() => console.log(workflow)}>Save</button>
        </div>
        <div>
          <button
            style={{ margin: "10px" }}
            onClick={() => {
              if (history.length === 0) return;
              const prev = history[history.length - 1];
              setFuture(f => [workflow, ...f]);
              setHistory(h => h.slice(0, -1));
              setWorkflow(prev);
            }}
          >
            Undo
          </button>

          <button
            onClick={() => {
              if (future.length === 0) return;
              const next = future[0];
              setHistory(h => [...h, workflow]);
              setFuture(f => f.slice(1));
              setWorkflow(next);
            }}
          >
            Redo
          </button>
        </div>
      </div>




      <Node nodeId={workflow.startNodeId} workflow={workflow} setWorkflow={updateWorkflow} />
    </div>
  );
}