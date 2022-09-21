const {
  app,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  dialog
} = require('electron');

// const { dialog } = require('@electron/remote/main');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

ipcMain.on('GET_SOURCES', (event) => {
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    event.sender.send('SET_SOURCES', sources); 
  }); 
});

ipcMain.on('SHOW_SAVE_DIALOG', async (event) => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save video',
    defaultPath: `vid-${Date.now()}.webm`
  });
  event.sender.send('FILE_PATH', filePath); 
});
