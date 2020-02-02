    export class CategoriesController {

    constructor() {
        this.categories = [];
        this.activeId = 0;
        this.activeRow = null;
        this.dp = null;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();
            console.log(this.db);
            this.getAllCat().then(cats => {
                this.categories = this.db.cleanDataForControllers(cats);
                mvc.apply();
            });

        });
        this.activeRow = null;
        this.activeId = 0;
    }

    hideModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "none";
        modal.classList.remove("modal-active");
    }

    showModal(modalId, id) {
        console.log(id);
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

    updateCategoryName() {
        let newName = document.getElementById("editcategoryname").value;
        this.categories.find(({ id }) => { return id == this.activeId }).name = newName;
        var changeName = document.getElementsByClassName("user_name")[this.activeId - 1];
        changeName.innerHTML = newName;
        document.getElementById("editcategoryname").value = "";
        this.hideModal("createcategory-edit-modal");
    }

    getCatId() {
        return dbGet("/settings", false, "categories");
    }
    createCategory() {
        let category = {
            isActive: 1,
            name: document.getElementById('categoryname').value,
        }
        this.CreateCat(category).then(data => {
            if (data.ok) {
                this.categories.push(category);
                mvc.apply();
            }
            this.hideModal('createcategory-modal');
            location.reload();
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
        if (this.activeId == -1)
            return;
        const id = this.activeId;
        this.activeId = -1;
        const category = this.categories[id];
        this.db.dbDelete('/categories', category._id, category._rev).then(resp => {
            if(resp.ok)
            this.categories.splice(id, 1);
            location.reload();
        });
        this.hideModal('delete');
    }
    updateCategoryName() {
        let newName = document.getElementById("editcategoryname").value;
        categoriesPage.find(({ id }) => id === activeId).name = newName;
        var changeName = document.getElementsByClassName("user_name")[activeId - 1];
        changeName.innerHTML = newName;
        document.getElementById("editcategoryname").value = "";
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