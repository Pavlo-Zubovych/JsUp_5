/* All answer options */
const option1 = document.querySelector('.option1'),
  option2 = document.querySelector('.option2'),
  option3 = document.querySelector('.option3'),
  option4 = document.querySelector('.option4');

/* All our options */
const optionsElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // Текст запитання

const numberOfQustion = document.getElementById('number-of-question'), // Номер запитання
  numberOfAllQuestions = document.getElementById('number-of-all-questions'); // Кількість всіх запитань

let indexOfQuestion, // Індекс поточного запитання
  indexOfPage = 0; // Індекс сторінки

const answersTracker = document.getElementById('answers-tracker'); // Обгортка для трекера
const btnNext = document.getElementById('btn-next'); // Кількісь всіх питань

let score = 0; // Фінальний результат вікторини

const correctAnswer = document.getElementById('correct-answer'), // Кількість правельних відповідей
  numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // Кількість всіх запитань (в модальному вікні)
  btnTryAgain = document.getElementById('btn-try-again'); // кнопка "Почати вікторину знову"

const questions = [
  {
    question: 'Як js вираховує відсоток від чиста?',
    options: [
      'Автоматично',
      'Оператор %',
      'Помножить на кількість % та поделить на 100 ',
      'Визвати метод findPresent()',
    ],
    rightAnswer: 2,
  },

  {
    question: 'Рузультат виразу: "13" + 7',
    options: ['20', '137', 'undefined', 'error'],
    rightAnswer: 1,
  },

  {
    question: 'На js не можна написати:',
    options: ['Гру', 'Скрипти для сайта', 'Десктопний додаток', 'Погано'],
    rightAnswer: 3,
  },
];

numberOfAllQuestions.innerHTML = questions.length; // Виводимо кількість запитань

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // Запитання

  // Масив відповідей
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  // Встановлення номера поточної сторінки
  numberOfQustion.innerHTML = indexOfPage + 1;

  indexOfPage++; // Збільшення індекса сторінки
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; // Якорь для перевірки однакових питань

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disableOptions();
};

for (let option of optionsElements) {
  option.addEventListener('click', (e) => checkAnswer(e));
}

//Видалення всіх класів з усіх відповідей
const disableOptions = () => {
  optionsElements.forEach((item) => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionsElements[0].classList.contains('disabled')) {
    alert('Вам потрібно вибрати одину з відповідей');
  } else {
    randomQuestion();
    enableOptions();
  }
};

const enableOptions = () => {
  optionsElements.forEach((item) => {
    item.classList.remove('disabled', 'correct', 'wrong');
  });
};

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
  validate();
});

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});
