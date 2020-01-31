export class approveNewsController {

    constructor() {
        this.db = null;
        dynamicImport("./js/backend.js").then(db => {
            this.db = db;
        });
        this.allnews = [{
            _id: 1,
            title: "test is test ",
            content: "<h1>This is my first news</h1>",
            categoryId: 1,
            seoTitle: "First news",
            seoTags: "{ 'tags':{['test','sport']} }",
            seoDescription: "This is my first news",
            isActive: 0,
            isMainNews: 0,
            isUrgentNews: 1,
            createDate: new Date(),
            writerId: 1,
            attachments: "",
        },
        {
            _id: 2,
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
            attachments: "",
        },
        {
            _id: 3,
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
            attachments: "",
        },
        {
            _id: 59,
            _rev: "3-cae7574a77d7150340789a6ed1d7bdaf",
            title: "kasjdl",
            content: "<p><br></p>",
            categoryId: 1,
            seoTitle: "",
            seoTags: "",
            seoDescription: "",
            isActive: 1,
            isMainNews: 0,
            isUrgentNews: 0,
            createDate: "2020-01-31",
            attachment: "",
            writerId: "admin",
            isApproved: 0
          }

        ];
        this.categories = [{
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
        ]; 
        console.log(this.categories,this.allnews);
    }
    updateNew(data, newsId) {

        return new Promise((resolve, reject) => {
            this.db.dbCreateOrUpdate("/news", data, newsId).then(response => {
                resolve(response);
                mvc.apply();
                console.log("Updated");
                //document.location.reload(true);
            });
        })
    }

    appproveNews() {

        let news;
        let data;
        console.log( this.allnews);
        for (let i = 0; i < this.allnews.length; i++) {
            let checkbox = document.getElementById(this.allnews[i]._id);
            if (checkbox.checked) {
                news = this.allnews[i];
                //console.log(news)
                data = {

                    "title": news.title,
                    "content": news.content,
                    "categoryId": news.categoryId,
                    "seoTitle": news.seoTitle,
                    "seoTags": news.seoTags,
                    "seoDescription": news.seoDescription,
                    "isActive": news.isActive,
                    "isMainNews": news.isMainNews,
                    "isUrgentNews": news.isUrgentNews,
                    "createDate": news.createDate,
                    "writerId": news.writerId,
                    "attachments": news.attachments,
                    "_rev": news._rev,
                    "writerId": news.writerId,
                    "isApproved": 1
                }
                //console.log(news)
                this.updateNew(data, news._id + '')
            }
        }

    }




}

