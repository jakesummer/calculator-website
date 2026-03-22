const equationDisplay = document.querySelector(".equation-display");
const currentDisplay = document.querySelector(".current-display");
const digitButtons = document.querySelector(".digit-buttons");
const operatorButtons = document.querySelector(".operator-buttons");
const clearButton = document.querySelector("#clear-button");

let calculator = {
    firstNum: null,
    operator: null,
    currentInput: "",
};

function add(num1, num2) {
    return num1 + num2;
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
    answer = 
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


digitButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    let digit = e.target.textContent;
    calculator.currentInput += digit;
    currentDisplay.textContent = calculator.currentInput;
})

operatorButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    let operator = e.target.textContent;
    handleOperator(operator);
})

clearButton.addEventListener("click", () => {
    calculator.firstNum = null;
    calculator.operator = null
    calculator.currentInput = "";
    equationDisplay.textContent = "";
    currentDisplay.textContent = "";
})
