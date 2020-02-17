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
        title: "شبكة الوحدة الإعلامية"
    },
    {
        url: "/details/:id",
        template: "/templates/details.html",
        controller: "/controllers/detailes.js",
        id: "",
        title: "شبكة الوحدة الإعلامية"
    },
    {
        url: "/categories/:id",
        template: "/templates/categories.html",
        controller: "/controllers/categories.js",
        id: "",
        title: "شبكة الوحدة الإعلامية"
    },
    {
        url: "/underMaintenance",
        template: "/templates/underMaintenance.html",
        controller: "/controllers/underMaintenance.js",
        title: "شبكة الوحدة الإعلامية"
    }
];

mvc.addRouteList(routeList);
mvc.init();
