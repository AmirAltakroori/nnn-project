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
            id: 10,
            title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم"
           
        }, {
            id: 11,
            title: "إلغاء امتحانات الفاينل لهذا العام"
        }, {
            id: 12,
            title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة "
        }];
    }

    getCategoriesList() {
        return [{
            id: 1,
            title: "الصفحة الرئيسية"
           
        }, {
            id: 2,
            title: "تكنولوجيا"
        }, {
            id: 3,
            title: "علوم"
        }, {
            id: 4,
            title: "ثقافة"
        }, {
            id: 5,
            title: "اقتصاد"
        }, {
            id: 6,
            title: "رياضة"
        }, {
            id: 7,
            title: "فن"
        }, {
            id: 8,
            title: "سياسة"
        }, {
            id: 9,
            title: "موسيقى"
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