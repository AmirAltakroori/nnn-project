/*
    NNN website.

    This file is part of the NNN website.

    Authors:
        Qusai Hroub <qusaihroub.r@gmail.com>
        Aseel Arafeh <arafehaseel@gmail.com>
        Amir Altakroori <ameertakrouri99@gmail.com>
        Latifa Masri <latifa.masri1998@gmail.com>

    File description: 
        This file contains routeList for home, details, categoies pages.
*/

let mvc = new Mvc();

let routeList = [
    {
        url: "/home",
        template: "/templates/home.html",
        controller: "/controllers/home.js",
        title: "home"
    },
    {
        url: "/details/:id",
        template: "/templates/details.html",
        controller: "/controllers/detailes.js",
        id: "",
        title: "details"
    },
    {
        url: "/categories/:id",
        template: "/templates/categories.html",
        controller: "/controllers/categories.js",
        id: "",
        title: "categories"
    },
    {
        url: "/notFound",
        template: "/templates/404.html",
        controller: "/controllers/404.js",
        title: "Page not found"
    }
];

mvc.addRouteList(routeList);
mvc.init();