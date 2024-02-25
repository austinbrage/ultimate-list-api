DROP DATABASE IF EXISTS `ultimate_list_test`;

CREATE DATABASE `ultimate_list_test`;

USE `ultimate_list_test`;

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
 	`description`          VARCHAR(250) NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
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
 	`name`                 VARCHAR(250) NOT NULL DEFAULT 'unnamed idea',
 	`description`          VARCHAR(250) NOT NULL DEFAULT 'Lorem ipsum dolor sit amet', 
 	UNIQUE KEY             `knowledge_id_name_unique` (`knowledge_id`,`name`),
 	FOREIGN KEY            (`knowledge_id`) REFERENCES `knowledge`(`id`) ON DELETE CASCADE 
); 