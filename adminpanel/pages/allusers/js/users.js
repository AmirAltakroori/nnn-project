export class alluserscontroller 
{
    constructor ()
    {
        this.usersPage = [{
            firstName: "وليد",
            lastName: "الجعبة",
            email: "Waleed@ppu.edu", //We want also to show the email
            isActive: 1,
            roleId: 1, // when we create a user its diffault role is writer which its id is 1
            id: 1,
        }, {
            firstName: "باسل",
            lastName: "العطاونة",
            email: "Basil@ppu.edu", //We want also to show the email
            isActive: 1,
            roleId: 2, // 2 its admin 
            id: 2,
        },
        {
            firstName: "ديما",
            lastName: "الحافظ",
            email: "deema@ppu.edu", //We want also to show the email
            isActive: 1,
            roleId: 3, // 2 its admin 
            id: 3,
        }, {
            firstName: "شيماء",
            lastName: "وزوز",
            email: "shaima@ppu.edu", //We want also to show the email
            isActive: 0, // its not active account.
            roleId: 1, // 2 its writer. 
            id: 4,
        }
    ];
        this.news = import('./alluser.js');

    }
}