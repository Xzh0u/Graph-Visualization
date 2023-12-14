// DataReader.tsx
const Papa = require('papaparse');

interface EdgeCsvData {
  entryID: number;
  sourceNodeId: string;
  targetNodeId: string;
  relationshipType: string;
}

interface NodeCsvData {
  entryID: number;
  nodeId: string;
  labels: string;
  subject: string;
  // Add more fields as needed
}

export async function parseNodesCsv(nodesFile: File): Promise<any[]> {
  return parseCsv(nodesFile, (records: NodeCsvData[]) => {
    return records.map((record) => ({
      id: record.nodeId,
      label: record.nodeId,
      x: Math.random() * 500,
      y: Math.random() * 500,
    }));
  });
}

export async function parseEdgesCsv(edgesFile: File): Promise<any[]> {
  return parseCsv(edgesFile, (records: EdgeCsvData[]) => {
    return records.map((record) => ({
      source: record.sourceNodeId,
      target: record.targetNodeId,
    }));
  });
}

async function parseCsv(file: File, transform: (records: any[]) => any[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        const csvContent = event.target.result.toString();
        Papa.parse(csvContent, {
          header: true,
          complete: (result:any) => {
            const records = result.data;
            const transformedData = transform(records);
            resolve(transformedData);
          },
          error: (error:any) => {
            reject(error.message);
          },
        });
      } else {
        reject(new Error('Failed to read file content'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
}
