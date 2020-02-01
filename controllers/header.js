
    /*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     diana mujahed <diana.muj98@gmail.com>
 *     Qusai Hroub <qusaihroub.r@gmail.com>
       Aseel Arafeh <arafehaseel@gmail.com>
 *
 *     File description: this file contains the controller class of the website header which applies potato MVC framework
 */

export class Header {

    
    constructor() {
   this.flag=false;

   this.urgentNews = [{
    title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
    path: "#"
  }, {
    title: "إلغاء امتحانات الفاينل لهذا العام",
    path: "#"
  }, {
    title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
    path: "#"
 }];


   this.categoriesList = [{
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

}