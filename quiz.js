let question=document.querySelector(".question");
let optionBox=document.querySelector(".option-box");
let questionNumber=document.querySelector(".question-number");
let nextBtn=document.querySelector(".next-btn");
let scoreAnswer=document.querySelector(".score-answer");
let resultBtn=document.querySelector(".result-btn");
let home=document.querySelector(".home");
let quiz=document.querySelector(".quiz");
let quizEndBox=document.querySelector(".quiz-end-box");
let startAgain=document.querySelector(".start-again");
let goToHome=document.querySelector(".go-to-home");
let startBtn=document.querySelector(".start-btn");
let questionIndex=0;
let score=0;
let number=0;
let myArray=[];

covidQuiz=[
    {
        question: 'COVID-19 was first identified in?' ,
        options: ['Wuhen, China', 'Wuhan, China', 'Lombardy, Italy', 'Lagos, Nigeria'],
        answer: 1
    },
    {
        question: 'The first COVID-19 case in Nigeria was announced on' ,
        options: ['27th February 2020', '20th January 2020', '27th March 2020', '20 December 2019'],
        answer: 0
    },
    {
        question: 'Complications influenced by COVID-19 includes the following except?' ,
        options: ['Pneumonia', 'multi-organ failure', 'sleeping sickness', 'death'],
        answer: 2
    },
    {
        question: 'Is there a cure for COVID-19?' ,
        options: ['Yes', 'No', 'Maybe'],
        answer: 1
    },
    {
        question: 'Exposing yourself to the sun or to temperatures higher than 25C degrees does not prevent COVID-19' ,
        options: ['True', 'False', 'No Idea'],
        answer: 0
    }
]

function load() {
    number++;
    question.innerHTML=covidQuiz[questionIndex].question;
    createOptions();
    scoreBoard();
    questionNumber.innerHTML=number + " / " + covidQuiz.length;
}

function createOptions() {
    optionBox.innerHTML="";
    for(let i=0; i<covidQuiz[questionIndex].options.length; i++) {
        let option=document.createElement("div");
            option.innerHTML=covidQuiz[questionIndex].options[i];             
            option.classList.add("option");
            option.id=i;
            option.setAttribute("onclick","check(this)");
            optionBox.appendChild(option);
        }
}

function generateRandomQuestion() {
    let randomNumber=Math.floor(Math.random() * covidQuiz.length);
    let hitDuplicate=0;
    if(myArray.length == 0) {
        questionIndex=randomNumber;
    }
    else {
        for(let i = 0; i<myArray.length; i++) {
            if(randomNumber == myArray[i]) {
                hitDuplicate=1;
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        }
        else {
            questionIndex=randomNumber;
        }
    }
    myArray.push(randomNumber);
    console.log(myArray)
    load();
}

function check(ele) {
    let id=ele.id;
    if(id==covidQuiz[questionIndex].answer) {
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else {
        ele.classList.add("wrong");
        for (let i = 0; i < optionBox.children.length; i++) {
            if(optionBox.children[i].id==covidQuiz[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    disableOptions()
    showNextBtn();

    if(number == covidQuiz.length){
        quizOver();
    }
}

function disableOptions(){
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered");
    }
}

function showNextBtn() {
    nextBtn.classList.add("show");
}

function hideNextBtn() {
    nextBtn.classList.remove("show");
}

function scoreBoard() {
    scoreAnswer.innerHTML=score;
}

 nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
   // questionIndex++;
    generateRandomQuestion();
    hideNextBtn();
}

function quizResult() {
    document.querySelector(".total-questions").innerHTML=covidQuiz.length;
    document.querySelector(".total-correct").innerHTML=score;
    document.querySelector(".total-wrong").innerHTML=covidQuiz.length - score;
    let percentage=(score/covidQuiz.length)*100;
    document.querySelector(".percentage").innerHTML=percentage + "%";
}

function resetQuiz(){
    // questionIndex=0;
     score=0;
     number=0;
     myArray=[];
}

function quizOver() {
    nextBtn.classList.remove("show");
    resultBtn.classList.add("show");
}

 resultBtn.addEventListener("click",()=>{
    // quiz.style.display="none";
    quiz.classList.remove("show");
    resultBtn.classList.remove("show");
    quizEndBox.classList.add("show");
    quizResult();
 })

 startAgain.addEventListener("click",()=>{
    quiz.classList.add("show");
    quizEndBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
 })

 goToHome.addEventListener("click",()=>{
    quizEndBox.classList.remove("show");
    home.classList.add("show");
    resetQuiz(); 
 })

 startBtn.addEventListener("click",()=>{
    quiz.classList.add("show");
    home.classList.remove("show");
    //generateRandomQuestion();
    nextQuestion();
 })

/*window.onload=()=>{
    // load();
    generateRandomQuestion();
}*/