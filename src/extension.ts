import { commands, ExtensionContext, window } from "vscode";
import axios from 'axios';

export function activate(context: ExtensionContext) {
	let helloPlugin = async () => {
		window.showInformationMessage('Hello This is Plugin of test');

		let editor = window.activeTextEditor;
		if (editor) {
			const user = {
				name: 'andresfmj',
				settings: {
					darkMode: true,
					language: 'en',
				},
			};
			const newUserData = await axios.put(
				'http://localhost:3000/user',
				user,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			editor?.edit((editBuilder) => {
				let position = editor?.selection.active;
				const message =
					`Hello ${user.name}\n` +
					`Your settings are: darkMode: ${newUserData.data.settings.darkMode}\n` +
					` and language: ${newUserData.data.settings.language}\n`;
				position && editBuilder.insert(position, message);
			});
		}
	};

	let command = commands.registerCommand('helloPlugin', helloPlugin);
	context.subscriptions.push(command);
}