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
-- Table structure for table `tbl_land_booking`
--

DROP TABLE IF EXISTS `tbl_land_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_land_booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `land_area_id` bigint(20) DEFAULT NULL,
  `zone_id` bigint(20) NOT NULL,
  `booking_fee` float NOT NULL,
  `sale_id` bigint(20) NOT NULL,
  `buyer_id` bigint(20) NOT NULL,
  `status` enum('enable','disable','cancelled') NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `payment_method_id` bigint(20) DEFAULT NULL,
  `begin_payment` datetime DEFAULT NULL,
  `project_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_landbooking_landarea_idx` (`land_area_id`),
  KEY `fk_landbooking_saler_idx` (`sale_id`),
  KEY `fk_landbooking_zone_idx` (`zone_id`),
  KEY `fk_landbooking_buyer_idx` (`buyer_id`),
  KEY `fk_landbooking_paymentmethod_idx` (`payment_method_id`),
  KEY `fk_landbooking_project_idx` (`project_id`),
  CONSTRAINT `fk_landbooking_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `tbl_customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_landarea` FOREIGN KEY (`land_area_id`) REFERENCES `tbl_land_area` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_paymentmethod` FOREIGN KEY (`payment_method_id`) REFERENCES `tbl_payment_method` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_saler` FOREIGN KEY (`sale_id`) REFERENCES `tbl_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_landbooking_zone` FOREIGN KEY (`zone_id`) REFERENCES `tbl_zone` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_booking`
--

LOCK TABLES `tbl_land_booking` WRITE;
/*!40000 ALTER TABLE `tbl_land_booking` DISABLE KEYS */;
INSERT INTO `tbl_land_booking` VALUES (2,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 09:49:48','2024-07-12 11:07:41',6,'2024-07-13 00:00:00',0),(3,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:21:03','2024-07-12 10:21:03',NULL,'2024-07-12 10:21:03',0),(4,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:25:25','2024-07-12 10:25:25',NULL,'2024-07-12 10:25:25',0),(5,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:36:49','2024-07-12 10:36:49',NULL,'2024-07-12 10:36:49',0),(6,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:39:11','2024-07-12 10:39:11',NULL,'2024-07-12 10:39:11',0),(7,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:40:15','2024-07-12 10:40:15',NULL,'2024-07-12 10:40:15',0),(8,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:50:23','2024-07-12 10:50:23',NULL,'2024-07-12 10:50:23',0),(9,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:52:08','2024-07-12 10:52:08',NULL,'2024-07-12 10:52:08',0),(10,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 10:59:42','2024-07-12 10:59:42',6,'0000-00-00 00:00:00',0),(11,NULL,56,10000000,51,55,'enable',46,46,'2024-07-12 11:10:56','2024-07-12 11:10:56',6,'2024-07-14 00:00:00',0);
/*!40000 ALTER TABLE `tbl_land_booking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:18
