Template.registerHelper("projectId", function () {
	return FlowRouter.getParam('projectId');
});

Template.registerHelper("chapterId", function () {
	return FlowRouter.getParam('chapterId');
});

Template.registerHelper("questionId", function () {
	return FlowRouter.getParam('questionId');
});
