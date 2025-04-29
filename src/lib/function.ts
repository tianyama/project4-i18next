import { priorityList } from "./arr";

export const color = (val) =>
  priorityList.find(({value}) => value === val)?.color;