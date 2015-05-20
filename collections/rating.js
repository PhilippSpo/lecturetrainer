Ratings = new Mongo.Collection('ratings');

Rating = new SimpleSchema({
	project: {
		type: String,
		index: 1
	},
	chapter: {
		type: String,
		index: 1
	},
	question: {
		type: String,
		index: 1
	},
	user: {
		type: String,
		index: 1
	},
	score: {
		type: Number,
		index: 1
	}
});

Ratings.attachSchema(Rating);

if (false) {
	Questions.find({}).forEach(function (question) {
		if (question.hasOwnProperty('tags')) {
			_.each(question.tags, function (tag) {
				var existingChapter = Chapters.findOne({
					title: tag,
					project: question.project
				});
				if (!existingChapter) {
					var chapterId = Chapters.insert({
						title: tag,
						project: question.project
					});
					Questions.update({
						_id: question._id
					}, {
						$set: {
							chapter: chapterId
						}
					});
				} else {
					Questions.update({
						_id: question._id
					}, {
						$set: {
							chapter: existingChapter._id
						}
					});
				}
			});
		}
	});
}
