let categories=[
  {
      name:"الألعاب",
      isActive:1,
      id:1,
  },
  {
      name:"الرئيسية",
      isActive:1,
      id:2,
  },
  {
      name:"الرياضة",
      isActive:0,//غير مفعل
      id:3,
  },
  {
      name:"الفن",
      isActive:0,
      id:4,
  }
]









/**
 * This function create to filter a categories when the user search
 */



const searchByCategory = () => {
    let filter = document.getElementById('search').value.toUpperCase();
    let content = document.getElementById('content');
    let tr = content.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
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

let activeId=0;
let activeRow=null;
function showModal(modalId,row,id){
  let modal = document.getElementById(modalId);//for modal
  modal.style.display="block";
  
  activeId=id;
  activeRow=row.parentElement.parentElement;

}
function hideModal(modalId){
  let modal = document.getElementById(modalId);//for modal
  modal.style.display="none";

}

// TODO 
/*
  Write a function for update the name. updateName() down
  You have the entire row (tr) object stored in activeRow variable
  You have the id of the current object , see the variable categories above
  You need to get the object that match his id with activeId , hint use categories.find()
*/
function updateCategoryName()
{
  let newName = document.getElementById("newCategoryName").value;
  categories.find( ({ id }) => id === activeId ).name=newName;
  var changeName = document.getElementsByClassName("user_name")[activeId-1];
  changeName.innerHTML=newName;
  document.getElementById("newCategoryName").value="";
}



document.addEventListener('DOMContentLoaded', (e) => {

  let form=document.getElementById('category-modal-form');
  form.addEventListener('submit', (e) => {
    
     updateCategoryName();
    e.preventDefault();
    return false;
  });
});
