CREATE DATABASE  IF NOT EXISTS `sswm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sswm`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9a206.p.ssafy.io    Database: sswm
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` bigint DEFAULT NULL,
  `studyroom_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3weh661j9saeydjugum2kni4p` (`studyroom_id`),
  KEY `FK3rey0h7240vbk7odnpw75d87o` (`user_id`),
  CONSTRAINT `FK3rey0h7240vbk7odnpw75d87o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK3weh661j9saeydjugum2kni4p` FOREIGN KEY (`studyroom_id`) REFERENCES `studyroom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_log`
--

DROP TABLE IF EXISTS `daily_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` bigint NOT NULL,
  `rest_time` bigint NOT NULL,
  `stretch_score` int NOT NULL,
  `study_time` bigint NOT NULL,
  `studyroom_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqmv5obtpgqaqe3ju3tspiuwg3` (`studyroom_id`),
  KEY `FK9h1i9jtlqgfq4gxie3i3eeqlb` (`user_id`),
  CONSTRAINT `FK9h1i9jtlqgfq4gxie3i3eeqlb` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKqmv5obtpgqaqe3ju3tspiuwg3` FOREIGN KEY (`studyroom_id`) REFERENCES `studyroom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studyroom`
--

DROP TABLE IF EXISTS `studyroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` bigint NOT NULL DEFAULT '0',
  `enter_code` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `is_public` bit(1) NOT NULL DEFAULT b'0',
  `max_rest_time` int NOT NULL DEFAULT '150',
  `max_user_num` int NOT NULL DEFAULT '9',
  `name` varchar(255) DEFAULT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `study_avg_time` int NOT NULL DEFAULT '0',
  `user_num` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studyroom`
--

LOCK TABLES `studyroom` WRITE;
/*!40000 ALTER TABLE `studyroom` DISABLE KEYS */;
INSERT INTO `studyroom` VALUES (15,1692255100,'','image/jpeg/2023/08/17/7880266b-4ac2-4cb4-81be-70b164fd89fb.jpg',_binary '',_binary '',5400,6,'공부하자',NULL,500059,2),(16,1692258701,'','image/png/2023/08/17/1eb657db-6d8b-4dff-8e21-577fcf7c6d81.png',_binary '\0',_binary '',5400,6,'주4회 9~10','주 4회 공부방입니다.',0,3),(17,1692261670,'ssjjmt','image/png/2023/08/17/6d3b85ab-7bf6-4ed2-86d3-9432613c1251.png',_binary '',_binary '\0',6000,9,'비공개룸',NULL,0,1),(18,1692262033,NULL,'image/png/2023/08/17/27f05f17-2da1-4882-bd28-0ab79abdd060.png',_binary '',_binary '',9000,7,'브루니','코딩테스트를 준비하는 방입니다\n\n매일 하루 2시간씩 와서 알고리즘 같이 풀어요!!',0,6),(19,1692271098,'ssjjmt','image/studyDefault/dolphin.jpg',_binary '',_binary '\0',7200,5,'에효효효효','한숨 쉬지 말고 코테 문제 풀자',0,2),(20,1692276244,'','image/png/2023/08/17/a57b946c-259a-423e-8182-904891f9c211.png',_binary '',_binary '',5400,1,'ㅇㅁ',NULL,0,1),(21,1692276343,'','image/png/2023/08/17/50b6a933-6804-400c-9a7a-c52f9affb833.png',_binary '',_binary '',8400,9,'사진테스트',NULL,0,2),(22,1692276363,'','image/png/2023/08/17/a9210bb6-6061-4ed3-8ea6-a74d4c9a0146.png',_binary '',_binary '',5400,1,'사진테스트2',NULL,0,1),(23,1692276396,'','image/studyDefault/dolphin.jpg',_binary '',_binary '',5400,6,'사진 안넣기',NULL,0,2),(24,1692276433,'','image/jpeg/2023/08/17/5065e060-5ed5-42cc-95bc-42e8325e4dae.jpg',_binary '',_binary '',5400,1,'사진 다른거',NULL,0,1),(25,1692277153,'','image/studyDefault/dolphin.jpg',_binary '',_binary '',5400,1,'사진123',NULL,0,1),(26,1692277164,'','image/png/2023/08/17/45fd85a1-fc78-4220-9886-7d7b088ebf0b.png',_binary '',_binary '',5400,1,'사진 테스트',NULL,0,1),(27,1692277205,'ssjjmt','image/studyDefault/dolphin.jpg',_binary '',_binary '\0',5400,6,'내방',NULL,0,1),(28,1692277287,'ssjjmt','image/jpeg/2023/08/17/d3d84080-941d-46c2-a8e7-a8761fd6b404.jpeg',_binary '',_binary '\0',5400,6,'비공개방이야',NULL,0,1),(29,1692278209,'ssjjmt','image/png/2023/08/17/26ec3042-1db9-4689-b136-11cfec81eb2c.png',_binary '',_binary '\0',5400,1,'사진테스트',NULL,0,1),(30,1692278555,'','image/jpeg/2023/08/17/244b0249-9628-4a10-a0b8-7e1aa6781d3d.jpg',_binary '',_binary '',5400,1,'123123',NULL,0,1),(31,1692278598,'ssjjmt','image/png/2023/08/17/e751f332-1306-4b16-9ca7-191b4bb42e90.png',_binary '',_binary '\0',5400,5,'카카오성락',NULL,0,1),(32,1692278792,'ssjjmt','image/png/2023/08/17/58d99195-afef-4ec1-bc8d-63660875f9f3.png',_binary '',_binary '\0',5400,1,'마지막사진',NULL,0,1),(33,1692278866,'','image/png/2023/08/17/f528a0a2-5771-4939-a5f8-229d0ae65787.png',_binary '',_binary '',5400,6,'사진 이제 잘 돼요',NULL,0,1),(34,1692278977,'','image/jpeg/2023/08/17/33a171a0-062d-4910-80d2-726f15c3d7f6.jpg',_binary '',_binary '',7200,7,'스터디룸 테스트',NULL,0,2),(35,1692279096,'','image/png/2023/08/17/a63ebc1e-bb8f-404e-bd73-2f1637e55fa2.png',_binary '',_binary '',5400,1,'브루니2','aaaaaaaaaaaaaaaa',0,1),(36,1692279152,'ssjjmt','image/png/2023/08/17/b173f260-d1a6-4fe5-9ef1-7c68c4d6c5ab.png',_binary '',_binary '\0',5400,1,'A206',NULL,0,1),(37,1692280590,NULL,'image/png/2023/08/17/521d83d6-23d3-4783-9723-8aa16d72025b.png',_binary '',_binary '',6000,3,'푸바오랑대나무','푸바오 팬미팅해요',0,1),(38,1692281318,'ssjjmt','image/jpeg/2023/08/17/52f45ce6-9ec0-4af5-89cd-c1250ebfd5c5.jpg',_binary '\0',_binary '\0',6600,5,'코테뚫고기업','코딩테스트 같이 준비해요\n누구든 열심히 할 사람 구해요\n하루에 한문제씩 화이팅!!!',0,3),(39,1692281834,'','image/png/2023/08/17/d71c3831-0d2c-4fc4-8fda-681bd2bce4cc.png',_binary '\0',_binary '',6600,9,'발표 할 때 사용할 방','안녕하세요 발표 할 때 사용하는 방입니다.\n\n따로 공지사항은 없습니다.',0,3),(40,1692281863,'','image/jpeg/2023/08/17/3c762153-372b-404f-90b2-19dde151777a.JPG',_binary '\0',_binary '',7200,6,'백준알고리즘스터디','1. 1일 1잔디\n2. 코드리뷰',0,5),(41,1692281864,'','image/jpeg/2023/08/17/fe3c431b-4388-45d0-ba1f-4b61f3785ac0.jpg',_binary '\0',_binary '',6000,5,'간호사준비','간호사 국시 준비\n매일 3시간 씩\n',0,1),(42,1692281973,'','image/jpeg/2023/08/17/f3a40f93-1f73-4dbb-8d57-3ac8595a22bb.jpg',_binary '\0',_binary '\0',7200,1,'락아대학은가야지',NULL,0,1),(43,1692282015,'','image/jpeg/2023/08/17/242c0d3d-0b79-4970-b927-b0a86ed77436.jpg',_binary '\0',_binary '',5400,9,'English','영어를 잘하고 싶다면 ~~\n\nFree Talking 해요 ~~~',0,1),(44,1692282051,'','image/png/2023/08/17/f5ea42f5-1b53-4c0f-9971-fb5fce3ad629.png',_binary '\0',_binary '',9000,9,'정보보안기사 준비하실분','안녕하세요 정보보안기사 자격증을 따기위해 공부하는 방입니다.\n\n밤샘으로 공부하는 경우가 많습니다.\n\n함께 같이 열심히 공부하실 분들만 참여 부탁드립니다.\n\n일주일에 5일 미만으로 출석 시 강퇴입니다.',0,4),(45,1692282348,'','image/jpeg/2023/08/17/75287085-6290-4c58-bb3b-fdfdc46f7f01.jpg',_binary '\0',_binary '',6600,8,'10 to 10 가보자','오전 10시부터 오후 10시까지 달려봅시다!\n화이링~_~',0,2),(46,1692282363,'','image/jpeg/2023/08/17/a5078bd6-f024-4755-b2b0-55c6569e5741.jpg',_binary '\0',_binary '',5400,4,'아침5시 기상방',NULL,0,3),(47,1692284336,'','image/jpeg/2023/08/17/e8710109-9345-42ec-a65b-a5308dfba0ec.jpeg',_binary '\0',_binary '',5400,7,'불금엔 스터디',NULL,0,3),(48,1692317874,'','image/png/2023/08/18/600c9ad7-73de-4642-a044-b0517fa018ba.png',_binary '',_binary '',5400,1,'테스트',NULL,0,1),(49,1692319533,'','image/png/2023/08/18/0c438506-1f58-4595-ad31-8e187388ae57.png',_binary '',_binary '',5400,1,'사진 넣고 만들기',NULL,0,1);
/*!40000 ALTER TABLE `studyroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studyroom_tag`
--

DROP TABLE IF EXISTS `studyroom_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studyroom_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `studyroom_id` bigint DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK64njr478s75qj7idfdg9ghc8t` (`studyroom_id`),
  KEY `FK1d2l2sqf0nn81sy2dgcrp2h35` (`tag_id`),
  CONSTRAINT `FK1d2l2sqf0nn81sy2dgcrp2h35` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FK64njr478s75qj7idfdg9ghc8t` FOREIGN KEY (`studyroom_id`) REFERENCES `studyroom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'코딩'),(2,'고독방'),(4,'취준생'),(6,'직장인'),(7,'자격증'),(8,'미라클모닝'),(9,'정보공유'),(10,'수능'),(11,'고시'),(12,'N수생'),(13,'어학'),(14,'편입'),(16,'도서관'),(17,'국시'),(18,'기타'),(19,'친목'),(20,'밤샘');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tree` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,'https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/treeType/palm-tree.png','야자수'),(2,'https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/treeType/oak.png','참나무'),(3,'https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/treeType/cactus.png','선인장'),(4,'https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/treeType/christmas-tree.png','크리스마스나무'),(5,'https://sswm-image.s3.ap-northeast-2.amazonaws.com/image/trees/treeType/nature.png','대나무');
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_admin` bit(1) DEFAULT NULL,
  `modified_at` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `user_studyroom`
--

DROP TABLE IF EXISTS `user_studyroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_studyroom` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_ban` bit(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `total_rest` bigint NOT NULL,
  `total_study` bigint NOT NULL,
  `studyroom_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK89wrampe4lxsi8na3wsnhhqoh` (`studyroom_id`),
  KEY `FKmrtml4u90wb317u91lmpt5hh9` (`user_id`),
  CONSTRAINT `FK89wrampe4lxsi8na3wsnhhqoh` FOREIGN KEY (`studyroom_id`) REFERENCES `studyroom` (`id`),
  CONSTRAINT `FKmrtml4u90wb317u91lmpt5hh9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `user_tree`
--

DROP TABLE IF EXISTS `user_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tree` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `exp` float NOT NULL,
  `tree_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2eg2aec5xv8torm3vxofy1ppb` (`tree_id`),
  KEY `FK809e59m8ka2t1pm4e6oclb8gr` (`user_id`),
  CONSTRAINT `FK2eg2aec5xv8torm3vxofy1ppb` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`id`),
  CONSTRAINT `FK809e59m8ka2t1pm4e6oclb8gr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tree`
--

-- Dump completed on 2023-08-18  9:56:55
