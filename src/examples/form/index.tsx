import {
  Button,
  Form,
  Input,
  InputNumber,
  Notification,
  Switch,
} from "@arco-design/web-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Varchar } from "./components/Varchar";
import { Selection } from "./components/Selection";
import useForm from "@arco-design/web-react/es/Form/useForm";
import { RaizField } from "./types";
import example_json from "./example.json";
import Many2one from "./components/Many2one";

function Index() {
  const [form] = useForm();
  const [fields, _] = useState<RaizField[]>(example_json as RaizField[]);

  useEffect(() => {
    console.log("Index has been (re-)loaded");
  }, []);

  const onChange = useCallback((f: string, v: any) => {
    form.setFieldValue(f, v);
    console.log(`Field ${f} has been changed to ${v}`);
    console.log(form.getFieldsValue());
  }, []);

  const toDictValues = (
    fields: Pick<RaizField, "name" | "type">[],
    defaultValueFrom: (type: RaizField["type"]) => any
  ) => {
    let dict: { [field: string]: any } = {};

    fields.forEach((field) => {
      dict[field.name] = defaultValueFrom(field.type);
    });

    return dict;
  };

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
          field.label ??
          field.name.charAt(0).toUpperCase().concat(field.name.substring(1));

        const fieldType = field.type;

        switch (fieldType) {
          // Handle Varchar field
          case "varchar":
            return (
              <Form.Item key={field.name} label={label} field={field.name}>
                <Varchar field={field} onChange={(f, v) => onChange(f, v)} />
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
                label={label}
                field={field.name}
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

            return (
              <Form.Item
                key={field.name}
                label={label}
                field={field.name}
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
              <Form.Item key={field.name} field={field.name} label={label}>
                <Switch />
              </Form.Item>
            );
          // Handle Float field
          case "float":
            return (
              <Form.Item key={field.name} field={field.name} label={label}>
                <InputNumber precision={field.precision} />
              </Form.Item>
            );
          // Handle Integer field
          case "integer":
            return (
              <Form.Item key={field.name} field={field.name} label={label}>
                <InputNumber precision={0} />
              </Form.Item>
            );
          // Handle Email field
          case "email":
            return (
              <Form.Item key={field.name} field={field.name} label={label}>
                <Input placeholder="TODO" />
              </Form.Item>
            );
          default:
            return (
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
};

export interface FormProviderProps {
  fields: RaizField[];
}

export interface FormContextProps {
  events?: {
    onFieldChange?: (field: string, value: any) => void;
  };
}

const FormContext = createContext<FormContextProps>({});

export function useFormContext() {
  const ctx = useContext(FormContext);

  if (ctx) return ctx;

  throw new Error("FormContext does not exist");
}

export function FormProvider(props: FormProviderProps) {
  const [values, setValues] = useState<{ [field: string]: string }>({});

  function toDictValues(fields: Pick<RaizField, "name">[]) {
    let dict: { [field: string]: "" } = {};

    fields.forEach((field) => {
      dict[field.name] = "";
    });

    return dict;
  }

  function initialValues() {
    return toDictValues(props.fields);
  }

  useEffect(() => {
    setValues(toDictValues(props.fields));
  }, []);

  const onFieldChange = useCallback((field: string, value: any) => {
    console.log(`${field} has been changed to ${value}`);

    setValues((pre) => {
      pre[field] = value;
      return pre;
    });
  }, []);

  const contextValues: FormContextProps = {
    events: {
      onFieldChange,
    },
  };

  return (
    <FormContext.Provider value={contextValues}>
      <Form initialValues={initialValues()}>
        {props.fields.map((field) => {
          switch (field.type) {
            case "varchar":
              return <Varchar key={field.name} field={field} />;
          }
        })}
      </Form>
    </FormContext.Provider>
  );
}

export default Index;