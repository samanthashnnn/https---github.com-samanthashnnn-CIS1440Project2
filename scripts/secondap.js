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

//creating an array to hold the text for each answer button on the current page
let answerArray = [];

//global scope loop
let page = 0;

//score tracking
let numCorrect = 0;
let numWrong = 0;

//random int in order to populate answerArray with random answers (randAnswers)
function getRandomIntExclusive(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

//doc listerner - all has to be after page loads
document.addEventListener("DOMContentLoaded", () =>{
    //getting nextBtn
    const nextBtn = document.getElementById("nextBtn");
    const quizCard = document.getElementById("quizCard");
    const endCard = document.getElementById("endCard");

    //create an array for answer buttons so I can manip text content
    const answerBtns = [
        document.getElementById("a"),
        document.getElementById("b"),
        document.getElementById("c"),
        document.getElementById("d")
    ]

    //answerbtns event listener = on click check answers
    answerBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => checkAnswer(e.target, e.target.classList));
    });

    //first page quiz

    //when next button is click, add to loop variable until quiz is done
    nextBtn.addEventListener("click", () => {
        //if quiz is over display end card & hide quiz
        if (page >= quiz.length - 1) {
           quizCard.classList.add("hidden");
           endCard.classList.remove("hidden");
        } else{
            page++;
        }

        //calling the function that will populate the quiz card
        fillQuizCard(answerBtns);
    }); 
});

function fillQuizCard(btns){
    let tempFour = getRandomIntExclusive(0, 4);
    //reset answerArray so it's fresh for each page

    //if the quiz page has answers - put them into answer array
    quiz[page].answers.forEach(a => (answerArray.push(a)));

    //put correct answer into random answer button(this may not be empty)
    let slot = answerArray[tempFour];
    slot = quiz[page].correctAnswer;
    btns[tempFour].classList.add("right");

    //looping through answerArray to fill it
    for(let i = 0; i < answerArray.length; i++){
        //if answer array slot is empty add random answer
        while (answerArray[i] === ""){
            //gen random number
            let tempTwenty = getRandomIntExclusive(0,20);
            //puts the answer at random number slot into a variable
            let ranAnswerItem = randAnswers[tempTwenty];
            //check if that random answer is already in answer array
            if (!answerArray.includes(ranAnswerItem)){
                //add to answer array if not already in
                answerArray[i] = ranAnswerItem;
            }
        }
    }

    //for all buttons - including the index
    btns.forEach((btn, index) => {
        btn.textContent = answerArray[index];
        //remove all classes
        btn.classList.remove{"right", "wrong", "clicked"}
        if(index === tempFour){
            btn.classList.add("right");
        } else {
            btn.classList.remove("right");
        }
        console.log(btn.id, btn.classList);

    });




};