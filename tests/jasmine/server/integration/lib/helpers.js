/* globals
 resetTestingEnvironment: true,
 createDefaultProject: true,
 createDefaultUser: true
 */

resetTestingEnvironment = function () {
  Meteor.call('resetTestingEnvironment');
};

createDefaultProject = function () {
  var self = this;

  self.team = Meteor.call('fixtures/projects/createDefault');
};

createDefaultUser = function () {
  var self = this;

  self.user = Meteor.call('fixtures/users/createDefault');
};
