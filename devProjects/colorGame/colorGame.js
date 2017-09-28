let numOfSquares = 6;
let currMode = 'hard';
let colors = [];

let changeColors = (color) => {
	//loop through all squares and change color to color input
	//for making all squares have the same color when user selects correct color
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
};

//pick a color randomly from the colors list
let pickColor = () => {
	let randomColorFromColorsArray = colors[Math.floor(Math.random()*colors.length)];
	return randomColorFromColorsArray;
};

//generate a number (either 3 (easy mode) or 6 (hard mode) for colors array)
let generateRandomColors = (num) => {
	while(colors.length < num) {
		let r = Math.floor(Math.random()*256);
		let g = Math.floor(Math.random()*256);
		let b = Math.floor(Math.random()*256);
		let newNum = `rgb(${r}, ${g}, ${b})`;
		colors.push(newNum);
	};
};

generateRandomColors(numOfSquares);

let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
let h1 = document.querySelector("h1");
let squares = document.querySelectorAll(".square");

let fillUpSquares = () => {
	for (let i = 0; i < squares.length; i++){
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		// add click listeners to squares
		squares[i].addEventListener("click", () => {
			//grab color of clicked square
			let clickedColor = squares[i].style.backgroundColor;
			let message = document.getElementById("message");
			if (clickedColor === pickedColor){
				message.textContent = "Correct!";
				reset.textContent = "Play Again?";
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
			} else {
				squares[i].style.backgroundColor = "#232323";
				message.textContent = "Try Again";
			}
		});
	};
};

fillUpSquares();

//============================================================================================================

//Reset Button

const resetInterface = () => {
	//pick a new random color
	pickedColor = pickColor();

	//change the color display
	colorDisplay.textContent = pickedColor;

	//reset the color of the header
	h1.style.backgroundColor = "steelblue";

	fillUpSquares();

	//change message to empty string
	message.textContent = "";
};

let reset = document.querySelector("#reset");

reset.addEventListener("click", () => {
	// console.log('BEFORE: ', colors);

	//generate new random colors
	colors = [];
	let numOfColorsToGenerate = (currMode === 'hard' ? 6 : 3);
	generateRandomColors(numOfColorsToGenerate);

	//change the button from "Play Again?" to "New Colors"
	reset.textContent = "New Colors";

	resetInterface();
});

//============================================================================================================

//Easy and Hard Toggle

let hardButton = document.getElementById("hard");
let easyButton = document.getElementById("easy");

easyButton.addEventListener("click", () => {
	currMode = 'easy';
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");

	let toHideSquares = document.querySelectorAll(".toBeHidden");
	for(let i = 0; i < toHideSquares.length; i++){
		toHideSquares[i].classList.add("hide");
	}

	colors = [];
	generateRandomColors(3);

	resetInterface();
});

hardButton.addEventListener("click", () => {
	hardButton.classList.add("selected");
	easyButton.classList.remove("selected");

	let toHideSquares = document.querySelectorAll(".toBeHidden");
	for(let i = 0; i < toHideSquares.length; i++){
		toHideSquares[i].classList.remove("hide");
	}

	colors = [];
	generateRandomColors(6);

	resetInterface();
});
