-- Database: oclio
-- DROP DATABASE oclio;
CREATE DATABASE oclio WITH OWNER = postgres ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8' TABLESPACE = pg_default CONNECTION
LIMIT = -1;
-- Table: Users
CREATE TABLE users (
	id SERIAL,
	username VARCHAR(70) NOT NULL UNIQUE,
	lastname VARCHAR(120),
	firstname VARCHAR(120),
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY (id)
);
INSERT INTO users (
		username,
		lastname,
		firstname,
		email,
		password
	)
VALUES (
		'sa',
		'admin',
		'admin',
		'admin@oclio.com',
		'1'
	);