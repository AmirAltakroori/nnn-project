/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     diana mujahed <diana.muj98@gmail.com>
 *     ibrahim abusamarah
 *     Amir Altakroori
 *
 *     File description: this file contains the controller class of category page which applies potato MVC framework
 */

export class Category {

    pageTypesList = ["الاخبار العالمية", "رياضة", "وفيات", "مش وفيات"];

    constructor() {

        // Access page type number from url
        let indexType = mvc.routeParams.type;

        // Get page type name
        this.name = this.pageTypesList[Number(indexType)];

        // Initialize main news section
        this.listMainNews = this.getMainNewsList().slice(0, 3);
        this.mainNews = this.listMainNews[0];

        // Initialize random news and guarantee that the number of news is 5
        this.randomNews = this.getRandomNewsList().slice(0, 5);

        // Initialize related news with same category and guarantee that the number of each news list is 5
        this.rightNewsInCategory = this.getRightNewsInCategory().slice(0, 5);
        this.liftNewsInCategory = this.getLiftNewsInCategory().slice(0, 5);

    }

    /*
        Void function that receives news object of main news from view page
        and set the value of main news function with same receives value

        @tparam news: news object

        @param: identifier for needed news

        @returns: 
    */
    changeMainNews(news) {
        this.mainNews = news;
        $apply();
    }

    /*
        Test function that returns list of main news data
        
        @tparam:

        @param:

        @returns: array of news objects
     */
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

    /*
        Test function that returns list of random news data
        
        @tparam:

        @param:

        @returns: array of news objects
     */
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

    /*
        Test function that returns list of right related news data
        
        @tparam:

        @param:

        @returns: array of news objects
     */
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

    /*
        Test function that returns list of lift related news data
        
        @tparam:

        @param:

        @returns: array of news objects
     */
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
}