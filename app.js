// ===INCLUDES===

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// ===SETUP===

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// ===VARIABLES===

var offers = [
    { title: "Sofa", img: "https://i.pinimg.com/736x/82/4e/78/824e784ab68813c77c6486beb9736c75--old-sofa-couch.jpg", desc: "My old sofa, don't have any space for it, giving it away!" },
    { title: "Broken microwave", img: "https://mystuffrecycled.files.wordpress.com/2014/07/3.jpg", desc: "It broke about a year ago, if anyone want to fix it, it's yours." },
    { title: "Kitties", img: "https://i.imgur.com/5bXly.jpg?1", desc: "Our cat recently gave birth to 20 kittens, 16 are avalible, contact me for more info!" },
    { title: "Beer", img: "https://www.vallartadaily.com/wp-content/uploads/2017/08/two-pints-beer-main.jpg", desc: "Looking for someone to crack open a cold one with me." }
];

// ===GET===

app.get('/', function(req, res) {
    res.render('index', {page:'home'});
});

app.get('/tolcss', function(req, res) {
    res.render('tolcss', {page:'tolcss'});
});

app.get('/marketplace', function (req, res) {
    res.render('marketplace', { page: 'marketplace', offers: offers });
});

app.get('/marketplace/newoffer', function(req, res) {
    var error = req.query.err;

    res.render('newoffer', {page:'marketplace', err:error});
});

app.get('*', function(req, res) {
    res.render('404', {page:'404'});
});

// ===POST===

app.post('/marketplace', function(req, res) {
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.desc;
    
    if(title == "" || image == "" || desc == "") {
        res.redirect('/marketplace/newoffer?err=1');
        return 1;
    }

    console.log('New offer added : ' + title);

    offers.push({title:title, img:image, desc:desc});
    res.redirect('/marketplace');
});

// ===LISTEN===

app.listen(3000, function() {
    console.log("Server started on port 3000");
});