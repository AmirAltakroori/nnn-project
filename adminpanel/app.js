import { Mvc } from './js/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [{
        url: "/home",
        template: "pages/homepage/home.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/homepage/js/home.js"
    },
    {
        url: "/addnews",
        template: "pages/addnewspage/addnewpage.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/addnewspage/js/index.js"


    },
    {
        url: "/allusers",
        template: "pages/allusers/allusers.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/allusers/js/alluser.js"
    }
];

mvc.addRouteList(routeList);
mvc.init();