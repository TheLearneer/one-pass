const { contextBridge, ipcRenderer } = require('electron')

const OnePass = {
    password: {
        get: () => ipcRenderer.invoke("get-master-password"),
        set: (key) => ipcRenderer.invoke("set-master-password", key)
    },
    secrets: {
        getAll: () => ipcRenderer.invoke("get-all-secret"),
        set: (info) => ipcRenderer.invoke("set-secret", info)
    },
    // token: {
    //     generate: (secret) => ipcRenderer.invoke("token-generate", secret),
    //     timeRemaining: () => ipcRenderer.invoke("token-time-remaining")
    // }
}

contextBridge.exposeInMainWorld("OnePass", OnePass)
