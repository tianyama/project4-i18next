import { message, Form } from "antd";
import React, { useEffect } from "react";
import { addList } from "../features/toDo";
import { useAppDispatch } from "../lib/hook";
import { useTranslation } from "react-i18next";
import { FormField } from "./Form";

export default function AddNewToDo() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [mess, messHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  useEffect(() => form.setFieldValue("priority", 2), []);
  const onFinish = ({ text, priority }) => {
    if (!text) return mess.error(t("LackText"));
    dispatch(
      addList({
        id: new Date().getTime(),
        text,
        priority,
        status: false,
      })
    );
    form.resetFields(["text"]);
  };
  return (
    <>
      {messHolder}
      <FormField form={form} onFinish={onFinish} newTodo={true} />
    </>
  );
}
