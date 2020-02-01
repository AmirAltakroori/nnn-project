
export class addnewsController {

    constructor() {

        this.allNewsPage = [];
        this.newsId = mvc.routeParams.id;
        this.title = document.getElementsByClassName('title')[0];
        this.button = document.getElementsByClassName('button')[0];
        this.sub_header = document.getElementsByClassName('header-subheader')[0];
        if(this.newsId) {
            this.title.innerHTML = "تعديل خبر";
            this.button.innerHTML = "تعديل الخبر";
            this.sub_header.innerHTML = " الرئيسية > لوحة التحكم >الأخبار > تعديل خبر"
        }

        //Check role
        this.setScheduleTime();
        dynamicImport("./js/backend.js").then(db => {
            db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {
                this.categories = cats;
                this.categoryId = this.categories[0].id;
                mvc.apply();
                this.richTextEditor();
                console.log(this.categories);

            })

            db.dbGet("/news/_design/views/_view/allnews", true, "").then(news => {
                this.allNewsPage = news;
                mvc.apply();
                //console.log(this.allNewsPage);
                this.fill(this.newsId)
            })

            this.db = db;
        });
        
        this.writerId = JSON.parse(sessionStorage.getItem('user')).id;
        this.editor = null;
        this.newsList = [];
        this.newsImage = "";
        this.title = '';
        this.content = '';
        this.categoryId = '';
        this.seoTitle = '';
        this.seoTags = '';
        this.seoDescription = '';
        this.isActive;
        this.isMainNews = '';
        this.isUrgentNews = '';
        this.createDate = '';
        this.attachment = '';
        this.categories = [];
        this.submitted = false;
    }


    
    idSelector = (id) => { return document.getElementById(id) };

    fill(newsId) {
    
        for(let news of this.allNewsPage) {
            if(news.value._id == newsId) {
                this.newItem = news;
                break;
            }
        }                
        let form = {
            "title": document.getElementById("title"),
            "editor": document.getElementById("editor"),
            "categorye": document.getElementsByClassName("category")[0],
            "seoTitle": document.getElementById("seoTitle"),
            "seoTags": document.getElementById("seoTags"),
            "seoDescription": document.getElementById("seoDescription"),
            "isMainNews": document.getElementById("isMainNews"),
            "isUrgentNews": document.getElementById("isUrgentNews"),
            "createDate": document.getElementById("createDate"),
            "attachment": document.getElementById("picture")
        }
       
        form.title.value = this.newItem.value.title;
        editor.innerHTML = this.newItem.value.content;
        form.categorye.value = this.newItem.value.categoryId;
        form.seoTitle.value = this.newItem.value.seoTitle;
        form.seoTags.value = this.newItem.value.seoTags;
        form.seoDescription.value = this.newItem.value.seoDescription;
        if(this.newItem.value.isMainNews == "on") {
            form.isMainNews.checked = 1 ;}
        if(this.newItem.value.isUrgentNews == "on"){
            form.isUrgentNews.checked = 1;}
        form.createDate.value = this.newItem.value.createDate;
        form.attachment.value = this.newItem.value.attachment;
    }

    richTextEditor() {

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
        this.editor = new Quill(newsBody, options);

        this.editor.format('direction', 'ltr');

    }
    changeDateFormat(date) {
        if (typeof (date) == 'string')
            return date;
        let month = (date.getMonth() + 1) + '';
        if (month.length == 1)
            month = '0' + month;

        let day = (date.getDate()) + '';
        if (day.length == 1)
            day = '0' + day;

        return date.getFullYear() + "-" + (month) + "-" + (day);
    }


    setScheduleTime() {
        let createField = this.idSelector('createDate');
        let checkbox = this.idSelector('enable-checkbox');
        createField.disabled = !checkbox.checked;
        createField.value = this.changeDateFormat(new Date());
    }
    saveNews() {
        let btn = this.idSelector('submit-btn');
        btn.disabled = true;
        btn.style.fontSize = '15px';
        btn.innerHTML = "جاري ارسال الخبر";
        if (this.submitted)
            return;
        this.submitted = true;
        this.showPopUp("sending");
        if (this.createDate == '')
            this.createDate = this.changeDateFormat(new Date());
        let news = {
            title: this.title,
            content: this.editor.container.firstChild.innerHTML,
            categoryId: this.categoryId,
            seoTitle: this.seoTitle,
            seoTags: this.seoTags,
            seoDescription: this.seoDescription,
            isActive: 1,
            isMainNews: this.evalCheckbox(this.idSelector('isMainNews').checked),
            isUrgentNews: this.evalCheckbox(this.idSelector('isUrgentNews').checked),
            createDate: this.createDate,
            attachment: this.attachment,
            writerId: this.writerId,
            isApproved: 0,
        }
        this.CreateNews(news).then(resp => {
            this.showPopUp("success");
            setTimeout(() => window.location.href = "#/mynews", 1000);
        });
    }
    showPopUp(id) {
        let popup = document.getElementById(id);
        console.log(popup);
        popup.style.display = 'block';
        setTimeout(() => {
            //  hidde th popup
            popup.style.display = "none";
        }, 1000);

    }
    evalCheckbox(value) {
        console.log(value);
        if (value == 'on')
            return 1;
        else
            return 0;

    }

    previewImg() {
        let preview = document.querySelector('.addnews-img-container img');
        let file = document.querySelector('input[type="file"]').files[0];
        let reader = new FileReader();

        let fr = new FileReader();
        if (file)
            preview.parentElement.style.display = "flex";
        else {
            preview.parentElement.style.display = "none";
            this.attachment = "";
            return false;
        }
        reader.readAsDataURL(file);

        fr.onload = () => {
            let image = fr.result;
            this.attachment = image;
        };
        reader.onload = function () {
            preview.src = reader.result;


        };
        fr.readAsText(file, 'UTF-8');
    }

    getNewsId() {

        return this.db.dbGet("/settings", false, "news");
    }
    CreateNews(data) {

        return new Promise((resolve, reject) => {
            this.getNewsId().then(request => {
                const newsId = request.counter + 1;
                this.db.dbCreateOrUpdate("/news", data, newsId).then(response => {
                    request.counter = request.counter + 1;
                    this.db.dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                        resolve(response2);
                        console.log("Added");
                    });
                })
            })
        })
    }


}