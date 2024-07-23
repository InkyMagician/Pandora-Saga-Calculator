const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

const presetsFolder = path.join(app.getPath('userData'), 'presets');
const presetsFilePath = path.join(presetsFolder, 'presets.json');
const gearFilePath = path.join(app.getPath('userData'), 'gear.json');

function ensurePresetsFolder() {
    if (!fs.existsSync(presetsFolder)) {
        fs.mkdirSync(presetsFolder, { recursive: true });
    }
}

function savePresetsToFile(presets) {
    ensurePresetsFolder();
    fs.writeFileSync(presetsFilePath, JSON.stringify(presets, null, 2), 'utf-8');
}

function loadPresetsFromFile() {
    ensurePresetsFolder();
    try {
        if (fs.existsSync(presetsFilePath)) {
            const data = fs.readFileSync(presetsFilePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading presets file:', error);
        return [];
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDev) {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('save-presets', (event, presets) => {
    savePresetsToFile(presets);
});

ipcMain.handle('load-presets', () => {
    return loadPresetsFromFile();
});

ipcMain.handle('saveGearData', (event, gearData) => {
    try {
        fs.writeFileSync(gearFilePath, JSON.stringify(gearData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error saving gear data:', error);
    }
});

ipcMain.handle('loadGearData', () => {
    try {
        if (fs.existsSync(gearFilePath)) {
            const data = fs.readFileSync(gearFilePath, 'utf-8');
            return JSON.parse(data);
        }
        return {};
    } catch (error) {
        console.error('Error loading gear data:', error);
        return {};
    }
});