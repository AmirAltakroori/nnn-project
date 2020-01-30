let newsList = [];
let newsImage = "";
let editor;
const idSelector = (id) => { return document.getElementById(id) };


function setScheduleTime() {
    let createField = idSelector('createDate');
    let checkbox = idSelector('enable-checkbox');
    createField.disabled = !checkbox.checked;
    createField.value = changeDateFormat(new Date());
}

function init() {

    let newsBody = document.getElementById('editor');

    let toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }], // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
        [{ 'direction': 'rtl' }], // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video', 'formula'], // add's image support
        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'] // remove formatting button
    ];
    let options = {
        debug: 'info',
        placeholder: '',
        readOnly: false,
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    };


    editor = new Quill(newsBody, options);

    editor.format('direction', 'ltr');

    console.log("Test");
    setScheduleTime();
    let userData = getData("userData");
    let createField = idSelector('createDate');

    let checkbox = idSelector('enable-checkbox');
    createField.disabled = !checkbox.checked;
    createField.value = changeDateFormat(new Date());
    let newElement = idSelector("edit_element");
    const addForm = idSelector("submit-form");
    let file = idSelector('picture');
    file.addEventListener("change", function(e) {
        previewImg();
    });
    //console.log("deema")
    if (userData != null) {
       // console.log("deema2")
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
            if (userData.pageNo == 0)
                window.location.href = "../mynews/mynews.html";
            else if (userData.pageNo == 1)
                window.location.href = "../allnews/allnews.html";
            e.preventDefault();;
            return false;
        });

    } else {
        addForm.addEventListener("submit", (e) => {

            e.preventDefault();
            if (createNew(idSelector("title").value, editor.container.firstChild.innerHTML, idSelector("category").value, idSelector("seoTitle").value,
                    idSelector("seoTags").value, idSelector("seoDescription").value, idSelector("isActive").value, idSelector("isMainNews").value,
                    idSelector("isUrgentNews").value, idSelector("createDate").value,
                ));
            e.preventDefault();
            return false;
        });
    }
};


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
        createDate: createDate,
        attachment: newsImage
    };
    console.log(newsImage);
    console.log(newNews.title);
    newsList.push(newNews);
    CreateNews(newNews).then(solved => {
        console.log(solved);
    })
    return true;
}


function changeDateFormat(date) {
    if (typeof (date) == 'string')
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

function getNewsId() {

    return dbGet("/settings", false, "news");
}

function CreateNews(data) {

    return new Promise((resolve, reject) => {
        getNewsId().then(request => {
            const newsId = request.counter + 1;
            dbCreateOrUpdate("/news", data, newsId).then(response => {
                request.counter = request.counter + 1;
                dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                    resolve(response2);
                    console.log("Added");
                });
            })
        })
    })
}
export { init, previewImg };