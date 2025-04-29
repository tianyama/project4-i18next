import React, { useState } from "react";
import { useAppSelector } from "./lib/hook";
import "./App.css";

import { useTranslation } from "react-i18next";
import { Button, Input, Layout, Radio, Select, Space } from "antd";
import { statusList, sortByList, sortOrder } from "./lib/arr";
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
  const [sort, setSort] = useState("text");
  const [order, setOrder] = useState(false);
  const toDoList = useAppSelector(({ toDo }) => toDo.value);
  const filterList = toDoList.filter(
    ({ text, priority, status }) =>
      (filterText
        ? text.toLowerCase().includes(filterText.toLowerCase())
        : true) &&
      (filterPriority.length ? filterPriority.includes(priority) : true) &&
      (filterStatus !== null ? status === filterStatus : true)
  ).sort((a, b) => {
    if (sort === "text") return a.text.localeCompare(b.text);
    else if (sort === "status") return Number(a.status) - Number(b.status);
    else if (sort === "priority") return a.priority - b.priority;
    else return 0;
  })
  if (order) filterList.reverse();
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
          block
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
        <h4>{t("SortBy")}</h4>
        <Space.Compact block>
          <Select
            style={{ width: "50%" }}
            options={sortByList.map(({ value, label }) => ({
              label: t(label),
              value,
            }))}
            onChange={(v) => setSort(v)}
          />
          <Radio.Group
            block
            style={{ width: "50%" }}
            optionType="button"
            defaultValue={null}
            onChange={(e) => setOrder(e.target.value)}
            options={sortOrder.map(({ value, label }) => ({
              label: t(label),
              value,
            }))}
          />
        </Space.Compact>
        <ListToDo list={filterList} setCurrent={setCurrent} />
        <AddNewToDo />
        <EditDialog current={current} setCurrent={setCurrent} />
      </Content>
    </Layout>
  );
}
