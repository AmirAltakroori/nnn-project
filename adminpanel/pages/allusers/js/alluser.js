let usersPage = [{
    firstName: "وليد",
    lastName: "الجعبة",
    email: "Waleed@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 1,// when we create a user its diffault role is writer which its id is 1
    id:1,
}, {
    firstName: "باسل",
    lastName: "العطاونة",
    email: "Basil@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 2,// 2 its admin 
    id:2,
},
{
    firstName: "ديما",
    lastName: "الحافظ",
    email: "deema@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 3,// 2 its admin 
    id:3,
},{
    firstName: "شيماء",
    lastName: "وزوز",
    email: "shaima@ppu.edu",//We want also to show the email
    isActive: 0,// its not active account.
    roleId: 1,// 2 its writer. 
    id:4,
}];

let newContain,newId=0;
function show(row,modelId, id) {
    let element = document.getElementById(modelId)
    element.className += " modal-active";
    newContain = row;
    newId = id;
}

function hide(modelId) {
    let element = document.getElementById(modelId)
    element.classList.remove("modal-active");

}

function deleteRowElement() {

    let row = usersPage.findIndex((row) => row.id == newId);
    usersPage.splice(row, 1);
    let rowDOM = newContain.parentNode.parentNode;
    rowDOM.parentElement.removeChild(rowDOM);


}

function searchByUserName() {
    let input, filter, rows, tr, name, i, txtValue;
    input = document.getElementById("userinput");
    filter = input.value.toUpperCase();
    rows = document.getElementById("rows");
    tr = rows.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++)
     {
        name = tr[i].getElementsByTagName("td")[1];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";// to hide the 
        }
    }
}
 ///////////.. function to read user from fake DB ../////////////////


function displayusers(users) {
    usersPage = users;
    let table = document.getElementById("rows"); 
    for (let i = 0; i < users.length; i++) {
        let row = document.createElement("tr"); //create number of rows by using DOM
        row.className = "user_info";
        let number = document.createElement("td");
        number.className = "user_no";
        number.textContent = i + 1;

        let name = document.createElement("td"); //create  column  for the name of users by using DOM
        name.className = "user_full";
        let name_text = document.createElement("span");
        name_text.className = "user_name allnews-title-limit";
        name_text.textContent = users[i].firstName + " " + users[i].lastName;
        name.appendChild(name_text);

       
        let role_selection = document.createElement("td"); // create role selection for users
        let select = document.createElement("select");
        select.className = "selection";

        let option1 = document.createElement("option");
        option1.value = 0;
        option1.textContent = "كاتب";
        let option2 = document.createElement("option");
        option2.value = 1;
        option2.textContent = "مشرف";
        let option3 = document.createElement("option");
        option3.value = 2;
        option3.textContent = "مسؤول";

        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);

        select.selectedIndex = !users[i].isActive;
        role_selection.appendChild(select);

        let active_selection = document.createElement("td"); // create activation select
        let selectA = document.createElement("select");
        selectA.className = "selection";

        let optionA1 = document.createElement("option");
        optionA1.value = 0;
        optionA1.textContent = "فعال";
        let optionA2 = document.createElement("option");
        optionA2.value = 1;
        optionA2.textContent = "غير فعال";
    

        selectA.appendChild(optionA1);
        selectA.appendChild(optionA2);
       
        selectA.selectedIndex = !users[i].isActive;
        active_selection.appendChild(selectA);

        let operations = document.createElement("td"); // create operation select
        let delete_icon = document.createElement("i");
        delete_icon.className = "fas fa-trash-alt delete_user";
        delete_icon.style.marginLeft= "10px";
        delete_icon.setAttribute('onclick', "show(this,'delete'," + users[i].id + ")");

        let edit_icon = document.createElement("i");
        edit_icon.className = "far fa-edit icon color-blue";


        operations.appendChild(delete_icon);
        operations.appendChild(edit_icon);

        row.appendChild(number);
        row.appendChild(name);
        row.appendChild(role_selection);
        row.appendChild(active_selection);
        row.appendChild(operations);

        table.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    displayusers(usersPage);
});


