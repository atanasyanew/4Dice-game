// Represents a player in the game rock-paper-scissors.
// Consists of a name, a hand shape and a score.
function Player(name){
	this.name = name
	this.score = 0
	this.handShape = 'rock'
}

Player.prototype.getName = function(){
	return this.name
}

Player.prototype.getScore = function(){
	return this.score
}

Player.prototype.incScore = function(){
	this.score++
}

Player.prototype.setHandShape = function(handShape){
	this.handShape = handShape
}

Player.prototype.setRandomHandShape = function(){
	var shapes = ['rock', 'paper', 'scissors']
	var randomShapeIndex = Math.floor(Math.random()*shapes.length)
	this.handShape = shapes[randomShapeIndex]
}

// Return true if this hand shape beats otherPlayer handshape,
// otherwise false.
Player.prototype.beats = function(otherPlayer){
	switch(this.handShape){
		case 'rock':
			return otherPlayer.handShape == 'scissors'
		case 'paper':
			return otherPlayer.handShape == 'rock'
		case 'scissors':
			return otherPlayer.handShape == 'paper'
	}
}
