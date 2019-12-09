let newUserButton = document.getElementById('new_user');
let allUsersButton = document.getElementById('all_users');
let allNewsButton = document.getElementById('all_news');
let categoriesButton = document.getElementById('categories');
let addNewButton = document.getElementById('add_new');
let approveNewsButton = document.getElementById('approve_news');
let myNewsButton = document.getElementById('my_news');


document.addEventListener('load' , function(){
    newUserButton.addEventListener('click', showNewUserPage());
    allUserButton.addEventListener('click', showAllUsersPage());

});


function showNewUserPage(){
    window.location = './../newuser/newuser.html';
}

function showAllUsersPage(){
    window.location = './../allusers/allusers.html';
}

function showCategoriesPage(){

}

function showAllNewsPage(){

}

function showAddNewsPage(){

}

function showApproveNewsPage(){

}

function showMyNewsPage(){

}