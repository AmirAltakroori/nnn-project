import { $apply } from '../templateRenderer.js';
export class Model
{
    constructor()
    {
        this.FirstName = "hello";
        setTimeout(() => {
            this.FirstName = "hi";
            $apply();
        }, 1000)
    }
}

