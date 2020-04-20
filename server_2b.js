const express 		= require('express');
const sqlite3 		= require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('gnusmas.db');

var Global_String = " ";


app.get("/", function(req,res){
	workGet().then(result => {   
		Global_String = result; 
		console.log(Global_String); 
		res.end(Global_String);
	});
});

app.listen(8081, function(){	console.log("Server is started at 8081");})


const sqliteJson 	= require('sqlite-json');
const exporter = sqliteJson('gnusmas.db');
app.post("/", function(req,res){
	exporter.json('select * FROM Test Where Key < 100', function (err, json) {
		res.end(json);
		console.log(json);
	});
	
});

function selectAll() {
	var rezult=[];
    db.each('SELECT * FROM Test Where Key < 10',
		function(err, row) {
			var a = row.Key + ', ' +
					row.Name + ', ' +
					row.Surname + ', ' +
					row.SecondName + ', ' +
					row.Mark;
			rezult.push(a);			
		}	
	);
	return rezult;
}
async function workGet() {
	var a = await selectAll();
	return a.toString();
}
