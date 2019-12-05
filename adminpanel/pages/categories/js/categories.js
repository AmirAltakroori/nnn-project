








/**
 * This function create to filter a categories when the user search
 */



const SearchFun = () => {
    let filter = document.getElementById('search').value.toUpperCase();
    let content = document.getElementById('content');
    let tr = content.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];

        if (td) {
            let textValue = td.textContent || td.innerHTML;

            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }


    }



}