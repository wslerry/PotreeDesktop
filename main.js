const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const remote = electron.remote;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 900, height: 800})

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	//let menu = new Menu();
	//let menuItemWindow = new MenuItem({label: "Window"});
	//let menuItemToggleDevTools = new MenuItem({label: 'Toggle Developer Tools', click() {
	//		//remote.getCurrentWindow().toggleDevTools();
	//		mainWindow.webContents.toggleDevTools();
	//	}});
	////menuItemWindow.append(menuItemToggleDevTools);
	//menuItemWindow.submenu = [menuItemToggleDevTools];

	//menu.append(menuItemWindow);

	let template = [
		{
			label: "Window",
			submenu: [
				{label: "Home", click() { mainWindow.loadURL(url.format({pathname: path.join(__dirname, 'index.html')})) }},
				{label: "Reload", click() { mainWindow.webContents.reloadIgnoringCache() }},
				{label: "Toggle Developer Tools", click() { mainWindow.webContents.toggleDevTools() }},
			]
		},
		{
			label: "About",
			submenu: [
				{label: "Developer", click() { mainWindow.loadURL('https://lerryws.xyz') }},
			]
		}
	];



	let menu = Menu.buildFromTemplate(template);
	mainWindow.setMenu(menu);
	//mainWindow.setMenu(null);

	//mainWindow.webContents.on('new-window', function(event, url){
	//	event.preventDefault();
	//	open(url);
	//});




	// require('remote').getCurrentWindow().toggleDevTools();


	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
