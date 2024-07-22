const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    savePresets: (presets) => ipcRenderer.invoke('save-presets', presets),
    loadPresets: () => ipcRenderer.invoke('load-presets'),
});