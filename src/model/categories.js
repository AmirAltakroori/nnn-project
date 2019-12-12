/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors: Amir Altakroori
 *
 *     File description: File description: java script code for main section and right sidebar 
 *     in category page for normal user view.
 */

/*
    create news div in right sidbar in category page with it's childreens

    @tparam id: integer

    @param id: the identifier of the news's div which is needed to be in html file

    @returns news div
*/
function createNewsDivRightSidebar(id) {
    //create news's div
    let news = document.createElement("div");
    news.classList.add("news");
    news.setAttribute("id", ("right_news_id_" + id));

    //create img component
    let newsImage = document.createElement("img");

    //create the news deltails component
    let newsDeltails = document.createElement("p");

    news.appendChild(newsImage);
    news.appendChild(newsDeltails);

    return news;
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
    let selectedDiv = document.getElementById(divId);

    //get the selected news by identifier from the data base
    let selectedNews = getNewsById(newsId);

    //assume that we get news's image path by function 
    selectedDiv.getElementsByTagName[0]("img").setAttribute("src", selectedNews.imagePath);
    selectedDiv.getElementsByTagName[0]("img").setAttribute("alt", "news image");

    // fill news description
    // to be sure that the news's tilte doesn't exceed 15 characters
    let newsTitle = document.createTextNode(reduceTextChar(selectedNews.title, 15));
    selectedDiv.getElementsByTagName[0]("p").appendChild(newsTitle);
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
    Create news div in main section in category page with it's childreens

    @tparam

    @param

    @returns main news div
*/
function createNewsDivMainSection() {
    //create main news div
    let mainNews = document.createElement("div");
    mainNews.classList.add("main_category_section");
    mainNews.setAttribute("id", "main_news_category");

    //create main news children

    //create img component
    let newsImage = document.createElement("img");

    // create details div 
    let details = document.createElement("div");
    details.classList.add("details");

    // create deltails children

    // create title div
    let title = document.createElement("h3");

    // create writingDetails div
    let writingDetails = document.createElement("div");
    writingDetails.classList.add("writing_details");

    //create writing details children

    // create writer div
    let writer = document.createElement("div");
    writer.classList.add("writer");

    // create calenderIcon div
    let calenderIcon = document.createElement("div");
    calenderIcon.classList.add("icon");
    calenderIcon.setAttribute("src", "#");
    calenderIcon.setAttribute("alt", "Calender Icon");

    // create newsDate div
    let newsDate = document.createElement("div");
    newsDate.classList.add("date");

    //compine writing details children in writingDetails div
    writingDetails.appendChild(writer);
    writingDetails.appendChild(calenderIcon);
    writingDetails.appendChild(newsDate);

    //compine deltails children in details div
    details.appendChild(title);
    details.appendChild(writingDetails);

    // create see more div
    let seeMore = document.createElement("div");
    seeMore.classList.add("see_more");

    //create seeMore children

    //create arrow icon div
    let arrowIcon = document.createElement("div");
    arrowIcon.classList.add("icon");
    arrowIcon.setAttribute("src", "#");
    arrowIcon.setAttribute("alt", "Arrow Icon");

    //create see more paragraph
    let see = document.createElement("p");
    let seeText = document.createTextNode("اقرأ المزيد");
    see.appendChild(seeText);

    //compine main news children in mainNews div
    seeMore.appendChild(arrowIcon);
    seeMore.appendChild(see);

    //compine main news children in mainNews div
    mainNews.appendChild(newsImage);
    mainNews.appendChild(details);
    mainNews.appendChild(seeMore);
    return mainNews;
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
    mainDiv.getElementsByTagName[0]("img").setAttribute("src", selectedNews.imagePath);
    selectedDiv.getElementsByTagName[0]("img").setAttribute("alt", "main news image");

    // fill news description
    // to be sure that the news's tilte doesn't exceed 15 characters
    let newsTitle = document.createTextNode(reduceTextChar(selectedNews.title, 15));
    selectedDiv.get.appendChild(newsTitle);
}