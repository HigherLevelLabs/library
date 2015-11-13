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
        
        var model = {
            id: req.body.id,
            status: "out",
            co_date: req.body.co_date,
            due_date: req.body.due_date,
        };

        mongoRepo.UpdateSingleCollectionByID("library", model, function (data) {

            res.json({
                success: data,
                failure: false
            });
        });

    });

    
    
    
    server.get("/addbook", function (req, res) {
        fs.readFile("templates/addbook.html", function (err, data) {
            if (err) {
                console.log(err);
                return res.send("ICEBERG");
            }
            res.send(data.toString());
        });
    });
	
	server.get("/adduser",function(req,res){
		fs.readFile("templates/adduser.html", function(err,data){
			if(err){
				console.log(err);
				return res.send("DIDN'T WORK!");
			}
			res.send(data.toString());
		});
	});

    server.post("/adduser", function (req, res) {
        var model = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.pwd
        };//update in the DB

        console.log("Add user Called");


        mongoRepo.CreateCustomer("users", model, function (data) {




            res.json({
                success: data,
                failure: false
            });
        });

    });


    server.post("/addbook", function (req, res) {
        var model = {
            owner: req.body.owner,
            title: req.body.title,
            author: req.body.author,
            synopsis: req.body.synopsis,
            status: "in",
        };
        
        
        console.log("the req.body.name : " + req.body.title);
        
        console.log("the model is: " + JSON.stringify(model));

        mongoRepo.CreateBook("library", model, function (data) {
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
    require("express")(), (process.env.PORT || 8081), (process.env.IP || 'localhost'),
    require("body-parser"),
    require("fs"),
    require("./mongoConnection")
);