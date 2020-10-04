
document.addEventListener('DOMContentLoaded', function(e) {
    let game = new Game()
    let player = new Player()
    let startBtn = document.getElementById('startBtn')
    let nextBtn = document.getElementById('nextBtn')
    let finishBtn = document.getElementById('finishBtn')
    let correctBtn = document.getElementById('correctBtn')
    let replayBtn = document.getElementById('replayBtn')
    
    startBtn.addEventListener('click', async function(){
        game.numOfQuestions = document.getElementById('questionAmountSelect').value;
        player.name = document.getElementById('nameInput').value
        await game.startReset()
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('login-div').classList.add('hidden')
    })

    nextBtn.addEventListener('click', function(){
        nextBtn.classList.add('hidden')
        correctBtn.classList.remove('hidden')
        game.currentQuestionNo++;
        game.nextQuestion();
    })

    correctBtn.addEventListener('click', function(){
        let checkBoxes = document.getElementsByTagName('input')
        let chosenAnswers = []
        
        for (let answer of checkBoxes) {
            if (answer.checked) {
                chosenAnswers.push(answer.id)
            }
        }
        let correctAnswers = game.trimNullAndFalse(game.apiData[game.currentQuestionNo].correct_answers)

        game.correct(chosenAnswers, correctAnswers)
        game.displayCorrect(chosenAnswers, correctAnswers)

        correctBtn.classList.add('hidden')
        
        if (game.currentQuestionNo == game.numOfQuestions-1) {
            finishBtn.classList.remove('hidden')
        }
        else {
            nextBtn.classList.remove('hidden')
        }
    })
    
    finishBtn.addEventListener('click', function(){
        finishBtn.classList.add('hidden')
        document.getElementById('name-span').innerHTML = player.name
        document.getElementById('points-span').innerHTML = player.points
        document.getElementById('quiz-div').classList.add('hidden')
        document.getElementById('end-div').classList.remove('hidden')
    })

    replayBtn.addEventListener('click', async function() {
        await game.startReset()

        correctBtn.classList.remove('hidden')
        document.getElementById('quiz-div').classList.remove('hidden')
        document.getElementById('end-div').classList.add('hidden')
    })
})

/* //!Notes

- login: login sida,
spelare matar in namn, trycker nästa,
frågas om antal frågor, trycker nästa.

- API: hämtar data
sidan väntar tills datan är hämtad och lagrad innan första frågan laddas upp.

? behöver man göra if-sats för "ok: true"?

Quizet ska hålla reda på en spelare. Det ska hantera spelarens namn, spelarens poäng i den aktuella omgången.
*class newPlayer

Låt användaren bestämma  hur många frågor som ska visas. (5-10)
*class newGame

*eventListeners i klass fr början

Du ska skriva en rättningsmetod i en lämplig klass som heter correct (eller liknande) och som tar emot minst två parametrar:
    * - En HTML-collection som innehåller de svar användaren har kryssat i.
    * - En array, ett objekt eller liknande , som innehåller de korrekta svaren.

*Visa vilken fråga användaren är på. (T ex 3 av 10.)
*Du ska använda minst en lambda-funktion.



*/


/* ::::::::::: KRAV :::::::::::

Din uppgift är att skriva en quiz-applikation. En quiz-applikation är ett frågesport-spel.

Din applikation ska vara objektorienterad. Du ska visa att du kan skapa lämpliga klasser.
Det kommer att vara högre fokus på det i denna uppgift än i gruppuppgiften, eftersom ni
kan börja att skriva era applikationer objektorienterat från början nu. Quizet ska hålla
reda på en spelare. Det ska hantera spelarens namn, spelarens poäng i den aktuella omgången.
Frågorna ska läsas in från https://quizapi.io/ som levererar ett resultat i JSON.
Du måste använda ditt omdöme och göra en analys av kraven för att kunna leva upp till dem.

!G-krav

*Spelet ska innehålla 10 frågor.
*Man ska kunna välja flera svar. Ibland kan ett alternativ vara rätt, ibland flera.
*När omgången är slut ska poängen visas och användaren ska få välja att starta ett nytt spel med nya frågor.
*Skriv minst en klass som innehåller minst en metod och minst en egenskap.
*Du får inte använda inline-css eller inline-event (t ex <p style="color:red" onlick="something();">)
*Du ska använda minst en array-funktion.
*Lämna in projektet som ett git-repo.


!VG-krav:

*Allt som ingår för G-kraven.
*Låt användaren bestämma hur många frågor som ska visas. (5-10)
*Du ska visa att du kan skapa lämpliga klasser med lämpliga metoder och egenskaper. 
*Du får inte använda globala variabler eller funktioner utanför klasser, -
    * - förutom anonyma funktioner i event-lyssnare. (De behövs inte där heller, men du får.)
*Du ska skriva en metod i en lämplig klass som heter correct (eller liknande) och som tar emot minst två parametrar:
    * - En HTML-collection som innehåller de svar användaren har kryssat i.
    * - En array, ett objekt eller liknande , som innehåller de korrekta svaren.
*Metoden ska kontrollera om användaren har svarat rätt på frågan. -
    * - Om flera alternativ kan vara rätt måste användaren ha kryssat i alla korrekta alternativ för att den ska räknas som rätt.

*Du ska visa en fråga i taget och låta användaren bläddra mellan dem. Det kan t ex
    *ske genom att byta ut elementen som innehåller frågan, eller elementens innehåll.
*Visa vilken fråga användaren är på. (T ex 3 av 10.)
*Du ska använda minst en lambda-funktion.

!Redovisning sker genom ett kort, individuellt möte den 12/13 oktober, troligen på Zoom.

*/