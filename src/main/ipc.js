const { ipcMain } = require('electron')
const Store = require('electron-store')
const { getPassword, setPassword } = require('keytar')
// const { totp } = require('otplib')

async function init() {
    const password = await getMasterPassword()

    const store2FA = new Store({
        // projectName: "One Pass",
        name: "secrets",
        encryptionKey: password,
        fileExtension: ''
    })

    // Helper functions
    function getMasterPassword() {
        return getPassword('1Auth', 'Desktop')
    }

    function getAllSecret() {
        return store2FA.get("secrets", [])
    }

    // IPC processes
    ipcMain.handle("get-master-password", (_e) => {
        return getMasterPassword()
    })

    ipcMain.handle("set-master-password", (_e, password) => {
        setPassword("1Auth", "Desktop", password)
    })

    // ipcMain.handle("token-generate", (_e, secret) => {
    //     return totp.generate(secret)
    // })

    // ipcMain.handle("token-time-remaining", (_e) => {
    //     return totp.timeRemaining()
    // })

    ipcMain.handle("get-all-secret", (_e) => {
        return getAllSecret()
    })

    ipcMain.handle("set-secret", (_e, details) => {
        const secrets = getAllSecret()
        store2FA.set("secrets", [].concat(...secrets, details))
    })

}

init()
