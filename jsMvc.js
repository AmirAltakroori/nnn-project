import { analyzeUrl, loadMvc } from './route.js';
import { render } from './templateRenderer.js';

let viewElement = document.querySelector('[view]');

class routeObj 
{
    constructor(title,route,template,controller)
    {
        // pathes
        this.title = title;
        this.controller = c;
        this.route = r;
        this.template = t;
    } 
}

class Mvc 
{
    constructor()
    {
        this._routeMap = [];
        this.controller = {};
        this.template = {};
        this.defaultRoute = "";
    }

    addRoute(title,controller, route, template) 
    {
        this._routeMap = this._routeMap.push(new routeObj(title,route,template,controller));
    }

    addRouteList(list)
    {
        this._routeMap = this._routeMap.concat(list);
    }

    init()
    {
        // get View Element
        viewElement = document.querySelector('[view]'); 
        // check if view element exists
        if (!viewElement) return; 
        // set default wrote
        this.defaultRoute = {$currentRoute:this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]]} ;
        //update page when rute Changes
        window.onhashchange = this.update.bind(this);
        this.update();
    }

    update()
    {
        routeObj = analyzeUrl(window.location.href,this._routeMap); //get the route object        
        //Set to default route object if no route found
        if (!routeObj)
            routeObj = this.defaultRoute;  

        document.title = routeObj.title;
        
        loadMvc(routeObj.$currentRoute.template,routeObj.$currentRoute.controller).then(
            (temp,cont) =>
            {
                temp = render(temp);
                viewElement.innerHTML = temp;
            }
        );

    }

   // clears the MVC
    clear()
    {
        this.controller = {};
        this.template = {};
    }
}


let routeList = [
    {
        url: "/contact",
        template: "/Views/admin.html",
        controller: "/Models/admin.js",
        title: "صفحة المشرف"
    },
    {
        url: "/home",
        template: "/Views/home.html",
        controller: "/Models/home222.js",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id",
        template: "/Views/home1.html",
        controller: "/Models/home1.js",
        id: "",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id/:titel/:ex",
        template: "/Views/home2.html",
        controller: "/Models/home2.js",
        id: "",
        title: "شبكة الوحدة الإخبارية"
    }
];

let mvc = new Mvc();
mvc.addRouteList(routeList);
mvc.init();
mvc.update();