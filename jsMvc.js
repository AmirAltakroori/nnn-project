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
            (obj) =>
            {
                viewElement.innerHTML = obj.template;
                let temp = render(viewElement,new obj.controller[Object.keys(obj.controller)[0]]);
                viewElement.innerHTML = temp.innerHTML;
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
        id: "",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id/:titel/:ex",
        template: "/templates/home2.html",
        controller: "/controllers/home2.js",
        id: "",
        title: "شبكة الوحدة الإخبارية"
    }
];

let mvc = new Mvc();
mvc.addRouteList(routeList);
mvc.init();
mvc.update();