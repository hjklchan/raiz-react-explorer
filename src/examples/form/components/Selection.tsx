import { Select, SelectProps } from "@arco-design/web-react";
import { SelectionField } from "../types";
import useFormContext from "@arco-design/web-react/es/Form/hooks/useContext";
import { useEffect, useState } from "react";

interface SelectionProps {
  field: SelectionField;
  onChange?: (field: string, value: any) => void;
}

export function Selection(props: SelectionProps) {
  const { form } = useFormContext();

  const checkDependency = (): boolean => {
    const dependsOn = props.field.dependsOn;
    if (dependsOn) return (form.getFieldValue(dependsOn) as string).length > 0;
    return true;
  };

  // checkProxy is used to debug the checkDependency function
  const checkProxy = (
    fn: () => boolean,
    h: (field: string, b: boolean) => boolean
  ): boolean => {
    return h(props.field.name, fn());
  };

  useEffect(() => {
    console.log(`${props.field.name} has been reloaded`);
  }, []);

  return (
    <Select
      options={
        checkProxy(checkDependency, (f, b) => {
          console.log(f, b);
          return b;
        })
          ? props.field.options
          : []
      }
      onChange={(value, _) =>
        props.onChange ? props.onChange(props.field.name, value) : undefined
      }
    />
  );
}
