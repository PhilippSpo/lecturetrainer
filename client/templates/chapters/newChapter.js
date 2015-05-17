AutoForm.hooks({
	insertChapterForm: {
		before: {
			insert: function (doc) {
				doc.project = FlowRouter.getParam('projectId');
				$(':submit').text('saving...');
				return doc;
			}
		},
		onSuccess: function (formType, chapterId) {
			FlowRouter.go('/projects/:projectId/:chapterId', {
				projectId: FlowRouter.getParam('projectId'),
				chapterId: chapterId
			});
		},
		onError: function () {
			$(':submit').text('create');
		}
	}
});
