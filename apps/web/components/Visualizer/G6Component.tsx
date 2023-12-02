import React, { useEffect, useRef } from "react";
import { Graph, IG6GraphEvent, Tooltip } from "@antv/g6";

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
      console.log("e", e);
      outDiv.innerHTML = `来源：${source}<br/>去向：${target}`;
    }
    return outDiv;
  },
});

const G6component = () => {
  const ref = useRef({
    graph: null as null | Graph,
  });

  useEffect(() => {
    const data = {
      nodes: [
        {
          id: '0',
          comboId: 'a',
        },
        {
          id: '1',
          comboId: 'a',
        },
        {
          id: '2',
          comboId: 'a',
        },
        {
          id: '3',
          comboId: 'a',
        },
        {
          id: '4',
          comboId: 'a',
        },
        {
          id: '5',
          comboId: 'a',
        },
        {
          id: '6',
          comboId: 'a',
        },
        {
          id: '7',
          comboId: 'a',
        },
        {
          id: '8',
          comboId: 'a',
        },
        {
          id: '9',
          comboId: 'a',
        },
        {
          id: '10',
          comboId: 'a',
        },
        {
          id: '11',
          comboId: 'a',
        },
        {
          id: '12',
          comboId: 'a',
        },
        {
          id: '13',
          comboId: 'a',
        },
        {
          id: '14',
          comboId: 'a',
        },
        {
          id: '15',
          comboId: 'a',
        },
        {
          id: '16',
          comboId: 'b',
        },
        {
          id: '17',
          comboId: 'b',
        },
        {
          id: '18',
          comboId: 'b',
        },
        {
          id: '19',
          comboId: 'b',
        },
        {
          id: '20',
        },
        {
          id: '21',
        },
        {
          id: '22',
        },
        {
          id: '23',
          comboId: 'c',
        },
        {
          id: '24',
          comboId: 'a',
        },
        {
          id: '25',
        },
        {
          id: '26',
        },
        {
          id: '27',
          comboId: 'c',
        },
        {
          id: '28',
          comboId: 'c',
        },
        {
          id: '29',
          comboId: 'c',
        },
        {
          id: '30',
          comboId: 'c',
        },
        {
          id: '31',
          comboId: 'c',
        },
        {
          id: '32',
          comboId: 'd',
        },
        {
          id: '33',
          comboId: 'd',
        },
      ],
      edges: [
        {
          source: 'a',
          target: 'b',
          label: 'Combo A - Combo B',
          size: 3,
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: '#fff',
              lineWidth: 5,
              fontSize: 20,
            },
          },
          style: {
            stroke: 'red',
          },
        },
        {
          source: 'a',
          target: '33',
          label: 'Combo-Node',
          size: 3,
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: '#fff',
              lineWidth: 5,
              fontSize: 20,
            },
          },
          style: {
            stroke: 'blue',
          },
        },
        {
          source: '0',
          target: '1',
        },
        {
          source: '0',
          target: '2',
        },
        {
          source: '0',
          target: '3',
        },
        {
          source: '0',
          target: '4',
        },
        {
          source: '0',
          target: '5',
        },
        {
          source: '0',
          target: '7',
        },
        {
          source: '0',
          target: '8',
        },
        {
          source: '0',
          target: '9',
        },
        {
          source: '0',
          target: '10',
        },
        {
          source: '0',
          target: '11',
        },
        {
          source: '0',
          target: '13',
        },
        {
          source: '0',
          target: '14',
        },
        {
          source: '0',
          target: '15',
        },
        {
          source: '0',
          target: '16',
        },
        {
          source: '2',
          target: '3',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '4',
          target: '6',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '7',
          target: '13',
        },
        {
          source: '8',
          target: '14',
        },
        {
          source: '9',
          target: '10',
        },
        {
          source: '10',
          target: '22',
        },
        {
          source: '10',
          target: '14',
        },
        {
          source: '10',
          target: '12',
        },
        {
          source: '10',
          target: '24',
        },
        {
          source: '10',
          target: '21',
        },
        {
          source: '10',
          target: '20',
        },
        {
          source: '11',
          target: '24',
        },
        {
          source: '11',
          target: '22',
        },
        {
          source: '11',
          target: '14',
        },
        {
          source: '12',
          target: '13',
        },
        {
          source: '16',
          target: '17',
        },
        {
          source: '16',
          target: '18',
        },
        {
          source: '16',
          target: '21',
        },
        {
          source: '16',
          target: '22',
        },
        {
          source: '17',
          target: '18',
        },
        {
          source: '17',
          target: '20',
        },
        {
          source: '18',
          target: '19',
        },
        {
          source: '19',
          target: '20',
        },
        {
          source: '19',
          target: '33',
        },
        {
          source: '19',
          target: '22',
        },
        {
          source: '19',
          target: '23',
        },
        {
          source: '20',
          target: '21',
        },
        {
          source: '21',
          target: '22',
        },
        {
          source: '22',
          target: '24',
        },
        {
          source: '22',
          target: '25',
        },
        {
          source: '22',
          target: '26',
        },
        {
          source: '22',
          target: '23',
        },
        {
          source: '22',
          target: '28',
        },
        {
          source: '22',
          target: '30',
        },
        {
          source: '22',
          target: '31',
        },
        {
          source: '22',
          target: '32',
        },
        {
          source: '22',
          target: '33',
        },
        {
          source: '23',
          target: '28',
        },
        {
          source: '23',
          target: '27',
        },
        {
          source: '23',
          target: '29',
        },
        {
          source: '23',
          target: '30',
        },
        {
          source: '23',
          target: '31',
        },
        {
          source: '23',
          target: '33',
        },
        {
          source: '32',
          target: '33',
        },
      ],
      combos: [
        {
          id: 'a',
          label: 'Combo A',
        },
        {
          id: 'b',
          label: 'Combo B',
        },
        {
          id: 'c',
          label: 'Combo C',
        },
        {
          id: 'd',
          label: 'Combo D',
          parentId: 'b',
        },
      ],
    };

    ref.current.graph = new Graph({
      container: "mountNode",
      groupByTypes: true,
      layout: {
        type: "force",
        edgeStrength: 0.7,
        maxIteration: 8000,
        gravity: 10,
        comboIding: true,
        comboIdGravity: 30,
        workerEnabled: true,
      },
      fitView: true,
      linkCenter: true,
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
    ref.current.graph.data(data);
    ref.current.graph.render();

    const graph = ref.current.graph;

    // collapse/expand when click the marker
    graph.on("combo:click", (e) => {
      if (e.target.get("name") === "combo-marker-shape") {
        // graph.collapseExpandCombo(e.item.getModel().id);
        graph.collapseExpandCombo(e.item);
        if (graph.get("layout")) graph.layout();
        else graph.refreshPositions();
      }
    });

    graph.on("combo:dragend", (e) => {
      graph.getCombos().forEach((combo) => {
        graph.setItemState(combo, "dragenter", false);
      });
    });
    graph.on("node:dragend", (e) => {
      graph.getCombos().forEach((combo) => {
        graph.setItemState(combo, "dragenter", false);
      });
    });

    graph.on("combo:dragenter", (e) => {
      graph.setItemState(e.item, "dragenter", true);
    });
    graph.on("combo:dragleave", (e) => {
      graph.setItemState(e.item, "dragenter", false);
    });

    graph.on("combo:mouseenter", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", true);
    });

    graph.on("combo:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", false);
    });

    return () => {
      ref.current.graph?.destroy();
    };
  }, []);

  return <div id="mountNode" className="h-full w-full"></div>;
};

export default G6component;
