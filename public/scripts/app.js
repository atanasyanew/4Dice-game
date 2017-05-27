/**
 * Generates random number in a given range
 * @method randomNumber
 * @private
 * @param  {integer} 	min			Minimum of the range (default value: 1)
 * @param  {integer} 	max  		Mazimum of the range (default value: 100)
 * @param  {function} math 		Custom random number function (default value: Math.random())
 * @return {integer}      		Number from the range
 */
function randomNumber(min, max, math) {
    math = math || Math.random();
    if (min == -Infinity && max == Infinity) {
        min = -1000;
        max = 1000;
    }
    if (!isNaN(min) && min !== null && min === max) {
        return min;
    }
    if (isNaN(min) || min === "" || min === null) {
        min = 1;
    }
    if (isNaN(max) || max === "" || max === null) {
        max = 100;
    }
    if (min === -Infinity) {
        min = max - 1000;
    }
    if (max === Infinity) {
        max = min + 1000;
    }
    var timeStamp = new Date().valueOf();
    var seed = math * 100;
    seed = (seed * timeStamp + 49297) % 233280;
    var rnd = seed / 233280;
    return Math.round(min + rnd * (max - min));
}

/**
 * Generates table body in a given range
 * @param  {integer} 	startNum	Minimum of the range (default value: 1)
 * @param  {integer} 	endNum 		Maximum of the range (default value: 20)
 * @param  {integer} 	tdCells		Specify how manny td per row (default value: 3)
 * @return {string}                 string with <tr><td... 
 */
function createTableWithNumbers(startNum, endNum, tdCells) {

    // creates table
    // based on start end numbers 
    // and how manny td per row
    startNum = (typeof startNum !== 'undefined') ? startNum  : 1;
    endNum = (typeof endNum !== 'undefined') ?  endNum : 20;
    tdCells = (typeof tdCells !== 'undefined') ? tdCells  : 3;

    var table = "";
    var rows = (endNum - startNum) / tdCells;

    let i = 0;
    while (i <= rows) {
        table += "<tr>";
        for (let j = 0; j < tdCells; j++) {
            if (startNum <= endNum) {
                table += "<td>" + startNum + "</td>"
            } else {
                table += "<td>" + "</td>"
            }
            startNum++
        }
        table += "</tr>";
        i++;
    }
    return table;

}

/**
 * @param  {integer}    numOfDices      Serves for array with int key where to store each dice. 
 * The last key in the array is the control dice, check game rules 
 * 
 */
function Game(numOfDices, numOfTurns) {

    //array with dices
    this.dices = Array.from(Array(numOfDices).keys());
    //init the minimum number that can be guessed
    this.guess = numOfDices - 1;

    this.roundScore = 0;

    this.totalScore = 0;

    this.turnsLeft = numOfTurns;

    this.roundNumber = 0;
    
    

}

Game.prototype.rollDices = function () {
    let diceValues = [];
    for (i = 0; i < this.dices.length; i++) {
        diceValues.push(randomNumber(1, 6));
    }
    this.turnsLeft--;
    return this.dices = diceValues;
}

Game.prototype.getPlayerRoundScore = function () {

    //construct array to sum
    let rollScore = 0;
    //get last dice
    let lastDice = this.dices[this.dices.length - 1];
    //sum all dice values
    let totalDiceSum = this.dices.reduce((a, b) => {
        return a + b
    })

    let diceSum = totalDiceSum - lastDice;
    //game rules check for score
    if (this.guess <= diceSum) {
        rollScore = this.guess + lastDice;
    }
    return this.roundScore = rollScore;
}

Game.prototype.getPlayerTotalScore = function () {

    return this.totalScore = this.totalScore + this.roundScore;
}

