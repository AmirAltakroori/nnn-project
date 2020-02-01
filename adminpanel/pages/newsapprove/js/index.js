export class approveNewsControler {

    constructor() {

        this.categories = [];
        this.allNewsPage = [];
        dynamicImport("./js/backend.js").then(db => {
            db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {
                this.categories = cats;
                this.categoryId = this.categories[0].id;
                mvc.apply();
                console.log(this.categories);
    
            })
            
            db.dbGet("/news/_design/views/_view/notapproved", true, "").then(news => {
                this.allNewsPage = news;
                mvc.apply();
                console.log(this.allNewsPage);
    
            })
            
            this.db = db;
        });

    
       this.news = import('./newsapprove.js');
        console.log(this.news.then(data => data.approvenews()));

    }

    redirect(id) {
        window.location.href = "#/addnews/"+id;
        document.location.reload(true);
    }
}