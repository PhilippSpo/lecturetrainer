Template.qaQuestioning.events({
  'click #showAnswer': function (e) {
    $(e.target).text('loading...');
    FlowLayout.render('layout', {
      top: 'answerToolbar',
      main: 'qaAnswer',
      aside: 'menu'
    });
  }
});
