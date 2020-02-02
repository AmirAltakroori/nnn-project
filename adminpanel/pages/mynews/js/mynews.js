export class myNewsControler {
    constructor() {


        this.myNewsPage = [];
        this.categories = [];
        this.dp = null;
        this.user = null;
        this.activeId = -1;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.user = this.db.confirm();
            this.getAllCat().then(cats => {
                this.categories = this.db.cleanDataForControllers(cats)

                this.getMyNews(this.user.data.username).then(news => {
                    this.myNewsPage = this.db.cleanDataForControllers(news.rows);
                    mvc.apply();
                });

            });

        });

    }

    redirect(id) {
        window.location.href = "#/addnews/"+ id;
        document.location.reload(true);
    }

    /* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
    //read news functions 
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

    show(modelId, id) {
        let element = document.getElementById(modelId);
        element.style.display = 'flex';
        element.className += " modal-active";
        this.activeId = id;
    }
    
    hide(modelId) {
        let element = document.getElementById(modelId);
        element.style.display = 'none';

    }

    deleteNews() {
        if (this.activeId == -1)
            return;
        const news = this.myNewsPage[this.activeId];
        const id = this.activeId;
        this.activeId = -1;
        this.db.dbDelete('/news', news._id, news._rev).then((req) => {
            if (req.ok)
                this.myNewsPage.splice(id, 1);
            mvc.apply();
        });
        this.hide('delete');

    }
}