CREATE DATABASE IF NOT EXISTS tc2005b;

USE tc2005b;

CREATE TABLE `TC2005B-RETO`.`user` (
    `iduser` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `type` ENUM("student", "profesor") NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`iduser`));


CREATE TABLE `TC2005B-RETO`.`comment` (
    `idcomment` INT NOT NULL AUTO_INCREMENT,
    `iduser` INT NOT NULL,
    `comment` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP,
    PRIMARY KEY (`idcomment`),
    FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
);

ALTER TABLE `TC2005B-RETO`.`comment` 
    MODIFY COLUMN `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE `TC2005B-RETO`.`replies` (
    `idreply` INT NOT NULL AUTO_INCREMENT,
    `idcomment` INT NOT NULL,
    `iduser` INT NOT NULL,
    `idreply_parent` INT,
    `reply` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`idreply`),
    FOREIGN KEY (`idcomment`) REFERENCES `comment` (`idcomment`),
    FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`),
    FOREIGN KEY (`idreply_parent`) REFERENCES `replies` (`idreply`)
);



DESCRIBE `user`;

INSERT INTO `user` (`email`, `password`, `type`, `username`) VALUES ("jdany041@gmail.com", "1234", "student", "jdany041") 