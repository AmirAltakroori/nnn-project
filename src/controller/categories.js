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

function relatedCategoryNews() {
    getRelatedCategoryNews();
    let newsLi = document.createElement("li");
    newsLi.setAttribute.Id = newsInCategory.Id;
    for (let whereAddNew = 0; whereAddNew < Object.keys(newsInCategory).length; whereAddNew++) {
        if (whereAddNew % 2 == 0) {
            newsLi.innerHTML = `
             <p>${newsInCategory.title}</p>
             <img src="${newsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_left").appendChild(newsLi);
        } else {
            newsLi.innerHTML = `
             <p>${newsInCategory.title}</p>
             <img src="${newsInCategory.img}" alt="photo">`
            document.getElementById("related_news_menu_right").appendChild(newsLi);
        }
    }
}