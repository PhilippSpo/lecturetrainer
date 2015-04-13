Template.updateProject.helpers({
	project: function () {
		return Projects.findOne({_id: FlowRouter.getParam('projectId')});
	}
});

AutoForm.hooks({
  updateProjectForm: {
  	onSuccess: function() {
  		FlowRouter.go('/');
  	},
  	onError: function(operation, error, template) {
  		// alert(operation, error);
  	}
  }
});