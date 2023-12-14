import { ComboConfig, EdgeConfig, NodeConfig } from "@antv/g6";

export type GNode = NodeConfig & {
  features?: Array<string>;
};

export type GEdge = EdgeConfig;

export type GCombo = ComboConfig;

export interface GraphData {
  nodes: Array<GNode>;
  edges: Array<GEdge>;
  combos: Array<GCombo>;
}
