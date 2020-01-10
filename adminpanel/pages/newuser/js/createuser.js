let users = [];
//Store array in database

document.addEventListener("DOMContentLoaded", function(e) {

    let form = document.getElementById('adduserid');
    form.addEventListener("submit", (e) => {
        ConfirmedPassword = document.getElementById("ConfirmPass").value;
        password = document.getElementById("pass").value;
        if (ConfirmedPassword == password) {
            addUser();
            showPopUp('success');
        } else {
            showPopUp('warning');
        }
        e.preventDefault();
        return false;
    });
});

function addUser() {
    let user = {
        firstname: document.getElementById("Fname").value,
        secondname: document.getElementById("Lname").value,
        username: document.getElementById("Uname").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("pass").value,
    };
    users.push(user);

}

function showPopUp(id) {
    let popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => {
        //  hidden th popup
        popup.style.display = "none";
    }, 2000);
}