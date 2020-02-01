export class allUsers {

    constructor (){
        this.categoriesPage = [{
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
    this.usersPage = null;
    this.userd = import ("./alluser.js");
    console.log(this.new.then(data => data.loadCat()));

    }

}