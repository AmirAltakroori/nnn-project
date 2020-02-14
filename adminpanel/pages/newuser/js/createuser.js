export class addusersController {
    constructor() {
        this.userid = '';

        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }

        this.db = null;
        this.btnTitle = 'انشاء مستخدم جديد'
        this._id = 0;
        this.firstName = "";
        this.lastName = "";
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
        }
        dynamicImport("./js/database.js").then(db => {
            this.db = db;
            if (this._id != 0) {
                this.getExistedUser().then(user => {
                    this._id = user._id;
                    this._rev = user._rev;
                    this.firstName = user.firstName;
                    this.lastName = user.lastName;
                    this.userid = user.username;
                    this.email = user.email;
                    this.repassword = user.password;
                    this.password = user.password;
                    this.token = user.token;
                    this.role = user.role;
                    this.state = user.state;
                    this.userid = user.userid;
                    this.btnTitle = "تعديل المستخدم";
                    mvc.apply();
                });
                

            }
        });
    }
    saveUser() {
        if(this.$submitted)
            return ;
        this.$submitted = true;
        this.userid = document.getElementById('userid').value;
        let btn = document.getElementById('savebtn');
        btn.disabled = true;
        btn.style.background = '#042e64';
        if (this.repassword != this.password) {
            createToast("خطأ", 'كلمتا المرور غير متطابقات', "danger", "times-circle");
            btn.disabled = false;
            btn.style.background = '';
            this.$submitted = false;
            return;
        }
        setTimeout(() => {
            this.$submitted = false;
        }, 500);
        let user = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.userid,
            email: this.email,
            password: this.password,
            token: this.token,
            role: this.role,
            state: this.state,
        }
       
        if (this._id != 0) {
            user['_rev'] = this._rev;
            user['_id'] = this._id;
            this.updateExistedUser(user, this._id).then(resp => {
                if (resp.ok) {
                    createToast("نجحت العملية", 'تم التعديل', "success", "check");
                    setTimeout(() => {
                        window.location.href = "#/allusers";
                        this.$submitted = false;
                    }, 1000);
                }
            });
            return;
        }
    
        this.CreateUserDB(user).then(resp => {
            if (resp.ok == true) {
                createToast("نجحت العملية", 'تم انشاء الحساب', "success", "check");
                setTimeout(() => {
                    window.location.href = "#/allusers";
                }, 1000);
            }
            btn.disabled = false;
            btn.style.background = '';
        })
    }
    getNewId() {
        return this.db.dbGet("/settings", false, "users");
    }

    CreateUserDB(data) {

        return new Promise((resolve, reject) => {
            this.getNewId().then(request => {
                this.db.dbCreateOrUpdate("/users", data, data.username).then(response => {
                    request.counter = request.counter + 1;
                        this.db.dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                            resolve(response2);
                        });
                }, ()=> {
                    createToast("خطأ", 'اسم المستخدم مستعمل', "danger", "times-circle");
                    resolve(response);
                    
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
        return new Promise((resolve, response) => {
            this.db.dbCreateOrUpdate("/users", data, key).then(response => {
                if (response.error) {
                    // window.location.href = "#/home";
                }
                resolve(response);
            });
        })
    }
}