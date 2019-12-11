let categories = [{
    id: 1,
    name: "الألعاب",
    isActive: 1,
},
{
    id: 3,
    name: "الرئيسية",
    isActive: 1,
},
{
    id: 2,
    name: "الرياضة",
    isActive: 0, //غير مفعل
},
{
    id: 4,
    name: "الفن",
    isActive: 0,
}
]

let newsPage = [{
    title: "النصيرات أكثر المناطق هطولاً",
    content: "<h1>This is my first news</h1>",
    categoryId: 3,
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
    title: "الاحلال يعتقل مقدسيا مسنا",
    content: "<h1>This is my first news</h1>",
    categoryId: 3,
    seoTitle: "First news",
    seoTags: "{ 'tags':{['test','sport']} }",
    seoDescription: "This is my first news",
    isActive: 0,
    isMainNews: 1,
    isUrgentNews: 1,
    createDate: new Date(),
    writerId: 1,
    _attachments: "",
    id: 3,
},

];




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

function deleteRowElement() {

    let row = newsPage.findIndex((row) => row.id == newId);
    newsPage.splice(row, 1);
    let rowDOM = newContain.parentNode.parentNode;
    rowDOM.parentElement.removeChild(rowDOM);


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



function searchByNews() {
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

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
//read news functions 


function findcat(id) {
    for (let j = 0; j < categories.length; j++) {
        if (categories[j].id == id)
            return categories[j].name;
    }
}

function displaynews(news) {
    newsPage = news;
    let table = document.getElementById("tablebody");
    for (let i = 0; i < news.length; i++) {
        let row = document.createElement("tr");
        row.className = "user_info";
        let number = document.createElement("td");
        number.className = "user_no";
        number.textContent = i + 1;

        let info = document.createElement("td");
        info.className = "user_full";
        let info_text = document.createElement("span");
        info_text.className = "user_name allnews-title-limit";
        info_text.textContent = news[i].title;
        info.appendChild(info_text);

        let categoery = document.createElement("td");
        categoery.className = "user_full";
        let cat_text = document.createElement("span");
        cat_text.className = "user_name";
        cat_text.textContent = findcat(news[i].categoryId);
        categoery.appendChild(cat_text);

        let stat = document.createElement("td");
        stat.className = "user_full";
        let stat_text = document.createElement("span");
        stat_text.className = "user_name";
        if(news[i].isActive)
            stat_text.textContent = "فعال";
        else
            stat_text.textContent = "غير فعال";
        stat.appendChild(stat_text);

        let operations = document.createElement("td");
        let delete_icon = document.createElement("i");
        delete_icon.className = "fas fa-trash-alt delete_user";
        delete_icon.setAttribute('onclick', "show(this,'delete'," + news[i].id + ")");

        let edit_icon = document.createElement("i");
        edit_icon.className = "far fa-edit icon color-blue";

        operations.appendChild(delete_icon);
        operations.appendChild(edit_icon);

        row.appendChild(number);
        row.appendChild(info);
        row.appendChild(categoery);
        row.appendChild(stat);
        row.appendChild(operations);

        table.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    displaynews(newsPage);
});