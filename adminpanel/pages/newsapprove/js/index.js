export class approveNewsControler {

    constructor() {

        this.MyNewsPage = [{
            id: 1,
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
            id: 4,
            _rev: "1-c0c1a0422e44ca46e3c372999e599291",
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

        this.news = import('./newsapprove.js');
        console.log(this.news.then(data => data.approvenews()));

    }

    updateNew(data, newsId) {

        return new Promise((resolve, reject) => {
            dbCreateOrUpdate("/news", data, newsId).then(response => {
                resolve(response);
                mvc.apply();
                //document.location.reload(true);
            });
        })
    }

    appproveNews() {

        let news;
        let data;
        for (let i = 0; i < myNewsPage.length; i++) {
            let checkbox = document.getElementById(myNewsPage[i].id);
            if (checkbox.checked) {
                news = myNewsPage[i];
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
                    "attachments": news._attachments,
                    "id": news.id,
                    "_rev": news._rev,
                    "writerId": news.writerId,
                    "isApproved": 1
                }
                //console.log(news)
                this.updateNew(data, news.id)
            }
        }

    }




}

