// PASSWORD GENERATOR


function generatePassword(length,
                        includeLowercase,
                        includeUppercase,
                        includeNumbers,
                        includeSymbols)
{
    
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbolChars = "!@#$%^&*()=-";
    const numberChars = "1234567890";

    let allowedChars = "";
    let password="";

    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    // console.log(allowedChars);

    if(length<=7){
        return 'Password length must be at least 8';
    }
    if(allowedChars.length ===0){
        return `Please select a set of chars`;
    }
    for(let i =0;i<length;i++){
        const randomIndex = Math.floor(Math.random()* allowedChars.length);
        password += allowedChars[randomIndex];    
    }
    return password;
}


const passwordLengthInput = document.getElementById('passwordLength');
const upperCharsCheckbox = document.getElementById('upperChars');
const lowerCharsCheckbox = document.getElementById('lowerChars');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateButton = document.getElementById('myButton');
const generatedPasswordText = document.getElementById('generatedPass');

// Add event listener to the button for generating the password
generateButton.addEventListener('click', function() {
    // Get the values of the input fields and checkboxes
    const passwordLength = parseInt(passwordLengthInput.value);
    const includeLowercase = lowerCharsCheckbox.checked;
    const includeUppercase = upperCharsCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    // Call the generatePassword function with the retrieved values
    const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);

    // Display the generated password
    generatedPasswordText.textContent = `${password}`;
});
