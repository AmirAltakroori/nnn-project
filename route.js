let param;
/*let routeList = [
    {
        url: "/Admin",
        templete: "View/admin.html",
        contriller : ""
    },
    {
        url: "/Home",
        templete: "View/home.html",
        contriller : ""
    },
    {
        url: "/home",
        templete: "View/h1ome.html",
        contriller : ""
    },
    {
        url: "/home/:id/:titel",
        templete: "View/h1ome.html",
        contriller : "",
        id:""
    },
    {
        url: "/home/:id/:titel/:ex",
        templete: "View/h1ome.html",
        contriller : "",
        id:""
    }
];
*/
function getURL() {
    
    let url =   window.location.href.replace('#', '');
    url = url.substr(url.search("html")+4);
    let cutentUrl;
    let root = url.split("/")[1];
    if (url.search(":") != -1){
        let value = url.substr(url.search(":")+1).split("/:");
        param = value;
        cutentUrl = routeList.filter(route =>{
            if (route.url.search(":") != -1){
                let option = route.url.split("/");
                return root == option[1] && value.length == (option.length-2);
            }
        });
    }else {
        cutentUrl = routeList.filter(route => route.url.split("/")[1] == root && route.url.split("/").length == 2);
    }    
}