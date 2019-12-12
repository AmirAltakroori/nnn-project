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
import { getRelatedCategoryNews } from '../model/categories'

function RelatedCategoryNews() {
    getRelatedCategoryNews();
    let NewsLi = document.createElement("li");
    NewsLi.setAttribute.Id = NewsInCategory.Id;
    for (let whereAddNew = 0; whereAddNew < Object.keys(NewsInCategory).length; whereAddNew++) {
        if (whereAddNew % 2 == 0) {
            news_li.innerHTML = `
             <p>${NewsInCategory.title}</p>
             <img src="${NewsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_left").appendChild(NewsLi);
        } else {
            NewsLi.innerHTML = `
             <p>${NewsInCategory.title}</p>
             <img src="${NewsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_right").appendChild(NewsLi);
        }
    }
}