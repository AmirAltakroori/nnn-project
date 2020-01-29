/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Qusai Hroub <qusaihroub.r@gmail.com>

     File description:
*/

export class DataBase {

    constuctor (url, authentication) {
        init(url, authentication);
    }

    cleanData(data) {
        cleanedData = [];
        for (let i = 0; i < data.rows.length; i++)
            cleanedData.push(data.rows[i]);
        return cleanedData;
    }

    /*
     *    fetch data from dataBase
     *
     *    @tparam randomNews: endpoint, url, authentication: string
     *
     *    @param endpoint: direct link or view, isView if the endpoint is View this must be true else must be false
     *                    id
     *
     *    @returns list of fetched data.
     */
    getData (endpoint, isView, id) {
        if (!this.url || !this.authentication) {
            return null;
        }

        return new Promise((resolve, reject) => {
            let url = this.url + endpoint;
            if (isView && id) {
                url += `?key=\"${id}\"`;
            } else url += `/${id}`;
            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", this.authentication);
            http.onreadystatechange = function() { //Call a function when the state changes.
                if (http.readyState == 4) {
                    data = JSON.parse(http.responseText);
                    if (!id || id == '')
                        data = this.cleanData(data);
                    resolve(data);
                }
            }
            http.send();
        });
    }

    /*
     *    fetch data from dataBase
     *
     *    @tparam randomNews: isView, id: boolean, endpoint, url, authentication: string
     *
     *    @param endpoint: direct link or view, isView if the endpoint is View this must be true else must be false
     *                    id, url is dataBase base url, authentication dataBase key;
     *
     *    @returns list of fetched data.
     */
    getData (endpoint, isView, id, url,  authentication) {
        this.init(url, authentication);

        return (this.getData(endpoint, isView, id));
    }

    /*
     *    initialize url, authentication as private property
     *
     *    @tparam url, authentication: string
     *
     *    @param url is dataBase base url, authentication dataBase key;
     *
     *    @returns
     */
    init (url, authentication) {
        this.url = url;
        this.authentication = authentication;
    }
}
