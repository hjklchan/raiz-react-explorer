import { Card, SelectProps } from "@arco-design/web-react";
import Form from "./examples/form";
import Row from "@arco-design/web-react/es/Grid/row";
import Col from "@arco-design/web-react/es/Grid/col";

function App() {
  const formFields = [
    {
      type: "selection",
      name: "country",
      label: "Country",
      options: [
        {
          label: "China",
          value: "china",
        },
        {
          label: "Japan",
          value: "japan",
        },
        {
          label: "Singapore",
          value: "singapore",
        },
      ],
    },
    {
      type: "selection",
      name: "province",
      label: "Province",
      dependsOn: {
        lookupField: "country",
      },
      options: [
        {
          label: "Guangdong",
          value: "guangdong",
        },
        {
          label: "Guangxi",
          value: "guangxi",
        },
        {
          label: "Hangzhou",
          value: "hangzhou",
        },
      ],
    },
  ];

  return (
    <div style={{ width: "100%" }} className="grid-demo-background">
      <Row className="grid-demo" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <div>12 - 50%</div>
        </Col>
        <Col span={12}>
          <Card style={{height: "100vh"}}>
            <Form />
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
