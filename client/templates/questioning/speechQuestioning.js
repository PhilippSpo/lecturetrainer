Template.speechQuestioning.created = function() {
	Template.speechQuestioning.reverse = false;
};

Template.speechQuestioning.helpers({
	answerSchema: function() {
		return Schemas.answerSchema;
	},
	reverse: function() {
		if (Math.random() >= 0.5) {
			Template.speechQuestioning.reverse = true;
		}
		return Template.speechQuestioning.reverse;
	},
	project: function() {
		return Projects.findOne({_id: FlowRouter.getParam('projectId')});
	},
	numberOfAnswers: function() {
		if(this.answer){
			return this.answer.split(',').length;
		}
	}
});

AutoForm.hooks({
	questioningForm: {
		before: {
			method: function(doc) {
				Template.question.answer = doc.answer;
				doc.questionId = FlowRouter.getParam('questionId');
				doc.projectId = FlowRouter.getParam('projectId');
				doc.reverse = Template.speechQuestioning.reverse;
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
