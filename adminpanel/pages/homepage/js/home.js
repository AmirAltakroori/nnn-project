
// perform home page functionality when the page is totally loaded
document.addEventListener("DOMContentLoaded" , function(){

    // function to show new user page
    let newUserButton = document.getElementById('new_user');
    console.log(newUserButton.className);
    newUserButton.addEventListener('click' , function(){
        window.location = './../newuser/newuser.html';
    });

    // function to show all user page
    let allUsersButton = document.getElementById('all_users');
    allUsersButton.addEventListener('click' , function(){
        window.location = './../allusers/allusers.html';
    });

    // function to show all news page
    let allNewsButton = document.getElementById('all_news');
    allNewsButton.addEventListener('click' , function(){
        window.location = './../allnews/allnews.html';
    });

    // function to show categories page
    let categoriesButton = document.getElementById('categories');
    categoriesButton.addEventListener('click' , function(){
        window.location = './../categories/categories.html';
    });

    // function to show add news page
    let addNewButton = document.getElementById('add_new');
    addNewButton.addEventListener('click' , function(){
        window.location = './../addnewspage/addnewpage.html';
    });

    // function to show news approve page
    let approveNewsButton = document.getElementById('approve_news');
    approveNewsButton.addEventListener('click' , function(){
        window.location = './../newsapprove/newsapprove.html';
    });

    // function to move to my news page
    let myNewsButton = document.getElementById('my_news');
    myNewsButton.addEventListener('click' , function(){
        window.location = './../mynews/mynews.html';
    });
});
