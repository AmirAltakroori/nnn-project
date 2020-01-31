let activeId = 0;
let activeRow = null;

function updateCategoryName() {
    let newName = document.getElementById("editcategoryname").value;
    categories.find(({ id }) => { return id == activeId }).name = newName;
    var changeName = document.getElementsByClassName("user_name")[activeId - 1];
    changeName.innerHTML = newName;
    document.getElementById("editcategoryname").value = "";
}

function showEditModal(modalId, row, id) {
    let modal = document.getElementById(modalId);
    modal.style.display = "flex";

    activeId = id;
    activeRow = row.parentElement.parentElement;
}

function hideModals(modalId) {
    let element = document.getElementById(modalId);
    element.style.display = 'none';
}
