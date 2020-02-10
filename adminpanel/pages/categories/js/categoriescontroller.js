export class CategoriesController {

    constructor() {
        this.categories = [];
        this.activeId = 0;
        this.activeRow = null;
        this.userData = null;
        this.userRole = -1;
        this.submit = false;
        this.loading = true;
        this.dp = null;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();
            this.getAllCat().then(cats => {
                this.categories = this.db.cleanDataForControllers(cats);
                this.loading = false;
                mvc.apply();
                this.init();
            });

        });

        this.userData = JSON.parse(sessionStorage.getItem('user'));
        this.userRole = this.userData.roleID;

    }
    init() {
        const selections = Array.from(document.getElementsByClassName('selection'));
        let i = 0;
        selections.forEach(el => {
            el.value = this.categories[i].isActive;
            i++;
        })
    }
    hideModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "none";
        modal.classList.remove("modal-active");
    }
    updateCategoryStatus(id) {
        //opUp("sending");
        createToast("جاري التعديل", '', "info", "");
        const category = this.categories[id];
        category.isActive = +!category.isActive;
        this.db.dbCreateOrUpdate('/categories', category, category._id).then(resp => {
            if (resp.ok) {
                this.categories[id]._rev = resp.rev;
                //opUp("success");
                createToast("نجحت العملية", 'تم تعديل حالة الفئة', "success", "check");

            }
        });
    }
    showModal(modalId, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";
        modal.className += " modal-active";
        this.activeId = id;
        if (modalId != "createcategory-modal") {

        }
        else {
            document.getElementById("categoryname").value = '';
        }
    }
    getCatId() {
        return dbGet("/settings", false, "categories");
    }
    createCategory() {
        if (this.submit)
            return;
        this.submit = true;
        // //opUp("sending");
        createToast("جاري اضافة الفئة", '', "info", "");

        let category = {
            isActive: 1,
            name: document.getElementById('categoryname').value,
        }
        this.CreateCat(category).then(data => {
            if (data.ok) {
                category._rev = data.rev;
                category._id = data.id;
                this.categories.push(category);
                mvc.apply();
                createToast("نجحت العملية", 'تمت اضافة الفئة', "success", "check");
                location.reload();
            }

            this.hideModal('createcategory-modal');
            this.submit = false;
        });

    }
    CreateCat(data) {
        return new Promise((resolve, reject) => {
            getCatId().then(request => {
                const _id = request.counter + 1;
                this.db.dbCreateOrUpdate("/categories", data, _id).then(response => {
                    request.counter = request.counter + 1;
                    this.db.dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                        resolve(response2);
                    });
                })
            })
        })
    }

    getAllCat() {
        return new Promise((resolve, reject) => {
            this.db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {

                resolve(cats);
            })
        });
    }
    showEditModal(modalId, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";
        this.activeId = id;
    }

    hideModal(modalId) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "none";
    }
    deleteCategory() {
        if (this.submit)    
            return;
        this.submit = true;
        //opUp("sending");
        createToast("جاري حذف", '', "info", "");

        if (this.activeId == -1)
            return;
        const id = this.activeId;
        this.activeId = -1;
        const category = this.categories[id];
        this.db.dbDelete('/categories', category._id, category._rev).then(resp => {
            if (resp.ok) {

                this.categories.splice(id, 1);
                mvc.apply();
                this.init();
                createToast("نجحت العملية", 'تم حذف الفئة', "success", "check");
            }
            this.hideModal('delete');
            this.submit = false;

        });
    }
    updateCategoryName() {
        if (this.activeId == -1)
            return;
        //opUp("sending");
        createToast("جاري التعديل", '', "info", "");

        const id = this.activeId;
        this.activeId = -1;
        const category = this.categories[id];
        const newName = document.getElementById('editcategoryname').value;
        category.name = newName;
        this.db.dbCreateOrUpdate('/categories', category, category._id).then(resp => {
            if (resp.ok) {
                this.categories[id].name = newName;
                this.categories[id]._rev = resp.rev;
                mvc.apply();
                this.init();
                createToast("نجحت العملية", 'تم تعديل اسم الفئة', "success", "check");
            }
        });
        this.hideModal('createcategory-edit-modal');

    }

    getCatId() {
        return this.db.dbGet("/settings", false, "categories");
    }

    CreateCat(data) {
        return new Promise((resolve, reject) => {
            this.getCatId().then(request => {
                const _id = request.counter + 1;
                this.db.dbCreateOrUpdate("/categories", data, _id).then(response => {
                    request.counter = request.counter + 1;
                    this.db.dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                        resolve(response2);
                    });
                });
            });
        });
    }

}