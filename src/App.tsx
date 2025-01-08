import { Card, Typography } from "@arco-design/web-react";
import { ExampleForm as Form } from "./examples/form";
import example_json from "./examples/form/example.json";
import { useEffect, useState } from "react";
import { useDebounce } from "ahooks";
import { RaizForm } from "./examples/form/types";

function App() {
  const [stringifyFields, setStringifyFields] = useState<string | undefined>();

  useEffect(() => {
    setStringifyFields(JSON.stringify(example_json));
  }, []);

  const debounceValue = useDebounce(stringifyFields, {
  });

  useEffect(() => {
    if (debounceValue) {
      const formData = JSON.parse(debounceValue);
      console.log(formData.fields);
      // setFields(formData.fields);
    }
  }, [debounceValue]);

  return (
    <div style={{ width: "100%" }}>
      {/* <Row style={{ marginBottom: 16 }} gutter={24}>
        <Col span={12}>
          <Card style={{ height: "50vh" }}>
            <Input.TextArea
              value={stringifyFields}
              onChange={(value, _) => setStringifyFields(value)}
              autoSize
            />
          </Card>
        </Col>
        <Col span={12}> */}
          <Card style={{ height: "100%" }}>
            <Typography.Title heading={3}>Raiz Dynamic Form</Typography.Title>
            <Form form={example_json as RaizForm} />
          </Card>
        {/* </Col>
      </Row> */}
    </div>
  );
}

export default App;