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
