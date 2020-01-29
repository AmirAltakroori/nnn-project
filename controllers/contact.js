export class ContactController {
    constructor() {
        this.FirstName = "hello";
        this.x = true;
        this.arr2d = [
            { num: 10, active: true },
            { num: 20, active: true }
        ];
        setTimeout(() => {
            this.FirstName = "JAJAJJAJ";
            this.arr2d.push({ num: 40, active: true });
            this.arr2d[1].active = false;
            this.x = false;
            mvc.apply();
        }, 1000);
    }

    testFunction() {
        console.log('hi');
    }
}
