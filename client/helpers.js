Template.registerHelper("projectId", function () {
  return FlowRouter.getParam('projectId');
});

Template.registerHelper("chapterId", function () {
  return FlowRouter.getParam('chapterId');
});

Template.registerHelper("questionId", function () {
  return FlowRouter.getParam('questionId');
});

Template.registerHelper("gravatar", function (email) {
  var options = {
    secure: true,
    default: 'mm'
  };

  var md5Hash = Gravatar.hash(email);

  return Gravatar.imageUrl(md5Hash, options);
});

Template.registerHelper("ready", function (subscription) {
  if (subscription) {
    return FlowRouter.subsReady(subscription);
  }
  return FlowRouter.subsReady();
});

Template.registerHelper("currentRoute", function (route) {
  return FlowRouter.current().route.name === route;
});
