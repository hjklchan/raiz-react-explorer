import { Upload } from "@arco-design/web-react";
import { FileField } from "../types";

export interface FileProps {
  field: FileField;
}

export const File = (props: FileProps) => {
  const {
    field: { action },
  } = props;

  return <Upload action={action} />;
};
