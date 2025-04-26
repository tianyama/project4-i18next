import { createSlice } from "@reduxjs/toolkit";

export const toDoSlice = createSlice({
  name: "toDoList",
  initialState: {
    value: [],
  },
  reducers: {
    addList: ({ value }, { payload }) => {
      value.push(payload);
    },

    editToDoStatus: ({ value }, { payload }) => {
      value[payload.index].status = payload.status;
    },
    editToDoContent: ({ value }, { payload }) => {
      value[payload.index].text = payload.text;
      value[payload.index].priority = payload.priority;
    },
    deleteToDo: ({ value }, { payload }) => {
      value.splice(payload.index, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addList, editToDoStatus, editToDoContent, deleteToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
