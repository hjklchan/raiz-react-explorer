import { Select } from "@arco-design/web-react";
import { SelectionField } from "../types";
import useFormContext from "@arco-design/web-react/es/Form/hooks/useContext";
import { useEffect } from "react";

interface SelectionProps {
  field: SelectionField;
  onChange?: (field: string, value: any) => void;
}

export function Selection(props: SelectionProps) {
  const formContext = useFormContext();

  useEffect(() => {
    console.log("Selection component: ", formContext.form.getFields());
  }, []);

  return (
    <Select
      options={props.field.options}
      onChange={(value, _) =>
        props.onChange ? props.onChange(props.field.name, value) : undefined
      }
    />
  );
}
