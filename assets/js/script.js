// Prompts user for input on the desired character types. They must include at least one.
let confirmPrompts = function(characterType, passwordLength) {
    let promptConfirm = window.confirm("You selected a length of: " + passwordLength + ", and you selected the character type(s) of: " + characterType + ". Is this correct?");
    if(promptConfirm) {
        window.alert("Thank you. Please click on 'Generate Password' for your password to be generated.");
    } else {
        window.alert("Sorry, please re-enter.")
        lengthPrompt();
    }
}

// Goes through the characterArr[] to make sure user inputs are all valid character type options.
let characterCheck = function(characterType, passwordLength) {
    // Sorts desired character types into an array based on user input format.
    if(characterType.search(',') >= 0) {
        characterArr = characterType.split(', ');
    } else {
        characterArr = characterType.split(' ');
    };
    console.log(characterArr);

    // Checks for valid inputs. The variable 'x' helps keep track of whether the input is valid or not.
    let x = 0;
    for(let i = 0; i < characterArr.length; i++) {
        if(characterArr[i] === "uppercase" || characterArr[i] === "lowercase" || characterArr[i] === "numeric" || characterArr[i] === "special") {
            x = x + 0;
        } else {
            window.alert(characterArr[i] + " is invalid. Please try again.");
            x = x + 1;
        }
    }

    // Reads the value of 'x'; if x is greater than 0, this means that there was an invalid entry.
    if(x == 0) {
        confirmPrompts(characterType, passwordLength);
    } else if(x > 0) {
        characterPrompt();
    }
}

// Prompts user for input on their desired character types for the generated password.
let characterPrompt = function(passwordLength) {
    let characterType = window.prompt("Please specify which character types you wish to include. You must select at least one: Uppercase, Lowercase, Numeric, and/or Special.");
    characterType = characterType.toLowerCase();
    // Checks for any null inputs.
    if(!characterType) {
        window.alert("You must select at least one character type.");
        characterPrompt();
    } else {
        characterCheck(characterType, passwordLength);
        return characterType;
    }
}

// Prompts user for input on their desired length of the generated password.
let lengthPrompt = function() {
    passwordLength = window.prompt("Please select a length for your password. Length must be greater than 8 and fewer than 128.");
    // Changes their response from a string to an number.
    passwordLength = parseInt(passwordLength);

    // Checks for any null or invalid inputs. Restarts prompt if it is invalid.
    if(!passwordLength) {
        window.alert("Invalid entry, please select a valid length.");
        lengthPrompt();
    }

    // Checks if their input meets the length requirements. Restarts prompt if it is invalid.
    if(passwordLength <= 8 || passwordLength >= 128) {
        window.alert("Invalid entry, please select a valid length.");
        lengthPrompt();
    } 
    return passwordLength;
}

// Calls length() and characters() functions to begin prompts for the password.
let generatePassword = function() {
    let passwordLength = lengthPrompt();
    let characterType = characterPrompt(passwordLength);
    console.log(passwordLength, characterType);
    let password = passwordLength + " and " + characterType;

    return password;
}

// Get references to the #generate element.
let generateBtn = document.querySelector("#generate");

// Write password to the #password input.
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button.
generateBtn.addEventListener("click", writePassword);