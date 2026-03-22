const NUMS = "0123456789"
const OPERATORS = "+-x÷="

const equationDisplay = document.querySelector(".equation-display");
const currentDisplay = document.querySelector(".current-display");
const digitButtons = document.querySelector(".left-buttons");
const operatorButtons = document.querySelector(".operator-buttons");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

let calculator = {
    firstNum: null,
    operator: null,
    currentInput: "",
};

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    let answer = 
        (operator === "+") ? add(num1, num2):
        (operator === "-") ? subtract(num1, num2):
        (operator === "x") ? multiply(num1, num2):
        (operator === "÷") ? divide(num1, num2):
        "";
    return answer;
}

function handleOperator(operator) {
    if (operator === "=") {
        if (calculator.firstNum && calculator.operator && calculator.currentInput) {
            let result = operate(calculator.firstNum, calculator.operator, calculator.currentInput);
            result = cutOffLongNumber(result);

            calculator.currentInput = result;
            calculator.firstNum = null;
            calculator.operator = null;
            
            equationDisplay.textContent = "";
            currentDisplay.textContent = calculator.currentInput;
        }
    } else {
        if (calculator.currentInput && !calculator.operator && !calculator.firstNum){
            calculator.firstNum = calculator.currentInput;
            calculator.operator = operator;
            calculator.currentInput = "";

            equationDisplay.textContent = `${calculator.firstNum} ${calculator.operator}`;
            currentDisplay.textContent = "";
        }
    }
}

function clearDisplay() {
    calculator.firstNum = null;
    calculator.operator = null
    calculator.currentInput = "";
    equationDisplay.textContent = "";
    currentDisplay.textContent = "";
}

function deleteNum() {
    calculator.currentInput = calculator.currentInput.slice(0, calculator.currentInput.length - 1);
    currentDisplay.textContent = calculator.currentInput;
}

function cutOffLongNumber(num) {
    if (!num) return;

    num = num.toString();
    while (num.length > 15) { // 15 is the longest a number can be before it starts to go off the display area
        num = num.slice(0, num.length - 1);
    }

    return num;
}

function handleNumberInput(num) {
    if (calculator.currentInput.length >= 15) return

    calculator.currentInput += num;
    currentDisplay.textContent = calculator.currentInput;
}

digitButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON" || !NUMS.includes(e.target.textContent)) return;
    handleNumberInput(e.target.textContent);
});

operatorButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    let operator = e.target.textContent;
    handleOperator(operator);
});

clearButton.addEventListener("click", () => {
    clearDisplay();
});

deleteButton.addEventListener("click", () => deleteNum());

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (NUMS.includes(key)) handleNumberInput(key);
    else if (OPERATORS.includes(key)) handleOperator(key);
    else if (key === "*") handleOperator("x");
    else if(key === "Enter") handleOperator("=");
    else if (key === "/") handleOperator("÷");
    else if (key === "Backspace") deleteNum();
    else if (key === "c") clearDisplay();
});

// Remove focus from buttons after pressing them; without this pressing the enter key presses the button instead of acting as an "=""
document.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
        e.target.blur();
    }
});