Template.answer.helpers({
	question: function() {
		return Questions.findOne({
			_id: FlowRouter.getParam('questionId')
		});
	},
	userAnswer: function() {
		return Template.question.answer;
	},
	correct: function() {
		return Template.question.correct;
	},
	project: function() {
		return Projects.findOne({_id: FlowRouter.getParam('projectId')});
	},
	reverse: function() {
		return LayoutTemplate.reverse;
	},
	languageA: function(){
		var language = Projects.findOne({_id: FlowRouter.getParam('projectId')}).speechA;
		if(language === "Spanisch"){
			return "es-ES";
		}else if(language === "Französisch"){
			return "fr-FR";
		}else if(language === "Deutsch"){
			return "de-DE";
		}
	},
	languageB: function(){
		var language = Projects.findOne({_id: FlowRouter.getParam('projectId')}).speechB;
		if(language === "Spanisch"){
			return "es-ES";
		}else if(language === "Französisch"){
			return "fr-FR";
		}else if(language === "Deutsch"){
			return "de-DE";
		}
	}
});
Template.answer.events({
	'click #nextQuestion': function () {
		Meteor.call('calcNextQuestion', FlowRouter.getParam('questionId'), FlowRouter.getParam('projectId'), function(err, result) {
			// result returns the question id
			if (!err) {
				if (result !== false) {
					Session.set('prevQuestion', FlowRouter.getParam('questionId'));
					FlowRouter.setParams({
						questionId: result
					});
				}
			}
		});
	},
	'click #sayText': function(){
    var element = document.querySelector('#textToSay');
    element.speak();
  }
});

Template.answerToolbar.helpers({
	projectId: function() {
		return FlowRouter.getParam('projectId');
	}
});
