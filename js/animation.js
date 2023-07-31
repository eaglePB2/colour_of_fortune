document.addEventListener('DOMContentLoaded', function () {

    // Init var
    const squareArea = document.getElementById('square_area');
    let squares = document.querySelectorAll(".square");
    let colorDisplay = document.getElementById("colorDisplay");
    let messageDisplay = document.getElementById("messageTry");
    let resetBtn = document.querySelector("#reset");
    const slider = document.getElementById('slider');

    // Init func()
    let numSquares = calculateNumSquares(parseInt(slider.value));
    let colors = randomColor(numSquares);
    let pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    updateSquareArea();

    // Event Listener for Reset Button
    resetBtn.addEventListener("click", function () {
        resetGame();
    });

    // Event listener for slider value change
    slider.addEventListener('input', function () {
        numSquares = calculateNumSquares(parseInt(slider.value));
    });

    // Function to calculate the number of squares based on the slider value
    function calculateNumSquares(sliderValue) {
        return sliderValue * sliderValue;
    }

    // Function to change the color of all squares
    function changeColor(colors) {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors;
        }
    }

    // Function to update the square area with the required number of squares
    function updateSquareArea() {
        squareArea.innerHTML = ''; // Clear the current squares

        for (let i = 0; i < numSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.backgroundColor = colors[i];
            squareArea.appendChild(square);

            // Add click event listener to the square
            square.addEventListener('click', function () {
                let clickedColor = this.style.backgroundColor;
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = 'Correct!';
                    messageDisplay.style.color = pickedColor;
                    colorDisplay.style.color = pickedColor;
                    changeColor(pickedColor);
                    resetBtn.textContent = 'Play again?';
                } else {
                    this.style.backgroundColor = '#BCCDE5';
                    this.style.display = 'none';
                    messageDisplay.textContent = 'Not this one, pick another.';
                    messageDisplay.style.color = clickedColor;
                }
            });
        }
    }

    // Function to generate random colors
    function randomColor(num) {
        let array = [];
        for (let i = 0; i < num; i++) {
            array.push(randomColorResult());
        }
        return array;
    }

    function randomColorResult() {
        var R = Math.floor(Math.random() * 256);
        var G = Math.floor(Math.random() * 256);
        var B = Math.floor(Math.random() * 256);
        return "rgb(" + R + ", " + G + ", " + B + ")";
    }

    // Function to pick a random color from the colors array
    function pickColor() {
        let random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    // Function to reset the game
    function resetGame() {
        numSquares = calculateNumSquares(parseInt(slider.value));
        colorDisplay.textContent = pickedColor;
        colors = randomColor(numSquares);
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;
        resetBtn.textContent = "New Puzzle";
        updateSquareArea();
        messageDisplay.textContent = "";
        colorDisplay.style.color = "#000000";
        for (let i = 0; i < squares.length; i++) {
            if (colors[i]) {
                squares[i].style.backgroundColor = colors[i];
                squares[i].style.display = "block";
            } else {
                squares[i].style.display = "none";
            }
        }
    }

    // Detect if player selected correct color
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                messageDisplay.style.color = pickedColor;
                colorDisplay.style.color = pickedColor;
                changeColor(pickedColor);
                resetBtn.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#BCCDE5";
                this.style.display = 'none';
                messageDisplay.textContent = "Not this one, pick another.";
                messageDisplay.style.color = clickedColor;
            }
        });
    }

});