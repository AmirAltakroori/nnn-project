
let newsList=[];
const idSelector = (id) => { return document.getElementById(id) };

document.addEventListener("DOMContentLoaded", (event) => {


    const addForm = idSelector("submit-form");
    addForm.addEventListener("submit", (e) => {

        if (createNew(idSelector("title"), idSelector("editor"), idSelector("cateqory"), idSelector("seoTitle"),
         idSelector("seoTags"), idSelector("seoDescription"), idSelector("isActive"), idSelector("isMainNews"),
          idSelector("isUrgentNews"), idSelector("createDate"),
         )) {
            showPopUp('pop-up', 'new is added', 'success');

        }
        e.preventDefault();;
        return false;
    });
});


    function createNew(title, content, cateqory, seoTitle, seoTags, seoDescription, isActive,isMainNews,isUrgentNews,createDate) {
        let newNews={
            title: title.value,
            content: content.value,
            categoryId: cateqory.value,
            seoTitle: seoTitle.value,
            seoTags: seoTags.value,
            seoDescription: seoDescription.value,
            isActive: isActive.value,
            isMainNews: isMainNews.value,
            isUrgentNews: isUrgentNews.value,
            createDate: createDate.value
            }
        console.log(newNews.title);
       newsList.push(newNews);
        return true;
    }
    
 