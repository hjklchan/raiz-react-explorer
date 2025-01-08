import {
  Form,
  FormItemProps,
  Input,
  ColorPicker,
  Button,
  Notification,
  Message,
  Switch,
  InputNumber,
  Link,
} from "@arco-design/web-react";
import { RaizField } from "../types";
import { Datetime } from "./Datetime";
import { File } from "./File";
import { Selection } from "./Selection";
import Many2one from "./Many2one";
import { Picture } from "./Picture";
import { Varchar } from "./Varchar";
import * as utils from "../../utils";

interface FieldRendererProps {
  field: RaizField;
  onChange?: (field: string, value: any) => void;
}

const FieldRenderer = (props: FieldRendererProps) => {
  const { field, onChange } = props;

  const label = field.label ?? utils.Form.Conversion.upperCamel(field.name);
  const formItemProps: FormItemProps = {
    label,
    field: field.name,
    layout: "vertical",
    rules: [{ required: field.required ?? false }],
  };
  switch (field.type) {
    // Handle Varchar field
    case "varchar":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Varchar field={field} onChange={onChange} />
        </Form.Item>
      );
    // Handle Text field
    case "text":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Input.TextArea autoSize />
        </Form.Item>
      );
    // Handle Color field
    case "color":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <ColorPicker />
        </Form.Item>
      );
    // Handle Selection field
    case "selection":
      var help = () => {
        if (field.dependsOn) {
          return `存在依赖字段 ${field.dependsOn}`;
        }
      };

      return (
        <Form.Item
          key={field.name}
          {...formItemProps}
          help={help()}
          // 如果存在依赖字段
          // 则该字段会被重新渲染一次
          shouldUpdate={field.dependsOn !== undefined}
        >
          <Selection field={field} onChange={onChange} />
        </Form.Item>
      );
    case "many2one":
      var help = () => {
        if (field.dependsOn) {
          return `存在依赖字段 ${field.dependsOn}`;
        }
      };

      const jumpableLabel = () => {
        return (
          <>
            <Link
              onClick={() =>
                Message.info(`will be redirect to ${field.model}Model`)
              }
            >
              {label}
            </Link>
            {/* <Button
              type="text"
              size="mini"
              onClick={() => {
                Message.info(`will be redirect to ${field.model}Model`);
              }}
            >
              {label}
              <IconRight style={{ color: "blue" }} />
            </Button> */}
          </>
        );
      };

      return (
        <Form.Item
          key={field.name}
          {...formItemProps}
          label={jumpableLabel()}
          help={help()}
          // 如果存在依赖字段
          // 则该字段会被重新渲染一次
          shouldUpdate={field.dependsOn !== undefined}
        >
          <Many2one field={field} onChange={onChange} />
        </Form.Item>
      );
    // Handle Boolean field
    case "boolean":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Switch />
        </Form.Item>
      );
    // Handle Float field
    case "float":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <InputNumber precision={field.precision} />
        </Form.Item>
      );
    // Handle Integer field
    case "integer":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <InputNumber precision={0} />
        </Form.Item>
      );
    // Handle Email field
    case "email":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Input placeholder="TODO" />
        </Form.Item>
      );
    // Handle Datetime field
    case "datetime":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Datetime field={field} onChange={onChange} />
        </Form.Item>
      );
    case "file":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <File field={field} />
        </Form.Item>
      );
    case "picture":
      return (
        <Form.Item key={field.name} {...formItemProps}>
          <Picture field={field} />
        </Form.Item>
      );
    default:
      let { name, type } = field;
      return (
        <Form.Item key={`${name}-error`} label={label}>
          <Button
            type="text"
            status="danger"
            size="mini"
            onClick={() => {
              Notification.error({
                title: "Error",
                content: `Unknown field type '${type}'`,
              });
            }}
          >
            Error
          </Button>
        </Form.Item>
      );
  }
};

export default FieldRenderer;
