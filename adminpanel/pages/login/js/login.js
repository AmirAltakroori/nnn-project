
export class loginController {
    constructor() {
        this.toggleHeader();
        this.usernameInput = '';
        this.password = '';
        this.submit = false;
        dynamicImport("./../../adminpanel/js/database.js").then(db => {
            this.db = db;
            mvc.apply();
        });
        this.enc = [];
        dynamicImport("./../../adminpanel/js/backend.js").then(enc => {
            this.enc = enc;
        });
    }
    toggleHeader() {
        const header = document.getElementsByTagName('header')[0];
        if(header.style.display!='none')
            {
                header.style.display='none';
            }else 
            header.style.display='block';

    }

    getToken(fullName, username, email, roleId, alg, validityTime, key, hashFunction) {

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
    login() {
        if (this.submit)
            return;
        this.submit = true;
        let currentUser = null;
        createToast("جاري تسجيل الدخول", "", "info", '');
        this.db.dbGet("/users", false, this.usernameInput).then(user => {

            if (user.password != this.password) {
                createToast("خطأ", "أسم المستخدم أو كلمة المرور خاطئة", "danger", 'times-circle');
                return;
            } else if (user.state == 0) {
                createToast("ملاحظة", "حسابك معطل راجع أحد المسؤولين", "info", '');
                return;
            } else if (user.password == this.password) {
                createToast("نجاح", "تم تسجيل الدخول", "success", 'check');
                let token = this.getToken(user.firstName + " " + user.lastName,
                    user.username, user.email, user.role,
                    "sha256", 60 * 60 * 1000, this.enc.tokenKey, this.enc.SHA256);
                user.token = token;
                let datatoSave = {
                    "token": user.token,
                    "roleID": user.role,
                    "fullName": user.username,
                    "id": user._id,
                }
                this.enc.saveData('user', datatoSave);
                this.toggleHeader();
                window.location.href = "#/home";
                return;
            }
            this.submit = false;
        }, () => {
            console.log("Not found");
            createToast("خطأ", "أسم المستخدم أو كلمة المرور خاطئة", "danger", 'times-circle');
            this.submit = false;
        });
    }
}