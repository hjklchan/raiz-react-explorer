import { SelectProps, UploadProps } from "@arco-design/web-react";

export interface Field {
  type: string;
  name: string;
  label?: string;
  required?: boolean;
  rules?: any;
}

type Expression = string | string[];

export interface RaizInputElement {
  // expression 1: "FIELD_NAME eq SOME_VALUE"
  // expression 2: "FIELD_NAME == SOME_VALUE"
  // expression 3: "FIELD_NAME is SOME_VALUE"
  visible?: Expression;
}
export interface RaizSelectElement {
  dependsOn?: string;
  // TODO - Feature: new attribute 'dependency'
  dependency?: {
    field: string;
    filter: {
      param: string;
    } | boolean;
  };
}

// VarcharField
//
// Inherit HTMLInputElement
export interface VarcharField extends Field, RaizInputElement {
  type: "varchar";
}

// TextField
//
// Inherit HTMLInputElement
export interface TextField extends Field, RaizInputElement {
  type: "text";
}

// ColorField
//
// Inherit HTMLInputElement
export interface ColorField extends Field, RaizInputElement {
  type: "color";
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

// FileField
//
// Inherit HTMLInputElement
export interface FileField
  extends Pick<UploadProps, "action">,
    Field,
    RaizInputElement {
  type: "file";
  action: string;
}

// PictureField
//
// Inherit HTMLInputElement
export interface PictureField
  extends Omit<FileField, "type">,
    Field,
    RaizInputElement {
  type: "picture";
  properties?: {
    types?: string[] | string | "*";
  };
}

export type RaizField =
  | VarcharField
  | TextField
  | ColorField
  | FloatField
  | IntegerField
  | BooleanField
  | DatetimeField
  | EmailField
  | Many2oneField
  | SelectionField
  | FileField
  | PictureField;

export interface RaizForm {
  title?: string;
  layout: RaizField[][];
}
