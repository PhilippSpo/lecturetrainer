Questions = new Mongo.Collection('questions');

QuestionSchema = new SimpleSchema({
	question: {
		type: String,
		label: "Question"
	},
	tags: {
		type: [String],
		label: "Tags",
		optional: true
	},
	answer: {
		type: String,
		label: "Answer"
	},
	project: {
		type: String
	},
	hasRating: {
		type: [Object],
		optional: true
	},
	'hasRating.$.user': {
		type: String
	}
});

Questions.attachSchema(QuestionSchema);