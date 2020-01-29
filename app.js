let mvc = new Mvc();

let routeList = [{
    url: "/categories/:type",
    template: "./templates/categories.html",
    controller: "/controllers/categories.js",
    title: "categories"
}];

mvc.addRouteList(routeList);
mvc.init();