Meteor.methods({
	giveAnswer: function(doc) {
		var question = Questions.findOne({
			_id: doc.questionId
		});
		var correctAnswers = question.answer.replace(/ /g, '').split(',');
		var userAnswers = doc.answer.replace(/ /g, '').split(',');
		
		if (question && checkCorrectAnswer(correctAnswers, userAnswers)) {
			correctAnswer(this.userId, doc);
			return true;
		} else {
			wrongAnswer(this.userId, doc);
			return false;
		}
	},
	correctAnswer: function(projectId, questionId) {
		var doc = {
			questionId: questionId,
			projectId: projectId
		};
		correctAnswer(this.userId, doc);
	},
	wrongAnswer: function(projectId, questionId) {
		var doc = {
			projectId: projectId,
			questionId: questionId
		};
		wrongAnswer(this.userId, doc);
	},
	calcNextQuestion: function(currentQuestionId, projectId) {
		var question = findQuestionWithoutScore(currentQuestionId, projectId, this.userId);
		if(question){
			return question._id;
		}
		var random = Math.random() * 100;
		var rating = null;
		if(random > 80) {
			// go get one with score > 0
			rating = questionWithPositiveScore(currentQuestionId, projectId);
		}
		if (random <= 80 || !rating){
			// go get one with score < 0
			rating = questionWithNegativeScore(currentQuestionId, projectId);
			if(!rating){
				rating = questionWithPositiveScore(currentQuestionId, projectId);
			}
		}

		if(!rating){
			return false;
		}
		return rating.question;
	}
});

function correctAnswer(userId, doc) {
	var currentRating = Ratings.findOne({user: userId, question: doc.questionId});
	if (currentRating) {
		if (currentRating.score < 5) {
			Ratings.update({user: userId, question: doc.questionId}, {$inc: {score: 1}});
		}
	}else{
		_.extend(doc, {
			user: userId,
			score: 1
		});
		insertRating(doc);
	}
}

function wrongAnswer(userId, doc) {
	var currentRating = Ratings.findOne({user: userId, question: doc.questionId});
	if(currentRating){
		if (currentRating.score > -5) {
			Ratings.update({user: userId, question: doc.questionId}, {$inc: {score: -1}});
		}
	}else{
		_.extend(doc, {
			user: userId,
			score: -1
		});
		insertRating(doc);
	}
}

function checkCorrectAnswer(correctAnswers, userAnswers) {
	var correct = true;
	_.each(userAnswers, function(userAnswer) {
		correct = correct && (_.indexOf(correctAnswers, userAnswer) !== -1);
	});
	return correct;
}

function insertRating(doc) {
	// insert rating
	Ratings.insert({user: doc.user, question: doc.questionId, score: doc.score, project: doc.projectId});
	// insert info that question has a rating for a specific user (-> dont write the rating information to the question obj)
	Questions.update({_id: doc.questionId}, {$push: {hasRating: {user: doc.user}}});
}

function findQuestionWithoutScore(currentQuestion, project,  userId){
	return Questions.findOne({project: project, hasRating: {$ne: {user: userId}}, _id: {$ne: currentQuestion}});
}

function pickRandomFromArray(array){
	return array[Math.floor(Math.random() * array.length)];
}

function questionWithPositiveScore(currentQuestion, projectId) {
	var ratings = Ratings.find({project: projectId, score: {$gt: -1}, question: {$ne: currentQuestion}}).fetch();
	return pickRandomFromArray(ratings);
}

function questionWithNegativeScore(currentQuestion, projectId) {
	var ratings = Ratings.find({project: projectId, score: {$lt: 0}, question: {$ne: currentQuestion}}).fetch();
	return pickRandomFromArray(ratings);
}