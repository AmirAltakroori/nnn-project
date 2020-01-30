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
        this.activeId = 0;
        this.activeRow = null;
        this.categoriesOnLoad = import("./categories.js");
        this.categoriesOnLoad.then(data => data.onLoad());
    }


    show(row, modelId, id) {
        let element = document.getElementById(modelId);
        element.className += " modal-active";
        this.activeRow = row;
        this.activeId = id;
    }

    hide(modelId) {
        let element = document.getElementById(modelId);
        element.classList.remove("modal-active");
    }

    showEditModal(modalId, row, id) {
        let modal = document.getElementById(modalId); //for modal
        modal.style.display = "flex";
        console.log(this.activeId);

        this.activeId = id;
        console.log(row);
        this.activeRow = row.parentElement.parentElement;
    }

}