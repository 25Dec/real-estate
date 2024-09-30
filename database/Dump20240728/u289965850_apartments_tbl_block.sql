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
-- Table structure for table `tbl_block`
--

DROP TABLE IF EXISTS `tbl_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_block` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `zone_id` bigint(20) NOT NULL,
  `number_of_floor` int(11) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `is_service` enum('true','false') NOT NULL DEFAULT 'true',
  `desc` varchar(256) DEFAULT NULL,
  `type` enum('normal','luxury') NOT NULL,
  `progress` int(11) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  KEY `fk_block_project_idx` (`zone_id`),
  CONSTRAINT `fk_block_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_block`
--

LOCK TABLES `tbl_block` WRITE;
/*!40000 ALTER TABLE `tbl_block` DISABLE KEYS */;
INSERT INTO `tbl_block` VALUES (6,43,26,0,0,'','gh1','normal',20,'2024-04-07 14:10:07',46,46,'2024-04-07 14:10:07','2024-05-31 04:06:43','false'),(7,43,26,0,0,'','gh2','normal',20,'2024-04-07 14:20:13',46,46,'2024-04-07 14:20:13','2024-04-07 14:20:13','true'),(11,44,2,0,0,'','block test 1','normal',20,'2024-04-24 10:25:14',46,46,'2024-04-24 10:25:14','2024-04-24 10:25:14','true'),(12,55,2,0,0,'','block test 2','normal',20,'2024-04-24 10:26:01',46,46,'2024-04-24 10:26:01','2024-06-01 05:40:12','true'),(17,54,1,0,0,'','block test 3','luxury',0,'2024-05-29 11:50:15',46,46,'2024-05-29 11:50:15','2024-06-01 05:12:39','false'),(21,50,3,0,0,'true','gh3','normal',11,'2024-06-01 05:40:35',46,46,'2024-06-01 05:40:35','2024-06-01 05:40:35','false'),(22,57,26,0,0,'','gh1','normal',20,'2024-04-07 14:10:07',46,46,'2024-04-07 14:10:07','2024-05-31 04:06:43','false'),(23,57,26,0,0,'','gh2','normal',20,'2024-04-07 14:20:13',46,46,'2024-04-07 14:20:13','2024-04-07 14:20:13','true'),(24,57,3,0,0,'','gh3','normal',11,'2024-06-01 05:40:35',46,46,'2024-06-01 05:40:35','2024-06-01 05:40:35','false'),(25,58,1,1,1,'true','testing block','normal',1,'2024-06-08 05:49:56',46,46,'2024-06-08 05:49:56','2024-06-08 05:49:56','false'),(26,58,1,1,1,'true','testing block 2','normal',1,'2024-06-08 05:50:43',46,46,'2024-06-08 05:50:43','2024-06-08 05:50:43','true');
/*!40000 ALTER TABLE `tbl_block` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:02
