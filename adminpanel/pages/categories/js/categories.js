function getCatId() {
    return dbGet("/settings", false, "categories");
}

function CreateCat(data) {
    return new Promise((resolve, reject) => {
        this.getCatId().then(request => {
            const _id = request.counter + 1;
            dbCreateOrUpdate("/categories", data, _id).then(response => {
                request.counter = request.counter + 1;
                dbCreateOrUpdate("/settings", request, request._id).then(response2 => {
                    resolve(response2);
                });
            });
        });
    });
}
