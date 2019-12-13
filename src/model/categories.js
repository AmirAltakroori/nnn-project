/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     Amir Altakroori
 *     ibrahim abusamarah
 *
 *     File description:
 *     java script code for main section and right sidebar
 *     in category page for normal user view.
 */

// just a test news data
function getDataNewsList() {
    return [{
            id: 1,
            title: "هلال القدس يلاقي فريق صور العماني بملحق كأس الاتحاد الاسيوي",
            content: "ككوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلين",
            writer: "amir altakroori",
            date: "14/12/2010",
            attachments: "images/1.jpeg"
        },
        {
            id: 2,
            title: "الاسبوع الثامن: انتصارات للامعري وبلاطة والسموع",
            content: "القدس- معا- دائرة الاعلام بالاتحاد- وصلت مباريات الأسبوع الثامن من دوري المحترفين الى نهايتها ، بعد ان جرت مساء السبت 7/12/2019 ثلاث مباريات كانت كالتالي :الامعري واد النيص",
            writer: "not amir altakroori",
            date: "14/12/2019",
            attachments: "images/2.jpeg"
        },
        {
            id: 3,
            title: "الاعلامية الرياضية نعمه خضر: لا اتصور الدوري بدون شباب الخليل",
            content: "وتابعت الاعلامية المتميزة نعمه خضر، التي تفضل العمل بعيدا عن الشهرة والصخب الاعلامي، انها تعشق نادي شباب الخليل لدرجة لا توصف، واكدت انها لا تتصور الدوري الفلسطيني بدون نادي شباب الخليل، ووصفته بفاكهة الرياضة الفلسطينية، واعتبرت (نعمه خضر) جماهير شباب الخليل الأوسع والأمتع على مستوى الوطن،",
            writer: "ali tamimi",
            date: "14/1/2015",
            attachments: "images/3.jpeg"
        },
        {
            id: 4,
            title: "شباب يطا يتعادل سلبيا مع الخضر",
            content: "تالق فرسان يطا وضغط بشكل كبير خاصة في الشوط الاول واضاع العديد من الفرص لينتهي الشوط الاول بدون اهداف.",
            writer: "mohammad tamimi",
            date: "14/1/2017",
            attachments: "images/4.jpeg"
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
    selectedDiv.getElementsByTagName("img")[0].setAttribute("src", selectedNews.attachments);
    selectedDiv.getElementsByTagName("img")[0].setAttribute("alt", "news image");

    // fill news description
    // to be sure that the news's tilte doesn't exceed 15 characters
    let newsTitle = document.createTextNode(reduceTextChar(selectedNews.title, 50));
    selectedDiv.getElementsByTagName("p")[0].appendChild(newsTitle);
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
    let mainDiv = document.getElementById("main_news_category");

    //get the selected news by identifier from the data base
    let selectedNews = getNewsById(newsId);

    //assume that we get news's image path by function
    document.getElementById("main_news_image").setAttribute("src", selectedNews.attachments);

    // fill news title
    document.getElementById("main_news_title").innerHTML = reduceTextChar(selectedNews.title, 70);

    // fill writing details which has writer name and news typing date
    let writingDetials = document.getElementById("writng_details");
    let writerName = document.createTextNode(selectedNews.writer);
    document.getElementById("writer").innerHTML = selectedNews.writer;
    document.getElementById("date").innerHTML = selectedNews.date;
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
    //get ids of most recent news to fill them in right sidebar
    let mostRecentNewsList = getIdsOFMostThreeRecentNews();

    //fill the news in the right sidebar from the recent news
    for (let position = 0; position < mostRecentNewsList.length; position += 1) {
        let divId = "right_news_id_" + (position + 1);
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
function getRelatedCategoryNews() {
    newsInCategory = [{
            "Id": "1",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق5555555",
            "img": "img/new.jpg"
        },
        {
            "Id": "2",
            "title": "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق5555555",
            "img": "img/new.jpg"
        }
    ];
}
