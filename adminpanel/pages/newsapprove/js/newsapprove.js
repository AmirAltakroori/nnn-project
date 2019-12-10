
function searchByNewsApprove() {
    let input, filter, rows, tr, name, i, txtValue;
    input = document.getElementById("newsinput");
    filter = input.value.toUpperCase();
    rows = document.getElementById("rows");
    tr = rows.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++)
     {
        name = tr[i].getElementsByTagName("td")[1];
        txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";// to hide the 
        }
    }
}
