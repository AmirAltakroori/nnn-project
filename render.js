console.log("ksfj");
$index = document.getElementById('index');
$path = "view.html";
loadDoc($path, $index);


function loadDoc (routeObject, viewElement) {
    console.log("lets start");
    var xmlhttp;

    if (window.XMLHttpRequest) {
        console.log("enter if(1)");
        xmlhttp = new XMLHttpRequest();
    } 
    else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            viewElement.innerHTML = this.responseText;
        }
      };

    xmlhttp.open('GET',routeObject, true);
    xmlhttp.send();

   
    console.log(xmlhttp);

}


