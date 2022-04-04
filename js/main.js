const start_btn = document.querySelector(".start-btn");
const settings = document.querySelector(".settings");
const tests = document.querySelector(".tests");

const result_box = document.querySelector(".result");
const option_list = document.querySelector(".tests__block-options");
const time_line = document.querySelector(".tests__timeline");
const timeText = document.querySelector(".tests__timer-text");
const timeCount = document.querySelector(".tests__timer-time");


start_btn.onclick = () => {
    settings.classList.add("activeSettings");
    tests.classList.add("activeTests");
    showQuestions(0);
    queCounter(1);
    startTimer(30);
    startTimerLine(0);
}
let timeValue = 30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".start-btn");
const quit_quiz = result_box.querySelector(".result__close-btn");

restart_quiz.onclick = () => {
    tests.classList.add("activeTests");
    result_box.classList.remove("activeResult");
    timeValue = 30;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue);
    startTimerLine(widthValue); 
    timeText.textContent = "Тайминг"; 
    next_btn.classList.remove("show"); 
}

quit_quiz.onclick = () => {
    window.location.reload(); 
}

const next_btn = document.querySelector(".tests__footer-nextbtn");
const bottom_ques_counter = document.querySelector(".tests__footer-total");

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++; 
        que_numb++; 
        showQuestions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Тайминг"; 
        next_btn.classList.remove("show"); 
    } else {
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuestions(index) {
    const que_text = document.querySelector(".tests__block-quest");

    let que_tag = '<span>' + questions[index].numb + ". " +
    questions[index].question + '</span>';

    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' + 
    '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    que_text.innerHTML = que_tag;

    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
function optionSelected(answer) {
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 

    if (userAns == correcAns) { 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        // console.log("Правильный ответ");
        // console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        // console.log("Неправильный ответ");
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                // console.log("Автоматический выбор правильного ответа.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}
function showResult() {
    tests.classList.remove("activeTests"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".result__score");
    if (userScore > 7) { 
        let scoreTag = '<span> Поздравляю! Вы набрали <p>' + userScore + '</p> из <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 3) { 
        let scoreTag = '<span> Хороший результат! Вы набрали <p>' + userScore + '</p> из <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { 
        let scoreTag = '<span> Потренируйтесь еще! Вы набрали <p>' + userScore + '</p> из <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--; 
        if (time < 9) { 
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; 
        }
        if (time < 0) { 
            clearInterval(counter); 
            timeText.textContent = "Время вышло";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer; 
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    // console.log("Время вышло: Автоматический выбор правильного ответа.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> из <p>' + questions.length + '</p> вопросов </span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}