
export class myNewsControler {
    constructor() {

        this.dp = null;
        this.allNewsPage = [];
        this.categories = [];
        this.activeId = -1;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();

            this.getAllCat().then(cats => {
                this.categories = this.cleanData(cats);
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

      redirect(id) {
                window.location.href = "#/addnews/"+id;
                document.location.reload(true);
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
    allnews() {

        let userdata = getData("userData");
        if (userdata != null) {
            allNewsPage[userdata.ind] = userdata;
            sessionStorage.removeItem("userData");
        }
    }
    deleteNews() {
        if (this.activeId == -1)
            return;
        const news = this.allNewsPage[this.activeId];
        const id = this.activeId;
        this.activeId = -1;
        this.db.dbDelete('/news', news._id, news._rev).then((req) => {
            if (req.ok)
                this.allNewsPage.splice(id, 1);
            mvc.apply();

        });
        this.hide('delete');
    }

    /* -----------------------------------------------------------------------------------------------------------------------------------------------------*/
    //read news functions 
    getAllNews() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/allnews", true, "").then(news => {

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



}