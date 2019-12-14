/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com> ,
     Rahmeh Tartouri <Rahmeh.Tartouri@gmail.com>

     File description:
*/


const urgentNewsDiv = document.getElementById('urgent-content');
let urgentNews = [];

showUrgentNews();

/*
    Get Urgent News.
         
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to retrieve urgent news from database 
*/ 
function getUrgentNews () {

    // I'll rewrite this function when DB was ready.
    urgentNews = [{
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    path: "#"
                  }, {
                    title: "إلغاء امتحانات الفاينل لهذا العام",
                    path: "#"
                  }, {
                    title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
                    path: "#"
                 }];

}

/*
    Show Urgent News.
     
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to show the urgent news retrieved from database at urgent bar
*/
function showUrgentNews () {

    getUrgentNews();
    
    urgentNewsDiv.innerHTML="";
    for (let i = 0; i < urgentNews.length; i++) {

        let currentUrgentNew = `<a href="${urgentNews[i].path}">${urgentNews[i].title} </a>`;
        urgentNewsDiv.innerHTML += currentUrgentNew;

    }    

} 



// JS for Category Sectio in home Page 

const categoryMainNewsDiv = document.getElementById('');
const categorySubNewsDiv = document.getElementById('');
let categoryMainNews = [];

showCategoryMainNews();

/*
    Get main News in Category
         
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to retrieve main news in category from database 
*/ 
function getCategoryMainNews () {

    // I'll rewrite this function when DB was ready.
    categoryMainNews = [{
                        title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                        path: "#",
                        authorName: "admin",
                        publishedDate: "12/12/2019",
                        img:"news.jpg",
                        SubDescription:"",
                        description:""
                       }];

}

/*
    Show News.
     
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to show the urgent news retrieved from database at Category Section in home bage
*/
function showCategoryMainNews () {
 
    getCategoryMainNews();
    categoryMainNewsDiv.innerHTML="";
    if(categoryMainNews.length > 0) {
 
        let currentCategoryMainNewsPath = `<a href="${categoryMainNews[0].path}"></a>`;
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsPath;
        let currentCategoryMainNewsTitle = `<a href="${categoryMainNews[0].path}">${categoryMainNews[0].title} </a>`; 
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsTitle;
        let currentCategoryMainNewsAuther = `<p>${categoryMainNews[0].authorName} </p>`;
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsAuther;
        let currentCategoryMainNewsPublishedDate = `<p>${categoryMainNews[0].publishedDate} </p>`;
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsPublishedDate;
        let currentCategoryMainNewsImgage = `<img src="${categoryMainNews[0].img}"/>`; 
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsImgage;
        let currentCategoryMainNewsDescription = `<p>${categoryMainNews[0].SubDescription} </p>`;
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsDescription;
 
    }
    
    categorySubNewsDiv.innerHTML="";
    for (let i = 1; i < categoryMainNews.length(); i++) {
 
        let currentCategoryMainNewsTitle = `<a href="${categoryMainNews[i].path}">${categoryMainNews[0].title} </a>`; 
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsTitle;
        let currentCategoryMainNewsPublishedDate = `<p>${categoryMainNews[i].publishedDate} </p>`;
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsPublishedDate;
        let currentCategoryMainNewsImgage = `<img src="${categoryMainNews[i].img}"/>`; 
        categoryMainNewsDiv.innerHTML += currentCategoryMainNewsImgage;
 
 
    }    
 
}
