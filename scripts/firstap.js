//need array of objects named quiz
let quiz = [
    {
        questionId: 1,
        correctAnswer: "Oak",
        answers: ["", "", "", ""],
        backgroundImg: "q1.png"
    },
    {   
        questionId: 2,
        correctAnswer: "Ash",
        answers: ["", "", "", ""],
        backgroundImg: "q2.png"
    },
    {
        questionId: 3,
        correctAnswer: "Maple",
        answers: ["", "", "", ""],
        backgroundImg: "q3.png"
    },
    {
        questionId: 4,
        correctAnswer: "Willow",
        answers: ["", "", "", ""],
        backgroundImg: "q4.png"
    },
    {
        questionId: 5,
        correctAnswer: "Palm",
        answers: ["", "", "", ""],
        backgroundImg: "q5.png"
    },
    {
        questionId: 6,
        correctAnswer: "Spinach",
        answers: ["", "", "", ""],
        backgroundImg: "q6.png"
    },
    {
        questionId: 7,
        correctAnswer: "Chestnut",
        answers: ["", "", "", ""],
        backgroundImg: "q7.png"
    },
    {
        questionId: 8,
        correctAnswer: "Poison Oak",
        answers: ["Poison Sumac", "", "Poison Ivy", ""],
        backgroundImg: "q8.png"
    },
    {
        questionId: 9,
        correctAnswer: "Poison Ivy",
        answers: ["", "", "Poison Sumac", "Poison Ivy"],
        backgroundImg: "q9.png"
    }

];
//array randAnswers
let randAnswers = 
    ["Oak Tree", "Ash Tree", "Maple Tree", "Willow Tree", "Palm Tree", 
     "Cherry Tree", "Sunflower", "Chestnut Tree", "Poison Oak", "Poison Ivy",
     "Poison Sumac", "Daisy", "Bear Berry", "Basil","Nightshade",
     "Kale", "Strawberry", "Sorrel", "Orchid", "Bramble",
    ];

let answerArray = [];

let loopVar = 0;
let numCorrect = 0;
let numWrong = 0;



function getRandomIntInclusive(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//wrapping it all in doc listener
//item listeners - answer buttons. next button


document.addEventListener("DOMContentLoaded", () =>{
    const nextBtn = document.getElementById("nextBtn");
    const answerBtns = [
    document.getElementById("a"),
    document.getElementById("b"),
    document.getElementById("c"),
    document.getElementById("d")
    ]

    answerBtns.forEach((btn)=> {
        btn.addEventListener("click",(e) => checkAnswer(e.target, e.target.classList));
    });

    

    nextBtn.addEventListener("click", () =>{
        loopVar ++;
        if (loopVar >= quiz.length){
            const quizCard = document.getElementById("quizCard");
            quizCard.innerHTML = `<div class="end-card">Quiz complete! You got ${numCorrect} correct.</div>`;
            return;
        }
        fillQuizCard(answerBtns);
    });

    //fill quiz
    fillQuizCard(answerBtns);
          
});
function fillQuizCard(answerBtns){
    let tempFour = getRandomIntInclusive(0, 4);
    answerArray = [];
    quiz[loopVar].answers.forEach(a => answerArray.push(a));
    
    answerArray[tempFour] = quiz[loopVar].correctAnswer;

    for(let i = 0; i < answerArray.length; i++){
        while (answerArray[i] === ""){
            let tempTwenty = getRandomIntInclusive(0, 20)
            let randChoice = randAnswers[tempTwenty];
            
            if (!answerArray.includes(randChoice)){
                answerArray[i] = randChoice;
            }
            
        }
    };

    const quizCard = document.getElementById("quizCard");
    const bgImg = quiz[loopVar].backgroundImg;    //backgroundImg = quiz.img[loopVar]
    quizCard.style.backgroundImage = `url('images/${bgImg}')`;

    answerBtns.forEach((btn, index) => {
        btn.textContent = answerArray[index];
        btn.classList.remove("right", "wrong", "clicked");
    });
}

function checkAnswer(target,classList){
        console.log("Answer clicked:", target.textContent);

}



//check quiz answer
    //eventlistener - compare correct against clicked
        //add class clicked to all answerBtn 
        //if clicked != class clicked              
            //if clicked = correct
                //numCorrect ++
                //clicked = green
                //banner = green
                //others = gray
            //else clicked = !correct
                //numWrong ++
                //clicked = red
                //banner = red
                //correct = green
                //other = gray
        //else (clicked has class clicked)
            //make answerBtn + nextBtn wiggle?
        //appear next button with delay

//next button event listerner clicked
    //repopulate with next question(fillQuizCard)
    //loopVar++

//if loopVar = 8 
    //show endCard
    //you got 'correct right' out of 9 correct! Wow!


        