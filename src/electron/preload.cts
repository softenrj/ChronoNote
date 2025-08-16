import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("taskAPI", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  saveTasks: (tasks: any) => {
    return ipcRenderer.send("save-tasks", tasks)
  },
  toggleAlwaysOnTop: () => ipcRenderer.send("toggle-always-on-top"),
});