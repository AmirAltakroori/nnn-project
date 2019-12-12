/*
*     NNN website.
*
*     This file is part of the NNN website.
*
*     Authors:diana mujahed <diana.muj98@gmail.com>
*
*     File description: this file contains the functions that fetch random news from the database
*/
const randomNewsDiv = document.getElementById('random-content');
let randomNews = [];

showRandomNews();

/*
    Get Random News.
         
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to retrieve random news from database 
*/ 
function getRandomNews () {

    // I'll rewrite this function when DB was ready.
    randomNews = [{
                    id:1,
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    img:"new.jpg",
                   
                  }, {
                    id:2,
                    title: "إلغاء امتحانات الفاينل لهذا العام",
                    img:"new.jpg ",
                    
                  }, {
                    id:3,
                    title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
                    img:"new.jpg ",
                    
                 }, {
                    id:4,
                    title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
                    img:"new.jpg ",
                   
                 }, {
                    id:5,
                    title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
                    img:"new.jpg ",
                   
                 }];

}

/*
    Show Random News.
     
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to show the random news retrieved from database 
*/
function showRandomNews () {

    getRandomNews();
    
    randomNewsDiv.innerHTML="";
    for (let i = 0; i < randomNews.length; i++) {

        let currentRandomNew = `
       
        <li class="card random-new" id="${randomNews[i].id}"> 
        <img src="${randomNews[i].img}" alt="">
        <a href="#">${randomNews[i].title} </a>
        
        </li>
        `;
        randomNewsDiv.innerHTML += currentRandomNew;

    }    

}