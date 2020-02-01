/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     diana mujahed <diana.muj98@gmail.com>
 *     Qusai Hroub <qusaihroub.r@gmail.com>
       Aseel Arafeh <arafehaseel@gmail.com>
 *
 *     File description: this file contains the controller class of the website header which applies potato MVC framework
 */

export class Header {


    constructor() {
        this.urgentNews = this.getUrgentNews();
        this.categoriesList = this.getCategoriesList();
        this.mainCategoriesList;
        this.moreCategoriesList;
        this.sliceCategoriesList();
    }

    getUrgentNews() {
        return [{
            title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
            path: "#"
        }, {
            title: "إلغاء امتحانات الفاينل لهذا العام",
            path: "#"
        }, {
            title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
            path: "#"
        }];
    }

    getCategoriesList() {
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


    //this function devide the categories list into two arrays to use the more option when the categories are more than 6 
    sliceCategoriesList() {
        this.categoriesList = this.getCategoriesList();
        if (categoriesList.length > 6) {
            this.mainCategoriesList = this.categoriesList.slice(0, 6);
            this.moreCategoriesList = this.categoriesList.slice(6, this.categoriesList.length);
        } else {
            this.mainCategoriesList = this.categoriesList;
            this.moreCategoriesList = [];
        }
    }

}