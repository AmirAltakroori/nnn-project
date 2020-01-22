export class HomeController
{
    constructor()
    {
        // testing
        this.x  = true ;
        this.items = [5,10,20,25,255];
        this.arr2d = [[10,20,30,40,50],[21,10,30]];

        // testing end
        this.Message = "hello";
        this.bgc = "redBack";
    }

    tryClick(x) {
        alert(x);
    }
}

