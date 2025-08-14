import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("taskAPI", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  saveTasks: (tasks: any) => ipcRenderer.send("save-tasks", tasks)
});