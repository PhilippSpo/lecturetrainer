var helpers = {
  isSpeechProject: function () {
    var project = Projects.findOne({
      _id: FlowRouter.getParam('projectId')
    });
    if (project && project.type === 'Speech') {
      return true;
    }
    return false;
  },
  question: function () {
    return Questions.findOne({
      _id: FlowRouter.getParam('questionId')
    });
  },
  isReady: function () {
    return FlowRouter.subsReady();
  }
};

Template.updateQuestion.helpers(helpers);

AutoForm.hooks({
  updateQuestionForm: {
    before: {
      update: function (doc) {
        if (helpers.isSpeechProject() === false) {
          doc.$set.answer = $('div#answer').editable('getHTML');
        }
        $(':submit').text('saving...');
        return doc;
      }
    },
    onError: function () {
      $(':submit').text('update');
    },
    onSuccess: function () {
      FlowRouter.go('/projects/:projectId/:chapterId', {
        projectId: FlowRouter.getParam('projectId'),
        chapterId: FlowRouter.getParam('chapterId')
      });
    }
  }
});

Template.updateQuestionToolbar.helpers({
  projectId: function () {
    return FlowRouter.getParam('projectId');
  }
});

Template.updateQuestionToolbar.events({
  'click #deleteQuestionButton': function () {
    // e.preventDefault();
    Questions.remove({
      _id: FlowRouter.getParam('questionId')
    });
  }
});
