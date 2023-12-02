import DataReader from "../components/DataReader";
import Visualizer from "../components/Visualizer";

export default function GraphVisualizer() {
    return <div className="flex-1">
        <DataReader />
        <Visualizer />
    </div>;
}