Template.questionsList.helpers({
  questions: function () {
    return Questions.find({
      project: FlowRouter.getParam('projectId')
    });
  },
  projectId: function () {
    return FlowRouter.getParam('projectId');
  },
  chapterId: function () {
    return FlowRouter.getParam('chapterId');
  }
});

Template.questionsListToolbar.helpers({
  project: function () {
    return Projects.findOne({
      _id: FlowRouter.getParam('projectId')
    });
  },
  chapter: function () {
    return Chapters.findOne({
      _id: FlowRouter.getParam('chapterId')
    });

  }
});
