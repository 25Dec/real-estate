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
-- Table structure for table `tbl_message`
--

DROP TABLE IF EXISTS `tbl_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `content` varchar(4068) NOT NULL,
  `status` enum('primary','secondary','success','error','warning','info','light','dark') DEFAULT 'info',
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  `project_id` bigint(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_message_account_createdby_idx` (`created_by`),
  KEY `fk_message_account_updatedby_idx` (`updated_by`),
  KEY `fk_message_project_id_idx` (`project_id`),
  CONSTRAINT `fk_message_account_createdby` FOREIGN KEY (`created_by`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `fk_message_account_updatedby` FOREIGN KEY (`updated_by`) REFERENCES `tbl_account` (`id`),
  CONSTRAINT `fk_message_project_id` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_message`
--

LOCK TABLES `tbl_message` WRITE;
/*!40000 ALTER TABLE `tbl_message` DISABLE KEYS */;
INSERT INTO `tbl_message` VALUES (1,'a','a','info',13,13,'2023-08-09 08:39:49','2023-08-09 08:39:49','true',0),(4,'a','a','info',25,25,'2024-01-23 03:52:49','2024-01-23 03:52:49','false',1),(5,'a','a','info',25,25,'2024-01-23 03:55:18','2024-01-23 03:55:18','false',1),(6,'a','a','info',25,25,'2024-01-23 03:55:20','2024-01-23 03:55:20','false',1),(16,'test','test','info',46,46,'2024-04-22 22:32:15','2024-06-13 17:27:09','false',32),(17,'test2','testttsts','info',46,46,'2024-04-22 22:43:21','2024-04-22 22:43:21','false',23),(18,'testttwttr','sdfssasdsad','info',46,46,'2024-04-22 22:45:37','2024-04-22 22:45:37','false',24),(23,'hahahihi','test','info',46,46,'2024-04-25 13:28:08','2024-04-26 09:18:30','false',23),(27,'this is noti','this is noti','info',46,46,'2024-05-07 16:36:39','2024-06-12 04:07:07','false',33),(29,'abcdef','afdfdf','',46,46,'2024-06-11 11:11:23','2024-06-12 04:07:27','false',32);
/*!40000 ALTER TABLE `tbl_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:16