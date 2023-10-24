const express = require('express');
const port = 5000;
const path = require('path');

const db = require('./config/mongoose');
const contact = require('./model/contact_schema');

const app = express();

// parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'assests'));

app.use(express.static('assests'));
 
app.get('/', (req, res) => {
    // return res.render('home');
    contact.find({}).then( (contacts) => {
        return res.render('home', {
            contacts: contacts
        });
    }).catch((err) => {
        console.log(err);
        return;
    })
});

app.post('/create', (req, res) => {
    contact.create(req.body).then( () => {
        console.log('added');
        return res.redirect('back');
    }).catch((err) => {
        console.log(err);
        return;
    });
});

app.get('/delete', (req, res) => {
    let id = req.query.id;
    contact.findByIdAndDelete(id).then( () => {
        return res.redirect('back');
    }).catch( (err) => {
        console.log(err);
        return;
    });
});

app.listen(port, () => {
    console.log(`Phonebook app listening on port ${port}`)
});