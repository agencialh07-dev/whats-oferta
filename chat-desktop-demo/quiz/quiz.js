const questions = [
  {
    title: 'If you could describe your relationship right now in one word, what would it be?',
    options: ['Connection', 'Routine', 'Distance', 'A fresh start']
  },
  {
    title: 'How do you usually feel when your partner hides their phone around you?',
    options: [
      'At ease. We both get to have our own space',
      'I wish we’d paid more attention to each other',
      'I sometimes find myself wondering what they’re doing',
      'It depends on the moment'
    ]
  },
  {
    title: 'When something makes you suspicious, what do you usually do?',
    options: [
      'I calmly ask what happened',
      'I get curious about what they might be hiding',
      'I wait to see if it comes up naturally',
      'I keep thinking about it and find it hard to bring up'
    ]
  },
  {
    title: 'If you could see your partner’s WhatsApp, what do you think you’d find?',
    options: [
      'Just everyday conversations with friends, family, and coworkers',
      'Personal matters they prefer to keep private',
      'A conversation I’d like to ask them about',
      'I’m not sure. I’d like to understand why I’m curious'
    ]
  }
];

const question = document.querySelector('#question');
const choices = document.querySelector('#choices');
const action = document.querySelector('#action');
const step = document.querySelector('#step');
const progress = document.querySelector('#progress');

let index = 0;

function render() {
  const current = questions[index];
  const isLastQuestion = index === questions.length - 1;
  step.textContent = `Question ${index + 1} of ${questions.length}`;
  progress.max = questions.length;
  progress.value = index;
  choices.replaceChildren();

  question.textContent = current.title;
  action.hidden = !isLastQuestion;
  current.options.forEach((option) => {
    if (!isLastQuestion) {
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.className = 'choice';
      choice.textContent = option;
      choice.addEventListener('click', () => {
        index += 1;
        render();
        question.focus();
      });
      choices.append(choice);
      return;
    }

    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'final-answer';
    label.append(radio, option);
    choices.append(label);
  });
}

render();
