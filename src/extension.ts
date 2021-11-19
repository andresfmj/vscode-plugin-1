import { commands, ExtensionContext, window } from "vscode";
import axios from 'axios';

export function activate(context: ExtensionContext) {
	let helloPlugin = async () => {
		window.showInformationMessage('Hello This is Plugin of test');

		let editor = window.activeTextEditor;
		if (editor) {
			const user = await axios.get('http://localhost:3000/user');
			const data = user.data;

			editor?.edit((editBuilder) => {
				let position = editor?.selection.active;
				position && editBuilder.insert(position, `Hello ${data.name}`);
			});
		}
	};

	let command = commands.registerCommand('helloPlugin', helloPlugin);
	context.subscriptions.push(command);
}