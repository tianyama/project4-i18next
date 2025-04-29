import { Modal, message, Form } from "antd";
import React, { useEffect } from "react";
import { editToDoContent } from "../features/toDo";
import { useAppSelector, useAppDispatch } from "../lib/hook";
import { useTranslation } from "react-i18next";
import { FormField } from "./Form";

export default function EditDialog({ current, setCurrent }) {
  const { t } = useTranslation();
  const [mess, messHolder] = message.useMessage();
  const [form] = Form.useForm();
  const toDoList = useAppSelector(({ toDo }) => toDo.value);
  const index = toDoList.findIndex(({ id }) => id === current);
  const curToDo = toDoList[index];
  const dispatch = useAppDispatch();

  useEffect(() => form.setFieldsValue(curToDo), [current]);
  const onFinish = ({ text, priority }) => {
    if (!text) return mess.error(t("LackText"));
    dispatch(editToDoContent({ index, text, priority }));
    setCurrent("");
  };
  return (
    <Modal
      title={t("ModalTitle")}
      open={current != ""}
      onCancel={() => setCurrent("")}
      onOk={() => form.submit()}
    >
      {messHolder}
      <FormField form={form} onFinish={onFinish} newTodo={false} />
    </Modal>
  );
}
