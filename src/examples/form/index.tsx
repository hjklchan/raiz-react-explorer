import { Button, Form, Grid } from "@arco-design/web-react";
import * as utils from "../utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import { RaizForm, RaizField } from "./types";
import FieldRenderer from "./components/FieldRenderer";

const MAX_GUTTER = 24;

interface FormProps {
  // fields: RaizField[];
  form: RaizForm;
}

// FIXME - Could not Fast Refresh ("useFormContext" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
export function ExampleForm(props: FormProps) {
  const { form: raizForm } = props;

  const [form] = useForm();
  const [fields, _] = useState<RaizField[]>(
    raizForm.layout.flatMap((field) => field)
  );

  useEffect(() => {
    raizForm.layout.flatMap((field) => {
      console.log(field);
    });

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
      {/* {fields.map((field) => {
        return <FieldRenderer field={field} onChange={onChange} />;
      })} */}

      {raizForm.layout.map((row) => {
        const length = row.length;
        const span = MAX_GUTTER / length;

        return (
          <Grid.Row gutter={MAX_GUTTER}>
            {row.map((field) => {
              return (
                <Grid.Col span={span}>
                  <FieldRenderer field={field} onChange={onChange} />
                </Grid.Col>
              );
            })}
          </Grid.Row>
        );
      })}
      <Form.Item>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
