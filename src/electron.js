const {app, BrowserWindow, protocol} = require('electron');

const createWindow = () => {
    let win = new BrowserWindow({ 
        minWidth: 1000,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true, 
            enableRemoteModule: true,
            webSecurity: false

        }
    })

    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = request.url.replace('file:///', '');
      callback(pathname);
    });

    win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);