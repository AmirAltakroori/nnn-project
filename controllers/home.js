/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com>
     Qusai Hroub <qusaihroub.r@gmail.com>

     File description:
*/

let categoryTitle;
let categoryMainNews = [];

export class Home {
    constructor() {

        this.mainNews = this.getmainNews();
        if (this.mainNews.lenght > 5) {
            this.mainNews = this.mainNews.slice(0, 5);
        }

        this.selectedNews = this.mainNews[0];

        this.slideIndex = 0;
        this.randomNews = this.getRandomNews();

        this.categoriesList = getCategoriesList();

        this.isFirstTime = true;

        this.randomNewsView = this.randomNews.slice(0, 3);

        setInterval(() => {
            this.slide(1);
        } , 4000);

        this.showCategoryNews();
    }

    /*
        Change Selected news

        @tparam news: news object

        @param: identifier for needed news

        @returns:
    */
    changeSelectedNews(news) {
        this.selectedNews = news;
        mvc.apply();
    }

    /*
        Get Main News.

        @tparam

        @param

        @returns

        This function used to retrieve the most 4 main news from database
    */
    getmainNews () {

        // I'll rewrite this function when DB was ready.... Query should retrive limited number of charachters :)
        return [{
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"firstNews.jpg",
                        description:"بسم الله الرحمن الرحيم ... هذا وصف الخبر ",
                        id: 1
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"firstNews.jpg",
                        description:"",
                        id: 2
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"firstNews.jpg",
                        description:"",
                        id: 3
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"firstNews.jpg",
                        description:"",
                        id: 4
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"firstNews.jpg",
                        description:"",
                        id: 5
                      }];

    }

    getRandomNews () {

        // I'll rewrite this function when DB was ready.... Query should retrive limited number of charachters :)
        return [{
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/firstNews.jpg",
                        description:"بسم الله الرحمن الرحيم ... هذا وصف الخبر ",
                        id: 1
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/2.jpeg",
                        description:"",
                        id: 2
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/3.jpeg",
                        description:"",
                        id: 3
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/4.jpeg",
                        description:"",
                        id: 4
                    }];

    }

    /*
        Get Urgent News.

        @tparam

        @param

        @returns

        This function used to retrieve categories in navbar from database
    */
    getCategoriesList () {

        // Rewrite this function when DB was ready.
        categoriesList = [{
                        title: "الصفحة الرئيسية",
                        path: "/home"
                          }, {
                        title: "تكنولوجيا",
                        path: "/category/teachnology"
                          }, {
                        title: "علوم",
                        path: "/category/science"
                          }, {
                        title: "ثقافة",
                        path: "/category/knowledge"
                          }, {
                        title: "اقتصاد",
                        path: "/category/economy"
                          }, {
                        title: "رياضة",
                        path: "/category/sport"
                          }, {
                        title: "فن",
                        path: "/category/art"
                          }, {
                        title: "سياسة",
                        path: "/category/politics"
                          }, {
                        title: "موسيقى",
                        path: "/category/music"
                          }];

    }

    /*
     *    load random news for view
     *
     *    @tparam inc: integer.
     *
     *    @param inc: value of increment or decrement.
     *
     *    @returns
     */
    slide(inc) {
        this.slideIndex += inc;
        if (this.slideIndex < 0) {
            this.slideIndex = this.randomNews.length - 1;
        }
        if (this.slideIndex == this.randomNews.length) {
            this.slideIndex = 0;
        }
        if (this.slideIndex + 3 <= this.randomNews.length) {
            this.randomNewsView = this.randomNews.slice(this.slideIndex, this.slideIndex + 3);
        } else {
            this.randomNewsView = this.randomNews.slice(this.slideIndex, this.randomNews.length);
            console.log(this.randomNewsView);
            this.randomNewsView = [...this.randomNewsView, ...(this.randomNews.slice(0, (this.slideIndex + 3) % this.randomNews.length))];
            console.log(this.randomNewsView);
        }
        console.log(this.slideIndex);
        mvc.apply();
    }

    /*
        Get main News in Category

        @tparam

        @param

        @returns

        This function used to retrieve main news in category from database
    */
    getCategoryNews () {

    // I'll rewrite this function when DB was ready.
        categoryTitle = [{
                            title:"الأخبار العالمية",
                            path:"#"
                         }]

        categoryMainNews = [{
                            title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                            path: "#",
                            authorName: "admin",
                            publishedDate: "12/12/2019",
                            img:"img/img1.jpg",
                            SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم "
                           }];


    }

    /*
        Show News.

        @tparam

        @param

        @returns

        This function used to show the urgent news retrieved from database at Category Section in home bage
    */
    showCategoryNews () {
        const categoryTitleDiv = document.getElementById('title');
        const categoryMainNewsDiv = document.getElementById('main-news');
        const categorySubNewsDiv = document.getElementById('sub-news');
        this.getCategoryNews();
        categoryTitleDiv.innerHTML=`<div class="category-header-name"><a class="link" href="${categoryTitle.title}"></a></div>
                                    <div class="category-read-more "><a class="read-more-btn" href=${categoryTitle.path}> المزيد &gt;</a></div>`;



        if(categoryMainNews.length > 0) {

            categoryMainNewsDiv.innerHTML=`<div class="category-main-image-div">
                                                <img id="category-image" src="${categoryMainNews[0].img}" alt="${categoryMainNews[0].title}">
                                            </div>
                                            <div class="category-main-title-and-date">
                                                    <div class="category-main-title"><a class="link" href="${categoryMainNews[0].path}"></a></div>
                                                    <div class="category-main-date">${categoryMainNews[0].publishedDate}</div>
                                            </div>
                                            <div class="category-main-details"></div>
                                            <a class="read-more-btn category-btn" href=${categoryMainNews[0].path}>اقرأ المزيد &gt;</a>`;



        categorySubNewsDiv.innerHTML="";

        for (let i = 0; i < 3; i++) {

            categorySubNewsDiv.innerHTML+=`<div class="category-content-random-item">
                                                <img class="category-img-rnd" id="category-image" src="${categoryMainNews[0].img}" alt="">
                                                <div class="category-randome-title"><a class="link" href="${categoryMainNews[0].path}">${categoryMainNews[0].title}</a> </div>
                                            </div>`;

        }
    }

    }

}
