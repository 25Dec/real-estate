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
-- Table structure for table `tbl_high_payment_process`
--

DROP TABLE IF EXISTS `tbl_high_payment_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_payment_process` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `high_area_id` bigint(20) NOT NULL,
  `payment_time` tinyint(4) NOT NULL,
  `amount_of_money` double NOT NULL,
  `amount_of_debt` double NOT NULL,
  `submitter` bigint(20) NOT NULL,
  `status` enum('indebted','done') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted` enum('true','false') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  KEY `fk_highpaymentprocess_higharea_idx` (`high_area_id`),
  CONSTRAINT `fk_highpaymentprocess_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_payment_process`
--

LOCK TABLES `tbl_high_payment_process` WRITE;
/*!40000 ALTER TABLE `tbl_high_payment_process` DISABLE KEYS */;
INSERT INTO `tbl_high_payment_process` VALUES (24,34,0,0,0,46,'',46,46,'2024-05-31 04:30:11','2024-05-31 04:30:11','true'),(29,976,2,2,2,46,'',46,46,'2024-06-02 14:19:59','2024-06-02 14:19:59','true'),(32,498,1,1000000,1000000,56,'',56,56,'2024-07-08 03:40:46','2024-07-08 03:40:46','false'),(37,1982,0,6,0,56,'',56,56,'2024-07-15 15:51:18','2024-07-15 15:51:18','false'),(38,1991,0,1,0,56,'',56,56,'2024-07-16 02:07:50','2024-07-16 02:07:50','false'),(39,977,0,0,0,56,'',56,56,'2024-07-16 07:13:47','2024-07-16 07:13:47','false'),(44,466,0,1,0,56,'',58,58,'2024-07-16 18:12:01','2024-07-16 18:12:01','false'),(45,439,0,1,0,59,'',58,58,'2024-07-16 18:14:31','2024-07-16 18:14:31','false'),(46,440,0,55000,45000,59,'',58,58,'2024-07-16 18:27:00','2024-07-16 18:27:00','false');
/*!40000 ALTER TABLE `tbl_high_payment_process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:35
