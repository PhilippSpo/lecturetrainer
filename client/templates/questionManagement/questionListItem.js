Template.questionsListItem.helpers({
	projectId: function() {
		return FlowRouter.getParam('projectId');
	},
	score: function() {
		var rating = Ratings.findOne({
			user: Meteor.user()._id,
			question: this._id
		});
		if (rating) {
			return rating.score;
		}
	},
	scoreColor: function (argument) {
		var rating = Ratings.findOne({
			user: Meteor.user()._id,
			question: this._id
		});
		if (rating) {
			if(rating.score > 1) {
				return 'green';
			}
			if(rating.score < -1) {
				return 'red';
			}
		}
		return 'orange';
	}
});

Template.questionsListItem.events({
	'click .collection-item': function() {
		FlowRouter.go('/projects/:projectId/:questionId',{
			projectId: FlowRouter.getParam('projectId'),
			questionId: this._id
		});
		// /projects/{{projectId}}/{{_id}}
	}
})