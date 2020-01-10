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
        isActive: 0,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 1,
    },
    {
        title: "الالعاب الاولمبية قريبا",
        content: "<h1>This is my first news</h1>",
        categoryId: 2,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 1,
        isUrgentNews: 2,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 2,
    },

    {
        title: "سلسلة العاب LEft 4 Dead تعود من جديد",
        content: "<h1>This is my first news</h1>",
        categoryId: 1,
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
    }
];

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


        let statu = document.createElement("td");

        let main_div = document.createElement("div");
        main_div.className = "newsapprove-inline-block";
        let main_check = document.createElement("input");
        main_check.type = "checkbox";
        main_check.id = "main" + i;

        if (news[i].isMainNews)
            main_check.checked = true;

        main_check.tabIndex = "9";
        let main_label = document.createElement("label");
        main_label.htmlFor = "main" + i;
        main_label.textContent = "خبر رئيسي";

        main_div.appendChild(main_check);
        main_div.appendChild(main_label);

        let urgent_div = document.createElement("div");
        urgent_div.className = "newsapprove-inline-block";
        let urgent_check = document.createElement("input");
        urgent_check.type = "checkbox";
        urgent_check.id = "urgent" + i;

        if (news[i].isUrgentNews)
            urgent_check.checked = true;

        urgent_check.tabIndex = "9";
        let urgent_label = document.createElement("label");
        urgent_label.htmlFor = "urgent" + i;
        urgent_label.textContent = "خبر عاجل";

        urgent_div.appendChild(urgent_check);
        urgent_div.appendChild(urgent_label);

        statu.appendChild(main_div);
        statu.appendChild(urgent_div);

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
        row.appendChild(statu);

        row.appendChild(operations);

        table.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    displaynews(newsPage);
});