// TODO
// This file contains all functions that will be used to interact with the website html element are written here
// Please write here a generic functions that can be used everywhere
// All functions must return a value, Please don't make void functions , if the function
// is not returning anything return a boolean value (true) if the function done or false if there is an error 
// Functions here useing the functions in backend.js file to call the database
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh


function searchElement(columnIndex) {
    let searchInput, searchText, table, tableBody, tr, i, td, span, category;

    // get text from search input
    searchInput = document.getElementById('search');
    searchText = searchInput.value;

    // get all elements in the table body 
    table = document.getElementById('table');
    tableBody = document.getElementsByTagName("tbody")[0];
    tr = tableBody.getElementsByTagName('tr');

    // traverse through each element in the table
    for (i = 0; i < tr.length; i++) {
        // get element searched for from each element in table
        td = tr[i].getElementsByTagName('td')[columnIndex];
        span = td.getElementsByTagName('span')[0];
        serachedElement = span.childNodes[0].nodeValue;

        //check if the element contain search text and filter the result
        if (searchedElement.indexOf(searchText) > -1)
            tr[i].style.display = "";
        else
            tr[i].style.display = "none";

    }
}