import { createSlice } from "@reduxjs/toolkit";

export interface ToDoTypes {
  id: string;
  text: string;
  status: boolean;
  priority: number;
}

export interface CounterState {
  value: ToDoTypes[]
}

// Define the initial state using that type
const initialState: CounterState = {
  value: []
}

export const toDoSlice = createSlice({
  name: "toDoList",
  initialState,
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
