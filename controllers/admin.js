export class AdminController
{
    UserName;
    constructor()
    {
        this.UserName = "hello";
        this.Password = "pswd";
        this.bgc = "redBack";

        setTimeout(() => 
        {
           this.UserName = "meow";
           this.Password = "idc";
           mvc.apply();
        }, 2500);

        setTimeout(() => 
        {
           this.UserName = "22meow";
           this.Password = "22idc";
           mvc.apply();
        }, 5500);
    }

    printUser() {
        console.log(this.UserName);
    }

    login(username, password) {
        console.log(this.UserName);
        alert(username + password + 'logged');
    }
}

