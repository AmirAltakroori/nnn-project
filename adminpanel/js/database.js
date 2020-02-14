
import {getStoredToken,getData,SHA256,tokenKey} from "./backend.js";
let BASEURL = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
let AUTHENTICATION = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw=='

export function cleanDataForControllers(data) {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
        rows.push(data[i].value);
    }
    return rows;
}

export function getUser()
{
    return getData('user');
}
function cleanData(data) {
    let cleanedData = [];
    if(data.rows)
    for (let i = 0; i < data.rows.length; i++)
        cleanedData.push(data.rows[i]);
    return cleanedData;
}

export function dbGet(endpoint, isView, id) {
    return new Promise((resolve, reject) => {
        let url = BASEURL + endpoint;
        if (isView && id) {
            url += `?key=\"${id}\"`;
        } else url += `/${id}`;
        let http = new XMLHttpRequest();
        http.open("GET", url);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function () { //Call a function when the state changes.
            if (http.readyState == 4) {
                if (http.status == 200) {
                    let data = JSON.parse(http.responseText);
                    if (!id || id == '')
                        data = cleanData(data);
                    resolve(data);
                }  else {
                    console.log(http.status)
                    let data = JSON.parse(http.responseText);
                    reject(data);
                }
    
            }
          
        }
        http.send();
    });
}
export function dbDelete(endpoint, id, rev) {
    return new Promise((resolve, reject) => {
        let url = BASEURL + endpoint + `/${id}?rev=${rev}`;
        let http = new XMLHttpRequest();
        http.open("DELETE", url);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function () { //Call a function when the state changes.
            if (http.readyState == 4) {
                resolve(JSON.parse(http.responseText));
            }
        }
        http.send();
    });
}
export function dbCreateOrUpdate(endpoint, data, id) {
    return new Promise((resolve, reject) => {
        const url = BASEURL + endpoint + `/${id}`;
        let http = new XMLHttpRequest();
        http.open("PUT", url);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function () { //Call a function when the state changes.
            if (http.readyState == 4) {
                if (http.status == 409) {
                    console.log(http.status)
                    let data = JSON.parse(http.responseText);
                    reject(data);
                }    
                resolve(JSON.parse(http.responseText));
            }
        }
        http.send(JSON.stringify(data));
    });
}

function dbFindByIndex(endpoint, fields, index, value) {
    return new Promise((resolve, reject) => {
        let parameters = {
            'selector': {},
            'fields': fields,
        }
        parameters.selector[index] = value;
        const url = BASEURL + endpoint + `/_find`;
        let http = new XMLHttpRequest();
        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function () { //Call a function when the state changes.
            if (http.readyState == 4) {
                resolve(JSON.parse(http.responseText));
            }
        }
        http.send(JSON.stringify((parameters)));
    });
}

export function confirm() {
    let user = getStoredToken('user');
    
    if (!user)
        window.location.href = '#/login';
    //  Calculate the Hash for the token data with the key
    let hash = user['hash'];//SHA256(tokenJson + key);
    delete (user['hash']);

    let correctHash = false;
    let correctSission = false;
    
    if (hash == SHA256(JSON.stringify(user) + tokenKey))
        correctHash = true;

    let currentDate = new Date().getTime();
    if (currentDate < user.data.exp)
        correctSission = true;

    if (!correctHash || !correctSission)
        window.location.href = '/#login.html';
    else
        return user;
}

