import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import Store from "electron-store";
import { fileURLToPath } from "url";
import { getRunTimeEnv } from "./util.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    const store = new Store({ name: "tasks" });
    ipcMain.handle("get-tasks", () => {
        return store.get("tasks") || [];
    });
    ipcMain.on("save-tasks", (event, tasks) => {
        store.set("tasks", tasks || []);
    });
    const filePath = path.join(app.getAppPath(), "/dist-react/index.html");
    const isDev = getRunTimeEnv();
    if (isDev) {
        win.loadURL("http://localhost:5124");
    }
    else {
        win.loadFile(filePath);
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
