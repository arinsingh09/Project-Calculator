// Select all digit buttons, operator buttons, decimal point button, equals button, clear button, and backspace button
const digits = Array.from(document.querySelectorAll('.digit'));
const operators = Array.from(document.querySelectorAll('.operator'));
const decimalPoint = document.querySelector('.decimal-point');
const equalsTo = document.querySelector('.equals-to');
const clear = document.querySelector('.clear-button');
const display = document.querySelector('.display');
const lastOutput = display.querySelector('#last-output');
const currentOutput = display.querySelector('#current-output');
const backspace = document.querySelector('.backspace');

// Initialize variables to store calculator state
let current = '';
let last = '';
let currentOperator = '';

// Event listeners for buttons
digits.forEach(digit => digit.addEventListener('click', () => outputDigit(digit.textContent)));
operators.forEach(operator => operator.addEventListener('click', () => outputOperator(operator.textContent)));
decimalPoint.addEventListener('click', () => outputDecimal('.'));
backspace.addEventListener('click', () => outputBackspace());
equalsTo.addEventListener('click', () => evaluateResult());
clear.addEventListener('click', () => clearCalculator());

function clearCalculator() {
    current = '';
    currentOutput.textContent = '';
    last = '';
    lastOutput.textContent = '';
    currentOperator = '';
    operator = '';
}

function outputDigit(digit) {
    if (digit === '.' && current.includes('.')) {
        return;
    }

    if (current === last) {
        current = '';
    }

    if (current.length < 10) {
        current += digit;
    }
    currentOutput.textContent = current; 
}

function outputOperator(selectedOperator) {
    currentOperator = selectedOperator;
    last = current;
    current = '';
    lastOutput.textContent = `${last} ${currentOperator}`;
    currentOutput.textContent = '';
}

function outputDecimal(dot) {
    if (!current.includes(dot)) {
        current += dot;
        currentOutput.textContent = current;
    }
}

function outputBackspace() {
    if (current.length > 0) {
        current = current.slice(0, -1);
        currentOutput.textContent = current;
    }
}

// Functions to perform the actual calculation

function evaluateResult() {
    if (current !== '' && last !== '') {
        evaluate();

        if (currentOutput.textContent === 'DIVISION BY ZERO!')
            return;

        lastOutput.textContent = '';
        if (last.length > 20) {
            currentOutput.style.fontSize = '20px';
            currentOutput.textContent = 'LIMIT EXCEEDED!';
        } else {
            currentOutput.textContent = last;
        }
    }
}

function evaluate() {
    last = +last;
    current = +current;

    if (currentOperator === '+') {
        last += current;
    } else if (currentOperator === '-') {
        last -= current;
    } else if (currentOperator === '*') {
        last *= current;
    } else if (currentOperator === '/' && current !== 0) {
        last /= current;
    } else if (currentOperator === '/' && current === 0) {
        currentOutput.style.fontSize = '20px';
        currentOutput.textContent = 'DIVISION BY ZERO!';
        lastOutput.textContent = '';
        last = '';
        current = '';
        return;
    }

    last = Math.round(last * 1000) / 1000;
    last = last.toString();
    current = last.toString();
}
