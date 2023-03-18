/*
    SETUP
*/

// Express

const express = require('express');
const db = require('./db-connector.js');
const { engine } = require('express-handlebars');
const app = express();            // We need to instantiate an express object to interact with the server in our code
const PORT = 4367;                 // Set a port number at the top so it's easy to change in the future
const path = require('path');


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

// Add a new actor
app.post('/add-actor-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let first_name = data['input-fname'];
    let last_name = data['input-lname'];
    let birthdate = data['input-birthdate'];
    // let birthday = birthdate.toISOString(birthdate).slice(0, 10);
    
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Actors (first_name, last_name, actor_birth_date) VALUES ('${first_name}', '${last_name}', '${birthdate}')`;
    db.pool.query(query1, function(error, rows, fields){

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

// Add a new genre
app.post('/add-genre-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let genre = data['input-genre'];   
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Genres (genre_name) VALUES ('${genre}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Genres and
        // presents it on the screen
        else
        {
            res.redirect('/genres');
        }
    })
})

// Add a new age rating
app.post('/add-age-rating-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let ageRating = data['input-age-rating'];   
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO AgeRatings (age_rating_description) VALUES ('${ageRating}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Genres and
        // presents it on the screen
        else
        {
            res.redirect('/age_ratings');
        }
    })
})

// Add a new mood
app.post('/add-mood-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let mood = data['input-mood'];   
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Moods (mood_name) VALUES ('${mood}');`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Genres and
        // presents it on the screen
        else
        {
            res.redirect('/moods');
        }
    })
})

// Add a new user
app.post('/add-user-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let user_email = data['input-email'];
    let user_phone = data['input-phone'];    
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO Users (user_email, user_phone) VALUES ('${user_email}', '${user_phone}')`;
    db.pool.query(query1, function(error, rows, fields){

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
            res.redirect('/users');
        }
    })
})

// Add a new movie
app.post('/add-movie-form', function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let movie_title = data['input-title'];
    let movie_year = data['input-year'];    
    let age_rating = data['input-age-rating'];
    
        // Create the query and run it on the database
        const query1 = `INSERT INTO Movies (movie_title, movie_year, age_rating_id) VALUES ('${movie_title}', '${movie_year}',
                        (SELECT age_rating_id FROM AgeRatings WHERE age_rating_description = '${age_rating}'))`;
        db.pool.query(query1, function(error, rows, fields){

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
                res.redirect('/movies');
            }
        })
})


// Add an Actor to a Movie
app.post("/movie-add-actor-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let actor_id = data['input-actor'];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO MovieActors (movie_id, actor_id) VALUES
    ((SELECT movie_id FROM Movies WHERE Movies.movie_title = '${movie_title}'), '${actor_id}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll redirect to Movies
        else
        {
            res.redirect('/movies');
        }
    })
})

// Add a Genre to a Movie
app.post("/movie-add-genre-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let genre_id = data['input-genre'];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO MovieGenres (movie_id, genre_id) VALUES
    ((SELECT movie_id FROM Movies WHERE Movies.movie_title = '${movie_title}'), '${genre_id}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll redirect to Movies
        else
        {
            res.redirect('/movies');
        }
    })
})

// Add a Mood to a Movie
app.post("/movie-add-mood-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let mood_id = data['input-mood'];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO MovieMoods (movie_id, mood_id) VALUES
    ((SELECT movie_id FROM Movies WHERE Movies.movie_title = '${movie_title}'), '${mood_id}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll redirect to Movies
        else
        {
            res.redirect('/movies');
        }
    })
})

// Add a Mood to a Movie
app.post("/add-movie-user-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let user_id = data['user'];
    let movie_title = data['add-movie'];
    
    // Create the query and run it on the database
    const query1 = `INSERT INTO UserMovies (movie_id, user_id) VALUES
    ((SELECT movie_id FROM Movies WHERE Movies.movie_title = '${movie_title}'), '${user_id}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll redirect to Users
        else
        {
            res.redirect('/users');
        }
    })
})


//=====READ=====

// Home Page
app.get('/', function(req, res) {
        res.render('home');
    });

// View Movies Table
app.get('/movies', function(req, res) {
        let query1 = "SELECT * FROM Movies";
        db.pool.query(query1, function(error, rows, fields){
            if (error){
                console.log(error);
            } else {

                // Get Age Rating data for dropdown menu
                let query2 = "SELECT * FROM AgeRatings";
                db.pool.query(query2, function(error, age_ratings, fields){

                    res.render('movies', {data: rows, age_ratings: age_ratings},);

                })
            }
        })
    });

// View Actors Table
app.get('/actors', function(req, res) {
        let query1 = "SELECT actor_id, first_name, last_name, DATE_FORMAT(actor_birth_date, '%M' ' ' '%D' ' ' '%Y') AS birthday FROM Actors";

        db.pool.query(query1, function(error, rows, fields){
            res.render('actors', {data: rows});
        })
    });

// View Genres Table
app.get('/genres', function(req, res) {
    let query1 = "SELECT * FROM Genres";

    db.pool.query(query1, function(error, rows, fields){
        res.render('genres', {data: rows});
        })
    });

// View Age Ratings Table
app.get('/age_ratings', function(req, res) {
    let query1 = "SELECT * FROM AgeRatings";

    db.pool.query(query1, function(error, rows, fields){
        res.render('age_ratings', {data: rows});
        })
    });

// View Users Table
app.get('/users', function(req, res) {
    let query1 = "SELECT user_id, user_email, user_phone FROM Users";

    db.pool.query(query1, function(error, rows, fields){
        res.render('users', {data: rows});
        })
    });

// View Moods Table
app.get('/moods', function(req, res) {
    let query1 = "SELECT * FROM Moods";

    db.pool.query(query1, function(error, rows, fields){
        res.render('moods', {data: rows});
        })
    });


// View MovieActors Intersection Table
app.get('/movie_actors', function(req, res) {
    let query1 = "SELECT * FROM MovieActors";

    db.pool.query(query1, function(error, rows, fields){
        res.render('movie_actors', {data: rows});
        })
});

// View MovieMoods Intersection Table
app.get('/movie_moods', function(req, res) {
    let query1 = "SELECT * FROM MovieMoods";

    db.pool.query(query1, function(error, rows, fields){
        res.render('movie_moods', {data: rows});
        })
});

// View MovieGenres Intersection Table
app.get('/movie_genres', function(req, res) {
    let query1 = "SELECT * FROM MovieGenres";

    db.pool.query(query1, function(error, rows, fields){
        res.render('movie_genres', {data: rows});
        })
});

// View UserMovies Intersection Table
app.get('/user_movies', function(req, res) {
    let query1 = "SELECT * FROM UserMovies";

    db.pool.query(query1, function(error, rows, fields){
        res.render('user_movies', {data: rows});
        })
});

// View a User's Movie History
app.post('/movie-history', function(req, res) {

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let user_id = data['search-user-id'];

    let queryMovieHistory = `SELECT Movies.movie_title FROM Movies 
                             INNER JOIN UserMovies ON Movies.movie_id = UserMovies.movie_id 
                             INNER JOIN Users ON UserMovies.user_id = Users.user_id 
                             WHERE Users.user_id = ?;`;

    db.pool.query(queryMovieHistory, [user_id], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {

                let queryAddMovie = `SELECT movie_title FROM Movies WHERE movie_title NOT IN
                                    (SELECT Movies.movie_title FROM Movies 
                                    INNER JOIN UserMovies ON Movies.movie_id = UserMovies.movie_id 
                                    INNER JOIN Users ON UserMovies.user_id = Users.user_id 
                                    WHERE Users.user_id = '${user_id}')`;

                db.pool.query(queryAddMovie, [user_id], function(error, add_movie, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else{
                        res.render('movie_history', {data: rows, user: user_id, add_movie: add_movie});
                    }
                })
            }
    })
});

// View a Movie's Relationships (Actors, Genres, and Moods)
app.post('/movie-relationships', function(req, res) {

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let movie_title = data['search-movie'];

    // Query to find all actors for movie
    let queryMovieActors = `SELECT first_name, last_name FROM Actors
                            INNER JOIN MovieActors ON Actors.actor_id = MovieActors.actor_id
                            INNER JOIN Movies ON MovieActors.movie_id = Movies.movie_id
                            WHERE Movies.movie_title = ?`;

    db.pool.query(queryMovieActors, [movie_title], function(error, actor, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {

                // Query to find all actors not in movie
                let queryMovieAddActors = `SELECT * FROM Actors 
                                        WHERE NOT  Actors.actor_id IN (SELECT Actors.actor_id FROM Actors
                                        JOIN MovieActors ON Actors.actor_id = MovieActors.actor_id
                                        JOIN Movies ON MovieActors.movie_id = Movies.movie_id
                                        WHERE Movies.movie_title = ?)`;

                db.pool.query(queryMovieAddActors, [movie_title], function(error, add_actor, fields){
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {

                        // Query to find all genres for movie
                        let queryMovieGenres = `SELECT genre_name FROM Genres
                                            INNER JOIN MovieGenres ON Genres.genre_id = MovieGenres.genre_id
                                            INNER JOIN Movies ON MovieGenres.movie_id = Movies.movie_id
                                            WHERE Movies.movie_title = ?`;

                        db.pool.query(queryMovieGenres, [movie_title], function(error, genre, fields){
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {

                                    // Query to find all Genres not associated with movie
                                    let queryMovieAddGenres = `SELECT * FROM Genres 
                                                            WHERE NOT  Genres.genre_id IN (SELECT Genres.genre_id FROM Genres
                                                            JOIN MovieGenres ON Genres.genre_id = MovieGenres.genre_id
                                                            JOIN Movies ON MovieGenres.movie_id = Movies.movie_id
                                                            WHERE Movies.movie_title = ?)`;

                                    db.pool.query(queryMovieAddGenres, [movie_title], function(error, add_genre, fields){
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(400);
                                    } else {

                                        // Query to find all moods for movie
                                        let queryMovieMoods = `SELECT mood_name FROM Moods
                                                            INNER JOIN MovieMoods ON Moods.mood_id = MovieMoods.mood_id
                                                            INNER JOIN Movies ON MovieMoods.movie_id = Movies.movie_id
                                                            WHERE Movies.movie_title = ?`;

                                        db.pool.query(queryMovieMoods, [movie_title], function(error, mood, fields){
                                            if (error) {
                                                console.log(error);
                                                res.sendStatus(400);
                                            } else {

                                                 // Query to find all Moods not associated with movie
                                                let queryMovieAddMoods = `SELECT * FROM Moods 
                                                WHERE NOT  Moods.mood_id IN (SELECT Moods.mood_id FROM Moods
                                                JOIN MovieMoods ON Moods.mood_id = MovieMoods.mood_id
                                                JOIN Movies ON MovieMoods.movie_id = Movies.movie_id
                                                WHERE Movies.movie_title = ?)`;

                                                db.pool.query(queryMovieAddMoods, [movie_title], function(error, add_mood, fields){
                                                if (error) {
                                                    console.log(error);
                                                    res.sendStatus(400);
                                                } else {

                                                    res.render('movie_relationships', 
                                                    {actor: actor, add_actor: add_actor, genre: genre, add_genre: add_genre, 
                                                        mood: mood, add_mood: add_mood, movie: movie_title});
                                                }
                                                })
                                            }
                                })
                                }
                            
                        })
                    }       
                })
            }
        })
    }
})
});

// GET MOVIE DETAILS FOR EDIT MOVIE PAGE
app.post('/edit-movie-form', function(req, res) {
    let data = req.body;

    console.log(data);

    let movie_id = data['movie'];
    let editMoviePageQuery = `SELECT * FROM Movies WHERE movie_id = '${movie_id}'`;

    // Get existing movie data to populate input boxes
    db.pool.query(editMoviePageQuery, [movie_id], function(error, data, fields) {
        if (error) {
            console.log(error);
        } else {

            let ageRatingQuery = `SELECT * FROM AgeRatings`;

            // Get Age Ratings for user to select
            db.pool.query(ageRatingQuery, [movie_id], function(error, age_rating, fields) {
                if (error) {
                    console.log(error);
                } else {

                    res.render('edit_movie', {data: data, age_rating: age_rating});
                }
            })
        }
    })
});

//=====UPDATE=====

//UPDATE ACTORS
app.put('/update-actor-ajax', function(req,res,next){                                   
    let data = req.body;
  
    let birthdate = data.birthDate;
    let actor = data.actorID;


    let queryUpdateActor = 'UPDATE Actors SET actor_birth_date =? WHERE actor_id = ?';
    
    let selectActor = `SELECT * FROM Actors WHERE actor_id = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateActor, [birthdate, actor], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectActor, [actor], function(error, rows, fields) {
          
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

//UPDATE USER
app.put('/update-user-ajax', function(req,res,next){                                   
    let data = req.body;

    let updatedEmail = data.updatedEmail;
    let updatedPhone = data.updatedPhone;
    let userID = data.userID;

    
    let queryUpdateUser = 'UPDATE Users SET user_email = ? , user_phone = ? WHERE user_id = ?';
    let selectUser = `SELECT * FROM Users WHERE user_id = ?`;

    db.pool.query(queryUpdateUser, [updatedEmail, updatedPhone, userID], function (error, rows, fields) {

        if (error) {
            
  
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
  
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
        else
        {
            // Run the second query
            db.pool.query(selectUser, [userID], function(error, rows, fields) {
          
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
  })});


//UPDATE AGE_RATING
app.put('/update-age-ajax', function(req,res,next){                                   
    let data = req.body;

    let updatedDescription = data.updatedDescription;
    let ageID = data.ageID;

    
    let queryUpdateUser = 'UPDATE AgeRatings SET age_rating_description = ?';
    let selectUser = `SELECT * FROM AgeRatings WHERE age_rating_id = ?`;

    db.pool.query(queryUpdateUser, [updatedDescription, ageID], function (error, rows, fields) {

        if (error) {
            
  
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
  
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
        else
        {
            // Run the second query
            db.pool.query(selectUser, [ageID], function(error, rows, fields) {
          
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
})});

// Edit Movie
app.post('/submit-movie-edit', function(req, res) {

    // Get data from request
    let data = req.body;
    let movieID = data['movie'];
    let movieTitle = data['edit-title'];
    let movieYear = data['edit-year'];
    let movieAgeRating = data['edit-age-rating'];

    // Query DB to update Movie info
    let updateMovieQuery = `UPDATE Movies SET movie_title = '${movieTitle}', movie_year = '${movieYear}',
            age_rating_id = '${movieAgeRating}' WHERE Movies.movie_id = '${movieID}'`

    db.pool.query(updateMovieQuery, function(error, data, fields) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/movies');
        }
    })
})


//=====DELETE=====

app.delete('/delete-actor-ajax/', function(req,res,next){
    let data = req.body;
    let actor_id = parseInt(data.id);
    let deleteActor = `DELETE FROM Actors WHERE actor_id = ?`;
    let deleteMovieActor = "DELETE FROM MovieActors WHERE actor_id = ?"
  
          // Run the 1st query
          db.pool.query(deleteActor, [actor_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteMovieActor, [actor_id], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })
});

// Remove an Actor from a Movie
app.post("/movie-remove-actor-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let full_name = data['remove-actor'];
    let name = full_name.split(" ");
    let first_name = name[0];
    let last_name = name[1];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `DELETE FROM MovieActors WHERE movie_id = (SELECT movie_id FROM Movies 
        WHERE Movies.movie_title = '${movie_title}') AND actor_id = (SELECT actor_id 
        FROM Actors WHERE first_name = '${first_name}' AND last_name = '${last_name}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll just redirect back to movies. 
        else
        {
            res.redirect('/movies');
        }
    })
})

// Remove a Genre from a Movie
app.post("/movie-remove-genre-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let genre = data['remove-genre'];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `DELETE FROM MovieGenres WHERE movie_id = (SELECT movie_id FROM Movies 
        WHERE Movies.movie_title = '${movie_title}') AND genre_id = (SELECT genre_id 
        FROM Genres WHERE genre_name = '${genre}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll just redirect back to movies. 
        else
        {
            res.redirect('/movies');
        }
    })
})

// Remove a Mood from a Movie
app.post("/movie-remove-mood-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let mood = data['remove-mood'];
    let movie_title = data['movie'];
    
    // Create the query and run it on the database
    const query1 = `DELETE FROM MovieMoods WHERE movie_id = (SELECT movie_id FROM Movies 
        WHERE Movies.movie_title = '${movie_title}') AND mood_id = (SELECT mood_id 
        FROM Moods WHERE mood_name = '${mood}');`
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll just redirect back to movies. 
        else
        {
            res.redirect('/movies');
        }
    })
})

// Delete an Age Rating - Leaves NULL in place for Movies with that Age Rating
app.post("/delete-age-rating-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let age_rating_id = data['age-rating-id'];
    
    // Create the query and run it on the database
    const query1 = `DELETE FROM AgeRatings WHERE age_rating_id = '${age_rating_id}'`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll just redirect back to movies. 
        else
        {
            res.redirect('/age_ratings');
        }
    })
})

// Delete a User
app.post("/delete-user-form", function(req, res){

    // Capture incoming data and parse it into JS Object
    let data = req.body;

    console.log(data);

    // Assign data objects to variables to input into db.pool
    let user_id = data['user-id'];
    
    // Create the query and run it on the database
    const query1 = `DELETE FROM Users WHERE user_id = '${user_id}'`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // Trying to find an efficient way to force page to reload...
        // Until then, we'll just redirect back to movies. 
        else
        {
            res.redirect('/users');
        }
    })
})
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});