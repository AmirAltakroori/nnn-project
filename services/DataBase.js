/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Qusai Hroub <qusaihroub.r@gmail.com>

     File description:
*/

export class DataBase {

    constuctor () {
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
     *    @tparam randomNews: isView: boolean, endpoint, baseUrl, id, authentication: string
     *
     *    @param endpoint: direct link or view, isView if the endpoint is View this must be true else must be false
     *                    id, baseUrl is dataBase base url, authentication dataBase key;
     *
     *    @returns list of fetched data.
     */
    getData (endpoint, isView, id, baseUrl, authentication) {
        return new Promise((resolve, reject) => {
            let url = baseUrl + endpoint;
            if (isView && id) {
                url += `?key=\"${id}\"`;
            } else url += `/${id}`;
            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", authentication);
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
     *    @tparam randomNews: fields, value, index, endpoint, baseUrl, authentication: string
     *
     *    @param endpoint: direct link or view, baseUrl is dataBase base url, authentication dataBase key;
     *
     *    @returns list of fetched data.
     */
     findByIndex(endpoint, fields, index, value, baseUrl, authentication) {
        return new Promise((resolve, reject) => {
            let parameters = {
                'selector': {},
                'fields':fields,
            }
            parameters.selector[index] = value;
            const url = baseUrl + endpoint + `/_find`;
            let http = new XMLHttpRequest();
            http.open("POST", url);
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", authentication);
            http.onreadystatechange = function() { //Call a function when the state changes.
                if (http.readyState == 4) {
                    resolve(JSON.parse(http.responseText));
                }
            }
            http.send(JSON.stringify((parameters)));
        });
    }
}
