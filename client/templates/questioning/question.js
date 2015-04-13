Template.questionToolbar.helpers({
	projectId: function() {
		return FlowRouter.getParam('projectId');
	}
});

Template.question.helpers({
	question: function() {
		return Questions.findOne({
			_id: FlowRouter.getParam('questionId')
		});
	},
	isSpeechProject: function() {
		var project = Projects.findOne({_id: FlowRouter.getParam('projectId')});
		if(project && project.type === 'Speech'){
			return true;
		}
		return false;
	}
});

Template.question.events({
	'click #prevQuestion': function() {
		if(Session.get('prevQuestion')){
			FlowRouter.setParams({
				questionId: Session.get('prevQuestion')
			});
		}
	},
	'click #nextQuestion': function () {
		Meteor.call('calcNextQuestion', FlowRouter.getParam('questionId'), FlowRouter.getParam('projectId'), function(err, result) {
			// result returns the question id
			if (!err) {
				if (result !== false) {
					Session.set('previousQuestion', FlowRouter.getParam('questionId'));
					FlowRouter.setParams({
						questionId: result
					});
				}
			}
		});
	}
});