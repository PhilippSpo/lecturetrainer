Meteor.publish('questions', function (projectId, questionId) {
  if (projectId) {
    if (questionId) {
      Questions.find({
        _id: questionId
      });
    }
    return Questions.find({
      project: projectId
    });
  }
  this.ready();
});

Meteor.publish('questionsForChapter', function (chapterId, limit) {
  if (limit > Questions.find({
      chapter: chapterId
    }).count()) {
    limit = 0;
  }
  if (chapterId) {
    return Questions.find({
      chapter: chapterId
    }, {
      limit: limit
    });
  }
  return Questions.find({}, {
    limit: limit
  });
});
