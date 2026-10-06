// --- ÉTAPE 1 : Fonctions mathématiques de base ---
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) return "Nice try! Tu ne peux pas diviser par 0 ! 🤖";
    return a / b;
};

// --- ÉTAPE 2 : Variables de la calculatrice ---
let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '0';

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

// --- ÉTAPE 3 : Fonction operate ---
function operate(op, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// --- ÉTAPES 5 & 6 : Gestion des clics et de la logique ---
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    const action = target.dataset.action;
    const buttonText = target.textContent;

    // Si c'est un chiffre ou un point
    if (!action) {
        if (displayValue === '0' || displayValue === 'Nice try! Tu ne peux pas diviser par 0 ! 🤖') {
            displayValue = buttonText;
        } else {
            displayValue += buttonText;
        }
        updateDisplay();
        return;
    }

    // Gestion du bouton Clear (AC)
    if (action === 'clear') {
        firstNumber = '';
        operator = '';
        secondNumber = '';
        displayValue = '0';
        updateDisplay();
        return;
    }

    // Gestion des opérateurs (+, -, *, /)
    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        if (firstNumber && operator && displayValue !== firstNumber) {
            firstNumber = operate(operator, firstNumber, displayValue);
            displayValue = String(firstNumber);
            updateDisplay();
        } else {
            firstNumber = displayValue;
        }
        
        const symbols = { add: '+', subtract: '-', multiply: '*', divide: '/' };
        operator = symbols[action];
        displayValue = '0';
        return;
    }

    // Gestion du bouton égal (=)
    if (action === 'calculate') {
        if (!operator || !firstNumber) return;
        
        secondNumber = displayValue;
        let result = operate(operator, firstNumber, secondNumber);
        
        displayValue = String(result);
        updateDisplay();
        
        // Réinitialisation partielle pour enchaîner les calculs
        firstNumber = displayValue;
        operator = '';
        secondNumber = '';
    }
});