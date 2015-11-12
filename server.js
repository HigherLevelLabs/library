(function (express, server, PORT, IP, bodyParser, fs, mongoRepo) {



    //get,put,post,delete
    server.use(bodyParser.urlencoded({
        extended: true
    }));


    server.use(express.static('public'));


    server.get("/", function (req, res) {
        fs.readFile("templates/home.html", function (err, data) {
            if (err) {
                console.log(err);
                return res.send("ICEBERG");
            }
            res.send(data.toString());
        });
    });


    server.get("/browse", function (req, res) {
        //do checks
        var content = "";

        mongoRepo.FindAllInCollectionAsArray("library", function (data) {
            /*
                        for (var i in data) {
                            content += "<p>" + JSON.stringify(data[i]) + "</p>";
                        }
                        
            */

            res.json({
                success: data,
                failure: false
            });
        });

    });



    server.post("/checkout", function (req, res) {
        //update in the DB

        mongoRepo.UpdateSingleCollectionByID("library", req.body.id, req.body.status, function (data) {
            
            

            res.json({
                success: data,
                failure: false
            });
        });

    });


    server.put("/browse", function (req, res) {
        var model = myData.filter(function (value) {
            return value.id == req.body.id;
        })[0];

        model.name = req.body.name;
        model.bio = req.body.bio;

        //db update
        res.json({
            success: myData,
            failure: false
        });
    });

    server.delete("/browse", function (req, res) {

        var model = myData.filter(function (value) {
            return value.id == req.body.id;
        })[0];

        model.name = "DELETED";
        model.bio = "DELETED";

        res.json({
            success: myData,
            failure: false
        });
    });



    server.listen(PORT, IP, function () {
        console.log(" server online ");
    });

})(
    require("express"),
    require("express")(), (process.env.PORT || 8080), (process.env.IP || 'localhost'),
    require("body-parser"),
    require("fs"),
    require("./mongoConnection")
);