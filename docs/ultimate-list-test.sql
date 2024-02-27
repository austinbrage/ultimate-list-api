DROP DATABASE IF EXISTS `ultimate_list_test`;

CREATE DATABASE `ultimate_list_test`;

USE `ultimate_list_test`;

-- Study Mode Tables

-- 01 Users Table
CREATE TABLE `users` (
    `id`            INT          AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(250) UNIQUE NOT NULL,
    `password`      VARCHAR(250) NOT NULL,
    `email`         VARCHAR(250) UNIQUE NOT NULL,
    `nickname`      VARCHAR(250) DEFAULT NULL,
    `external_id`   VARCHAR(250) DEFAULT NULL,
    `auth_provider` VARCHAR(250) DEFAULT NULL,
    `api_key`       VARCHAR(32)  UNIQUE DEFAULT SUBSTRING(MD5(RAND()), 1, 32) 
);

-- 02 Knowledge Table
CREATE TABLE `knowledge` (
 	`id`                   INT AUTO_INCREMENT PRIMARY KEY,
 	`user_id`              INT NOT NULL,
 	`priority`             INT NOT NULL DEFAULT 1,
 	`type`                 VARCHAR(250) NOT NULL DEFAULT 'Frontend', 	
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'Unnamed knowledge',
 	`description`          TEXT NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
 	`created_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 	UNIQUE KEY             `user_id_name_unique` (`user_id`,`name`),
 	FOREIGN KEY            (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE 
); 

-- 03 Knowledge Concepts Table
CREATE TABLE `knowledge_concepts` (
 	`id`                   INT AUTO_INCREMENT PRIMARY KEY,
 	`knowledge_id`         INT NOT NULL,
 	`priority`             INT NOT NULL DEFAULT 1,	
 	`type`                 VARCHAR(250) NOT NULL DEFAULT 'Core concept', 	
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'Unnamed concept',
 	`description`          TEXT NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
 	UNIQUE KEY             `knowledge_id_name_unique` (`knowledge_id`,`name`),
 	FOREIGN KEY            (`knowledge_id`) REFERENCES `knowledge`(`id`) ON DELETE CASCADE 
); 

-- 04 Researchs Table
CREATE TABLE `researchs` (
 	`id`                   INT AUTO_INCREMENT PRIMARY KEY,
 	`user_id`              INT NOT NULL,
 	`priority`             INT NOT NULL DEFAULT 1,
 	`type`                 VARCHAR(250) NOT NULL DEFAULT 'Frontend', 
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'Unnamed research',
 	`description`          TEXT NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
 	`created_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 	UNIQUE KEY             `user_id_name_unique` (`user_id`,`name`),
 	FOREIGN KEY            (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE 
);

-- 05 Research Questions Table
CREATE TABLE `research_questions` (
 	`id`                   INT AUTO_INCREMENT PRIMARY KEY,
 	`research_id`          INT NOT NULL,
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'Unnamed question',
 	`priority`             INT NOT NULL DEFAULT 1,
 	`description`          VARCHAR(250) NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
	UNIQUE KEY             `research_id_name_unique` (`research_id`,`name`),
 	FOREIGN KEY            (`research_id`) REFERENCES `researchs`(`id`) ON DELETE CASCADE 
);

-- 06 Research Question Answers Table
CREATE TABLE `research_question_answers` (
 	`id`                   INT AUTO_INCREMENT PRIMARY KEY,
 	`question_id`          INT NOT NULL,
 	`priority`             INT NOT NULL DEFAULT 1,	
 	`type`                 VARCHAR(250) NOT NULL DEFAULT 'Core answer',
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'Unnamed answer',
 	`description`          TEXT NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
 	UNIQUE KEY             `question_id_name_unique` (`question_id`,`name`),
 	FOREIGN KEY            (`question_id`) REFERENCES `research_questions`(`id`) ON DELETE CASCADE 
);