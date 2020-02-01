/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com>
     Qusai Hroub <qusaihroub.r@gmail.com>

     File description:
*/

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

        setInterval(() => {
            if (this.isFirstTime) {
                this.isFirstTime = false;
            } else {
                this.slide(1);
            }
        } , 8000);

        this.categoryMainNews = this.getCategoryMainNews();
        if (this.categoryMainNews.lenght > 5) {
          this.categoryMainNews = this.categoryMainNews.slice(0, 5);
      };

        this.firstCategoryMainNews = this.categoryMainNews[0];
        this.categoryTitle = this.getCategoryTitle();
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
        Hide slide

        @tparam news: news object

        @param: identifier for needed news

        @returns:
    */
    hideSlide(news) {
        let index = this.randomNews.indexOf(news);
        if (index > this.slideIndex + 2 || index < this.slideIndex) {
            return true;
        }
        return false;
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
                        img:"../img/firstNews.jpg",
                        description:"",
                        id: 2
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/firstNews.jpg",
                        description:"",
                        id: 3
                      }, {
                        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                        path: "#",
                        authorName: "أسيل عرفه",
                        publishedDate: "12/12/2019",
                        img:"../img/firstNews.jpg",
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
     *    increment or decrement slider start index.
     *
     *    @tparam inc: integer.
     *
     *    @param inc: value of increment or decrement.
     *
     *    @returns
     */
    slide(inc) {
        this.showSlides(this.slideIndex += inc);
    }

    /*
     *    Show Next 3 divs.
     *
     *    @tparam index: integer.
     *
     *    @param index is the start point.
     *
     *    @returns
     */
    showSlides(index) {
        let i;
        let newsTileList = document.getElementsByClassName("slider-news-tile");

        if (index > newsTileList.length - 3) {
            this.slideIndex = 0;
        } else if (index < 0) {
            this.slideIndex = newsTileList.length - 4;
        }

        for (i = 0; i < newsTileList.length; i++) {
            newsTileList[i].style.display = "none";
        }

        for (i = this.slideIndex; i < this.slideIndex + 3; i++) {
            newsTileList[i].style.display = "block";
        }
    }

    getCategoryMainNews () {

      // I'll rewrite this function when DB was ready.            
          return [{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"img1.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id = 1
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"img1.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id = 2
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"img1.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id = 3
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"img1.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id = 4
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"img1.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id = 5
                             }];
      }

    getCategoryTitle () {

      // I'll rewrite this function when DB was ready.
          return {
                    title:"الأخبار العالمية",
                    id:1
                  };
    } 


}