var resetDatabase = function () {
  // safety check
  if (!process.env.IS_MIRROR) {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    );
  }

  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  var collections = Meteor.wrapAsync(db.collections, db)();
  var appCollections = _.reject(collections, function (col) {
    return col.collectionName.indexOf('velocity') === 0 ||
      col.collectionName === 'system.indexes' ||
      col.collectionName === 'users';
  });

  _.each(appCollections, function (appCollection) {
    console.log('remove ' + appCollection.collectionName);
    Meteor.wrapAsync(appCollection.remove, appCollection)();
  });
};

var resetTestingEnvironment = function () {
  if (process.env.IS_MIRROR) {
    resetDatabase();
  } else {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'resetTestingEnvironment can only be executed in a Velocity mirror.'
    );
  }
};

var createUser = function (userData) {
  var user = Meteor.users.findOne({username: userData.username});

  if (!user) {
    var userId = Accounts.createUser(userData);
    user = Meteor.users.findOne(userId);
  }

  return user;
};

var createDefaultUser = function () {
  return createUser({
    email: 'test@spacetalk.com',
    password: 'test',
    username: 'test'
  });
};

var createProject = function (project) {
  var projectId = Projects.insert(project);

  return Projects.findOne(projectId);
};

var createDefaultProject = function () {
  var project = {
    name: 'test',
    type: 'Speech',
    speechA: 'German',
    speechB: 'English'
  };

  return createProject(project);
};

Meteor.methods({
  resetTestingEnvironment: resetTestingEnvironment,
  'fixtures/users/create': createUser,
  'fixtures/users/createDefault': createDefaultUser,
  'fixtures/projects/create': createProject,
  'fixtures/projects/createDefault': createDefaultProject
});
