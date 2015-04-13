Meteor.publish('ratings', function() {
	return Ratings.find();
});