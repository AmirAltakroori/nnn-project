// TODO
// This file contains all functions that will be used to interact with the database are written here
// Please write here a generic functions that can be used everywhere
// Functions here written to perform the CRUD operation 
// Function's names must be lowCamelCase 
// Don't delete this comments
// By Waleed Jubeh
let tokenKey = "PSEU";
function getData(storeName) {
    return JSON.parse(sessionStorage.getItem(storeName));
}
function getStoredToken(name){
    try{
        let user = getData(name);
        let tokenFromJson = JSON.parse(atob(user.token));
        return tokenFromJson;
    }catch(e){
        console.log(e);
        return null;
    }
}
function confirm(){
    let user = getStoredToken('user');

    if(!user)
        window.location.href = '/admin-panel-login/login.html';
    //  Calculate the Hash for the token data with the key
    let hash = user['hash'];//SHA256(tokenJson + key);
    delete(user['hash']);

    let correctHash = false;
    let correctSission = false;
    if(hash == SHA256(JSON.stringify(user) + tokenKey))
        correctHash = true;

    let currentDate = new Date().getTime();
    if(currentDate < user.data.exp)
        correctSission = true;
    
    if(!correctHash || !correctSission)
       window.location.href = '/admin-panel-login/login.html';
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
let categories = [{
        id: 1,
        name: "الألعاب",
        isActive: 1,
    },
    {
        id: 3,
        name: "الرئيسية",
        isActive: 1,
    },
    {
        id: 2,
        name: "الرياضة",
        isActive: 0, //غير مفعل
    },
    {
        id: 4,
        name: "الفن",
        isActive: 0,
    }
]
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
function SHA256(s) {

    let chrsz = 8;
    let hexcase = 0;

    function safe_add(x, y) {


        let lsw = (x & 0xFFFF) + (y & 0xFFFF);


        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);


        return (msw << 16) | (lsw & 0xFFFF);


    }

    function S(X, n) { return (X >>> n) | (X << (32 - n)); }

    function R(X, n) { return (X >>> n); }

    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }

    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }

    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }

    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }

    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }

    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256(m, l) {

        let K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        let HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        let W = new Array(64);
        let a, b, c, d, e, f, g, h, i, j;
        let T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for (let i = 0; i < m.length; i += 16) {

            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (let j = 0; j < 64; j++) {

                if (j < 16)
                    W[j] = m[j + i];
                else
                    W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }

        return HASH;
    }

    function str2binb(str) {

        let bin = Array();
        let mask = (1 << chrsz) - 1;

        for (let i = 0; i < str.length * chrsz; i += chrsz) {

            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);

        }

        return bin;
    }

    function Utf8Encode(string) {

        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {

                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {

                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {

                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }




    function binb2hex(binarray) {

        let hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        let str = "";

        for (let i = 0; i < binarray.length * 4; i++) {

            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +

                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);


        }

        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

