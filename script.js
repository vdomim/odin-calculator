let firstNumber = ''
let secondNumber = ''
let operator = ''
let calculated = false
let error = false

const numberBtns = document.querySelectorAll('.number')
const operatorBtns = document.querySelectorAll('.operations .operator')
const equalBtn = document.querySelector('.equals .operator')
console.log('🚀 ~ file: script.js:7 ~ operatorBtns:', operatorBtns)
const display = document.querySelector('.display')
console.log('🚀 ~ file: script.js:7 ~ display:', display)
const clearBtn = document.querySelector('.functions.clear')

numberBtns.forEach((number) => number.addEventListener('click', handleNumber))
operatorBtns.forEach((operator) =>
    operator.addEventListener('click', handleOperator)
)
equalBtn.addEventListener('click', handleEqual)
clearBtn.addEventListener('click', clearVariables)

function clearVariables() {
    firstNumber = ''
    secondNumber = ''
    operator = ''
    updateDisplay()
}

function updateDisplay() {
    display.textContent = firstNumber + ' ' + operator + ' ' + secondNumber
}

function handleEqual(event) {
    if (firstNumber && secondNumber && operator) {
        let result = operate(
            Number(firstNumber),
            operator,
            Number(secondNumber)
        )
        clearVariables()
        firstNumber = result
        updateDisplay()
        calculated = true
    }
}

function handleOperator(event) {
    if (error) {
        clearVariables()
        error = false
    } else if (!operator) {
        operator = event.target.textContent
        updateDisplay()
        calculated = false
    } else if (operator && firstNumber && secondNumber) {
        handleEqual()
        operator = event.target.textContent
        updateDisplay()
    }
}

function handleNumber(event) {
    console.log(event.target.textContent)
    if (calculated) {
        clearVariables()
        firstNumber += event.target.textContent
        console.log(
            '🚀 ~ file: script.js:62 ~ handleNumber ~ firstNumber:',
            firstNumber
        )
        updateDisplay()
        calculated = false
    } else if (operator) {
        console.log('Añadimos el segundo numero')
        secondNumber += event.target.textContent
        updateDisplay()
    } else {
        console.log('Añadimos el primer numero')
        firstNumber += event.target.textContent
        updateDisplay()
    }
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            return add(a, b)
            break
        case '-':
            return subtract(a, b)
            break
        case '*':
            return multiply(a, b)
            break
        case '/':
            return divide(a, b)
            break
    }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b === 0) {
        error = true
        return 'Error. Can`t divide by 0'
    }
    return parseFloat((a / b).toFixed(2))
}
