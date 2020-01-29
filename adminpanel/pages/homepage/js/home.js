  export class HomeController {
    constructor() {
        confirm()
        this.Message = "hello";
        const userData = getStoredToken('user');
        this.userRole = userData.data.roleId;
        console.log(this.userRole)
    }
}