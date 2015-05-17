Template.speechQuestioning.onRendered(function () {
  $('input[autofocus]').focus();
});

Template.speechQuestioning.helpers({
  answerSchema: function () {
    return Schemas.answerSchema;
  },
  reverse: function () {
    if (Math.random() >= 0.5) {
      LayoutTemplate.reverse = true;
    } else {
      LayoutTemplate.reverse = false;
    }
    return LayoutTemplate.reverse;
  },
  project: function () {
    return Projects.findOne({
      _id: FlowRouter.getParam('projectId')
    });
  },
  numberOfAnswers: function () {
    if (this.answer) {
      return this.answer.split(',').length;
    }
  }
});

AutoForm.hooks({
  questioningForm: {
    before: {
      method: function (doc) {
        $(':submit').text('loading...');
        Template.question.answer = doc.answer;
        doc.questionId = FlowRouter.getParam('questionId');
        doc.projectId = FlowRouter.getParam('projectId');
        doc.reverse = LayoutTemplate.reverse;
        return doc;
      }
    },
    onSuccess: function (operation, result) {
      Template.question.correct = result;
      FlowLayout.render('layout', {
        top: 'answerToolbar',
        main: 'answer',
        aside: 'menu'
      });
    }
  }
});
