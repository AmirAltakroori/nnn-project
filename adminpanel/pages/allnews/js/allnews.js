let news = new Array();

var newContain;
var newId;
function show(e,id) {
    let f = document.getElementById('delete')
    f.className += " active";
    newContain = e;
    newId=id;
}

function hide() {
    let f = document.getElementById('delete')
    f.classList.remove("active");

}

function deleteRowElement() {

    let row = news.findIndex((row) => row.id == newId);
    news.splice(row, 1);
    var i = newContain.parentNode.parentNode;
    i.parentElement.removeChild(i);
    hide();

}
function deleteNews(callback, key, rev, row) {

    let fullUrl = URL + "news/" + key + "?rev=" + rev;
    let http = new XMLHttpRequest();
    http.open("DELETE", fullUrl);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            callback(JSON.parse(http.response));
            row.parentElement.removeChild(row);
        }
    }
}