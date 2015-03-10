firefox-screensharing-extension
==============================

This extension is designed to allow the screen sharing feature for WebRTC applications on given domains

**Clone this extension**

** Open `install.rdf`:**

* line 4: modify the id attribute
* line 6: modify the name attribute
* line 10: modify the creator attribute
* line 11: modify the homepageURL attribute

** Open `bootstrap.js`:**

* line 3-8: set all domains allowed to use this extension

=

You can test this extension on Bistri Conference Demo:

* http://bistri.com/demo/conf

=

## Note

You can use this extension within any WebRTC applications, it is vendor independant except for modification about allowed domains in `bootstrap.js`

## How to publish your extension

* Modify `install.rdf`
* Follow Mozilla instructions to package the extension : https://addons.mozilla.org/en-US/developers
