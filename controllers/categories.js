/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     diana mujahed <diana.muj98@gmail.com>
 *     ibrahim abusamarah
 *     Amir Altakroori
 *
 *     File description: this file contains the controller class of category page which applies potato MVC framework
 */

 import { DataBase } from "../services/DataBase.js";

export class Category {

    constructor() {

        this.dataBase = new DataBase();

        // Access page type number from url
        let indexType = mvc.routeParams.id;

        this.category = {};

        // Initialize main news section
        this.listMainNews = [];

        this.mainNews = {};

        // Initialize random news and guarantee that the number of news is 5
        this.randomNews = [];

        this.writers = [];

        this.writer = {};

        // Initialize related news with same category and guarantee that the number of each news list is 5
        this.rightNewsInCategory = [];
        this.liftNewsInCategory = [];

        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';

        this.getCategory(indexType);
        this.getAllNews();
        this.getNews();
        this.getRandomNews(indexType);
    }

    /*
        Void function that receives news object of main news from view page
        and set the value of main news function with same receives value

        @tparam news: news object

        @param: identifier for needed news

        @returns:
    */
    changeMainNews(news) {
        this.mainNews = news;
        this.writer = this.writers.filter((el) => { return el.id != this.mainNews.writerId})[0].value;
        mvc.apply();
    }

    getCategory(categoryId) {
        this.dataBase.getData("/categories/_design/allcategories/_view/new-view",true,'',this.url,this.auth).then( data => {
            this.category = data.filter((el) => { return el.id == categoryId})[0].value;
            mvc.apply();
        });
    }

    getNews() {
        this.dataBase.findByIndex("/news",
                                ["_id", "title", "attachment", "seoDescription", "isMainNews", "createDate"], "categoryId", mvc.routeParams.id,
                                this.url, this.auth)
                                 .then( data => {
                                     let iData = data;
                                     this.listMainNews = iData.docs.filter((el) => { return el.isMainNews});
                                     if (this.listMainNews.lenght > 3) {
                                         this.listMainNews = this.listMainNews.slice(0, 3);
                                     }
                                     this.mainNews = this.listMainNews[0];
                                     this.getWriters();
                                     mvc.apply();
                                 });
    }

    getAllNews() {
        this.dataBase.findByIndex("/news", ["_id", "title", "attachment"],"categoryId", mvc.routeParams.id, this.url, this.auth).then( data => {
            let iData = data;
            let length = iData.docs.length;
            this.liftNewsInCategory = iData.docs.slice(0, length / 2);
            this.rightNewsInCategory = iData.docs.slice(length / 2, length);
            mvc.apply();
         });
    }

    getRandomNews(categoryId) {
        this.dataBase.getData("/news/_design/views/_view/random",true,'',this.url,this.auth).then( data => {
            this.randomNews = data;console.log(data);
            if (this.randomNews.lenght > 10) {
                this.randomNews = this.randomNews.slice(0, 10);
            }
            mvc.apply();
        });
    }

    getWriters() {
        this.dataBase.getData("/users/_design/users/_view/generalinfo",true,'',this.url,this.auth).then( data => {
            this.writers = data;
            this.writer = this.writers.filter((el) => { return el.id == this.mainNews.writerId})[0].value;
            mvc.apply();
        });
    }
}
