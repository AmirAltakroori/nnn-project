/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Aseel Arafeh <arafehaseel@gmail.com>
        Qusai Hroub <qusaihroub.r@gmail.com>

    File description:
        This file contains the controller class of home page which applies Potato Framework.
*/

import { DataBase } from "../services/DataBase.js";

export class Home {

    constructor() {

        this.dataBase = new DataBase();
        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';
        this.writers = [];
        this.getWriters();
        this.mainNews = [];
        this.selectedNews = {};
        this.getmainNews();
        this.slideIndex = 0;
        this.randomNews = [];
        this.randomNewsView = [];
        this.getRandomNews();
        setInterval(() => {
            this.slide(1);
        } , 4000);
        this.allNews = [];
        this.allCategories = [];
        this.categoriesView = [];
        this.getAllCategories();

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
        This function used to retrieve the most 4 main news from database

        @tparam

        @param

        @returns

    */
    getmainNews () {

        this.dataBase.getData("/news/_design/views/_view/mainnews?limit=5&&descending=true",true,'',this.url,this.auth).then( data => {
            this.mainNews = data;
            if (this.mainNews.length > 0) {
                this.selectedNews = this.mainNews[0];
            }
            if (this.mainNews.length > 5) {
                this.mainNews = this.mainNews.slice(0, 5);
            }
            for (let news of this.mainNews) {
                news.writer = this.writers.filter((el) => { return el.value.id == news.value.writer})[0].value;
            }
            mvc.apply();
        });

    }

    /*
        This function used to retrieve 12 random news from database and assign randomNews array with them.

        @tparam

        @param

        @returns

    */
    getRandomNews () {

        this.dataBase.getData("/news/_design/views/_view/random?limit=12",true,'',this.url,this.auth).then( data => {
            this.randomNews = data;
            this.slide(0);
        });

    }

    /*
        Load random news for view
     
        @tparam inc: integer
    
        @param inc: value of increment or decrement
    
        @returns
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
        this.showRandomNews();

    }

    /*
        This function used to show random news at its section.

        @tparam

        @param

        @returns

    */
    showRandomNews() {

        const rendomNewsContainer = document.getElementById('rendom-news-container');
        rendomNewsContainer.innerHTML="";

        for (let randomNews of this.randomNewsView) {

            let randomNewsTile = `<a href="#/details/${randomNews.value.id}">
                                        <div class="slider-news-tile" style="background-image: url('${randomNews.value.image}');">
                                            <div class="date">${randomNews.value.createDate}</div>
                                            <div class="news">
                                                ${randomNews.value.title}
                                            </div>
                                        </div>
                                    </a>`;
            rendomNewsContainer.innerHTML += randomNewsTile;

        }

    }

    /*
        This function used to retrieve all categories name from database and assign allCategories array with them.

        @tparam

        @param

        @returns

    */
    getAllCategories() {

        this.dataBase.getData("/categories/_design/allcategories/_view/new-view",true,'',this.url,this.auth).then( data => {
            this.allCategories = data;
            this.getNewsForCategory(this.allCategories);
            mvc.apply();
            this.slide(0);
        });

    }

    /*
        This function used to retrieve 5 newest news for each category at categories array.

        @tparam categories: array

        @param categories: array for all caetegories  

        @returns

    */
    getNewsForCategory(categories) {

        this.dataBase.dbFindByIndex("/news",["_id", "title", "attachment", "seoDescription", "createDate", "categoryId", "writerId"],"isActive", 1, this.url,this.auth).then( data => {
            this.allNews = data.docs;
            for (let category of categories) {

                category.allMain = [];
                category.mainNews = {};
                let categoryNews = this.allNews.filter((el) => { return el.categoryId == category.id});
                if (categoryNews.length > 0) {
                    category.mainNews = categoryNews[0];
                    category.mainNews.writer = this.writers.filter((el) => { return el.id == category.mainNews.writerId})[0];
                    if (categoryNews.length > 1) {
                        category.allMain = categoryNews.slice(1, 5);
                    }
                    this.categoriesView.push(category);
                }

            }
            mvc.apply();
            this.slide(0);
        });

    }

    /*
        This function used to ???

        @tparam 

        @param 

        @returns

    */
    getWriters() {

        this.dataBase.getData("/users/_design/users/_view/generalinfo",true,'',this.url,this.auth).then( data => {
            this.writers = data;
        });

    }

}