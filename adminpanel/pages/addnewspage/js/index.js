
document.addEventListener("DOMContentLoaded", function(e) {
    richTextEditor();
});
function richTextEditor(){
    let newsBody =  document.getElementById('editor');
    var options = {
        debug: 'info',
        placeholder: '',
        readOnly: false,
        theme: 'snow'
    };
    let editor = new Quill(newsBody, options);
    editor.format('direction', 'ltr');
    editor.format('align', 'right');

}








 