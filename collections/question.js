Questions = new Mongo.Collection('questions');

QuestionSchema = new SimpleSchema({
	question: {
		type: String,
		label: "Question",
    	index: 1
	},
	tags: {
		type: [String],
		label: "Tags",
		optional: true
	},
	answer: {
		type: String,
		label: "Answer",
    	index: 1
	},
	project: {
		type: String,
    	index: 1
	},
	hasRating: {
		type: [Object],
		optional: true,
    	index: 1
	},
	'hasRating.$.user': {
		type: String,
    	index: 1
	}
});

Questions.attachSchema(QuestionSchema);