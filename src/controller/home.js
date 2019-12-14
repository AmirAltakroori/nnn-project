/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com>

     File description:
*/

 let mainNews = [];
 let slideIndex = 0;
 const mainNewDiv = document.getElementById('latest-news-more-detailed-container');
 const mainNewsDiv = document.getElementById('latest-news-list');

/*
    Get Main News.

    @tparam

    @param

    @returns

    This function used to retrieve the most 4 main news from database
*/
function getmainNews () {

    // I'll rewrite this function when DB was ready.... Query should retrive limited number of charachters :)
    mainNews = [{
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    path: "#",
                    authorName: "أسيل عرفه",
                    publishedDate: "12/12/2019",
                    img:"imge/firstNews.jpg",
                    description:"بسم الله الرحمن الرحيم ... هذا وصف الخبر "
                  }, {
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    path: "#",
                    authorName: "أسيل عرفه",
                    publishedDate: "12/12/2019",
                    img:"img/firstNews.jpg",
                    description:""
                  }, {
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    path: "#",
                    authorName: "أسيل عرفه",
                    publishedDate: "12/12/2019",
                    img:"img/firstNews.jpg",
                    description:""
                  }, {
                    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
                    path: "#",
                    authorName: "أسيل عرفه",
                    publishedDate: "12/12/2019",
                    img:"img/firstNews.jpg",
                    description:""
                  }];

}

/*
    Show Main News.

    @tparam

    @param

    @returns

    This function used to show the 4 main news retrieved from database at main section
*/
function showmainNews () {

    getmainNews();
    mainNewDiv.innerHTML="";
    if(mainNews.length > 0) {

        let currentMainNew = `<div class="latest-news-more-detailed-image-div">
                                <img class="latest-news-more-detailed-image" src="${mainNews[0].img}" width="620px" height="340px">
                            </div>
                            <div class="latest-news-more-detailed-title-and-date">
                                <div class="latest-news-more-detailed-title">
                                    <h4>${mainNews[0].title}</h4>
                                </div>
                                <div class="latest-news-more-detailed-date">
                                    <p>${mainNews[0].authorName}</p>
                                    <img src="img/calenderIcon.png" width="15px" height="15px">
                                    <p>${mainNews[0].publishedDate}</p>
                                </div>
                            </div>
                            <div class="latest-news-more-detailed-paragraph">
                                <p>${mainNews[0].description}</p>
                            </div>
                            <div class="latest-news-more-detailed-readmore-button">
                                <img src="img/arrowIcon.png" width="17px" height="17px">
                                <p>اقرأ المزيد</p>
                            </div>`;
        mainNewDiv.innerHTML += currentMainNew;

    }

    mainNewsDiv.innerHTML="";
    for (let i = 1; i < mainNews.length; i++) {

        let currentMainNew = `<div class="news" id="news${i}">
                                <img src="${mainNews[i].img}" width="170px" height="90px">
                                <p>${mainNews[0].title}</p>
                              </div>`;
        mainNewsDiv.innerHTML += currentMainNew;

    }

}

/*
 *    increment or decrement slider start index.
 *
 *    @tparam inc: integer.
 *
 *    @param inc: value of increment or decrement.
 *
 *    @returns
 */
function plusDivs(inc) {
    showDivs(slideIndex += inc);
}

/*
 *    Show Next 3 divs.
 *
 *    @tparam index: integer.
 *
 *    @param index is the start point.
 *
 *    @returns
 */
function showDivs(index) {
    let i;
    let newsTileList = document.getElementsByClassName("slider-news-tile");

    if (index > newsTileList.length - 3) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = newsTileList.length - 4;
    }

    for (i = 0; i < newsTileList.length; i++) {
        newsTileList[i].style.display = "none";
    }

    for (i = slideIndex; i < slideIndex + 3; i++) {
        newsTileList[i].style.display = "block";
    }
}
