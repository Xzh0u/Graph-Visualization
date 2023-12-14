import React, { useState } from "react";
import DataReader from "../components/DataReader";
import Visualizer from "../components/Visualizer";
import { GraphData } from "../utils/types";

export default function GraphVisualizer() {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    edges: [],
    combos: [],
  });

  const handleUpdateGraphData = (updatedData: GraphData) => {
    setGraphData(updatedData);
  };

  return (
    <div className="flex-1">
      <DataReader onUpdateGraphData={handleUpdateGraphData} />
      <Visualizer graphData={graphData} />
    </div>
  );
}
