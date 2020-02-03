export class allUsers {

    constructor() {
        this.usersPage = [];
        this.db = null;
        this.activeId = -1;
        this.role = -1;
        this.loading = true;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.role = this.db.confirm().data.roleId;
            this.getAllUsers().then(users => {
                this.usersPage = this.db.cleanDataForControllers(users);
                console.log(this.usersPage);
                this.loading = false;
                mvc.apply();
                this.init();

            });
        });
    }
    init() {
        let activeSelects = Array.from(document.getElementsByClassName("state"));
        let activeRoles = Array.from(document.getElementsByClassName("role"));
        for (let i = 0; i < activeSelects.length; i++) {
            activeSelects[i].value = this.usersPage[i].state;
            activeRoles[i].value = this.usersPage[i].role;
        }
    }
    updateStatus(field, id) {
        createToast("جاري التعديل", '', "info", "");
        let user = null;
        user = this.usersPage[id];
        user[field] = document.getElementsByClassName(field)[id].value;
        this.db.dbCreateOrUpdate('/users', user, user._id).then(resp => {
            if (resp.ok) {
                user._rev = resp.rev;
                createToast("نجحت العملية", 'تم تعديل الحالة', "success", "check");
            }
        });
    }
    show(modelId, id) {
        let element = document.getElementById(modelId);
        element.style.display = 'flex';
        element.className += " modal-active";
        this.activeId = id;
    }
    hide(modelId) {
        let element = document.getElementById(modelId);
        element.style.display = 'none';

    }

    deleteUser() {
        if (this.activeId == -1)
            return;
        this.hide('delete');
        createToast("جاري حذف أخبار المستخدم", '', "info", "");

        const id = this.activeId;
        this.activeId = -1;
        const user = this.usersPage[id];
        this.getMyNews(user._id).then(news => {
            console.log(news);
            let j = news.rows.length;
            for (let i = 0; i < j + 1; i++) {
                if (i < j) {
                    setTimeout(() => {
                      this.db.dbDelete("/news", news.rows[i].value._id, news.rows[i].value._rev);
                    }, 150);
                } else {
                    this.db.dbDelete('/users', user._id, user._rev).then(resp => {
                        if (resp.ok) {
                            this.usersPage.splice(id, 1);
                            createToast("نجحت العملية", 'تم حذف الحساب', "success", "check");
                            mvc.apply();
                            this.init();
                        }
                    });
                }
            }
        });
    }
    getMyNews(username) {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/news/_design/views/_view/specificUser", true, username).then(news => {
                resolve(news);
            })
        });
    }
    updateUser(id) {
        const user = this.usersPage[id];
        location.href = "#/adduser/" + user._id;

    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/users/_design/users/_view/usersinfo", true, "").then(users => {
                resolve(users);
            })
        });
    }
}