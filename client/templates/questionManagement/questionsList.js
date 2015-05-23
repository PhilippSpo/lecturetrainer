Template.questionsList.onCreated(function () {
  var self = this;
  // initial limit
  self.loaded = new ReactiveVar(0);
  self.limit = new ReactiveVar(5);
  // initial ready for inital loding indicator
  self.readyInitial = new ReactiveVar(false);
  // ready state of subscription
  self.ready = new ReactiveVar(false);

  self.autorun(function () {
    var limit = self.limit.get();
    // check if the chapterId is already there
    if (!FlowRouter.getParam('chapterId')) {
      return;
    }
    // console.log("Asking for "+limit+" questions");
    // subscribe to the questions publication
    var sub = self.subscribe('questionsForChapter', FlowRouter.getParam(
      'chapterId'), limit);

    if(sub.ready()){
      // console.log('> Recieved '+limit+ ' questions');
      self.loaded.set(limit);
      if(self.readyInitial.get() === false){
        self.readyInitial.set(true);
      }
      self.ready.set(true);
    } else {
      // console.log('> sub is not ready yet');
      self.ready.set(false);
    }
  });

  // setup the cursor
  self.questions = function() {
    return Questions.find({}, {limit: self.loaded.get()});
  };

  // function that checks if the user scrolled the list to the bottom
  self.checkScrollLimit = function () {

    var threshold, target = $("#showMoreResults");
    if (!target.length) {
      return;
    }

    threshold = $('.fixed-content-wrapper').scrollTop() + $(
        '.fixed-content-wrapper').height() - target.height() +
      30;

    // console.log(target.offset().top, threshold);
    // console.log(target.data("visible"));
    if (target.offset().top < threshold) {
      if (!target.data("visible")) {
        // console.log("target became visible (inside viewable area)");
        target.data("visible", true);
        if (this.moreResults()) {
          this.limit.set(this.limit.get() + 5);
        }
      }
    } else {
      if (target.data("visible")) {
        // console.log("target became invisible (below viewable arae)");
        target.data("visible", false);
      }
    }
  };
  // function to increment limit
  self.incrementLimit = function (inc) {
    inc = inc || 5;
    self.limit.set(self.limit.get() + inc);
  };
  // check if there are more results
  self.moreResults = function () {
    // console.log(self.questions().count(), self.limit.get());
    return self.questions().count() >= self.limit.get();
  };

});

Template.questionsList.onRendered(function () {
  var self = this;
  var checkScrollLimit = function () {
    self.checkScrollLimit();
  };
  $('.fixed-content-wrapper').scroll(checkScrollLimit);
});
Template.questionsList.onDestroyed(function () {
  $('.fixed-content-wrapper').off('scroll');
});

Template.questionsList.helpers({
  questions: function () {
    return Template.instance().questions();
  },
  projectId: function () {
    return FlowRouter.getParam('projectId');
  },
  chapterId: function () {
    return FlowRouter.getParam('chapterId');
  },
  isReady: function () {
    var tmpl = Template.instance();
    if (tmpl.ready.get() === true) {
      tmpl.checkScrollLimit();
    }
    return tmpl.ready.get();
  },
  isReadyInitial: function () {
    return Template.instance().readyInitial.get();
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
