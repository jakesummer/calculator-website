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