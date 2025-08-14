import { configureStore } from '@reduxjs/toolkit'
import taskSlice, { setTasks } from './reducer/task'
import { persistTasksMiddleware } from '../../middleware/persistence'

export const store = configureStore({
  reducer: {
    taskSlice
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(persistTasksMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Load tasks from main process on startup
(window as any).taskAPI.getTasks().then((tasks: any) => {
    store.dispatch(setTasks(tasks));
});
