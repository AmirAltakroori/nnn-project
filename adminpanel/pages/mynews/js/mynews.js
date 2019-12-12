


let newNews=[{
    id:0,
    title:"test is test ",
    content:"<h1>This is my first news</h1>",
    categoryId:1,
    seoTitle:"First news",
    seoTags:"{ 'tags':{['test','sport']} }",
    seoDescription:"This is my first news",
    isActive:1,
    isMainNews:0,
    isUrgentNews:1,
    createDate:new Date(),
    writerId:1,
    _attachments:"",
    },
    {
        id:1,
        title:"test is test ",
        content:"<h1>This is my first news</h1>",
        categoryId:1,
        seoTitle:"First news",
        seoTags:"{ 'tags':{['test','sport']} }",
        seoDescription:"This is my first news",
        isActive:1,
        isMainNews:0,
        isUrgentNews:1,
        createDate:new Date(),
        writerId:1,
        _attachments:"",
        },
        {
            id:2,
            title:"test is test ",
            content:"<h1>This is my first news</h1>",
            categoryId:1,
            seoTitle:"First news",
            seoTags:"{ 'tags':{['test','sport']} }",
            seoDescription:"This is my first news",
            isActive:1,
            isMainNews:0,
            isUrgentNews:1,
            createDate:new Date(),
            writerId:1,
            _attachments:"",
            },

]

function updateNews(id){
    let aim = null;
for (ind of newNews)
    if (ind.id == id){
        aim = ind;
        break;
    }
    sessionStorage.setItem("userData",JSON.stringify(aim));
    window.location.href = "../addnewspage/addnewpage.html";
}


function searchByNews() {
    let searchInput, searchText, table, tableBody, tr, i, td, span, category;

    // get text from search input
    searchInput = document.getElementById('search');
    searchText = searchInput.value;

    // get all news  in the table body 
    table = document.getElementById('table');
    tableBody = document.getElementsByTagName("tbody")[0];
    tr = tableBody.getElementsByTagName('tr');

    // traverse through each new in the table
    for (i = 0; i < tr.length; i++) {
        // get category from each news element
        td = tr[i].getElementsByTagName('td')[2];
        span = td.getElementsByTagName('span')[0];
        category = span.childNodes[0].nodeValue;

        //check if the new category contain search text and filter the result
        if (category.indexOf(searchText) > -1)
            tr[i].style.display = "";
        else
            tr[i].style.display = "none";

    }
}