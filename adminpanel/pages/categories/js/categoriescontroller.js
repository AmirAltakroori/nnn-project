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
        ]

        this.categoriesOnLoad = import("./categoriesonload.js");
        this.categoriesOnLoad.then(data => data.onLoad());
    }

    hideModal(modelId) {
        let modal = document.getElementById(modelId);
        modal.style.display = "none";
        modal.classList.remove("modal-active");
    }

    showEditModal(modalId, row, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";

        activeId = id;
        activeRow = row.parentElement.parentElement;
    }

    // show  modal for edit and create functions
    showModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "flex";
        modal.className += " modal-active";
        document.getElementById("categoryname").value = '';
    }

}