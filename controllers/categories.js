/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Diana Mujahed <diana.muj98@gmail.com>
        Ibrahim Abusamarah <ibrahim.abusamrah123@gmail.com>
        Amir Altakroori <ameertakrouri99@gmail.com>
        Qusai Hroub <qusaihroub.r@gmail.com>

    File description: 
        This file contains the controller class of categories page which applies Potato Framework.
 */

import { DataBase } from "../services/DataBase.js";

export class Category {

    constructor() {

        this.dataBase = new DataBase();
        let indexType = mvc.routeParams.id;
        this.category = {};
        this.listMainNews = [];
        this.mainNews = {};
        this.randomNews = [];
        this.writers = [];
        this.writer = {};
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

    /*
        This function used to assign category with ??? 

        @tparam news: ??

        @param: identifier for needed category

        @returns:
    */
    getCategory(categoryId) {

        this.dataBase.getData("/categories/_design/allcategories/_view/new-view",true,'',this.url,this.auth).then( data => {
            this.category = data.filter((el) => { return el.id == categoryId})[0].value;
            mvc.apply();
        });

    }

    /*
        This function used to assign ?? with ??? 

        @tparam:

        @param: 

        @returns:
    */
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

    /*
        This function used to assign ?? with ??? 

        @tparam:

        @param: 

        @returns:
    */
    getAllNews() {
        
        this.dataBase.findByIndex("/news", ["_id", "title", "attachment"],"categoryId", mvc.routeParams.id, this.url, this.auth).then( data => {
            let iData = data;
            let length = iData.docs.length;
            this.liftNewsInCategory = iData.docs.slice(0, length / 2);
            this.rightNewsInCategory = iData.docs.slice(length / 2, length);
            mvc.apply();
         });

    }

    /*
        This function used to assign category with ??? 

        @tparam news: ??

        @param: identifier for needed category

        @returns:
    */
    getRandomNews(categoryId) {

        this.dataBase.getData("/news/_design/views/_view/random",true,'',this.url,this.auth).then( data => {
            this.randomNews = data;console.log(data);
            if (this.randomNews.lenght > 10) {
                this.randomNews = this.randomNews.slice(0, 10);
            }
            mvc.apply();
        });

    }

    /*
        This function used to assign category with ??? 

        @tparam news: ??

        @param: identifier for needed category

        @returns:
    */
    getWriters() {

        this.dataBase.getData("/users/_design/users/_view/generalinfo",true,'',this.url,this.auth).then( data => {
            this.writers = data;
            this.writer = this.writers.filter((el) => { return el.id == this.mainNews.writerId})[0].value;
            mvc.apply();
        });

    }

}
