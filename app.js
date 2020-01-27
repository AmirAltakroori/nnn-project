import { Mvc } from './potato/dist/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [{
        url: "/",
        template: "/templates/index.html",
        controller: "/controllers/index.js",
        title: "Home"
    },

    {
        url: "/details",
        template: "/templates/details.html",
        controller: "/controllers/detailesClass.js",
        title: "new"
    }
];


mvc.addRouteList(routeList);
mvc.init();