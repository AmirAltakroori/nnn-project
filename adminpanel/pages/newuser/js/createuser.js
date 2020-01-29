
function createUser(){
    let form = document.getElementById('adduserid');
    console.log("ighjghjgjgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    form.addEventListener("submit", (e) => {
        ConfirmedPassword = document.getElementById("ConfirmPass").value;
        password = document.getElementById("pass").value;
        console.log("ighjghjgjgggggggggggggggg")
        if (ConfirmedPassword == password) {
            addUser();
            console.log("ighjghjgjg")
            showPopUp('success');
        } else {
            showPopUp('warning');
        }
        e.preventDefault();
        return false;
    });
}

function addUser() {
    let user = {
        firstname: document.getElementById("Fname").value,
        secondname: document.getElementById("Lname").value,
        username: document.getElementById("Uname").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("pass").value,
    };
    users.push(user);
    CreateUserDB(user);

}

function showPopUp(id) {
    let popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => {
        //  hidden th popup
        popup.style.display = "none";
    }, 2000);
}
function getId() {

    return dbGet("/settings", false, "users");
}

function CreateUserDB(data) {

    return new Promise((resolve, reject) => {
        getId().then(request => {
            const Id = request.counter + 1;
            dbCreateOrUpdate("/users", data, Id).then(response => {
                request.counter = request.counter + 1;
                dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                    resolve(response2);
                    console.log("Added");
                });
            })
        })
    })
}
export{ createUser }