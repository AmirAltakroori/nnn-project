let users = [];
//Store array in database

document.addEventListener("DOMContentLoaded", function(e) {

    let form=document.getElementById('adduserid');
    form.addEventListener("submit", (e) => {
    ConfirmedPassword= document.getElementById("ConfirmPass").value;
    password= document.getElementById("pass").value;
    if(ConfirmedPassword == password){
        addUser();
        showModal1();
    }
    else{
        showModal2();
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

function showModal1(){
    let modal = document.getElementById('delete');
    modal.className += " modal-active";
    
}

function showModal2(){
    let modal = document.getElementById("warn");
    modal.className += " modal-active";
}
