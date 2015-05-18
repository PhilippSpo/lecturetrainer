AccountsTemplates.configure({
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  defaultLayout: 'layout',
  defaultLayoutRegions: {
    top: '',
    aside: '',
    main: ''
  },
  defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('resetPwd');

AccountsTemplates.configureRoute('verifyEmail');

FlowRouter.route('/', {
  action: function () {
    if (Meteor.user()) {
      FlowRouter.go('/projects');
    } else {
      FlowLayout.render('landingLayout', {
        top: 'welcomeToolbar',
        main: 'welcome',
        aside: 'menu'
      });
    }
  }
});

FlowRouter.route('/showUsers', {
  subscriptions: function () {
    this.register('users', Meteor.subscribe('users'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'umShowUsers',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/showUsers/:userId', {
  subscriptions: function () {
    //TODO subscribe single user
    this.register('users', Meteor.subscribe('users'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'umShowUser',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/editUser/:userId', {
  subscriptions: function () {
    //TODO subscribe single user
    this.register('users', Meteor.subscribe('users'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'umEditUser',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/addUser', {
  subscriptions: function () {
    //TODO subscribe single user
    this.register('users', Meteor.subscribe('users'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'umAddUser',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects', {
  subscriptions: function () {
    this.register('projects', Meteor.subscribe('projects'));
  },
  middlewares: [AccountsTemplates.ensureSignedIn],
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'projectsList',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/newProject', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  action: function () {
    FlowLayout.render('layout', {
      top: 'newProjectToolbar',
      main: 'newProject',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  action: function () {
    FlowRouter.go('/');
  }
});

FlowRouter.route('/projects/:projectId', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('chapters', Meteor.subscribe('chaptersForProject',
      params.projectId));
    this.register('questions', Meteor.subscribe('questions', params.projectId));
    this.register('ratings', Meteor.subscribe('ratings'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'chaptersListToolbar',
      main: 'chaptersList',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/newChapter', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'newChapterToolbar',
      main: 'newChapter',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/update', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'updateProjectToolbar',
      main: 'updateProject',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('chapters', Meteor.subscribe('chapter', params.chapterId));
    this.register('questions', Meteor.subscribe('questionsForChapter',
      params.chapterId));
    this.register('ratings', Meteor.subscribe('ratings'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'questionsListToolbar',
      main: 'questionsList',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId/newQuestion', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'newQuestionToolbar',
      main: 'newQuestion',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId/update', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('chapters', Meteor.subscribe('chapter', params.chapterId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'updateChapterToolbar',
      main: 'updateChapter',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId/:questionId/update', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('questions', Meteor.subscribe('questions', params.projectId,
      params.questionId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'updateQuestionToolbar',
      main: 'updateQuestion',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId/:questionId', {
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('questions', Meteor.subscribe('questions', params.projectId,
      params.questionId));
    this.register('ratings', Meteor.subscribe('ratings'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'questionToolbar',
      main: 'question',
      aside: 'menu'
    });
  }
});


FlowRouter.route('/impressum', {
  action: function () {
    FlowLayout.render('layout', {
      top: 'impressumToolbar',
      main: 'impressum',
      aside: 'menu'
    });
  }
});
