export class addnewsController {
    constructor() {
        //   Check role
        this.db = this.dynamicImport("./../../../js/backend.js").then(db => db.dbGet("/categories/_design/allcategories/_view/allcategories", true, "").then(cats => {
            this.categories = cats;
            mvc.apply();
            console.log(this.categories);

        }));
        this.editor = null;
        this.richTextEditor();
        this.newsList = [];
        this.newsImage = "";
        // console.log(this.new.then(data => data.init()));
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
        editor = new Quill(newsBody, options);

        editor.format('direction', 'ltr');
            }

}