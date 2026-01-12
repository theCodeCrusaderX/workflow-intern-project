



function Node({ nodeId, workflow, setWorkflow }) {
    console.log("nodeId - ", nodeId);
    const node = workflow.nodes[nodeId];
    console.log("gama", node);


    return (
        <div style={{ marginLeft: 40, marginTop: 20 }}>
            {/* <div style={{
        padding: "10px 16px",
        border: "2px solid black",
        borderRadius: 6,
        display: "inline-block",
        background: "#f9f9f9"
      }}>
        {node.label} ({node.type})
      </div> */}

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
                    padding: "8px",
                    border: "2px solid black",
                    borderRadius: 6
                }}
            />


            {/* Action Node */}
            {node.type === "action" && node.children.main && (
                <>
                    <div style={{ marginLeft: 20 }}>↓</div>
                    <Node nodeId={node.children.main} />
                </>
            )}

            {/* Branch Node */}
            {node.type === "branch" && (
                <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
                    <div>
                        <div>True</div>
                        <Node nodeId={node.children.true} />
                    </div>

                    <div>
                        <div>False</div>
                        <Node nodeId={node.children.false} />
                    </div>
                </div>
            )}
        </div>
    );
}
