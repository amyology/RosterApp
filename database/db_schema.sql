CREATE TABLE `members` 
(
	`id` int NOT NULL UNIQUE AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`votes` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`)
);