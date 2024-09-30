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
-- Table structure for table `tbl_customer`
--

DROP TABLE IF EXISTS `tbl_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `social_id` varchar(256) DEFAULT NULL,
  `phone` varchar(12) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `display_name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `contacted` enum('true','false') NOT NULL,
  `potential` enum('true','false') NOT NULL,
  `activated` enum('true','false') NOT NULL DEFAULT 'false',
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `project_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customer_account_createdby_idx` (`created_by`),
  KEY `fk_customer_account_updatedby_idx` (`updated_by`),
  KEY `fk_customer_project_id_idx` (`project_id`),
  CONSTRAINT `fk_customer_account_createdby_idx` FOREIGN KEY (`created_by`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `fk_customer_account_updatedby_idx` FOREIGN KEY (`updated_by`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `fk_customer_project_id_idx` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_customer`
--

LOCK TABLES `tbl_customer` WRITE;
/*!40000 ALTER TABLE `tbl_customer` DISABLE KEYS */;
INSERT INTO `tbl_customer` VALUES (55,NULL,'0123456787','customer','one','one','normaluser2@gmail.com','false','true','true','false',46,46,'2024-06-11 05:01:25','2024-06-11 11:01:22',31),(56,NULL,'0123456787','customer','one','customer one','normaluser2@gmail.com','false','false','true','false',46,46,'2024-06-11 05:02:01','2024-06-12 04:00:25',33),(57,NULL,'0964886660','tang','dien','tang dien','20521185@gm.uit.edu.vn','false','true','true','false',56,56,'2024-07-16 16:28:53','2024-07-16 16:28:53',27),(59,NULL,'0385363783','gloryheight','customer','gloryheight customer','tangvietdien0707@gmail.com','false','true','true','false',46,46,'2024-07-16 17:15:09','2024-07-16 17:15:09',27);
/*!40000 ALTER TABLE `tbl_customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:20:58
