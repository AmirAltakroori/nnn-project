
export class myNewsControler {
    constructor(){

        this.dp = null;
        this.allNewsPage = null;
        this.categories = null;

        dynamicImport("./js/backend.js").then(db => {
            this.db = db;
            console.log(getStoredToken('user'));
            this.db.confirm();
            this.getAllNews().then(news=>{
                this.allNewsPage = news;
                mvc.apply();
            });
            this.getAllCat().then(cats=>{
                this.categories = cats;
                mvc.apply();
            });

        });
       // this.module =  import('./allnews');
    //    this.news = import('./allnews.js');
    //    this.allNewsPage = this.news.then(data => data.allnews());// this.news.getAllNews()
    // 
   
    // console.log(this.allNewsPage);
    }
 allnews() {

    let userdata = getData("userData");
    if (userdata != null) {
        allNewsPage[userdata.ind] = userdata;
        sessionStorage.removeItem("userData");
    }
}
 deleteNews(callback, key, rev, row) {

    let fullUrl = URL + "news/" + key + "?rev=" + rev;
    let http = new XMLHttpRequest();
    http.open("DELETE", fullUrl);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            callback(getData(http.response));
            row.parentElement.removeChild(row);
        }
    }
}

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
//read news functions 

 findcat(id) {
    for (let j = 0; j < categories.length; j++) {
        if (categories[j].id == id)
            return categories[j].name;
    }
}

 displaynews(news) {
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
        main_div.className = "allnews-inline-block";
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
        urgent_div.className = "allnews-inline-block";
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

        let show_selection = document.createElement("td");
        let select = document.createElement("select");
        select.className = "selection";

        let option1 = document.createElement("option");
        option1.value = 1;
        option1.textContent = "إظهار في الموقع";
        let option2 = document.createElement("option");
        option2.value = 0;
        option2.textContent = "إخفاء من الموقع";

        select.appendChild(option1);
        select.appendChild(option2);
        select.selectedIndex = !news[i].isActive;
        show_selection.appendChild(select);

        let operations = document.createElement("td");
        let delete_icon = document.createElement("i");
        delete_icon.className = "fas fa-trash-alt delete_user";
        delete_icon.setAttribute('onclick', "show(this,'delete'," + news[i].id + ")");

        let edit_icon = document.createElement("i");
        edit_icon.className = "far fa-edit icon color-blue";
        edit_icon.onclick =  function() {updateNews(news[i].id,1)};
        operations.appendChild(delete_icon);
        operations.appendChild(edit_icon);

        row.appendChild(number);
        row.appendChild(info);
        row.appendChild(categoery);
        row.appendChild(statu);
        row.appendChild(show_selection);
        row.appendChild(operations);

        table.appendChild(row);
    }
}
 getAllNews(){
    return new Promise((resolve, reject) => {
        this.db.dbGet("/news/_design/views/_view/approved", true, "").then(news => {
           
            resolve(news);
        })
    });
}
getAllCat(){
    return new Promise((resolve, reject) => {
        this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {
           
            resolve(cats);
        })
    });
}

// dynamicImport("./js/backend.js").then(db => db.dbGet("/news/_design/views/_view/approved", true, "").then(appNews => {
//     this.categories = appNews;
//     mvc.apply();
//     console.log(this.categories);
// }));
}