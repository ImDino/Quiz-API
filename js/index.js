
class Game {
    constructor () {
        this.api
        this.interface = new Interface()
        this.player
    }
    async startReset() {
        let numOfQuestions = document.getElementById('questionAmountSelect').value
        let playerName = document.getElementById('nameInput').value

        this.api = new API(numOfQuestions)
        await this.api.apiData
        this.interface.appendData(this.apiData.api)
        this.player = new Player(playerName)
    }
}
class API{
    constructor(numOfQuestions) {
        this.apiData = this.fetch(numOfQuestions)
    }
    async fetch(numOfQuestions) {
        let url = 'https://quizapi.io/api/v1/questions?apiKey=boMjjXjH4RV3ayJ4aCMerDAKWBuBMCskuSTqN7N8&category=code&difficulty=Hard&limit='+numOfQuestions
        try {
            let data = await fetch(url)
            .then(resp => resp.json())
            .then(data => this.apiData = this.trimData(data))
        }
        catch (error) {
            console.log("något gick snett")
        }
    }
    trimData(input) {
        let wantedProperties = ['question', 'answers', 'correct_answers']

        for (let questionObject of input) {
            for(let category in questionObject) {
                if (!wantedProperties.includes(category)) delete questionObject[category]
                else {
                    if (category != 'question')
                    for (let property in questionObject[category]) {
                        if (questionObject[category][property] == null) delete questionObject[category][property]
                        else if (questionObject[category][property] == "false") delete questionObject[category][property]
                    }
                }
            }
        }
        return input
    }
}

//start game = kalla på api, ta antal questions


class Interface {
    constructor (data) {
        this.currentQuestionIndex = 0;
        //this.appendData(data)
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
        this.eventListeners()
    }
    eventListeners() {
        this.divs.container.addEventListener('click', function(e){
            let clickedElement = e.target.id
            console.log(clickedElement)

            if (clickedElement == 'startBtn') {
                //game.numOfQuestions = document.getElementById('questionAmountSelect').value;
                //player.name = document.getElementById('nameInput').value
                //player.points = 0;
                await game.startReset()
                updateNavDisplay()
                unhideElements([this.divs.quiz, this.buttons.submit, this.buttons.next])
                hideElements([this.buttons.previous, this.divs.home])
            }
        })
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
        // lägga till key inom square brackets (behövs ens square brackets?) -
        // - och ändra de 2 "this.apiData[index]" till key?
        Object.entries(data).forEach(([], index) => {
            let outerDiv = document.createElement('div')
            outerDiv.id = "question"+(index+1)
            outerDiv.classList.add('hidden')
            
            let questionSpan = document.createElement('span')
            questionSpan.innerHTML = data[index].question
            questionSpan.classList.add('question')
            
            outerDiv.appendChild(questionSpan)
            
            let answers = data[index].answers
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
}
class Player {
    constructor (name) {
        this.name =  name;
        this.points = 0;
    }
}

document.addEventListener('DOMContentLoaded', async function(e){

    let game = new Game()
    game.startReset()
    /*
    await game.apiData.api
    console.log(game.apiData.api)
    game.restart()
    await game.apiData.api
    console.log(game.apiData.api)
    */  
})