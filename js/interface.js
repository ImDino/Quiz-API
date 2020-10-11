class Interface {
    constructor (parent) {
        this.currentQuestionIndex = 0;
        this.buttons = {
            start: document.getElementById('startBtn'),
            previous: document.getElementById('previousBtn'),
            next: document.getElementById('nextBtn'),
            submit: document.getElementById('submitBtn'),
            replay: document.getElementById('replayBtn'),
            home: document.getElementById('homeBtn')
        }
        this.divs = {
            container: document.getElementById('container'),
            end: document.getElementById('end-div'),
            quiz: document.getElementById('quiz-div'),
            questions: document.getElementById('questions-main'),
            home: document.getElementById('home-div')
        }
        this.parent = parent
        this.eventListeners(this.parent)
    }
    eventListeners(parent) {
        let self = this
        this.divs.container.addEventListener('click', async function(e){
            if (e.target == self.buttons.start) {
                await parent.startReset(parent)
                self.updateNavDisplay(parent)
                self.unhideElements([self.divs.quiz, self.buttons.submit, self.buttons.next])
                self.hideElements([self.buttons.previous, self.divs.home])
            }

            if (e.target == self.buttons.previous) {
                self.unhideElements([self.buttons.next])
        
                self.hideElements([self.currentQuestion_div(parent)])
                parent.interface.currentQuestionIndex--;
                self.unhideElements([self.currentQuestion_div(parent)])
        
                if(parent.interface.currentQuestionIndex == 0) {
                    self.hideElements([self.buttons.previous])
                }
                self.updateNavDisplay(parent)
            }
        
            if (e.target == self.buttons.next) {
                self.unhideElements([self.buttons.previous])
                
                self.hideElements([self.currentQuestion_div(parent)])
                parent.interface.currentQuestionIndex++;
                self.unhideElements([self.currentQuestion_div(parent)])

                if(parent.interface.currentQuestionIndex == parent.api.numOfQuestions-1) {
                    self.hideElements([self.buttons.next])
                }
                self.updateNavDisplay(parent)
            }

            if (e.target == self.buttons.submit) {
                for (let i=0 ; i<parent.api.numOfQuestions ; i++) {
                    let chosenAnswers = []
                    let checkBoxes = document.getElementById('question'+(i+1)).getElementsByTagName('input')
                    for (let answer of checkBoxes) {
                        if (answer.checked) {
                            chosenAnswers.push(answer.id)
                        }
                        answer.disabled = true
                    }
                    let correctAnswers = parent.api.apiData[i].correct_answers
                    let isCorrectAnswer = parent.correct(chosenAnswers, correctAnswers)
                    if (isCorrectAnswer) parent.player.points++
                    self.displayCorrect(chosenAnswers, correctAnswers, i+1)
                }
                self.hideElements([self.buttons.submit, self.buttons.next, self.buttons.previous])
                document.getElementById('question-counter').innerHTML = ""
                document.getElementById('name-span').innerHTML = parent.player.name
                document.getElementById('points-span').innerHTML = parent.player.points
                self.unhideElements([self.divs.end])
            }

            if (e.target == self.buttons.replay) {
                await parent.startReset(parent)
                self.updateNavDisplay(parent)
                self.unhideElements([self.divs.quiz, self.buttons.submit, self.buttons.next])
                self.hideElements([self.divs.end, self.buttons.previous])
            }

            if (e.target == self.buttons.home) {
                self.hideElements([self.divs.quiz, self.divs.end])
                self.unhideElements([self.divs.home])
            }

            if (e.target.id == 'answer-span') {
                let checkbox = e.target.nextSibling
                if (!checkbox.disabled) {
                    if (!checkbox.checked) checkbox.checked = true
                    else checkbox.checked = false
                }
            }

            if (e.target.classList == 'answer') {
                let checkbox = e.target.querySelector('input')
                if (!checkbox.disabled) {
                    if (!checkbox.checked) checkbox.checked = true
                    else checkbox.checked = false
                }
            }
        })
    }
    currentQuestion_div(parent) {
        return document.getElementById('question'+(parent.interface.currentQuestionIndex+1))
    }
    updateNavDisplay(parent) {
        document.getElementById('question-counter').innerHTML = (parent.interface.currentQuestionIndex+1)+" of "+parent.api.numOfQuestions
    }
    hideElements(HTML_collection) {
        for (let element of HTML_collection) {
            element.classList.add('hidden')
        }
    }
    unhideElements(HTML_collection) {
        for (let element of HTML_collection) {
            element.classList.remove('hidden')
        }
    }
    appendData(data) {
        this.divs.questions.innerHTML =""
        Object.entries(data).forEach(([], index) => {
            let outerDiv = document.createElement('div')
            outerDiv.id = "question"+(index+1)
            outerDiv.classList.add('hidden')

            let questionSpan = document.createElement('span')
            questionSpan.textContent = data[index].question
            questionSpan.classList.add('question')
            
            outerDiv.appendChild(questionSpan)
            
            let answers = data[index].answers
            let answersDiv = document.createElement('div')
            answersDiv.id = "answers-div"

            for (let answer in answers) {
                let answerDiv = document.createElement('div')
                answerDiv.classList.add('answer')
                answerDiv.id = answer
                
                let answerSpan = document.createElement('span')
                answerSpan.textContent = answers[answer]
                answerSpan.id = 'answer-span'

                let checkBox = document.createElement('input')
                checkBox.type = 'checkbox'
                checkBox.id = answer

                answerDiv.appendChild(answerSpan)
                answerDiv.appendChild(checkBox)
                answersDiv.appendChild(answerDiv)
            }
            outerDiv.appendChild(answersDiv)
            this.divs.questions.appendChild(outerDiv)
        })
        document.getElementById('question1').classList.remove('hidden')
    }
    displayCorrect(userAnswer, correctAnswers, questionNo) {
        let correctAnswersFormatted = [];
        let parentDiv = document.getElementById('question'+(questionNo))
        
        Object.entries(correctAnswers).forEach(([key], index) => {
            correctAnswersFormatted.push(key.replace("_correct", ""))
            parentDiv.querySelector('#'+[correctAnswersFormatted[index]]).classList.add('correct')
        })

        userAnswer.forEach((element) => {
            if (!correctAnswersFormatted.includes(element)) {
                parentDiv.querySelector('#'+[element]).classList.add('incorrect')
            }
        })
        parentDiv.classList.remove('hidden')
    }
}