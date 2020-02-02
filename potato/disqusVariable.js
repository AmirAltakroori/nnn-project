export function disqus_config(x) {
    let config = {
            language: 'ar',
            tpage: 'http://example.com/postid=' + x
        }
        // Replace PAGE_URL with your page's canonical URL variable this.page.identifier = 'postid=1'; // Replace PAGE_IDENTIFIER with your page's unique identifier
    console.log("Excecuted");
    localStorage.setItem('config', JSON.stringify(config));
};