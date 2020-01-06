// TODO
// This file contains all functions that will be used to interact with the website html element are written here
// Please write here a generic functions that can be used everywhere
// All functions must return a value, Please don't make void functions , if the function
// is not returning anything return a boolean value (true) if the function done or false if there is an error 
// Functions here useing the functions in backend.js file to call the database
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh


//delete a row in a table
function deleteRowElement(Page) {

    let row = Page.findIndex((row) => row.id == newId);
    Page.splice(row, 1);
    let rowDOM = newContain.parentNode.parentNode;
    rowDOM.parentElement.removeChild(rowDOM);


}


let newContain;
let newId;
function show(row, modelId, id) {
    let element = document.getElementById(modelId)
    element.className += " modal-active";
    newContain = row;
    newId = id;
}

function hide(modelId) {
    let element = document.getElementById(modelId)
    element.classList.remove("modal-active");

}