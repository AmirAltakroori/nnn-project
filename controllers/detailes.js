/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Latifa Masri

     File description:
*/

import { DataBase } from "../services/DataBase.js";

export class Details {

    constructor() {

        this.dataBase = new DataBase();

        this.news = {};

        this.relatedNews = [];

        this.writer = {};

        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';

        this.getNews();

    }

    getNews() {
        this.dataBase.findByIndex("/news",
                                ["_id", "content", "createDate", "title", "writerId", "isActive", "attachment", "categoryId"],"_id", mvc.routeParams.id,
                                this.url, this.auth)
                                 .then( data => {
                                     let iData = data;
                                     this.news = iData.docs[0];
                                     this.news.attachment = this.b64EncodeUnicode(this.news.attachment);
                                     mvc.apply();
                                     this.getRelatedNews(this.news.categoryId, this.news._id);
                                     this.getWriters(this.news.writerId);

                                 });
    }


    getRelatedNews(categoryId, newsId) {
        this.dataBase.findByIndex("/news",
                                ["_id", "content", "title", "attachment", "categoryId"],"categoryId", categoryId,
                                this.url,
                                 this.auth)
                                 .then( data => {
                                     let iData = data;
                                     this.relatedNews = iData.docs.filter((el) => { return el._id != newsId});
                                     for(news of this.relatedNews) {
                                         news.attachment = this.b64EncodeUnicode(news.attachment);
                                     }
                                     mvc.apply();
                                 });
    }

    getWriters(writerId) {
        this.dataBase.getData("/users/_design/users/_view/generalinfo",true,'',this.url,this.auth).then( data => {
            this.writer = data.filter((el) => { return el.id != writerId})[0].value;
            mvc.apply();
        });
    }

    b64EncodeUnicode(utf8String) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(utf8String).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }

}
