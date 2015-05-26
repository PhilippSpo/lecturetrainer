Template.editGroupButtons.helpers({
  'groupId': function() {
      return FlowRouter.current().params.groupId;
  }
});

Template.groupContext.helpers({
    'group': function(){
      console.log(Groups.findOne({
          _id: FlowRouter.current().params.groupId
      }));
      return Groups.findOne({
          _id: FlowRouter.current().params.groupId
      });
    }
});

Template.groupContextEdit.helpers({
    'group': function(){
      return Groups.findOne({
          _id: FlowRouter.current().params.groupId
      });
    },
    'groupId': function() {
      return FlowRouter.current().params.groupId;
    }
});
