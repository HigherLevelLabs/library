(function (express, server, PORT, IP, bodyParser, fs, mongoRepo) {



    //Intantiate body-parser for form reading
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    //call our assets folder including CSS and IMG for use accross all HTML documents
    server.use(express.static('public'));


    //homepage route to load home.html    
    server.get("/", function (req, res) {
        fs.readFile("templates/home.html", function (err, data) {
            if (err) {
                console.log(err);
                return res.send("ICEBERG");
            }
            res.send(data.toString());
        });
    });


    //route all library books onto the stage    
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

    //INCOMPLETE ROUTE - Put Function    
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

    //INCOMPLETE ROUTE - Delete Function
    server.delete("/browse", function (req, res) {

        var model = myData.filter(function (value) {
            return value.id == req.body.id;
        })[0];

        model.name = "DELETED";
        model.bio = "DELETED";

<<<<<<< HEAD
        res.json({
            success: myData,
            failure: false
        });
    });


    //route performs a checkout on a library book
=======
    //check out book
>>>>>>> 0ed6108a158f802cb5b10c3e41e68bf2948b456a
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
    
    
    
    
    //check book back in
    server.post("/return", function (req, res) {
        //update in the DB
        
        var model = {
            id: req.body.id,
            status: "in",
        };

        mongoRepo.UpdateStatusByID("library", model, function (data) {

            res.json({
                success: data,
                failure: false
            });
        });

    });


    //LOGIN ROUTES - 75% functioning, need to deploy Passport
    server.get("/login", function (req, res) {
        fs.readFile("templates/login.html", function (err, data) {
            if (err) {
                console.log(err);
                return res.send("ICEBERG");
            }
            res.send(data.toString());
        });
    });

    //still needs to be built out - incomplete
    server.post("/login", function (req, res) {
        var model = {
            email: req.body.email,
            password: req.body.password
        }; //update in the DB

        console.log("The model is : " + JSON.stringify(model));

        mongoRepo.FindCustomerByID("users", model, function (data) {
            var response = "";

            if (data == 'undefined') {

                response = "Bad username or PW";

            } else {
                response = "User has logged in";
                response.success = data;
            }
            /*
                        var obj = {
                            success: data,
                            failure: false
                        };
                        
                        console.log(data);
                        if (data[0] == 'undefined') {

                            console.log("Bad username or PW");
                            obj.errormsg = "Bad username or PW"
                            obj.failure = true;
                        } 



                       
                        
                        */

            res.json(response);
        });

    });
    //END LOGIN FUNCTIONS  


    //ADD BOOK ROUTES - creates a new book   
    server.get("/addbook", function (req, res) {
        fs.readFile("templates/addbook.html", function (err, data) {
            if (err) {
                console.log(err);
                return res.send("ICEBERG");
            }
            res.send(data.toString());
        });
    });

    server.post("/addbook", function (req, res) {
        var model = {
            owner: req.body.owner,
            title: req.body.title,
            author: req.body.author,
            synopsis: req.body.synopsis,
            status: req.body.status,
            rating: req.body.rating,
            checkOutDate: req.body.checkOutDate,
            dueDate: req.body.dueDate,
            customer: req.body.customer
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
    //END ADD BOOK FUNCTIONS

    //ADD A USER ROUTES - creates a new user     
    server.get("/adduser", function (req, res) {
        fs.readFile("templates/adduser.html", function (err, data) {
            if (err) {
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
        }; //update in the DB

        console.log("Add user Called");


        mongoRepo.CreateCustomer("users", model, function (data) {


            res.json({
                success: data,
                failure: false
            });
        });

    });
    //END ADD USER FUNCTIONS








    //Listen function - keep at that bottom of all routes
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