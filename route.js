﻿let root = document.getElementById('root');
let $path, $routeParams = {}, $currentRoute = {};
let routeList = [
    {
        url: "/admin",
        templete: "/templates/admin.html",
        controller: "/controllers/admin.js",
        title: "صفحة المشرف"
    },
    {
        url: "/home",
        templete: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id",
        templete: "/templates/home1.html",
        controller: "/controllers/home1.js",
        id: "",
        title: "شبكة الوحدة الإخبارية"
    },
    {
        url: "/home/:id/:titel/:ex",
        templete: "/templates/home2.html",
        controller: "/controllers/home2.js",
        id: "",
        title: "شبكة الوحدة الإخبارية"
    }
];

function analyzeUrl() {
    let option, find = false;
    $path = "";
    $currentRoute = {};
    $routeParams = {};
    let url = window.location.href;
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
        $path = "";
        $routeParams = {};
        $currentRoute = {};
    }
}


// Routing function
function sendTo(path) {
    if(path[0] != "/") path = '/' + path;
    window.location.href = window.location.origin + "/index.html#" + path;
}

// TODO: Make this function to be async
function execOnChange() {
    analyzeUrl();
    loadDoc($currentRoute.templete, root);
    collectCustomAttributes(root);
    $apply();
    document.title = $currentRoute.title;
    document.getElementById('controller').src = $currentRoute.controller;
}

window.onhashchange = function () {
    execOnChange();
}

    
async function dynamicImport(path)
{
    const moduleSpecifier = path;
    const module = await import(moduleSpecifier);
    return module;
}

async function loadDoc(path)
{
    let promise = new Promise((resolve,reject) =>
    {
        let xmlhttp;
        //To be compatible with different browsers
        if (window.XMLHttpRequest) 
            xmlhttp = new XMLHttpRequest();
        else 
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        

        xmlhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
                resolve(this.responseText);
            
        };
        xmlhttp.open('GET',path, true);
        xmlhttp.send();
    });

    return await promise;
}

async function loadMvc(templatePath,controllerPath)
{
    let template;
    let controller;

    template = await loadDoc(templatePath);
    controller = await dynamicImport(controllerPath);

    return Promise.resolve({template,controller});
}

execOnChange();