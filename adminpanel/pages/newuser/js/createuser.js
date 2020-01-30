
function createUser() {
    let form = document.getElementById('adduserid');
    form.addEventListener("submit", (e) => {
        let ConfirmedPassword = document.getElementById("confirmpassword").value;
        let password = document.getElementById("pass").value;
        if (ConfirmedPassword == password) {
            addUser();
        } else {
            showPopUp('warning');
        }
        e.preventDefault();
        return false;
    });
}

function addUser() {
    let user = {
        firstName: document.getElementById("Fname").value,
        lastName: document.getElementById("Lname").value,
        username: document.getElementById("Uname").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("pass").value,
        _id: document.getElementById("Uname").value,
        role: 1,
        state: 1,
        token: "",
    };
    document.getElementById("submitbtn").disabled = true;
    CreateUserDB(user).then((data) => {
        if (data.ok == true) {
            showPopUp('success');
            setTimeout(() => {
                window.location.href = "#/allusers";
            }, 2000);
        } else {
            document.getElementById("submitbtn").disabled = false;
        }
    });

}

function showPopUp(id) {
    let popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => {
        //  hidde th popup
        popup.style.display = "none";
    }, 2000);
}
function getId() {

    return dbGet("/settings", false, "users");
}

function CreateUserDB(data) {

    return new Promise((resolve, reject) => {
            dbCreateOrUpdate("/users", data, data.username).then()
        })
}
export { createUser }