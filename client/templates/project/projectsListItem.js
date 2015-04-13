Template.projectsListItem.events({
	'click .collection-item': function() {
		FlowRouter.go('/projects/:projectId',{
			projectId: this._id
		})
	}
})