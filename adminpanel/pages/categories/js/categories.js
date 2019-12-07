
//Get the modal that opens when click on "إضافة فئة"
let modal = document.getElementsByClassName("createcategory-modal")[0];

// Get the button that opens the modal
let addbtn = document.getElementsByClassName("add-button")[0];

//Get close icon that close the modal
let span = document.getElementsByClassName("close")[0];

// Get the create button that will craete a new category 
let createbtn = document.getElementsByClassName("createcategory-btn")[0];

// When the user clicks the "اضافة فئة" button, open the modal 
addbtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on "انشاء", close the modal
createbtn.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks on close icon, close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function addCategory(){
  let categoryInput = document.getElementById("categoryname");
  let categoryName = categoryInput.value;
  console.log(categoryName);

  //write to db a new category with its name as entered name and set its status as active
}


//on category page load get categories from the db and show them in a table
function getCategories(){

}







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