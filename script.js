const display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  if (num === '.' && currentInput.includes('.')) return;
  if (currentInput === '0' && num !== '.') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (operator !== null) calculate();
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (operator) {
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/': result = curr === 0 ? 'Error' : prev / curr; break;
    case '%': result = prev % curr; break;
    default: return;
  }
  currentInput = result.toString();
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    updateDisplay();
  }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const value = btn.dataset.value;
  if (!isNaN(value) || value === '.') {
    appendNumber(value);
  } else if ('+-*/%'.includes(value)) {
    chooseOperator(value);
  } else if (value === '=') {
    calculate();
  } else if (value === 'C') {
    clearAll();
  } else if (value === '±') {
    toggleSign();
  }
});
