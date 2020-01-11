export function analyzeUrl(url,routeList) 
{
    let option ,find = false;
    let $path = "", $routeParams={} , $currentRoute ={};
    url = url.substr(url.search("#")+2).split("/");
    let root = url[0];
    url.splice(0,1);
    
    routeList.forEach(route =>{
        option = route.url.substr(route.url.search("/")+1).split("/:");
        if (root == option[0] && url.length == (option.length-1)){
            find = true;
            $path = option[0];
            option.splice(0,1);
            $routeParams={};
            option.forEach((element , index)=> {
                $routeParams[element] = url[index];
            });
            $currentRoute=route;
        }  
    });
 
    if (find == false) 
    {
        return null;
    }

    return {$path,$routeParams,$currentRoute};
}

async function dynamicImport(path)
{
    const moduleSpecifier = path;
    try 
    {
        const module = await import(moduleSpecifier);
        return module;
    } catch (error) 
    {
        console.log(path + " doesnt exist");
        return null;
    } 
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
        

        xmlhttp.onload = function()
        {
            resolve(xmlhttp.responseText); 
        };
        xmlhttp.onerror = () => {console.log(path + " doesnt exist"); reject()};
        xmlhttp.open('GET',path);
        xmlhttp.send();
    });

    return await promise;
}

export async function loadMvc(templatePath,controllerPath)
{
    let template;
    let controller;
    
    template = await loadDoc(templatePath);
    controller = await dynamicImport(controllerPath);
    console.log({template,controller});
    return Promise.resolve(template,controller);
}

