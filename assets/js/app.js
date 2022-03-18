import { answerDot } from "./register.js";

const answersArray = [];
const input = document.getElementById('input');
const choice_button = document.getElementById('choice_button');
const win = document.getElementById('win');

const deleteWin = () => {
    const winGreen = document.querySelector('.dot--green');

    if(winGreen) {
        console.log(winGreen);
        winGreen.classList.remove('dot--green');
    }
}

input.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        answersArray.push(input.value);
        answerDot(answersArray.length);
        input.value = '';
    }
})

choice_button.addEventListener('click', (event) => {
    if (answersArray.length >= 1) {
        deleteWin();

        const min = 0;
        const max = answersArray.length;
    
        const id = Math.floor(Math.random() * (max - min)) + min;
    
        console.log(answersArray[id]);
        win.innerText = answersArray[id];
    
        let dotWin = document.getElementById(`dot-${id+1}`);
        dotWin.classList.add('dot--green');
    }
});



