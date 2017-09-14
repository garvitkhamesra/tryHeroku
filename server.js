const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var log = `${new Date().toString()} : ${req.method} ${req.url}`
    fs.appendFile('logs/server.log',log + '\n',(err)=>{
        if(err){
            console.log("unable to store");
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs',{
//        currentPage:"Maintainence Page" 
//     });
// });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear(); 
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        currentPage : 'Home Page',
        name : 'Garvit'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        currentPage : 'About Page',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Sorry",
        statusCode : 400
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(port,()=>{
    console.log(`hi there server is on ${port}`);
});