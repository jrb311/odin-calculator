let firstNum;
let secondNum;
let operator;
let display = document.querySelector("#display");
display.textContent = "0";

generateDisplay();



function generateDisplay() {
    //Generate numbers in display on user click
    let digits = document.querySelectorAll(".digit-button");
    digits.forEach(digit => {
        digit.addEventListener('click', (event) => {
            display.textContent = 
                operator === undefined ? parseInt(display.textContent.concat(event.target.textContent))
                : display.textContent !== firstNum ? parseInt(display.textContent.concat(event.target.textContent))
                    : (() => {
                        display.textContent = 0;
                        return parseInt(display.textContent.concat(event.target.textContent)) 
                    }) ();
        });
    });
    //Store first number value and operator value on user click for use in calulator functions
    let operatorNode = document.querySelectorAll(".op-button");
    operatorNode.forEach(op => {
        op.addEventListener('click', (event) => {
            firstNum = display.textContent;
            operator = event.target.textContent;
            
        });
    });

     
};

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