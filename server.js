var express = require("express");
var app = express()
var users = [{name: "Chasham", age:22},{name: "Celine", age:29}];

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));



// Adder function
var adder = function(num1,num2){
    var result = num1 + num2;
    return result
}

var port = process.env.port || 3000;
app.listen(port, () => 
console.log('Hello, app listening on port', port))


app.get('/test',function(req,res) {
    res.send('You hit me');
});


// Redirection to Deakin Library
app.get('/redirecting',function(req,res){
    res.redirect("https://www.deakin.edu.au/library")
})

// get adder
app.get('/adder',function(req,res){
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);
    var result = adder(num1,num2)
    res.send('The result is:' +result)
});

// post request to create user data
app.post("/user/create",(req,res) => {
    let userData = {}
    userData.name = req.body.name;
    userData.age = req.body.age;
    users.push(userData);
    res.json({statusCode : 200, data : userData, message : "Created"})

})

// get request to retrieve users
app.get("/user",(req,res)=> {
    var age = parseInt(req.query.age);
    var userFormatted = [];
    if (isNaN(age)) {
        res.json({statusCode: 200, data : users, message: "Success"})
    }
    else {
        for (var i = 0; i< users.length; i++) {
            if  (age < users[i].age){
                userFormatted.push(users[i])
            }

        }
        res.json({statusCode: 200, data : userFormatted, message: "Success"})
    }
    

})