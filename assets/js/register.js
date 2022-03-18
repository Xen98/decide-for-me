const answersList = document.getElementById('answers-dots');

const answerDot = (id) => {
    console.log(id);
    let li = document.createElement("li");

    li.classList.add('dot');
    li.setAttribute('id', `dot-${id}`);

    answersList.appendChild(li);
}

export { answerDot };