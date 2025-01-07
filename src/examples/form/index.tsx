import {
  Button,
  ColorPicker,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  Message,
  Notification,
  Switch,
} from "@arco-design/web-react";
import * as utils from "../utils";
import { IconRight } from "@arco-design/web-react/icon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Varchar } from "./components/Varchar";
import { Selection } from "./components/Selection";
import useForm from "@arco-design/web-react/es/Form/useForm";
import { RaizForm, RaizField } from "./types";
import Many2one from "./components/Many2one";
import { Datetime } from "./components/Datetime";
import { File } from "./components/File";
import { Picture } from "./components/Picture";

interface FormProps {
  fields: RaizField[];
  raizForm: RaizForm;
}

// FIXME - Could not Fast Refresh ("useFormContext" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
export function ExampleForm(props: FormProps) {
  // const { raizForm } = props;

  const [form] = useForm();
  const [fields, _] = useState<RaizField[]>(props.fields);

  useEffect(() => {
    console.log("Index has been (re-)loaded");
  }, []);

  const onChange = useCallback((f: string, v: any) => {
    form.setFieldValue(f, v);
  }, []);

  const toDictValues = useCallback(
    (
      fields: Pick<RaizField, "name" | "type">[],
      defaultValueFrom: (type: RaizField["type"]) => any
    ) => {
      let dict: { [field: string]: any } = {};

      fields.forEach((field) => {
        dict[field.name] = defaultValueFrom(field.type);
      });

      return dict;
    },
    []
  );

  const formOnSubmit = (values: { [field: string]: any }) => {
    console.log("Form submit", values);
  };

  const formInitialValues = useMemo(() => {
    return toDictValues(fields, (t) => {
      if (t === "boolean") return false;
      return "";
    });
  }, []);

  return (
    <Form form={form} initialValues={formInitialValues} onSubmit={formOnSubmit}>
      {fields.map((field) => {
        const label =
          field.label ?? utils.Form.Conversion.upperCamel(field.name);

        const fieldType = field.type;

        const formItemProps: FormItemProps = {
          label,
          field: field.name,
          layout: "horizontal",
          rules: [{ required: field.required ?? false }],
        };

        switch (fieldType) {
          // Handle Varchar field
          case "varchar":
            return (
              <Form.Item key={field.name} {...formItemProps}>
                <Varchar field={field} onChange={(f, v) => onChange(f, v)} />
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
                <Selection field={field} onChange={(f, v) => onChange(f, v)} />
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
                  <Button
                    type="text"
                    size="mini"
                    onClick={() => {
                      Message.info(`will be redirect to ${field.model}Model`);
                    }}
                  >
                    {label}
                    <IconRight style={{ color: "blue" }} />
                  </Button>
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
                <Many2one field={field} onChange={(f, v) => onChange(f, v)} />
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
            let { name } = field;
            return (
              <Form.Item key={`${name}-error`} label={label}>
                <Button
                  type="text"
                  status="danger"
                  size="mini"
                  onClick={() => {
                    Notification.error({
                      title: "Error",
                      content: `Unknown field type '${fieldType}'`,
                    });
                  }}
                >
                  Error
                </Button>
              </Form.Item>
            );
        }
      })}
      <Form.Item>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
