export class addusersController {
    constructor() {
        this.new =
            import ("./createuser.js");
        console.log(this.new.then(data => data.createUser()));
    }
   
}