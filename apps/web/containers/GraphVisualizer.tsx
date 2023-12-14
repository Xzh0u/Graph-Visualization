import React, { useState } from 'react';
import DataReader from "../components/DataReader";
import Visualizer from "../components/Visualizer";

export default function GraphVisualizer() {
    const [graphData, setGraphData] = useState({
        nodes: [],
        edges: [],
      });
    
      const handleUpdateGraphData = (updatedData:any) => {
        setGraphData(updatedData);
      };

    return <div className="flex-1">
        <DataReader onUpdateGraphData={handleUpdateGraphData} />
        <Visualizer graphData={graphData} />
    </div>;
}