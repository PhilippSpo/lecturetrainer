Template.menuItem.helpers({
  openMenu: function () {
    FlowRouter.go(this.path, this.params);
  }
});
