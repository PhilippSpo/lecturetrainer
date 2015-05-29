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

  describe('clicking on a project', function(){
    it('goes to the chapters list for the clicked project', function(done){
      var projectNode = page.getProjects().get(0);
      var projectName = $(projectNode).text().trim();

      // try to find the project in the database
      var project = Projects.findOne({name: projectName});
      expect(project).not.toBeUndefined();
      // found project -> click on project
      projectNode.click();

      waitForRouter(function() {
        expect(FlowRouter.getRouteName()).toEqual('chapters');
        expect(FlowRouter.getParam('projectId')).toEqual(project._id);
        done();
      });
    });
  });
});
