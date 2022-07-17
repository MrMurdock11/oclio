CREATE TABLE users (
	id bigserial NOT NULL,
	username VARCHAR(70),
	lastname VARCHAR(120),
	firstname VARCHAR(120),
	email VARCHAR(255) NOT NULL,
	password VARCHAR NOT NULL,
	PRIMARY KEY (id)
);