  export class HomeController {
    constructor() {
        this.Message = "hello";
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }
        this.userRole = userData.roleID;
        console.log(this.userRole)
    }
}