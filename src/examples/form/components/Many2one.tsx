import { Select, SelectProps } from "@arco-design/web-react";
import { Many2oneField } from "../types";
import { useState } from "react";
import useFormContext from "@arco-design/web-react/es/Form/hooks/useContext";
import { HtmlAdapters } from "../../utils/adapter";

interface Many2oneProps {
  field: Many2oneField;
  onChange?: (field: string, value: any) => void;
}

const Many2one = (props: Many2oneProps) => {
  const { name, dependsOn } = props.field;
  const { form } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  const fetchOptions = (delay_millisecond?: number) => {
    setLoading(true);

    const fetcher = fetch("https://randomuser.me/api/?results=15", {
      method: "GET",
    });

    fetcher
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        const options = HtmlAdapters.Select.toOptions<any>(
          json.results,
          (from) => {
            return { label: from.name.last, value: from.name.last };
          }
        );

        setOptions(options);
      })
      .catch((_) => {})
      .finally(() => {
        setLoading(false);
      });

    // const options: SelectProps["options"] = [
    //   {
    //     label: "CNY",
    //     value: "cny",
    //   },
    //   {
    //     label: "USD",
    //     value: "usd",
    //   },
    // ];

    // if (delay_millisecond) {
    //   // simulate a waiting request
    //   // wait 3 seconds
    //   setTimeout(() => {
    //     setOptions(options);
    //   }, delay_millisecond);
    // } else {
    //   setOptions(options);
    // }
  };

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

  return (
    <Select
      onClick={() => {
        if (checkProxy(checkDependency, (_, passable) => passable)) {
          fetchOptions(3000);
        }
      }}
      options={options}
      loading={loading}
      onChange={(value, _) =>
        props.onChange ? props.onChange(name, value) : undefined
      }
    />
  );
};

export default Many2one;
