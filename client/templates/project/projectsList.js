Template.projectsList.helpers({
	projects: function () {
		return Projects.find({}, {sort: {name: 1}});
	}
});