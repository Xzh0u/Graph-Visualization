import Head from "next/head";
import GraphVisualization from "../containers/GraphVisualizer";

export default function Page() {
  return (
    <>
      <Head>
        <title>Graph Visualization</title>
      </Head>
      <h1>Graph Visualization</h1>
      <GraphVisualization />
    </>
  );
}
