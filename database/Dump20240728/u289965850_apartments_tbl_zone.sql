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
-- Table structure for table `tbl_zone`
--

DROP TABLE IF EXISTS `tbl_zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_zone` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) NOT NULL,
  `name` varchar(128) NOT NULL,
  `desc` varchar(256) DEFAULT NULL,
  `construction_area` float NOT NULL,
  `total_area` float NOT NULL,
  `number_of_block` tinyint(4) NOT NULL,
  `number_of_unit_land` tinyint(4) NOT NULL,
  `progress` tinyint(4) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_zone_project_idx` (`project_id`),
  CONSTRAINT `fk_zone_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_zone`
--

LOCK TABLES `tbl_zone` WRITE;
/*!40000 ALTER TABLE `tbl_zone` DISABLE KEYS */;
INSERT INTO `tbl_zone` VALUES (43,27,'glory height zone','high area',1,1,5,0,5,'2024-04-07 13:45:15',46,46,'2024-04-07 13:45:15','2024-05-04 19:46:36','true'),(44,29,'test zone 1','this is test zone 1',1,1,2,0,1,'2024-04-24 10:19:03',46,46,'2024-04-24 10:19:03','2024-04-24 10:19:03','false'),(45,30,'test zone 1','this is test zone 1',1,1,2,0,1,'2024-04-24 11:08:14',46,46,'2024-04-24 11:08:14','2024-04-24 11:10:25','true'),(46,30,'test zone 1','this is test zone 1',1,1,2,0,5,'2024-04-29 03:12:13',46,46,'2024-04-29 03:12:13','2024-05-10 12:15:10','true'),(47,30,'test zone 1','this is test zone 1',1,1,2,0,1,'2024-05-11 02:05:53',46,46,'2024-05-11 02:05:53','2024-05-11 02:05:53','false'),(48,30,'test zone 3','this is test zone 1',1,1,2,0,1,'2024-05-11 02:30:53',46,46,'2024-05-11 02:30:53','2024-05-11 02:30:53','false'),(49,30,'test zone 3','this is test zone 1',1,1,2,0,1,'2024-05-11 02:31:43',46,46,'2024-05-11 02:31:43','2024-05-11 02:31:43','false'),(50,29,'test zone 23','oke oke oke 10',4,2,3,2,80,'2024-05-12 17:00:00',46,46,'2024-05-11 02:36:57','2024-05-29 09:45:03','false'),(51,31,'The manhattan glory zone','land area',30,48,0,127,100,'2024-05-15 13:46:09',46,46,'2024-05-15 13:46:09','2024-05-15 13:48:24','false'),(52,32,'The manhattan glory testing zone','land area',30,48,0,127,100,'2024-05-15 13:49:05',46,46,'2024-05-15 13:49:05','2024-05-15 13:49:05','false'),(55,29,'test zone 2','hihi',1,1,1,1,0,'2024-05-29 10:08:41',46,46,'2024-05-29 10:08:41','2024-05-29 10:08:41','false'),(56,32,'The manhattan golry testing 2','hihi',1,1,1,1,1,'2024-05-29 10:13:34',46,46,'2024-05-29 10:13:34','2024-05-29 11:02:06','false'),(57,33,'glory height zone','high area',1,1,5,0,5,'2024-06-02 01:48:45',46,46,'2024-06-02 01:48:45','2024-06-02 01:48:45','false'),(58,33,'testing zone','testing zone',1,1,1,1,1,'2024-06-08 05:48:44',46,46,'2024-06-08 05:48:44','2024-06-08 05:48:44','false');
/*!40000 ALTER TABLE `tbl_zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:14
