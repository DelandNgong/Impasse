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
const copyButton = document.getElementById('copyButton');
const copyFeedback = document.getElementById('copyFeedback');

// ===== CORE PASSWORD GENERATION FUNCTION =====
function generatePassword() {
    // Show loading state
    generateButton.classList.add('loading');
    generateButton.disabled = true;
    
    // Small delay to show loading state
    setTimeout(() => {
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
            passwordOutput.value = 'Select character types above';
            generateButton.classList.remove('loading');
            generateButton.disabled = false;
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
        
        // Remove loading state
        generateButton.classList.remove('loading');
        generateButton.disabled = false;
        
    }, 300);
}

// ===== ENHANCED USER CONTROLS =====

// Validate character selections
function validateCharacterSelections() {
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    const isValid = includeUppercase || includeLowercase || includeNumbers || includeSymbols;
    
    // Update generate button state
    generateButton.disabled = !isValid;
    
    if (!isValid) {
        generateButton.title = 'Please select at least one character type';
        passwordOutput.value = 'Select character types above';
        return false;
    } else {
        generateButton.title = 'Generate secure password';
        return true;
    }
}

// Auto-generate when settings change
function autoGenerateOnChange() {
    if (validateCharacterSelections()) {
        generatePassword();
    }
}

// ===== CLIPBOARD FUNCTIONALITY =====

// Copy to clipboard function
function copyToClipboard() {
    const password = passwordOutput.value;
    
    // Check if there's a valid password to copy
    if (!password || password.includes('Select character types') || password.includes('Please select')) {
        showCopyFeedback('❌ No password to copy', 'error');
        return;
    }
    
    // Visual feedback
    copyButton.classList.add('copied');
    
    // Use modern clipboard API
    navigator.clipboard.writeText(password).then(() => {
        showCopyFeedback('✓ Copied!', 'success');
        
        // Reset copy button after 2 seconds
        setTimeout(() => {
            copyButton.classList.remove('copied');
        }, 2000);
        
    }).catch(() => {
        // Fallback for older browsers
        fallbackCopyToClipboard(password);
    });
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback('✓ Copied to clipboard!', 'success');
    } catch (err) {
        showCopyFeedback('❌ Copy failed', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show copy feedback message
function showCopyFeedback(message, type) {
    copyFeedback.textContent = message;
    copyFeedback.className = 'copy-feedback show';
    copyFeedback.style.color = type === 'success' ? 'var(--success-color)' : 'var(--error-color)';
    
    // Hide feedback after 2 seconds
    setTimeout(() => {
        copyFeedback.className = 'copy-feedback';
    }, 2000);
}

// ===== EVENT LISTENERS =====

// Generate button click
generateButton.addEventListener('click', function() {
    if (validateCharacterSelections()) {
        generatePassword();
    }
});

// Copy button click
copyButton.addEventListener('click', copyToClipboard);

// Character set checkboxes auto-generation
document.getElementById('uppercase').addEventListener('change', autoGenerateOnChange);
document.getElementById('lowercase').addEventListener('change', autoGenerateOnChange);
document.getElementById('numbers').addEventListener('change', autoGenerateOnChange);
document.getElementById('symbols').addEventListener('change', autoGenerateOnChange);

// Slider with auto-generation
passwordLength.addEventListener('input', function() {
    lengthValue.textContent = this.value;
    if (validateCharacterSelections()) {
        generatePassword();
    }
});

// ===== INITIALIZATION =====

// Initialize on page load
window.addEventListener('load', function() {
    validateCharacterSelections();
    generatePassword();
});