let expression = '';

// html dom objects
let container = document.querySelector('.container');
let smallPad = document.querySelector('.small-pad');
let smallPadExp = document.querySelector('.small-pad-exp');
let smallPadAns = document.querySelector('.small-pad-ans');
let backspace = document.querySelector('.btn-back');
let clear = document.querySelector('.btn-ac');
let equalSign = document.querySelector('.btn-equal');
let percentSign = document.querySelector('.btn-per');

container.addEventListener('click', formExpression);

function formExpression(event){
    let source = event.target;
    if (source === equalSign){
        let ans = calculate(expression);
        if ((isNaN(ans)) || (ans === false)){
            smallPadAns.innerText = "Err";    
        }else{
            smallPadAns.innerText = ans;
        }
    }
    else if (source === backspace){
        expression = expression.slice(0,expression.length-2);
        smallPadExp.innerText = expression;
        smallPadAns.innerText = '';
    }
    else if (source === clear){
        expression = '';
        smallPadExp.innerText = expression;
        smallPadAns.innerText = '';
    }
    else if (source !== container && source !== smallPadExp && source !== smallPadAns && source !== smallPad) {
        sourceText = source.innerText
        if (sourceText === 'x^2'){
            let ans = calculate(expression);
            if ((isNaN(ans) ) || (ans == false)){
                smallPadAns.innerText = "Err";    
            }else{
                smallPadAns.innerText = square(ans);
            }
        } else if (sourceText === 'X'){
            expression += ' * ';
            smallPadAns.innerText = '';
        } else if (sourceText === '+'){
            expression += ' + ';
            smallPadAns.innerText = '';
        } else if (sourceText === '-'){
            expression += ' - ';
            smallPadAns.innerText = '';
        } else if (sourceText === '/'){
            expression += ' / ';
            smallPadAns.innerText = '';
        } else if (sourceText === ')'){
            expression += ' ) ';
            smallPadAns.innerText = '';
        } else if (sourceText === '('){
            expression += ' ( ';
            smallPadAns.innerText = '';
        } else if (sourceText === '%'){
            let ans = calculate(expression);
            if ((isNaN(ans)) || (ans == false)){
                smallPadAns.innerText = "Err";    
            }else{
                smallPadAns.innerText = per(ans);
            }
        }else if (sourceText === '^'){
            expression += ' ^ ';
            smallPadAns.innerText = '';
        }
        else{
            expression += source.innerText
            smallPadAns.innerText = '';
        }
        smallPadExp.innerText = expression;
    }
}

// functions to Calculate
function calculate(expression){
    let postfix = infixToPostfix(expression);
    return postfixEvaluator(postfix);
}

function infixToPostfix(expr){
    precedence = {
        '^':4,
        '*' : 3,
        '/' : 3,
        '+' : 2,
        '-' : 2,
        '(' : 1
    };
    stack = Array();
    postfixArray = Array();
    tokenArray = expr.split(' ');

    for (const i in tokenArray) {
        if (!'()+-*/^'.includes(tokenArray[i])){
            postfixArray.push(tokenArray[i])
        }else if(tokenArray[i] == '('){
            stack.push(tokenArray[i]);
        } else if(tokenArray[i] == ')'){
            topToken = stack.pop();
            while (topToken != '('){
                postfixArray.push(topToken);
                topToken = stack.pop();
            }
        } else{
            while (!(stack.length == 0) && (precedence[stack[stack.length-1]] >= precedence[tokenArray[i]])){
                postfixArray.push(stack.pop());
            }
            stack.push(tokenArray[i]);
        }
    }
    while (!(stack.length == 0)){
        postfixArray.push(stack.pop());
    }

    return postfixArray.join(' ');
}

function postfixEvaluator(postfixExp){
    let stack = Array(); //stack storing operands
    let postfixArray = postfixExp.split(' ');

    for (const i in postfixArray) {
        if ('+*-/^'.includes(postfixArray[i])){
            operand2 = stack.pop();
            operand1 = stack.pop();
            result = calc(postfixArray[i], operand1, operand2);
            stack.push(result);
        }else{
            stack.push(postfixArray[i]);
        }
    }
    return stack.pop();
}

function calc(operator, operand1, operand2){
    if (operator === "*"){
        return multiply(operand1,operand2);
    }else if (operator === "/"){
        return divide(operand1, operand2);
    }else if (operator === "+"){
        return add(operand1,operand2);
    }
    else if(operator === '^'){
        return pow(operand1, operand2);
    }else{
        return subtract(operand1,operand2);
    }
}

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2){
    return num1 - num2;
}

function divide(num1, num2){
    let value = parseFloat(num1)/parseFloat(num2)
    if (isNaN(value)){
        return false
    }
    return value
}

function per(num1){
    let value = (parseFloat(num1) / 100) + " %";
    return value;
}

function square(num1){
    let value = parseFloat(num1) * parseFloat(num1)
    return value
}

function pow(num1, num2){
    ans = parseFloat(num1)
    for (let index = 0; index < parseInt(num2)-1; index++) {
        ans *= num1
    }
    return ans
}