/**
 *
 *
 *   MAKE USE OF GAME LOGIC
 *
 *
 */

document.addEventListener('DOMContentLoaded', function () {

    //config params
    var numberOfDices = 4;
    var playTurns = 10;

    var guessTableRowCells = 3; // how manny tds per row
    var minValueGuess = numberOfDices - 1; // guess table min value
    var maxValueGuess = (numberOfDices - 1) * 6; // guess table max value
    var game; //game object
    var animation; //store animation for clearinterval

    game = new Game(numberOfDices, playTurns);

    //use for dice animation, check dice.css
    var diceStyles = [
                "dice dice-1",
                "dice dice-2",
                "dice dice-3",
                "dice dice-4",
                "dice dice-5",
                "dice dice-6"
            ];

    // DOM vars
    var guesTable = document.getElementById("guesTable");
    var dice = document.getElementById("dice");
    var displayChosenNum = document.getElementById("displayChosenNum");
    var rollDicesBtn = document.getElementById("rollDicesBtn");
    var stopDicesBtn = document.getElementById("stopDicesBtn");
    var roundScore = document.getElementById("roundScore");
    var totalScore = document.getElementById("totalScore");
    var turnsLeft = document.getElementById("turnsLeft");
    var playgraund = document.getElementById("playgraund");
    var playagain = document.getElementById("playagain");
    var btnPlayAgain = document.getElementById("btnPlayAgain");

    // Generates table with number witch user to chose
    guesTable.innerHTML = createTableWithNumbers(minValueGuess, maxValueGuess, guessTableRowCells);

    //create and add dices to the div
    dice.innerHTML = diceElementCreator(numberOfDices);

    // listen for user guess
    guesTable.querySelectorAll("td").forEach(function (item) {

        if (item.innerHTML !== "") {
            //to do: if there is play turns
            item.addEventListener('click', function () {
                //alert("item." + item.innerHTML + " | this." + this.innerHTML);
                // get all tds
                let tds = guesTable.querySelectorAll("td");
                // in case some of them have applyed class
                tds.forEach(tdClass => tdClass.className = '');
                // display chosen number
                displayChosenNum.innerHTML = item.innerHTML;
                // add class to mark the selected number
                item.className = 'marked-number';
                // remove disabled from play btn
                rollDicesBtn.disabled = false;
            });
        }
    });

    // play round btn triggered
    diceDiv = dice.getElementsByTagName("span"); //arr

    // change dices styles, if no argument - generates random
    function diceAnimation(d) {
        //this function is used both for:
        // - animating the dices 
        // - display chosen dices based on array

        if (typeof d !== 'undefined') {
            for (let i = 0; i < diceDiv.length; i++) {
                let number = d[i] - 1 //game.dices is in 1-6 range, we need 0-5
                diceDiv[i].setAttribute("class", diceStyles[number]);
            }

        } else {
            for (let i = 0; i < diceDiv.length; i++) {
                diceDiv[i].setAttribute("class", diceStyles[randomNumber(0, 5)]);
            }
        }

    }

    // start animations and apply dom changes
    rollDicesBtn.addEventListener('click', function () {
        //lock table
        guesTable.style.pointerEvents = "none";
        stopDicesBtn.disabled = false;
        rollDicesBtn.disabled = true;
        game.guess = Number(displayChosenNum.innerHTML);
        //animate dices
        animation = setInterval(function () {
            diceAnimation();
        }, 200);
    });

    // stop btn - generate numbers, game cals, dom change
    stopDicesBtn.addEventListener('click', function () {

        game.rollDices();
        clearInterval(animation);
        diceAnimation(game.dices); //apply rolled number to dices
        game.getPlayerRoundScore();
        game.getPlayerTotalScore();

        roundScore.innerHTML = "SESSION SCORE: " + game.roundScore;
        totalScore.innerHTML = "TOTAL SCORE: " + game.totalScore;
        turnsLeft.innerHTML = "GAMES LEFT: " + game.turnsLeft;

        guesTable.style.pointerEvents = "auto";
        guesTable.querySelectorAll("td").forEach(tdClass => tdClass.className = '');
        stopDicesBtn.disabled = true;
        rollDicesBtn.disabled = true;

        if (game.turnsLeft == 0) {
            playgraund.style.display = "none";
            playagain.style.display = "block";
        }
    });
    
    //play again
    btnPlayAgain.addEventListener('click', function () {

        game.roundScore = 0;
        game.totalScore = 0;
        game.turnsLeft = playTurns;
        game.roundNumber = 0;

        roundScore.innerHTML = "SESSION SCORE: " + game.roundScore;
        totalScore.innerHTML = "TOTAL SCORE: " + game.totalScore;
        turnsLeft.innerHTML = "GAMES LEFT: " + game.turnsLeft;

        playgraund.style.display = "block";
        playagain.style.display = "none";
    });

})


//fix navbar collapse for hashnav
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});
