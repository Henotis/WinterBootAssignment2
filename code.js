/*
	MEC TTP 2021 Winter Assignment 2: Blackjack Game Engine
	
	===== PURPOSE =====
	- To practice implementing core javascript principles within the framing of building a blackjack card game engine.
	
	===== MAJOR FEATURES =====
	- User should be able to hit.
	- User should be able to stand.
	- User should be able to check status.
	- User should be able to reset the game.
	- User should be able to start the Blackjack game.
	===== FUNCTION STUBS =====
	- hit()
	- stand()
	- status()
	- reset()
	- start()
*/

//The 1's are considered aces and 10's are faces
let deck = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
];

let wins = 0;
let losses = 0;
let ties = 0;

let aiHand = [];
let userHand = [];
let index = 0;

// this variable is used in .reduce() to add an array together
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// returns the Blackjack game to its initial state
function reset() {
	deck = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
	];

	aiHand = [];
	userHand = [];
	index = 0;
}

// displays wins, losses, and ties
function status() {
	console.log("Wins: " + wins);
	console.log("Losses: " + losses);
	console.log("Ties: " + ties);
	console.log("AI current total: " + aiHand.reduce(reducer, 0))
	console.log("Your current total: " + userHand.reduce(reducer, 0))
}

// this function should remove the card from deck once it's dealt
function cardRemove(index) {
	deck.splice(index, 1);
}

//adds to player hand only!
function hit() {
	let aceIndex = 0;
	///////////////////////////
	index = Math.floor(Math.random()*deck.length);
	aceIndex = deck[index];
	console.log("Card dealt to you: " + aceIndex);
	userHand.push(aceIndex);
	cardRemove(index);
	///////////////////////////
	if(userHand.reduce(reducer, 0) + 11 <= 22){
		if(aceIndex == 1){
			userHand.push(10)
		}
	}
	console.log("Your current total: " + userHand.reduce(reducer, 0));
	if (userHand.reduce(reducer, 0) > 21) {
		losses += 1;
		console.log("You bust! Game has reset! Enter start() to play again!")
		status();
		reset();
	}
}

// user doesn't want to hit anymore and compares their numbers with the AI for the win or loss
function stand() {
	if (aiHand.reduce(reducer, 0) > userHand.reduce(reducer, 0)) {
		console.log("AI won! Game has reset! Enter start() to play again!")
		losses += 1;
		status();
		reset();
	}
	else if (aiHand.reduce(reducer, 0) < userHand.reduce(reducer, 0)) {
		console.log("You won! Game has reset! Enter start() to play again!")
		wins++;
		status();
		reset();
	}
	else{
		console.log("It's a tie! Game has reset! Enter start() to play again!")
		ties += 1;
		status();
		reset();
	}
}

// starts the game
function start() {
	reset();
	
	//temporarily holds the card that we want to cut from the deck
	index = 0;
	for(let i = 0; i < 2; i++){
		//assigning a random index from deck size to cutCard
		index = Math.floor(Math.random()*deck.length);
		//assinging to a variable
		aceIndex = deck[index];
		console.log("Card dealt to AI: " + aceIndex);
		//pushing the value if the cardIndex into hand
		aiHand.push(aceIndex);
		//finally cutting out the card!
		cardRemove(index);
		//checking if adding theoretical ace at the value 11 is > 22
		if(aiHand.reduce(reducer, 0) + 11 <= 22){
			//checking if a 1 was selected
			if(aceIndex == 1){
				//this pushes 10 because 1 is already pushed into
				//aiHand, adding 10 will make it 11. Ace's value.
				aiHand.push(10)
			}
		}
	}
	//the AI will hit again if it's count is below 17
	if(aiHand.reduce(reducer, 0) < 17){
		index = Math.floor(Math.random()*deck.length);
		aceIndex = deck[index];
		console.log("Card dealt to AI: " + aceIndex);
		aiHand.push(aceIndex);
		cardRemove(index);
		if(userHand.reduce(reducer, 0) + 11 <= 22){
			if(aceIndex == 1){
				userHand.push(10)
			}
		}
	}
	//the AI will bust if over 21
	if(aiHand.reduce(reducer, 0) > 21){
		console.log("AI has busted!");
		console.log("You won! Game has reset! Enter start() to play again!")
		wins++;
		status();
		reset();

		// ends the match early
		return;
	}
	console.log("AI current total: " + aiHand.reduce(reducer, 0));

	//User initial draw
	for(let i = 0; i < 2; i++){
		index = Math.floor(Math.random()*deck.length);
		aceIndex = deck[index];
		console.log("Card dealt to you: " + aceIndex);
		userHand.push(aceIndex);
		cardRemove(index);
		if(userHand.reduce(reducer, 0) + 11 <= 22){
			if(aceIndex == 1){
				userHand.push(10)
			}
		}
	}
	console.log("Your current total: " + userHand.reduce(reducer, 0));
}

// user menu
console.log("===== Welcome to the Blackjack Game Engine =====")
console.log("Enter start() to begin the Blackjack game.")
console.log("Enter status() to check your wins, losses, ties, and hands.")
console.log("Enter hit() to draw a card from the deck.")
console.log("Enter stand() to end the match and compare hands.")
console.log("Enter reset() to restart the game.")