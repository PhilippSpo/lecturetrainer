Template.globalLayout.helpers({
  globalDialogTemplate: function() {
    return Session.get("global.ui.dialogTemplate");
  },
  globalDialogData: function() {
    return Session.get("global.ui.dialogData");
  }
});

Template.globalLayout.events({
  "click [data-open-dialog]": function(e) {
    var node = $(e.currentTarget);
    showDialogForNode(node, this);
  }
});

this.showDialogForNode = function(node, context){
    return GlobalUI.showDialog({
      heading: node.data("heading"),
      template: node.data("template"),
      data: function() {
        if(node.data("context") !== null){
          return context;
        }
        return void 0;
      }
    });
};
