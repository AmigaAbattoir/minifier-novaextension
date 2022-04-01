class MinifierService {
	constructor() { }

	minifyOnSave(editor) {
		//console.log("Syntax; " + editor.document.syntax);
		//console.log("Path: " + editor.document.path);

		if (editor.document.syntax != "javascript" && editor.document.syntax != "css") {
			// console.log("Document " + editor.document.syntax + " is not JS or CSS!");
			return;
		}
		// console.log("Minify should be called on "+ editor.document.path);

		var source = editor.document.path;
		if (editor.document.syntax=="css") {
			if(source.substring(source.length-7)=="min.css") {
				// console.log("Don't minify minified CSS!");
				return;
			}
			this.minifyCss(source);
		}

		if (editor.document.syntax=="javascript") {
			if(source.substring(source.length-6)=="min.js") {
				// console.log("Don't minify minified JavaScript!");
				return;
			}
			this.minifyJavascript(source);
		}
	}

	minifyCss(source) {
		//console.log("Enter minifyCss()");
		var targetFile = source.replace(".css",".min.css");

		var path = nova.path.join(nova.path.join(nova.extension.path, "Jars"),"yuicompressor-2.4.8.jar");
		var args = new Array;
		args.push("java");
		args.push("-jar");
		args.push(path);
		args.push("--output");
		args.push(targetFile);
		args.push("--");
		args.push(source);

		var options = { args: args };
		var process = new Process("/usr/bin/env",options)
		var stdOut = new Array;
		var stdErr = new Array;
//console.log(args);
		process.onStdout(function(line) { stdOut.push(line.trim()); });
		process.onStderr(function(line) { stdErr.push(line.trim()); });
		process.onDidExit(function() {
			/*
			console.log("onDidExit!");
			if(stdOut.length>0) {
				console.log("stdOut: " . stdOut.splice().join("\n"));
			}
			if(stdErr.length>0) {
				console.log("stdErr: " . stdErr.splice().join("\n"));
			}
			*/
			if(stdErr.length>0) {
				if(nova._minifierNotificationTimer) {
					clearTimeout(nova._minifierNotificationTimer);
				}
				var message = stdErr.splice(0,2).join("\n");

				let request = new NotificationRequest("min-mess");
				request.title = "Minifier CSS Error";
				request.body = message;
				request.actions = [ "Oops!"];
				let promise = nova.notifications.add(request);

				nova._minifierNotificationTimer = setTimeout(function() {
					nova.notifications.cancel("min-mess");
					console.log("So long message!");
				}, 10000);
			} else {
				nova.notifications.cancel("min-mess");
			}
		});

		process.start();
		console.log("Exit minifyCss()");
	}

	minifyJavascript(source) {
		//console.log("Enter minifyJavascript()");
		var targetFile = source.replace(".js",".min.js");
		var mapFile = source.replace(".js",".min.js.map");

		var lastSlashIndex = source.lastIndexOf("/");
		var filename = source.substring(lastSlashIndex+1);
//		var path = nova.path.join(nova.path.join(nova.extension.path, "Jars"),"closure-compiler-v20220301.jar");
		var path = nova.path.join(nova.path.join(nova.extension.path, "Jars"),"closure-compiler-v20180204.jar");

		var args = new Array;
		args.push("java");
		args.push("-jar");
		args.push(path);

		args.push("--warning_level");
		args.push("QUIET");
		//args.push("VERBOSE");
		args.push("--compilation_level");
		args.push("SIMPLE");
		args.push("--js");
		args.push(source);
		args.push("--js_output_file");
		args.push(targetFile);
		args.push("--create_source_map");
		args.push(mapFile);

/*
		// Need to check these for newer version of Closure
		args.push("--rewrite_polyfills");
		args.push("true");
		//args.push("false");
		//args.push("--assume_function_wrapper");
		//args.push("true");
		//args.push("false");
		args.push("--language_out");
		args.push("ECMASCRIPT5");
*/

		// Add sourceMappingURL to file
		args.push("--output_wrapper");
		args.push("%output%\n//# sourceMappingURL=" + filename + ".map");
		// Remove file name from map file: entry
		args.push("--source_map_location_mapping");
		args.push(targetFile+"|");
		// Remove file name from sources: entry
		args.push("--source_map_location_mapping");
		args.push(source.substring(0,source.lastIndexOf("/")+1)+"|");

//console.log(args);
		var options = { args: args  };
		var process = new Process("/usr/bin/env",options)
		var stdOut = new Array;
		var stdErr = new Array;

		process.onStdout(function(line) { console.log("::: "+line); stdOut.push(line.trim()); });
		process.onStderr(function(line) { console.log("::: "+line); stdErr.push(line.trim()); });
		process.onDidExit(function() {
/*			console.log("onDidExit!");
			if(stdOut.length>0) {
				console.log("stdOut: " . stdOut.splice().join("\n"));
			}
			if(stdErr.length>0) {
				console.log("stdErr: " . stdErr);
			}
*/
			if(stdErr.length>0) {
				if(nova._minifierNotificationTimer) {
					clearTimeout(nova._minifierNotificationTimer);
				}
				var message = stdErr.splice(0,2).join("\n");

				let request = new NotificationRequest("min-mess");
				request.title = "Minifier JS Error";
				request.body = message;
				request.actions = [ "Oops!"];
				let promise = nova.notifications.add(request);

				nova._minifierNotificationTimer = setTimeout(function() {
					nova.notifications.cancel("min-mess");
					//console.log("So long message!");
				}, 5000);
			} else {
				nova.notifications.cancel("min-mess");
			}
		});
		process.start();
		//console.log("Exit minifyJavascript()");
	}
}

module.exports = MinifierService;