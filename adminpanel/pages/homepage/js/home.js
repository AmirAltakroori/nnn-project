document.addEventListener("DOMContentLoaded" , function(){
    let newUserButton = document.getElementById('new_user');
    console.log(newUserButton.className);
    newUserButton.addEventListener('click' , function(){
        window.location = './../newuser/newuser.html';
    });

    let allUsersButton = document.getElementById('all_users');
    allUsersButton.addEventListener('click' , function(){
        window.location = './../allusers/allusers.html';
    });

    let allNewsButton = document.getElementById('all_news');
    allNewsButton.addEventListener('click' , function(){
        window.location = './../allnews/allnews.html';
    });

    let categoriesButton = document.getElementById('categories');
    categoriesButton.addEventListener('click' , function(){
        window.location = './../categories/categories.html';
    });

    let addNewButton = document.getElementById('add_new');
    addNewButton.addEventListener('click' , function(){
        window.location = './../addnewspage/addnewpage.html';
    });

    let approveNewsButton = document.getElementById('approve_news');
    approveNewsButton.addEventListener('click' , function(){
        window.location = './../newsapprove/newsapprove.html';
    });

    let myNewsButton = document.getElementById('my_news');
    myNewsButton.addEventListener('click' , function(){
        window.location = './../mynews/mynews.html';
    });
});
