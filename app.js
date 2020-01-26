import { Mvc } from './potato/dist/jsMvc.min.js';

let mvc = new Mvc();

let routeList = [];

mvc.addRouteList(routeList);
mvc.init();