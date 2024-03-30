// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let inp=req.params.date
  console.log(inp+" input")
  //Fri, 25 Dec 2015 00:00:00 GMT
  if(!isNaN(new Date(inp))){//date is valid
    let uni=parseInt((new Date(inp).getTime()));
    res.json({ unix : uni ,"utc":(new Date(inp)).toUTCString()})
    
  }
  else if(!isNaN(parseInt(inp))){
    //unix format
    let date=(new Date(parseInt(inp)));
    
    res.json({unix : parseInt(inp) ,"utc": date.toUTCString()})
    
  }
  
  else{
    
    res.json({ error : "Invalid Date" })
  }
  
});

app.get("/api", function (req, res) {
  
    let uni=parseInt((new Date().getTime()));
    res.json({ unix : uni ,"utc":(new Date()).toUTCString()})
  
})
console.log(new Date(1451001600000).toUTCString())
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
