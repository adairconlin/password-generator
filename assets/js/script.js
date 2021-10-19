// Prompts user for input on the desired character types. They must include at least one.
let confirmPrompts = function(characterType, passwordLength) {
    let promptConfirm = window.confirm("You selected a length of: " + passwordLength + ", and you selected the character type(s) of: " + characterType + ". Is this correct?");
    if(promptConfirm) {
        window.alert("Thank you. You password will now be generated.");
    } else {
        window.alert("Sorry, please re-enter.")
        generatePassword();
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

    // Checks for valid inputs. The variable 'x' helps keep track of whether the input is valid or not.
    let x = 0;
    for(let i = 0; i < characterArr.length; i++) {
        if(characterArr[i] === "uppercase" || characterArr[i] === "lowercase" || characterArr[i] === "numeric" || characterArr[i] === "special") {
            x = x + 0;
        } else {
            window.alert('"' + characterArr[i] + '"' + " is invalid. Please try again.");
            x = x + 1;
        }
    }

    // Reads the value of 'x'; if x is greater than 0, this means that there was an invalid entry.
    if(x == 0) {
        confirmPrompts(characterType, passwordLength);
    } else if(x > 0) {
        characterPrompt(passwordLength);
    }
}

// Prompt user input for their desired character types for the generated password.
let characterPrompt = function(passwordLength) {
    let characterType = window.prompt("Please specify which character types you wish to include. You must select at least one: Uppercase, Lowercase, Numeric, and/or Special.");
    // Change their input to a lowercase string - this helps with user input validation.
    characterType = characterType.toLowerCase();
    // Check for any null inputs.
    if(!characterType) {
        window.alert("You must select at least one character type.");
        characterPrompt(passwordLength);
    } else {
        characterCheck(characterType, passwordLength);
        return characterType;
    }
}

// Prompt user for input on their desired length of the generated password.
let lengthPrompt = function() {
    passwordLength = window.prompt("Please select a length for your password. Length must be greater than 8 and fewer than 128.");
    // Changes their response from a string to an number.
    passwordLength = parseInt(passwordLength);

    // Checks for any null or invalid inputs. Restarts prompt if it is invalid.
    if(!passwordLength) {
        window.alert("Invalid entry, please select a valid length.");
        return lengthPrompt();
    }

    // Checks if their input meets the length requirements. Restarts prompt if it is invalid.
    if(passwordLength < 8 || passwordLength > 128) {
        window.alert("Invalid entry, please select a valid length.");
        return lengthPrompt();
    } 
    // User input value that is returned to generatePassword() function.
    return passwordLength;
}

// Calls functions to start prompts and generate passwords.
let generatePassword = function() {
    let passwordLength = lengthPrompt();
    characterPrompt(passwordLength);

    // List of all characters that can be included in the generated password.
    let characterObj = {
        "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "lowercase": "abcdefghijklmnopqrstuvwxyz",
        "numeric": "0123456789",
        "special": '!"#$%&()*+,-./:;<=>?@[]^_`{}|~'
    };

    // Variable that is updated through the loop; this will eventually be the generated password.
    let randomize = "";
    // Loop through the characterObj depending on the random array and random character that is chosen.
    for(let i = 0; i < passwordLength; i++) {
        // Choose a random array based on user input.
        let x = Math.floor(Math.random() * characterArr.length );
        let value = characterArr[x];
        let y = "";
    
        // Concatenates a specific character from the array that was specified above.
        switch(value) {
            case "uppercase":
                y = Math.floor(Math.random() * characterObj.uppercase.length);
                randomize = randomize.concat(characterObj.uppercase[y]);
                break;
            case "lowercase":
                y = Math.floor(Math.random() * characterObj.lowercase.length);
                randomize = randomize.concat(characterObj.lowercase[y]);
                break;
            case "numeric":
                y = Math.floor(Math.random() * characterObj.numeric.length);
                randomize = randomize.concat(characterObj.numeric[y]);
                break;
            case "special":
                y = Math.floor(Math.random() * characterObj.special.length);
                randomize = randomize.concat(characterObj.special[y]);
                break;
        }
    }
    return randomize;
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