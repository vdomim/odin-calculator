let firstNumber = ''
let secondNumber = ''
let operator = ''
let calculated = false
let error = false

window.addEventListener('keydown', test)
function test(event) {
    const e = {
        target: {
            textContent: event.key,
        },
    }
    switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            handleNumber(e)
            break
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(e)
            break
        case '=':
        case 'Enter':
            handleEqual(e)
            break
        case 'Backspace':
            handleDelete()
            break
        case 'Control':
            clearVariables()
            break
    }
}

const numberBtns = document.querySelectorAll('.number')
const operatorBtns = document.querySelectorAll('.operations .operator')
const equalBtn = document.querySelector('.equals .operator')
const display = document.querySelector('.display')
const clearBtn = document.querySelector('.functions.clear')
const pointBtn = document.querySelector('#float-point')
const deleteBtn = document.querySelector('#delete')

numberBtns.forEach((number) => number.addEventListener('click', handleNumber))

operatorBtns.forEach((operator) =>
    operator.addEventListener('click', handleOperator)
)
equalBtn.addEventListener('click', handleEqual)
clearBtn.addEventListener('click', clearVariables)
pointBtn.addEventListener('click', handleNumber)
deleteBtn.addEventListener('click', handleDelete)

function handleDelete() {
    if (firstNumber && !operator) {
        firstNumber = firstNumber.slice(0, -1)
        updateDisplay()
    } else if (firstNumber && !secondNumber) {
        operator = ''
        updateDisplay()
    } else {
        secondNumber = secondNumber.slice(0, -1)
        updateDisplay()
    }
}

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
        ).toString()
        clearVariables()
        firstNumber = result
        updateDisplay()
        calculated = true
    }
    pointBtn.disabled = false
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
        calculated = false
        operator = event.target.textContent
        updateDisplay()
    }
    pointBtn.disabled = false
}

function handleNumber(event) {
    let value = event.target.textContent

    if (calculated) {
        clearVariables()
        if (value === '.') {
            value = '0.'
        }
        firstNumber += value
        updateDisplay()
        calculated = false
    } else if (operator) {
        if (value === '.' && secondNumber === '') {
            value = '0.'
        }
        if (secondNumber.includes('.')) {
            pointBtn.disabled = true
        }
        secondNumber += value
        updateDisplay()
    } else {
        if (value === '.' && firstNumber === '') {
            value = '0.'
        }
        if (firstNumber.includes('.')) {
            pointBtn.disabled = true
        }
        firstNumber += value
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
    return parseFloat((a + b).toFixed(5))
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(5))
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(5))
}

function divide(a, b) {
    if (b === 0) {
        error = true
        return 'Error. Can`t divide by 0'
    }
    return parseFloat((a / b).toFixed(5))
}
