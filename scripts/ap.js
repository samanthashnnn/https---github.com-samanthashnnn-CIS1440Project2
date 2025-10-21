const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const choiceBtns = [
    document.getElementById("a"),
    document.getElementById("b"),
    document.getElementById("c"),
    document.getElementById("d")
];

const leaves = [
    document.getElementById("q1leaf"),
    document.getElementById("q2leaf"),
    document.getElementById("q3leaf"),
    document.getElementById("q4leaf"),
    document.getElementById("q5leaf"),
    document.getElementById("q6leaf"),
    document.getElementById("q7leaf"),
    document.getElementById("q8leaf"),
    document.getElementById("q9leaf")
]

const menuCard = document.getElementById("menuCard");
const quizCard = document.getElementById("quizCard");
const endCard = document.getElementById("endCard");

const scoreP = document.getElementById("scoreP");
const salute = document.getElementById("salute");

//rand choices list
let randAnswers = 
["Oak", "Ash", "Maple", "Willow", "Palm", 
    "Cherry", "Sunflower", "Chestnut", "Poison Oak", "Poison Ivy",
    "Poison Sumac", "Daisy", "Bear Berry", "Basil","Nightshade",
    "Kale", "Strawberry", "Sorrel", "Orchid", "Bramble",
];

let quiz = [
{
    questionId: 1,
    correctAnswer: "Oak",
    answers: ["","","",""],
    backgroundImg: "q1.png"
},
{   
    questionId: 2,
    correctAnswer: "Ash",
    answers: ["","","",""],
    backgroundImg: "q2.png"
},
{
    questionId: 3,
    correctAnswer: "Maple",
    answers: ["","","",""],
    backgroundImg: "q3.png"
},
{
    questionId: 4,
    correctAnswer: "Willow",
    answers: ["","","",""],
    backgroundImg: "q4.png"
},
{
    questionId: 5,
    correctAnswer: "Palm",
    answers: [ "","","",""],
    backgroundImg: "q5.png"
},
{
    questionId: 6,
    correctAnswer: "Spinach",
    answers: ["","","","" ],
    backgroundImg: "q6.png"
},
{
    questionId: 7,
    correctAnswer: "Chestnut",
    answers: ["","","","" ],
    backgroundImg: "q7.png"
},
{
    questionId: 8,
    correctAnswer: "Poison Oak",
    answers: ["Poison Sumac", "" , "Poison Ivy", ""],
    backgroundImg: "q8.png"
},
{
    questionId: 9,
    correctAnswer: "Poison Ivy",
    answers: ["","" , "Poison Sumac", "Poison Oak"],
    backgroundImg: "q9.png"
}

];

function show(el) { el.hidden = false; el.showing = true;};
function hide(el) { el.hidden = true; el.showing = false;};

hide(quizCard);
hide(endCard);

//what question are we on
let question = 0;

//creating an array to hold the text for each answer button on the current page
let choices = [];

//score keeping
let numCorrect = 0;
let numWrong = 0;

//random int in order to populate choices with random answers from (randAnswers)
function getRandomIntExclusive(min, max){
const minCeiled = Math.ceil(min);
const maxFloored = Math.floor(max);
return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//adding eventlisteners to each btn
choiceBtns.forEach((choiceBtn) => {
    choiceBtn.addEventListener("click", checkAnswer);
});

startBtn.addEventListener("click", () =>{
    hide(menuCard);
    fillQuizCard(choiceBtns);
    hide(nextBtn);
});

nextBtn.addEventListener("click", () =>{
    question++;
    if(question < quiz.length){
        choiceBtns.forEach(btn => {
            btn.classList.remove("right", "wrong", "other");
        });    
        hide(nextBtn);
        fillQuizCard(choiceBtns);
    } else {
        hide(quizCard);
        calcScore();
    }
})

resetBtn.addEventListener("click", () =>{
    hide(endCard);
    eraseHighlight();
    numCorrect = 0;
    numWrong = 0;
    question = 0;
    fillQuizCard(choiceBtns);
    hide(nextBtn);

    choiceBtns.forEach(btn => btn.classList.remove("right", "wrong", "other"));
    console.log("resetting");

});


function fillQuizCard(choiceBtns){
    show(quizCard);

    //background
    quizCard.style.backgroundImage = `url("images/${quiz[question].backgroundImg}")`;

    let tempFour = getRandomIntExclusive(0, 4);
    //reset choices so it's fresh for each page
    choices = [];

    //if the quiz page has answers - put them into answer array
    quiz[question].answers.forEach(a => (choices.push(a)));

    //put correct answer into randomly chosen button
    choices[tempFour] = quiz[question].correctAnswer;
    console.log("the correct answer for number" + question + "is: " + choices[tempFour]);

    //fill empty spots with randomly chosen answer
    for(let i = 0; i < choices.length; i++){
        if(choices[i] === ""){
            let randItem;
            do {
                randItem = randAnswers[getRandomIntExclusive(0, 20)];
            } while (choices.includes(randItem));
            choices[i] = randItem;
        }
    }

    //assign to buttons
    for(let i = 0; i < choiceBtns.length; i++){
        choiceBtns[i].textContent = choices[i];
    }

};

function checkAnswer(e){
    const clicked = e.target;
    const correct = quiz[question].correctAnswer;

    if (clicked.textContent === correct){
        clicked.classList.add("right");
        highlightLeafCorrect();
        
        choiceBtns.forEach(btn => {
            if(btn.textContent !== correct){
                btn.classList.add("other");
            }
        });
        numCorrect++;
    } else {
        clicked.classList.add("wrong");
        highlightLeafWrong();
        numWrong++;

        choiceBtns.forEach(btn => {
            if(btn.textContent === correct){
                btn.classList.add("right");
            }else if (btn !== clicked){
                btn.classList.add("other");
            }
        });
    }
    show(nextBtn);
    
}
function calcScore(){
    if (numCorrect > 6){
        salute.textContent =  "Ok, druid";
    } else if (numCorrect >= 4 && numCorrect <= 6){
        salute.textContent =  "That could've been better";
    } else {
        salute.textContent =  "Maybe touch grass?";
    }

    scoreP.textContent = "You scored " + numCorrect + " out of " + quiz.length + ".";
    show(endCard); 
}


function highlightLeafCorrect(){
    leaves[question].classList.add("highlightLeafCorrect");
}

function highlightLeafWrong(){
    leaves[question].classList.add("highlightLeafWrong");
}

function eraseHighlight(){
    leaves.forEach(leaf => {
        leaf.classList.remove("highlightLeafCorrect", "highlightLeafWrong");
    });
}