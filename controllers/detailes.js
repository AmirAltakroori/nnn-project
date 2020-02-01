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

        this.news;

        this.relatedNews = [];
        this.getNews();

    }

    getNews() {
        this.dataBase.findByIndex("/news",
                                ["_id", "content", "createDate", "title", "writerId", "isActive", "attachment", "categoryId"],"_id", mvc.routeParams.newID,
                                'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com',
                                 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==')
                                 .then( data => {
                                     let iData = data;
                                     this.news = iData.docs[0];
                                     this.news.attachment = this.b64EncodeUnicode(this.news.attachment);
                                     mvc.apply();
                                     this.dataBase.findByIndex("/news",
                                                             ["_id", "content", "title", "attachment", "categoryId"],"categoryId", this.news.categoryId,
                                                             'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com',
                                                              'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==')
                                                              .then( data => {
                                                                  let iData = data;
                                                                  this.relatedNews = iData.docs.filter((el) => { return el._id != this.news._id});
                                                                  for(news of this.relatedNews) {
                                                                      news.attachment = this.b64EncodeUnicode(news.attachment);
                                                                  }
                                                                  mvc.apply();
                                                              });
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
