Ratings = new Mongo.Collection('ratings');

Rating = new SimpleSchema({
	project: {
		type: String
	},
	question: {
		type: String
	},
	user: {
		type: String
	},
	score: {
		type: Number
	}
});

Ratings.attachSchema(Rating);