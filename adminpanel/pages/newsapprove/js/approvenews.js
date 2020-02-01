export class approveNewsControler {

    constructor() {

        this.notAppNewsPage = [];
        this.categories = [];
        this.dp = null;
      

        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();
           
            this.getAllCat().then(cats => {
                this.categories = this.db.cleanDataForControllers(cats);
                this.getAllNotAppNews().then(news => {
                    this.notAppNewsPage = this.db.cleanDataForControllers(news);
                    console.log(this.notAppNewsPage);
                    console.log(this.categories);
                    mvc.apply();
                });
            });

        });
        this.news = import('./newsapprove.js');
        console.log(this.news.then(data => data.approvenews()));

    }

    redirect(id) {
        window.location.href = "#/addnews/"+id + "/newsapprove";
        document.location.reload(true);
    }

    approvenews() {


        let userdata = JSON.parse(sessionStorage.getItem("userData"));
        if (userdata != null) {
            myNewsPage[userdata.ind] = userdata;
            sessionStorage.removeItem("userData");
        }
    }

    show(modelId, id) {
        let element = document.getElementById(modelId);
        element.style.display = 'flex';
        element.className += " modal-active";
        this.activeId = id;
        console.log(id);
    }
    hide(modelId) {
        let element = document.getElementById(modelId);
        element.style.display = 'none';

    }

    deleteNews() {
        if (this.activeId == -1)
            return;
        const news = this.notAppNewsPage[this.activeId];
        const id = this.activeId;
        this.activeId = -1;
        this.db.dbDelete('/news', news._id, news._rev).then((req) => {
            if (req.ok)
                this.notAppNewsPage.splice(id, 1);
            mvc.apply();
        });
        this.hide('delete');

    }
    getAllNotAppNews() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/notapproved", true, "").then(news => {

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