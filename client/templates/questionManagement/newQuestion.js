Template.newQuestionToolbar.helpers({
	projectId: function () {
		return FlowRouter.getParam('projectId');
	}
});

AutoForm.hooks({
  insertQuestionForm: {
  	before: {
  		insert: function(doc) {
  			doc.project = FlowRouter.getParam('projectId');
  			return doc;
  		}
  	},
  	onSuccess: function() {
      this.resetForm();
  		FlowRouter.go('/projects/'+FlowRouter.getParam('projectId'));
  	},
  	onError: function(operation, error, template) {
  		console.log(operation, error);
  	},
    onSubmit: function (doc) {
      this.resetForm();
      return false;
    }
  }
});