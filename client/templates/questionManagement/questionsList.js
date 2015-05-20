Template.questionsList.onCreated(function () {
	var self = this;
	self.limit = new ReactiveVar(10);

	self.autorun(function () {
		self._subs = [];
		if (!FlowRouter.getParam('chapterId')) {
			return;
		}
		console.log(FlowRouter.getParam('chapterId'), self.limit.get());
		var sub = Meteor.subscribe('questionsForChapter', FlowRouter.getParam(
			'chapterId'), self.limit.get());
		self._subs.push(sub);
	});

	self.checkScrollLimit = function () {

		var threshold, target = $("#showMoreResults");
		if (!target.length) {
			return;
		}

		threshold = $('.fixed-content-wrapper').scrollTop() + $(
				'.fixed-content-wrapper').height() - target.height() +
			100;

		if (target.offset().top < threshold) {
			if (!target.data("visible")) {
				// console.log("target became visible (inside viewable area)");
				target.data("visible", true);
				if (!this.moreResults()) {
					this.limit.set(this.limit.get() + 10);
				}
			}
		} else {
			if (target.data("visible")) {
				// console.log("target became invisible (below viewable arae)");
				target.data("visible", false);
			}
		}
	};
	self.incrementLimit = function (inc) {
		inc = inc || 10;
		self.limit.set(self.limit.get() + inc);
	};

	self.moreResults = function () {
		return (Questions.find({
			project: FlowRouter.getParam('projectId')
		}).count() < self.limit.get());
	};
	self.ready = function () {
		var ready = true;
		self._subs.forEach(function (sub) {
			ready = sub.ready();
		});

		return ready;
	};

});

Template.questionsList.onRendered(function () {
	var self = this;
	var checkScrollLimit = function () {
		self.checkScrollLimit();
	};
	$('.fixed-content-wrapper').scroll(checkScrollLimit);
	self.checkScrollLimit();
});
Template.questionsList.onDestroyed(function () {
	var self = this;
	self._subs.forEach(function (sub) {
		sub.stop();
	});
	self._subs = [];
	$('.fixed-content-wrapper').off('scroll');
});

Template.questionsList.helpers({
	questions: function () {
		var tmpl = Template.instance();
		return Questions.find({
			project: FlowRouter.getParam('projectId')
		}, {
			limit: tmpl.limit.get()
		});
	},
	projectId: function () {
		return FlowRouter.getParam('projectId');
	},
	chapterId: function () {
		return FlowRouter.getParam('chapterId');
	},
	isReady: function () {
		var tmpl = Template.instance();
		if (tmpl.ready() === true) {
			tmpl.checkScrollLimit();
		}
		return tmpl.ready();
	}
});

Template.questionsListToolbar.helpers({
	project: function () {
		return Projects.findOne({
			_id: FlowRouter.getParam('projectId')
		});
	},
	chapter: function () {
		return Chapters.findOne({
			_id: FlowRouter.getParam('chapterId')
		});

	}
});
