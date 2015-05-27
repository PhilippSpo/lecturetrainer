AccountsTemplates.configure({
  sendVerificationEmail: true,
  showForgotPasswordLink: true,
  defaultLayout: 'layout',
  overrideLoginErrors: true,
  defaultLayoutRegions: {
    top: '',
    topButtons: '',
    aside: '',
    main: ''
  },
  defaultContentRegion: 'main',
  homeRoutePath: '/projects',

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: false,
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

FlowRouter.route('/showGroups', {
  subscriptions: function () {
    this.register('groups', Meteor.subscribe('groups'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'umShowGroups',
      aside: 'menu',
      globalDialog: 'umAddGroup',
      fab: 'addGroupFab'
    });
  }
});

FlowRouter.route('/showGroups/:groupId', {
  subscriptions: function () {
    this.register('groups', Meteor.subscribe('groups'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'groupContext',
      main: 'umShowGroup',
      aside: 'menu',
      topButtons: 'editGroupButtons',
      globalDialog: '',
      fab: ''
    });
  }
});

  FlowRouter.route('/showGroups/members/:groupId', {
    subscriptions: function () {
      this.register('groups', Meteor.subscribe('groups'));
    },
    action: function () {
      FlowLayout.render('layout', {
        top: 'groupContext',
        main: 'umShowGroupMembers',
        aside: 'menu',
        topButtons: 'groupContextEdit',
        globalDialog: '',
        fab: ''
      });
    }
  });

FlowRouter.route('/editGroup/:groupId', {
  subscriptions: function () {
    this.register('groups', Meteor.subscribe('groups'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'groupContextEdit',
      main: 'umEditGroup',
      aside: 'menu',
      topButtons: '',
      globalDialog: '',
      fab: ''
    });
  }
});

FlowRouter.route('/showUsers', {
  subscriptions: function () {
    this.register('users', Meteor.subscribe('users'));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      topButtons: 'umSearchUser',
      main: 'umShowUsers',
      aside: 'menu',
      globalDialog: 'umAddUser',
      fab: 'addUserFab'
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
      top: 'userContext',
      topButtons: 'editUserButtons',
      main: 'umShowUser',
      aside: 'menu',
      fab: '',
      globalDialog: ''
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
      top: 'userContextEdit',
      topButtons: '',
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

FlowRouter.route('/projects/', {
  subscriptions: function () {
    this.register('projects', Meteor.subscribe('projects'));
  },
  middlewares: [AccountsTemplates.ensureSignedIn],
  action: function () {
    FlowLayout.render('layout', {
      top: 'projectsListToolbar',
      main: 'projectsList',
      aside: 'menu',
      fab: 'addProjectFab'
    });
  },
  name: 'projects'
});

FlowRouter.route('/projects/newProject/', {
  name: 'newProject',
  middlewares: [AccountsTemplates.ensureSignedIn],
  action: function () {
    FlowLayout.render('layout', {
      top: 'newProjectToolbar',
      main: 'newProject',
      aside: 'menu'
    });
  }
});

FlowRouter.route('/projects/:projectId/', {
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
      aside: 'menu',
      fab: 'addChapterFab'
    });
  },
  name: 'chapters'
});

FlowRouter.route('/projects/:projectId/newChapter/', {
  name: 'newChapter',
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

FlowRouter.route('/projects/:projectId/update/', {
  name: 'updateProject',
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

FlowRouter.route('/projects/:projectId/:chapterId/', {
  name: 'questions',
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('projects', Meteor.subscribe('projects', params.projectId));
    this.register('chapters', Meteor.subscribe('chapter', params.chapterId));
  },
  action: function () {
    FlowLayout.render('layout', {
      top: 'questionsListToolbar',
      main: 'questionsList',
      aside: 'menu',
      fab: 'addQuestionFab'
    });
  }
});

FlowRouter.route('/projects/:projectId/:chapterId/newQuestion/', {
  name: 'newQuestion',
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

FlowRouter.route('/projects/:projectId/:chapterId/update/', {
  name: 'updateChapter',
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

FlowRouter.route('/projects/:projectId/:chapterId/:questionId/update/', {
  name: 'updateQuestion',
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

FlowRouter.route('/projects/:projectId/:chapterId/:questionId/', {
  name: 'question',
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


FlowRouter.route('/impressum/', {
  name: 'impressum',
  action: function () {
    FlowLayout.render('layout', {
      top: 'impressumToolbar',
      main: 'impressum',
      aside: 'menu'
    });
  }
});
