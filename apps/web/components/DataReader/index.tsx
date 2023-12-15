// DataReader.tsx
import React, { useState } from "react";
import { Button, Upload } from "@douyinfe/semi-ui";
import { UploadProps } from "@douyinfe/semi-ui/lib/es/upload";
import { parseNodesCsv, parseEdgesCsv } from "./DataReader";
import { handleGraphData } from "./GraphDataHandler";
import { GCombo, GraphData } from "../../utils/types";
import axios from "axios";
// import { Container, Grid } from "@mui/material";
import { Col, Row } from '@douyinfe/semi-ui';

interface DataReaderProps {
  onUpdateGraphData: (updatedData: GraphData) => void;
}

const DataReader: React.FC<DataReaderProps> = ({ onUpdateGraphData }) => {
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    edges: [],
    combos: [],
  });

  const handleEdgesUpload: UploadProps["customRequest"] = async (files) => {
    const fileContent = files.file.fileInstance;

    if (fileContent) {
      try {
        const parsedData = await parseEdgesCsv(fileContent);
        const updatedGraphData = handleGraphData({
          nodes: [],
          edges: parsedData,
        });
        setGraphData((prevData: GraphData) => ({
          ...prevData,
          edges: updatedGraphData.edges.map((edge) => ({
            source: String(edge.source),
            target: String(edge.target),
          })),
        }));
      } catch (error: any) {
        console.error("Error parsing edges csv:", error.message);
      }
    }

    return {
      autoRemove: false,
      status: "uploadFail",
      validateMessage: "The content is illegal",
      name: "RenameByServer.jpg",
    };
  };

  const handleNodesUpload: UploadProps["customRequest"] = async (files) => {
    const fileContent = files.file.fileInstance;

    if (fileContent) {
      try {
        const parsedData = await parseNodesCsv(fileContent);
        const updatedGraphData = handleGraphData({
          nodes: parsedData,
          edges: [],
        });
        setGraphData((prevData: any) => ({
          ...prevData,
          nodes: updatedGraphData.nodes,
        }));
      } catch (error: any) {
        console.error("Error parsing nodes csv:", error.message);
      }
    }

    return {
      autoRemove: false,
      status: "uploadFail",
      validateMessage: "The content is illegal",
      name: "RenameByServer.jpg",
    };
  };

  const handleUpdateGraphData = async () => {
    const resp = await axios.post<Array<number>>(
      "http://2f1475ac.cpolar.io/predict",
      {
        nodes: [graphData.nodes[0]],
        edges: [graphData.edges[0]],
      }
    );
    const comboIds = resp.data;
    const combos: Array<GCombo> = [];
    const nodes = comboIds.map((comboId, idx) => {
      const comboIdStr = String(comboId);

      if (combos.every((combo) => combo.id !== comboIdStr)) {
        combos.push({
          id: comboIdStr,
          label: `Group ${comboIdStr}`,
          x: Math.random() * 500,
          y: Math.random() * 700,
        });
      }

      return {
        id: graphData.nodes[idx]?.id!,
        comboId: comboIdStr,
      };
    });
    onUpdateGraphData({
      nodes,
      edges: graphData.edges,
      combos,
    });
  };

  return (
          <Row type="flex" justify="start">
            <Col span={6}>
              <div className="col-content">
                {/* Upload section for nodes.csv */}
                <div className="absolute w-64 h-48 border bg-violet-200 flex flex-col">
                <Upload customRequest={handleNodesUpload} action="" draggable>
                  <Button
                    className="bg-cyan-500 h-24 w-64"
                    type="primary"
                    theme="solid"
                  >
                    Upload nodes csv
                  </Button>
                </Upload>
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div className="col-content">
                {/* Upload section for edges.csv */}
                <div className="absolute w-64 h-48 border bg-violet-200 flex flex-col">
                <Upload customRequest={handleEdgesUpload} action="" draggable>
                  <Button
                    className="bg-cyan-500 h-24 w-64"
                    type="primary"
                    theme="solid"
                  >
                    Upload edges csv
                  </Button>
                </Upload>
                </div>
              </div>
            </Col>
          

            <Col span={6}>
              <div className="col-content">
                {/* Button to update graph data */}
                <Button
                  onClick={handleUpdateGraphData}
                  className="bg-green-500 h-24 w-64"
                  type="primary"
                  theme="solid"
                >
                  Update Graph Data
                </Button>
              </div>
              </Col>
          </Row>
          
  );
};

export default DataReader;
