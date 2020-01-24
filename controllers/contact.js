export class ContactController
{
    constructor()
    {
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
