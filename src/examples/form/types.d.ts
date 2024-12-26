import { SelectProps } from "@arco-design/web-react";

export interface Field {
  type: string;
  name: string;
  label?: string;
}

export interface VarcharField extends Field {
  type: "varchar";
}

export interface SelectionField extends Field {
    type: "selection";
    options?: SelectProps["options"];
}

export type RaizField = VarcharField | SelectionField;