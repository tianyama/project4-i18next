import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from '../features/toDo'

export default configureStore({
  reducer: {
    toDo: toDoReducer
  }
})