-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 217.21.74.51    Database: u289965850_apartments
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.8-MariaDB-cll-lve

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_account`
--

DROP TABLE IF EXISTS `tbl_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `social_id` varchar(256) DEFAULT NULL,
  `phone` varchar(12) NOT NULL,
  `login_name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `display_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `language` char(2) DEFAULT NULL,
  `type` enum('anonymous','admin','super_admin','sale_manager','sale') NOT NULL,
  `employee` binary(1) DEFAULT NULL,
  `phone_verified` varchar(12) NOT NULL,
  `email_verified` varchar(64) NOT NULL,
  `social_verified` varchar(256) DEFAULT NULL,
  `activated` enum('true','false') NOT NULL DEFAULT 'false',
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_account`
--

LOCK TABLES `tbl_account` WRITE;
/*!40000 ALTER TABLE `tbl_account` DISABLE KEYS */;
INSERT INTO `tbl_account` VALUES (13,'https://www.facebook.com/SugarTawng','0385132042','sadmin','$2a$10$U/ccbBgmnXFY5e88F6cHmOkRroJFa5EDEfWVvkUucB.hFyNJXqqA2','Tang','Dien','Sugar Tawng','tangvietdien0709@gmail.com','vi','super_admin',NULL,'0385353783','20521185@gm.uit.edu.vn','https://www.facebook.com/chuot.xa.589','true','true',1,1,'0000-00-00 00:00:00','2024-03-15 10:09:12'),(25,NULL,'0123456789','admin1','$2a$10$3LF7wnvdDilXoFiMHPbCfOci034hsv6P07LR7Qvlktc.jbG15DuAO','Adminnn','Frist111','admin1','admin1@gmail.com',NULL,'admin',NULL,'0123456788','ad1verified@gmail.com',NULL,'true','true',13,13,'2024-01-22 14:23:56','2024-03-15 10:14:27'),(44,NULL,'0123456787','admin2','$2a$10$0LWl8V6YZCb9gBJno2W06.o5VB1jYz8eteEW.3w2g5y7FfZ1hEauy','Second','Admin','admin2','admin2@gmail.com',NULL,'admin',NULL,'0123456788','admin2verify@gmail.com',NULL,'true','false',25,25,'2024-03-15 10:41:49','2024-06-11 09:29:27'),(46,NULL,'0123456787','superadmin','$2a$10$EszEt96eGlUlXwut8UOtOeXUHRrfM3EyNyMJR0dwdOH.K1gI9Vcke','Super','Admin','superadmin','superadmin@gmail.com',NULL,'super_admin',NULL,'0123456788','superadminverify2@gmail.com',NULL,'true','false',25,25,'2024-03-16 07:14:17','2024-03-16 07:14:17'),(48,NULL,'0123456787','normaluser2','$2a$10$qXWAvVjARORtkxRi/CoeZ.Oe0UnR6e2uzSzkd/GunT8SoRFqGNwUu','Normall','User2','Normall User2','normaluser2@gmail.com',NULL,'sale',NULL,'0123456788','normaluser2verify@gmail.com',NULL,'true','true',46,46,'2024-03-16 07:56:48','2024-06-12 04:07:58'),(49,NULL,'0987654321','createuser1','$2a$10$B1YBDjgyr5bQ9yhl4mYJteBWFaKurN17BVsmrzPLMfRgI2U77tS0S','Create','User1','Create User1','createuser1@gmail.com',NULL,'sale_manager',NULL,'0987654322','createuser1Verify@gmail.com',NULL,'true','true',25,25,'2024-03-19 07:33:30','2024-06-12 04:04:53'),(51,NULL,'0964886660','nhannht2512','$2a$10$qZfd7pENyQCj/81NoOH3DOdniy4euR6/xCO5H5MmqqNemDmP/7mx6','Thien','Nhan','Thien Nhan','nhannht2512@gmail.com',NULL,'sale_manager',NULL,'0964886665','nhannht2513@gmail.com',NULL,'true','false',46,46,'2024-04-13 09:47:35','2024-06-12 04:08:13'),(55,NULL,'0123456787','salemanager','$2a$10$YzkLB7hKHcyTI79.d2REl.EN/OM1xgZD.nX3btRF/p38d9o1IhW6G','Sale','Manager','salemanager','salemanager@gmail.com',NULL,'sale_manager',NULL,'0123456788','salemanager2verify@gmail.com',NULL,'true','false',46,46,'2024-06-11 09:25:45','2024-06-11 09:25:45'),(56,NULL,'0123456787','sale','$2a$10$DNWaKerxhATg2jPeAlYYVeMyg4RISnRqMd8mZYc.BMqQny4gt95me','Sale','One','sale','sale@gmail.com',NULL,'sale',NULL,'0123456788','saleoneverify@gmail.com',NULL,'true','false',46,46,'2024-06-11 09:38:20','2024-06-11 09:54:07'),(58,NULL,'0123456787','gloryheightsale','$2a$10$dwpBcMlOJopiXUZsUSE.YenxJZvQm1CnUZzudUsYwz3NEdHf1nhv.','GloryHeigh','Sale','gloryheightsale','gloryheightsale@gmail.com',NULL,'sale',NULL,'0123456788','gloryheightsalever@gmail.com',NULL,'true','false',46,46,'2024-07-16 17:09:52','2024-07-16 17:09:52');
/*!40000 ALTER TABLE `tbl_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:25
