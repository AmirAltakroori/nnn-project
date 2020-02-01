export class addusersController {
    constructor() {

        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }

        this.db = null;
        this.btnTitle  = 'انشاء مستخدم جديد'
        this._id = 0;
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.repassword = '';
        this.token = "";
        this.role = 1;
        this.state = 1;
        this.$submitted = false;
        this._rev = "";
        if (mvc.routeParams.id != 0) {
            this._id = mvc.routeParams.id;
            console.log(this._id);
            console.log(mvc);
        }
        dynamicImport("./js/backend.js").then(db => {
            this.db = db;
            if (this._id != 0) {
                this.getExistedUser().then(user => {
                    this._id = user._id;
                    this._rev = user._rev;
                    this.firstName = user.firstName;
                    this.lastName = user.lastName;
                    this.username = user.username;
                    this.email = user.email;
                    this.repassword = user.password;
                    this.password = user.password;
                    this.token = user.token;
                    this.role = user.role;
                    this.state = user.state;
                    this.userid = user.userid;
                    this.btnTitle  = "تعديل المستخدم";
                    console.log(this._id);
                    mvc.apply();
                });
            }
        });
    }
    saveUser() {
        let btn  = document.getElementById('savebtn');
        btn.disabled = true;
        btn.style.background = '#042e64';
        if (this.repassword != this.password) {
            this.showPopUp('warning');
            return;
        }

        let user = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password,
            token: this.token,
            role: this.role,
            state: this.state,
        }
        console.log(user);
        if (this._id != 0) {
            user['_rev'] = this._rev;
            user['_id'] = this._id;
            this.updateExistedUser(user, this._id).then(resp => {
                console.log(resp);
                if (resp.ok) {
                    this.showPopUp("updated");
                    setTimeout(() => {
                        window.location.href = "#/allusers";
                        this.$submitted = false;
                    }, 1000);
                }
            });
            return;
        }
        this.CreateUserDB(user).then(resp => {
            console.log(resp);
            if (resp.ok == true) {
                this.showPopUp('success');
                setTimeout(() => {
                    window.location.href = "#/allusers";
                }, 1000);
            }
        })
    }
    showPopUp(id) {
        let popup = document.getElementById(id);
        popup.style.display = 'block';
        setTimeout(() => {
            //  hidde th popup
            popup.style.display = "none";
        }, 1000);

    }
    getNewId() {
        return this.db.dbGet("/settings", false, "users");
    }

    CreateUserDB(data) {

        return new Promise((resolve, reject) => {
            this.getNewId().then(request => {
                this.db.dbCreateOrUpdate("/users", data, data.username).then(response => {
                    request.counter = request.counter + 1;
                    if (response.error) {
                        this.showPopUp("usernameDub");
                        resolve(response);
                    } else
                        this.db.dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                            resolve(response2);
                        });
                })
            })
        })
    }
    getExistedUser() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/users/_design/users/_view/updateuser", true, this._id).then(user => {
                if (user.rows.length != 1) {
                    window.location.href = "#/home";
                    resolve(user);
                    return;
                }
                resolve(user.rows[0].value);
            })
        });
    }
    updateExistedUser(data, key) {
        return new Promise((resolve,response) => {
            this.db.dbCreateOrUpdate("/users", data, key).then(response => {
                console.log(response);
                if (response.error) {
                    // window.location.href = "#/home";
                }
                resolve(response);
            });
        })
    }
}