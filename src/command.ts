import { spawnSync } from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

const PYTHON_LANGUAGE = 'python';

export function fixesCommand(context: vscode.ExtensionContext): undefined {
    console.log('Running fixesCommand');

    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor || activeEditor.document.languageId !== PYTHON_LANGUAGE) {
        vscode.window.showErrorMessage('Please open a Python file to format.');
        return;
    }

    if (activeEditor.document.isDirty) {
        vscode.window.showErrorMessage(
            'Refusing to run on modified file. Fix8 currently only supports running against the filesystem.',
        );
        return;
    }

    const document = activeEditor.document;

    const wrapperScript = context.asAbsolutePath(
        path.join('pythonFiles', 'extension-entrypoint.py'),
    );
    const args = [document.uri.fsPath];
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    const spawnOptions = {
        cwd: workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(document.uri.fsPath),
    };

    const returned = spawnSync(wrapperScript, args, spawnOptions);

    if (returned.error) {
        vscode.window.showErrorMessage(returned.error.message);
        console.error(returned.error.message);
        return;
    }

    if (returned.status || returned.stderr.toString()) {
        const message = returned.stderr.toString();
        vscode.window.showWarningMessage(message);
        console.warn(message);
        return;
    }
}
