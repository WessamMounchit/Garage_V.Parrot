CREATE DATABASE jwt;

  CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cars
(
    car_id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    year VARCHAR(4) NOT NULL,
    mileage VARCHAR(50) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    gallery TEXT[],
    features TEXT[],
    equipment TEXT[]
);

  CREATE TABLE IF NOT EXISTS services
(
    service_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL
);
 
  CREATE TABLE IF NOT EXISTS testimonials
(
    testimonial_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    job VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    mark VARCHAR(2) NOT NULL,
    image_path VARCHAR(255) NOT NULL
);

CREATE TABLE opening_hours (
  day VARCHAR(10) NOT NULL PRIMARY KEY,
  morning_open VARCHAR(5),
  morning_close VARCHAR(5),
  afternoon_open VARCHAR(5),
  afternoon_close VARCHAR(5)
);

INSERT INTO opening_hours (day, morning_open, morning_close, afternoon_open, afternoon_close)
VALUES
  ('lundi', '08:45', '12:00', '14:00', '18:00'),
  ('mardi', '08:45', '12:00', '14:00', '18:00'),
  ('mercredi', '08:45', '12:00', '14:00', '18:00'),
  ('jeudi', NULL, NULL, NULL, NULL),
  ('vendredi', NULL, NULL, NULL, NULL),
  ('samedi', '08:45', '12:00', '14:00', '18:00'),
  ('dimanche', '08:45', '12:00', '14:00', '18:00');


