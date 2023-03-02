/*
    SETUP
*/
// Express
import express from "express";
import db from "./db-connector.js";
import { engine, ExpressHandlebars } from "express-handlebars";


const app = express();            // We need to instantiate an express object to interact with the server in our code
const PORT = 4367;                 // Set a port number at the top so it's easy to change in the future


app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))


/*
    ROUTES
*/

//=====CREATE=====


//=====READ=====
// Home Page
app.get('/', function(req, res)
    {
        res.render('home');
        });

// View Movies Table
app.get('/movies', function(req, res)
    {
        let query1 = "SELECT * FROM Movies";
        db.query(query1, function(error, rows, fields){
            res.render('movies', {data: rows});
        })
        });

// View Actors Table
app.get('/actors', function(req, res)
    {
        let query1 = "SELECT actor_id, first_name, last_name, DATE_FORMAT(actor_birth_date, '%M' ' ' '%D' ' ' '%Y') AS birthday FROM Actors";
        db.query(query1, function(error, rows, fields){
            res.render('actors', {data: rows});
        })
        });

// View Genres Table
app.get('/genres', function(req, res)
{
    let query1 = "SELECT * FROM Genres";
    db.query(query1, function(error, rows, fields){
        res.render('genres', {data: rows});
    })
    });

// View Age Ratings Table
app.get('/age_ratings', function(req, res)
{
    let query1 = "SELECT * FROM AgeRatings";
    db.query(query1, function(error, rows, fields){
        res.render('age_ratings', {data: rows});
    })
    });

// View Users Table
app.get('/users', function(req, res)
{
    let query1 = "SELECT * FROM Users";
    db.query(query1, function(error, rows, fields){
        res.render('users', {data: rows});
    })
    });

// View Moods Table
app.get('/moods', function(req, res)
{
    let query1 = "SELECT * FROM Moods";
    db.query(query1, function(error, rows, fields){
        res.render('moods', {data: rows});
    })
    });

//=====UPDATE=====


//=====DELETE=====

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});