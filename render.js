$index = document.getElementById('index');
$path = "view.html";
loadDoc($path, $index);


function loadDoc (routeObject, viewElement) {
    var xmlhttp;

    //To be compatible with different browsers
    if (window.XMLHttpRequest) {
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
}


