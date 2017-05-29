/**
 *
 *
 *   MAKE USE OF GAME LOGIC
 *            AND
 *   MAKE USE OF GAME LOGIC
 *
 */

document.addEventListener('DOMContentLoaded', function () {

     /*
     * MAKE USE OF GAME LOGIC
     */
    
    //config params
    var numberOfDices = 4;
    var playTurns = 2;

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
    var playAgainroundScore = document.getElementById("playAgainroundScore");

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
        playAgainroundScore.innerHTML = "SESSION SCORE: " + game.roundScore;

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
        btnSaveScore.disabled = false;
    });

    /*
     * MAKE USE OF API
     */

    var signinBtn = document.getElementById("signin-btn");
    var signinEmail = document.getElementById("signin-email");
    var signinPassword = document.getElementById("signin-password");

    var registerEmail = document.getElementById("register-email");
    var registerUsername = document.getElementById("register-username");
    var registerPassword = document.getElementById("register-password");
    var registerPasswordRepeat = document.getElementById("register-passwordRepeat");
    var registerFirstname = document.getElementById("register-firstname");
    var registerLastname = document.getElementById("register-lastname");
    var registerBtn = document.getElementById("register-btn");

    var navUsername = document.getElementById("nav-username");
    var navSignout = document.getElementById("nav-signout");
    var navSignin = document.getElementById("nav-signin");
    var navScores = document.getElementById("nav-scores");

    var btnSaveScore = document.getElementById("btnSaveScore");

    var api = new UserApi();

    //sgin in 
    signinBtn.addEventListener('click', function () {
        var self = this;
        let signinRequest = new XMLHttpRequest();
        let url = api.url + "/users/login";

        signinRequest.open("POST", url, true);
        signinRequest.setRequestHeader("Content-Type", "application/json");

        signinRequest.addEventListener("load", function () {

            if (signinRequest.status == "200") {
                // fill up user object
                api.user = JSON.parse(signinRequest.responseText);
                // redirect
                location.hash = "playgraund";
                // update navbar
                navSignin.style.display = "none";
                navUsername.style.display = "block";
                navUsername.getElementsByTagName("span")[0].innerHTML = api.user.username;
                navSignout.style.display = "block";
                navScores.style.display = "block";
                //get scores
                api.getTopScores();
                api.getPlayerScores();

            } else {
                let msg = "No account with the given email and/or password were found";
                alert(msg);
            }
        });

        let login = {
            "email": signinEmail.value,
            "password": signinPassword.value
        };

        signinRequest.send(JSON.stringify(login));

        // clear signIn fields
        signinEmail.value = "";
        signinPassword.value = "";

    });

    //log out
    navSignout.addEventListener('click', function () {
        api.logout();

    });

    //register
    registerBtn.addEventListener('click', function () {

        let request = new XMLHttpRequest();
        let url = api.url + "/users";
        let msg = "";

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {

            if (request.status == "200") {
                msg = "Your account was created successfully.";
                alert(msg);
                location.hash = "signin-page";
            } else if (request.status == "422") {
                msg = "Unable to create account, Possible reasons: \n ";
                msg += " - Email is Taken \n ";
                msg += " - Username is Taken \n ";
                msg += " - Password is incorrect \n ";
                alert(msg);
            } else {
                msg = "Somthink went wrong, try again!";
                alert(msg);
                console.log(request.status);
            }

        });

        let register = {
            "email": registerEmail.value,
            "username": registerUsername.value,
            "password": registerPassword.value,
            "firstName": registerFirstname.value,
            "lastName": registerLastname.value
        };

        request.send(JSON.stringify(register));
        //clear inut fields    
        registerEmail.value = "";
        registerUsername.value = "";
        registerPassword.value = "";
        registerPasswordRepeat.value = "";
        registerFirstname.value = "";
        registerLastname.value = "";
    });

    //save player score
    btnSaveScore.addEventListener('click', function () {
        
        if (api.user.username !== undefined && api.user.session !== undefined) {
            api.addScore(game.totalScore);
            btnSaveScore.disabled = true;
        } else {
            alert("You have to be logged in");
            location.hash = "signin-page";
        }
    });

})


//fix navbar collapse for hashnav
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});
