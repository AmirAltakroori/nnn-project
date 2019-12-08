//Get the modal that opens when click on "إضافة فئة"
let modal = document.getElementsByClassName("createcategory-modal")[0];

// Get the button that opens the modal
let addbtn = document.getElementsByClassName("add-button")[0];

//Get close icon that close the modal
let span = document.getElementsByClassName("close")[0];

//Get the create button that will craete a new category 
let createbtn = document.getElementsByClassName("createcategory-btn")[0];

//Get input category from the input field 
let categoryName = document.getElementById("categoryname").value;

// When the user clicks the "اضافة فئة" button, open the modal 
addbtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on "انشاء", update actegories tabel with new category, close the modal and clear the input field
createbtn.onclick = function() {
  modal.style.display = "none";
  let tbody = document.getElementsByTagName('tbody')[0];
  let categoryName = document.getElementById("categoryname").value;
  let tr = document.createElement('tr');
  let row = `
  <tr class="user_info" >
    <td class="user_no">1</td>
    <td class="user_full">
        <span class="user_name">`+categoryName+`</span>
    </td>
    <td>
        <select class="selection">
            <option value="writer">فعالة</option>
            <option value="admin"> غير فعال</option>
        </select>
    </td>
    <td>
        <i class="fas fa-trash-alt delete_user"></i>
    </td>
  </tr>`
document.getElementById("categoryname").value = '';
tr.innerHTML = row;
tbody.appendChild(tr);


//add the entered category to db
//addCategory();
}

// When the user clicks on close icon, close the modal and clear the input field
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("categoryname").value = '';
}

// When the user clicks anywhere outside of the modal, close it and clear the input field
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("categoryname").value = '';
  }
}






//create category and store its information in the db 








/**
 * This function create to filter a categories when the user search
 */



const searchByCategory = () => {
    let filter = document.getElementById('search').value.toUpperCase();
    let content = document.getElementById('content');
    let tr = content.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];

        if (td) {
            let textValue = td.textContent || td.innerHTML;

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }


    }



}