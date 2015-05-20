Template.userArea.onRendered(function () {
  $('.dropdown-button').dropdown({});
});

Template.userArea.helpers({
  user: function () {
    return Meteor.user();
  },
  userEmail: function () {
    return Meteor.user().emails[0].address;
  }
});

Template.userArea.events({
  "click #logout": function () {
    AccountsTemplates.logout();
  }
});
