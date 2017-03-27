module.exports.create = function() {
  // var mobileBrowser = browser.forkNewDriverInstance(false, false);
  // mobileBrowser.sleep(1000);
  //
  browser.get("http://localhost:9002/?url=http://localhost:8001");
  browser.sleep(3000);


  // browser.executeScript('window.open()').then(function() {
  //   browser.getAllWindowHandles().then(function(handles) {
  //     var secondWindow = handles[1];
  //     browser.switchTo().window(secondWindow).then(function() {
  //       browser.get("http://localhost:9002/?url=http://localhost:8001");
  //       browser.sleep(1000);
  //     });
  //   });
  // });
};
