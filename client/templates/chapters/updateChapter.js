Template.updateChapter.helpers({
  chapter: function () {
    return Chapters.findOne({
      _id: FlowRouter.getParam('chapterId')
    });
  }
});

AutoForm.hooks({
  updateChapterForm: {
    before: {
      update: function (doc) {
        $(':submit').text('saving...');
        return doc;
      }
    },
    onError: function () {
      $(':submit').text('update');
    },
    onSuccess: function () {
      FlowRouter.go('/projects/:projectId/', {
        projectId: FlowRouter.getParam('projectId')
      });
    }
  }
});
