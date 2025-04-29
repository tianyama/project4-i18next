import { Button, Form, Input, Select, Space } from "antd";
import React from "react";
import { SelectProps } from "./PriorityTags";

const { Item } = Form;

export const FormField = ({ form, onFinish, newTodo }) => (
  <Form form={form} layout="horizontal" onFinish={onFinish}>
    <Space.Compact block>
      <Item name="text" style={{ width: "66%" }}>
        <Input />
      </Item>
      <Item name="priority" style={{ width: "33%" }}>
        <Select {...SelectProps} />
      </Item>
      {newTodo && (
        <Button variant="solid" color="primary" htmlType="submit">
          Thêm
        </Button>
      )}
    </Space.Compact>
  </Form>
);
