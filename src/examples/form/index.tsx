import { Form } from "@arco-design/web-react";
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
import { RaizField, RaizSelectElement, SelectionField } from "./types";

export default function () {
  const [form] = useForm();
  // const [values, setValues] = useState()
  const [fields, _] = useState<RaizField[]>([
    { type: "varchar", name: "username" },
    {
      type: "selection",
      name: "Status",
      options: [
        {
          label: "Open",
          value: "open",
        },
        {
          label: "Cancel",
          value: "cancel",
        },
      ],
    },
    {
      type: "selection",
      name: "shipment_status",
      label: "Shipment Status",
      options: [
        {
          label: "Shipped",
          value: "shipped",
        },
        {
          label: "Waiting",
          value: "waiting",
        },
      ],
      dependsOn: "status",
    },
  ]);

  useEffect(() => {}, []);

  const onChange = (field: string, value: any) => {
    form.setFieldValue(field, value);
    console.log(`Field ${field} has been changed to ${value}`);
    console.log(form.getFieldsValue());
  };

  const toDictValues = (
    fields: Pick<RaizField, "name">[],
    fn: (value: any) => any
  ) => {
    let dict: { [field: string]: any } = {};

    fields.forEach((field) => {
      dict[field.name] = fn(undefined);
    });

    return dict;
  };

  const formInitialValues = useMemo(() => {
    return toDictValues(fields, (_) => "");
  }, []);

  return (
    <Form form={form} initialValues={formInitialValues}>
      {fields.map((field) => {
        const label =
          field.label ??
          field.name.charAt(0).toUpperCase().concat(field.name.substring(1));

        switch (field.type) {
          case "varchar":
            return (
              <Form.Item key={field.name} label={label} field={field.name}>
                <Varchar field={field} onChange={(f, v) => onChange(f, v)} />
              </Form.Item>
            );
          case "selection":
            return (
              <Form.Item key={field.name} label={label} field={field.name}>
                <Selection field={field} onChange={(f, v) => onChange(f, v)} />
              </Form.Item>
            );
        }
      })}
    </Form>
  );
}

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
