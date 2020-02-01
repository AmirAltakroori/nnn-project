
export class myNewsControler {
    constructor() {

        this.dp = null;
        this.allNewsPage = [];
        this.categories = [];

        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();

            this.getAllCat().then(cats => {
                this.categories =  this.cleanData(cats);
                console.log(this.categories);

                this.getAllNews().then(news => {
                    this.allNewsPage = this.cleanData(news);
                    this.allNewsPage[0].isActive = 0;
                    console.log(this.allNewsPage);
                    mvc.apply();
                });

            });

        });
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
    getAllNews() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/approved", true, "").then(news => {

                resolve(news);
            })
        });
    }
    cleanData(data) {
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            rows.push(data[i].value);
        }
        return rows;
    }

    getAllCat() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {

                resolve(cats);
            })
        });
    }
    printMe()
    {
        console.log(this.allNewsPage[0]);
    }
}