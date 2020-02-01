export class allUsers {

    constructor() {
        this.usersPage = [];
        this.db = null;
        this.activeId = -1;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();
            this.getAllUsers().then(users => {
                this.usersPage = this.db.cleanDataForControllers(users);
                console.log(this.usersPage); 
                mvc.apply();
            });
        });
    }

    updateUsers(id) {   
        let aim = null;
        for (ind in usersPage)
            if (usersPage[ind].id == id) {
                aim = usersPage[ind];
                aim["ind"] = ind;
                break;
            }

        sessionStorage.setItem("userData", JSON.stringify(aim));
        window.location.href = "../newuser/updateuser.html";

    }



    show(modelId, id) {
        let element = document.getElementById(modelId);
        element.style.display = 'flex';
        element.className += " modal-active";
        this.activeId = id;
        console.log(id);
    }
    hide(modelId) {
        let element = document.getElementById(modelId);
        element.style.display = 'none';

    }

    deleteUser() {
        if (this.activeId == -1)
            return;
        const id = this.activeId;
        console.log(id);
        this.activeId = -1;
        const user = this.usersPage[id];
        console.log(user);
        this.db.dbDelete('/users', user._id, user._rev).then(resp => {
            console.log(resp);
            if(resp.ok)
            this.usersPage.splice(id, 1);
            location.reload();
        });
        this.hideModal('delete');
    }
    updateUser(id)
    {
        const user = this.usersPage[id];
        location.href="#/adduser/"+user._id;
    
    }
    deleteRowElement() {

        let row = usersPage.findIndex((row) => row.id == newId);
        usersPage.splice(row, 1);
        let rowDOM = newContain.parentNode.parentNode;
        rowDOM.parentElement.removeChild(rowDOM);


    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/users/_design/users/_view/usersinfo", true, "").then(users => {
                resolve(users);
            })
        });
    }
}