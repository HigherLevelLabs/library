(function(connectionDB, colors, mongodb, MongoClient, url){
    
    var ConnectToDB = function(callback){
        //connect to the mongodb server and return the database object
        MongoClient.connect(url, function(err, db) {
            console.log(" Connecting to Server ".bgGreen.white);
            if(err){
                //Log Errors if there were any
               console.log(err);
            }
            //fire our callback and pass in the close method
            callback(db, function(){ db.close });
        });
    };
    
    //export out so other files can use this function
    connectionDB.ConnectToDB = ConnectToDB;

})(
    module.exports, 
    require("colors"),
    require("mongodb"),
    require("mongodb").MongoClient,
    ("mongodb://" + (process.env.IP || 'localhost') + "/test")
);