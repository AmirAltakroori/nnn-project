export class ContactController
{
    constructor()
    {
        this.FirstName = "hello";
        this.arr2d = [10,20];
        setTimeout(() => {
            this.FirstName = "JAJAJJAJ";
            this.arr2d = [10,20,40];
            mvc.renderByID();
        }, 1000);
    }

    testFunction() {
        console.log('hi');
    }
}
