Schemas = {};
Schemas.answerSchema = new SimpleSchema({
	answer: {
		type: String
	},
	questionId: {
		type: String
	},
	projectId: {
		type: String
	},
	chapterId: {
		type: String
	},
	reverse: {
		type: Boolean
	}
});
