import { Tag } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { color } from "../lib/function";
import { priorityList } from "../lib/arr";

export const SelectProps = {
  options: priorityList,
  labelRender: (v) => <PriorityTags priority={v.value} />,
  optionRender: (v) => <PriorityTags priority={v.value} />,
}

export default function PriorityTags({ priority }) {
  const { t } = useTranslation();
  const label = (value) =>
    t(priorityList.find((item) => item.value === value)?.label ?? "");
  return <Tag color={color(priority)}>{label(priority)}</Tag>;
}
