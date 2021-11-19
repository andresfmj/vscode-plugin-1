import { commands, ExtensionContext, window } from "vscode";

export function activate(context: ExtensionContext) {
  let helloPlugin = async () => {
    window.showInformationMessage("Hello This is Plugin of test");
  }

  let command = commands.registerCommand(
    "helloPlugin",
    helloPlugin
  );
  context.subscriptions.push(command);
}