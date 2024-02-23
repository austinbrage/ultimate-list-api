DROP DATABASE IF EXISTS `ultimate_list_test`;

CREATE DATABASE `ultimate_list_test`;

USE `ultimate_list_test`;

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