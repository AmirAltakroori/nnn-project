export class HomeController {
    constructor() {
        this.mode = null;

        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }
        this.changing = false;
        this.userRole = userData.roleID;
        console.log(this.userRole)
        this.db = dynamicImport("./js/backend.js");
        console.log(this.db);
        this.siteMode = null;
        this.getStatus().then(state => {
            this.siteMode = state;
            this.mode = state.state;
            console.log(this.mode);
            mvc.apply();
        });


    }
    ChangeMode() {
        if(this.changing)
            return ;
        this.changing = true;
        mvc.apply();
        console.log("changing")
        this.getStatus().then( res =>{
            res.state = !res.state;
            console.log(res);
            this.db.then(dbObject => dbObject.dbCreateOrUpdate("/settings", res, "sitemode").then(resp => {
                this.mode = res.state;
                this.siteMode = res;
                this.changing = false;
                mvc.apply();
            }));
        }) 
    }
    getStatus() {
        return new Promise((resolve, rej) => {
            this.db.then(dbObject => dbObject.dbGet("/settings", false, "sitemode").then(res => {
                
                console.log(res);
                resolve(res);
            }));
        })
    }
}