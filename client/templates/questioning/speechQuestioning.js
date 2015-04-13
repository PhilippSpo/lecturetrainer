Template.speechQuestioning.helpers({
	answerSchema: function() {
		return Schemas.answerSchema;
	},
	numberOfAnswers: function() {
		return this.answer.split(',').length;
	}
});

AutoForm.hooks({
	questioningForm: {
		before: {
			method: function(doc) {
				Template.question.answer = doc.answer;
				doc.questionId = FlowRouter.getParam('questionId');
				doc.projectId = FlowRouter.getParam('projectId');
				return doc;
			}
		},
		onSuccess: function(operation, result) {
			Template.question.correct = result;
			FlowLayout.render('layout', {
				top: 'answerToolbar',
				main: 'answer',
				aside: 'menu'
			});
		}
	}
});