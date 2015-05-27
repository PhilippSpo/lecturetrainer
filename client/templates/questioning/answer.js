Template.answer.helpers({
  question: function () {
    return Questions.findOne({
      _id: FlowRouter.getParam('questionId')
    });
  },
  userAnswer: function () {
    return Template.question.answer;
  },
  correct: function () {
    return Template.question.correct;
  },
  project: function () {
    return Projects.findOne({
      _id: FlowRouter.getParam('projectId')
    });
  },
  reverse: function () {
    return LayoutTemplate.reverse;
  }
});
Template.answer.events({
  'click #nextQuestion': function (e) {
    $(e.target).text('loading...');
    $(e.target).prop( "disabled", true );
    Meteor.call('calcNextQuestion', FlowRouter.getParam('projectId'),
      FlowRouter.getParam('chapterId'), FlowRouter.getParam(
        'questionId'),
      function (err, result) {
        // result returns the question id
        if (!err) {
          if (result !== false) {
            Session.set('prevQuestion', FlowRouter.getParam(
              'questionId'));
            FlowRouter.setParams({
              questionId: result
            });
          }
        }
      });
  }
});

Template.answerToolbar.helpers({
  projectId: function () {
    return FlowRouter.getParam('projectId');
  }
});
