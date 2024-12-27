import { Card, Input, SelectProps, Typography } from "@arco-design/web-react";
import { ExampleForm as Form } from "./examples/form";
import Row from "@arco-design/web-react/es/Grid/row";
import Col from "@arco-design/web-react/es/Grid/col";
import example_json from "./examples/form/example.json";
import { useEffect, useState } from "react";
import { useDebounce } from "ahooks";

function App() {
  const [stringifyFields, setStringifyFields] = useState<string | undefined>();
  const [fields, setFields] = useState<RaizField[]>(example_json.fields as RaizField[]);

  useEffect(() => {
    setStringifyFields(JSON.stringify(example_json));
  }, []);

  const debounceValue = useDebounce(stringifyFields, {
  });

  useEffect(() => {
    if (debounceValue) {
      const formData = JSON.parse(debounceValue);
      console.log(formData.fields);
      
      setFields(formData.fields);
    }
  }, [debounceValue]);

  // const stringValueToJson = (stringValue: string) => {
  //   const json = JSON.parse(stringValue);
  //   console.log(json);

  //   return json;
  // }

  // stringValueToJson(debounceValue);

  return (
    <div style={{ width: "100%" }}>
      <Row className="grid-demo" style={{ marginBottom: 16 }} gutter={24}>
        <Col span={12}>
          <Card style={{ height: "50vh" }}>
            <Input.TextArea
              value={stringifyFields}
              onChange={(value, _) => setStringifyFields(value)}
              autoSize
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ height: "100%" }}>
            <Typography.Title heading={3}>动态表单字段</Typography.Title>
            <Form fields={fields} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

interface Reaction {
  expr: string | string[];
  target: string;
  fulfill: { visible?: boolean };
  otherwise?: { visible?: boolean };
}

interface Field {
  name: string;
  label?: string;
  reaction: Reaction;
}

interface SelectionField extends Field {
  type: "selection";
  options?: SelectProps["options"];
}

type RaizField = SelectionField;

// function Selection

function FieldBuilder(field: RaizField) {
  // check reactions
  const reaction = field.reaction;
  if (reaction) {
    const { target, expr, fulfill, otherwise } = reaction;

    parseExpr(expr);
  }

  switch (field.type) {
    case "selection":
      return;
    default:
      return <>Invalid field type</>;
  }
}

function parseExpr(expr: string | string[]) {
  // handle string type
  if (typeof expr === "string") {
  } else if (expr instanceof Array) {
    const arrayExpr = expr as string[];

    let left = arrayExpr[0];
    let middle = arrayExpr[1];
    let right = arrayExpr[2];

    console.log(left, middle, right);
  } else {
    throw new Error("Invalid expr type");
  }
  // handle array type
}
