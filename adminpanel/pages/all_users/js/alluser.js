let users = [{
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

    let row = users.findIndex((row) => row.id == newId);
    users.splice(row, 1);
    let rowDOM = newContain.parentNode.parentNode;
    rowDOM.parentElement.removeChild(i);


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
