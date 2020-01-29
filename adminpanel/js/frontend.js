// TODO
// This file contains all functions that will be used to interact with the website html element are written here
// Please write here a generic functions that can be used everywhere
// All functions must return a value, Please don't make void functions , if the function
// is not returning anything return a boolean value (true) if the function done or false if there is an error 
// Functions here useing the functions in backend.js file to call the database
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh

// let newContain;
let newId;
//delete a row in a table
function deleteRowElement(Page) {

    let row = Page.findIndex((row) => row.id == newId);
    Page.splice(row, 1);
    dbDelete('/users', 'admin1', "2-55da6d414713a91e5b1e5d3fca091b75").then(data => {
        if (data.error)
            showIfDeleteOrNot('false');
        else
            showIfDeleteOrNot('true');
    })
    let rowDOM = newContain.parentNode.parentNode;
    rowDOM.parentElement.removeChild(rowDOM);


}
function showIfDeleteOrNot(e) {
    let element = document.getElementById('ppp');
    if (e=='true') {
        element.innerHTML = 'تم الحذف';
        element.style.backgroundColor = '#27ae60';
        element.style.boxShadow = "-3px 2px 6px 4px " + '#27ae60';
    }
    else {
        element.innerHTML = 'العنصر غير موجود';
        element.style.backgroundColor = 'red';
        element.style.boxShadow = "-3px 2px 6px 4px " + 'red';
    }
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
        return true;
    }, 2000);


}

//show and hide functions for delete modal
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
/*
    This is a function for general searching used in multiple pages 
    It used in category page tot search based on it's name, used in
    all users page to search based on user name and used in all news
    page to search based on news category name 
*/
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
        searchedElement = span.childNodes[0].nodeValue;

        //check if the element contain search text and filter the result
        if (searchedElement.indexOf(searchText) > -1)
            tr[i].style.display = "";
        else
            tr[i].style.display = "none";

    }
};