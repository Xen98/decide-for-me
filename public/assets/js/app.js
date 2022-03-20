const answersArray = [];
const lang = navigator.language;
let lightColor = false;

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
    lightColor = !lightColor;
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

    const dotsLight = document.querySelectorAll('.dot');
    dotsLight.forEach(dot => {
        dot.classList.toggle('dot--light');
    });

    const dotsDark = document.querySelectorAll('.dot');

    dotsDark.forEach(dot => {
        dot.classList.toggle('dot--dark')
    });

    const winGreen = document.querySelector('.dot--green');
    const winPink = document.querySelector('.dot--pink');

    const win = winGreen || winPink;

    if (win) {
        win.classList.toggle('dot--green');
        win.classList.toggle('dot--pink');
    }
}

const answerDot = (id) => {
    let li = document.createElement("li");

    li.classList.add('dot');
    
    if (!lightColor) {
        li.classList.add('dot--dark');
    } else {
        li.classList.add('dot--light');
    }

    li.setAttribute('id', `dot-${id}`);

    answersList.appendChild(li);
}

const deleteWin = () => {
    const winGreen = document.querySelector('.dot--green');
    const winPink = document.querySelector('.dot--pink');

    if (winGreen) {
        winGreen.classList.remove('dot--green');
    }

    if (winPink) {
        winPink.classList.remove('dot--pink');
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
        
        if (!lightColor) {
            dotWin.classList.add('dot--green');
        } else {
            dotWin.classList.add('dot--pink');
        }
    }
});

addButton.addEventListener('touchstart', () => {
    if (!lightColor) {
        addButton.classList.add('touch-add');
    } else {
        addButton.classList.add('touch-add-light');
    }    
});

addButton.addEventListener('touchend', () => {
    if (!lightColor) {
        addButton.classList.remove('touch-add');        
    } else {
        addButton.classList.remove('touch-add-light');
    }
});

choiceButton.addEventListener('touchstart', () => {
    if (!lightColor) {
        choiceButton.classList.add('touch-choice');
    } else {
        choiceButton.classList.add('touch-choice-light');
    }
});

choiceButton.addEventListener('touchend', () => {
    if (!lightColor) {
        choiceButton.classList.remove('touch-choice');
    } else {
        choiceButton.classList.remove('touch-choice-light');
    }
});

resetButton.addEventListener('touchstart', () => {
    if (!lightColor) {
        resetButton.classList.add('touch-reset');
    } else {
        resetButton.classList.add('touch-reset-light');
    }
});

resetButton.addEventListener('touchend', () => {
    if (!lightColor) {
        resetButton.classList.remove('touch-reset');
    } else {
        resetButton.classList.remove('touch-reset-light');
    }
});

resetButton.addEventListener('click', (event) => {
    answersArray.length = 0;

    while (answersList.firstChild) {
        answersList.removeChild(answersList.firstChild);
    }

    win.innerText = '';
});
