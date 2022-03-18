const answersArray = [];

const addInput = document.getElementById('input');
const addButton = document.getElementById('add');
const choiceButton = document.getElementById('choice_button');
const win = document.getElementById('win');
const resetButton = document.getElementById('reset');
const answersList = document.getElementById('answers-dots');

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

resetButton.addEventListener('click', (event) => {
    answersArray.length = 0;

    while (answersList.firstChild) {
        answersList.removeChild(answersList.firstChild);
    }

    win.innerText = '';
});



