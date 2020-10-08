class API{
    constructor() {
        console.log("api.js")
        this.numOfQuestions = document.getElementById('questionAmountSelect').value
        this.apiData = this.fetch()
    }
    async fetch() {
        console.log(this.numOfQuestions) //lägg in droplist för category och difficulty
        let url = 'https://quizapi.io/api/v1/questions?apiKey=boMjjXjH4RV3ayJ4aCMerDAKWBuBMCskuSTqN7N8&category=code&difficulty=Hard&limit='+this.numOfQuestions
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