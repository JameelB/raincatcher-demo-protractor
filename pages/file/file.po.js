var FilesPage = function() {
  var selectors = {
    filesMenuButton: element(by.css("button[aria-label*=Files]")),
    header: element(by.xpath("//h3/span[text()='Files']")),
    emptyContent: element(by.css(".empty-state")),
    searchBar: element(by.id("search")),
    fileListContainer: element(by.css(".wfm-file-list")),
    fileList: $$('[ng-repeat*=file]'),
    fileDetail: {
      container: element(by.css('file-detail')),
      title: element(by.css('.content-toolbar')).element(by.css('h3')),
      detailVal: $$('file-detail > div > md-list > md-list-item > .md-list-item-text > h3')
    }
  };

  var commands = {
    navigateToFiles: function() {
      selectors.filesMenuButton.click();
    },
    getFile: function(index) {
      return selectors.fileList.get(index);
    },
    getFileDetail: function() {
      var fileDetail = {};

      fileDetail.name = selectors.fileDetail.detailVal.get(0);
      fileDetail.uid = selectors.fileDetail.detailVal.get(1);
      fileDetail.owner = selectors.fileDetail.detailVal.get(2);
      fileDetail.preview = selectors.fileDetail.detailVal.get(3).element(by.css('img'));

      return fileDetail;
    }
  };

  return {selectors, commands};
};

module.exports = new FilesPage();