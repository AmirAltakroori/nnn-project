
function saveData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

function getToken(username, email, roleId, alg, validityTime, key) {

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
    let hash = SHA256(tokenJson + key);

    //  Add the Hash to the token
    token["hash"] = hash;

    //  conver the token object after add the hash to json then
    // encode it to base64
    let finalToken = JSON.stringify(token);
    let finalTokenBased64 = btoa(finalToken);

    return finalTokenBased64;
}
let users = [{
        firstName: "وليد",
        lastName: "الجعبة",
        username: "Waleed Jubeh",
        email: "Waleed@ppu.edu",
        password: "1",
        createDate: new Date(),
        isActive: 1,
        roleId: 1, // when we create a user its diffault role is writer which its id is 1
        token: "",
    },
    {
        firstName: "باسل",
        lastName: "عطاونه",
        username: "basil atawneh",
        email: "basil@ppu.edu",
        password: "23",
        createDate: new Date(),
        isActive: 0,
        roleId: 2, // when we create a user its diffault role is writer which its id is 1
        token: "",
    },

]

document.addEventListener('DOMContentLoaded', function(event) {

    let form = document.getElementById('submitForm');
    form.addEventListener('submit', function(e) {
        verification();
        e.preventDefault();
        return false;
    });
});

function getUser(username, password) {
    /*
        username: the username of the user
        password: the password of the user
    */
    let aimedUser = null; // the user role (0: not valid, other wise it's valid) 

    // check the password and the username if it's exist
    for (let user of users) {
        if (user.username == username && user.password == password) {
            let token = getToken(user.username, user.email, user.roleId, "sha256", 60 * 60 * 1000, key);
            user.token = token;
            aimedUser = user;
            break;
        }
    }

    return aimedUser;
}

function verification() {
    let username = document.getElementById("Username"); // read the username
    let password = document.getElementById("Password"); // read the password
    //  get the user role
    let user = getUser(username.value, password.value);
    username.value = "";
    password.value = "";
    let text = "";
    color = "#ffffff"
        //  check if the user is exist (role = 0, means it's invalid user)
    if (user == null) {
        text = "اسم المستخدم او كلمة المرور خاطئة";
        color = "#ff0000";
        //popup.style.boxshadow = "-3px 2px 6px 4px #d85656";
    } else if (user.isActive == 0) {
        text = "حسابك معطل راجع أحد المسؤولين";
        color = "#e85827";
        // popup.style.boxshadow = "-3px 2px 6px 4px #58d856";
    } else {
        text = "جاري تسجيل الدخول";
        color = "#17bb24";
        let datatoSave = {
            "token": user.token,
            "roleID": user.roleId,
            "FullName": user.firstName + " " + user.lastName
        }
        saveData(datatoSave);
    }
    // display the popup

    displayPopup(text, color)
        // wait after the animation is end 
    setTimeout(() => {
        //  hidden th popup

        //  if the user is exist go to the home page
        if (user.isActive == 1) {

            window.location.href = "../adminpanel/index.html";
        }
    }, 1000);

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