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

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>click save, to save the workflow!</label>
        <button style={{ maxWidth: "fit-content", fontSize: "20px", padding: "5px", borderRadius: "10px" }} onClick={() => console.log(workflow)}>Save</button>
      </div>

      <Node nodeId={workflow.startNodeId} workflow={workflow} setWorkflow={setWorkflow} />
    </div>
  );
}