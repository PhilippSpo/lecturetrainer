Template.updateQuestion.helpers({
	question: function () {
		return Questions.findOne({_id: FlowRouter.getParam('questionId')});
	},
	isReady: function() {
		return FlowRouter.subsReady();
	}
});

Template.updateQuestionToolbar.helpers({
	projectId: function () {
		return FlowRouter.getParam('projectId');
	}
});

Template.updateQuestionToolbar.events({
  'click #deleteQuestionButton': function (e) {
    // e.preventDefault();
    Questions.remove({_id: FlowRouter.getParam('questionId')});
  }
});