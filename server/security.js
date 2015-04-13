Security.defineMethod("ifIsCurrentUser", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc.user;
  }
});

Projects.permit(['insert', 'update']).ifLoggedIn().apply();

Questions.permit(['insert', 'remove', 'update']).ifLoggedIn().apply();

Ratings.permit(['insert', 'update', 'remove']).never().apply();