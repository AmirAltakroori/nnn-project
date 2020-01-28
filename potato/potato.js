let viewElement = document.querySelector('[view]');
let controllerObj = null;

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
                controllerObj = new obj.controller[Object.keys(obj.controller)[0]];
                controllerObj.routeParams = this.routeParams;
                render(viewElement, controllerObj);
            });
    }

    apply() {
        render(viewElement, controllerObj, true);
    }

    // clears the MVC
    clear() {
        this.controller = {};
        this.template = {};
    }
}

// Analyze the url and compare it with the route list 
function analyzeUrl(url, routeList) {
    let option, find = false;
    let $path = "", $routeParams = {}, $currentRoute = {};
    url = url.substr(url.search("#") + 2).split("/");
    let root = url[0];
    url.splice(0, 1);

    routeList.forEach(route => {
        option = route.url.substr(route.url.search("/") + 1).split("/:");
        if (root == option[0] && url.length == (option.length - 1)) {
            find = true;
            $path = option[0];
            option.splice(0, 1);
            $routeParams = {};
            option.forEach((element, index) => {
                $routeParams[element] = url[index];
            });
            $currentRoute = route;
        }
    });

    if (find == false) {
        return null;
    }

    return { $path, $routeParams, $currentRoute };
}

// Dynamicly import a component js file 
async function dynamicImport(path) {
    const moduleSpecifier = path;
    try {
        const module = await import(moduleSpecifier);
        return module;
    } catch (error) {
        console.log(path + " doesnt exist");
        return null;
    }
}

// Returns the data of an html file
async function loadDoc(path) {
    let promise = new Promise((resolve, reject) => {
        let xmlhttp;
        //To be compatible with different browsers
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');


        xmlhttp.onload = function () {
            resolve(xmlhttp.responseText);
        };
        xmlhttp.onerror = () => { console.log(path + " doesnt exist"); reject() };
        xmlhttp.open('GET', path);
        xmlhttp.send();
    });

    return await promise;
}

// Execute the above functions asynchronously
async function loadMvc(templatePath, controllerPath) {
    let template;
    let controller;
    template = await loadDoc(templatePath);
    controller = await dynamicImport(controllerPath);
    return Promise.resolve({ template, controller });
}


// Define global variables
let $scope = {};
let $testedSpecials = [];
let $bindedVars;
let cm = new Map();

// Classes
// Holds data required to a special atributes
class AttrData {
	constructor(query, render) {
		this.type = query.replace("\\", "").replace("\$", "");
		this.query = query;
		this.render = render;
	}
}

// Special attribute class
class SpecialAttr {
	constructor(type, element, render) {
		this.attr = type;
		this.element = element;
		this.exp = element.getAttribute("$" + type);
		this.render = render;
	}
}

//*********************************************************************//
//************************* Special Renders ***************************//
//*********************************************************************//

// Render function for "$if" special attribute 
function renderIf(expression, element) {
	try {
		let exp = expression.replace(/\$/g, "$scope.");
		createClass('hide', 'display: none');
		//check the expression in if attribute.  
		let result = eval(exp);
		//check if the expression true then the hide class will be removed if exist to display the element
		if (result) {
			if (element.classList.contains('hide')) {
				element.classList.remove('hide');
			}
		}
		//if false we will add hide class to hide the element.
		else {
			if (!element.classList.contains('hide')) {
				element.classList.add('hide')
			}
		}
	} catch (err) {
		console.log(err);
	}
}

let forid = 0;
let formap = new Map();
// Render function for "$for" special attribute 
function renderFor(exp, element) {
	try {
		// save and restore original date to be looped on
		let content = element.innerHTML;

		if (element.hasAttribute('data-forid')) {
			content = formap.get(element.getAttribute('data-forid'));
		}
		else {
			element.setAttribute('data-forid', forid);
			formap.set(forid + "", content);
			forid++;
		}

		// define the iteration symbol of this for loop
		let def = exp.split(':');
		let iterSymbol = 'i';
		if (def.length > 1)
			iterSymbol = def[1].trim();

		// define array and the element
		let subArr = def[0].split('of')[0].trim();
		let arrName = def[0].split('of')[1].trim();

		let array = eval('$scope.' + arrName);
		if (!array) return;
		let iterregx = new RegExp(`\\$` + iterSymbol + '(?![a-z])', 'g');

		let newElement = "";

		for (let i = 0; i < array.length; i++) {
			let template = content.replace(new RegExp("\[$]" + subArr, 'g'), "$" + arrName + `[${i}]`).replace(iterregx, i);
			let oldval = $scope[subArr];
			$scope[subArr] = array[i];

			var node = document.createElement("LI");
			node.innerHTML = template;
			renderTemplate(node);
			$apply(node);
			template = node.innerHTML;

			$scope[subArr] = oldval;
			newElement += template;
		}

		element.innerHTML = newElement;
	} catch (err) {
		console.log(err);
	}
}

// Render function for "$disabled" special attribute 
function renderDisabled(exp, element) {
	try {
		exp = exp.replace(/\$/g, "$scope.");
		let result = eval(exp);
		element.disabled = result;
	} catch (err) {
		console.log(err);
	}
}

// Render function for "$style" special attribute 
function renderStyle(exp, element) {
	let hashCode = function (str) {
		var hash = 0;
		if (str.length == 0) {
			return hash;
		}
		for (var i = 0; i < str.length; i++) {
			var char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash;
		}
		return hash;
	}

	let expGroup = exp.split(',');

	expGroup.forEach(ele => {
		let indx = ele.lastIndexOf(":");
		let e = [];
		e.push(ele.substring(0, indx).replace(/'/g, "").trim(), ele.substring(indx + 1).trim());

		let h = "mvc" + hashCode(e[0]);

		createClass(h, e[0]);

		renderClass(`${h} : ${e[1]}`, element);
	});
}

// Render function for "$class" special attribute 
function renderClass(exp, element) {
	exp = exp.replace(/\$/g, "$scope.");
	let expGroup = exp.split(',');

	expGroup.forEach(ele => {
		try {
			let splitStr = ele.split(":")
			let className = splitStr[0].replace(/'/g, "").trim();
			if (eval(splitStr[1]))
				element.classList.add(className);
			else
				element.classList.remove(className);
		} catch (err) {
			console.log(err);
		}
	}
	);
}

//Render function for "$click" special attribute.
function renderClick(exp, element) {
	try {
		exp = exp.replace(/\$/g, "$scope.");
		eventListener(element, 'click', () => { eval('$scope.' + exp); });
	} catch (err) {
		console.log(err);
	}
}

function renderModel(exp, element) {
	try {
		element.setAttribute('id', exp);
		element.setAttribute('value', $scope[exp]);
		eventListener(element, 'change', () => { $scope[exp] = document.getElementById(exp).value; });
	} catch (err) {
		console.log(err);
	}
}

//Render function for "$change" special attribute.
function renderChange(exp, element) {
	try {
		exp = exp.replace(/\$/g, "$scope.");
		eventListener(element, 'change', () => { eval('$scope.' + exp); });
	} catch (err) {
		console.log(err);
	}
}

//*********************************************************************//
//*********************************************************************//
//*********************************************************************//

// List of all special tags with their render functionality
const specails = [
	new AttrData("\\$for", renderFor),
	new AttrData("\\$if", renderIf),
	new AttrData("\\$disabled", renderDisabled),
	new AttrData("\\$style", renderStyle),
	new AttrData("\\$class", renderClass),
	new AttrData("\\$click", renderClick),
	new AttrData("\\$model", renderModel),
	new AttrData("\\$change", renderChange)
];

// Pulls special tags from a given html
function specialTags(doc) {
	let specialTags = [];

	// Find all special tags and format them
	for (let i = 0; i < specails.length; i++) {
		let elements = doc.querySelectorAll(`[${specails[i].query}]`);
		elements = [...elements].map(element => element = new SpecialAttr(specails[i].type, element, specails[i].render));
		specialTags = specialTags.concat(elements);
	}

	return specialTags;
}

// Executes {{exp}} using data of a model
function replaceElement(attrString) {
	let value = attrString.replace('$', "$scope.");
	value = eval(value);
	return value == undefined ? '' : value;
}

// Replace the binded variable with its real value in html
function $apply(doc) {
	let str;
	if (!doc) {
		str = $bindedVars;
		doc = viewElement;
	}
	else {
		str = doc.innerHTML;
	}
	str = str.replace(/(\{\{.*?\}\})/g, replaceElement);
	doc.innerHTML = str;
	return doc;
}

// Used by renderStyle
function createClass(name, attr) {
	if (cm.has(name))
		return;

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `.${name} { ${attr} }`;
	document.getElementsByTagName('head')[0].appendChild(style);

	cm.set(name, true);
}

// Used by renderFor
function renderTemplate(view) {
	let specials = specialTags(view);
	specials.forEach(element => {
		if ($testedSpecials.filter(elem => elem.element.isEqualNode(element.element) && elem.attr == element.attr).length == 0) {
			$testedSpecials.push(element);
			element.render(element.exp, element.element);
		}
	});
	$testedSpecials = [];
}

function render(view, model, update = false) {
	$scope = model;
	if (update) $apply();
	renderTemplate(view);
	$bindedVars = view.innerHTML;
	if (!update) $apply(view);
	return view;
}

function uniqueId() {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return '_' + Math.random().toString(36).substr(2, 9);
};

function eventListener(element, event, func) {
	let id;
	let elementID = element.getAttribute('id');
	if (elementID) {
		id = elementID;
	} else {
		id = uniqueId();
		element.setAttribute('id', id);
	}
	document.addEventListener(event, ev => {
		if (ev.target.getAttribute("id") != id) return;
		ev.preventDefault();
		func();
	});
};