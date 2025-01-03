const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    // Function to change the terminal directory
    function changeTerminalDirectory(itemPath) {
        let terminal = vscode.window.activeTerminal;
        
        if (!terminal) {
            terminal = vscode.window.createTerminal();
        }

        fs.stat(itemPath, (err, stats) => {
            if (err) {
                vscode.window.showErrorMessage('Error accessing the file or folder.');
                return;
            }

            if (stats.isFile()) {
                itemPath = path.dirname(itemPath); // If it's a file, go to its directory
            }

            // Change the directory to the itemPath
            terminal.sendText(`cd "${itemPath}"`, true);
            terminal.show();
            vscode.window.showInformationMessage(`Changed terminal to ${itemPath}`);
        });
    }

    // Change directory when selection changes in the explorer
    const onExplorerSelectionChange = vscode.window.onDidChangeActiveTextEditor(editor => {

        vscode.window.showInformationMessage('onDidChangeActiveTextEditor');
        if (editor) {
            const selectedItem = editor.document.uri;
            changeTerminalDirectory(selectedItem.fsPath);
        }
    });
    context.subscriptions.push(onExplorerSelectionChange);

    // Listening for file or folder selection in the explorer
    const onFileExplorerSelection = vscode.workspace.onDidChangeWorkspaceFolders(() => {

        vscode.window.showInformationMessage('onDidChangeWorkspaceFolders');
        const explorer = vscode.window.activeTextEditor;
        if (explorer) {
            const selectedItem = explorer.document.uri;
            vscode.window.showInformationMessage('selectedItem=' + explorer.document.uri);
            changeTerminalDirectory(selectedItem.fsPath);
        }
    });
   context.subscriptions.push(onFileExplorerSelection);


    // Manual command to sync the terminal directory
    let manualSyncCommand = vscode.commands.registerCommand('extension.syncTerminalDirectory', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selectedItem = editor.document.uri;
            changeTerminalDirectory(selectedItem.fsPath);
        } else {
            vscode.window.showErrorMessage('No file selected in the editor.');
        }
    });
    context.subscriptions.push(manualSyncCommand);

    // Hello World Command (for testing) -- Also add following package.json in order for this to work:
    // {
    //     "command": "extension.helloWorld",
    //     "title": "Say Hello"
    // },
    // let helloWorldCommand = vscode.commands.registerCommand('extension.helloWorld', () => {
    //     vscode.window.showInformationMessage('Hello World 3!');
    // });
    
    // context.subscriptions.push(helloWorldCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
