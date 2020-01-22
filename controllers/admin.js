export class AdminController
{
    constructor()
    {
        this.UserName = "hello";
        this.Password = "pswd";
    }

    login(username, password) {
        alert(username + password + 'logged');
    }
}

