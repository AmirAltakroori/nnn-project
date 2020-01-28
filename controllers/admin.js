export class AdminController
{
    UserName;
    constructor()
    {
        this.UserName = "hello";
        this.Password = "pswd";
        this.bgc = "redBack";
    }

    printUser() {
        console.log(this.UserName);
    }

    login(username, password) {
        console.log(this.UserName);
        alert(username + password + 'logged');
    }
}

