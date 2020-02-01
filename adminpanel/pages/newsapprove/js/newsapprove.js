
function approvenews(){
    let userdata = JSON.parse(sessionStorage.getItem("userData"));
    if (userdata != null) {
        myNewsPage[userdata.ind] = userdata;
        sessionStorage.removeItem("userData");
    }
}


export {approvenews}