








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

let changebutton = document.getElementById("edit-category-name");// for edit button 
let edit_modal = document.getElementById("edit-name-modal");//for modal
let saveIcon= document.getElementById("save-category-name");//button to save the new name
var span = document.getElementsByClassName("close")[0];
var myObj=[];
localStorage.setItem('storeObj', JSON.stringify(myObj));

document.onload = function(){
   
    changebutton.onclick = function() {
        edit_modal.style.visibility="visible";
    }

      saveIcon.onclick = function() {
        var newName=document.getElementById("newCategoryName").Value;//get the new name  
        myObj.push(newName);
        //here we must take the name of the category from the data base and then change the name of it to the new name .

      }

      span.onclick = function() {
        edit_modal.style.visibility = "hidden";
      }
      
}
