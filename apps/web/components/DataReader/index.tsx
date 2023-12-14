// DataReader.tsx
import React, { useState } from 'react';
import { Button, Upload } from "@douyinfe/semi-ui";
import { UploadProps } from "@douyinfe/semi-ui/lib/es/upload";
import { parseNodesCsv, parseEdgesCsv } from './DataReader';
import { handleGraphData } from './GraphDataHandler';

interface DataReaderProps {
  onUpdateGraphData: (updatedData: any) => void;
}

const DataReader: React.FC<DataReaderProps> = ({ onUpdateGraphData }) => {
  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: [],
  });

  const handleEdgesUpload: UploadProps['customRequest'] = async (files) => {
    const fileContent = files.file.fileInstance;

    if (fileContent) {
      try {
        const parsedData = await parseEdgesCsv(fileContent);
        const updatedGraphData = handleGraphData({ nodes: [], edges: parsedData });
        setGraphData((prevData:any) => ({
          ...prevData,
          edges: updatedGraphData.edges,
        }));
      } catch (error:any) {
        console.error('Error parsing edges csv:', error.message);
      }
    }

    return {
      autoRemove: false,
      status: 'uploadFail',
      validateMessage: 'The content is illegal',
      name: 'RenameByServer.jpg',
    };
  };

  const handleNodesUpload: UploadProps['customRequest'] = async (files) => {
    const fileContent = files.file.fileInstance;

    if (fileContent) {
      try {
        const parsedData = await parseNodesCsv(fileContent);
        const updatedGraphData = handleGraphData({ nodes: parsedData, edges: [] });
        setGraphData((prevData:any) => ({
          ...prevData,
          nodes: updatedGraphData.nodes,
        }));
      } catch (error:any) {
        console.error('Error parsing nodes csv:', error.message);
      }
    }

    return {
      autoRemove: false,
      status: 'uploadFail',
      validateMessage: 'The content is illegal',
      name: 'RenameByServer.jpg',
    };
  };

  const handleUpdateGraphData = () => {
    console.log(graphData);
    onUpdateGraphData(graphData);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Upload section for nodes.csv */}
      <div className="w-64 border bg-violet-200">
        <Upload customRequest={handleNodesUpload} action="" draggable>
          <Button className="bg-cyan-500 h-24 w-64" type="primary" theme="solid">
            Upload nodes csv
          </Button>
        </Upload>
      </div>

      {/* Upload section for edges.csv */}
      <div className="w-64 border bg-violet-200">
        <Upload customRequest={handleEdgesUpload} action="" draggable>
          <Button className="bg-cyan-500 h-24 w-64" type="primary" theme="solid">
            Upload edges csv
          </Button>
        </Upload>
      </div>

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
  );
};

export default DataReader;
