export class CategoriesController {

    constructor() {
        this.categories = [
            {
                name: "الألعاب",
                isActive: 1,
                id: 1,
            },
            {
                name: "الرئيسية",
                isActive: 1,
                id: 2,
            },
            {
                name: "الرياضة",
                isActive: 0, //غير مفعل
                id: 3,
            },
            {
                name: "الفن",
                isActive: 0,
                id: 4,
            }
        ];
        this.activeRow = null;
        this.activeId = 0;
    }

    hideCreateEditModal(modelId) {
        let modal = document.getElementById(modelId);
        modal.style.display = "none";
        modal.classList.remove("modal-active");
    }

    showEditModal(modalId, row, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";
        modal.className += " modal-active";

        this.activeId = id;
        this.activeRow = row.parentElement.parentElement;
    }

    showCreateModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "flex";
        modal.className += " modal-active";
        document.getElementById("categoryname").value = '';
    }

    updateCategoryName() {
        let newName = document.getElementById("editcategoryname").value;
        categories.find(({ id }) => { return id == this.activeId }).name = newName;
        var changeName = document.getElementsByClassName("user_name")[this.activeId - 1];
        changeName.innerHTML = newName;
        document.getElementById("editcategoryname").value = "";
    }

    hideModals(modalId) {
        let element = document.getElementById(modalId);
        element.style.display = 'none';
        console.log(element);
        console.log('hide');
    }

    editCategoryName() {
        this.updateCategoryName();
        this.hideModals("createcategory-edit-modal");
    }

    createCategory() {
        let tbody = document.getElementsByTagName('tbody')[0];
        console.log(tbody);
        let categoryName = document.getElementById("categoryname").value;
        let tr = document.createElement('tr');
        tr.style.height = "28px";
        let row = `
        <td class="user_no" >${tbody.childElementCount + 1}</td>
        <td class="user_full">
            <span class="user_name" $style="'font-size:18px':true">` + categoryName + `</span>
        </td>
        <td>
            <select class="selection" style="font-size:18px; border:none; font-family:"Segoe UI"">
                <option value="writer">فعال</option>
                <option value="admin"> غير فعال</option>
            </select>
        </td>
        <td>
            <i class="fas fa-trash-alt delete_user" style="font-size:20px; color:red; text-align:center; cursor:pointer" 
                onclick="show(this,'delete',${this.categories.length + 1})"></i>
            <i class="far fa-edit icon color-blue" 
                $click="showEditModal('createcategory-edit-modal',this.element,${this.categories.length + 1})"></i>
        </td>`;
        tr.innerHTML = row;
        tr.className = 'user_info';
        tbody.appendChild(tr);
        hideModals(modal.id);
        // to database
        this.categories.push({
            isActive: 1,
            id: this.categories.length + 1,
            name: "categoryName"
        })
    }

    deleteCategory() {
        let row = this.categories.findIndex((row) => row.id == this.activeId);
        this.categories.splice(row, 1);
        console.log(this.categories);
        console.log(this.activeRow);
        let rowDOM = this.activeRow.parentNode.parentNode;
        rowDOM.parentElement.removeChild(rowDOM);
        
    }

}