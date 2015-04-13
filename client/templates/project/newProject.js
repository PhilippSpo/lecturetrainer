AutoForm.hooks({
  insertProjectForm: {
  	onSuccess: function() {
  		FlowRouter.go('/');
  	},
  	onError: function(operation, error, template) {
  		// console.log(operation, error);
  	}
  }
});