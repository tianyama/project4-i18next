import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from '../features/toDo'

export const store = configureStore({
  reducer: {
    toDo: toDoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch