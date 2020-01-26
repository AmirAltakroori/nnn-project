export class addnewsController {
    previewImg() {
        console.log("T");
    }
    constructor() {
        //   Check role
        this.new =
            import ("./addnew.js");
        this.richTextEditor();
        this.newsList = [];
        this.newsImage = "";

        console.log(this.new.then(data => data.init()));
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