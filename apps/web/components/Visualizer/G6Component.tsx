import React, { useEffect, useRef } from "react";
import { Graph, IG6GraphEvent, Tooltip } from "@antv/g6";
import { GraphData } from "../../utils/types";

const tooltip = new Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ["node", "edge"],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e: IG6GraphEvent | undefined) => {
    const outDiv: HTMLDivElement = document.createElement("div");
    if (!e?.item) {
      return "";
    }

    outDiv.style.width = "fit-content";
    outDiv.style.height = "fit-content";
    const model = e.item.getModel();
    if (e.item.getType() === "node") {
      outDiv.innerHTML = `id: ${model.id}<br />type: ${model.comboId}`;
    } else {
      const source = model.source;
      const target = model.target;
      outDiv.innerHTML = `from: ${source}<br/>to：${target}`;
    }
    return outDiv;
  },
});

const G6component = ({ graphData }: {graphData: GraphData}) => {
  //console.log(graphData);
  const ref = useRef({
    graph: null as null | Graph,
  });

  useEffect(() => {
    ref.current.graph = new Graph({
      container: "mountNode",
      groupByTypes: false,
      layout: {
        type: "forceAtlas2",
        comboPadding: 40,
        edgeStrength: 0.7,
        maxIteration: 1000,
        gravity: 10,
        comboIding: true,
        comboIdGravity: 3000,
        workerEnabled: true,
        gpuEnabled: true,
      },
      // width: 1000,
      // height: 600,
      fitView: true,
      //fitViewPadding: [20, 40, 50, 20],
      //linkCenter: true,
      plugins: [tooltip],
      defaultCombo: {
        // The type of the combos. You can also assign type in the data of combos
        type: "cCircle",
        labelCfg: {
          refY: 2,
        },
        // ... Other global configurations for combos
      },
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          "activate-relations",
          "drag-node",
          "drag-combo",
          "lasso-select",
          "click-select",
        ],
        edit: ["click-select"],
      },
    });
    ref.current.graph.data(graphData);
    ref.current.graph.render();

    const graph = ref.current.graph;

    // collapse/expand when click the marker
    graph.on("combo:click", (e: any) => {
      if (e.target.get("name") === "combo-marker-shape") {
        // graph.collapseExpandCombo(e.item.getModel().id);
        graph.collapseExpandCombo(e.item);
        if (graph.get("layout")) graph.layout();
        else graph.refreshPositions();
      }
    });

    graph.on("combo:dragend", () => {
      graph.getCombos().forEach((combo) => {
        graph.setItemState(combo, "dragenter", false);
      });
    });
    graph.on("node:dragend", () => {
      graph.getCombos().forEach((combo) => {
        graph.setItemState(combo, "dragenter", false);
      });
    });

    graph.on("combo:dragenter", (e: any) => {
      graph.setItemState(e.item, "dragenter", true);
    });
    graph.on("combo:dragleave", (e: any) => {
      graph.setItemState(e.item, "dragenter", false);
    });

    graph.on("combo:mouseenter", (e: any) => {
      const { item } = e;
      graph.setItemState(item, "active", true);
    });

    graph.on("combo:mouseleave", (evt: any) => {
      const { item } = evt;
      graph.setItemState(item, "active", false);
    });

    return () => {
      ref.current.graph?.destroy();
    };
  }, [graphData]);

  return <div id="mountNode" className="h-full w-full"></div>;
};

export default G6component;
