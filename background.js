
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
   chrome.tabs.create({'url': chrome.extension.getURL('index.html')}, function(tab) {
    // Tab opened.
  });
});