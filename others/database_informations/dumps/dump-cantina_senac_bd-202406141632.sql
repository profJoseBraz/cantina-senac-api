-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cantina_senac_bd
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Bebidas'),(2,'Lanches'),(3,'Salgados'),(4,'Doces');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pagamento`
--

DROP TABLE IF EXISTS `forma_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pagamento`
--

LOCK TABLES `forma_pagamento` WRITE;
/*!40000 ALTER TABLE `forma_pagamento` DISABLE KEYS */;
INSERT INTO `forma_pagamento` VALUES (1,'Dinheiro'),(2,'Cartão de Crédito'),(3,'Cartão de Débito');
/*!40000 ALTER TABLE `forma_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens_pedido`
--

DROP TABLE IF EXISTS `itens_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `itens_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`),
  CONSTRAINT `itens_pedido_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_pedido`
--

LOCK TABLES `itens_pedido` WRITE;
/*!40000 ALTER TABLE `itens_pedido` DISABLE KEYS */;
INSERT INTO `itens_pedido` VALUES (1,1,1,2),(2,1,3,1),(3,3,5,3),(4,4,4,2);
/*!40000 ALTER TABLE `itens_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_forma_pagamento` int NOT NULL,
  `nome_cliente` varchar(45) NOT NULL,
  `data` datetime NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_forma_pagamento` (`id_forma_pagamento`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_forma_pagamento`) REFERENCES `forma_pagamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,'Pedro','2024-06-14 09:30:00',12.50),(2,2,'Ana','2024-06-14 10:15:00',8.75),(3,3,'João','2024-06-14 11:00:00',15.00),(4,1,'Maria','2024-06-14 12:45:00',10.25);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producao`
--

DROP TABLE IF EXISTS `producao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_produto` int NOT NULL,
  `data` datetime NOT NULL,
  `quantidade` int NOT NULL,
  `observacao` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `producao_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producao`
--

LOCK TABLES `producao` WRITE;
/*!40000 ALTER TABLE `producao` DISABLE KEYS */;
/*!40000 ALTER TABLE `producao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int NOT NULL,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `imagem` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,1,'Refrigerante','Lata de refrigerante 350ml',4.00,'refrigerante.jpg'),(2,1,'Suco de Fruta','Suco natural de laranja 300ml',3.50,'suco.jpg'),(3,2,'Sanduíche de Presunto e Queijo','Sanduíche simples',5.00,'sanduiche.jpg'),(4,3,'Coxinha','Coxinha de frango',3.00,'coxinha.jpg'),(5,4,'Brigadeiro','Brigadeiro tradicional',1.50,'brigadeiro.jpg');
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restricao`
--

DROP TABLE IF EXISTS `restricao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restricao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restricao`
--

LOCK TABLES `restricao` WRITE;
/*!40000 ALTER TABLE `restricao` DISABLE KEYS */;
INSERT INTO `restricao` VALUES (1,'Sem Glúten','Produto livre de glúten'),(2,'Sem Lactose','Produto livre de lactose'),(3,'Vegano','Produto sem ingredientes de origem animal');
/*!40000 ALTER TABLE `restricao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restricao_produto`
--

DROP TABLE IF EXISTS `restricao_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restricao_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_produto` int NOT NULL,
  `id_retricao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produto` (`id_produto`),
  KEY `id_retricao` (`id_retricao`),
  CONSTRAINT `restricao_produto_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`),
  CONSTRAINT `restricao_produto_ibfk_2` FOREIGN KEY (`id_retricao`) REFERENCES `restricao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restricao_produto`
--

LOCK TABLES `restricao_produto` WRITE;
/*!40000 ALTER TABLE `restricao_produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `restricao_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cantina_senac_bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 16:32:30
