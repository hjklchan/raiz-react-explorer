import { Upload } from "@arco-design/web-react";
import { PictureField } from "../types";
import { useCallback, useEffect, useState } from "react";
import { UploadItem } from "@arco-design/web-react/es/Upload";

export interface PictureProps {
  field: PictureField;
}

export const Picture = (props: PictureProps) => {
  const [files, setFiles] = useState<UploadItem[]>();

  const {
    field: { action, properties },
  } = props;

  const validAndBuildAccept = useCallback((): string => {
    const type = properties?.types ?? "";

    const concatFn = (value: string) => "image/".concat(value);

    if (typeof type === "string") {
      return type.split(",").map(concatFn).join(", ");
    } else if (type instanceof Array) {
      return type.map(concatFn).join(", ");
    } else {
      return "image/*";
    }
  }, []);

  return (
    <Upload
      action={action}
      fileList={files ?? []}
      listType="picture-card"
      accept={validAndBuildAccept()}
    />
  );
};
