/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     diana mujahed <diana.muj98@gmail.com>
 *     ibrahim abusamarah
 *
 *     File description: this file contains the functions that fetch Related news category from the database
 */
const randomNewsDiv = document.getElementById('random-content');
let randomNews = [];

showRandomNews()
initialFillPage()
    /*
        Show Related category News.

        @tparam

        @param

        @returns

        This function used to show  the Related category News retrieved from database
    */
function relatedCategoryNews() {

    let newsInCategory = getDataNewsListrelated();
    for (let whereAddNew = 0; whereAddNew < Object.keys(newsInCategory).length; whereAddNew++) {
        let newsLi = document.createElement("li");
        newsLi.setAttribute.Id = newsInCategory[whereAddNew].Id;
        if (whereAddNew % 2 == 0) {
            newsLi.innerHTML = `
            <img src="${newsInCategory[whereAddNew].img}" alt="photo">
             <p>${newsInCategory[whereAddNew].title}</p>
             `
            document.getElementById("related_news_menu_left").appendChild(newsLi);
        } else {
            newsLi.innerHTML = `
            <img src="${newsInCategory[whereAddNew].img}" alt="photo">
             <p>${newsInCategory[whereAddNew].title}</p>
            `
            document.getElementById("related_news_menu_right").appendChild(newsLi);
        }
    }
}

/*
    Get Random News.

    @tparam

    @param

    @returns

    This function used to retrieve random news from database
*/
function getRandomNews() {

    // I'll rewrite this function when DB was ready.
    randomNews = [{
        id: 1,
        title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
        img: "img/new.jpg",

    }, {
        id: 2,
        title: "إلغاء امتحانات الفاينل لهذا العام",
        img: "img/new2.png ",

    }, {
        id: 3,
        title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
        img: "img/new.jpg ",

    }, {
        id: 4,
        title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
        img: "img/new2.png",

    }, {
        id: 5,
        title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
        img: "img/new.jpg ",

    }];

}

/*
    Show Random News.

    @tparam

    @param

    @returns

    This function used to show the random news retrieved from database
*/
function showRandomNews() {

    getRandomNews();

    randomNewsDiv.innerHTML = "";
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