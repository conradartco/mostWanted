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
                    searchResults = searchByTraitMulti(people);
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
            findPersonSiblings(person[0], people);
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
    let personInfo = "";
    for (let property in person) {
        if(property === "parents" || property === "currentSpouse") {
            continue;
        }
        personInfo += `${property}: ${person[property]}\n`;
    }
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

function findPersonFamily(person, people) {
    let personSelect = person;
    let personSpouse = findPersonSpouse(personSelect, people);
    let personSiblings = findPersonSiblings(personSelect, people);
    let personParents = findPersonParents(personSelect, people);
    let familyArray = concatFamilyTies(personSpouse, personParents, personSiblings);
    let personFamilyDetails = mapFamily(familyArray);
    return personFamilyDetails;
}

function concatFamilyTies(spouse, parents, siblings) {
    let spouseFamilyArray = spouse.concat(parents, siblings);
    return spouseFamilyArray;
}

function mapFamily(people) {
    let result = people.map(function (person) {
        return `${person.firstName} ${person.lastName}`;
    })
    .join("\n")
    return result;
}

/**
 * This function finds the identified person's spouse, and returns their information
 * @param {Array} person 
 * @param {Array} people 
 * @returns {Array}
 */
function findPersonSpouse(person, people) {
    let personSelect = person;
    let personSpouse = people.filter(function(person){
        if (personSelect.currentSpouse === person.id) {
            return true;
        }
    })
    return personSpouse;
}
// End of findPersonSpouse()

function findPersonSiblings(person, people) {
    let personSelect = person;
    let personSiblings = people.filter(function(person){
        if(personSelect.parents === person.parents && personSelect != person) {
        return true;
        }
    })
    return personSiblings;
}

/**
 * This function finds the identified person's parents, and returns their information
 * @param {Array} person 
 * @param {Array} people 
 * @returns {Array}
 */
function findPersonParents(person, people) {
    let personParentArray = person.parents;
    let identifiedParents = people.filter(function(person){
        for(let i = 0; i < personParentArray.length; i++){
            if (personParentArray[i] === person.id){
                    return true;
            }
        }
    })
    return identifiedParents;
}

/**
 * This function is used to determine who our Most Wanted person is, defined by its traits
 * @param {Array} people        Passes in array of people objects 
 * @returns {Array}             Returns filtered object response
 */
function searchByTrait(people) {
    let result = searchByUserInput(people);
    while (result.length > (1)) {
        result = searchByUserInput(result);
    }
    return result;
}
// End of searchByTrait()

/**
 * // This function is used to determine a trait of objects within our dataset, by user defined input
 * @param {Array} people        Passes in array of people objects 
 * @returns {Array}             Returns the array of objects containing the user defined trait
 */
function searchByUserInput(people) {
    let userInputProp = prompt("Please enter the trait you would like to search by:\nid\nfirstName\nlastName\ngender\ndob\nheight\nweight\neyeColor\noccupation\n");
    let userInputVal = prompt("Please enter the value you'd like to search for.")
    let results = people.filter(function (person){
            if (person[userInputProp] === userInputVal || +userInputVal === person[userInputProp]){
                return true;
            }
        }
    );
    return results;
}
// End of searchByUserInput()