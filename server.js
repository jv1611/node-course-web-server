const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.use(express.static(__dirname + '/public')); Verplaats naar onder.
// anders kan deze toch bezocht worden ondanks maintenance

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
      if (err) {
         console.log('Unable to append to server.log. NL');
      }
   });
   next();
});

// app.use((req, res, next) => {
//    res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

app.get('/', (req, res) => {
   console.log("De server is gestart");
   res.render('home', {
      pageTitle: 'De homepage',
      welcomeMessage: 'Bezoeker van deze site in ontwikkeling'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
      pageTitle: 'About pagina'
   });
});

app.get('/projects', (req, res) => {
   res.render('projects', {
      pageTitle: 'De projecten pagina'
   });
});

app.get('/bad', (req, res) =>{
   res.send({
      errorMessage: 'Unable to get informatie.'
   });
});

app.listen(port, () =>{
   console.log(`Server is up on port ${port}.`);
});
