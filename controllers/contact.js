export class ContactController
{
    constructor()
    {
        let $apply;
        // Import the $apply function
        import("../potato/src/templateRenderer.js")
            .then(res => {
                let $apply = res.$apply;
            });
            
        this.FirstName = "hello";

        setTimeout(() => {
            this.FirstName = "JAJAJJAJ";
            $apply();
        }, 1000);
    }

    testFunction() {
        console.log('hi');
    }
}
