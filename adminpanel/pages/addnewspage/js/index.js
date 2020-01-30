export class addnewsController {
    previewImg() {
        console.log("T");
    }
    
    
    constructor() {
        
        this.newsId = mvc.routeParams.id;
        this.title = document.getElementsByClassName('title')[0];
        this.button = document.getElementsByClassName('button')[0];
        this.sub_header = document.getElementsByClassName('header-subheader')[0];
        if(this.newsId) {
            this.title.innerHTML = "تعديل خبر";
            this.button.innerHTML = "تعديل الخبر";
            this.sub_header.innerHTML = " الرئيسية > لوحة التحكم >الأخبار > تعديل خبر"
            this.fill(this.newsId);

        }
        this.new =
            import ("./addnew.js");
        this.richTextEditor();
        this.newsList = [];
        this.newsImage = "";

        console.log(this.new.then(data => data.init()));
    }

    fill(newsId) {
        let newItem;
        for(let news of allNewsPage) {
            if(news.id == newsId) {
                newItem = news;
                break;
            }
        }

        let form = {
            "title": document.getElementById("title"),
            "editor": document.getElementById("editor"),
            "categoryId": document.getElementById("category"),
            "seoTitle": document.getElementById("seoTitle"),
            "seoTags": document.getElementById("seoTags"),
            "seoDescription": document.getElementById("seoDescription"),
            "isActive": document.getElementById("isActive"),
            "isNotActive": document.getElementById("isNotActive"),
            "isMainNews": document.getElementById("isMainNews"),
            "isUrgentNews": document.getElementById("isUrgentNews"),
            "createDate": document.getElementById("createDate"),
        }

        form.title.value = newItem.title;
        editor.innerHTML = newItem.content;
        form.categoryId.value = newItem.categoryId;
        form.seoTitle.value = newItem.seoTitle;
        form.seoTags.value = newItem.seoTags;
        form.seoDescription.value = newItem.seoDescription;
        form.isActive.checked = newItem.isActive;
        form.isNotActive.checked = newItem.isActive;
        form.isMainNews.checked = newItem.isMainNews;
        form.isUrgentNews.checked = newItem.isUrgentNews;
        form.createDate.value = newItem.createDate;
        mvc.apply();
        console.log(newItem.title)
        console.log(form.title.value)
        
    }

    richTextEditor() {
        let newsBody = document.getElementById('editor');
        console.log(newsBody);
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
        // editor.format('align', 'right');
    }
}