const idSelector = (id) => { return document.getElementById(id) };

function getData(storeName) {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function saveData(storeName, data) {
    sessionStorage.setItem(storeName, JSON.stringify(data));
}


document.addEventListener("DOMContentLoaded", (event) => {
    let userData = getData("userData");

    let newElement = idSelector("edit_element");
    const addForm = idSelector("submit-form");

    if (userData != null) {
        newElement.innerHTML = "تعديل";

        let form = {
            "firstname": idSelector("fname"),
            "lastname": idSelector("lname"),
            "email": idSelector("email")
        }

        form.firstname.value = userData.firstName;
        form.lastname.value = userData.lastName;
        form.email.value = userData.email;

        addForm.addEventListener("submit", (e) => {
            // extract the cuurent data from the form
            userData.firstName = form.firstname.value;
            userData.lastName = form.lastname.value;
            userData.email = form.email.value;
            saveData('userData', userData);
            //  save to database
            window.location.href = "../allusers/allusers.html";

            e.preventDefault();;
            return false;
        });

    }
});