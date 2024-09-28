const MinifierService = require("./minifier.js");

exports.activate = function() {
	if(nova.inDevMode()) {
		// console.clear();
		// console.log("MINIFIER EXTENSION ...GO...");
	}

	const Minifier = new MinifierService();

	nova.workspace.onDidAddTextEditor((editor) => {
		return editor.onWillSave(Minifier.minifyOnSave.bind(Minifier));
	});
}

exports.deactivate = function() {
	// Clean up state before the extension is deactivated
}
