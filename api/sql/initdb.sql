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
-- Table: Products
CREATE TABLE public.products (
	id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
	title character varying COLLATE pg_catalog."default" NOT NULL,
	content character varying COLLATE pg_catalog."default" NOT NULL,
	type_id integer NOT NULL DEFAULT nextval('products_type_id_seq'::regclass),
	created_date date,
	author_id integer NOT NULL DEFAULT nextval('products_author_id_seq'::regclass),
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT products_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,
	CONSTRAINT products_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.product_types (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID
);
-- Table: Product types
CREATE TABLE public.product_types (
	id integer NOT NULL DEFAULT nextval('product_types_id_seq'::regclass),
	title character varying(70) COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT product_types_pkey PRIMARY KEY (id)
);