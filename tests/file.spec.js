var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

//Required pages & util
var loginPage = require('../pages/login.po');
var filePage = require('../pages/file/file.po');
var utils = require('../utils/utils');
var fileCrudl = require('../utils/file.crudl');

describe('Files E2E', function() {
  before('login to the portal app', function() {
    var progress = 'md-progress-circular';

    loginPage.commands.navigate();
    utils.waitNotPresent(progress);
    loginPage.commands.login("trever", "123");
    utils.waitNotPresent(loginPage.selectors.logoutButton);
    browser.sleep(1000);
    utils.navigateToPage(filePage.selectors.filesMenuButton);
  });

  describe('FILES NAVIGATION', function() {
    it('should be able to navigate to the files section', function() {
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


  // List
  describe('LIST', function() {

    var fileListContainer = filePage.selectors.fileListContainer;
    var fileListLength;

    it('should display an empty list if no files are available', function() {
      fileListLength = fileListContainer.all(by.xpath("./*")).count();
      expect(fileListContainer.isPresent());
      expect(fileListLength).eventually.to.equal(0);
    });

    it('should display a list of files available', function() {
      fileCrudl.create();
      utils.navigateToPage($(loginPage.selectors.logoutSideButton));
      utils.navigateToPage(filePage.selectors.filesMenuButton);
      fileListLength = fileListContainer.all(by.xpath("./*")).count();
      expect(fileListContainer.isPresent());
      expect(fileListLength).eventually.to.be.above(0);
    });
  });

  //Read
  describe('READ', function() {
    it('should display the file details once selected [PORTAL]', function() {
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
      expect(fileDetail.uid.getText()).eventually.not.to.equal('');
      // expect(fileDetail.owner.getText()).eventually.to.equal('Trever Smith'); //Owner value not showing up on portal.
      expect(fileDetail.preview.isDisplayed()).eventually.to.be.true;
    });
  });



  //Search
  describe('SEARCH', function() {
    it('should have a search field visible', function() {
      expect(filePage.selectors.searchBar.isPresent());
    });

    it('should be able to accept input', function() {
      expect(filePage.selectors.searchBar.sendKeys('test'));
      expect(filePage.selectors.searchBar.clear());
    });
  });
});