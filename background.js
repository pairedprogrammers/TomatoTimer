chrome.app.runtime.onLaunched.addListener(function() {
  'use strict';
  chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
    // Tab opened.
  });
});