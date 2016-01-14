//Modules
var url = require("url");
var request = require("request");

//Includes
var Config = require("../../../../config.js");
var User = require("../../../models/user.js");

//Request prototype
var startRequest = function(params, checks){
	request({
		url: url.resolve("http://" + Config.http.url + ":" + Config.http.port.external, "/api/v1/users/insert"),
		method: "POST",
		json: true,
		body: params
	}, function (err, res, body) {
		
		//Check there was no error in the request
		expect(res.statusCode).toBe(200);
		expect(err).toBe(null);
		
		//Perform coresponding test checks
		checks(body);
	});
};

describe("Insert Users", function(){
	
	// !Positive Tests
	
	describe("Positive Tests", function(){
		
		it("should insert details for user", function(done){
			startRequest({
				username: "NewUsername",
				email: "NewEmail@NewEmail.com"
			}, function(body){
				
				//Check that user was inserted to database
				User.find({ username: "NewUsername", email: "NewEmail@NewEmail.com" }, function(err){
					done();
				});
			});
			
		});
		
	});
	
	// !Negative Tests
	
	describe("Negative Tests", function(){
		
		it("should return error if no username is given", function(done){
			startRequest({
				email: "NewEmail@NewEmail.com"
			}, function(body){
				
				//Check error was correct
				expect(body.error).toBe("Username must be given");
				
				done();
			});
			
		});
		
	});
	
});