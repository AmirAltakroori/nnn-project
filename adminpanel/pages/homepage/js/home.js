export class HomeController {
    constructor() {
        this.Message = "hello";
        const userData = sessionStorage.getItem('user');
        if (!userData) {
            window.location.href = '/admin-panel-login/login.html';
            return;
        }
        this.userRole = userData.role;
    }
}