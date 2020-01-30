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
        console.log(this.categoriesOnLoad.then(data => data.onLoad()));
    }
}