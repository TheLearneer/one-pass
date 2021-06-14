const { app, BrowserWindow } = require('electron')
const { join } = require('path')

require('./ipc')

app.setPath("userData", join(app.getPath("appData"), "One Auth"))

function createWindow () {
  // https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 580,
    resizable: false,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenu(null)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http:localhost:${process.env.PORT}`)
  } else {
    mainWindow.loadFile(join(__dirname, "..", "render", "dist", "index.html"))
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
    // if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools()
  })
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
