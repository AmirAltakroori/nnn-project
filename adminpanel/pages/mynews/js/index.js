export class myNewsControler {
    constructor(){


       this. myNewsPage = [{
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
            title: "الاحلال يعتقل مقدسيا مسنا",
            content: "<h1>This is my first news</h1>",
            categoryId: 3,
            seoTitle: "First news",
            seoTags: "{ 'tags':{['test','sport']} }",
            seoDescription: "This is my first news",
            isActive: 0,
            isMainNews: 1,
            isUrgentNews: 1,
            createDate: "2019-05-12",
            writerId: 1,
            _attachments: "",
            id: 4,
        },
    
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
    
       this.news = import('./mynews.js');
        console.log(this.news.then(data => data.mynews()));

    }

   /*  newId;
      newContain;
      element;
      row; 

show(row, modelId, id) {
    this.element = document.getElementById(modelId)
    this.element.className += " modal-active";
    this.newContain = row;
    this.newId = id;
    console.log(row);
}
//delete a row in a table
 deleteRowElement(Page) {

    this.row = Page.findIndex((row) => row.id == newId);
    Page.splice(this.row, 1);
    this.rowDOM = this.newContain.parentNode.parentNode;
    this.rowDOM.parentElement.removeChild(rowDOM);


}

//show and hide functions for delete modal


 hide(modelId) {
    this.element = document.getElementById(modelId)
    this.element.classList.remove("modal-active");
}*/
}