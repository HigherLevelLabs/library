(function (server, PORT, IP, bodyParser, fs, dbRepo) {

    server.use(bodyParser.urlencoded({
        extended: true
    }));

    server.get("/", function (req, res) {
        fs.readFile("templates/home.html", function (err, data) {
            if (err) {
                return console.log(err);
            }
            res.send(data.toString());
        });
    });

    server.get("/findall", function (req, res) {
        dbRepo.FindAllInCollectionAsArray("library", function (data) {
            res.json({
                success: data,
                failure: false
            });
        });
    });

    server.get("/findsingle", function (req, res) {
        dbRepo.FindSingle("library", function (data) {
            res.json(data);
        });
    });

    server.post("/checkout", function (req, res) {
        dbRepo.FindOneAndUpdate("library", req.body.id, {
            checkedIn: false
        }, function (data) {
            res.json({
                success: data,
                failure: false
            });

        });
    });

    server.post("/checkin", function (req, res) {

        dbRepo.FindOneAndUpdate("library", req.body.id, {
            checkedIn: true
        }, function (data) {
            res.json({
                success: data,
                failure: false
            });

        });

    });

    
    //STILL NEED DEFAULT DATA
    server.post("/createbook", function (req, res) {
        var model = {
            owner: req.body.owner,
            title: req.body.title,

            author: req.body.author,
            synopsis: req.body.synopsis,
            status: "in",
            lastCheckoutDate: "00/00/00"
        };

        dbRepo.CreateThing("library", model, function (data) {
            res.json({
                success: data,
                failure: false
            });
        });
    });

    server.delete("/deletebook", function (req, res) {
        dbRepo.DeleteThing("library", req.body.id, function (data) {
            res.json({
                success: data,
                failure: false
            });
        });
    });


    server.listen(PORT, IP, function () {
        console.log(" server online ");
    });

})(
    require("express")(), (process.env.PORT || 1337), (process.env.IP || 'localhost'),
    require("body-parser"),
    require("fs"),
    require("./mongo_repo")
);