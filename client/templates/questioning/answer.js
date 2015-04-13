Template.answer.helpers({
	question: function() {
		return Questions.findOne({
			_id: FlowRouter.getParam('questionId')
		});
	},
	userAnswer: function() {
		return Template.question.answer;
	},
	correct: function() {
		return Template.question.correct;
	},
});
Template.answer.events({
	'click #nextQuestion': function () {
		Meteor.call('calcNextQuestion', FlowRouter.getParam('questionId'), FlowRouter.getParam('projectId'), function(err, result) {
			// result returns the question id
			console.log(result);
			if (!err) {
				if (result !== false) {
					Session.set('prevQuestion', FlowRouter.getParam('questionId'));
					FlowRouter.setParams({
						questionId: result
					});
				}
			}
		});
	}
});

Template.answerToolbar.helpers({
	projectId: function() {
		return FlowRouter.getParam('projectId');
	}
});