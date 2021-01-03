import * as vscode from 'vscode';

import { fixesCommand } from "./command";

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "fix8" is now active!');

    // Note: the commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand(
        'fix8.apply-fixes',
        () => {
            fixesCommand(context);
        },
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
