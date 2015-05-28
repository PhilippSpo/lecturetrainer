// Page object describing the project list
var page = {
  getProjectListSection: function(){
    return $('.main-content-wrapper');
  },

  getAddProjectButton: function() {
    return $('.fixed-action-btn').find('a').get(0);
  },

  getProjects: function() {
    return this.getProjectListSection().find('.collection > .collection-item');
  },

  getProjectNames: function() {
    return this.gerProjects.map(function() {
      return $(this).text();
    }).get();
  }
};

describe('project list', function() {
  beforeEach(loginWithDefaultUser);
  beforeEach(goToDefaultProjectList);
  beforeEach(waitForRouter);

  describe('clicking on the add project button', function() {
    it('goes to the add project page', function(done) {
      page.getAddProjectButton().click();
      Tracker.flush();

      waitForRouter(function() {
        expect(FlowRouter.getRouteName()).toEqual('newProject');
        done();
      });
    });
  });

  describe('clicking on a project', function(done){
      if(!page.getProjects().get(0)){
        return;
      }
      page.getProjects().get(0).click();

      waitForRouter(function() {
        console.log('current route: '+FlowRouter.getRouteName());
        expect(FlowRouter.getRouteName()).toEqual('chapters');
        done();
      });
  });
});
