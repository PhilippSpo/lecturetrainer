Template.questionsListItem.onCreated(function () {
  this.score = ReactiveVar(null);
  var rating = Ratings.findOne({
    question: this.data._id
  });
  if (rating) {
    this.score.set(rating.score);
  }
});

Template.questionsListItem.helpers({
  projectId: function () {
    return FlowRouter.getParam('projectId');
  },
  chapterId: function () {
    return FlowRouter.getParam('chapterId');
  },
  score: function () {
    return Template.instance().score.get();
  },
  scoreColor: function () {
    var score = Template.instance().score.get();
    if (score > 1) {
      return 'green';
    }
    if (score < -1) {
      return 'red';
    }
    return 'orange';
  }
});

Template.questionsListItem.events({
  'click .collection-item': function () {
    FlowRouter.go('/projects/:projectId/:chapterId/:questionId', {
      projectId: FlowRouter.getParam('projectId'),
      chapterId: FlowRouter.getParam('chapterId'),
      questionId: this._id
    });
    // /projects/{{projectId}}/{{_id}}
  }
});
