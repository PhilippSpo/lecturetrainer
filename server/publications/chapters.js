Meteor.publish('chapters', function() {
	return Chapters.find();
});
Meteor.publish('chapter', function(chapterId) {
	if(chapterId){
		return Chapters.find({_id: chapterId});
	}else{
		return Chapters.find();
	}
});
Meteor.publish('chaptersForProject', function(projectId) {
	if(projectId){
		return Chapters.find({project: projectId});
	}else{
		return Chapters.find();
	}
});