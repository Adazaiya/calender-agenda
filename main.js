const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false 
        }
    });

    const indexPath = path.join(__dirname, 'index.html');
    console.log(`Loading: ${indexPath}`);  // ✅ Debugging
    mainWindow.loadFile(indexPath).catch(err => console.error('Failed to load HTML:', err));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
