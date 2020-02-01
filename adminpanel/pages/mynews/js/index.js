export class myNewsControler {
    constructor() {


        this.myNewsPage = null;
        this.categories = null;
        this.dp = null;
        this.user = null;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.user = this.db.confirm();
            this.getMyNews(this.user.data.username).then(news => {
                this.myNewsPage = news;
                mvc.apply();
            });
            this.getAllCat().then(cats => {
                this.categories = cats;
                mvc.apply();
            });

        });
        
    }

   
    
mynews() {


    let userdata = JSON.parse(sessionStorage.getItem("userData"));
    if (userdata != null) {
        myNewsPage[userdata.ind] = userdata;
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
            callback(JSON.parse(http.response));
            row.parentElement.removeChild(row);
        }
    }
}

/* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
//read news functions 


findCat(id) {
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
        edit_icon.setAttribute("onclick", `updateNews(${news[i].id},0) `);
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

getMyNews(username) {
    return new Promise((resolve, reject) => {
        this.db.dbGet("/news/_design/views/_view/specificUser", true, username).then(news => {
            resolve(news);
        })
    });
}
getAllCat() {
    return new Promise((resolve, reject) => {
        this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {
            resolve(cats);
        })
    });
}

}