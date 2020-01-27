import { Mvc } from './potato/dist/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [{
    url: "/details/:id",
    template: "/templates/details.html",
    controller: "/controllers/detailesClass.js",
    id: "",
    title: "new"
}];


mvc.addRouteList(routeList);
mvc.init();