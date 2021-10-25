CREATE DATABASE movies_application;

USE movies_application;



-- 1. find all movies which are equal to movie_name 
SELECT movie_name,production_year from moviessql WHERE movie_name = "Electroma";


-- 2. find all movies which are not equal to movie_name
SELECT movie_name,production_year from moviessql WHERE movie_name != "Electroma";


-- 3. find all movies greater than and greater than equal to a budget
SELECT movie_name,production_year from moviessql WHERE budget >= 19000;


-- 4. find all movies less than and less than equal to a budget
SELECT movie_name,production_year from moviessql WHERE budget <= 10000;


-- 5. find all movies that are produced after 2000 with budget greater than 10000
SELECT movie_name,production_year from moviessql WHERE production_year>2000 AND budget>10000;


-- 6. find all movies that are produced after 2000 or budget greater than 10000
SELECT movie_name,production_year from moviessql WHERE production_year>2000 OR budget>10000;


-- 7. find all movies that are neither produced after 2000 nor with budget greater than 10000.
SELECT movie_name,production_year from moviessql WHERE production_year<=2000 AND budget<=10000;


-- 8. find all movies that are not produced in 2000 or they do not have budget of 10000
SELECT movie_name,production_year from moviessql WHERE production_year!=2000 OR budget!=10000;


-- 9. find all movies that were produced from 2000 to 2010.
SELECT movie_name,production_year from moviessql WHERE production_year>=2000 AND production_year<=2010;


-- 10. Sort all movies descending based on the production year and if the year is same then alphabetically for their movie_names
SELECT movie_name,production_year from moviessql ORDER BY production_year DESC,movie_name ASC; 


-- 11. in query 10 skip the first 10 entries and fetch the next 5
SELECT movie_name,production_year from moviessql ORDER BY production_year DESC,movie_name ASC LIMIT 5 OFFSET 10;


-- 12. remove movie genre from the first 10 movies in query 10.
UPDATE moviessql SET movie_genre=NULL ORDER BY production_year DESC,movie_name ASC LIMIT 10; 
SELECT movie_name,production_year,movie_genre from moviessql ORDER BY production_year DESC,movie_name ASC; 





