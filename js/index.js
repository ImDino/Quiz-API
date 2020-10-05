
document.addEventListener('DOMContentLoaded', function(e) {
    let game = new Game()
    let player = new Player()
    let startBtn = document.getElementById('startBtn')
    let previousBtn = document.getElementById('previousBtn')
    let nextBtn = document.getElementById('nextBtn')
    let submitBtn = document.getElementById('submitBtn')
    let replayBtn = document.getElementById('replayBtn')
    let homeBtn = document.getElementById('homeBtn')
    
    startBtn.addEventListener('click', async function(){
        game.numOfQuestions = document.getElementById('questionAmountSelect').value;
        player.name = document.getElementById('nameInput').value
        player.points = 0;
        await game.startReset()
        document.getElementById('question-counter').innerHTML = (game.currentQuestionIndex+1)+" of "+game.numOfQuestions
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('home-div').classList.add('hidden')
        submitBtn.classList.remove('hidden')
        nextBtn.classList.remove('hidden')
        previousBtn.classList.add('hidden')
    })

    previousBtn.addEventListener('click', function(){
        nextBtn.classList.remove('hidden')
        
        document.getElementById('question'+(game.currentQuestionIndex+1)).classList.add('hidden')
        game.currentQuestionIndex--;
        document.getElementById('question'+(game.currentQuestionIndex+1)).classList.remove('hidden')

        if(game.currentQuestionIndex == 0) {
            previousBtn.classList.add('hidden')
        }
        document.getElementById('question-counter').innerHTML = (game.currentQuestionIndex+1)+" of "+game.numOfQuestions
    })

    nextBtn.addEventListener('click', function(){
        previousBtn.classList.remove('hidden')
        
        document.getElementById('question'+(game.currentQuestionIndex+1)).classList.add('hidden')
        game.currentQuestionIndex++;
        document.getElementById('question'+(game.currentQuestionIndex+1)).classList.remove('hidden')

        if(game.currentQuestionIndex == game.numOfQuestions-1) {
            nextBtn.classList.add('hidden')
        }
        document.getElementById('question-counter').innerHTML = (game.currentQuestionIndex+1)+" of "+game.numOfQuestions
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
        submitBtn.classList.add('hidden')
        nextBtn.classList.add('hidden')
        previousBtn.classList.add('hidden')
        document.getElementById('question-counter').innerHTML = ""
        document.getElementById('name-span').innerHTML = player.name
        document.getElementById('points-span').innerHTML = player.points
        document.getElementById('end-div').classList.remove('hidden')
    })

    replayBtn.addEventListener('click', async function() {
        await game.startReset()
        submitBtn.classList.remove('hidden')
        nextBtn.classList.remove('hidden')
        previousBtn.classList.add('hidden')
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('end-div').classList.add('hidden')
        document.getElementById('question-counter').innerHTML = (game.currentQuestionIndex+1)+" of "+game.numOfQuestions
    })

    homeBtn.addEventListener('click', function(){
        document.getElementById('end-div').classList.add('hidden')
        document.getElementById('quiz-div').classList.add('hidden')
        document.getElementById('home-div').classList.remove('hidden')
    })
})


/* //!Notes
*Lämna in projektet som ett git-repo.
kolla så alla variabler make sense.. t ex newDiv kan heta outerDiv
*/
