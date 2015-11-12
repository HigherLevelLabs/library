(function (dbRepo, connector) {
    
    
var ObjectId = require('mongodb').ObjectID;    



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
                    $set: {status: 'out'}
                },
                {},
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

    dbRepo.FindAllInCollectionAsArray = FindAllInCollectionAsArray;

    dbRepo.FindSingleCollectionByID = FindSingleCollectionByID;

    dbRepo.UpdateSingleCollectionByID = UpdateSingleCollectionByID;

})(
    module.exports,
    require("./connector.js")

);