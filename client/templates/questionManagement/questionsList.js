Template.questionsList.helpers({
	questions: function() {
		return Questions.find({project: FlowRouter.getParam('projectId')});
	},
	projectId: function() {
		return FlowRouter.getParam('projectId');
	}
});

Template.questionsListToolbar.helpers({
	project: function () {
		return Projects.findOne({_id: FlowRouter.getParam('projectId')});
	}
});