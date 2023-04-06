CREATE DATABASE IF NOT EXISTS tc2005b;

USE tc2005b;

CREATE TABLE `TC2005B-RETO`.`user` (
    `iduser` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `type` ENUM("student", "profesor") NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`iduser`));


    DESCRIBE `user`;

    INSERT INTO `user` (`email`, `password`, `type`, `username`) VALUES ("jdany041@gmail.com", "1234", "student", "jdany041") 