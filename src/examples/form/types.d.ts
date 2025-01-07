import { SelectProps, UploadProps } from "@arco-design/web-react";

export interface Form {
  layout: {
    // TODO
  }
}

export interface Field {
  type: string;
  name: string;
  label?: string;
  required?: boolean;
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
  imageTypes: string[] | string | "*";
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
