let newsList = [];
let newsImage = "";
const idSelector = (id) => { return document.getElementById(id) };


function setScheduleTime() {
    let createField = idSelector('createDate');
    let checkbox = idSelector('enable-checkbox');
    createField.disabled = !checkbox.checked;
    createField.value = changeDateFormat(new Date());
}
document.addEventListener("DOMContentLoaded", (event) => {
    setScheduleTime();
    let userData = getData("userData");
    let createField = idSelector('createDate');
    let checkbox = idSelector('enable-checkbox');
    createField.disabled = !checkbox.checked;
    createField.value = changeDateFormat(new Date());

    let newElement = idSelector("edit_element");
    const addForm = idSelector("submit-form");

    if (userData != null) {
        newElement.innerHTML = "تعديل";

        let form = {
            "title": idSelector("title"),
            "editor": editor,
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
        editor.container.firstChild.innerHTML = userData.content;
        form.categoryId.value = userData.categoryId;
        form.seoTitle.value = userData.seoTitle;
        form.seoTags.value = userData.seoTags;
        form.seoDescription.value = userData.seoDescription;
        form.isActive.checked = userData.isActive;
        form.isMainNews.checked = userData.isMainNews;
        form.isUrgentNews.checked = userData.isUrgentNews;
        form.createDate.value = userData.createDate;

        addForm.addEventListener("submit", (e) => {
            // extract the cuurent data from the form
            userData.title = form.title.value;
            userData.content = editor.container.firstChild.innerHTML;
            userData.categoryId = form.categoryId.value;
            userData.seoTitle = form.seoTitle.value;
            userData.seoTags = form.seoTags.value;
            userData.seoDescription = form.seoDescription.value;
            userData.isActive = form.isActive.checked;
            userData.isMainNews = form.isMainNews.checked;
            userData.isUrgentNews = form.isUrgentNews.checked;
            userData.createDate = form.createDate.value;

            saveData('userData', userData);

            window.location.href = "../mynews/mynews.html";
            e.preventDefault();;
            return false;
        });

    } else {
        addForm.addEventListener("submit", (e) => {

            if (createNew(idSelector("title").value, idSelector("editor").value, idSelector("cateqory").value, idSelector("seoTitle").value,
                    idSelector("seoTags").value, idSelector("seoDescription").value, idSelector("isActive").value, idSelector("isMainNews").value,
                    idSelector("isUrgentNews").value, idSelector("createDate").value,
                ));
            e.preventDefault();
            return false;
        });
    }

});

function createNew(title, content, cateqory, seoTitle, seoTags, seoDescription, isActive, isMainNews, isUrgentNews, createDate) {
    let newNews = {
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

function changeDateFormat(date) {
    if (typeof(date) == 'string')
        return date;
    return date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + 1);
}


function previewImg() {
    let preview = document.querySelector('.addnews-img-container img');
    let file = document.querySelector('input[type="file"]').files[0];
    let reader = new FileReader();

    let fr = new FileReader();
    if (file)
        preview.parentElement.style.display = "flex";
    else {
        preview.parentElement.style.display = "none";
        newsImage = "";
        return false;
    }
    reader.readAsDataURL(file);

    fr.onload = function() {
        let image = fr.result;
        newsImage = image;
    };
    reader.onload = function() {
        preview.src = reader.result;


    };
    fr.readAsText(file, 'UTF-8');
}