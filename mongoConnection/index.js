(function (dbRepo, connector, mongodb) {


    var ObjectId = mongodb.ObjectID;

    var CreateCustomer = function (collectionName, customer, callback) {
        connector.ConnectToDB(function (db, closeDB) {
            db.collection(collectionName).insert(customer, function (err) {
                if (err) {
                    closeDB();
                    return console.log(err);
                }
                FindAllInCollectionAsArray("adduser", function (data) {
                    callback(data);
                });
            });
        });
    };


    
    //CREATE THE BOOK
    var CreateBook = function (collectionName, model, callback) {
        connector.ConnectToDB(function (db, closeDB) {
            db.collection(collectionName).insert(customer, function (err) {
                if (err) {
                    closeDB();
                    return console.log(err);
                }
                FindAllInCollectionAsArray("library", function (data) {
                    callback(data);
                });
            });
        });
    };


    var FindCustomerByID = function (collectionName, customer, callback) {
        connector.ConnectToDB(function (db, closeDB) {
            db.collection(collectionName).find({
                customer: new ObjectID(customer)
            }).toArray(
                function (err, data) {
                    if (err) {
                        closeDB();
                        return console.log(err);
                    }
                    callback(data);
                    closeDB();
                });
        });
    };

    var FindAllInCollectionAsArray = function (collectionName, callback) {

        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).find().toArray(function (err, data) {
                if (err) {
                    closeDB();
                    console.log(err);
                }

                console.log(" Connected correctly to Mongo Server ");

                callback(data);

                console.log(" Custom passed-in callback fired ");

                closeDB();

                console.log(" Closed correctly from Mongo Server ");

            });


        });



    };

    var FindSingleCollectionByID = function (collectionName, id, callback) {


        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).find({


            }).toArray(function (err, data) {

                if (err) {
                    closeDB();
                    console.log(err);
                }

                console.log(" Connected correctly to Mongo Server ");

                callback(data);

                console.log(" Custom passed-in callback fired ");

                closeDB();

                console.log(" Closed correctly from Mongo Server ");

            });


        });
    }

    var UpdateSingleCollectionByID = function (collectionName, id, status, callback) {


        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).findAndModify({
                    _id: new ObjectId(id)
                }, [['_id', 'asc']],

                {
                    $set: {
                        status: 'out'
                    }
                }, {},
                function (err) {

                    db.collection(collectionName).find().toArray(function (err, data) {
                        if (err) {
                            closeDB();
                            console.log(err);
                        }

                        console.log(" Connected correctly to Mongo Server ");

                        callback(data);

                        console.log(" Custom passed-in callback fired ");

                        closeDB();

                        console.log(" Closed correctly from Mongo Server ");

                    });

                });

        });

    }

    dbRepo.CreateCustomer = CreateCustomer;

    dbRepo.FindCustomerByID = FindCustomerByID;

    dbRepo.FindAllInCollectionAsArray = FindAllInCollectionAsArray;

    dbRepo.FindSingleCollectionByID = FindSingleCollectionByID;

    dbRepo.UpdateSingleCollectionByID = UpdateSingleCollectionByID;

})(
    module.exports,
    require("./connector.js"),

    require("mongodb")
);