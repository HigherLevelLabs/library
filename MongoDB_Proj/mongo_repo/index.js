(function(dbRepo, dbConnect, colors, mongodb){
    
    var ObjectID = mongodb.ObjectID;
    
    
    var FindAllInCollectionAsArray = function(collectionName, callback){
        dbConnect.ConnectToDB(function(db, closeDB){
           
            db.collection(collectionName).find().toArray(function(err, data){
                if(err){
                    return console.log(err);
                }
                console.log(" Connected correctly to Mongo Server ".bgGreen.white);
                callback(data);
                console.log(" Custom passed-in callback fired ".bgYellow.white);
                closeDB();
                console.log(" Closed correctly from Mongo Server ".bgBlue.white);
            });
            
        });
    };
    
    var FindSingle = function(collectionName, id, callback){
        dbConnect.ConnectToDB(function(db, closeDB){
        db.collection(collectionName).find({ _id: new ObjectID(id) }).toArray(
            function(err, data){
                if(err){
                    closeDB();
                    return console.log(err);
                }
                callback(data)
                closeDB();
            });
        });
    };
    
    var CreateThing = function(collectionName, model, callback){
        dbConnect.ConnectToDB(function(db, closeDB){
            db.collection(collectionName).insert(model, function(err){
                if(err){
                    closeDB();
                    return console.log(err);
                }
                FindAllInCollectionAsArray("library", function(data){
                    callback(data);
                });
            });
        });
    };
    
    var FindOneAndUpdate = function(collectionName, id, model, callback){
        dbConnect.ConnectToDB(function(db, closeDB){
            db.collection(collectionName).update({_id: new ObjectID(id) },
             { $set : model },
            function(err){
                if(err){
                    closeDB();
                    return console.log(err);
                }
                
                FindAllInCollectionAsArray("library", function(data){
                    callback(data);
                });
            });
        });
    };
    
    
    var DeleteThing = function(collectionName, id, callback){
    
        dbConnect.ConnectToDB(function(db, closeDB){
            
            db.collection(collectionName).remove({_id: new ObjectID(id) },
                function(err){
                    if(err){
                        closeDB();
                        return console.log(err);
                    }

                    FindAllInCollectionAsArray("library", function(data){
                        callback(data);
                    });
            });
            
        });
    
    };
    
    dbRepo.FindAllInCollectionAsArray = FindAllInCollectionAsArray;
    dbRepo.FindSingle = FindSingle;
    dbRepo.CreateThing = CreateThing;
    dbRepo.FindOneAndUpdate = FindOneAndUpdate;
    dbRepo.DeleteThing = DeleteThing;

})(
    module.exports, 
    require("./mongoConnection.js"), 
    require("colors"),
    require("mongodb")
);