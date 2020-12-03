class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = 0;
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand.toString().length < 1) return this.currentOperand = 0;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = parseFloat(computation.toFixed(15)).toString();
        this.readyToReset = true;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('ru', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    sqrtDisplay(str, attr) {
        switch (attr) {
            case '±':
                if (this.currentOperandTextElement.innerText === '0') {
                    this.currentOperandTextElement.innerText = '-';
                } else if (this.currentOperandTextElement.innerText.includes('-')) {
                    this.currentOperandTextElement.innerText = str.slice(1);
                } else {
                    this.currentOperandTextElement.innerText = `-${str}`;
                }
                break;
            case '√':
                this.previousOperandTextElement.innerText = `√(sqrt(${str}))`;
                this.currentOperandTextElement.innerText = `${Math.sqrt(Number(str))}`;
                break;
        }

        if (this.currentOperandTextElement.innerText.split('.')[1] && this.currentOperandTextElement.innerText.split('.')[1].length > 5) {
            this.currentOperandTextElement.innerText = Number(this.currentOperandTextElement.innerText).toFixed(5)
        }

        this.currentOperand = this.currentOperandTextElement.innerText;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const sqrtButtons = document.querySelectorAll('[data-sqrt]');
const plusMinusButton = document.querySelector('[data-plus-minus]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (calculator.previousOperand === "" &&
            calculator.currentOperand !== "" &&
            calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

sqrtButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.sqrtDisplay(currentOperandTextElement.innerText, button.innerText);
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});