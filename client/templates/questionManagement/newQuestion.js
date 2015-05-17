Template.newQuestionToolbar.helpers({
	projectId: function () {
		return FlowRouter.getParam('projectId');
	}
});

var helpers = {
	isSpeechProject: function () {
		var project = Projects.findOne({
			_id: FlowRouter.getParam('projectId')
		});
		if (project && project.type === 'Speech') {
			return true;
		}
		return false;
	}
};

Template.newQuestion.helpers(helpers);

AutoForm.hooks({
	insertQuestionForm: {
		before: {
			insert: function (doc) {
				doc.chapter = FlowRouter.getParam('chapterId');
				if (helpers.isSpeechProject() === false) {
					doc.answer = $('div#answer').editable('getHTML');
				}
				doc.project = FlowRouter.getParam('projectId');
				return doc;
			}
		},
		onSuccess: function () {
			this.resetForm();
			FlowRouter.go('/projects/:projectId/:questionId', {
				projectId: FlowRouter.getParam('projectId'),
				questionId: FlowRouter.getParam('questionId')
			});
		},
		onError: function (operation, error) {
			console.log(operation, error);
		},
		onSubmit: function () {
			this.resetForm();
			return false;
		}
	}
});
