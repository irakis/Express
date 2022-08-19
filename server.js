const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();

app.engine('.hbs',hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs')
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/contact/send-message', upload.single('myFile'), (req, res) => {
  const { author, sender, title, message, myFile} = req.body;
  const fileName = req.file.originalname;
  console.log('originalname: ', fileName)
  if(author && sender && title && message && fileName) {
    res.render('contact', { isSent : true, name1: fileName});
  } else { res.render( 'contact' , { isError: true} )}
});

app.get( '/hello/:name' , (req, res) => {
  res.render('hello', { name: req.params.name})
})

app.get( '/', (req, res)=>{
  res.render('index');
});

app.get('/about', ( req,res ) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info', { layout: 'dark'});
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello',{ name: `${req.params.name}`})
});

app.use(( req, res ) => {
  res.status(400).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});