let path ,param=[];
let routeList = [
    {
        url: "/admin",
        templete: "View/admin.html",
        contriller : ""
    },
    {
        url: "/home",
        templete: "View/h1ome.html",
        contriller : ""
    },
    {
        url: "/home/:id",
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

function getURL() {
    let path="" ,option ,find = false;
    let url = window.location.href;
    url = url.substr(url.search("html")+6).split("/");
    let root = url[0];
    param=[];
    url.splice(0,1);
    routeList.forEach(route =>{
        option = route.url.substr(route.url.search("/")+1).split("/:");
        if (root == option[0] && url.length == (option.length-1)){
            find = true;
            path = option[0];
            option.splice(0,1);
            param=[];
            option.forEach((element , index)=> {
                param[element] = url[index];
            });
        }  
    });
    if (find == false) {
        path = "";
        param = [];
    }
    console.log("Path : "+path);
    console.log("Param : ");
    console.log(param);
}   