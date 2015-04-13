Template.projectsList.helpers({
	projects: function () {
		return Projects.find({}, {sort: {name: 1}});
	}
});

Template.projectsListToolbar.rendered = function () {
	$(".collapse-sidenav").sideNav({
		menuWidth: 300,
		edge: 'left',
		closeOnClick: true
	});
};