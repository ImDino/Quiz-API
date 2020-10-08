class Game {
    constructor () {
        this.api
        this.interface = new Interface(this)
        this.player = new Player()
    }
    async startReset(self) {
        this.player.name = document.getElementById('nameInput').value
        this.player.points = 0;
        this.interface.currentQuestionIndex = 0;
        this.api = new API()
        await this.api.apiData
        self.interface.appendData(self.api.apiData)
    }
    correct(userAnswer, correctAnswers) {
        let correctAnswersArray = Object.keys(correctAnswers).map(function (item) {
            return item.replace("_correct", "");
        }); //fixa denna sen gör så det står på startsidan vad det är quiz till, web dev?

        if (userAnswer.toString() == correctAnswersArray.toString()) {
            return true
        }
        return false
    }
}