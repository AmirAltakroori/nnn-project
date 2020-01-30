  export class HomeController {
    constructor() {
        this.mode = null;

        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }
        this.userRole = userData.roleID;
        console.log(this.userRole)
        this.db = dynamicImport("./js/backend.js");
        console.log(this.db);
        this.db.then(dbObject => dbObject.dbGet("/settings", false, "sitemode").then(res => {
            this.mode = res.state;
            console.log(res);
            mvc.apply();
        }));



    }
    
}