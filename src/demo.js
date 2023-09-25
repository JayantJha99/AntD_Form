import React from 'react';
import './index.css';
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const App = () => {
  const [form] = Form.useForm();
  const [size, setSize] = useState('default');
  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 6000,
      }}
      autoComplete="off"
      initialValues={{
        items: [{}],
      }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                key={field.key}
                extra={
                  <Button
                    type="dashed"
                    onClick={() => {
                      remove(field.name);
                    }}
                  >
                    Remove
                  </Button>
                }
              >
                <Form.Item
                  name={[field.name, 'name']}
                  style={{
                    margin: '0 8px',
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                  }}
                  name={[field.name, 'type']}
                >
                  <Select placeholder="Select type">
                    <Option value="Age">Number</Option>
                    <Option value="Address">String</Option>
                    <Option value="Nested">Nested</Option>
                  </Select>
                </Form.Item>

                {form.getFieldValue(['items', field.name, 'type']) === 'Nested' && (
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        type="primary"
                        size={size}
                        onClick={() => add([field.name, 'list'], {})}
                        block
                      >
                        + Add sub item
                      </Button>
                    )}
                  </Form.Item>
                )}
              </Card>
            ))}

            <Button type="primary" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default App;
