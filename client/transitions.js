Transitioner.setTransitions({
  'projects->chapters': 'right-to-left',
  'chapters->projects': 'left-to-right',

  'chapters->questions': 'right-to-left',
  'questions->chapters': 'left-to-right',

  'questions->question': 'right-to-left',
  'question->questions': 'left-to-right',
  'answer->questions': 'left-to-right',

  'question->answer': 'fade',
  'answer->question': 'fade',
  'question->question': 'right-to-left',

  'default': 'fade'
});
