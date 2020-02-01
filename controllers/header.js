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

import { DataBase } from "../services/DataBase.js";

export class Header {

    constructor() {
        this.dataBase = new DataBase();
        this.urgentNews;
        this.categoriesList;
        this.mainCategoriesList;
        this.moreCategoriesList;
        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';
        this.getUrgentNews();
        this.getCategoriesList();
    }

    getUrgentNews() {
        this.dataBase.getData("/news/_design/views/_view/urgent",true,'',this.url,this.auth).then( data => {
            console.log(data);
            this.urgentNews = data;
            //$apply();
        }); 
    }

    getCategoriesList() {
        this.dataBase.getData("/categories/_design/allcategories/_view/new-view",true,'',this.url,this.auth).then( data => {
            console.log(data);
            this.categoriesList = data;
            this.sliceCategoriesList();
            //$apply();
        }); 
    }


    //this function devide the categories list into two arrays to use the more option when the categories are more than 6 
    sliceCategoriesList() {
        if (categoriesList.length > 6) {
            this.mainCategoriesList = this.categoriesList.slice(0, 6);
            this.moreCategoriesList = this.categoriesList.slice(6, this.categoriesList.length);
        } else {
            this.mainCategoriesList = this.categoriesList;
            this.moreCategoriesList = [];
        }
    }

}