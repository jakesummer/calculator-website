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
            operate(calculator.firstNum, calculator.operator, calculator.currentInput);
            calculator.firstNum = null;
            calculator.operator = null;
            calculator.currentInput = "";
        }
    } else {
        if (calculator.currentInput && !calculator.operator && !calculator.firstNum){
            calculator.firstNum = calculator.currentInput;
            calculator.operator = operator;
            calculator.currentInput = "";
        }
    }
}

const digitButtons = document.querySelector(".digit-buttons");
const operatorButtons = document.querySelector(".operator-buttons");

digitButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    let digit = e.target.textContent;
    calculator.currentInput += digit;
})

operatorButtons.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    let operator = e.target.textContent;
    handleOperator(operator);
})
