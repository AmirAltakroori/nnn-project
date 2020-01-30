// TODO
// This file contains all functions that will be used to interact with the database are written here
// Please write here a generic functions that can be used everywhere
// Functions here written to perform the CRUD operation 
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh
function getData(storeName) {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function saveData(storeName, data) {
    sessionStorage.setItem(storeName, JSON.stringify(data));
}
let myNewsPage = [{
        id: 1,
        title: "test is test ",
        content: "<h1>This is my first news</h1>",
        categoryId: 1,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
    },
    {
        id: 2,
        title: "test is test ",
        content: "<h1>This is my first news</h1>",
        categoryId: 1,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
    },
    {
        id: 3,
        title: "test is test ",
        content: "<h1>This is my first news</h1><br><ul><li>ههههه</li></ul>",
        categoryId: 1,
        seoTitle: "First news",
        seoTags: "شسيشس شسيشس شسي شسي",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: "2019-05-12",
        writerId: 1,
        _attachments: "",
    },
    {
        title: "الاحلال يعتقل مقدسيا مسنا",
        content: "<h1>This is my first news</h1>",
        categoryId: 3,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 0,
        isMainNews: 1,
        isUrgentNews: 1,
        createDate: "2019-05-12",
        writerId: 1,
        _attachments: "",
        id: 4,
    },

];
let allNewsPage = [{
        title: "النصيرات أكثر المناطق هطولاً",
        content: "<h1>This is my first news</h1>",
        categoryId: 3,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 0,
        isMainNews: 0,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 1,
    },
    {
        title: "الالعاب الاولمبية قريبا",
        content: "<h1>This is my first news</h1>",
        categoryId: 2,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 1,
        isUrgentNews: 2,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 2,
    },
    {
        title: "أخبار الفن والفنانين والنجوم والمشاهير",
        content: "<h1>This is my first news</h1>",
        categoryId: 4,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 0,
        isUrgentNews: 0,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 3,
    },
    {
        title: "الاحلال يعتقل مقدسيا مسنا",
        content: "<h1>This is my first news</h1>",
        categoryId: 3,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 1,
        isMainNews: 1,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 4,
    },
    {
        title: "سلسلة العاب LEft 4 Dead تعود من جديد",
        content: "<h1>This is my first news</h1>",
        categoryId: 1,
        seoTitle: "First news",
        seoTags: "{ 'tags':{['test','sport']} }",
        seoDescription: "This is my first news",
        isActive: 0,
        isMainNews: 1,
        isUrgentNews: 1,
        createDate: new Date(),
        writerId: 1,
        _attachments: "",
        id: 5,
    }
];

function updateNews(id, page) {
    let aim = null;
    let aimData = null;

    if (page == 0)
        aimData = myNewsPage;
    else if (page == 1)
        aimData = allNewsPage;
    for (ind in aimData)
        if (aimData[ind].id == id) {
            aim = aimData[ind];
            aim["ind"] = ind;
            aim['pageNo'] = page;
            break;
        }
    sessionStorage.setItem("userData", JSON.stringify(aim));
    window.location.href = "../addnewspage/addnewpage.html";
}
let BASEURL = 'https://541e1dc0-354b-4134-ae7d-5eaa533a1bf9-bluemix.cloudant.com';
let AUTHENTICATION = 'Basic NTQxZTFkYzAtMzU0Yi00MTM0LWFlN2QtNWVhYTUzM2ExYmY5LWJsdWVtaXg6NDU2YjA3NzhjODFjOWNiMDk5NzZkODU1NjQ5MDM2YzRlYTE1MTQwZTk5NDNlNWM2MGE5ZDM1MGMwNDU5YzIwMw=='


// from this function you can get all data for a database or for specific user

// If you want to get specific data for a document in a view , you need to set key to be the id of the document
function cleanData(data) {
    cleanedData = [];
    for (let i = 0; i < data.rows.length; i++)
        cleanedData.push(data.rows[i]);
    return cleanedData;
}

function dbGet(endpoint, isView, id) {
    return new Promise((resolve, reject) => {
        let url = BASEURL + endpoint;
        if (isView && id) {
            url += `?key=\"${id}\"`;
        } else url += `/${id}`;
        let http = new XMLHttpRequest();
        http.open("GET", url);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4) {
                data = JSON.parse(http.responseText);
                if (!id || id == '')
                    data = cleanData(data);
                resolve(data);
            }
        }
        http.send();
    });
}
// dbGet('/categories',false,'1')get all information for a category id = 1

// dbGet('/users',false,'') get all users
// dbGet('/users/_design/users/_view/viewName',true,'') get all user from a view.
// dbGet('/users/_design/users/_view/userRole',true,"1") get uesr who his id = 1 and the data is from 'userRole'


function dbDelete(endpoint, id, rev) {
    return new Promise((resolve, reject) => {
        let url = BASEURL + endpoint + `/${id}?rev=${rev}`;
        let http = new XMLHttpRequest();
        http.open("GET", url);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4) {
                resolve(JSON.parse(http.responseText));
            }
        }
        http.send();
    });
}

// dbDelete('/users','ali',"2-cdfsidfsjdsdpifdsi") delete user his/her username =ali , here we use username because username is the primary key
// dbDelete('/categories','1',"2-cdfasdsidfsjdsdpifdsi") delete category  id =1 , 

function dbCreateOrUpdate(endpoint, data, id) {
    return new Promise((resolve, reject) => {
        const url = BASEURL + endpoint + `/${id}`;
        let http = new XMLHttpRequest();
        http.open("PUT", url);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('Accept', 'application/json');
        http.setRequestHeader("Authorization", AUTHENTICATION);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4) {
                resolve(JSON.parse(http.responseText));
            }
        }
        http.send(JSON.stringify(data));
    });
}

// userData={
//     username:"waleed",
//     password:"32423",
//     id:"1234",
// }
// dbCreateOrUpdate('/users',userData,1234);create user his id equals 1234 and his data is userData objectgi