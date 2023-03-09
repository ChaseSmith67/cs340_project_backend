-- Group 116: Brant Cass & Chase Smith


-- Variables denoted with curly braces, like this: {{variableName}}
-- Variables can come from textboxes input by user or from dropdowns
-- populated by the get queries


------- CREATE --------

-- Add a new Actor
INSERT INTO Actors(first_name, last_name, actor_birth_date) VALUES
({{actorFirstName}}, {{actorLastName}}, {{actorBirthDate}});

-- Add new Movie
INSERT INTO Movies(movie_title, movie_year, age_rating_id) VALUES
({{movieTitle}}, {{movieYear}});

-- Add new Genre
INSERT INTO Genres(genre_name) VALUES
({{genreName}});

-- Add new Mood
INSERT INTO Moods(mood_name) VALUES
({{moodName}});

-- Add new User
INSERT INTO Users(user_email, user_phone) VALUES
({{userEmail}}, {{userPhoneNumber}});

-- Add new AgeRating
INSERT INTO AgeRatings(age_rating_description) VALUES
({{ageRatingDescription}});

-- Add actor to movie / add movie to actor (Add entry to MovieActors)
INSERT INTO MovieActors (movie_id, actor_id) VALUES
((SELECT movie_id FROM Movies WHERE Movies.movie_title = {{movieTitle}}),
 (SELECT actor_id FROM Actors WHERE Actors.first_name = {{actorFirstName}} 
 AND Actors.last_name = {{actorLastName}}));

-- Add mood to movie (Add entry to MovieMoods)
INSERT INTO MovieMoods (movie_id, mood_id) VALUES
((SELECT movie_id FROM Movies WHERE Movies.movie_title = {{movieTitle}}),
 (SELECT mood_id FROM Moods WHERE Moods.mood_name = {{moodName}})); 

-- Add genre to movie (Add entry to MovieGenres)
INSERT INTO MovieGenres (movie_id, genre_id) VALUES
((SELECT movie_id FROM Movies WHERE Movies.movie_title = {{movieTitle}}),
 (SELECT genre_id FROM Genres WHERE Genres.genre_name = {{genreName}}));

-- Add movie to User History by Email (Add entry to UserMovies)
INSERT INTO UserMovies (user_id, movie_id) VALUES
((SELECT user_id FROM Users WHERE Users.user_email = {{userEmail}}),
 (SELECT movie_id FROM Movies WHERE Movies.movie_title = {{movieTitle}}));


------- READ --------

-- get all movies available                 
SELECT Movies.movie_title, Movies.movie_year FROM Movies;

-- get all actors currently in database     
SELECT Actors.first_name, Actors.last_name FROM Actors;

-- get all registered Users
SELECT Users.user_id, Users.user_email FROM Users;

-- get a user's movie history by User ID
SELECT Movies.movie_title FROM Movies
INNER JOIN UserMovies ON Movies.movie_id = UserMovies.movie_id
INNER JOIN Users ON UserMovies.user_id = Users.user_id
WHERE Users.user_id = {{userID}};

-- get a user's movie history by email
SELECT Movies.movie_title FROM Movies
INNER JOIN UserMovies ON Movies.movie_id = UserMovies.movie_id
INNER JOIN Users ON UserMovies.user_id = Users.user_id
WHERE Users.user_email = {{userEmail}};

-- get all movies featuring a particular actor
SELECT Movies.movie_title FROM Movies
INNER JOIN MovieActors ON Movies.movie_id = MovieActors.movie_id
INNER JOIN Actors ON MovieActors.actor_id = Actors.actor_id
WHERE Actors.first_name = {{actorFirstName}} AND Actors.last_name = {{actorLastName}};

-- get all movies of a particular genre
SELECT Movies.movie_title FROM Movies
INNER JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
INNER JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
WHERE Genres.genre_name = {{genreName}};

-- get all movies of a particular mood
SELECT Movies.movie_title FROM Movies
INNER JOIN MovieMoods ON Movies.movie_id = MovieMoods.movie_id
INNER JOIN Moods ON MovieMoods.mood_id = Moods.mood_id
WHERE Moods.mood_name = {{moodName}};

-- get all movies of a particular age rating
SELECT Movies.movie_title FROM Movies
WHERE Movies.age_rating_id = {{ageRating}};

-- get all movies of a particular mood and genre
SELECT Movies.movie_title FROM Movies
INNER JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
INNER JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
INNER JOIN MovieMoods ON Movies.movie_id = MovieMoods.movie_id
INNER JOIN Moods ON MovieMoods.mood_id = Moods.mood_id
WHERE Genres.genre_name = {{genreName}} AND Moods.mood_name = {{moodName}};

-- get all movies of a particular mood and genre and age rating
SELECT Movies.movie_title FROM Movies
INNER JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
INNER JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
INNER JOIN MovieMoods ON Movies.movie_id = MovieMoods.movie_id
INNER JOIN Moods ON MovieMoods.mood_id = Moods.mood_id
INNER JOIN AgeRatings ON Movies.age_rating_id = AgeRatings.age_rating_id
WHERE Genres.genre_name = {{genreName}} AND Moods.mood_name = {{moodName}}
AND AgeRatings.age_rating_description = {{ageRating}};

-- get all genres
SELECT Genres.genre_name FROM Genres;

-- get all moods
SELECT Moods.mood_name FROM Moods;

-- get all age ratings
SELECT AgeRatings.age_rating_description FROM AgeRatings;



------- UPDATE --------

-- Edit user email/phone
UPDATE Users SET user_email = {{userEmail}}, user_phone = {{userPhoneNumber}} 
WHERE user_id = {{userID}};

-- Edit actor name/birthdate
UPDATE Actors SET first_name = {{actorFirstName}}, 
last_name = {{actorLastName}}, actor_birth_date = {{actorBirthDate}} 
WHERE actor_id = {{actorID}};

-- Edit movie name/year
UPDATE Movies SET movie_title = {{movieTitle}}, movie_year = {{movieYear}}
WHERE movie_id = {{movieID}};

-- Edit genre name
UPDATE Genres SET genre_name = {{genreName}}
WHERE genre_id = {{genreID}};

-- Edit mood name
UPDATE Moods SET mood_name = {{moodName}}
WHERE mood_id = {{moodID}};

-- Edit Age Rating description
UPDATE AgeRatings SET age_rating_description = {{ageRatingDescription}}
WHERE age_rating_id = {{ageRatingID}};



------- DELETE --------

-- Delete a User by ID
DELETE FROM Users WHERE user_id = {{userID}};

-- Delete an actor (removes them from all movies)
DELETE FROM Actors WHERE actor_id = {{actorID}};

-- Delete a movie (actors not deleted)
DELETE FROM Movies WHERE movie_id = {{movieID}};

-- Delete a genre (movies not deleted)
DELETE FROM Genres WHERE genre_id = {{genreID}};

-- Delete a mood (movies not deleted)
DELETE FROM Moods WHERE mood_id = {{moodID}};

-- Delete an Age Rating (Movies with this age rating will have attribute set to NULL)
DELETE FROM AgeRatings WHERE age_rating_id = {{ageRatingID}};


