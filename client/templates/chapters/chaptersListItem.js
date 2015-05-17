Template.chaptersListItem.helpers({
  projectId: function () {
    return FlowRouter.getParam('projectId');
  }
});


Template.chaptersListItem.events({
  "click": function () {
    FlowRouter.go('/projects/:projectId/:chapterId', {
      projectId: FlowRouter.getParam('projectId'),
      chapterId: this._id
    });
  }
});
