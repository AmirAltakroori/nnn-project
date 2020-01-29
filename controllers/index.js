/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com> ,
     Rahmeh Tartouri <Rahmeh.Tartouri@gmail.com>
     Suhair Shareef <suhairshareef1999@gmail.com>

     File description:
*/

//Navbar section
let categoriesListDiv = document.getElementById('categories-list');
let categoriesList = [];

showCategories();

/*
    Get Urgent News.

    @tparam

    @param

    @returns

    This function used to retrieve categories in navbar from database
*/

function getCategoriesList () {

    // Rewrite this function when DB was ready.
    categoriesList = [{
                    title: "الصفحة الرئيسية",
                    path: "/home"
                      }, {
                    title: "تكنولوجيا",
                    path: "/category/teachnology"
                      }, {
                    title: "علوم",
                    path: "/category/science"
                      }, {
                    title: "ثقافة",
                    path: "/category/knowledge"
                      }, { 
                    title: "اقتصاد",
                    path: "/category/economy"
                      }, {
                    title: "رياضة",
                    path: "/category/sport"
                      }, {
                    title: "فن",
                    path: "/category/art"
                      }, {
                    title: "سياسة",
                    path: "/category/politics"
                      }, {
                    title: "موسيقى",
                    path: "/category/music"
                      }];

}

/*
    Show Urgent News.

    @tparam

    @param

    @returns

    This function used to show the nabar categories retrieved from database 
*/

function showCategories () {

    getCategoriesList();

    categoriesListDiv.innerHTML = `<li class="tab active"><a href="${categoriesList[0].path}">${categoriesList[0].title}</a></li>`;

    let currentCategory = "";

    for (let i = 1; i < categoriesList.length; i++) {

        let j;

        if (i > 6) {
            
            const readMore = document.createElement ("li");
            readMore.classList.add("tab","expand");
            readMore.innerHTML = `<a href=#>المزيد   <img class="expand-button" src="img/expand-button.png"></a>`;
            
            readMoreList = document.createElement ("ul");
            readMoreList.classList.add ("sub-menu");

            for (let j = i; j < categoriesList.length; j++){

                currentCategory = `<li class="sub-item"><a href="${categoriesList[j].path}">${categoriesList[j].title}</a></li>`;
                readMoreList.innerHTML += currentCategory;
            }
            i = j;
            readMore.appendChild (readMoreList);
            categoriesListDiv.appendChild (readMore);
        }

        else {
            
            currentCategory = `<li class="tab"><a href="${categoriesList[i].path}">${categoriesList[i].title}</a></li>`;
            categoriesListDiv.innerHTML += currentCategory;
        }

    }

} 


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
