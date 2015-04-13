Questions = new Mongo.Collection('questions');

QuestionSchema = new SimpleSchema({
	question: {
		type: String,
		label: "Fragetext"
	},
	tags: {
		type: [String],
		label: "Kategorien",
		optional: true
	},
	answer: {
		type: String,
		label: "Antwort"
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