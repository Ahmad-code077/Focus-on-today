const customCheckBox = document.querySelectorAll('.custom-checkbox');
const inputs = document.querySelectorAll('.goal');
const error = document.querySelector('.error');
const progress = document.querySelector('.progress-value');
const Para = document.querySelector('.child-para');

const allQuotes = [
  'Raise the bar by completing your goals',
  'Well begun is half done! you can do it!!!',
  "Just a step away, keep going! you're so close",
  'Whoa! You just completed all the goals, time for chill',
];
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
  first: {
    name: '',
    completed: false,
  },
  second: {
    name: '',
    completed: false,
  },
  third: {
    name: '',
    completed: false,
  },
};
let checkCount = Object.values(allGoals).filter(
  (curr) => curr.completed
).length;

progress.style.width = `${(checkCount / 3) * 100}%`;
// progress.style.height = '30px';
progress.firstChild.innerText = `${checkCount}/3 completed`;
Para.innerText = allQuotes[checkCount];

// console.log(checkCount);
customCheckBox.forEach((e) => {
  e.addEventListener('click', () => {
    const allInputs = [...inputs].every((e) => {
      return e.value;
    });

    if (allInputs) {
      e.classList.toggle('completed');
      const inputId = e.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      checkCount = Object.values(allGoals).filter(
        (curr) => curr.completed
      ).length;

      error.style.visibility = 'hidden';
      progress.style.visibility = 'visible';
      progress.style.width = `${(checkCount / 3) * 100}%`;
      progress.firstChild.innerText = `${checkCount}/3 completed`;
      Para.innerText = allQuotes[checkCount];
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    }

    if (!allInputs) {
      error.style.visibility = 'visible';
    }
  });
});

inputs.forEach((e) => {
  e.value = allGoals[e.id].name;

  if (allGoals[e.id].completed) {
    e.previousElementSibling.classList.add('completed');
  }

  e.addEventListener('focus', () => {
    error.style.visibility = 'hidden';
  });
  e.addEventListener('input', () => {
    if (allGoals[e.id].completed) {
      e.value = allGoals[e.id].name;
      return;
    }
    allGoals[e.id].name = e.value;

    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});
