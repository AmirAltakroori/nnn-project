/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com>
     Qusai Hroub <qusaihroub.r@gmail.com>

     File description:
*/

import { DataBase } from "../services/DataBase.js";

export class Home {

    constructor() {
        this.dataBase = new DataBase();
        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';
        
        this.mainNews = [];
        this.selectedNews = {};////////
        this.getmainNews();
            
        this.slideIndex = 0;
        this.randomNews = [];        
        this.randomNewsView = [];
        this.getRandomNews();
        this.isFirstTime = true;
        setInterval(() => {
            this.slide(1);
        } , 4000);

        this.categoriesList = this.getCategoriesList();
        this.categoryMainNews = this.getCategoryMainNews();
        this.firstCategoryMainNews = this.categoryMainNews[0];
        this.categoryMainNews = this.categoryMainNews.slice(1, 5);
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
        console.log(news)
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
        this.dataBase.getData("/news/_design/views/_view/mainnews?limit=5&&descending=true",true,'',this.url,this.auth).then( data => {
            this.mainNews = data;
            if (this.mainNews.length > 0) {                 
                this.selectedNews = this.mainNews[0];
            }
            mvc.apply();
        });
    }

    getRandomNews () {
        this.dataBase.getData("/news/_design/views/_view/random?limit=12",true,'',this.url,this.auth).then( data => {
            this.randomNews = data; 
            if(this.randomNews.length > 3) 
                this.randomNewsView = this.randomNews.slice(0, 3); 
            else
                this.randomNewsView = this.randomNews; 
            mvc.apply();
        });
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
        return [{
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
            this.slideIndex += this.randomNews.length;
        }
        if (this.slideIndex == this.randomNews.length) {
            this.slideIndex = 0;
        }
        if (this.slideIndex + 3 <= this.randomNews.length) {
            this.randomNewsView = this.randomNews.slice(this.slideIndex, this.slideIndex + 3);
        } else {
            this.randomNewsView = this.randomNews.slice(this.slideIndex, this.randomNews.length);
            this.randomNewsView = [...this.randomNewsView, ...(this.randomNews.slice(0, (this.slideIndex + 3) % this.randomNews.length))];
        }
        // mvc.apply();
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
                              id: 1
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"2.jpeg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id: 2
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"3.jpeg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id: 3
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"4.jpeg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id: 4
                             },{
                              title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                              path: "#",
                              authorName: "admin",
                              publishedDate: "12/12/2019",
                              img:"new.jpg",
                              SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم ",
                              id: 5
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
