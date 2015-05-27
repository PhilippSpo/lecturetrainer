Template.qaQuestioning.events({
  'click #showAnswer': function (e) {
    $(e.target).text('loading...');
    $(e.target).prop( "disabled", true );
    FlowLayout.render('layout', {
      top: 'answerToolbar',
      main: 'qaAnswer',
      aside: 'menu'
    });
  }
});
