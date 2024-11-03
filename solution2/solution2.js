const selectionBtns = document.querySelectorAll('[data-selection]')
const contentEl = document.getElementById('content')
const aiArr = ['rock', 'paper', 'scissors']
const aiCardArr = ["../public/images/rock.png", "../public/images/paper.png", "../public/images/scissors.png"]
const aiBack = '../public/images/card.png'; 
let win = 0;
let lose = 0;
let rounds = 1;
const aiCards = document.querySelectorAll('.ai-card');

// Resets game info when reset button is clicked, trigger resetCards animation and reset game into initialize state.
function resetGame() {
    win = 0;
    lose = 0;
    rounds = 1;
    resetCards()
    initializeGame()
}

// Initializes rounds, evoked on page load
function initializeGame() {
contentEl.innerHTML = `<p></p>
        <h1>Game ${rounds}</h1>
        <div class="score-div"> 
        <h2>W:${win} L:${lose}</h2> 
        <button onClick="resetGame()">Reset</button>
        </div>
        <h3></h3>
        <p></p>`
}

// Resets cards, return the image to the back of the card, remove class to re-trigger animation when re-added
function resetCards() {
    aiCards.forEach(card => {
        card.src = aiBack;
        card.classList.remove('animate__flipInY', 'animate__flipOutY');
    });
}

// AI Logic, RNG 0-2 and checks it against ai array to figure out which move the AI makes
function aiMove() {
    const rng = Math.floor(Math.random() * 3)
    const aiCard = document.getElementById(`${rng + 1}`)
    // Resets cards before a new round starts
    resetCards();
    // Tiny grace period before the animation starts to give resetCards some time
    setTimeout(() => {
        aiCard.src = aiCardArr[rng]
        aiCard.classList.add('animate__flipInY')
    }, 200);
    return aiArr[rng]
}

// Object comprised of Key, value pairs of outcomes to check all winning outcome there are only 6 non-tie scenarios that can happen
const outcomes = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
}

// Get user input by text and listen to the play button being clicked
function getSelection() {
       let selection =  document.getElementById('userInput').value.trim().toLowerCase();
        const validSelections = ['rock', 'paper', 'scissors'];
       if (validSelections.includes(selection)) {
           makeSelection(selection)
       } else {
        document.getElementById('message').textContent = 'Please enter Rock, Paper, or Scissors.';
       }
}

const button = document.getElementById('playButton');
button.addEventListener('click', getSelection);



// Checks with conditionals all the 9 possibilities that can happen
function makeSelection(selection) {
    const aiSelection = aiMove();

    let outcomeMessage = 'You Lose!'
    

    // If user selection is equals to AI selection, it's a tie
    if (selection === aiSelection) {
        outcomeMessage = "It's a tie!"
    // Else if the outcome[selection], this code matches the user selection to the key of outcome and if the value of said key is equal to aiSelection then you've won
    } else if (outcomes[selection] === aiSelection) {
        outcomeMessage = "You Won!"
        win++
    // Every other scenario ends in a loss
    } else {
        lose++
    }
    const template = `
        <p>${aiSelection.toUpperCase()}</p>
        <h1>Game ${rounds}</h1>
        <div class="score-div"> 
        <h2>W:${win} L:${lose}</h2> 
        <button onClick="resetGame()">Reset</button>
        </div>
        <h3>${outcomeMessage}</h3>
        <p>${selection.toUpperCase()}</p>`

        contentEl.innerHTML = template
    rounds++
}


initializeGame()


/*
Create AI
- Array of choices, RNG

Create user options
- QuerySelectorAll, click listener
- Get button's details as user move

Conditionals on who wins
- if rock === rock : tie, etc

Update game info
- Increment win/loss/rounds ++

Reset game
- Reset all game info, set them to default and reset game

*/