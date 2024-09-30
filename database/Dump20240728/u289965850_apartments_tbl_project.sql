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
-- Table structure for table `tbl_project`
--

DROP TABLE IF EXISTS `tbl_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `address` varchar(256) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `email` varchar(64) NOT NULL,
  `open_at` datetime NOT NULL,
  `activated` enum('true','false') NOT NULL,
  `project_progress` tinyint(4) DEFAULT 0,
  `desc` varchar(256) DEFAULT NULL,
  `started_day` datetime NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL,
  `status` enum('working','done') NOT NULL DEFAULT 'working',
  `budget` bigint(20) NOT NULL DEFAULT 1000,
  `img` varchar(255) NOT NULL DEFAULT 'https://avatars.githubusercontent.com/u/6?v=4',
  `type` enum('high','land','both') NOT NULL DEFAULT 'high',
  `planning` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_project`
--

LOCK TABLES `tbl_project` WRITE;
/*!40000 ALTER TABLE `tbl_project` DISABLE KEYS */;
INSERT INTO `tbl_project` VALUES (27,'Glory Heights','Khu dân cư và công viên Phước Thiện P.Long Bình và PLong Thạnh Mỹ, Q.9 , TP.HCM','0901838283','admin@vinhome.com.vn','2024-04-07 13:32:45','true',20,NULL,'2024-04-07 13:32:45',46,46,'2024-04-07 13:32:45','2024-04-07 13:51:58','false','working',1000,'https://avatars.githubusercontent.com/u/6?v=4','high',''),(29,'test project','Khu dân cư và công viên Phước Thiện','0901838283','admin@vinhome.com.vn','2024-04-24 10:14:26','true',20,NULL,'2024-04-24 10:14:26',46,46,'2024-04-24 10:14:26','2024-04-24 10:14:26','true','working',1000,'https://avatars.githubusercontent.com/u/6?v=4','high',''),(30,'test project 2','Khu dân cư và công viên Phước Thiện','0901838283','admin@vinhome.com.vn','2024-04-24 11:04:10','true',20,NULL,'2024-04-24 11:04:10',46,46,'2024-04-24 11:04:10','2024-04-24 11:04:10','true','working',1000,'https://avatars.githubusercontent.com/u/6?v=4','land',''),(31,'The Manhattan Glory','RRPV+945, Đ. Nguyễn Xiển, Long Bình, Quận 9, Thành phố Hồ Chí Minh','0901838283','admin@vinhome.com.vn','2005-05-06 00:00:00','true',20,NULL,'2005-05-06 00:00:00',46,46,'2024-05-15 13:27:08','2024-07-16 06:15:46','false','done',100000,'https://avatars.githubusercontent.com/u/6?v=4','land',''),(32,'The Manhattan Glory Testing','RRPV+945, Đ. Nguyễn Xiển, Long Bình, Quận 9, Thành phố Hồ Chí Minh','0901838283','admin@vinhome.com.vn','2024-05-14 17:00:00','false',20,NULL,'2024-05-14 17:00:00',46,46,'2024-05-15 13:27:52','2024-07-16 06:09:16','true','done',100000,'https://avatars.githubusercontent.com/u/6?v=4','land',''),(33,'Glory Heights Testing','Khu dân cư và công viên Phước Thiện P.Long Bình và PLong Thạnh Mỹ, Q.9 , TP.HCMMMM','0901838283','admin@vinhome.com.vnnnn','2005-05-06 00:00:00','true',21,NULL,'2005-05-06 00:00:00',46,46,'2024-06-02 01:43:48','2024-07-16 06:13:05','true','working',1000,'https://avatars.githubusercontent.com/u/6?v=4','high','');
/*!40000 ALTER TABLE `tbl_project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:05
