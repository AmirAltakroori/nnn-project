

function getToken(fullName, username, email, roleId, alg, validityTime, key, hashFunction) {

    /*
        username: the username of the user
        email: the email of the user
        roleId: the role of the user
        alg: the hash algorithm that used
        validityTime: the life time of the token in milliseconds 
        key: the secret that used in signature  
    */

    let date = new Date();
    let currentDate = date.getTime(); // The current date in milliseconds 
    let expDate = currentDate + validityTime; // the exp data after add the validity time 

    //  Generate the token fields  
    let token = {
        "header": {
            "alg": alg,
            "typ": "JWT"
        },

        "data": {
            "fullName": fullName,
            "username": username,
            "email": email,
            "roleId": roleId,
            "start": currentDate,
            "exp": expDate
        }
    }

    //  Convert token object to JSON
    let tokenJson = JSON.stringify(token);

    //  Calculate the Hash for the token data with the key
    let hash = hashFunction(tokenJson + key);

    //  Add the Hash to the token
    token["hash"] = hash;

    //  conver the token object after add the hash to json then
    // encode it to base64
    let finalToken = JSON.stringify(token);
    let finalTokenBased64 = btoa(finalToken);

    return finalTokenBased64;
}

document.addEventListener('DOMContentLoaded', function(event) {

    let form = document.getElementById('submitForm');
    form.addEventListener('submit', function(e) {
        verification();
        e.preventDefault();
        return false;
    });
});

function verification() {
    let username = document.getElementById("Username"); // read the username
    let password = document.getElementById("Password"); // read the password
    //  get the user role
    // let user = getUser(username.value, password.value);
    let currentUser = null;
    dynamicImport("./../../adminpanel/js/backend.js").then(db => {
    db.dbGet("/users/",false,username.value).then( user => {
        currentUser = user;
        let text = "";
        color = "#ffffff"
       if(user.password === password.value && user.state == 1){
            let token = getToken(user.firstName + " " + user.lastName,
                                user.username, user.email, user.role,
                                "sha256", 60 * 60 * 1000, db.tokenKey, db.SHA256);
            user.token = token;
            text = "جاري تسجيل الدخول";
            color = "#17bb24";
            let datatoSave = {
                "token": user.token,
                "roleID": user.role,
                "fullName": user.firstName + " " + user.lastName,
                "id":user._id,
            }
            db.saveData('user',datatoSave);
        }else if(user.password === password.value && user.state == 0){
            text = "حسابك معطل راجع أحد المسؤولين";
            color = "#e85827";
        }else{
            currentUser = null;
            text = "اسم المستخدم او كلمة المرور خاطئة";
            color = "#ff0000";
        }
        username.value = "";
        password.value = "";
        displayPopup(text, color)
        // wait after the animation is end 
        setTimeout(() => {
            //  hidden the popup
            //  if the user is exist go to the home page
            if (currentUser && currentUser.state == 1) {
                window.location.assign("../adminpanel/index.html");
            }
        }, 1000);
    }); 
}  );
    
}

function displayPopup(message, backgroundColor = "#000000") {
    let popup = document.getElementsByClassName("popup")[0];
    popup.innerHTML = message;
    popup.style.backgroundColor = backgroundColor;
    popup.style.boxShadow = "-3px 2px 6px 4px " + backgroundColor;
    popup.style.display = "block";
    setTimeout(() => {
        //  hidden th popup
        popup.style.display = "none";
        return true;
    }, 2000);

}



let BASEURL = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
let AUTHENTICATION = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw=='


// from this function you can get all data for a database or for specific user

// If you want to get specific data for a document in a view , you need to set key to be the id of the document
function cleanData(data) {
    cleanedData = [];
    for (let i = 0; i < data.rows.length; i++)
        cleanedData.push(data.rows[i]);
    return cleanedData;
}


function saveData(storeName, data) {
    sessionStorage.setItem(storeName, JSON.stringify(data));
}
function dbGet(endpoint, isView, id) {
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
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4) {
                let data = JSON.parse(http.responseText);
                if (!id || id == '')
                    data = cleanData(data);
                resolve(data);
            }
        }
        http.send();
    });
}