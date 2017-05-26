// Represents the game rock-paper-scissors being played by a human
// player and an artificial player.
function Game(humanName, aiName, numberOfTurns){
	this.humanPlayer = new Player(humanName)
	this.aiPlayer = new Player(aiName)
	this.numberOfTurns = numberOfTurns
	this.turnsLeft = numberOfTurns
}

Game.prototype.getHumanPlayer = function(){
	return this.humanPlayer
}

Game.prototype.getAiPlayer = function(){
	return this.aiPlayer
}

Game.prototype.getCurrentTurn = function(){
	return this.numberOfTurns - this.turnsLeft
}

Game.prototype.getNumberOfTurns = function(){
	return this.numberOfTurns
}

Game.prototype.isOver = function(){
	return this.turnsLeft == 0
}

Game.prototype.playTurn = function(humanShape){
	
	this.humanPlayer.setHandShape(humanShape)
	this.aiPlayer.setRandomHandShape()
	
	if(this.humanPlayer.beats(this.aiPlayer)){
		this.humanPlayer.incScore()
	}else if(this.aiPlayer.beats(this.humanPlayer)){
		this.aiPlayer.incScore()
	}
	
	this.turnsLeft--
	
}
