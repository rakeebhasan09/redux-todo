import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { ITask, TInitialState } from "./tasks.type";

const initialState: TInitialState = [];

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: {
            prepare: (input:Pick<ITask, 'title' | 'description' | 'priority' | 'status'>) => {
                const task = {
                    id: nanoid(),
                    title: input.title.trim(),
                    description: input.description.trim(),
                    priority: input.priority,
                    status: input.status,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                return { payload: task };
            },
            reducer: (state, action : PayloadAction<ITask>) => {
                state.push(action.payload);
            }
        }
    },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
