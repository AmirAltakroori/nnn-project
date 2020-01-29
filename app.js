
let mvc = new Mvc();

let routeList = [
    {
        url: "/home",
        template: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/admin",
        template: "/templates/admin.html",
        controller: "/controllers/admin.js",
        title: "صفحة المشرف"
    },
    {
        url: "/contact",
        template: "/templates/contact.html",
        controller: "/controllers/contact.js",
        title: "صفحة المشرف"
    },
    {
        url: "/home/:id",
        template: "/templates/home1.html",
        controller: "/controllers/home1.js",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id/:titel/:ex",
        template: "/templates/home2.html",
        controller: "/controllers/home2.js",
        title: "شبكة الوحدة الإخبارية"
    }
];

mvc.addRouteList(routeList);
mvc.init();
