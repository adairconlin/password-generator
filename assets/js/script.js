// Prompts user for input on their desired length of the generated password.
let length = function() {
    let passwordLength = window.prompt("Please select a length for your password. Length must be greater than 8 and fewer than 128.");
    // Changes their response from a string to an number.
    passwordLength = parseInt(passwordLength);
    console.log(passwordLength);

    // Checks for any null or invalid inputs. Restarts prompt if it is invalid.
    if(!passwordLength) {
        window.alert("Invalid entry, please select a valid length.");
        return length();
    }

    // Checks if their input meets the length requirements. Restarts prompt if it is invalid.
    if(passwordLength <= 8 || passwordLength >= 128) {
        window.alert("Invalid entry, please select a valid length.");
        return length();
    } 
}

// Calls length() and characters() functions to begin prompts for the password.
let criteriaPrompts = function() {
    length();
}

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//
criteriaPrompts();