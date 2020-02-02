let mvc = new Mvc();

let routeList = [

    {
        url: "/home",
        template: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "home"
    },
    {
        url: "/details/:newID",
        template: "/templates/details.html",
        controller: "/controllers/detailes.js",
        id: "",
        title: "details"
    },
    {
        url: "/details/:id",
        template: "/templates/details.html",
        controller: "/controllers/detailes.js",
        id: "",
        title: "details"
    },
    {
        url: "/categories/:id",
        template: "/templates/categories.html",
        controller: "/controllers/categories.js",
        id: "",
        title: "categories"
    }
];

mvc.addRouteList(routeList);
mvc.init();