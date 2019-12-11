
let newsList=[];
const idSelector = (id) => { return document.getElementById(id) };

let newNews={
    title:"test is test ",
    content:"<h1>This is my first news</h1>",
    categoryId:1,
    seoTitle:"First news",
    seoTags:"{ 'tags':{['test','sport']} }",
    seoDescription:"This is my first news",
    isActive:1,
    isMainNews:0,
    isUrgentNews:1,
    createDate:"2019-12-11",
    writerId:1,
    _attachments:"",
    }
document.addEventListener("DOMContentLoaded", (event) => {

    let userData = sessionStorage.getItem("userData");
    userData = JSON.parse(userData);
    let newElement = idSelector("news_element");
    let editElement = idSelector("edit_element");
    let cancel = idSelector("cancel");
    if(userData!= null){

        let cuurentdata={
            "title": idSelector("title"),
            "editor": idSelector("editor"),
            "categoryId": idSelector("category"),
            "seoTitle": idSelector("seoTitle"),
            "seoTags": idSelector("seoTags"),
            "seoDescription": idSelector("seoDescription"),
            "isActive": idSelector("isActive"),
            "isMainNews": idSelector("isMainNews"),
            "isUrgentNews": idSelector("isUrgentNews"),
            "createDate": idSelector("createDate"),
        }
        cuurentdata.title.value = userData.title;
        cuurentdata.editor.innerHTML = userData.content;
        cuurentdata.categoryId.value = userData.categoryId;
        cuurentdata.seoTitle.value = userData.seoTitle;
        cuurentdata.seoTags.value = userData.seoTags;
        cuurentdata.seoDescription.value = userData.seoDescription;
        cuurentdata.isActive.checked = userData.isActive;
        cuurentdata.isMainNews.checked = userData.isMainNews;
        cuurentdata.isUrgentNews.checked = userData.isUrgentNews;
        cuurentdata.createDate.value = userData.createDate;

        newElement.style.display = "none";
        cancel.addEventListener("click",(e)=>{
            window.location.href = "../mynews/mynews.html";
            e.preventDefault();;
            return false;
        });
        editElement.addEventListener("click",(e)=>{
            createNew(userData.title, userData.content,userData.categoryId, userData.seoTitle ,
            userData.seoTags ,userData.seoDescription,userData.isActive,userData.isMainNews,
            userData.isUrgentNews,userData.createDate 
             );
    
        });
        
    }else{
        
        editElement.style.display = "none";
        cancel.style.display = "none";
        const addForm = idSelector("submit-form");
        addForm.addEventListener("submit", (e) => {
    
            if (createNew(idSelector("title").value, idSelector("editor").value, idSelector("cateqory").value, idSelector("seoTitle").value,
             idSelector("seoTags").value, idSelector("seoDescription").value, idSelector("isActive").value, idSelector("isMainNews").value,
              idSelector("isUrgentNews").value, idSelector("createDate").value,
             )) {
                showPopUp('pop-up', 'new is added', 'success');
    
            }
            e.preventDefault();;
            return false;
        });
    }

    
});


    function createNew(title, content, cateqory, seoTitle, seoTags, seoDescription, isActive,isMainNews,isUrgentNews,createDate) {
        let newNews={
            title: title,
            content: content,
            categoryId: cateqory,
            seoTitle: seoTitle,
            seoTags: seoTags,
            seoDescription: seoDescription,
            isActive: isActive,
            isMainNews: isMainNews,
            isUrgentNews: isUrgentNews,
            createDate: createDate
            }
        console.log(newNews.title);
       newsList.push(newNews);
        return true;
    }
    
 