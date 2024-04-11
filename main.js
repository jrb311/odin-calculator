let firstNum;
let secondNum;
let operator;

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(firstNum, operator, secondNum) {
    let result = firstNum === undefined ? 0
        : secondNum === undefined ? 0
        : operator === "+" ? add(firstNum, secondNum) 
        : operator === "-" ? subtract(firstNum, secondNum)
        : operator === "*" ?  multiply(firstNum, secondNum)
        : operator === "/" ? divide(firstNum, secondNum)
        : 0;
    return result;
};