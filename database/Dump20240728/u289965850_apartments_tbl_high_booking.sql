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
-- Table structure for table `tbl_high_booking`
--

DROP TABLE IF EXISTS `tbl_high_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_high_booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `high_area_id` bigint(20) DEFAULT NULL,
  `zone_id` bigint(20) NOT NULL,
  `booking_fee` float NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `buyer_id` bigint(20) NOT NULL,
  `status` enum('enable','disable','cancelled') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `payment_method_id` bigint(20) NOT NULL,
  `begin_payment` datetime DEFAULT NULL,
  `project_id` bigint(20) NOT NULL,
  `type` enum('booking','deposit') NOT NULL DEFAULT 'deposit',
  PRIMARY KEY (`id`),
  KEY `fk_highbooking_higharea_idx` (`high_area_id`),
  KEY `fk_highbooking_zone_idx` (`zone_id`),
  KEY `fk_highbooking_buyer_idx` (`buyer_id`),
  KEY `fk_highbooking_saler_idx` (`sale_id`),
  KEY `fk_highbooking_paymentmethod_idx` (`payment_method_id`),
  KEY `fk_highbooking_project_idx` (`project_id`),
  CONSTRAINT `fk_highbooking_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `tbl_customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_higharea` FOREIGN KEY (`high_area_id`) REFERENCES `tbl_high_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_paymentmethod` FOREIGN KEY (`payment_method_id`) REFERENCES `tbl_payment_method` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_saler` FOREIGN KEY (`sale_id`) REFERENCES `tbl_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_highbooking_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_high_booking`
--

LOCK TABLES `tbl_high_booking` WRITE;
/*!40000 ALTER TABLE `tbl_high_booking` DISABLE KEYS */;
INSERT INTO `tbl_high_booking` VALUES (2,10,56,10000000,51,55,'cancelled',46,46,'2024-07-16 04:48:54','2024-07-16 04:59:30',6,'2024-08-11 17:00:00',27,'deposit'),(3,1953,57,10000000,56,56,'enable',56,56,'2024-07-16 05:02:14','2024-07-16 05:02:14',21,'2024-07-16 05:02:14',33,'deposit'),(4,1991,58,50000000,56,55,'cancelled',56,56,'2024-07-16 05:02:59','2024-07-16 05:24:04',21,'2024-07-16 05:02:58',33,'booking'),(5,NULL,43,50000000,56,56,'enable',56,56,'2024-07-16 07:02:47','2024-07-16 07:02:47',11,'2024-07-16 07:02:47',27,'booking'),(6,977,43,10000000,56,56,'disable',56,56,'2024-07-16 07:13:21','2024-07-16 07:30:04',11,'2024-07-16 07:13:09',27,'booking'),(7,521,43,10000000,56,56,'enable',56,56,'2024-07-16 07:36:03','2024-07-16 07:36:03',11,'2024-07-16 07:36:03',27,'booking'),(8,493,43,10000000,58,57,'enable',58,58,'2024-07-16 17:57:31','2024-07-16 17:57:31',11,'2024-07-16 17:57:31',27,'booking'),(9,466,43,10000000,58,59,'enable',58,58,'2024-07-16 18:08:19','2024-07-16 18:08:19',11,'2024-07-16 18:08:18',27,'deposit'),(10,439,43,10000000,58,59,'enable',58,58,'2024-07-16 18:14:06','2024-07-16 18:14:06',11,'2024-07-16 18:14:06',27,'deposit'),(11,440,43,10000000,58,59,'enable',58,58,'2024-07-16 18:26:43','2024-07-16 18:26:43',11,'2024-07-16 18:26:43',27,'deposit');
/*!40000 ALTER TABLE `tbl_high_booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:07
