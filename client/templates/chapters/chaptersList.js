Template.chaptersList.helpers({
	chapters: function() {
		return Chapters.find({project: FlowRouter.getParam('projectId')});
	}	
});

Template.chaptersListToolbar.helpers({
	project: function() {
		return Projects.findOne({_id: FlowRouter.getParam('projectId')});
	}
});