let mvc = new Mvc();

let routeList = [
    {
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
        url: "/categories",
        template: "pages/categories/categories.html",
        title: "الفئات",
        controller: "/adminpanel/pages/categories/js/categoriescontroller.js"
    }
];

mvc.addRouteList(routeList);
mvc.init();