Template.editUserButtons.helpers({
  'userId': function() {
      return FlowRouter.current().params.userId;
  }
});

Template.userContext.helpers({
    'user': function(){
      return Meteor.users.findOne({
          _id: FlowRouter.current().params.userId
      });
    }
});

Template.userContextEdit.helpers({
    'user': function(){
      return Meteor.users.findOne({
          _id: FlowRouter.current().params.userId
      });
    },
    'userId': function() {
      return FlowRouter.current().params.userId;
    }
});
