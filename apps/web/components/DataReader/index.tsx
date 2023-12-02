import { Button, Upload } from "@douyinfe/semi-ui";
import { UploadProps } from "@douyinfe/semi-ui/lib/es/upload";

export default function DataReader() {

  const handleUpload: UploadProps['customRequest'] = (files) => {
    console.log(files.file);
    if (files.file.fileInstance) {
        //
        console.log('files', files);
    }
    return {
        autoRemove: false,
        status: 'uploadFail',
        validateMessage: 'The content is illegal',
        name: 'RenameByServer.jpg',
    }
  }

  return (
    <div className="absolute w-64 h-48 border bg-violet-200 flex flex-col">
      <Upload customRequest={handleUpload} action="" draggable>
        <Button className=" bg-cyan-500 h-24 w-64" type="primary" theme="solid">
          Upload
        </Button>
      </Upload>
    </div>
  );
}
