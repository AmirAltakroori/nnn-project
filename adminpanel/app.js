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
        url: "/adduser",
        template: "pages/newuser/newuser.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/newuser/js/index.js"


    },
    {
        url: "/categories",
        template: "pages/categories/categories.html",
        title: "شبكة الوحدة الإخبارية",
        controller: "/adminpanel/pages/categories/js/index.js"


    }

];

mvc.addRouteList(routeList);
mvc.init();