//This object for create new account
let user = {
    firstName: "وليد",
    lastName: "الجعبة",
    username: "Waleed Jubeh",
    email: "Waleed@ppu.edu",
    password: "11111111",
    createDate: new Date(),
    isActive: 1,
    roleId: 1,// when we create a user its diffault role is writer which its id is 1
    token: "",
}


// for all users page
let users = [{
    firstName: "وليد",
    lastName: "الجعبة",
    email: "Waleed@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 1,// when we create a user its diffault role is writer which its id is 1
}, {
    firstName: "باسل",
    lastName: "العطاونة",
    email: "Basil@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 2,// 2 its admin 
},
{
    firstName: "ديما",
    lastName: "الحافظ",
    email: "deema@ppu.edu",//We want also to show the email
    isActive: 1,
    roleId: 3,// 2 its admin 
},{
    firstName: "شيماء",
    lastName: "وزوز",
    email: "shaima@ppu.edu",//We want also to show the email
    isActive: 0,// its not active account.
    roleId: 1,// 2 its writer. 
}];

// this object used to store created category before sending it to the database
let category={
    name:"الألعاب",
    isActive:1,
    createDate:new Date(),
    userId:1,//The id of the admin who creates the category
    id:3242,
};

// 
let categories=[
    {
        name:"الألعاب",
        isActive:1,
    },
    {
        name:"الرئيسية",
        isActive:1,
    },
    {
        name:"الرياضة",
        isActive:0,//غير مفعل
    },
    {
        name:"الفن",
        isActive:0,
    }
]

let newNews={
title:"test is test ",
content:"<h1>This is my first news</h1>",
categoryId:1,
seoTitle:"First news",
seoTags:"{ 'tags':{['test','sport']} }",
seoDescription:"This is my first news",
isActive:1,
isMainNews:0,
isUrgentNews:1,
createDate:new Date(),
writerId:1,
_attachments:"",
}