import { DatePicker } from "@arco-design/web-react";
import { DatetimeField } from "../types";

interface DatetimeProps {
  field: DatetimeField;
  onChange?: (field: string, value: any) => void;
}

export function Datetime(props: DatetimeProps) {
  const { onChange } = props;
  const {} = props.field;

  return <DatePicker onChange={onChange} />;
}
