Template.qaAnswer.helpers({
	question: function() {
		return Questions.findOne({
			_id: FlowRouter.getParam('questionId')
		});
	}
});

Template.qaAnswer.events({
	'click #correctAnswer': function() {
		Meteor.call('correctAnswer', FlowRouter.getParam('projectId'), FlowRouter.getParam('questionId'), function() {
			nextQuestion();
		});
	},
	'click #wrongAnswer': function() {
		Meteor.call('wrongAnswer', FlowRouter.getParam('projectId'), FlowRouter.getParam('questionId'), function() {
			nextQuestion();
		});
	}
})

function nextQuestion() {
	Meteor.call('calcNextQuestion', FlowRouter.getParam('questionId'), FlowRouter.getParam('projectId'), function(err, result) {
		// result returns the question id
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