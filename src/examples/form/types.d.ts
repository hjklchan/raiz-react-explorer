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

// VarcharField
//
// Inherit HTMLInputElement
export interface VarcharField extends Field, RaizInputElement {
  type: "varchar";
}

// IntegerField
//
// Inherit HTMLInputElement
export interface IntegerField extends Field, RaizInputElement {
  type: "integer";
}

// DatetimeField
//
// Inherit HTMLInputElement
export interface DatetimeField extends Field, RaizInputElement {
  type: "datetime";
}

// FloatField
//
// Inherit HTMLInputElement
export interface FloatField extends Field, RaizInputElement {
  type: "float";
  precision?: number;
}

// EmailField
// 
// Inherit HTMLInputElement
export interface EmailField extends Field, RaizInputElement {
  type: "email";
}

// EmailField
//
// Inherit HTMLInputElement
export interface BooleanField extends Field, RaizInputElement {
  type: "boolean";
}

// SelectionField
// 
// Inherit HTMLSelectElement
export interface SelectionField extends Field, RaizSelectElement {
  type: "selection";
  options?: SelectProps["options"];
}

// Many2oneField
// 
// Inherit HTMLSelectElement
export interface Many2oneField extends Field, RaizSelectElement {
  type: "many2one";
  model: string;
}

export type RaizField =
  | VarcharField
  | FloatField
  | IntegerField
  | BooleanField
  | DatetimeField
  | EmailField
  | Many2oneField
  | SelectionField;
