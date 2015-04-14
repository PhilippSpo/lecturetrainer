Template.newQuestionToolbar.helpers({
	projectId: function () {
		return FlowRouter.getParam('projectId');
	}
});

var helpers = {
  isSpeechProject: function() {
    var project = Projects.findOne({_id: FlowRouter.getParam('projectId')});
    if(project && project.type === 'Speech'){
      return true;
    }
    return false;
  }
}

Template.newQuestion.helpers(helpers);

Template.newQuestion.onRendered(function() {
  $('div#answer').editable({
    inlineMode: false
  });
});

AutoForm.hooks({
  insertQuestionForm: {
  	before: {
  		insert: function(doc) {
        if(helpers.isSpeechProject() === false){
          doc.answer = $('div#answer').editable('getHTML');
        }
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