export class HomeController {
    constructor() {
        this.Message = "hello";
        this.mode = null;
        this.changing = false;
        this.userRole = -1;

        console.log(this.userRole)
        this.db = dynamicImport("./js/backend.js");
        this.db.then( db => {
            
            this.userRole = db.confirm().data.roleId;
            console.log(db.confirm());
            mvc.apply();
        });
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