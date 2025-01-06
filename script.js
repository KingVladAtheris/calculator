// Declaring variables
const numberPressed = document.querySelectorAll(".number");
const operatorPressed = document.querySelectorAll(".operator");
const resultDisplay = document.querySelector(".result"); 
const clearButton = document.querySelector(".clear"); 
const signButton = document.querySelector(".sign"); 
const percentButton = document.querySelector(".percent"); 

let firstNumber = null; 
let secondNumber = null; 
let operator = null; 
let isDecimal = false; 

// Max number of digits allowed 
const MAX_DIGITS = 9;

// Press number buttons
numberPressed.forEach((button) => {
    button.addEventListener("click", () => {
        const numberValue = button.textContent;

        if (operator === null) {
            if (firstNumber && firstNumber.length < MAX_DIGITS) {
                firstNumber += numberValue; 
                updateDisplay(firstNumber); 
            } else if (!firstNumber) {
                firstNumber = numberValue;
                updateDisplay(firstNumber); 
            }
        } else {
            if (secondNumber && secondNumber.length < MAX_DIGITS) {
                secondNumber += numberValue; 
                updateDisplay(secondNumber); 
            } else if (!secondNumber) {
                secondNumber = numberValue;
                updateDisplay(secondNumber); 
            }
        }
    });
});

// Event listener for operator buttons
operatorPressed.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstNumber !== null && secondNumber !== null) {
            const result = performOperation(firstNumber, secondNumber, operator);
            updateDisplay(result); 

            // Update firstNumber with result 
            firstNumber = result;
            secondNumber = null; 
        }

        // Update operator for the next calculation
        operator = button.textContent;
        isDecimal = false; 
    });
});

// All clear button
clearButton.addEventListener("click", () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    isDecimal = false;
    updateDisplay("0"); 
});

// +/- button (can toggle negatice and keep operation structure)
signButton.addEventListener("click", () => {
    if (operator === null) {
        // Switch the sign of the first number
        firstNumber = toggleSign(firstNumber);
        updateDisplay(firstNumber);
    } else {
        // If operator, switch the sign of the second number
        secondNumber = toggleSign(secondNumber);
        updateDisplay(secondNumber);
    }
});

// Percentage button (can divide second number and keep operation structure)
percentButton.addEventListener("click", () => {
    if (operator === null) {
        // Divide the first number by 100
        firstNumber = parseFloat(firstNumber) / 100;
        updateDisplay(firstNumber);
    } else {
        // If operator, divide the second number by 100
        secondNumber = parseFloat(secondNumber) / 100;
        updateDisplay(secondNumber);
    }
});

// Toggle negative
function toggleSign(number) {
    return number ? (parseFloat(number) * -1).toString() : "0";
}

// Perform operations
function performOperation(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = null;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                alert("Oh, no. You just broke the Universe.");
                return null;
            }
            result = num1 / num2;
            break;
    }

    // Set max decimal result 2 digits
    result = result.toFixed(2);

    // Result over 9 digits
    if (result.length > MAX_DIGITS) {
        result = parseFloat(result).toExponential(2);
    }

    return result;
}

// Update the display
function updateDisplay(value) {
    resultDisplay.textContent = value !== null ? value : "0";
}

// Decimal point button
const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
    if (!isDecimal) {
        // Add decimal point
        if (operator === null) {
            firstNumber = firstNumber ? firstNumber + "." : "0.";
            updateDisplay(firstNumber);
        } else {
            secondNumber = secondNumber ? secondNumber + "." : "0.";
            updateDisplay(secondNumber);
        }
        // Decimal used
        isDecimal = true; 
    }
});
