// ===== PASSWORD GENERATOR ENGINE =====

// Character sets for password generation
const characterSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz', 
    numbers: '0123456789',
    symbols: '!@#$%^&*'
};

// Get DOM elements
const generateButton = document.getElementById('generateButton');
const passwordOutput = document.getElementById('passwordOutput');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');

// ===== CORE PASSWORD GENERATION FUNCTION =====
function generatePassword() {
    // Get selected character types
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    // Build available characters string
    let availableChars = '';
    if (includeUppercase) availableChars += characterSets.uppercase;
    if (includeLowercase) availableChars += characterSets.lowercase;
    if (includeNumbers) availableChars += characterSets.numbers;
    if (includeSymbols) availableChars += characterSets.symbols;
    
    // Check if at least one character type is selected
    if (availableChars.length === 0) {
        passwordOutput.value = 'Please select at least one character type';
        return;
    }
    
    // Get password length
    const length = parseInt(passwordLength.value);
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
    }
    
    // Display the password
    passwordOutput.value = password;
}

// ===== EVENT LISTENERS =====

// Generate button click
generateButton.addEventListener('click', generatePassword);

// Password length slider update
passwordLength.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

// ===== INITIALIZATION =====
// Generate first password on page load
window.addEventListener('load', generatePassword);