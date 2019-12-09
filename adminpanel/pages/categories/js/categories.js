
document.addEventListener('DOMContentLoaded', function (e) {

  //Get the modal that opens when click on "إضافة فئة"
  let modal = document.getElementById("createcategory-modal");
  //Get the button that opens the modal
  let addBtn = document.getElementsByClassName("add-button")[0];
  
  //Get close icon that close the modal
  let span = document.getElementById("close");
  
  //Get the create button that will craete a new category 
  let createBtn = document.getElementById("createcategory-btn");
  
  //When the user clicks on "انشاء", update actegories tabel with new category
  let addForm = document.getElementById("category-form");
  addForm.addEventListener("submit", (e) => {

      
      let tbody = document.getElementsByTagName('tbody')[0];
      let categoryName = document.getElementById("categoryname").value;
      let tr = document.createElement('tr');
      let row = `
      <tr class="user_info" style="width:100%; font-family:"Segoe UI"">
        <td class="user_no" style="font-size:30px">1</td>
        <td class="user_full">
            <span class="user_name" style="font-size:18px">`+categoryName+`</span>
        </td>
        <td>
            <select class="selection" style="font-size:18px; border:none; font-family:"Segoe UI"">
                <option value="writer">فعالة</option>
                <option value="admin"> غير فعال</option>
            </select>
        </td>
        <td>
            <i class="fas fa-trash-alt delete_user" style="font-size:20px; color:red; text-align:center; cursor:pointer"></i>
            <i class="far fa-edit icon color-blue"></i>
        </td>
      </tr>`
      tr.innerHTML = row;
      tbody.appendChild(tr);
      hideModal(modal.id);
      e.preventDefault();
      return false;
  });
 
  //When the user clicks "إضافة فئة" , show the modal 
  addBtn.onclick = function() {
    showModal(modal.id);
  }
  //When the user clicks close icon , close the modal
  span.onclick = function() {
    hideModal(modal.id);
  }
  //When the user clicks anywhere outside of the modal, close it 
  window.onclick = function(event) {
    if (event.target == modal ) {
        hideModal(modal.id);
    }
  }
  
});

function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.getElementById("categoryname").value = '';
}

function hideModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// check if the entered name for the category is empty and alert the user
/*function ValidationEvent(){
  if(document.getElementById("categoryname").value = ""){
    alert("You must enter a name for the category");
    return false;
  }
  return true;
}*/




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