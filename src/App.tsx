import React, { useState } from "react";
import { useAppSelector } from "./lib/hook";
import "./App.css";

import { useTranslation } from "react-i18next";
import { Button, Input, Layout, Radio, Select } from "antd";
import { statusList } from "./lib/arr";
import EditDialog from "./components/EditDialog";
import AddNewToDo from "./components/AddNewToDo";
import { SelectProps } from "./components/PriorityTags";
import ListToDo from "./components/ListToDo";

const { Content } = Layout;

export default function App() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPriority, setFilterPriority] = useState<number[]>([]);
  const toDoList = useAppSelector(({ toDo }) => toDo.value);
  const filterList = toDoList.filter(
    ({ text, priority, status }) =>
      (filterText
        ? text.toLowerCase().includes(filterText.toLowerCase())
        : true) &&
      (filterPriority.length ? filterPriority.includes(priority) : true) &&
      (filterStatus !== null ? status === filterStatus : true)
  );
  return (
    <Layout>
      <Content style={{ padding: "0 50px", backgroundColor: "white" }}>
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
          onChange={(e) => setFilterStatus(e.target.value)}
          options={statusList.map(({ value, label }) => ({
            label: t(label),
            value,
          }))}
        />
        <h4>{t("FilterPriority")}</h4>
        <Select
          style={{ width: "100%" }}
          allowClear
          mode="multiple"
          {...SelectProps}
          onChange={(e) => setFilterPriority(e)}
        />
        <ListToDo list={filterList} setCurrent={setCurrent} />
        <AddNewToDo />
        <EditDialog current={current} setCurrent={setCurrent} />
      </Content>
    </Layout>
  );
}
