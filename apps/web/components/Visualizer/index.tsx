import dynamic from "next/dynamic";

const G6component = dynamic(() => import("./G6Component"), { ssr: false });

export default function Visualizer() {
  return <G6component />;
}
