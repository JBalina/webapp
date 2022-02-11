var faker = require('faker');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host	:	'localhost',
	user 	: 	'root',
	database:	'join_us',
});

app.listen(3000, function(){
	console.log("Server running!");
});

app.get("/", function(req, res){
	var q = 'SELECT COUNT(*) AS count FROM users;';

	var count = 0;

	connection.query(q, function(error, results, fields) {
		if (error) throw error;
		count = results[0].count;
		//res.send(msg);
		res.render("index", {count: count});
	});

});

app.get("/joke", function(req, res){
	var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
	res.send(joke);
});

app.get("/random_num", function(req, res){
	var num = Math.floor((Math.random() * 10) + 1);
	res.send("Your lucky number is " + num);
});

app.post("/register", function(req, res){
	var person = {
		email : req.body.email
	};
	connection.query('INSERT INTO users SET ?',person, function(error, results) {
		if (error) throw error;
		res.render("confirmation");
	})
});

function clear_users() {
	var q = 'DELETE FROM users;';

	connection.query(q, function(error, results, fields) {
		if (error) throw error;
		console.log(results);
	});
}


function run_code() {
	
	var data = [];

	for (var i = 0; i < 500; i++) {
		data.push([
			faker.internet.email(),
			faker.date.past()
		]);
	}

	var q = 'INSERT INTO users (email, created_at) VALUES ?';

	connection.query(q, [data], function(error, results, fields) {
		if (error) throw error;
		console.log(results);
	});

	//q = 'SELECT MONTH(created_at) AS Month, COUNT(*) AS Count FROM users GROUP BY MONTH(created_at) ORDER BY MONTH(created_at);';
	//q = 'SELECT COUNT(*) AS Yahoo FROM users WHERE email LIKE "%@yahoo.com";';
	//q = "SELECT CASE WHEN email LIKE '%@gmail.com' THEN 'gmail'	WHEN email LIKE '%@yahoo.com' THEN 'yahoo' WHEN email LIKE '%@hotmail.com' THEN 'hotmail' ELSE 'other' end      AS provider, Count(*) AS total_users FROM   users GROUP  BY provider ORDER  BY total_users DESC;";

	connection.query(q, function(error, results, fields) {
		if (error) throw error;
		console.log(results);
	});

}

// var q = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q, [data], function(error, results, fields) {
// 	if (error) throw error;
// 	console.log(results);
// });


// clear_users();
// run_code();
//connection.end();