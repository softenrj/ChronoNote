import type { Middleware } from "@reduxjs/toolkit";

export const persistTasksMiddleware: Middleware = api => next => (action: any) => {
    const result = next(action);

    if (action.type.startsWith("tasks/") && action.type !== "tasks/setTasks") {
        const tasks = api.getState().tasks;
        (window as any).taskAPI.saveTasks(tasks);
    }

    return result;
};
