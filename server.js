const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 2500;
//var router = express.Router()
hbs.registerPartials(__dirname + '/views/part');

var currentDate = new Date();
hbs.registerHelper('currentDate',()=>{
  return (currentDate.getDate() + '-' +  currentDate.getMonth() + '-' +  currentDate.getFullYear() );
})
var currentTime = currentDate.getHours() +':'+ currentDate.getMinutes()+':'+ currentDate.getSeconds();
hbs.registerHelper('currentTime',()=>{
  return currentTime;
})

hbs.registerHelper('capitalize',(text)=>{
  return text.toUpperCase();
})

var app = express();
//app.use('/', router)
app.set('view engine', 'hbs');

debugger;

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method}: ${req.url}`
  debugger;
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err)
    console.log(err);
  });
  next();
})

// app.use((req,res,next)=>{
//   res.render('maint.hbs');
// })
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// app.get('/user/:id', function (req, res, next) {
//   // if the user ID is 0, skip to the next route
//   if (req.params.id === '0') next('route')
//   // otherwise pass the control to the next middleware function in this stack
//   else next()
// }, function (req, res, next) {
//   // render a regular page
//   res.render('regular')
// })
//
// // handler for the /user/:id path, which renders a special page
// app.get('/user/:id', function (req, res, next) {
//   res.render('special')
// })

app.get('/likes', (req,res)=>{
  res.send(
    { name: 'Pavan',
      likes: ['running', 'biking', 'geography']
    }
  );
})

app.get('/', (req,res)=>{
  res.render('Welcome.hbs',{
    headTitle: 'Welcome to the Home page',
    pageTitle: 'Home Page',
    link: '/about'
  });
})

app.get('/about', (req,res)=>{
  res.render('About.hbs',{
    headTitle: 'Welcome to About page',
    pageTitle: 'About Page',
    link: '/likes'
  });
})

app.get('/overview', (req,res)=>{
  res.render('overview.hbs');
})


app.get('/bad', (req,res)=>{
  res.send({error:'The server could not serve your request'});
})

app.listen(port,()=>{
  console.log(`server started on port ${port}`);
});
