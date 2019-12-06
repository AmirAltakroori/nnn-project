
function searchNewsByCategory (){
    let searchInput , searchText , table , tableBody , tr , i , td , span , category ;

    // get text from search input
    searchInput = document.getElementById('search');
    searchText = searchInput.value;

    // get all news  in the table body 
    table = document.getElementById('table');
    tableBody =document.getElementsByTagName("tbody")[0];
    tr = tableBody.getElementsByTagName('tr');

    // traverse through each new in the table
    for( i = 0 ; i<tr.length ; i++){
        // get category from each news element
        td = tr[i].getElementsByTagName('td')[2];
        span = td.getElementsByTagName('span')[0];
        category = span.childNodes[0].nodeValue;

        //check if the new category contain search text and filter the result
        if(category.indexOf(searchText)>-1)
            tr[i].style.display = "";
        else
            tr[i].style.display = "none";

    }
    
}