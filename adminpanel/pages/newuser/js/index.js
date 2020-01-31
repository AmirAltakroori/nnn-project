export class addusersController {
    constructor() {
        this.editmode = false;
        this.db = null;
        dynamicImport("./js/backend.js").then(db => {
            this.db = db;
        });
        this._id = "";
        this.firstName = "";
        this.lastName = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.repassword = '';
        this.token = "";
        this.role = 1;
        this.state = 1;
        // if(mvc.routeParams.id !=0)
        //     {
        //         this.editmode = true;   
        //     }

    }
    saveUser() {
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
        this.CreateUserDB(user).then(resp => {
            console.log(resp);
            if (resp.ok == true) {
                this.showPopUp('success');
                setTimeout(() => {
                    window.location.href = "#allusers";
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

}