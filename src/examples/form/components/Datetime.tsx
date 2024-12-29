import { DatePicker } from "@arco-design/web-react";
import { DatetimeField } from "../types";

interface DatetimeProps {
    field: DatetimeField;
}

export function Datetime(props: DatetimeProps) {
    const {  } = props.field;

    return <DatePicker />
}