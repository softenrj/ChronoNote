import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export enum TaskPriority {
    Important = "important",
    Moderate = "moderate",
    Low = "low",
    Chill = "chill"
}

export interface ITask {
    uid: string;
    title: string;
    description: string;
    priority: TaskPriority;
    deadline: string;
    isCompleted: boolean;
}


const initialTask: ITask[] = [];

const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTask,

    reducers: {
        setTasks: (state, action: PayloadAction<ITask[]>) => {
            return action.payload;
        },
        addTask(state, action: PayloadAction<{
            title: string;
            description: string;
            priority: TaskPriority;
            deadline: string;
        }>) {
            const newTask: ITask = {
                uid: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                deadline: action.payload.deadline,
                isCompleted: false
            }
            return [newTask,...state];
        },
        removeTask(state, action: PayloadAction<string>) {
            const index = state.findIndex(task => task.uid === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        editTask(state, action: PayloadAction<{
            uid: string;
            title: string;
            description: string;
            priority: TaskPriority;
            deadline: string;
            isCompleted: boolean;
        }>) {
            const taskIndex = state.findIndex(task => task.uid === action.payload.uid);
            if (taskIndex !== -1) {
                state[taskIndex] = {
                    uid: action.payload.uid,
                    title: action.payload.title,
                    description: action.payload.description,
                    priority: action.payload.priority,
                    deadline: action.payload.deadline,
                    isCompleted: action.payload.isCompleted
                }
            }
        },
        markComplete: (state, action: PayloadAction<string>) => {
            const taskIndex = state.findIndex(task => task.uid === action.payload);
            if (taskIndex !== -1) {
                state[taskIndex].isCompleted = !state[taskIndex].isCompleted;
            }
        }
    }
})

export const { setTasks ,addTask, removeTask, editTask, markComplete } = taskSlice.actions;
export default taskSlice.reducer;