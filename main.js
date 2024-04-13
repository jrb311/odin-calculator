let firstNum;
let secondNum;
let operator;
let display = document.querySelector("#display");
display.textContent = "0";

generateDisplay();



function generateDisplay() {
    let isNewNum = true;
    //Generate numbers in display on user click
    let digits = document.querySelectorAll(".digit-button");
    digits.forEach(digit => {
        digit.addEventListener('click', (event) => {
            display.textContent = isNewNum ? (() => 
            {   display.textContent = 0;
                isNewNum = false;
                return parseInt(display.textContent.concat(event.target.textContent)) 
            })()
                : parseInt(display.textContent.concat(event.target.textContent));    
        });
    });
    //Store first number value and operator value on user click for use in calulator functions
    let operatorNode = document.querySelectorAll(".op-button");
    operatorNode.forEach(op => {
        op.addEventListener('click', (event) => {
            //assign operator and first operand
            if (operator === undefined && firstNum === undefined && secondNum === undefined) {
                firstNum = parseInt(display.textContent);
                operator = event.target.textContent;
                isNewNum = true; 
            }
            //Account for condition when user wants to change operator
            else if (operator !== undefined && firstNum !== undefined && secondNum === undefined && isNewNum) {
                operator = event.target.textContent;
            }
            //Account for successive use of operator w/o equal sign
            else if (operator !== undefined && firstNum !== undefined && secondNum === undefined && !isNewNum) {
                secondNum = parseInt(display.textContent);

                display.textContent = operate(firstNum, operator, secondNum);

                firstNum = parseInt(display.textContent);
                operator = event.target.textContent;
                secondNum = undefined;
                isNewNum = true;
            }
            //Account for all variables having values due to previously using full operation and equal sign
            else if (operator !== undefined && firstNum !== undefined && secondNum !== undefined && isNewNum) {
                operator = event.target.textContent;
            }
            else if (operator !== undefined && firstNum !== undefined && secondNum !== undefined && !isNewNum) {
                secondNum = parseInt(display.textContent);
                
                display.textContent = operate(firstNum, operator, secondNum);

                firstNum = parseInt(display.textContent);
                operator = event.target.textContent;
                secondNum = undefined;
                isNewNum = true;
            }
        });
    });

    let equals = document.querySelector(".equals-button")
    equals.addEventListener('click', () => {
        if (firstNum !== undefined && secondNum === undefined) {
            secondNum = parseInt(display.textContent);
        };
        
        if (firstNum !== undefined && operator !== undefined && secondNum !== undefined) {
            display.textContent = operate(firstNum, operator, secondNum);
            firstNum = parseInt(display.textContent);
            isNewNum = true;
        };
    });

    let clear = document.querySelector(".clear-button")
    clear.addEventListener ('click', () => {
        firstNum = undefined;
        secondNum = undefined;
        operator = undefined;
        display.textContent = "0";
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
    let result = firstNum === undefined ? "error: no first operand"
        : secondNum === undefined ? "error: no second operand"
        : operator === "+" ? add(firstNum, secondNum) 
        : operator === "-" ? subtract(firstNum, secondNum)
        : operator === "*" ?  multiply(firstNum, secondNum)
        : operator === "/" ? divide(firstNum, secondNum)
        : "error";
    return result;
};