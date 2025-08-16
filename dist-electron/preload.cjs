"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("taskAPI", {
    getTasks: () => electron_1.ipcRenderer.invoke("get-tasks"),
    saveTasks: (tasks) => {
        return electron_1.ipcRenderer.send("save-tasks", tasks);
    },
    toggleAlwaysOnTop: () => electron_1.ipcRenderer.send("toggle-always-on-top"),
});
