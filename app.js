import { Mvc } from './potato/dist/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [

    {
        url: "/home",
        template: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "home"
    },
    {
        url: "/details",
        template: "/templates/details.html",
        controller: "/controllers/detailes.js",
        title: "details"
    }
];


mvc.addRouteList(routeList);
mvc.init();