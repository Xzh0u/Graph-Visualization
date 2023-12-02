import Head from "next/head";
import GraphVisualization from "../containers/GraphVisualizer";
import Header from "../containers/Header";
import '../styles/global.css';

export default function Page() {
  return (
    <div className="bg-slate-800 flex flex-col h-screen">
      <Head>
        <title>Graph Visualization</title>
      </Head>
      <Header />
      <GraphVisualization />
    </div>
  );
}
