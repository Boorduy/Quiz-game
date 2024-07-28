class Question {
    async getQuestions() {
        try {
            const result = await fetch('questions.json')
            const data = await result.json()
        
            let question = data.questions
            
            
            question = question.map((item) => {
                const question = item.question
                const answers = item.answers
                let lol = [{question, answers}]
                return lol
            
        })
        return question

        }    catch(err) {
            console.log('oops')
        }
        }
    }


let result = new Question()
    result = result.getQuestions().then((data) => {return data})
    result.then((a) => {
    result=JSON.stringify(a)
    localStorage.setItem('questions', result)
    })
    let rezz = localStorage.getItem('questions')

rezz = JSON.parse(rezz)




const que = []

for (let i = 0; i < rezz.length; i++) {
  que.push(rezz[i][0])

}


const questionElement = document.getElementById('questions')
const answerBtn = document.getElementById('answer-btn')
const nextBtn = document.getElementById('next-btn')

let score = 0
let currentQuestionNo = 0

function quizStart() {
    currentQuestionNo = 0
    score = 0
    
    showQuestion()
}


function showQuestion() {
    resetState()
    let currentQuestion = que[currentQuestionNo]
    let questionNo = currentQuestionNo + 1
    questionElement.innerHTML = questionNo + ") " + currentQuestion.question

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button')
        
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerBtn.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
            button.addEventListener('click', selectedAnswer)
    })
}



function resetState() {
    nextBtn.style.display = 'none'
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectedAnswer (e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtn.children).forEach((button) => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct')
        } 
        
        button.disabled = true
    })
    nextBtn.style.display = 'block'
}
function showScore() {
    resetState()
    questionElement.innerHTML = `you got ${score} answers out of ${que.length}`
    nextBtn.innerHTML= 'Retry'
    nextBtn.style.display = 'block'
}
function handleNextButton() {
    currentQuestionNo++
    if (currentQuestionNo < que.length) {
        showQuestion()
    } else {
        showScore()
    }
}
nextBtn.addEventListener('click', (e) => {
    if (currentQuestionNo < que.length){
        handleNextButton()
    } else quizStart()
        
})

quizStart()