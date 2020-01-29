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
        url: "/categories/:type/:id",
        template: "./templates/categories.html",
        controller: "/controllers/categories.js",
        title: "categories"
    },
    {
        url: "",
        template: "../templates/404.html",
        controller: "../controllers/404.js",
        title: "Page not found"
    }
];

mvc.addRouteList(routeList);
mvc.init();