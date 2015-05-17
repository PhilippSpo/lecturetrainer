Meteor.publish('questions', function (projectId, questionId) {
	if (projectId) {
		if (questionId) {
			Questions.find({
				_id: questionId
			});
		}
		return Questions.find({
			project: projectId
		});
	}
	this.ready();
});

Meteor.publish('questionsForChapter', function (chapterId) {
	if (chapterId) {
		return Questions.find({
			chapter: chapterId
		});
	}
	return Questions.find();
});
