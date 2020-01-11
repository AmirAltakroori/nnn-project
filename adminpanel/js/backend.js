// TODO
// This file contains all functions that will be used to interact with the database are written here
// Please write here a generic functions that can be used everywhere
// Functions here written to perform the CRUD operation 
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh
function getData(storeName) {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function saveData(storeName, data) {
    sessionStorage.setItem(storeName, JSON.stringify(data));
}