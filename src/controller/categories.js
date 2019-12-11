/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors: ibrahim abusamarah
 *
 *     File description: this file contains the functions that fetch Related news category from the database
 */

/*
    Show Related category News.
     
    @tparam 
     
    @param 
     
    @returns 
    
    This function used to show  the Related category News retrieved from database 
*/

function related_category_news() {
    getRelated_category_news();
    for (let i = 0; i < Object.keys(NewsInCategory).length; i++) {
        if (whereAddNew % 2 == 0) {
            var news_li = document.createElement("li");
            news_li.setAttribute.Id = NewsInCategory.Id;
            news_li.innerHTML = `
             <p>${NewsInCategory.title}</p>
             <img src="${NewsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_left").appendChild(news_li);
        } else {
            var news_li = document.createElement("li");
            news_li.setAttribute.Id = NewsInCategory.Id;
            news_li.innerHTML = `
             <p>${NewsInCategory.title}</p>
             <img src="${NewsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_right").appendChild(news_li);
        }
    }
}