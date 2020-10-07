
document.addEventListener('DOMContentLoaded', function(e) {
    let game = new Game()
    let player = new Player()
    let startBtn = document.getElementById('startBtn')
    let previousBtn = document.getElementById('previousBtn')
    let nextBtn = document.getElementById('nextBtn')
    let submitBtn = document.getElementById('submitBtn')
    let replayBtn = document.getElementById('replayBtn')
    let homeBtn = document.getElementById('homeBtn')
    
    let end_div = document.getElementById('end-div')
    let quiz_div = document.getElementById('quiz-div')
    let home_div = document.getElementById('home-div')

    startBtn.addEventListener('click', async function(){
        game.numOfQuestions = document.getElementById('questionAmountSelect').value;
        player.name = document.getElementById('nameInput').value
        //player.points = 0;
        await game.startReset()
        updateNavDisplay()
        unhideElements([quiz_div, submitBtn, nextBtn])
        hideElements([previousBtn, home_div])
    })

    previousBtn.addEventListener('click', function(){
        unhideElements([nextBtn])

        hideElements([currentQuestion_div()])
        game.currentQuestionIndex--;
        unhideElements([currentQuestion_div()])

        if(game.currentQuestionIndex == 0) {
            hideElements([previousBtn])
        }
        updateNavDisplay()
    })

    nextBtn.addEventListener('click', function(){
        unhideElements([previousBtn])

        hideElements([currentQuestion_div()])
        game.currentQuestionIndex++;
        unhideElements([currentQuestion_div()])

        if(game.currentQuestionIndex == game.numOfQuestions-1) {
            hideElements([nextBtn])
        }
        updateNavDisplay()
    })
    
    submitBtn.addEventListener('click', function(){
        for (i=0 ; i<game.numOfQuestions ; i++) {
            let chosenAnswers = []
            let checkBoxes = document.getElementById('question'+(i+1)).getElementsByTagName('input')
            for (let answer of checkBoxes) {
                if (answer.checked) {
                    chosenAnswers.push(answer.id)
                }
                answer.disabled = true
            }
            let correctAnswers = game.trimNullAndFalse(game.apiData[i].correct_answers)
            let isCorrectAnswer = game.correct(chosenAnswers, correctAnswers)
            if (isCorrectAnswer) player.points++
            game.displayCorrect(chosenAnswers, correctAnswers, i+1)
        }
        hideElements([submitBtn, nextBtn, previousBtn])
        document.getElementById('question-counter').innerHTML = ""
        document.getElementById('name-span').innerHTML = player.name
        document.getElementById('points-span').innerHTML = player.points
        unhideElements([end_div])
    })

    replayBtn.addEventListener('click', async function() {
        await game.startReset()
        unhideElements([quiz_div, submitBtn])
        hideElements([end_div, previousBtn, nextBtn])
    })

    homeBtn.addEventListener('click', function(){
        hideElements([quiz_div, end_div])
        unhideElements([home_div])
    })

    document.getElementById('questions-main').addEventListener('click', function(e){
        if (e.target.tagName == 'SPAN') {
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

    function hideElements(arrayInput) {
        for (let element of arrayInput) {
            element.classList.add('hidden')
        }
    }
    function unhideElements(arrayInput) {
        for (let element of arrayInput) {
            element.classList.remove('hidden')
        }
    }
    function currentQuestion_div() {
        return document.getElementById('question'+(game.currentQuestionIndex+1))
    }
    function updateNavDisplay() {
        document.getElementById('question-counter').innerHTML = (game.currentQuestionIndex+1)+" of "+game.numOfQuestions
    }
})


/* //!Notes
*Lämna in projektet som ett git-repo.
kolla så alla variabler make sense.. t ex newDiv kan heta outerDiv
*/
