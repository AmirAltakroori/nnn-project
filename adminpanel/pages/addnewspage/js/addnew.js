
let newsList=[];
const idSelector = (id) => { return document.getElementById(id) };

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
            "cateqory": idSelector("cateqory"),
            "seoTitle": idSelector("seoTitle"),
            "seoTags": idSelector("seoTags"),
            "seoDescription": idSelector("seoDescription"),
            "isActive": idSelector("isActive"),
            "isMainNews": idSelector("isMainNews"),
            "isUrgentNews": idSelector("isUrgentNews"),
        "createDate": idSelector("createDate"),
        }
        for (ind in cuurentdata){
            console.log(ind);
        }
        newElement.style.display = "none";
        cancel.addEventListener("click",(e)=>{


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
    
 