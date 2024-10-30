const selectionBtns = document.querySelectorAll('[data-selection]')
const contentEl = document.getElementById('content')
const aiArr = ['rock', 'paper', 'scissors']
const aiCardArr = ["./public/images/rock.png", "./public/images/paper.png", "./public/images/scissors.png"]
const aiBack = './public/images/card.png'; 
let rounds = 1


function initializeGame() {
contentEl.innerHTML = `<p></p>
        <h1>Game ${rounds}</h1>
        <h2></h2>
        <p></p>`
}



// AI Logic, RNG 0-2 and checks it against ai array to figure out which move the AI makes
function aiMove() {
    const rng = Math.floor(Math.random() * 3)
    const aiCard = document.getElementById(`${rng + 1}`)
    aiCard.src = aiCardArr[rng]
    aiCard.classList.add('animate__flipInY')
    return aiArr[rng]
}

// Object comprised of Key, value pairs of outcomes to check all winning outcome there are only 6 non-tie scenarios that can happen
const outcomes = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
}

// for Each selection button, add event listener and get each data set of the clicked button
selectionBtns.forEach(selectionBtn => {
    selectionBtn.addEventListener('click', e => {
       let selectionName =  selectionBtn.dataset.selection
        makeSelection(selectionName)
    })
})

// Checks with conditionals all the 9 possibilities that can happen
function makeSelection(selection) {
    console.log(selection, '<<<<<<<<<<<< USER SELECTION')
    const aiSelection = aiMove();

    let outcomeMessage = 'You Lose!'
    

    // If user selection is equals to AI selection, it's a tie
    if (selection === aiSelection) {
        outcomeMessage = "It's a tie!"
        console.log("It's a tie!")
    // Else if the outcome[selection], this code matches the user selection to the key of outcome and if the value of said key is equal to aiSelection then you've won
    } else if (outcomes[selection] === aiSelection) {
        outcomeMessage = "You Won!"
        console.log('You won!')
    // Every other scenario ends in a loss
    } else {
        console.log('You Lost!')
    }
    const template = `
        <p>${aiSelection.toUpperCase()}</p>
        <h1>Game ${rounds}</h1>
        <h3>${outcomeMessage}</h3>
        <p>${selection.toUpperCase()}</p>`

        contentEl.innerHTML = template
    rounds++
}

initializeGame()