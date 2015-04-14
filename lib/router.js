AccountsTemplates.configure({
	sendVerificationEmail: true,
	showForgotPasswordLink: true,
	defaultLayout: 'layout',
	defaultLayoutRegions: {
		top: '',
		aside: ''
	},
	defaultContentRegion: 'main'
});

AccountsTemplates.configureRoute('signIn');

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('resetPwd');

AccountsTemplates.configureRoute('verifyEmail');

FlowRouter.route('/', {
	action: function() {
		if(Meteor.user()){
			FlowRouter.go('/projects');
		}else{
			FlowLayout.render('landingLayout', {
				top: 'welcomeToolbar',
				main: 'welcome',
				aside: 'menu'
			});
		}
	}
})

FlowRouter.route('/projects', {
	subscriptions: function() {
		this.register('projects', Meteor.subscribe('projects'));
	},
	middlewares: [AccountsTemplates.ensureSignedIn],
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'projectsListToolbar',
			main: 'projectsList',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/newProject', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'newProjectToolbar',
			main: 'newProject',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/projects', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	action: function(params) {
		FlowRouter.go('/');
	}
});

FlowRouter.route('/projects/:projectId', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	subscriptions: function(params) {
		this.register('projects', Meteor.subscribe('projects', params.projectId));
		this.register('questions', Meteor.subscribe('questions', params.projectId));
		this.register('ratings', Meteor.subscribe('ratings'));
	},
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'questionsListToolbar',
			main: 'questionsList',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/projects/:projectId/update', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	subscriptions: function(params) {
		this.register('projects', Meteor.subscribe('projects', params.projectId));
	},
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'updateProjectToolbar',
			main: 'updateProject',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/projects/:projectId/newQuestion', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	subscriptions: function(params) {
		this.register('projects', Meteor.subscribe('projects', params.projectId));
	},
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'newQuestionToolbar',
			main: 'newQuestion',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/projects/:projectId/:questionId/update', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	subscriptions: function(params) {
		this.register('projects', Meteor.subscribe('projects', params.projectId));
		this.register('questions', Meteor.subscribe('questions', params.projectId, params.questionId));
	},
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'updateQuestionToolbar',
			main: 'updateQuestion',
			aside: 'menu'
		});
	}
});

FlowRouter.route('/projects/:projectId/:questionId', {
	middlewares: [AccountsTemplates.ensureSignedIn],
	subscriptions: function(params) {
		this.register('projects', Meteor.subscribe('projects', params.projectId));
		this.register('questions', Meteor.subscribe('questions', params.projectId, params.questionId));
		this.register('ratings', Meteor.subscribe('ratings'));
	},
	action: function(params) {
		FlowLayout.render('layout', {
			top: 'questionToolbar',
			main: 'question',
			aside: 'menu'
		});
	}
});