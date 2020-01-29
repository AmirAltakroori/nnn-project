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

export class Category {

    pageTypesList = ["الاخبار العالمية", "رياضة", "وفيات", "مش وفيات"];


    constructor() {
        let indexType = mvc.routeParams.type;

        this.name = this.pageTypesList[Number(indexType)];
        this.randomNews = this.getRandomNewsList().slice(0, 5);
        this.listMainNews = this.getMainNewsList().slice(0, 3);

        this.mainNews = this.listMainNews[0];

        this.rightNewsInCategory = this.getRightNewsInCategory().slice(0, 5);
        this.liftNewsInCategory = this.getLiftNewsInCategory().slice(0, 5);

    }

    tryClick() {
        alert("sda");
        console.log(this.mainNews);
    }

    getData() { console.log('Got Data!'); }

    changeMainNews(news) {
        //     console.log(news);
        //   console.log(this.mainNews);
        // setMainNews(news)
        this.mainNews = news;
        alert(news.id);
        mvc.apply();
    }

    getMainNewsList() {
        return [{
                id: 4,
                title: "شباب يطا يتعادل سلبيا مع الخضر",
                content: "تالق فرسان يطا وضغط بشكل كبير خاصة في الشوط الاول واضاع العديد من الفرص لينتهي الشوط الاول بدون اهداف.",
                writer: "mohammad tamimi",
                createDate: "14/1/2017",
                attachments: "img/4.jpeg"
            },
            {
                id: 2,
                title: "الاسبوع الثامن: انتصارات للامعري وبلاطة والسموع",
                content: "القدس- معا- دائرة الاعلام بالاتحاد- وصلت مباريات الأسبوع الثامن من دوري المحترفين الى نهايتها ، بعد ان جرت مساء السبت 7/12/2019 ثلاث مباريات كانت كالتالي :الامعري واد النيص",
                writer: "not amir altakroori",
                createDate: "14/12/2019",
                attachments: "img/2.jpeg"
            },
            {
                id: 3,
                title: "الاعلامية الرياضية نعمه خضر: لا اتصور الدوري بدون شباب الخليل",
                content: "وتابعت الاعلامية المتميزة نعمه خضر، التي تفضل العمل بعيدا عن الشهرة والصخب الاعلامي، انها تعشق نادي شباب الخليل لدرجة لا توصف، واكدت انها لا تتصور الدوري الفلسطيني بدون نادي شباب الخليل، ووصفته بفاكهة الرياضة الفلسطينية، واعتبرت (نعمه خضر) جماهير شباب الخليل الأوسع والأمتع على مستوى الوطن،",
                writer: "ali tamimi",
                createDate: "14/1/2015",
                attachments: "img/3.jpeg"
            },

            {
                id: 1,
                title: "هلال القدس يلاقي فريق صور العماني بملحق كأس الاتحاد الاسيوي",
                content: "ككوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلوالالمبور - معا- الناطق الاعلامي تامر عبيدات- يلاقي ناديامثلين",
                writer: "amir altakroori",
                createDate: "14/12/2010",
                attachments: "img/1.jpeg"
            }
        ];
    }
    getRandomNewsList() {
        return [{
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
    getRightNewsInCategory() {
        return [{
            id: "1",
            title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            img: "img/new.jpg"
        }, {
            id: "2",
            title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            img: "img/new.jpg"
        }, {
            id: "3",
            title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            img: "img/new.jpg"
        }, {
            id: "4",
            title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            img: "img/new.jpg"
        }, {
            id: "5",
            title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
            img: "img/new.jpg"
        }];
    }

    getLiftNewsInCategory() {
            return [{
                id: "1",
                title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
                img: "img/new.jpg"
            }, {
                id: "2",
                title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
                img: "img/new.jpg"
            }, {
                id: "3",
                title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
                img: "img/new.jpg"
            }, {
                id: "4",
                title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
                img: "img/new.jpg"
            }, {
                id: "5",
                title: "دعوات لقطع الطرقات في اليوم الـ40 لانطلاق",
                img: "img/new.jpg"
            }];
        }
        // randomNewsDiv = document.getElementById('random-content');
        // randomNews = [];

    // showRandomNews();

    // /*
    //     Show Related category News.

    //     @tparam

    //     @param

    //     @returns

    //     This function used to show  the Related category News retrieved from database
    // */
    // relatedCategoryNews() {

    //     let newsInCategory = getDataNewsListrelated();
    //     for (let whereAddNew = 0; whereAddNew < Object.keys(newsInCategory).length; whereAddNew++) {
    //         let newsLi = document.createElement("li");
    //         newsLi.setAttribute.Id = newsInCategory[whereAddNew].Id;
    //         if (whereAddNew % 2 == 0) {
    //             newsLi.innerHTML = `
    //         <img src="${newsInCategory[whereAddNew].img}" alt="photo">
    //          <p>${newsInCategory[whereAddNew].title}</p>
    //          `
    //             document.getElementById("related_news_menu_left").appendChild(newsLi);
    //         } else {
    //             newsLi.innerHTML = `
    //         <img src="${newsInCategory[whereAddNew].img}" alt="photo">
    //          <p>${newsInCategory[whereAddNew].title}</p>
    //         `
    //             document.getElementById("related_news_menu_right").appendChild(newsLi);
    //         }
    //     }
    // }

    // /*
    //     Get Random News.

    //     @tparam

    //     @param

    //     @returns

    //     This function used to retrieve random news from database
    // */
    // getRandomNews() {

    //     // I'll rewrite this function when DB was ready.
    //     randomNews = [{
    //         id: 1,
    //         title: "الإضراب الشامل يعم مدينة الخليل في هذا اليوم",
    //         img: "img/new.jpg",

    //     }, {
    //         id: 2,
    //         title: "إلغاء امتحانات الفاينل لهذا العام",
    //         img: "img/new2.png ",

    //     }, {
    //         id: 3,
    //         title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
    //         img: "img/new.jpg ",

    //     }, {
    //         id: 4,
    //         title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
    //         img: "img/new2.png",

    //     }, {
    //         id: 5,
    //         title: "اجتماع فريق ألفا يعقد مساء هذا اليوم الساعة الثامنة ",
    //         img: "img/new.jpg ",

    //     }];

    // }

    // /*
    //     Show Random News.

    //     @tparam

    //     @param

    //     @returns

    //     This function used to show the random news retrieved from database
    // */
    // showRandomNews() {

    //     getRandomNews();

    //     randomNewsDiv.innerHTML = "";
    //     for (let i = 0; i < randomNews.length; i++) {

    //         let currentRandomNew = `

    //     <li class="card random-new" id="${randomNews[i].id}">
    //     <img src="${randomNews[i].img}" alt="">
    //     <a href="#">${randomNews[i].title} </a>

    //     </li>
    //     `;
    //         randomNewsDiv.innerHTML += currentRandomNew;

    //     }
    // }

}