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
                return event.target.textContent; 
            })()
                : (() => 
                {
                    if ((event.target.textContent === '.' && display.textContent.indexOf('.') > -1) || (event.target.textContent === '.' && display.textContent.indexOf('e') > -1)){
                        return;
                    }
                    else if (event.target.textContent === '.' && display.textContent.indexOf('.') === -1 && display.textContent.indexOf('e') === -1) {
                        return display.textContent.concat(event.target.textContent);
                    }
                    else if (event.target.textContent !== '.' && display.textContent.indexOf('e') === -1) {
                        let newNum = display.textContent.concat(event.target.textContent);
                        if (newNum.length > 19 && newNum.indexOf('.') > -1) {
                            return parseFloat(newNum).toFixed((19 - (newNum.length - (newNum.slice((newNum.indexOf('.') + 1)).length)))).toString();
                        }
                        else if (newNum.length > 19 && newNum.indexOf('.') === -1) {
                            return parseFloat(newNum).toExponential(2);
                        }
                        else {
                            return newNum;
                        }
                    }
                    else if (event.target.textContent !== '.' && display.textContent.indexOf('e') > -1) {
                        return parseFloat((parseFloat(display.textContent).toString()).concat(event.target.textContent)).toExponential(2);
                    }
                })();
                    
        });
    });
    //Store first number value and operator value on user click for use in calulator functions
    let operatorNode = document.querySelectorAll(".op-button");
    operatorNode.forEach(op => {
        op.addEventListener('click', (event) => {
            //assign operator and first operand
            if (operator === undefined && firstNum === undefined && secondNum === undefined) {
                firstNum = parseFloat(display.textContent);
                operator = event.target.textContent;
                isNewNum = true; 
            }
            //Account for condition when user wants to change operator
            else if (operator !== undefined && firstNum !== undefined && isNewNum) {
                operator = event.target.textContent;
            }
            //Account for successive use of operator w/o equal sign
            else if (operator !== undefined && firstNum !== undefined && !isNewNum) {
                secondNum = parseFloat(display.textContent);
                if (operator === '/' && secondNum === 0)
                {
                    display.textContent = `Can't divide by 0!`;
                    return;
                }
                
                display.textContent = operate(firstNum, operator, secondNum);

                firstNum = parseFloat(display.textContent);
                operator = event.target.textContent;
                secondNum = undefined;
                isNewNum = true;
            }
        });
    });

    let equals = document.querySelector(".equals-button")
    equals.addEventListener('click', () => {
        if (firstNum !== undefined && secondNum === undefined) {
            secondNum = parseFloat(display.textContent);
        };
        
        if (firstNum !== undefined && operator !== undefined && secondNum !== undefined) {
            if (operator === '/' && secondNum === 0)
            {
                display.textContent = `Can't divide by 0!`;
            }
            else {
            display.textContent = operate(firstNum, operator, secondNum);
            firstNum = parseFloat(display.textContent);
            isNewNum = true;
            }
        };
    });

    let clear = document.querySelector(".clear-button")
    clear.addEventListener ('click', () => {
        firstNum = undefined;
        secondNum = undefined;
        operator = undefined;
        display.textContent = "0";
        isNewNum = true;
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