let viewElement = document.querySelector('[view]');

class routeObj {
    constructor(title, route, template, controller) {
        // pathes
        this.title = title;
        this.controller = c;
        this.route = r;
        this.template = t;
        this.routeParams = {};
    }
}

class Mvc {
    constructor() {
        this._routeMap = [];
        this.controller = {};
        this.template = {};
        this.defaultRoute = "";
    }

    addRoute(title, controller, route, template) {
        this._routeMap = this._routeMap.push(new routeObj(title, route, template, controller));
    }

    addRouteList(list) {
        this._routeMap = this._routeMap.concat(list);
    }

    init() {
        // get View Element
        viewElement = document.querySelector('[view]');
        // check if view element exists
        if (!viewElement) return;
        // set default wrote
        this.defaultRoute = { $currentRoute: this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]] };
        //update page when rute Changes
        window.onhashchange = this.update.bind(this);
        this.update();
    }

    update() {
        routeObj = analyzeUrl(window.location.href, this._routeMap); //get the route object        
        //Set to default route object if no route found
        if (!routeObj)
            routeObj = this.defaultRoute;

        this.routeParams = routeObj.$routeParams;
        document.title = routeObj.$currentRoute.title;

        loadMvc(routeObj.$currentRoute.template, routeObj.$currentRoute.controller)
            .then((obj) => {
                viewElement.innerHTML = obj.template;
                let controllerObj = new obj.controller[Object.keys(obj.controller)[0]];
                controllerObj.routeParams = this.routeParams;
                render(viewElement, controllerObj);
            });
    }

    renderByID(id)
    {
        
        if(!id)
            renderTemplate(viewElement,)
        else
            renderTemplate(document.getElementById(id));
        
        console.log("doing things to" + id);
    }

    // clears the MVC
    clear() {
        this.controller = {};
        this.template = {};
    }
}
