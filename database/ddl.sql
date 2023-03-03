-- -----------------------------------------------------
-- Project Group 116: Film Finder
-- Brant Cass
-- Chase Smith
-- -----------------------------------------------------


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



-- --------------------------------------------------------

--
-- Table structure for table `Actors`
--

CREATE TABLE `Actors` (
  `actor_id` int(11) NOT NULL,
  `first_name` varchar(145) NOT NULL,
  `last_name` varchar(145) NOT NULL,
  `actor_birth_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Actors`
--

INSERT INTO `Actors` (`actor_id`, `first_name`, `last_name`, `actor_birth_date`) VALUES
(1, 'Keanu', 'Reeves', '1964-09-02'),
(2, 'Woody', 'Harrelson', '1961-07-23'),
(3, 'Mike', 'Myers', '1963-05-23');

-- --------------------------------------------------------

--
-- Table structure for table `Age_Ratings`
--

CREATE TABLE `Age_Ratings` (
  `age_rating_id` int(11) NOT NULL,
  `age_rating_description` varchar(145) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Age_Ratings`
--

INSERT INTO `Age_Ratings` (`age_rating_id`, `age_rating_description`) VALUES
(4, 'Adults'),
(1, 'All Ages'),
(2, 'Older Children'),
(3, 'Teens');

-- --------------------------------------------------------

--
-- Table structure for table `Genres`
--

CREATE TABLE `Genres` (
  `genre_id` int(11) NOT NULL,
  `genre_name` varchar(145) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Genres`
--

INSERT INTO `Genres` (`genre_id`, `genre_name`) VALUES
(1, 'Comedy'),
(2, 'Science Fiction'),
(3, 'Thriller'),
(4, 'Romance'),
(5, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `Moods`
--

CREATE TABLE `Moods` (
  `mood_id` int(11) NOT NULL,
  `mood_name` varchar(145) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Moods`
--

INSERT INTO `Moods` (`mood_id`, `mood_name`) VALUES
(1, 'Funny'),
(2, 'Dark'),
(3, 'Intense'),
(4, 'Chill'),
(5, 'Sad');

-- --------------------------------------------------------

--
-- Table structure for table `MovieActors`
--

CREATE TABLE `MovieActors` (
  `movie_actor_movie_id` int(11) NOT NULL,
  `movie_actor_actor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MovieActors`
--

INSERT INTO `MovieActors` (`movie_actor_movie_id`, `movie_actor_actor_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `MovieGenres`
--

CREATE TABLE `MovieGenres` (
  `movie_genre_movie_id` int(11) NOT NULL,
  `movie_genre_genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MovieGenres`
--

INSERT INTO `MovieGenres` (`movie_genre_movie_id`, `movie_genre_genre_id`) VALUES
(1, 3),
(2, 2),
(2, 3),
(3, 1),
(3, 5),
(4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `MovieMoods`
--

CREATE TABLE `MovieMoods` (
  `movie_mood_movie_id` int(11) NOT NULL,
  `movie_mood_mood_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MovieMoods`
--

INSERT INTO `MovieMoods` (`movie_mood_movie_id`, `movie_mood_mood_id`) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(4, 1),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Movies`
--

CREATE TABLE `Movies` (
  `movie_id` int(11) NOT NULL,
  `movie_title` varchar(145) NOT NULL,
  `movie_year` year(4) NOT NULL,
  `age_rating_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Movies`
--

INSERT INTO `Movies` (`movie_id`, `movie_title`, `movie_year`, `age_rating_id`) VALUES
(1, 'John Wick', 2014, 4),
(2, 'A Scanner Darkly', 2006, 4),
(3, 'Zombieland', 2009, 4),
(4, 'Shrek', 2001, 1);

-- --------------------------------------------------------

--
-- Table structure for table `UserMovies`
--

CREATE TABLE `UserMovies` (
  `user_movie_movie_id` int(11) NOT NULL,
  `user_movie_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `UserMovies`
--

INSERT INTO `UserMovies` (`user_movie_movie_id`, `user_movie_user_id`) VALUES
(3, 1),
(3, 3),
(4, 1),
(2, 1),
(2, 4),
(1, 4),
(4, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(145) NOT NULL,
  `user_phone` varchar(145) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `user_email`, `user_phone`) VALUES
(1, 'abc@hi.com', '555-123-4567'),
(2, 'def@hi.com', '555-123-1234'),
(3, 'lmn@hi.com', '555-123-5678'),
(4, 'xyz@hi.com', '555-123-9876');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Actors`
--
ALTER TABLE `Actors`
  ADD PRIMARY KEY (`actor_id`),
  ADD UNIQUE KEY `actor_id_UNIQUE` (`actor_id`);

--
-- Indexes for table `Age_Ratings`
--
ALTER TABLE `Age_Ratings`
  ADD PRIMARY KEY (`age_rating_id`),
  ADD UNIQUE KEY `age_rating_id_UNIQUE` (`age_rating_id`),
  ADD UNIQUE KEY `age_rating_description_UNIQUE` (`age_rating_description`);

--
-- Indexes for table `Genres`
--
ALTER TABLE `Genres`
  ADD PRIMARY KEY (`genre_id`),
  ADD UNIQUE KEY `genre_id_UNIQUE` (`genre_id`);

--
-- Indexes for table `Moods`
--
ALTER TABLE `Moods`
  ADD PRIMARY KEY (`mood_id`),
  ADD UNIQUE KEY `mood_id_UNIQUE` (`mood_id`);

--
-- Indexes for table `MovieActors`
--
ALTER TABLE `MovieActors`
  ADD KEY `movie_id_idx` (`movie_actor_movie_id`),
  ADD KEY `actor_id_idx` (`movie_actor_actor_id`);

--
-- Indexes for table `MovieGenres`
--
ALTER TABLE `MovieGenres`
  ADD KEY `movie_id_idx` (`movie_genre_movie_id`,`movie_genre_genre_id`),
  ADD KEY `genre_id_idx` (`movie_genre_genre_id`);

--
-- Indexes for table `MovieMoods`
--
ALTER TABLE `MovieMoods`
  ADD KEY `movie_id_idx` (`movie_mood_movie_id`,`movie_mood_mood_id`),
  ADD KEY `mood_id_idx` (`movie_mood_mood_id`);

--
-- Indexes for table `Movies`
--
ALTER TABLE `Movies`
  ADD PRIMARY KEY (`movie_id`),
  ADD KEY `age_rating_idx` (`age_rating_id`);

--
-- Indexes for table `UserMovies`
--
ALTER TABLE `UserMovies`
  ADD KEY `movie_id_idx` (`user_movie_movie_id`),
  ADD KEY `user_id_idx` (`user_movie_user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Actors`
--
ALTER TABLE `Actors`
  MODIFY `actor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Genres`
--
ALTER TABLE `Genres`
  MODIFY `genre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Moods`
--
ALTER TABLE `Moods`
  MODIFY `mood_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Movies`
--
ALTER TABLE `Movies`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `MovieActors`
--
ALTER TABLE `MovieActors`
  ADD CONSTRAINT `actor_id` FOREIGN KEY (`movie_actor_actor_id`) REFERENCES `Actors` (`actor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_id` FOREIGN KEY (`movie_actor_movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `MovieGenres`
--
ALTER TABLE `MovieGenres`
  ADD CONSTRAINT `movie_genre_genre_id` FOREIGN KEY (`movie_genre_genre_id`) REFERENCES `Genres` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_genre_movie_id` FOREIGN KEY (`movie_genre_movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `MovieMoods`
--
ALTER TABLE `MovieMoods`
  ADD CONSTRAINT `movie_mood_mood_id` FOREIGN KEY (`movie_mood_mood_id`) REFERENCES `Moods` (`mood_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_mood_movie_id` FOREIGN KEY (`movie_mood_movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Movies`
--
ALTER TABLE `Movies`
  ADD CONSTRAINT `age_rating` FOREIGN KEY (`age_rating_id`) REFERENCES `Age_Ratings` (`age_rating_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserMovies`
--
ALTER TABLE `UserMovies`
  ADD CONSTRAINT `user_movie_movie_id` FOREIGN KEY (`user_movie_movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_movie_user_id` FOREIGN KEY (`user_movie_user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
