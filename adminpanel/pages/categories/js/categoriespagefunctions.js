let categoriesList = [
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

let activeId = 0;
let activeRow = null;

function showModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
    document.getElementById("categoryname").value = '';
}

function hideModal(modalId) {
    let modal = document.getElementById(modalId); //for modal
    modal.style.display = "none";

}

function updateCategoryName() {
    let newName = document.getElementById("editcategoryname").value;
    categoriesList.find(({ id }) => { return id == activeId }).name = newName;
    var changeName = document.getElementsByClassName("user_name")[activeId - 1];
    changeName.innerHTML = newName;
    document.getElementById("editcategoryname").value = "";
}


function showEditModal(modalId, row, id) {
    let modal = document.getElementById(modalId); //for modal
    modal.style.display = "flex";

    activeId = id;
    activeRow = row.parentElement.parentElement;
}
