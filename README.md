# VSCodeTerminalSync
VS Code extension to sync open file &amp; terminal working directory

## Building
1. Install [node.js](https://nodejs.org/en/download)
2. Open terminal with admin privilieges
3. Set execution policy: 'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned'
4. Init npm: `npm init -y`
5. Install vsce: `npm install -g vsce`
6. CD to extension source directory
7. Run `vsce package`
8. In VS Code, `Extensions > [...] > "Install from VSIX and select the resulting .vsix file"`