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
	1, 1,
	1, 1,
	1, 1,
	1, 1
];

let wins = 0;
let losses = 0;
let ties = 0;

let aiHand = [];
let userHand = [];
let index = 0;
let aiTotal = 0;
let userTotal = 0;

// this variable is used in .reduce() to add an array together
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// returns the Blackjack game to its initial state
function reset() {
	deck = [
		1, 1,
		1, 1,
		1, 1,
		1, 1
	];

	aiHand = [];
	userHand = [];
	index = 0;
	aiTotal = 0;
	userTotal = 0
}

// displays wins, losses, and ties
function status() {
	console.log("Wins: " + wins);
	console.log("Losses: " + losses);
	console.log("Ties: " + ties);
	console.log("AI Hand: " + aiTotal)
	console.log("User Hand: " + userTotal)
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
	console.log("Index removed: " + index + " Value: " + aceIndex);
	userHand.push(aceIndex);
	cardRemove(index);
	///////////////////////////
	userTotal = userHand.reduce(reducer);
	if(userTotal + 11 <= 22){
		if(aceIndex == 1){
			userHand.push(10)
			userTotal = userHand.reduce(reducer);
		}
	}
	console.log("Your current Total: " + userTotal);
	if (userTotal > 21) {
		losses += 1;
		console.log("You bust! Game has reset! start() to play again!")
		status();
		reset();

	}
}

// user doesn't want to hit anymore and compares their numbers with the AI for the win or loss
function stand() {
	aiTotal = aiHand.reduce(reducer);
	userTotal = userHand.reduce(reducer);

	if (aiTotal > userTotal) {
		console.log("AI wins! Game has reset! start() to play again! Winning Number: " + aiTotal)
		losses += 1;
		status();
		reset();
	}
	else if (aiTotal < userTotal) {
		console.log("You won! Game has reset! start() to play again! Your total is: " + userTotal)
		wins += 1;
		status();
		reset();
	}
	else if(aiTotal == userTotal){
		console.log("It's a tie! Game has reset! start() to play again!")
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
		//tracking the index of the card removed
		console.log("Index removed: " + index + " Value: " + aceIndex);
		//pushing the value if the cardIndex into hand
		aiHand.push(aceIndex);
		//finally cutting out the card!
		cardRemove(index);
		aiTotal = aiHand.reduce(reducer);
		//checking if adding theoretical ace at the value 11 is > 22
		if(aiTotal + 11 <= 22){
			//checking if a 1 was selected
			if(aceIndex == 1){
				//this pushes 10 because 1 is already pushed into
				//aiHand, adding 10 will make it 11. Ace's value.
				aiHand.push(10)
				aiTotal = aiHand.reduce(reducer);
			}
		}
	}
	//the AI will hit again if it's count is below 17
	if(aiTotal < 17){
		index = Math.floor(Math.random()*deck.length);
		aceIndex = deck[index];
		console.log("Index removed: " + index + " Value: " + aceIndex);
		aiHand.push(aceIndex);
		cardRemove(index);
		aiTotal = aiHand.reduce(reducer);
		if(userTotal + 11 <= 22){
			if(aceIndex == 1){
				userHand.push(10)
				userTotal = userHand.reduce(reducer);
			}
		}
	}
	//the AI will bust if over 21
	if(aiTotal > 21){
		console.log("AI has busted! Game has been reset!");
		console.log("AI's total was: " + aiTotal);
		reset();
	}
	console.log("AI current hand: " + aiTotal);

	//User initial draw
	for(let i = 0; i < 2; i++){
		index = Math.floor(Math.random()*deck.length);
		aceIndex = deck[index];
		console.log("Index removed: " + index + " Value: " + aceIndex);
		userHand.push(aceIndex);
		cardRemove(index);	
		userTotal = userHand.reduce(reducer);
		if(userTotal + 11 <= 22){
			if(aceIndex == 1){
				userHand.push(10)
				userTotal = userHand.reduce(reducer);
			}
		}
	}
	console.log("User current hand: " + userTotal);
}