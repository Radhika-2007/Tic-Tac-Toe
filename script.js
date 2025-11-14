const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

//initialize variables for the game
let player = 'O'
let isPausedGame = false
let isGameStart = false

//array of input conditions
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '',]

//array of win condition 
const winCondition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],//rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],//columns
    [0, 4, 8], [2, 4, 6]//diagonals
]

//add click event listener to each cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index){
    //Ensure cell is empty and game isn't pause
    if (cell.textContent == '' &&
        !isPausedGame 
    ) {
        isGameStart = true
        updateCell(cell, index)
        
        //do random pick if there are no results
        if (!checkWinner()){
            changePlayer()
            updateActiveDisplay()
        }
    }
}

function updateCell(cell, index){
    cell.textContent = player
    inputCells[index] = player
    cell.style.color = (player == 'X') ? 'aqua' : 'hsla(324, 98%, 49%, 0.953)'
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function checkWinner(){
    for (const [a, b, c] of winCondition){
      //check each winning condition
      if (inputCells[a] == player &&
          inputCells[b] == player &&
          inputCells[c] == player
      ) {
        declareWinner([a, b, c])
        return true
      }
    }

    //check for a draw are filled
    if (inputCells.every(cell => cell != '')) {
        declareDraw()
        return true
    }
    return false
}

function declareWinner(winningIndices){
    titleHeader.textContent = `${player} Win`
    isPausedGame = true

    //Highlight winning cells
    winningIndices.forEach((index) => 
     cells[index].style.background = '#2A2343'
    )  
    restartBtn.style.visibility = 'visible'
}

function declareDraw(){
    titleHeader.textContent = 'Draw!'
    isPausedGame = true
    restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer){
    //Ensure the game hasn't started
    if(!isGameStart){
        //override the selected player value
        player = selectedPlayer
        updateActiveDisplay()
    }
}

function updateActiveDisplay(){
     // Update the UI highlight to show whose turn it is
    if (player === 'X'){
        xPlayerDisplay.classList.add('player-active')
        oPlayerDisplay.classList.remove('player-active')
        titleHeader.textContent = `Turn: X`
    } else {
        xPlayerDisplay.classList.remove('player-active')
        oPlayerDisplay.classList.add('player-active')
        titleHeader.textContent = `Turn: O`
    }
}

restartBtn.addEventListener('click', () =>{
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
       cell.textContent = ''
       cell.style.background = ''
    })
    isPausedGame = false
    isGameStart = false
    titleHeader.textContent = 'choose'
    // Reset player highlight to whichever player variable currently is
    xPlayerDisplay.classList.remove('player-active')
    oPlayerDisplay.classList.remove('player-active')
})