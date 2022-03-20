const answersArray = [];
const lang = navigator.language;

const addInput = document.getElementById('input');
const addButton = document.getElementById('add');
const choiceButton = document.getElementById('choice_button');
const win = document.getElementById('win');
const resetButton = document.getElementById('reset_button');
const answersList = document.getElementById('answers-dots');
const title = document.getElementById('title_text');
const colorMode = document.getElementById('color-button');
const body = document.body;
const iconColor = document.getElementById('icon-color');

fetch('assets/text/texts.json')
  .then(response => response.json())
  .then(obj => {

    if (lang.substring(0, 2) === 'es') {
        const textLang = obj.spanish;
        setText(textLang);
    } else {
        const textLang = obj.english;
        setText(textLang);
    }
  });   

const setText = textLang => {
    title.innerHTML = textLang.title;
    addInput.placeholder = textLang.placeholder;
    resetButton.innerHTML = textLang.reset;
}

const changeColor = () => {
    iconColor.classList.toggle('fa-moon');
    iconColor.classList.toggle('fa-sun');
    body.classList.toggle('light-mode');
    addButton.classList.toggle('bg-dark');
    addButton.classList.toggle('color-light');
    addButton.classList.toggle('pink');
    choiceButton.classList.toggle('bg-dark');
    choiceButton.classList.toggle('color-light');
    choiceButton.classList.toggle('pink');
    addInput.classList.toggle('bg-light2');
    addInput.classList.toggle('color-dark');
    resetButton.classList.toggle('pink');
}

const answerDot = (id) => {
    console.log(id);
    let li = document.createElement("li");

    li.classList.add('dot');
    li.setAttribute('id', `dot-${id}`);

    answersList.appendChild(li);
}

const deleteWin = () => {
    const winGreen = document.querySelector('.dot--green');

    if(winGreen) {
        console.log(winGreen);
        winGreen.classList.remove('dot--green');
    }
}

const addChoice = () => {
    if (addInput.value != '') {

        answersArray.push(addInput.value);
        answerDot(answersArray.length);
        addInput.value = '';
    }
}

colorMode.addEventListener('click', changeColor);

addInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        addChoice();
    }
});

addButton.addEventListener('click', addChoice);

choiceButton.addEventListener('click', (event) => {
    if (answersArray.length >= 1) {
        deleteWin();

        const min = 0;
        const max = answersArray.length;
    
        const id = Math.floor(Math.random() * (max - min)) + min;
    
        win.innerText = answersArray[id];
    
        let dotWin = document.getElementById(`dot-${id+1}`);
        dotWin.classList.add('dot--green');
    }
});

addButton.addEventListener('touchstart', () => {
    addButton.classList.add('touch-add');
})

addButton.addEventListener('touchend', () => {
    addButton.classList.remove('touch-add');
})


choiceButton.addEventListener('touchstart', () => {
    choiceButton.classList.add('touch-choice');
})

choiceButton.addEventListener('touchend', () => {
    choiceButton.classList.remove('touch-choice');
})

resetButton.addEventListener('touchstart', () => {
    resetButton.classList.add('touch-reset');
})

resetButton.addEventListener('touchend', () => {
    resetButton.classList.remove('touch-reset');
})

resetButton.addEventListener('click', (event) => {
    answersArray.length = 0;

    while (answersList.firstChild) {
        answersList.removeChild(answersList.firstChild);
    }

    win.innerText = '';
});
