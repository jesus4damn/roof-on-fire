import { app, BrowserWindow, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;
//
// protocol.registerSchemesAsPrivileged([
//     { scheme: "root", privileges: { standard: true, secure: true } }
// ]);
// app.on('ready', () => {
// // access to the root of the system, policy of some framework may prevent the use of file://
//     protocol.registerFileProtocol('root', (request, callback) => {
//         let url = request.url.substr(7);
//         if (url[url.length - 1] == '/') {
//             url = url.substr(0, url.length - 1);
//         }
//         // @ts-ignore
//         callback({ path: url });
//     }, (error) => {
//         if (error)
//             console.error('Failed to register protocol root');
//     });
// });

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log); // eslint-disable-line no-console
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: process.env.NODE_ENV !== 'development',
        }
    });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
