import { Upload } from "@arco-design/web-react";
import { PictureField } from "../types";
import { useState } from "react";
import { UploadItem } from "@arco-design/web-react/es/Upload";

export interface PictureProps {
  field: PictureField;
}

export const Picture = (props: PictureProps) => {
  const [files, setFiles] = useState<UploadItem[]>();

  const {
    field: { action },
  } = props;

  return (
    <Upload
      action={action}
      fileList={files ?? []}
      listType="picture-card"
    />
  );
};
