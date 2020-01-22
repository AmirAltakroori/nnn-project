/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com> ,
     Rahmeh Tartouri <Rahmeh.Tartouri@gmail.com>
     Suhair Shareef <suhairshareef1999@gmail.com>

     File description:
*/


let urgentNewsDiv = document.getElementById('urgent-content');
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

    urgentNewsDiv.innerHTML = "";
    for (let i = 0; i < urgentNews.length; i++) {

        let currentUrgentNew = `<a href="${urgentNews[i].path}">${urgentNews[i].title} </a>`;
        urgentNewsDiv.innerHTML += currentUrgentNew;

    }

} 



// JS for Category Sectio in home Page

const categoryTitleDiv = document.getElementById('title');
const categoryMainNewsDiv = document.getElementById('main-news');
const categorySubNewsDiv = document.getElementById('sub-news');
let categoryTitle;
let categoryMainNews = [];

showCategoryNews();

/*
    Get main News in Category

    @tparam

    @param

    @returns

    This function used to retrieve main news in category from database
*/
function getCategoryNews () {

// I'll rewrite this function when DB was ready.
    categoryTitle = [{
                        title:"الأخبار العالمية",
                        path:"#"
                     }]

    categoryMainNews = [{
                        title: " القوة الخامسة للطبيعة.. اكتشاف قد يفك لغز المادة المظلمة",
                        path: "#",
                        authorName: "admin",
                        publishedDate: "12/12/2019",
                        img:"src\view\img\img1.jpg",
                        SubDescription:"فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم فوز البرازيل بكأس العالم "
                       }];


}

/*
    Show News.

    @tparam

    @param

    @returns

    This function used to show the urgent news retrieved from database at Category Section in home bage
*/
function showCategoryNews () {

    getCategoryNews();
    categoryTitleDiv.innerHTML=`<div class="category-header-name"><a class="link" href="${categoryTitle.title}"></a></div>
                                <div class="category-read-more "><a class="read-more-btn" href=${categoryTitle.path}> المزيد &gt;</a></div>`;



    if(categoryMainNews.length > 0) {

        categoryMainNewsDiv.innerHTML=`<div class="category-main-image-div">
                                            <img id="category-image" src="${categoryMainNews[0].img}" alt="${categoryMainNews[0].title}">
                                        </div>
                                        <div class="category-main-title-and-date">
                                                <div class="category-main-title"><a class="link" href="${categoryMainNews[0].path}"></a></div>
                                                <div class="category-main-date">${categoryMainNews[0].publishedDate}</div>
                                        </div>
                                        <div class="category-main-details"></div>
                                        <a class="read-more-btn category-btn" href=${categoryMainNews[0].path}>اقرأ المزيد &gt;</a>`;



    categorySubNewsDiv.innerHTML="";

    for (let i = 0; i < 3; i++) {

        categorySubNewsDiv.innerHTML+=`<div class="category-content-random-item">
                                            <img class="category-img-rnd" id="category-image" src="${categoryMainNews[0].img}" alt="">
                                            <div class="category-randome-title"><a class="link" href="${categoryMainNews[0].path}">${categoryMainNews[0].title}</a> </div>
                                        </div>`;

    }
}

}
