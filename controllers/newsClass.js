/*
*     NNN website.
*
*     This file is part of the NNN website.
*
*     Authors:
*     Qusai Hroub <qusaihroub.r@gmail.com>
*
*     File description:
*/

class News {
    constructor() {
        this.id = "";
        this.title = "";
        this.content = "";
        this.categoryId = -1;
        this.seoTitle = "";
        this.seoTages = ""; // json string;
        this.seoDescription = "";
        this.isActive = false;
        this.isMainNews = false;
        this.isUrgentNews = false;
        this.createDate = Date();
        this._attachments = ""; // follwing couchDB structure.
    }
}
