import { SelectProps } from "@arco-design/web-react";

export interface Field {
  type: string;
  name: string;
  label?: string;
}

export interface RaizInputElement {}
export interface RaizSelectElement {
  dependsOn?: string;
}

// Inherit HTMLInputElement
export interface VarcharField extends Field, RaizInputElement {
  type: "varchar";
}

export interface SelectionField extends Field, RaizSelectElement {
    type: "selection";
    options?: SelectProps["options"];
}

export type RaizField = VarcharField | SelectionField;
