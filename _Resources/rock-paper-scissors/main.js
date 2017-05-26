// The number of turns one should play.
var numberOfTurns = 5

document.addEventListener('DOMContentLoaded', function(){
	
	var stageEnterNameDiv = document.getElementById('stageEnterName')
	var stageSelectOpponentDiv = document.getElementById('stageSelectOpponent')
	var stagePlayGameDiv = document.getElementById('stagePlayGame')
	
	var game // Will be the game object.
	
	// Hide all but the first stage in the beginning.
	stageSelectOpponentDiv.classList.add("inactive")
	stagePlayGame.classList.add("inactive")
	
	// Listen for form submits.
	document.getElementById('enterNameForm').addEventListener('submit', function(event){
		event.preventDefault()
		
		// Change stage.
		stageEnterNameDiv.classList.add('inactive')
		stageSelectOpponentDiv.classList.remove('inactive')
		
	})
	
	document.getElementById('selectOpponentForm').addEventListener('submit', function(event){
		event.preventDefault()
		
		// Change stage.
		stageSelectOpponentDiv.classList.add('inactive')
		stagePlayGameDiv.classList.remove('inactive')
		
		// Create the game object.
		var humanName = document.getElementById('enteredName').value
		var aiName = document.getElementById('selectedOpponent').value
		
		game = new Game(humanName, aiName, numberOfTurns)
		
		updateGameGui()
		
	})
	
	// Shows the latest state of the game on the screen.
	function updateGameGui(){
		document.getElementById('currentTurn').innerText = game.getCurrentTurn()
		document.getElementById('numberOfTurns').innerText = game.getNumberOfTurns()
		document.getElementById('humanName').innerText = game.getHumanPlayer().getName()
		document.getElementById('aiName').innerText = game.getAiPlayer().getName()
		document.getElementById('humanScore').innerText = game.getHumanPlayer().getScore()
		document.getElementById('aiScore').innerText = game.getAiPlayer().getScore()
	}
	
	// Plays on turn in the game, and then updates the GUI.
	function playTurn(humanShape){
		
		game.playTurn(humanShape)
		updateGameGui()
		
		// Show a generic message.
		var message = ""
		var humanName = game.getHumanPlayer().getName()
		var aiName = game.getAiPlayer().getName()
		
		if(game.isOver()){
			document.getElementById('playPanel').classList.add('inactive')
			var humanScore = game.getHumanPlayer().getScore()
			var aiScore = game.getAiPlayer().getScore()
			if(humanScore < aiScore){
				message = aiName+" wins over "+humanName+"."
			}else if(aiScore < humanScore){
				message = aiName+" lost against "+humanName+"."
			}else{
				message = humanName+" and "+aiName+" both sucks!"
			}
		}else{
			if(game.getHumanPlayer().beats(game.getAiPlayer())){
				message = humanName+" owned "+aiName+"."
			}else if(game.getAiPlayer().beats(game.getHumanPlayer())){
				message = "Oh no, "+aiName+" owned "+humanName+"."
			}else{
				message = "It's a tie!"
			}
		}
		
		document.getElementById('genericMessage').innerText = message
		
	}
	
	document.getElementById('playRock').addEventListener('click', function(){
		playTurn('rock')
	})
	
	document.getElementById('playPaper').addEventListener('click', function(){
		playTurn('paper')
	})
	
	document.getElementById('playScissors').addEventListener('click', function(){
		playTurn('scissors')
	})
	
})
