export class myNewsControler {
    constructor(){


       this.allNewsPage = [{
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
        title: "أخبار الفن والفنانين والنجوم والمشاهير",
        content: "<h1>This is my first news</h1>",
        categoryId: 4,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 0,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 3,
    },
    {
        title: "الاحلال يعتقل مقدسيا مسنا",
        content: "<h1>This is my first news</h1>",
        categoryId: 3,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 1,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 4,
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
        id: 5,
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
    
       this.news = import('./allnews.js');
        console.log(this.news.then(data => data.allnews()));
        
    }
    
    redirect(id) {
        window.location.href = "#/addnews/"+id;
        document.location.reload(true);
    }
}