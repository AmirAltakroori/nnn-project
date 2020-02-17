/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Qusai Hroub <qusaihroub.r@gmail.com>
        Aseel Arafeh <arafehaseel@gmail.com>

    File description:
        This file contains functions used to deal with database
*/

import { environment } from "../environments/environment.js"

export class DataBase {

    constructor () {
        this.baseUrl = environment.baseUrl;
        this.authentication = environment.authentication;
    }

    /*
     *    Fetch data from dataBase
     *
     *    @tparam randomNews: isView: boolean, endpoint, id: string
     *
     *    @param endpoint: direct link or view, isView if the endpoint is View this must be true else must be false
     *                    id element id;
     *
     *    @returns list of fetched data.
     */
    getData (endpoint, isView, id) {

        return new Promise((resolve, reject) => {

            let url = this.baseUrl + endpoint;
            if (isView && id) {

                url += `?key=\"${id}\"`;

            } else if (id !='') {

                url += `/${id}`;

            }

            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", this.authentication);
            http.onreadystatechange = function() {

                if (http.readyState == 4) {

                    if (http.status == 200) {
                        let data = JSON.parse(http.responseText);
                        let cleanedData = [];

                        if (!id || id == ''){

                            for (let i = 0; i < data.rows.length; i++)
                                cleanedData.push(data.rows[i]);

                        }
                        resolve(cleanedData);
                    } else {
                        reject();
                    }
                }
            }
            http.send();
        });
    }

    /*
     *    Fetch data from dataBase
     *
     *    @tparam randomNews: fields, value, index, endpoint: string
     *
     *    @param endpoint: direct link or view;
     *
     *    @returns list of fetched data.
     */
    findByIndex(endpoint, fields, index, value) {

        return new Promise((resolve, reject) => {

            let parameters = {
                'selector': {},
                'fields':fields,
            }

            parameters.selector[index] = value;
            const url = this.baseUrl + endpoint + `/_find`;
            let http = new XMLHttpRequest();
            http.open("POST", url);
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", this.authentication);
            http.onreadystatechange = function() { //Call a function when the state changes.

                if (http.readyState == 4)
                    if (http.status == 200) {
                        resolve(JSON.parse(http.responseText));
                    } else {
                        reject();
                    }

            }
            http.send(JSON.stringify((parameters)));
        });
    }

    /*
     *    Fetch data from dataBase
     *
     *    @tparam randomNews: fields, value, index, endpoint: string
     *
     *    @param endpoint: direct link or view;
     *
     *    @returns list of fetched data.
     */
    dbFindByIndex(endpoint, fields, index, value) {

        return new Promise((resolve, reject) => {

            let parameters = {
                'selector': {
                    "createDate": {"$gte": null}
                },
                "sort": [{"createDate": "desc"}],
                'fields':fields,
            }

            parameters.selector[index] = value;
            const url = this.baseUrl + endpoint + `/_find`;
            let http = new XMLHttpRequest();
            http.open("POST", url);
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", this.authentication);
            http.onreadystatechange = function() {

                if (http.readyState == 4)
                    if (http.status == 200) {
                        resolve(JSON.parse(http.responseText));
                    } else {
                        reject();
                    }
            }
            http.send(JSON.stringify((parameters)));
        });
    }

    /*
     *    Fetch data from dataBase
     *
     *    @tparam randomNews: isView: boolean, endpoint, id: string
     *
     *    @param endpoint: direct link or view, isView if the endpoint is View this must be true else must be false
     *                    id element id;
     *
     *    @returns list of fetched data .
     */
    getDataWithoutClean (endpoint, isView, id) {

        return new Promise((resolve, reject) => {

            let url = this.baseUrl + endpoint;
            if (isView && id) {

                url += `?key=\"${id}\"`;

            } else if (id !='') {

                url += `/${id}`;

            }

            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", this.authentication);
            http.onreadystatechange = function() {

                if (http.readyState == 4) {

                    if (http.status == 200) {
                        let data = JSON.parse(http.responseText);
                        resolve(data);
                    } else {
                        reject();
                    }
                }
            }
            http.send();
        });
    }
}
