/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            let searchTraits = promptFor("Would you like to search using a singular trait or multiple traits?\nPlease enter: single or multiple\n", chars).toLowerCase();
            switch (searchTraits) {
                case "single":
                   searchResults = searchByTrait(people);
                   break;
                case "multiple":
                    searchResults = searchByTraits(people);
                    break;
                default:
                    app(people);
                    break;
            }
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        case "test":
            // Test functions here
            console.log("This is a test")
            break;
        default:
            // Prompt user again. Another instance of recursion
            mainMenu(person, people);
            break;
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `ID: ${person.id}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * 
 * @param {Object} person       The selected person that we'll be finding the family of
 * @param {Array} people        The complete dataset (array of person objects)
 * @returns {String}            A string listing off the selected persons' family members
 */
function findPersonFamily(person, people) {
    let identifiedPerson = person;
    let personSpouse = getPersonSpouse(identifiedPerson, people);
    // let personParents = getPersonParents(identifiedPerson, people);

    let personInfo = `First Name: ${identifiedPerson.firstName}\n`;
    personInfo += `Last Name: ${identifiedPerson.lastName}\n`;
    personInfo += `Spouse: ${personSpouse[0].firstName}\n`;
    // personInfo += `Parents: ${personParents[0].firstName}\n`;

    return personInfo;
}

function getPersonSpouse(person, people) {
    let identifiedPerson = person;
    let personSpouse = people.filter(function (person) {
        if (identifiedPerson.currentSpouse === person.id) {
            return true;
        }
    });
    let identifiedSpouse = personSpouse;
    return identifiedSpouse;
}

function getPersonParents(person, people) {
    let identifiedPerson = person;
    let personParents = people.filter(function (person) {
        if (identifiedPerson.parents === person.id) {
            return true;
        }
    });
    return personParents;
}

function searchByTraits(people) {
    let userTraitsQuery = promptFor(`You have selected the Search-By-Traits Menu\nEnter your search criteria in the following format:\nDataset: value\nDataset options are as follows:\nID\nGender\nDate of Birth\nHeight\nWeight\nEye Color\nOccupation\n`, chars)
    let multiTraitSearch = people.every(userTraitsQuery => {
        return people.includes(userTraitsQuery);
    })
    return multiTraitSearch;
}

function searchByTrait(people) {
    let displayTraitPrompt = promptFor(
        `You have selected the Search-By-Trait Menu\nEnter your search criteria based on the following options:\nID\nGender\nDate of Birth\nHeight\nWeight\nEye color\nOccupation\n`, chars
    ).toLowerCase();
    // Routes our application based on the user's input
    switch (displayTraitPrompt) {
        case "id":
            let foundId = searchByUserInput(people);
            return foundId;
        case "gender":
            let foundGender = searchByUserInput(people);
            return foundGender;
        case "dob":
            let foundDob = searchByUserInput(people);
            return foundDob;
        case "height":
            let foundHeight = searchByUserInput(people);
            return foundHeight;
        case "weight":
            let foundWeight = searchByUserInput(people);
            return foundWeight;
        case "eyeColor":
            let foundEyeColor = searchByUserInput(people);
            return foundEyeColor;
        case "occupation":
            let foundOccupation = searchByUserInput(people);
            return foundOccupation;
        default:
            // Prompt user again. Another instance of recursion
            searchByTrait(people);
            break;
    }
}
/**
 * // This function is used to determine a trait of our Most Wanted
 * @param {Array} people        Passes in array dataset of people objects 
 * @returns {String}            Returns the now defined user requested trait
 */
function searchByUserInput(people) {
    let userInputProp = prompt("Please enter the trait you would like to search by:\nid\nfirstName\nlastName\ngender\ndob\nheight\nweight\neyeColor\noccupation\n");
    let userInputVal = prompt("Please enter the value you'd like to search for.")
    let results = people.filter(
        function (person){
            if (person[userInputProp] === userInputVal || +userInputVal === person[userInputProp]){
                return true;
            }
        }
    );
    return results;
}
// End of searchByUserInput()

function searchById(people) {
    let idSelect = promptFor("What is the person's ID number?", chars);
    var idToInt = parseInt(idSelect)
    let foundPerson = people.filter(function (person) {
        if (person.id === idToInt) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchById()

function searchByGender(people) {
    let genderSelect = promptFor("What is the person's gender?", chars);
    let foundGenderGrp = people.filter(function (person) {
        if (person.gender === genderSelect) {
            return true;
        }
    });
    if (foundGenderGrp.length > (1)) {
        alert(`We have found multiple database entries for ${genderSelect}s.\nPlease enter more details to your search criteria.`);
        let getMoreDetails = searchByTraits(foundGenderGrp);
        return getMoreDetails
    }
    return foundGenderGrp;
}
// End of searchByGender()

function searchByDob(people) {
    let dobSelect = promptFor("What is the person's date of birth?\nPlease use standard format of: MM/DD/YYYY", chars);
    let foundPerson = people.filter(function (person) {
        if (person.dob === dobSelect) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByDob()

function searchByHeight(people) {
    let heightSelect = promptFor("What is the person's height?", chars);
    var heightToInt = parseInt(heightSelect)
    let foundHeightGrp = people.filter(function (person) {
        if (person.height === heightToInt) {
            return true;
        }
    });
    if (foundHeightGrp.length > (1)) {
        alert(`We have found multiple database entries for heights of ${heightToInt}.\nPlease enter more details to your search criteria.`);
        let getMoreDetails = searchByTraits(foundHeightGrp);
        return getMoreDetails
    }
    return foundHeightGrp;
}
// End of searchByHeight()

function searchByWeight(people) {
    let weightSelect = promptFor("What is the person's weight?", chars);
    var weightToInt = parseInt(weightSelect)
    let foundWeightGrp = people.filter(function (person) {
        if (person.weight === weightToInt) {
            return true;
        }
    });
    if (foundWeightGrp.length > (1)) {
        alert(`We have found multiple database entries for weights of ${weightToInt}.\nPlease enter more details to your search criteria.`);
        let getMoreDetails = searchByTraits(foundWeightGrp);
        return getMoreDetails
    }
    return foundWeightGrp;
}
// End of searchByWeight()

function searchByEyeColor(people) {
    let eyeColorSelect = promptFor("What is the person's eye color?", chars);
    let foundEyeColorGrp = people.filter(function (person) {
        if (person.eyeColor === eyeColorSelect) {
            return true;
        }
    });
    if (foundEyeColorGrp.length > (1)) {
        alert(`We have found multiple database entries for people with ${eyeColorSelect} eyes.\nPlease enter more details to your search criteria.`);
        let getMoreDetails = searchByTraits(foundEyeColorGrp);
        return getMoreDetails
    }
    return foundEyeColorGrp;
}
// End of searchByEyeColor()

function searchByOccupation(people) {
    let occupationSelect = promptFor("What is the person's occupation?", chars);
    let foundOccupationGrp = people.filter(function (person) {
        if (person.occupation === occupationSelect) {
            return true;
        }
    });
    if (foundOccupationGrp.length > (1)) {
        alert(`We have found multiple database entries for occupations of "${occupationSelect}".\nPlease enter more details to your search criteria.`);
        let getMoreDetails = searchByTraits(foundOccupationGrp);
        return getMoreDetails
    }
    return foundOccupationGrp;
}
// End of searchByOccupation()