const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score=0
let questionCount=0
let availableQuestions = []

let questions= [
    {
        question : 'What is 2+5',
        choice1 : '9',
        choice2 : '3',
        choice3 : '7',
        choice4 : '0',
        answer : 3
    },
    {
        question : 'What is Capital of India',
        choice1 : 'Mumbai',
        choice2 : 'Delhi',
        choice3 : 'Kolkata',
        choice4 : 'Chennai',
        answer : 2
    },
    {
        question : 'What is Wine Capital Of India',
        choice1 : 'Goa',
        choice2 : 'Kochi',
        choice3 : 'Nashik',
        choice4 : 'Mumbai',
        answer : 3
    },
    {
        question : 'What is 6+9',
        choice1 : '69',
        choice2 : '3',
        choice3 : '12',
        choice4 : '15',
        answer : 4
    }
]


const SCORE_POINTS= 100
const MAX_QUESTIONS=4

startGame = ()=>{
    questionCounter=0
    score=0
    availableQuestions= [...questions]

    getNewQuestion()
}

getNewQuestion = ()=>{
    if(availableQuestions.length === 0 || questionCounter>MAX_QUESTIONS){
        localStorage.setItem('Most Recent Score' , score)
        return window.location.assign('/src/html/end.html')
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach((choice) => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]     
         
    })

    availableQuestions.splice(questionIndex,1)

    acceptingAnswers =true

}

choices.forEach(choice=>{
    choice.addEventListener('click' , (e)=>{
        if(!acceptingAnswers) return

        acceptingAnswers=false
        console.log(acceptingAnswers);
        const selectedChoice = e.target
        console.log(selectedChoice);
        const selectedAnswer = selectedChoice.dataset['number']
        console.log(selectedAnswer);
        let classToApply = selectedAnswer ==currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply==='correct'){
            incrementScore(SCORE_POINTS)

        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        } , 1000)
    })
})


incrementScore = num=>{
    score +=num
    scoreText.innerText = score

}
startGame()