/*
exports.activate = function() {
    nova.workspace.onDidAddTextEditor((openedEditor) => {
        openedEditor.onDidChange((changedEditor) => {
            if (changedEditor.document.isUntitled) {
                console.log("Untiled doc, don't save");
                return;
            }

            if (changedEditor.dh_activeSaveTimerID !== undefined) {
                clearTimeout(changedEditor.dh_activeSaveTimerID);
            }

            changedEditor.dh_activeSaveTimerID = setTimeout(function(){
                changedEditor.dh_activeSaveTimerID = undefined
                changedEditor.save();
                console.log("Saving file...")
            }, 3000);
        });
    });
}
*/
const MinifierService = require("./minifier.js");

exports.activate = function() {
    if(nova.inDevMode()) {
       // console.clear();
       // console.log("TESTING EXTENSION");
    }

    const Minifier = new MinifierService();

    nova.workspace.onDidAddTextEditor((editor) => {
        return editor.onWillSave(Minifier.minifyOnSave.bind(Minifier));
    });
/*
        if (editor.document.syntax != "javascript" || editor.document.syntax != "css") {
            console.log("Document " + editor.document.syntax + " is not JS or CSS!");
            return;
        }
//        return editor.onWillSave( console.log("AAAA!"));


       // nova.subscriptions.add(textEditor.onDidSave(onChange))

        // Run just before save.
        editor.onWillSave((editor) => {
            console.log("Try minimising?!?");
//      // Format on save
//      if (config.get("formatOnSave")) {
//        formatter.format(editor, true);
      });

    });
*/
    //console.log("Exports activate");
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
}

/* @NOTE2SELF Must register command to the extension.json! */
/*
nova.commands.register("minifier.openURL", (workspace) => {
    var options = {
        "placeholder": "https://foobar.com",
        "prompt": "Open"
    };
    nova.workspace.showInputPanel("Enter the URL to open:", options, function(result) {
        if (result) {
            nova.openURL(result, function(success) {

            });
        }
    });
});
*/
/*
nova.commands.register("minifier.runExternalTool", (workspace) => {
    var options = {
        "placeholder": "/path/to/tool",
        "prompt": "Run"
    };
    nova.workspace.showInputPanel("Enter the path to the external tool:", options, function(result) {
        if (result) {
            var options = {
                // "args": [],
                // "env": {},
                // "stdin": <any buffer or string>
            };

            var process = new Process(result, options);
            var lines = [];

            process.onStdout(function(data) {
                if (data) {
                    lines.push(data);
                }
            });

            process.onDidExit(function(status) {
                var string = "External Tool Exited with Stdout:\n" + lines.join("");
                nova.workspace.showInformativeMessage(string);
            });

            process.start();
        }
    });
});
*/

