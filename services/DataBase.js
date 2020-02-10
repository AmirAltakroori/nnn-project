/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Qusai Hroub <qusaihroub.r@gmail.com>
        Aseel Arafeh <arafehaseel@gmail.com>

    File description: 
        This file contains functions used to deal with database
*/

export class DataBase {

    /*
     *    Fetch data from dataBase
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

            } else if (id !='') {

                url += `/${id}`;

            }

            let http = new XMLHttpRequest();
            http.open("GET", url);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", authentication);
            http.onreadystatechange = function() { 

                if (http.readyState == 4) {

                    let data = JSON.parse(http.responseText);
                    let cleanedData = [];

                    if (!id || id == ''){

                        for (let i = 0; i < data.rows.length; i++)
                            cleanedData.push(data.rows[i]);

                    }
                    resolve(cleanedData);

                }
            }
            http.send(); 
        });
    }

    /*
     *    Fetch data from dataBase
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
                
                if (http.readyState == 4) 
                    resolve(JSON.parse(http.responseText));
                    
            }
            http.send(JSON.stringify((parameters)));
        });
    }
    
    /*
     *    Fetch data from dataBase
     *
     *    @tparam randomNews: fields, value, index, endpoint, baseUrl, authentication: string
     *
     *    @param endpoint: direct link or view, baseUrl is dataBase base url, authentication dataBase key;
     *
     *    @returns list of fetched data.
     */
    dbFindByIndex(endpoint, fields, index, value, baseUrl, authentication) {

        return new Promise((resolve, reject) => {

            let parameters = {
                'selector': {
                    "createDate": {"$gte": null}
                },
                "sort": [{"createDate": "desc"}],
                'fields':fields,
            }

            parameters.selector[index] = value;
            const url = baseUrl + endpoint + `/_find`;
            let http = new XMLHttpRequest();
            http.open("POST", url);
            http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            http.setRequestHeader('Accept', 'application/json');
            http.setRequestHeader("Authorization", authentication);
            http.onreadystatechange = function() {
                
                if (http.readyState == 4) 
                    resolve(JSON.parse(http.responseText));
            }
            http.send(JSON.stringify((parameters)));
        });
    }
}
