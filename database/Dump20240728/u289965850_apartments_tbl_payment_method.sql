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
-- Table structure for table `tbl_payment_method`
--

DROP TABLE IF EXISTS `tbl_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(20) NOT NULL,
  `total_of_payment_time` tinyint(4) NOT NULL DEFAULT 127,
  `method_name` varchar(256) NOT NULL,
  `percent_discount` float NOT NULL,
  `vat` float DEFAULT NULL,
  `maintenance_fee` float DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `desc` varchar(4068) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_paymentmethod_project_idx` (`project_id`),
  CONSTRAINT `fk_paymentmethod_project` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_payment_method`
--

LOCK TABLES `tbl_payment_method` WRITE;
/*!40000 ALTER TABLE `tbl_payment_method` DISABLE KEYS */;
INSERT INTO `tbl_payment_method` VALUES (6,27,13,'option 1',0.1,0.1,0.2,46,46,'2024-04-09 09:43:13','2024-06-01 06:59:52','100% vốn tự có, thanh toán trong 2 năm'),(7,27,16,'option 2 - 1',0,0.1,0.2,46,46,'2024-04-09 09:48:03','2024-06-01 07:08:56','100% vốn tự có, thanh toán trong 3 năm'),(8,27,21,'option 2 - 2',0,0.1,0.2,46,46,'2024-04-09 09:55:06','2024-06-01 07:30:56','100% vốn tự có, thanh toán trong 4 năm'),(9,27,4,'option 3',0,0.1,0.2,46,46,'2024-04-09 10:01:43','2024-06-01 08:00:28','30% vốn tự có, thanh toán trong 1.4 năm, lãi xuất 0% trong 24 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)'),(10,27,16,'option 4 - 1',0,0.1,0.2,46,46,'2024-04-09 10:04:51','2024-06-01 08:11:39','55% vốn tự có, thanh toán trong 2.7 năm, lãi xuất 0% trong 48 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)'),(11,27,21,'option 4 - 2',0,0.1,0.2,46,46,'2024-04-09 10:05:27','2024-06-01 08:25:30','55% vốn tự có, thanh toán trong 3.7 năm, lãi xuất 0% trong 48 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)'),(12,31,8,'option 1',0.6,0.1,0.2,46,46,'2024-06-01 11:43:54','2024-06-01 11:50:24','100% vốn tự có, thanh toán trong 7 tháng. Voucher 200 triệu vinfast (dòng xe áp dụng Vinfast Lux SA). Nhận được mức chiết khấu lên đến 6% vào giá bán trước VAT khi thanh toán sớm trong vòng 15 ngày kể từ ngày ký hợp đồng mua bán.'),(13,32,8,'option 1',0.6,0.1,0.2,46,46,'2024-06-01 11:44:34','2024-06-01 11:50:29','100% vốn tự có, thanh toán trong 7 tháng. Voucher 200 triệu vinfast (dòng xe áp dụng Vinfast Lux SA). Nhận được mức chiết khấu lên đến 6% vào giá bán trước VAT khi thanh toán sớm trong vòng 15 ngày kể từ ngày ký hợp đồng mua bán.'),(14,31,6,'option 2',0,0.1,0.2,46,46,'2024-06-01 14:18:36','2024-06-01 14:18:36','30% vốn tự có, thanh toán khoảng 3 tháng, lãi xuất 0% trong 18 tháng, ân hạn nợ gốc trong 18 tháng.'),(15,32,6,'option 2',0,0.1,0.2,46,46,'2024-06-01 14:18:42','2024-06-01 14:18:42','30% vốn tự có, thanh toán khoảng 3 tháng, lãi xuất 0% trong 18 tháng, ân hạn nợ gốc trong 18 tháng.'),(16,33,13,'option 1',0.1,0.1,0.2,46,46,'2024-04-09 09:43:13','2024-06-01 06:59:52','100% vốn tự có, thanh toán trong 2 năm'),(17,33,16,'option 2 - 1',0,0.1,0.2,46,46,'2024-04-09 09:48:03','2024-06-01 07:08:56','100% vốn tự có, thanh toán trong 3 năm'),(18,33,21,'option 2 - 2',0,0.1,0.2,46,46,'2024-04-09 09:55:06','2024-06-01 07:30:56','100% vốn tự có, thanh toán trong 4 năm'),(19,33,4,'option 3',0,0.1,0.2,46,46,'2024-04-09 10:01:43','2024-06-01 08:00:28','30% vốn tự có, thanh toán trong 1.4 năm, lãi xuất 0% trong 24 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)'),(20,33,16,'option 4 - 1',0,0.1,0.2,46,46,'2024-04-09 10:04:51','2024-06-01 08:11:39','55% vốn tự có, thanh toán trong 2.7 năm, lãi xuất 0% trong 48 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)'),(21,33,21,'option 4 - 2',0,0.1,0.2,46,46,'2024-04-09 10:05:27','2024-06-01 08:25:30','55% vốn tự có, thanh toán trong 3.7 năm, lãi xuất 0% trong 48 tháng, ân hạn nợ gốc trong 48 tháng (tính từ ngày giải ngân đầu tiên)');
/*!40000 ALTER TABLE `tbl_payment_method` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:09
