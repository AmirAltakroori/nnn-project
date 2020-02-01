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
                this.init();
            });

        });
        this.activeRow = null;
        this.activeId = 0;
    }
    init() {
        const selections = Array.from(document.getElementsByClassName('selection'));
        let i = 0;
        selections.forEach(el => {
            el.value = this.categories[i].isActive;
            i++;
        })
        console.log(selections);
    }
    hideModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "none";
        modal.classList.remove("modal-active");
    }
    updateCategoryStatus(id) {
        this.showPopUp("sending"); 
        const category = this.categories[id];
        category.isActive = +!category.isActive;
        this.db.dbCreateOrUpdate('/categories', category, category._id).then(resp => {
            if (resp.ok) {
                this.categories[id]._rev = resp.rev;
                this.showPopUp("success"); 
            }
        });
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
    showPopUp(id) {
        let popup = document.getElementById(id);
        console.log(popup);
        popup.style.display = 'block';
        setTimeout(() => {
            //  hidde th popup
            popup.style.display = "none";
        }, 1500);

    }
    getCatId() {
        return dbGet("/settings", false, "categories");
    }
    createCategory() {
        this.showPopUp("sending"); 
        let category = {
            isActive: 1,
            name: document.getElementById('categoryname').value,
        }
        this.CreateCat(category).then(data => {
            if (data.ok) {
                this.categories.push(category);
                mvc.apply();
                this.showPopUp("success"); 
            }
            this.hideModal('createcategory-modal');
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
        this.showPopUp("sending"); 
        if (this.activeId == -1)
            return;
        const id = this.activeId;
        this.activeId = -1;
        const category = this.categories[id];
        this.db.dbDelete('/categories', category._id, category._rev).then(resp => {
            if (resp.ok){
                this.showPopUp("success"); 
                this.categories.splice(id, 1);
                mvc.apply();
                this.init();
            }
               
            
        });
        this.hideModal('delete');
    }
    updateCategoryName() {
        if (this.activeId == -1)
            return;
            this.showPopUp("sending");
        const id = this.activeId;
        this.activeId = -1;
        const category = this.categories[id];
        const newName = document.getElementById('editcategoryname').value;
        category.name = newName;
        console.log(category);

        this.db.dbCreateOrUpdate('/categories', category, category._id).then(resp => {
            if (resp.ok) {
                this.categories[id].name = newName;
                this.categories[id]._rev = resp.rev;
                mvc.apply();
                this.init();
                this.showPopUp("success");
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