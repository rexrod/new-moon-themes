define(function (require, exports, module) {
	"use strict";

	var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
		ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
		FileSystem = brackets.getModule("filesystem/FileSystem"),
		PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
		ThemeManager = brackets.getModule("view/ThemeManager");

	var prefs = PreferencesManager.getExtensionPrefs("themes"),
		moduleThemesDir = ExtensionUtils.getModulePath(module, "themes/"),
		themes = [];

	function upperCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	FileSystem.getDirectoryForPath(moduleThemesDir).getContents(function (err, contents) {
		var i, tempArr = [];
		if (err) {
			console.log("Error getting themes:" + err);
			return false;
		}
		for (i = 0; i < contents.length; i++) {
			if (contents[i].name !== ".DS_Store") {
				tempArr.push({
					file: contents[i].name,
					name: "New-Moon-Themes-" + contents[i].name.replace(".css", ""),
					title: "New Moon:  " + upperCase(contents[i].name.replace(".css", "")).replace(/\-/g, ' ')
				});
			}
		}

		tempArr.sort(function (a, b) {
			if (a.file < b.file) {
				return -1;
			}
			if (a.file > b.file) {
				return 1;
			}
			return 0;
		});
		for (i = 0; i < tempArr.length; i++) {
			ThemeManager.loadFile(moduleThemesDir + tempArr[i].file, {
				name: tempArr[i].name,
				title: tempArr[i].title,
				dark: true
			});
		}
	});
});
