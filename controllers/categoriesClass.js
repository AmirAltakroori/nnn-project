/*
     NNN website.

     This file is part of the NNN website.

     Authors:
     Latifa Masri

     File description:
*/
export class details {
    constructor() {
        // this.relatedNews = [1, 2, 3];
        this.items = [5, 10, 20, 25, 255];
        this.relatedNews = [{
            id: 1,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات الحوسبة السحابية   للوزارة ، وهو العطاء الذي مُنح لشركة مايكروسوفت",
            path: "#"
        }, {
            id: 2,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات   الحوسبة السحابية للوزارة، وهو العطاء الذي مُ نح لشركة مايكروسوفت ",
            path: "#"

        }, {
            id: 3,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات  الحوسبة السحابية للوزارة، وهو العطاء الذي مُ نح لشركة مايكروسوفت ",
            path: "#"
        }, {
            id: 4,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات   الحوسبة السحابية للوزارة، وهو العطاء الذي مُ نح لشركة مايكروسوفت ",
            path: "#"
        }, {
            id: 5,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات   الحوسبة السحابية  للوزارة، وهو العطاء الذي مُ نح لشركة مايكروسوفت ",
            path: "#"
        }, {
            id: 6,
            title: " لبنان.. دعوات لقطع الطرقات في اليوم الـ40 لانطلاق الاحتجاجات ",
            img: "new.jpg",
            newsContent: " اعلنت شركة أمازون الأميركية أنها تقاضي وزارة الدفاع (بنتاغون) بسبب استثنائها  من عطاء بقيمة عشرة مليارات دولار لتقديم ما يسمى خدمات  الحوسبة السحابية   للوزارة ، وهو العطاء الذي مُنح لشركة مايكروسوفت",
            path: "#"
        }];


    }

    // const relatedNewsList = document.getElementById('related-news');
    // const newsContents = document.getElementById('news');
    // const newArticle = document.getElementById('article');
    // let relatedNews = [];

    // showRelatedNews();

    /*
        Get Related News.
             
        @tparam 
         
        @param 
         
        @returns 
        
        This function used to retrieve urgent news from database 
    */
    getRelatedNews() {

        // I'll rewrite this function when DB was ready.

    }

    /*
        Show Related News.
         
        @tparam 
         
        @param 
         
        @returns 
        
        This function used to show the Related news retrieved from database that have the same category of clicked new at related News list
    */
    showRelatedNews() {

        getRelatedNews();

        relatedNewsList.innerHTML = "";
        for (let i = 0; i < relatedNews.length; i++) {

            let currentRelatedNew = `<li><a href="${RelatedNews[i].path}"><img src="${relatedNews[i].img}" alt="image"><p>${RelatedNews[i].title}</p> </a></li>`;

            relatedNewsList.innerHTML += currentRelatedNew;

        }

    }

    /*
        Show New Article.
         
        @tparam 
         
        @param 
         
        @returns 
        
        This function used to show the Article news retrieved from database  when clicked on new
    */



    showNewsDetails() {
        getRelatedNews();

        newsContents.innerHTML = "";
        newArticle.innerHTML = "";
        for (let i = 0; i < relatedNews.length; i++) {

            let currentContentNew = `<h1>${relatedNews[i].title}</h1><figure class="main_img"><img src="${RelatedNews[i].img}" alt="image"></figure> `;
            newsContents.innerHTML += currentContentNew;

        }

        let currentNewsArticle = `<p>${relatedNews[i].newsContent}</p> `;
        currentNewsArticle.innerHTML += currentNewsArticle;
    }
}