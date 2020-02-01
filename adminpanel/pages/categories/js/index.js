export class categories {

    constructor() {
        this.categoriesPage = null;
        this.activeId = 0;
        this.activeRow = null;
        this.dp = null;
        dynamicImport("./../../adminpanel/js/backend.js").then(db => {
            this.db = db;
            this.db.confirm();
            this.getAllCat().then(cats => {
                this.categoriesPage = cats;
                mvc.apply();
            });

        });

    }

    loadCat() {
        displayCategories(categories);
        //Get the modal that opens when click on "إضافة فئة"
        let modal = document.getElementById("createcategory-modal");
        //Get the button that opens the modal
        let addBtn = document.getElementById("addBtn");

        //Get close icon that close the modal
        let span = document.getElementById("close");

        //Get the create button that will craete a new category 
        let createBtn = document.getElementById("createcategory-btn");

        //When the user clicks on "انشاء", update actegories tabel with new category
        let addForm = document.getElementById("category-form");
        let editForm = document.getElementById("category-edit-form");
        editForm.addEventListener("submit", (e) => {
            updateCategoryName();
            hideModal("createcategory-edit-modal");
            e.preventDefault();
            return false;
        });
        addForm.addEventListener("submit", (e) => {
            let tbody = document.getElementsByTagName('tbody')[0];
            let categoryName = document.getElementById("categoryname").value;
            let tr = document.createElement('tr');
            let row = `
            <td class="user_no" >${tbody.childElementCount + 1}</td>
            <td class="user_full">
                <span class="user_name" style="font-size:18px">` + categoryName + `</span>
            </td>
            <td>
                <select class="selection" style="font-size:18px; border:none; font-family:"Segoe UI"">
                    <option value="writer">فعال</option>
                    <option value="admin"> غير فعال</option>
                </select>
            </td>
            <td>
                <i class="fas fa-trash-alt delete_user" style="font-size:20px; color:red; text-align:center; cursor:pointer" onclick="show(this,'delete',${categories.id})"></i>
                <i class="far fa-edit icon color-blue" onclick="showEditModal('createcategory-edit-modal',this,${categories.length + 1})"></i>
            </td>`;
            tr.innerHTML = row;
            tr.className = 'user_info';
            tbody.appendChild(tr);
            hideModal(modal.id);
            // to database
            categories.push({
                isActive: 1,
                id: categories.length + 1,
                name: categoryName
            })
            let category = {
                isActive: 1,
                id: categories.length + 1,
                name: categoryName
            }
            console.log(categories);
            CreateCat(category)
            e.preventDefault();
            return false;
        });

        //When the user clicks "إضافة فئة" , show the modal 
        addBtn.onclick = function () {
            showModal("createcategory-modal");
        }
        //When the user clicks close icon , close the modal
        span.onclick = function () {
            hideModal("createcategory-modal");
        }
        //When the user clicks anywhere outside of the modal, close it 
        window.onclick = function (event) {
            if (event.target == modal) {
                hideModal(modal.id);
            }
        }

    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = "flex";
        document.getElementById("categoryname").value = '';
    }




    showEditModal(modalId, row, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";
        activeId = id;
        activeRow = row.parentElement.parentElement;
    }

    hideModal(modalId) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "none";
    }

    updateCategoryName() {
        let newName = document.getElementById("editcategoryname").value;
        categoriesPage.find(({ id }) => id === activeId).name = newName;
        var changeName = document.getElementsByClassName("user_name")[activeId - 1];
        changeName.innerHTML = newName;
        document.getElementById("editcategoryname").value = "";
    }
    /**************************************************************************************************
     * Read categories
     */
    displayCategories(categories) {
        dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(data => {
            categoriesPage = data;
            categories = data;

            // categoriesPage = categories;

            let table = document.getElementById("tablebody");
            for (let i = 0; i < categories.length; i++) {
                let row = document.createElement("tr");
                row.className = "user_info";
                let number = document.createElement("td");
                number.className = "user_no";
                number.textContent = i + 1;
                let info = document.createElement("td");
                info.className = "user_full";
                let info_text = document.createElement("span");
                info_text.className = "user_name ";
                info_text.textContent = categories[i].value.name;
                info.appendChild(info_text);
                let show_selection = document.createElement("td");
                let select = document.createElement("select");
                select.className = "selection";
                let option1 = document.createElement("option");
                option1.value = 1;
                option1.textContent = "فعال";
                let option2 = document.createElement("option");
                option2.value = 0;
                option2.textContent = "غير فعال";
                select.appendChild(option1);
                select.appendChild(option2);
                select.selectedIndex = !categories[i].value.state;
                show_selection.appendChild(select);

                let operations = document.createElement("td");
                let delete_icon = document.createElement("i");
                delete_icon.className = "fas fa-trash-alt delete_user";
                delete_icon.setAttribute('onclick', "show(this,'delete'," + categories[i].id + ")");

                let edit_icon = document.createElement("i");
                edit_icon.className = "far fa-edit icon color-blue";
                edit_icon.onclick = (e) => {
                    showEditModal("createcategory-edit-modal", edit_icon, categories[i].id);
                }
                operations.appendChild(delete_icon);
                operations.appendChild(edit_icon);
                row.appendChild(number);
                row.appendChild(info);
                row.appendChild(show_selection);
                row.appendChild(operations);

                table.appendChild(row);
            }

        });
    }
    getCatId() {
        return dbGet("/settings", false, "categories");
    }

    CreateCat(data) {
        return new Promise((resolve, reject) => {
            getCatId().then(request => {
                const _id = request.counter + 1;
                dbCreateOrUpdate("/categories", data, _id).then(response => {
                    request.counter = request.counter + 1;
                    dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
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
}