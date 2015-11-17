(function (dbRepo, connector, mongodb) {


    var ObjectId = mongodb.ObjectID;
//CREATE A USER/CUSTOMER FUNCTION
    var CreateCustomer = function (collectionName, customer, callback) {
        connector.ConnectToDB(function (db, closeDB) {
            db.collection(collectionName).insert(customer, function (err,doc) {
                if (err) {
                    closeDB();
                    return console.log(err);
                }
                    
                
               FindSingleCollectionByID("users", doc.ops[0]._id, function (data) {

                    callback(data);
                });
            });
        });
    };



    //CREATE A BOOK FUNCTION
    var CreateBook = function (collectionName, model, callback) {
        connector.ConnectToDB(function (db, closeDB) {
            db.collection(collectionName).insert(model, function (err) {
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

    
//LOCATE A CUSTOMER BY ID
    var FindCustomerByID = function (collectionName, customer, callback) {

        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).find(

                {
                    email: customer.email,
                    password: customer.password

                }

            ).toArray(function (err, data) {
                if (err) {
                    closeDB();
                    console.log(err);
                }


                callback(data);

                closeDB();

            });

        });
    };

//LOAD ALL BOOKS FOR BROWSING THE LIBRARY
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

    
//FUNCTION TO PULL SINGLE USER DATA FOR LOGIN - NEED TO REPLACE WITH PASSPORT    
    var FindSingleCollectionByID = function (collectionName, id, callback) {


        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).find({
                    
                _id: id

            }).toArray(function (err, data) {

                if (err) {
                    closeDB();
                    console.log(err);
                }

                console.log(" Connected correctly to Mongo Server ");

                callback(data[0]);

                console.log(" Custom passed-in callback fired ");

                closeDB();

                console.log(" Closed correctly from Mongo Server ");

            });


        });
    }

//FUNCTION TO CHECKOUT A LIBRARY      
    var UpdateSingleCollectionByID = function (collectionName, model, callback) {


        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).findAndModify({
                    _id: new ObjectId(model.id)
                }, [['_id', 'asc']],

                {
                    $set: {
                        status: model.status,
                        co_date: model.co_date,
                        due_date: model.due_date,
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

    
    var UpdateStatusByID = function (collectionName, model, callback) {


        connector.ConnectToDB(function (db, closeDB) {

            db.collection(collectionName).findAndModify({
                    _id: new ObjectId(model.id)
                }, [['_id', 'asc']],

                {
                    $set: {
                         status: model.status,
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

    

    
//DB REPOS    
    dbRepo.CreateCustomer = CreateCustomer;
    dbRepo.CreateBook = CreateBook;
    dbRepo.FindCustomerByID = FindCustomerByID;
    dbRepo.FindAllInCollectionAsArray = FindAllInCollectionAsArray;
    dbRepo.FindSingleCollectionByID = FindSingleCollectionByID;
    dbRepo.UpdateSingleCollectionByID = UpdateSingleCollectionByID;
    
    dbRepo.UpdateStatusByID = UpdateStatusByID;

})(
    module.exports,
    require("./connector.js"),

    require("mongodb")
);