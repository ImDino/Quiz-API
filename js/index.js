
document.addEventListener('DOMContentLoaded', function(e) {
    let game = new Game()
    let player = new Player()
    let startBtn = document.getElementById('startBtn')
    let previousBtn = document.getElementById('previousBtn')
    let nextBtn = document.getElementById('nextBtn')
    let submitBtn = document.getElementById('submitBtn')
    let correctBtn = document.getElementById('correctBtn')
    let replayBtn = document.getElementById('replayBtn')
    let homeBtn = document.getElementById('homeBtn')
    
    startBtn.addEventListener('click', async function(){
        game.numOfQuestions = document.getElementById('questionAmountSelect').value;
        player.name = document.getElementById('nameInput').value
        player.points = 0;
        await game.startReset()
        document.getElementById('question-counter').innerHTML = (game.currentQuestionNo+1)+" of "+game.numOfQuestions
        submitBtn.classList.remove('hidden')
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('home-div').classList.add('hidden')
        document.getElementById('submitBtn').classList.remove('hidden')
    })

    previousBtn.addEventListener('click', function(){
        nextBtn.classList.remove('hidden')
        
        document.getElementById('question'+(game.currentQuestionNo+1)).classList.add('hidden')
        game.currentQuestionNo--;
        document.getElementById('question'+(game.currentQuestionNo+1)).classList.remove('hidden')

        if(game.currentQuestionNo == 0) {
            previousBtn.classList.add('hidden')
        }
        if(document.getElementById('question'+(game.currentQuestionNo+1)).hasAttribute('corrected')){
            correctBtn.disabled = true;
        }
        else correctBtn.disabled = false;
        document.getElementById('question-counter').innerHTML = (game.currentQuestionNo+1)+" of "+game.numOfQuestions
    })

    nextBtn.addEventListener('click', function(){
        previousBtn.classList.remove('hidden')
        
        document.getElementById('question'+(game.currentQuestionNo+1)).classList.add('hidden')
        game.currentQuestionNo++;
        document.getElementById('question'+(game.currentQuestionNo+1)).classList.remove('hidden')

        if(game.currentQuestionNo == game.numOfQuestions-1) {
            nextBtn.classList.add('hidden')
        }
        if(document.getElementById('question'+(game.currentQuestionNo+1)).hasAttribute('corrected')){
            correctBtn.disabled = true;
        }
        else correctBtn.disabled = false;
        document.getElementById('question-counter').innerHTML = (game.currentQuestionNo+1)+" of "+game.numOfQuestions
    })

    correctBtn.addEventListener('click', function(){
        console.log('question'+(game.currentQuestionNo+1))
        let checkBoxes = document.getElementById('question'+(game.currentQuestionNo+1)).getElementsByTagName('input')
        console.log(checkBoxes)
        let chosenAnswers = []
        
        for (let answer of checkBoxes) {
            if (answer.checked) {
                chosenAnswers.push(answer.id)
            }
            answer.disabled = true
        }
        let correctAnswers = game.trimNullAndFalse(game.apiData[game.currentQuestionNo].correct_answers)

        let correctAnswer = game.correct(chosenAnswers, correctAnswers)
        if (correctAnswer) player.points++

        document.getElementById('question'+(game.currentQuestionNo+1)).setAttribute('corrected', "")
        correctBtn.disabled = true;
        game.displayCorrect(chosenAnswers, correctAnswers)
    })
    
    submitBtn.addEventListener('click', function(){
        submitBtn.classList.add('hidden')
        document.getElementById('name-span').innerHTML = player.name
        document.getElementById('points-span').innerHTML = player.points
        document.getElementById('quiz-div').classList.add('hidden')
        document.getElementById('end-div').classList.remove('hidden')
    })

    replayBtn.addEventListener('click', async function() {
        await game.startReset()

        correctBtn.classList.remove('hidden')
        submitBtn.classList.remove('hidden')
        previousBtn.classList.add('hidden')
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('end-div').classList.add('hidden')
        document.getElementById('question-counter').innerHTML = (game.currentQuestionNo+1)+" of "+game.numOfQuestions
    })

    homeBtn.addEventListener('click', function(){
        document.getElementById('end-div').classList.add('hidden')
        document.getElementById('home-div').classList.remove('hidden')
    })
})

/* //!Notes

? behöver man göra if-sats för "ok: true"?
*Lämna in projektet som ett git-repo.

*/
