Meteor.publish('projects', function(projectId) {
	if(projectId){
		return Projects.find({_id: projectId});
	}else{
		return Projects.find();
	}
});