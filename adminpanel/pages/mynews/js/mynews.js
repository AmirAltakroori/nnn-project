let newsPage = [{
        id: 1,
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
    },
    {
        id: 2,
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
    },
    {
        id: 3,
        title: "test is test ",
        content: "<h1>This is my first news</h1><br><ul><li>ههههه</li></ul>",
        categoryId: 1,
        seoTitle: "First news",
        seoTags: "شسيشس شسيشس شسي شسي",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: "2019-05-12",
        writerId: 1,
        _attachments: "",
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
        createDate: "2019-05-12",
        writerId: 1,
        _attachments: "",
        id: 4,
    },

];
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
document.addEventListener("DOMContentLoaded", (event) => {
    let userdata = JSON.parse(sessionStorage.getItem("userData"));
    if (userdata != null) {
        newsPage[userdata.ind] = userdata;
        sessionStorage.removeItem("userData");
    }
});


function updateNews(id) {
    let aim = null;
    for (ind in newsPage)
        if (newsPage[ind].id == id) {
            aim = newsPage[ind];
            aim["ind"] = ind;
            break;
        }
    sessionStorage.setItem("userData", JSON.stringify(aim));
    window.location.href = "../addnewspage/addnewpage.html";
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

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
//read news functions 


function findCat(id) {
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
        cat_text.textContent = findCat(news[i].categoryId);
        categoery.appendChild(cat_text);

        let stat = document.createElement("td");
        stat.className = "user_full";
        let stat_text = document.createElement("span");
        stat_text.className = "user_name";
        if (news[i].isActive)
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
        edit_icon.setAttribute("onclick", `updateNews(${news[i].id}) `);
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