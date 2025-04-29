import { List, Space, Checkbox, Typography, Button, Popconfirm } from "antd";
import React from "react";
import { editToDoStatus, deleteToDo, ToDoTypes } from "../features/toDo";
import PriorityTags from "./PriorityTags";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface Props {
  list: ToDoTypes[];
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

export default function ListToDo({ list, setCurrent }: Readonly<Props>) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const toDoList = useAppSelector(({ toDo }) => toDo.value);
  const curToDo = (id) => toDoList.findIndex((item) => item.id === id);
  return (
    <List
      dataSource={list}
      size="small"
      rowKey={({ id }) => id}
      style={{ minHeight: 200 }}
      locale={{ emptyText: <> </> }}
      renderItem={({ id, text, priority, status }) => (
        <List.Item>
          <Space>
            <Checkbox
              defaultChecked={status}
              onChange={({ target }) => {
                dispatch(
                  editToDoStatus({
                    index: curToDo(id),
                    status: target.checked,
                  })
                );
              }}
            />
            <Typography.Text>{text}</Typography.Text>
          </Space>
          <Space>
            <PriorityTags priority={priority} />
            <Button
              shape="circle"
              variant="solid"
              color="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                console.log("cur", id);
                setCurrent(id);
              }}
            />
            <Popconfirm
              title={t("ConfirmDelTitle")}
              description={t("ConfirmDel")}
              onConfirm={() => dispatch(deleteToDo({ index: curToDo(id) }))}
              okText="Yes"
              cancelText="No"
            >
              <Button
                shape="circle"
                variant="solid"
                color="red"
                size="small"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        </List.Item>
      )}
    />
  );
}
