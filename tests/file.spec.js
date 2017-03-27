var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

//Required pages & util
var loginPage = require('../pages/login.po');
var filePage = require('../pages/file/file.po');
var utils = require('../utils/utils');
var file = require('../utils/file.crudl');

describe('Files E2E', function() {
  before('login to the portal app', function() {
    loginPage.commands.navigate();
    var progress = 'md-progress-circular';
    utils.waitNotPresent(progress);
    loginPage.commands.login("trever", "123");
    utils.waitNotPresent(loginPage.selectors.logoutButton);
    browser.sleep(1000);
  });

  beforeEach('navigate to files', function() {
    var menu = element(by.css("[aria-label*=Menu]"));
    menu.isDisplayed().then(function(isDisplayed) {
      if (isDisplayed) {
        menu.click();
      }

      filePage.commands.navigateToFiles();
    });
  });

  describe('FILES NAVIGATION', function() {
    it('should be able to navigate to the files section', function() {
      expect(filePage.selectors.filesMenuButton.isPresent()).eventually.to.be.true;
      expect(filePage.selectors.header.isPresent()).eventually.to.be.true;
      expect(filePage.selectors.header.getText()).eventually.to.equal('Files');
      expect(filePage.selectors.emptyContent.isPresent()).eventually.contains;
    });
  });

  //Create - Mobile only
  describe('CREATE', function() {
    xit('should be able to click on the create button', function() {
    });

    xit('should be able to create a new file', function() {
    });

    xit('should add and display the newly created file in the list', function() {
    });

    xit('should be able to select and display the file details of the newly created file', function() {
    });
  });

  //Read
  describe('READ', function() {
    //TODO: Create Test file here
    file.create();

    xit('should display the file details once selected [PORTAL]', function() {
      browser.sleep(10000);
      expect(filePage.selectors.emptyContent.isPresent()).eventually.to.be.true;
      var file = filePage.commands.getFile(0);
      file.click();
      browser.sleep(1000);
      expect(filePage.selectors.emptyContent.isPresent()).eventually.to.be.false;
      expect(filePage.selectors.fileDetail.container.isPresent()).eventually.to.be.true;

      //Make sure all file details are correct
      var fileDetail = filePage.commands.getFileDetail();
      expect(filePage.selectors.fileDetail.title.getText()).eventually.to.equal('photo.png');
      expect(fileDetail.name.getText()).eventually.to.equal('photo.png');
      // expect(fileDetail.uid.getText()).eventually.to.equal('28f492cb-7d8a-4b89-b475-13f34e539f43');
      // expect(fileDetail.owner.getText()).eventually.to.equal('Trever Smith'); //Owner value not showing up on portal.
      expect(fileDetail.preview.isDisplayed()).eventually.to.be.true;
    });
  });


  // List
  describe('LIST', function() {
    var fileListContainer = filePage.selectors.fileListContainer;
    var fileListLength;

    it('should display an empty list if no files are available', function() {
      fileListLength = fileListContainer.all(by.xpath("./*")).count();
      expect(fileListContainer.isPresent());
      expect(fileListLength).eventually.to.equal(0);
    });

    //TODO: Create test file here

    xit('should display a list of files available', function() {
      fileListLength = fileListContainer.all(by.xpath("./*")).count();
      expect(fileListContainer.isPresent());
      expect(fileListLength).eventually.to.be.above(0);
    });
  });

  //Search - Portal only (functionality not implemented but UI is there)
  describe('SEARCH [PORTAL ONLY]', function() {
    it('should have a search field visible', function() {
      expect(filePage.selectors.searchBar.isPresent());
    });

    it('should be able to accept input', function() {
      expect(filePage.selectors.searchBar.sendKeys('test'));
      expect(filePage.selectors.searchBar.clear());
    });
  });
});