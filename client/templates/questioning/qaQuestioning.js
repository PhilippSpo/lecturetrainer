Template.qaQuestioning.events({
	'click #showAnswer': function() {
		FlowLayout.render('layout', {
			top: 'answerToolbar',
			main: 'qaAnswer',
			aside: 'menu'
		});
	}
})