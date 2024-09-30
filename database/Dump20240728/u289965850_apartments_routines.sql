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
-- Dumping events for database 'u289965850_apartments'
--

--
-- Dumping routines for database 'u289965850_apartments'
--
/*!50003 DROP FUNCTION IF EXISTS `SumAmountOfAccount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` FUNCTION `SumAmountOfAccount`() RETURNS int(11)
BEGIN
  DECLARE totalAccount INT;

  -- Tính tổng số dòng dữ liệu
  SELECT COUNT(*) INTO totalAccount FROM tbl_account;

  -- Trả về giá trị
  RETURN totalAccount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `SumAmountOfBooking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` FUNCTION `SumAmountOfBooking`() RETURNS int(11)
BEGIN
  DECLARE totalBooking INT;

  -- Tính tổng booking_fee cho tbl_high_booking
  SELECT COUNT(*) INTO totalBooking FROM tbl_high_booking;

  -- Cộng vào tổng booking_fee cho tbl_land_booking
  SELECT totalBooking + COUNT(*) INTO totalBooking FROM tbl_land_booking;

  -- Trả về giá trị
  RETURN totalBooking;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `SumAmountOfMoney` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` FUNCTION `SumAmountOfMoney`() RETURNS double
BEGIN
  DECLARE totalAmountOfMoney DOUBLE;

  -- Tính tổng giá trị của thuộc tính `amount_of_money` từ tbl_land_payment_process
  SELECT SUM(amount_of_money) INTO totalAmountOfMoney FROM tbl_land_payment_process;

  -- Tính tổng giá trị của thuộc tính `amount_of_money` từ tbl_high_payment_process và cộng vào totalAmount
  SELECT totalAmountOfMoney + SUM(amount_of_money) INTO totalAmountOfMoney FROM tbl_high_payment_process;

  -- Trả về giá trị
  RETURN totalAmountOfMoney;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `SumAmountOfRoom` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` FUNCTION `SumAmountOfRoom`() RETURNS int(11)
BEGIN
  DECLARE totalRoom INT;

  -- Tính tổng số lượng dòng từ tbl_land_area
  SELECT COUNT(*) INTO totalRoom FROM tbl_land_area;

  -- Cộng vào tổng số lượng dòng từ tbl_high_area
  SELECT totalRoom + COUNT(*) INTO totalRoom FROM tbl_high_area;

  -- Trả về giá trị
  RETURN totalRoom;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDashboardStatistics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` PROCEDURE `GetDashboardStatistics`()
BEGIN
  DECLARE resultBooking INT;
  DECLARE resultRoom INT;
  DECLARE resultMoney DOUBLE;
  DECLARE resultAccount INT;

  -- Gọi function SumAmountOfBooking và lưu kết quả vào biến
  SELECT SumAmountOfBooking() INTO resultBooking;

  -- Gọi function SumAmountOfRoom và lưu kết quả vào biến
  SELECT SumAmountOfRoom() INTO resultRoom;

  -- Gọi function SumAmountOfMoney và lưu kết quả vào biến
  SELECT SumAmountOfMoney() INTO resultMoney;

  -- Gọi function SumAmountOfAccount và lưu kết quả vào biến
  SELECT SumAmountOfAccount() INTO resultAccount;

  -- In kết quả hoặc trả về theo yêu cầu của bạn
  SELECT resultBooking, resultRoom, resultMoney, resultAccount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SumAmountOfBooking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`u289965850_apartments`@`%` PROCEDURE `SumAmountOfBooking`()
BEGIN
  DECLARE totalBooking INT; -- Đặt kích thước phù hợp với chiều dài tên bảng

  -- Tính tổng booking_fee cho tbl_high_booking
SELECT COUNT(*) INTO totalBooking FROM tbl_land_booking;

  -- Tính tổng booking_fee cho tbl_land_booking
SELECT totalBooking + COUNT(*) INTO totalBooking FROM tbl_high_booking;

SELECT totalBooking AS total_bookings;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 14:21:43
