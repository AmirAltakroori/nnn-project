let mvc = new Mvc();

let routeList = [{
        url: "/home",
        template: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "home"
    },
    {
        url: "/categories",
        template: "./templates/categories.html",
        controller: "/controllers/categories.js",
        title: "categories"
    },
    {
        url: "/categories/:type",
        template: "./templates/categories.html",
        controller: "/controllers/categories.js",
        title: "categories"
    }
];

mvc.addRouteList(routeList);
mvc.init();
