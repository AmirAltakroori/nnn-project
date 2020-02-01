export class ContactController {
    constructor() {
        this.FirstName = "JAJAJJAJ";
        this.times = 0;
        this.x = true;
        this.arr2d = [
            { num: 10, active: true },
            { num: 20, active: true }
        ];

        console.log(this.times);
        setTimeout(() => {
            this.FirstName = "hello";
            this.arr2d.push({ num: 40, active: true });
            this.arr2d[1].active = false;
            this.x = false;
            this.times++;
            console.log(this.times);
            mvc.apply();
        }, 1000);

        setTimeout(() => {
            this.arr2d = [{ num: 11, active: true }];
            this.name = "Yassen karaki";
            this.times++;
            console.log(this.times);
            mvc.apply();
        }, 2000);

        setTimeout(() => {
            this.arr2d.push({ num: 22, active: true });
            this.arr2d[0].active = true;
            this.x = false;
            this.FirstName = "YAW YAW";
            this.times++;
            console.log(this.times);
            mvc.apply();
        }, 3000);
    }

    testFunction() {
        console.log('hi');
    }
}
