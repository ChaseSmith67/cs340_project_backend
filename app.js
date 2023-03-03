/*
    SETUP
*/
// Express
import express from "express";
import db from "./db-connector.js";
import { engine, ExpressHandlebars } from "express-handlebars";


const app = express();            // We need to instantiate an express object to interact with the server in our code
const PORT = 4367;                 // Set a port number at the top so it's easy to change in the future


// Setup Handlebars 
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Setup Express to read data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


/*
    ROUTES
*/

//=====CREATE=====

app.post('/add-actor-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db
    let first_name = data['input-fname'];
    let last_name = data['input-lname'];
    let birthdate = new Date(data['input-birthdate']);
    let birthday = birthdate.toISOString(birthdate).slice(0, 10);

    console.log(String(birthday));
    
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Actors (first_name, last_name, actor_birth_date) VALUES ('${first_name}', '${last_name}', DATE(${birthday}))`;
    db.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Actors and
        // presents it on the screen
        else
        {
            res.redirect('/actors');
        }
    })

})

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
            if (error){
                console.log(error);
            } else {
            res.render('movies', {data: rows});
            }
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

// View Edit Movies Page
app.get('/edit_movies', function(req, res)
{
    let query1 = "SELECT movie_id AS id, movie_title AS title FROM Movies";
    db.query(query1, function(error, movie, fields){

        let query2 = "SELECT * FROM Moods";
        db.query(query2, function(error, mood, fields){

            let query3 = "SELECT * FROM Genres";
            db.query(query3, function(error, genre, fields){

                let query4 = "SELECT actor_id, CONCAT(first_name, ' ', last_name) AS fullName FROM Actors";
                db.query(query4, function(error, actor, fields){

                    res.render('edit_movies', {movie: movie, mood: mood, genre: genre, actor: actor});
                })
            })
        })
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