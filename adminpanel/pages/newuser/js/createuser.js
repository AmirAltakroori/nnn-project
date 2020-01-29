
function createUser(){
    let form = document.getElementById('adduserid');
    console.log("ighjghjgjgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let ConfirmedPassword = document.getElementById("confirmpassword").value;
        let password = document.getElementById("pass").value;
        console.log("ighjghjgjgggggggggggggggg")
        if (ConfirmedPassword == password) {
            addUser();
            console.log("ighjghjgjg")
            
        } else {
            showPopUp('warning');
        }
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
        _id:document.getElementById("Uname").value,
        role:1,
        state:1,
        token:"",

    };
    document.getElementById("submitbtn").disabled = true;
    CreateUserDB(user).then( (data) => {
        console.log(data);
        if(data.ok == true){
        showPopUp('success');
        setTimeout(() => {
            window.location.href = "#/allusers";
        }, 2000);
        }else {
            document.getElementById("submitbtn").disabled = false;
        }
    });

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
            const id = request.counter + 1;
            request.userid = id;
            dbCreateOrUpdate("/users", data, data.username).then(response => {
                request.counter = request.counter + 1;
                dbCreateOrUpdate("/settings", request,request._id).then(response2 => {
                    resolve(response2);
                    console.log("Added");
                });
            })
        })
    })
}
export{ createUser }