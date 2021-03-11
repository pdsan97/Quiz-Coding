// save the score
const namew = document.getElementById("nameInp")
const score = document.getElementById("scoreInp")
const savebtn = document.getElementById("saveBtn")

const scoreBoardElement = document.getElementById("scoreBoard")

let myScores = []

savebtn.addEventListener("click", sendScore)
function sendScore() {
    populate(namew.value, score.value)
}

function populate(name, score) {
    console.log(name, score)
    var test = document.createElement("p")
    var node = document.createTextNode(`${name} have a score of ${score} points`)
    test.appendChild(node)

    console.log(test)
    scoreBoardElement.appendChild(test)
}