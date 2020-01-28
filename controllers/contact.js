export class ContactController
{
    constructor()
    {
        // Import the $apply function
        let $apply = import("../potato/dist/templateRenderer.min.js")
            .then(res => {
                $apply = res.$apply;
            });
            
        this.FirstName = "hello";
        setTimeout(() => {
            this.FirstName = "JAJAJJAJ";
            $apply();
        }, 1000);
    }
}
