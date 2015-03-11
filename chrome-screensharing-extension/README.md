chrome-screensharing-extension
==============================

This extension is designed to allow the screen sharing feature for applications developped with the Bistri JS Library

=

You can test this extension on Bistri Conference Demo:

* http://bistri.com/demo/conf

=

**Clone this extension and open the `manifest.json`:**

* line 2: modify the name attribute
* line 15-20: set all domains allowed to use this extension

## Pre-requisites

* Your application must be in SSL.
* Validate your application with Google Webmaster: https://www.google.com/webmasters/

## How to publish your extension

* Modify `manifest.json`
* Follow Google instructions to package the extension : https://developer.chrome.com/extensions/packaging
* In the description page of your extension, you need to choose 'Inline installation' and link the extension to your verified website

## Note

You can use this extension within any WebRTC applications, it is vendor independant except for modification about allowed domains in `manifest.json`
