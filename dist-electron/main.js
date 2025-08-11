import { app, BrowserWindow } from "electron";
import path from "path";
import { getRunTimeEnv } from "./util.js";
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //   preload: path.join(__dirname, 'preload.js')
        // }
    });
    const filePath = path.join(app.getAppPath(), "/dist-react/index.html");
    const isdev = getRunTimeEnv();
    if (isdev) {
        win.loadURL('http://localhost:5124');
    }
    else {
        win.loadFile(filePath);
    }
}
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
