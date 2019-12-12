
let newsList=[];
const idSelector = (id) => { return document.getElementById(id) };
let newNews={
    title:"test is test ",
    content:"ttt",
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

        let form={
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
        form.title.value = userData.title;
        form.editor.innerHTML = userData.content;
        form.categoryId.value = userData.categoryId;
        form.seoTitle.value = userData.seoTitle;
        form.seoTags.value = userData.seoTags;
        form.seoDescription.value = userData.seoDescription;
        form.isActive.checked = userData.isActive;
        form.isMainNews.checked = userData.isMainNews;
        form.isUrgentNews.checked = userData.isUrgentNews;
        form.createDate.value = userData.createDate;

        newElement.style.display = "none";

        cancel.addEventListener("click",(e)=>{
            window.location.href = "../mynews/mynews.html";
            e.preventDefault();;
            return false;
        });

        editElement.addEventListener("click",(e)=>{
            // extract the cuurent data from the form
            userData.title = form.title.value ;
            userData.content = form.editor.innerHTML;
            userData.categoryId = form.categoryId.value;
            userData.seoTitle = form.seoTitle.value ;
            userData.seoTags = form.seoTags.value ;
            userData.seoDescription = form.seoDescription.value ;
            userData.isActive = form.isActive.checked ;
            userData.isMainNews = form.isMainNews.checked;
            userData.isUrgentNews = form.isUrgentNews.checked ;
            userData.createDate  = form.createDate.value ;
            
            sessionStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = "../mynews/mynews.html";
            e.preventDefault();;
            return false;
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
    
 