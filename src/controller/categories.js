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

/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     Qusai Hroub <qusaihroub.r@gmail.com>
 *     Amir Altakroori
 *     ibrahim abusamarah
 *
 *     File description:
 *     java script code for main section and right sidebar
 *     in category page for normal user view.
 */

class Categories {
    constructor() {
        this.id;
        this.name;
        this.isActive;
        this.createDate;
        this.userId;
    }
}


// just a test news data
function getDataNewsList() {
    return [{
            id: 1,
            title: "هلال القدس يلاقي فريق صور العماني بملحق كأس الاتحاد الاسيوي",
            content: "ككوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلين",
            writer: "amir altakroori",
            date: "14/12/2010",
            attachments: "img/1.jpeg"
        },
        {
            id: 2,
            title: "الاسبوع الثامن: انتصارات للامع65465655446465464646565465464ري وبلاطة والسموع",
            content: "القدس- معا- دائرة الاعلام بالاتحاد- وصلت مباريات الأسبوع الثامن من دوري المحترفين الى نهايتها ، بعد ان جرت مساء السبت 7/12/2019 ثلاث مباريات كانت كالتالي :الامعري واد النيص",
            writer: "not amir altakroori",
            date: "14/12/2019",
            attachments: "img/2.jpeg"
        },
        {
            id: 3,
            title: "الاعلامية الرياضية نعمه خضر: لا اتصور الدوري بدون شباب الخليل",
            content: "وتابعت الاعلامية المتميزة نعمه خضر، التي تفضل العمل بعيدا عن الشهرة والصخب الاعلامي، انها تعشق نادي شباب الخليل لدرجة لا توصف، واكدت انها لا تتصور الدوري الفلسطيني بدون نادي شباب الخليل، ووصفته بفاكهة الرياضة الفلسطينية، واعتبرت (نعمه خضر) جماهير شباب الخليل الأوسع والأمتع على مستوى الوطن،",
            writer: "ali tamimi",
            date: "14/1/2015",
            attachments: "img/3.jpeg"
        },
        {
            id: 4,
            title: "شباب يطا يتعادل سلبيا مع الخضر",
            content: "تالق فرسان يطا وضغط بشكل كبير خاصة في الشوط الاول واضاع العديد من الفرص لينتهي الشوط الاول بدون اهداف.",
            writer: "mohammad tamimi",
            date: "14/1/2017",
            attachments: "img/4.jpeg"
        }
    ];
}

/*
    search in database to find the news which has the same recived id 
    and returned it
    just work on tested data  

    @tparam id: integer

    @param: identifier for needed news

    @returns: news
*/
function getNewsById(newsId) {
    let newsList = getDataNewsList();
    let targetNews = "";
    newsList.forEach(news => {
        if (Number(newsId) == news.id) {
            targetNews = news;
        }
    });
    return targetNews;
}

/*
    Fill right sidebar div in category page from the news which bring from data base by id
    
    @tparam divId: string, newsId: integer

    @param divId: the identifier of the div which should be filled, 
    newsId: the identifier of the news which is needed to be filled in div which it's id is recived

    @returns
*/
function fillNewsDivRightSidebar(divId, newsId) {
    //get the selected div by id
    let selectedDiv = document.getElementById(divId + "");

    //get the selected news by identifier from the data base
    let selectedNews = getNewsById(newsId);

    //assume that we get news's image path by function 
    selectedDiv.getElementsByTagName("div")[0].style.backgroundImage = 'url(' + selectedNews.attachments + ')';

    // fill news description
    // to be sure that the news's tilte doesn't exceed 100 characters
    let newsTitleContainer = document.createElement("span");
    let newsTitle = document.createTextNode(reduceTextChar(selectedNews.title, 100));
    newsTitleContainer.appendChild(newsTitle);
    selectedDiv.getElementsByTagName("div")[0].appendChild(newsTitleContainer);
}

/*
    Fill right sidebar div in category page from the news which bring from data base by id
    
    @tparam divId: string, newsId: integer

    @param divId: the identifier of the div which should be filled, 
    newsId: the identifier of the news which is needed to be filled in div which it's id is recived

    @returns
*/
function fillNewsDivRightSidebar(divId, newsId) {
    //get the selected div by id
    let selectedDiv = document.getElementById(divId + "");

    //get the selected news by identifier from the data base
    let selectedNews = getNewsById(newsId);

    //assume that we get news's image path by function 
    selectedDiv.getElementsByTagName("div")[0].style.backgroundImage = 'url(' + selectedNews.attachments + ')';

    // fill news description
    // to be sure that the news's tilte doesn't exceed 100 characters
    let newsTitleContainer = document.createElement("span");
    let newsTitle = document.createTextNode(reduceTextChar(selectedNews.title, 100));
    newsTitleContainer.appendChild(newsTitle);
    selectedDiv.getElementsByTagName("div")[0].appendChild(newsTitleContainer);
}

/*
    To make the recived text does not exceed the recived number of characters and replace 
    the overflowed characters with "..."

    @tparam text: string, numberOfMaxChar: integer

    @param text: recived text which is needed to be reduced,
    numberOfMaxChar: number of maximum characters in the text 

    @returns: reduced text

*/
function reduceTextChar(text, numberOfMaxChar) {
    // when the length is sutable
    if (String(text).length <= numberOfMaxChar)
        return text;
    else
        return String(text).substring(0, numberOfMaxChar) + "...";
}

/*
    Fill main section div in category page from the news which bring from data base by id
    
    @tparam newsId: integer

    @param newsId: the identifier of the news which is needed to be filled in div which it's id is recived

    @returns
*/
function fillNewsDivMainSection(newsId) {
    //get the selected news by identifier from the data base
    let selectedNews = getNewsById(newsId);

    //assume that we get news's image path by function 
    document.getElementById("category_main_news_image").style.backgroundImage = 'url(' + selectedNews.attachments + ')';

    // fill news title
    document.getElementById("category_main_news_title").innerHTML = reduceTextChar(selectedNews.title, 70);

    // fill writing details which has writer name and news typing date
    let writingDetials = document.getElementById("category_main_news_writng_details");
    let writerName = document.createTextNode(selectedNews.writer);
    document.getElementById("category_main_news_writer").innerHTML = selectedNews.writer;
    document.getElementById("category_main_news_date").innerHTML = selectedNews.date;

    // fill news description
    // to be sure that the news's tilte doesn't exceed 100 characters
    document.getElementById("category_main_news_content_news").innerHTML = reduceTextChar(selectedNews.content, 100);
}

/*
    search in database to find the most three recent news 
    and it returned the indexes of them from the most resent  

    @tparam:

    @param:

    @returns: array of the three integer
*/
function getIdsOFMostThreeRecentNews() {
    // after some operations
    return [2, 4, 3];
}

/*
    action listner function that present the news details on main section news
    when the user click on a spacific news in right sidebar news

    @tparam: integer

    @param: the position of news in the div

    @returns:
*/
function showNewsInMainSectionFromDiv(position) {
    let mostRecentNewsList = getIdsOFMostThreeRecentNews();
    let newsId = mostRecentNewsList[position - 1];
    fillNewsDivMainSection(newsId);
}

/*
    give an initial values for each div's in main sectoin and right sidebar
    it just should be called when open the page in the first time
    @tparam:

    @param:

    @returns:
*/
function initialFillPage() {
    relatedCategoryNews();

    //get ids of most recent news to fill them in right sidebar
    let mostRecentNewsList = getIdsOFMostThreeRecentNews();

    //fill the news in the right sidebar from the recent news
    for (let position = 0; position < mostRecentNewsList.length; position += 1) {
        let divId = "category_rightside_news_id_" + (position + 1);
        let newsId = mostRecentNewsList[position];
        fillNewsDivRightSidebar(divId, newsId);
    }

    //fill main news from the most recent news is first news in mostRecentNewsList
    showNewsInMainSectionFromDiv(mostRecentNewsList[0]);
}
/*
    get data from database
    @tparam

    @param

    @returns

    This function used to get the Related news category  retrieved from database
*/
function getDataNewsListrelated() {
    return newsInCategory = [{
            "Id": "1",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            "img": "img/new.jpg"
        },
        {
            "Id": "2",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            "img": "img/new.jpg"
        },
        {
            "Id": "3",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            "img": "img/new.jpg"
        },
        {
            "Id": "4",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            "img": "img/new.jpg"
        },
        {
            "Id": "5",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            "img": "img/new.jpg"
        }
    ];
}

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