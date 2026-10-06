// --- Variables de la calculatrice ---
let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '0';

// --- Sélection des éléments ---
const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

// --- Fonction pour mettre à jour l'écran ---
function updateDisplay() {
    display.textContent = displayValue;
}

// --- Fonction pour gérer la division par zéro ---
function divide(a, b) {
    if (b === 0) {
        return "Nice try! Tu ne peux pas diviser par 0 ! 🤖";
    }
    return a / b;
}

// --- Fonction pour effectuer le calcul ---
function operate(op, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) return null;
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// --- Écouteur d'événement principal sur la grille de touches ---
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return; // Ignore si on ne clique pas sur un bouton

    const action = target.dataset.action; // Récupère l'action (add, clear, calculate...)
    const buttonText = target.textContent; // Récupère le texte du bouton (+, -, 1, 2...)

    // 1. Si c'est un chiffre ou un point (.)
    if (!action) {
        if (displayValue === '0' || displayValue === "Nice try! Tu ne peux pas diviser par 0 ! 🤖") {
            displayValue = buttonText;
        } else {
            displayValue += buttonText;
        }
        updateDisplay();
        return;
    }

    // 2. Gestion du bouton Clear (AC)
    if (action === 'clear') {
        firstNumber = '';
        operator = '';
        secondNumber = '';
        displayValue = '0';
        updateDisplay();
        return;
    }

    // 3. Gestion des opérateurs (+, -, *, /)
    if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
        // Si on a déjà un premier nombre et un opérateur en attente, on calcule le résultat intermédiaire
        if (firstNumber && operator && displayValue !== firstNumber) {
            firstNumber = operate(operator, firstNumber, displayValue);
            displayValue = String(firstNumber);
            updateDisplay();
        } else {
            firstNumber = displayValue;
        }
        
        // Mappe l'action vers le symbole correspondant
        const symbols = { add: '+', subtract: '-', multiply: '*', divide: '/' };
        operator = symbols[action];
        displayValue = '0'; // Réinitialise l'écran pour le deuxième nombre
        return;
    }

    // 4. Gestion du bouton égal (=)
    if (action === 'calculate') {
        if (!operator || !firstNumber) return; // Bloque si l'opération est incomplète
        
        secondNumber = displayValue;
        let result = operate(operator, firstNumber, secondNumber);
        
        // Affiche le résultat
        displayValue = String(result);
        updateDisplay();
        
        // Réinitialisation partielle pour enchaîner les calculs
        firstNumber = displayValue; // Le résultat devient le nouveau premier nombre
        operator = '';
        secondNumber = '';
    }
});

// Initialise l'écran au chargement
updateDisplay();