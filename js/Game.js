class Game {
    constructor () {
        this.numOfQuestions = 0;
        this.apiData = 0;
        this.currentQuestionIndex = 0;
    }

    async startReset() {
        this.currentQuestionIndex = 0;
        try{
            let response = await fetch('https://quizapi.io/api/v1/questions?apiKey=boMjjXjH4RV3ayJ4aCMerDAKWBuBMCskuSTqN7N8&category=code&difficulty=Hard&limit='+this.numOfQuestions)
            this.apiData = await response.json()
            this.appendData();
        }
        catch (error) {
            document.getElementById('errorMessage').innerHTML = "An error has occured, try reloading the page!"
        }
    }

    trimNullAndFalse(object) {
        for(let property in object) {
            if (object[property] == null) delete object[property]
            else if (object[property] == "false") delete object[property]
        }
        return object
    }

    appendData() {
        let mainQuestionsDiv = document.getElementById('questions-main')
        mainQuestionsDiv.innerHTML =""

        // lägga till key inom square brackets (behövs ens square brackets?) -
        // - och ändra de 2 "this.apiData[index]" till key?
        Object.entries(this.apiData).forEach(([], index) => {
            let outerDiv = document.createElement('div')
            outerDiv.id = "question"+(index+1)
            outerDiv.classList.add('hidden')
            
            let questionSpan = document.createElement('span')
            questionSpan.innerHTML = this.apiData[index].question
            questionSpan.classList.add('question')
            
            outerDiv.appendChild(questionSpan)
            
            let answers = this.trimNullAndFalse(this.apiData[index].answers)
            let answersDiv = document.createElement('div')
            answersDiv.id = "answers-div"

            for (let answer in answers) {
                let answerDiv = document.createElement('div')
                let answerSpan = document.createElement('span')
                answerDiv.classList.add('answer')
                answerDiv.id = answer
                answerSpan.textContent = answers[answer]

                let checkBox = document.createElement('input')
                checkBox.type = 'checkbox'
                checkBox.id = answer

                answerDiv.appendChild(answerSpan)
                answerDiv.appendChild(checkBox)
                answersDiv.appendChild(answerDiv)
            }
            
            outerDiv.appendChild(answersDiv)
            mainQuestionsDiv.appendChild(outerDiv)
        })
        document.getElementById('question1').classList.remove('hidden')
    }

    correct(userAnswer, correctAnswers) {
        let correctAnswersArray = Object.keys(correctAnswers).map(function (item) {
            return item.replace("_correct", "");
        });

        if (userAnswer.toString() == correctAnswersArray.toString()) {
            return true
        }
        return false
    }
    
    displayCorrect(userAnswer, correctAnswers, questionNo) {
        let correctAnswersFormatted = [];
        let parent = document.getElementById('question'+(questionNo))
        
        Object.entries(correctAnswers).forEach(([key], index) => {
            correctAnswersFormatted.push(key.replace("_correct", ""))
            parent.querySelector('#'+[correctAnswersFormatted[index]]).classList.add('correct')
        })

        userAnswer.forEach((element) => {
            if (!correctAnswersFormatted.includes(element)) {
                parent.querySelector('#'+[element]).classList.add('incorrect')
            }
        })
        parent.classList.remove('hidden')
    }
}