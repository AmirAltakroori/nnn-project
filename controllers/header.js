/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Diana Mujahed <diana.muj98@gmail.com>
        Qusai Hroub <qusaihroub.r@gmail.com>
        Aseel Arafeh <arafehaseel@gmail.com>

    File description: 
        This file contains the controller class of header which applies Potato Framework.
 */

import { DataBase } from "../services/DataBase.js";

export class Header {

    constructor() {

        this.dataBase = new DataBase();
        this.urgentNews = [];
        this.categoriesList = [];
        this.mainCategoriesList = [];
        this.moreCategoriesList = [];
        this.url = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
        this.auth = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw==';
        this.getUrgentNews();
        this.getCategoriesList();

    }

    /*
        This function used to retrieve all urgent news from database and assign urgentNews array with them.

        @tparam

        @param

        @returns

    */
    getUrgentNews() {

        this.dataBase.getData("/news/_design/views/_view/urgent",true,'',this.url,this.auth).then( data => {
            this.urgentNews = data;
            mvc.apply();
        });

    }

    /*
        This function used to retrieve all categories name from database and assign categoriesList array with them.

        @tparam

        @param

        @returns

    */
    getCategoriesList() {

        this.dataBase.getData("/categories/_design/allcategories/_view/new-view",true,'',this.url,this.auth).then( data => {
            this.categoriesList = data;
            this.sliceCategoriesList();
            mvc.apply();
        });

    }

    /*
        This function devides the categories list into two arrays to use the more option 
        when the categories are more than 6

        @tparam

        @param

        @returns

    */
    sliceCategoriesList() {

        if (this.categoriesList.length > 6) {

            this.mainCategoriesList = this.categoriesList.slice(0, 6);
            this.moreCategoriesList = this.categoriesList.slice(6, this.categoriesList.length);

        } else {

            this.mainCategoriesList = this.categoriesList;
            this.moreCategoriesList = [];

        }

    }

}
