CREATE DATABASE jwt;

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255),
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
  car_id SERIAL PRIMARY KEY,
  model VARCHAR(100) NOT NULL,
  price VARCHAR(50) NOT NULL,
  year VARCHAR(4) NOT NULL,
  mileage VARCHAR(50) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  gallery TEXT [],
  features TEXT [],
  equipment TEXT []
);

CREATE TABLE cars (
  seat VARCHAR(2),
  doors VARCHAR(2),
  automatic VARCHAR(20),
  description TEXT
);

CREATE TABLE IF NOT EXISTS cars (
  car_id SERIAL PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  car_name VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  gallery TEXT [] NOT NULL,
  seat INTEGER NOT NULL,
  doors INTEGER NOT NULL,
  automatic VARCHAR(20) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  service_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_path VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS testimonials (
  testimonial_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  job VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  mark INTEGER NOT NULL,
  image_path VARCHAR(255) NOT NULL
);

CREATE TABLE opening_hours (
  day VARCHAR(10) NOT NULL PRIMARY KEY,
  morning_open VARCHAR(5),
  morning_close VARCHAR(5),
  afternoon_open VARCHAR(5),
  afternoon_close VARCHAR(5)
);

INSERT INTO
  testimonials (
    first_name,
    last_name,
    job,
    description,
    mark,
    image_path
  )
VALUES
  (
    'Marie',
    'Dupont',
    'Enseignante',
    'J''ai acheté ma première voiture chez Vincent Parrot et je suis vraiment satisfaite. Le service client était excellent et l''équipe m''a bien conseillée. Je recommande vivement ce garage !',
    5,
    'uploads/face1.jpg'
  ),
  (
    'Jean',
    'Martin',
    'Ingénieur',
    'J''ai trouvé la voiture de mes rêves chez Vincent Parrot. Le processus d''achat était simple et transparent. Je suis très content de mon achat.',
    4,
    'uploads/face2.jpg'
  ),
  (
    'Sophie',
    'Lefebvre',
    'Étudiante',
    'Vincent Parrot propose une grande sélection de voitures à des prix compétitifs. J''ai été impressionnée par la qualité du service et la rapidité de la transaction.',
    4,
    'uploads/face3.jpg'
  ),
  (
    'Pierre',
    'Leclerc',
    'Commerçant',
    'J''ai fait réparer ma voiture chez Vincent Parrot et je suis satisfait du travail effectué. L''équipe a été professionnelle et la réparation a été faite dans les délais.',
    4,
    'uploads/face4.jpg'
  ),
  (
    'Catherine',
    'Girard',
    'Infirmière',
    'J''ai fait l''entretien régulier de ma voiture chez Vincent Parrot. Le personnel était amical et compétent. Je me sens en sécurité en conduisant ma voiture après leur service.',
    5,
    'uploads/face5.jpg'
  ),
  (
    'Thomas',
    'Rousseau',
    'Architecte',
    'Je suis un client fidèle de Vincent Parrot depuis des années. Ils ont toujours su me proposer des voitures de qualité. Leur service après-vente est également excellent.',
    5,
    'uploads/face6.jpg'
  ),
  (
    'Émilie',
    'Bertrand',
    'Avocate',
    'Je suis ravie de mon expérience chez Vincent Parrot. L''équipe a pris le temps de m''expliquer toutes les options disponibles et j''ai trouvé la voiture parfaite pour mes besoins.',
    5,
    'uploads/face7.jpg'
  );

INSERT INTO
  opening_hours (
    day,
    morning_open,
    morning_close,
    afternoon_open,
    afternoon_close
  )
VALUES
  ('lundi', '08:45', '12:00', '14:00', '18:00'),
  ('mardi', '08:45', '12:00', '14:00', '18:00'),
  ('mercredi', '08:45', '12:00', '14:00', '18:00'),
  ('jeudi', NULL, NULL, NULL, NULL),
  ('vendredi', NULL, NULL, NULL, NULL),
  ('samedi', '08:45', '12:00', '14:00', '18:00'),
  ('dimanche', '08:45', '12:00', '14:00', '18:00');

INSERT INTO
  cars (
    brand,
    car_name,
    fuel_type,
    price,
    year,
    mileage,
    image_path,
    gallery,
    seat,
    doors,
    automatic,
    description
  )
VALUES
  (
    'Tesla',
    'Model S',
    'Électrique',
    '80000',
    '2022',
    '20000',
    'uploads/car1.png',
    ARRAY ['uploads/car2.png', 'uploads/car3.png'],
    '5',
    '4',
    'Automatique',
    'La Tesla Model S est une berline électrique de luxe qui allie performance et élégance. Avec son design épuré et sa technologie de pointe, elle redéfinit la conduite moderne.'
  ),
  (
    'Toyota',
    'Camry',
    'Essence',
    '35000',
    '2021',
    '15000',
    'uploads/car4.png',
    ARRAY ['uploads/car5.png', 'uploads/car6.png'],
    '5',
    '4',
    'Automatique',
    'La Toyota Camry est une berline populaire reconnue pour sa fiabilité et son confort. Avec son intérieur spacieux et ses caractéristiques avancées, elle offre une expérience de conduite agréable.'
  ),
  (
    'Renault',
    'Clio',
    'Essence',
    '20000',
    '2020',
    '10000',
    'uploads/car7.png',
    ARRAY ['uploads/car8.png', 'uploads/car9.png'],
    '5',
    '4',
    'Automatique',
    'La Renault Clio est une citadine polyvalente qui se démarque par son style moderne et ses performances équilibrées. Elle est parfaite pour les trajets en ville.'
  ),
  (
    'Peugeot',
    '208',
    'Essence',
    '18000',
    '2022',
    '8000',
    'uploads/car10.png',
    ARRAY ['uploads/car11.png', 'uploads/car12.png'],
    '5',
    '4',
    'Manuelle',
    'La Peugeot 208 est une citadine élégante et dynamique, idéale pour les déplacements urbains. Son design moderne et ses fonctionnalités innovantes en font un choix populaire.'
  ),
  (
    'Volkswagen',
    'Golf',
    'Diesel',
    '22000',
    '2020',
    '12000',
    'uploads/car13.png',
    ARRAY ['uploads/car14.png', 'uploads/car15.png'],
    '5',
    '4',
    'Automatique',
    'La Volkswagen Golf est une compacte polyvalente appréciée pour sa qualité de construction et son agrément de conduite. Elle offre un équilibre entre confort et performances.'
  ),
  (
    'Ford',
    'Focus',
    'Essence',
    '23000',
    '2021',
    '11000',
    'uploads/car16.png',
    ARRAY ['uploads/car17.png', 'uploads/car18.png'],
    '5',
    '4',
    'Manuelle',
    'La Ford Focus est une compacte dynamique dotée de caractéristiques modernes et d''une conduite sportive. Elle offre une expérience de conduite engageante.'
  ),
  (
    'Mercedes-Benz',
    'C-Class',
    'Diesel',
    '50000',
    '2023',
    '18000',
    'uploads/car19.png',
    ARRAY ['uploads/car20.png', 'uploads/car1.png'],
    '5',
    '4',
    'Automatique',
    'La Mercedes-Benz Classe C est une berline de luxe élégante et sophistiquée. Avec ses caractéristiques haut de gamme et son confort exceptionnel, elle incarne l''excellence automobile.'
  ),
  (
    'BMW',
    '3 Series',
    'Hybride',
    '55000',
    '2022',
    '16000',
    'uploads/car2.png',
    ARRAY ['uploads/car3.png', 'uploads/car4.png'],
    '5',
    '4',
    'Automatique',
    'La BMW Série 3 hybride associe performances et efficacité énergétique. Elle offre une expérience de conduite dynamique et un intérieur luxueux.'
  ),
  (
    'Audi',
    'A4',
    'Diesel',
    '48000',
    '2021',
    '14000',
    'uploads/car5.png',
    ARRAY ['uploads/car6.png', 'uploads/car7.png'],
    '5',
    '4',
    'Automatique',
    'L''Audi A4 est une berline haut de gamme reconnue pour son design raffiné et ses technologies avancées. Elle offre une expérience de conduite confortable et sophistiquée.'
  ),
  (
    'Kia',
    'Seltos',
    'Essence',
    '25000',
    '2023',
    '12000',
    'uploads/car8.png',
    ARRAY ['uploads/car9.png', 'uploads/car10.png'],
    '5',
    '4',
    'Automatique',
    'Le Kia Seltos est un VUS compact polyvalent équipé d''options modernes et de caractéristiques de sécurité avancées. Il est idéal pour les aventures urbaines et les escapades.'
  ),
  (
    'Hyundai',
    'Tucson',
    'Hybride',
    '30000',
    '2022',
    '10000',
    'uploads/car11.png',
    ARRAY ['uploads/car12.png', 'uploads/car13.png'],
    '5',
    '4',
    'Automatique',
    'Le Hyundai Tucson hybride offre une conduite écoénergétique sans compromettre le confort et la praticité. Avec son design moderne et sa technologie innovante, il est conçu pour la vie moderne.'
  ),
  (
    'Nissan',
    'Rogue',
    'Essence',
    '27000',
    '2021',
    '13000',
    'uploads/car14.png',
    ARRAY ['uploads/car15.png', 'uploads/car16.png'],
    '5',
    '4',
    'Automatique',
    'Le Nissan Rogue est un VUS compact qui offre espace et polyvalence. Avec ses technologies de conduite avancées et son intérieur bien conçu, il est parfait pour les familles actives.'
  ),
  (
    'Mazda',
    'CX-5',
    'Essence',
    '28000',
    '2022',
    '14000',
    'uploads/car17.png',
    ARRAY ['uploads/car18.png', 'uploads/car19.png'],
    '5',
    '4',
    'Automatique',
    'Le Mazda CX-5 est un VUS sportif qui allie style et performances. Son intérieur raffiné et ses caractéristiques de sécurité avancées en font un choix élégant et sécuritaire.'
  ),
  (
    'Chevrolet',
    'Equinox',
    'Essence',
    '26000',
    '2023',
    '12000',
    'uploads/car20.png',
    ARRAY ['uploads/car1.png', 'uploads/car2.png'],
    '5',
    '4',
    'Automatique',
    'Le Chevrolet Equinox est un VUS compact polyvalent avec une allure moderne et des fonctionnalités pratiques. Il est parfait pour la vie quotidienne et les escapades.'
  ),
  (
    'Honda',
    'Civic',
    'Essence',
    '22000',
    '2022',
    '11000',
    'uploads/car3.png',
    ARRAY ['uploads/car4.png', 'uploads/car5.png'],
    '5',
    '4',
    'Automatique',
    'La Honda Civic est une voiture compacte réputée pour sa fiabilité et son efficacité énergétique. Avec son design moderne et son intérieur confortable, elle est idéale pour les trajets urbains.'
  ),
  (
    'Ford',
    'Mustang',
    'Essence',
    '45000',
    '2022',
    '8000',
    'uploads/car6.png',
    ARRAY ['uploads/car7.png', 'uploads/car8.png'],
    '4',
    '2',
    'Manuelle',
    'La Ford Mustang est une icône des voitures de sport, associant puissance et style emblématique. Avec son moteur V8 rugissant et sa conduite passionnante, elle est conçue pour les amateurs de sensations fortes.'
  ),
  (
    'Volkswagen',
    'Beetle',
    'Essence',
    '25000',
    '2021',
    '7000',
    'uploads/car9.png',
    ARRAY ['uploads/car10.png', 'uploads/car11.png'],
    '4',
    '2',
    'Manuelle',
    'La Volkswagen Beetle est une voiture classique qui évoque le charme rétro et l''esprit joyeux. Avec son design distinctif et son caractère unique, elle se démarque sur la route.'
  ),
  (
    'Renault',
    'Kangoo',
    'Diesel',
    '18000',
    '2022',
    '12000',
    'uploads/car12.png',
    ARRAY ['uploads/car13.png', 'uploads/car14.png'],
    '2',
    '4',
    'Manuelle',
    'Le Renault Kangoo est un véhicule utilitaire pratique, idéal pour le transport de marchandises. Avec sa capacité de chargement généreuse et ses fonctionnalités polyvalentes, il répond aux besoins professionnels.'
  ),
  (
    'Peugeot',
    'Partner',
    'Diesel',
    '19000',
    '2023',
    '11000',
    'uploads/car15.png',
    ARRAY ['uploads/car16.png', 'uploads/car17.png'],
    '2',
    '4',
    'Manuelle',
    'Le Peugeot Partner est une fourgonnette commerciale compacte, conçue pour faciliter les livraisons et les déplacements professionnels. Avec son espace de chargement pratique, il répond aux besoins des entrepreneurs.'
  ),
  (
    'Citroën',
    'Berlingo',
    'Essence',
    '20000',
    '2023',
    '10000',
    'uploads/car18.png',
    ARRAY ['uploads/car19.png', 'uploads/car20.png'],
    '2',
    '4',
    'Manuelle',
    'Le Citroën Berlingo est un fourgon utilitaire compact conçu pour la praticité. Avec son design fonctionnel et ses caractéristiques astucieuses, il est parfait pour les professionnels en déplacement.'
  );