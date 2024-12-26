import { Input } from "@arco-design/web-react";
import { RaizField } from "../types";
import { useEffect } from "react";
import useFormContext from "@arco-design/web-react/es/Form/hooks/useContext";

interface VarcharProps {
  field: RaizField;
  onChange?: (field: string, value: any) => void;
}

export function Varchar(props: VarcharProps) {
  const formContext = useFormContext();

  useEffect(() => {
    console.log("Varchar component: ", formContext.form.getFields());
  }, []);

  return (
    <Input
      name={props.field.name}
      onChange={(value, _) =>
        props.onChange ? props.onChange(props.field.name, value) : undefined
      }
    />
  );
}
