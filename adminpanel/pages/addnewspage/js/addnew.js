
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

    const addForm = idSelector("submit-form");
    addForm.addEventListener("submit", (e) => {

        if (createNew(idSelector("title"), editor, idSelector("category"), idSelector("seoTitle"),
            idSelector("seoTags"), idSelector("seoDescription"), idSelector("isActive"), idSelector("isMainNews"),
            idSelector("isUrgentNews"), idSelector("createDate"),
        ));

        e.preventDefault();
        return false;
    });
});


function createNew(title, content, category, seoTitle, seoTags, seoDescription, isActive, isMainNews, isUrgentNews, createDate) {
    let newNews = {
        title: title.value,
        content: content.container.firstChild.innerHTML,
        categoryId: category.value,
        seoTitle: seoTitle.value,
        seoTags: seoTags.value,
        seoDescription: seoDescription.value,
        isActive: isActive.checked,
        isMainNews: isMainNews.checked,
        isUrgentNews: isUrgentNews.checked,
        createDate: createDate.disabled ? changeDateFormat(new Date()) : changeDateFormat(createDate.value),
        newsImage: newsImage,
    }
    console.log(newNews.title);
    newsList.push(newNews);
    return true;
}

function changeDateFormat(date) {
    if (typeof (date) == 'string')
        return date;
    return date.getFullYear() + "-" + date.getMonth() + "-" + (date.getDate() + 1);
}


function previewImg() {
    let preview = document.querySelector('.addnews-img-container img');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    let fr = new FileReader();
    if (file)
        preview.parentElement.style.display = "flex";
    else
    {
        preview.parentElement.style.display = "none";
        newsImage="";
        return false;
    }
    reader.readAsDataURL(file);

    fr.onload = function () {
        let image = fr.result;
        newsImage = image;
    };
    reader.onload = function () {
        preview.src = reader.result;


    };
    fr.readAsText(file, 'UTF-8');
}

