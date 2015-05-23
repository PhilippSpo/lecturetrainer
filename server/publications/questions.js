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

Meteor.publishComposite('questionsForChapter', function (chapterId, limit) {
	if (limit > Questions.find({
			chapter: chapterId
		}).count()) {
		limit = 0;
	}
	if (chapterId) {
		return {
			find: function () {
				return Questions.find({
					chapter: chapterId
				}, {
					limit: limit
				});
			},
			children: [{
				find: function (question) {
					return Ratings.find({
						user: this.userId,
						question: question._id
					});
				}
			}]
		};
	}
	return Questions.find({}, {
		limit: limit
	});
});
