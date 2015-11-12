// goes in server.js ------

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