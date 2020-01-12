export class Model {
    constructor() {
        // Import the $apply function
        let $apply = import("../templateRenderer.js")
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
