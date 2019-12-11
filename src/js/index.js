/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Aseel Arafeh <arafehaseel@gmail.com> 

     File description:
*/


const urgentNewsDiv = document.getElementById('urgent-content');
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
    
    urgentNewsDiv.innerHTML="";
    for (let i = 0; i < urgentNews.length; i++) {

        let currentUrgentNew = `<a href="${urgentNews[i].path}">${urgentNews[i].title} </a>`;
        urgentNewsDiv.innerHTML += currentUrgentNew;

    }    

}
