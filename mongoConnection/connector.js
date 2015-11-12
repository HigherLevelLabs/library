(function (connector, mongodb) {

    //Create our mongo client so we can connecto mongo
    var MongoClient = mongodb.MongoClient;

    //url tells us where our mongo connection is living
    var url = "mongodb://" + (process.env.IP || 'localhost') + "/test";

    //Custom Function
    var ConnectToDB = function (callback) {
        //this is what acutally connects to DB
        MongoClient.connect(url, function (err, db) {
            console.log(" Connecting to Server ");
            if (err) {
                console.log(err);
            }
            //fire our callback passing in the database
            //pass in a function to close db
            callback(db, function () {
                db.close
            });
        });

    };

    connector.ConnectToDB = ConnectToDB;



})(module.exports,
    require("mongodb")
);