class Game {
    constructor () {
        this.numOfQuestions = 0;
        this.apiData = 0;
        this.currentQuestionNo = 0;
    }

    async startReset() {
        this.currentQuestionNo = 0;
        
        let response = await fetch('https://quizapi.io/api/v1/questions?apiKey=boMjjXjH4RV3ayJ4aCMerDAKWBuBMCskuSTqN7N8&category=code&difficulty=Hard&limit='+this.numOfQuestions)
        this.apiData = await response.json()
        
        this.nextQuestion();
    }

    nextQuestion() {
        this.showQuestion(this.apiData[this.currentQuestionNo].question)
        this.showAnswers(this.trimNullAndFalse(this.apiData[this.currentQuestionNo].answers))
    }

    trimNullAndFalse(object) {
        for(let property in object) {
            if (object[property] == null) delete object[property]
            if (object[property] == "false") delete object[property]
        }
        return object
    }

    showQuestion(question) {
        let questionSpan = document.getElementById('question-span')
        questionSpan.innerHTML = "";
        questionSpan.append(question)
    }

    showAnswers(answers) {
        let answerDiv = document.getElementById('answer-div')
        while (answerDiv.firstChild) {
            answerDiv.removeChild(answerDiv.lastChild);
        }

        for (let answer in answers) {
            let newSpan = document.createElement('span')
            let newCheckBox = document.createElement('input')
            newCheckBox.type = 'checkbox'
            newCheckBox.id = answer
            newSpan.id = answer

            newSpan.textContent = answers[answer]
            answerDiv.appendChild(newSpan)
            answerDiv.appendChild(newCheckBox)
        }
    }

    correct(userAnswer, correctAnswers) {
        let correctAnswersArray = []
        
        for(let answer in correctAnswers) {
            correctAnswersArray.push(answer.replace("_correct", ""))
        }
        
        if (userAnswer.toString() == correctAnswersArray.toString()) {
            console.log("Correct!")
            
        } else {
            console.log("incorrect!")
        }
    }
    
    displayCorrect(userAnswer, correctAnswers) {
        let correctAnswersFormatted = [];
        
        Object.entries(correctAnswers).forEach(([key], index) => {
            correctAnswersFormatted.push(key.replace("_correct", ""))
            document.getElementById(correctAnswersFormatted[index]).classList.add('correct')
        })

        userAnswer.forEach((element) => {
            if (!correctAnswersFormatted.includes(element)) {
                document.getElementById(element).classList.add('incorrect')
            }
        })
    }
}