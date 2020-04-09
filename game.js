const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const RUNNERS = [
    'Argentina',
    'Brazil',
    'China',
    'Finland',
    'Japan',
    'Norway',
    'Russia',
    'South Africa',
    'Sweden',
    'USA'
]

let winners = []

let points = 10

let userChoice

const DELAY = 500

let numberOfRaces = 5

console.log('-- WELCOME TO CLI RACING --')

function startGame(postRace) {
    console.log('You have', points, 'points.')

    if (postRace) {
        startRace()
    } else {
        getUserChoice(() => {
            startRace()
        })
    }
} 

function printRunners() {
    RUNNERS.forEach((runner, index) => {
        console.log('>', index + 1, '.', runner)
    })
}

function getUserChoice(continueToRace) {
    console.log('')
    console.log('Choose your country:')

    printRunners()

    rl.question('Country number: ', (runnerNumber) => {
        runner = RUNNERS[runnerNumber - 1]
        if (runner) {
            userChoice = runner
            console.log(`Your choice: ${userChoice}`)

            continueToRace()
        } else {
            getUserChoice()
        }
        
        rl.close()
    })
}

function startRace() {
    console.log('\nRacing is starting now...')

    setTimeout(() => {
        console.log('Race Finished!')
        setTimeout(() => {
            console.log('Getting the results...')
            getAndPrintWinners()

            setTimeout(() => {
                getAndPrintResults()

                finishRace()
            }, DELAY * winners.length);
        }, DELAY)
    }, DELAY)
}

function getAndPrintWinners() {
    const raceRunners = [...RUNNERS]

    while(raceRunners.length) {
        const winnerIndex = getWinnerIndex(raceRunners.length - 1)
        const winner = raceRunners[winnerIndex]
        winners.push(winner)
        raceRunners.splice(winnerIndex, 1);

        printWinner(winner, winners.length)
    }
}

function getWinnerIndex(numberOfRunners) {
    return Math.round(Math.random() * numberOfRunners)
}

function printWinner(winner, position) {
    setTimeout(() => {
        console.log(position, '.', winner)
    }, DELAY * position)
}

function getAndPrintResults() {
    const positionOfUsersChoice = winners.findIndex(runner => runner === userChoice)
    const pointOfThisRace = 3 - positionOfUsersChoice

    if (pointOfThisRace >= 0) {
        console.log('>>>> You won', pointOfThisRace, 'points.')
    } else {
        console.log('>>>> You lost', pointOfThisRace * (-1), 'points.')
    }

    points += pointOfThisRace
}

function finishRace() {
    console.log('Race has ended.')
    console.log('\n====\n')
    winners = []
    numberOfRaces -= 1

    if (points > 0) {
        if (numberOfRaces) {
            startGame(true)
        } else {
            endGame()
        }
    } else {
        gameOver()
    }
}

function endGame() {
    console.log('Congratulations!!!')
    console.log('Here is your score:', points)
}

function gameOver() {
    console.log('your score:', points)
    console.log('GAME OVER! :(')
}

startGame()
