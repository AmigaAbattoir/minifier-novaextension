<!--
👋 Hello! As Nova users browse the extensions library, a good README can help them understand what your extension does, how it works, and what setup or configuration it may require.

Not every extension will need every item described below. Use your best judgement when deciding which parts to keep to provide the best experience for your new users.

💡 Quick Tip! As you edit this README template, you can preview your changes by selecting **Extensions → Activate Project as Extension**, opening the Extension Library, and selecting "Minifier" in the sidebar.

Let's get started!
-->

<!--
🎈 Include a brief description of the features your extension provides. For example:
-->

**Minifier** provides the ability to save compressed JavaScript and CSS file. It uses the [YUI Compressor](https://yui.github.io/yuicompressor/) for CSS and [Google Closure](https://developers.google.com/closure/compiler/docs/gettingstarted_app) for JavaScript.

This is a first attempt at a Nova extension and an attempt to migrate from Eclipse. This extension is based on Eclipse's [Minifier plug-in](https://github.com/mnlipp/EclipseMinifyBuilder), with the preferences I use for work projects for the Google Closure: `--warning_level QUIET --compilation_level SIMPLE` and to generate the source map

(Option to change settings may come in the future)
<!--
integration with **A Helpful Tool**, including the most important feature, something that's really helpful, and _a little-known secret!_
-->
<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->
<!--
![](https://nova.app/images/en/dark/editor.png)
-->
## Requirements

Nothing. The extension is packed with YUICompressor (V2.4.8) and Google Closure Compiler (20180202).
<!--
🎈 If your extension depends on external processes or tools that users will need to have, it's helpful to list those and provide links to their installers:
-->
<!--
Minifier requires some additional tools to be installed on your Mac:

- [Node.js 8.2.0](https://nodejs.org) and NPM 5.2.0 or newer
-->
<!--
✨ Providing tips, tricks, or other guides for installing or configuring external dependencies can go a long way toward helping your users have a good setup experience:
-->
<!--
> To install the current stable version of Node, click the "Recommended for Most Users" button to begin the download. When that completes, double-click the **.pkg** installer to begin installation.
-->

## Usage

<!--
🎈 If users will interact with your extension manually, describe those options:
-->
<!--
To run Minifier:

- Select the **Editor → Minifier** menu item; or
- Open the command palette and type `Minifier`
-->
<!--
🎈 Alternatively, if your extension runs automatically (as in the case of a validator), consider showing users what they can expect to see:
-->

Minifier runs when ever you save a JavaScript file (".js") or a CSS file (".css")
<!--
 any time you open a local project, automatically lints all open files, then reports errors and warnings in Nova's **Issues** sidebar and the editor gutter:

![](https://nova.app/images/en/light/tools/sidebars.png)
-->

### Configuration

None yet.
<!--
🎈 If your extension offers global- or workspace-scoped preferences, consider pointing users toward those settings. For example:
-->
<!--
To configure global preferences, open **Extensions → Extension Library...** then select Minifier's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**
-->
<!--
👋 That's it! Happy developing!

P.S. If you'd like, you can remove these comments before submitting your extension 😉
-->
