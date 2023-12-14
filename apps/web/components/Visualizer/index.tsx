import dynamic from "next/dynamic";
import React from "react";


const G6component = dynamic(() => import("./G6Component"), { ssr: false });

export default function Visualizer({ graphData }: {graphData:any}) {


  return <G6component graphData={graphData} />;
}
