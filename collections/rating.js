Ratings = new Mongo.Collection('ratings');

Rating = new SimpleSchema({
	project: {
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