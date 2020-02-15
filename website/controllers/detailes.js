/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Latifa Masri <latifa.masri1998@gmail.com>
        Qusai Hroub <qusaihroub.r@gmail.com>

    File description:
        This file contains the controller class of details page which applies Potato Framework.
*/

import { DataBase } from "../../services/database.js";

export class Details {

    constructor() {

        this.dataBase = new DataBase();
        this.news = {};
        this.relatedNews = [];
        this.writer = {};

        this.getNews();
        dynamicImport("./disqusVariable.js").then(data => data.disqus_config(mvc.routeParams.id));
        this.loadDisqus();

    }

    /*
        This function used to assign ?? with ???

        @tparam:

        @param:

        @returns:
    */
    loadDisqus() {

        // DON'T EDIT BELOW THIS LINE
        var d = document,
            s = d.createElement('script');
        s.src = 'https://nnn-disqus-com.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }

    /*
        This function used to fetch news with specific id and assign it to "news" local variable for storing it.

        @tparam:

        @param:

        @returns:
    */
    getNews() {

        this.dataBase.findByIndex("/news",
                                    ["_id", "content", "createDate", "title", "writerId", "isActive", "attachment", "categoryId"],"_id",
                                     mvc.routeParams.id).then( data => {

            let iData = data;
            this.news = iData.docs[0];
            mvc.apply();
            this.getRelatedNews(this.news.categoryId, this.news._id);
            this.getWriters(this.news.writerId);
        }, () => {
            this.getNews();
        });

    }

    /*
        This function used to fetch related news with specific news and assign it to "relatedNews" local variable for storing it.

        @tparam: categoryId, newsId: int or string

        @param:

        @returns:
    */
    getRelatedNews(categoryId, newsId) {

        this.dataBase.findByIndex("/news", ["_id", "attachment", "title",],"categoryId", categoryId).then( data => {
            let iData = data;
            this.relatedNews = iData.docs.filter((el) => { return el._id != newsId});
            mvc.apply();
        }, () => {
            this.getRelatedNews();
        });

    }

    /*
        This function used to fetch writer data for specific id and assign it to "writer" local variable for storing it.

        @tparam:

        @param:

        @returns:
    */
    getWriters(writerId) {

        this.dataBase.getData("/users/_design/users/_view/generalinfo", true, '').then( data => {
            this.writer = data.filter((el) => { return el.id == writerId})[0].value;
            mvc.apply();
        }, () => {
            this.getWriters(writerId);
        });

    }

}
