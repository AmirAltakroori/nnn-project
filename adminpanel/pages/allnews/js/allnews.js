let news = [{
    title: "test is test ",
    content: "<h1>This is my first news</h1>",
    categoryId: 1,
    seoTitle: "First news",
    seoTags: "{ 'tags':{['test','sport']} }",
    seoDescription: "This is my first news",
    isActive: 1,
    isMainNews: 0,
    isUrgentNews: 1,
    createDate: new Date(),
    writerId: 1,
    _attachments: "",
    id: 1,
},
{
    title: "test is test ",
    content: "<h1>This is my first news</h1>",
    categoryId: 1,
    seoTitle: "First news",
    seoTags: "{ 'tags':{['test','sport']} }",
    seoDescription: "This is my first news",
    isActive: 1,
    isMainNews: 0,
    isUrgentNews: 1,
    createDate: new Date(),
    writerId: 1,
    _attachments: "",
    id: 2,
},
{
    title: "test is test ",
    content: "<h1>This is my first news</h1>",
    categoryId: 1,
    seoTitle: "First news",
    seoTags: "{ 'tags':{['test','sport']} }",
    seoDescription: "This is my first news",
    isActive: 1,
    isMainNews: 0,
    isUrgentNews: 1,
    createDate: new Date(),
    writerId: 1,
    _attachments: "",
    id: 3,
}];
let newContain;
let newId;
function show(model, id) {
    let element = document.getElementById('delete')
    element.className += " active";
    newContain = model;
    newId = id;
}

function hide() {
    let element = document.getElementById('delete')
    element.classList.remove("active");

}

function deleteRowElement() {

    let row = news.findIndex((row) => row.id == newId);
    news.splice(row, 1);
    var i = newContain.parentNode.parentNode;
    i.parentElement.removeChild(i);


}
function deleteNews(callback, key, rev, row) {

    let fullUrl = URL + "news/" + key + "?rev=" + rev;
    let http = new XMLHttpRequest();
    http.open("DELETE", fullUrl);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            callback(JSON.parse(http.response));
            row.parentElement.removeChild(row);
        }
    }
}

function searchNewsByCategory() {
    let searchInput, searchText, table, tableBody, tr, i, td, span, category;

    // get text from search input
    searchInput = document.getElementById('search');
    searchText = searchInput.value;

    // get all news  in the table body 
    table = document.getElementById('table');
    tableBody = document.getElementsByTagName("tbody")[0];
    tr = tableBody.getElementsByTagName('tr');

    // traverse through each new in the table
    for (i = 0; i < tr.length; i++) {
        // get category from each news element
        td = tr[i].getElementsByTagName('td')[2];
        span = td.getElementsByTagName('span')[0];
        category = span.childNodes[0].nodeValue;

        //check if the new category contain search text and filter the result
        if (category.indexOf(searchText) > -1)
            tr[i].style.display = "";
        else
            tr[i].style.display = "none";

    }
}