import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, editToDoStatus, editToDoContent, deleteToDo } from "./features/toDo";
import "./App.css";

// the hook
import { useTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Input,
  Layout,
  Radio,
  Select,
  Space,
  Tag,
  List,
  Checkbox,
  Modal,
} from "antd";
import { priorityList, statusList } from "./lib/arr";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;



function EditDialog({ current, setCurrent }) {
  const [toDoText, setToDoText] = useState("");
  const [newPriority, setNewPriority] = useState(2);
  const { t } = useTranslation();
  const toDoList = useSelector(({ toDo }) => toDo.value);
  const dispatch = useDispatch();
  const curToDo = (id) => toDoList.findIndex((item) => item.id === id);
  const color = (value) =>
    priorityList.find((item) => item.value === value).color;
  const renderLabel = ({ value, label }) => (
    <Tag color={color(value)}>{t(label)}</Tag>
  );
  const onOK = () => {
    dispatch(
      editToDoContent({
        index: curToDo(current),
        text: toDoText,
        priority: newPriority,
      })
    );
    setCurrent(null);
  };
  return (
    <Modal title="Edit Task" open={current} onCancel={() => setCurrent(null)} onOk={() => onOK()}>
      <Space.Compact block>
        <Input
          style={{ width: "100%" }}
          onChange={(e) => setToDoText(e.target.value)}
        />
        <Select
          options={priorityList}
          style={{ width: "50%" }}
          labelRender={(v) => renderLabel(v)}
          optionRender={(v) => renderLabel(v)}
          onChange={(e) => setNewPriority(e)}
          defaultValue={2}
        />
      </Space.Compact>
    </Modal>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(null);
  const [toDoText, setToDoText] = useState("");
  const [newPriority, setNewPriority] = useState(2);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState([]);
  const dispatch = useDispatch();
  const toDoList = useSelector(({ toDo }) => toDo.value);
  const curToDo = (id) => toDoList.findIndex((item) => item.id === id);
  const color = (value) =>
    priorityList.find((item) => item.value === value).color;
  const label = (value) =>
    priorityList.find((item) => item.value === value).label;

  const renderLabel = ({ value, label }) => (
    <Tag color={color(value)}>{t(label)}</Tag>
  );

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Button
          variant="solid"
          color="primary"
          onClick={() => i18n.changeLanguage("en")}
        >
          EN
        </Button>
        <Button
          variant="solid"
          color="primary"
          onClick={() => i18n.changeLanguage("vn")}
        >
          VN
        </Button>
        <h1>{t("Title")}</h1>
        <Input.Search onSearch={(e) => setFilterText(e)} />
        <h4>{t("FilterStatus")}</h4>
        <Radio.Group
          defaultValue={null}
          options={statusList}
          onChange={(e) => setFilterStatus(e.target.value)}
        />
        <h4>{t("FilterPriority")}</h4>
        <Select
          options={priorityList}
          style={{ width: "100%" }}
          mode="multiple"
          labelRender={(v) => renderLabel(v)}
          optionRender={(v) => renderLabel(v)}
          onChange={(e) => setFilterPriority(e)}
        />
        <List
          dataSource={toDoList.filter(
            (item) =>
              (filterText
                ? item.text.toLowerCase().includes(filterText.toLowerCase())
                : true) &&
              (filterPriority.length
                ? filterPriority.includes(item.priority)
                : true) &&
              (filterStatus !== null ? item.status === filterStatus : true)
          )}
          renderItem={({ id, text, priority, status }) => (
            <List.Item key={id}>
              <Space>
                <Checkbox
                  defaultChecked={status}
                  onChange={(e) => {
                    dispatch(
                      editToDoStatus({ index: curToDo(id), status: e.target.checked })
                    );
                    console.log(toDoList);
                  }}
                />
                <Typography.Text>{text}</Typography.Text>
              </Space>
              <Space>
                <Tag color={color(priority)}>{label(priority)}</Tag>
                <Button
                  shape="circle"
                  variant="solid"
                  color="primary"
                  icon={<EditOutlined />}
                  onClick={()=>setCurrent(id)}
                />
                <Button
                  shape="circle"
                  variant="solid"
                  color="red"
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(deleteToDo({ index: curToDo(id) }))}
                />
              </Space>
            </List.Item>
          )}
        />
        <div style={{ paddingBottom: "5px" }}>
          <Space.Compact block>
            <Input
              style={{ width: "100%" }}
              onChange={(e) => setToDoText(e.target.value)}
            />
            <Select
              options={priorityList}
              style={{ width: "50%" }}
              labelRender={(v) => renderLabel(v)}
              optionRender={(v) => renderLabel(v)}
              onChange={(e) => setNewPriority(e)}
              defaultValue={2}
            />
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                dispatch(
                  addList({
                    id: new Date().getTime(),
                    text: toDoText,
                    priority: newPriority,
                    status: false,
                  })
                );
                console.log(toDoList);
              }}
            >
              Add
            </Button>
          </Space.Compact>
        </div>
        <EditDialog current={current} setCurrent={setCurrent}/>
      </Content>
    </Layout>
  );
}

export default App;
