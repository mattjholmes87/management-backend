-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2024 at 04:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intray`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign_groups`
--

CREATE TABLE `assign_groups` (
  `group_name` varchar(32) NOT NULL,
  `group_id` int(16) NOT NULL,
  `school_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_groups`
--

INSERT INTO `assign_groups` (`group_name`, `group_id`, `school_id`) VALUES
('SEN', 5, 1),
('SEN', 8, 2),
('SLT', 1, 1),
('SUPPORT', 10, 2),
('TA', 3, 1),
('TEACHER', 2, 1),
('TEACHER', 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `assign_participants`
--

CREATE TABLE `assign_participants` (
  `table_id` int(16) NOT NULL,
  `meeting_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_participants`
--

INSERT INTO `assign_participants` (`table_id`, `meeting_id`, `user_id`) VALUES
(67, 67, 1021),
(68, 67, 1024),
(59, 68, 1020),
(60, 68, 1021),
(61, 68, 1022),
(62, 68, 1024),
(63, 68, 1028),
(64, 68, 1033);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `table_id` int(16) NOT NULL,
  `group_id` int(16) NOT NULL,
  `school_id` int(16) NOT NULL,
  `group_name` varchar(32) DEFAULT NULL,
  `user_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`table_id`, `group_id`, `school_id`, `group_name`, `user_id`) VALUES
(14, 2, 1, 'TEACHER', 1024),
(15, 1, 1, 'SLT', 1024),
(26, 9, 3, 'TEACHER', 1033),
(28, 9, 3, 'TEACHER', 1022);

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(16) NOT NULL,
  `owner` int(16) NOT NULL COMMENT 'user_id',
  `title` varchar(50) NOT NULL,
  `agenda` text NOT NULL,
  `date_of_meeting` date NOT NULL,
  `date_of_next` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `owner`, `title`, `agenda`, `date_of_meeting`, `date_of_next`) VALUES
(1, 1019, 'Meeting 1', 'review this meeting', '2024-04-23', NULL),
(2, 1003, 'Meeting 2', 'This is a dummy meeting', '2024-04-17', '2024-04-24'),
(3, 1019, 'Meeting 4', 'This is the second meeting being added', '2024-05-12', '0000-00-00'),
(5, 1019, 'another meeting', 'This is the second meeting being added', '2024-05-12', NULL),
(67, 1028, 'another meeting 2 FINAL', 'TEST This is the second meeting being added', '2044-05-12', '2044-06-12'),
(68, 1028, 'another meeting to test', 'This is the second meeting being added', '2024-05-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(16) NOT NULL,
  `school` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `school`) VALUES
(1, 'London Academy'),
(3, 'North London Academy'),
(2, 'Oasis Academy South Bank');

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `todo_id` int(16) NOT NULL,
  `name` char(32) NOT NULL,
  `body` text NOT NULL,
  `priority` tinyint(1) NOT NULL,
  `due_date` date DEFAULT NULL,
  `complete_by` int(16) NOT NULL COMMENT 'User_id',
  `managed_by` int(16) DEFAULT NULL COMMENT 'user_id of manager',
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `display_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(16) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Boolean',
  `completed_on` timestamp NULL DEFAULT NULL,
  `signed_off` tinyint(1) DEFAULT NULL COMMENT 'Boolean',
  `signed_off_on` timestamp NULL DEFAULT NULL,
  `meeting_id` int(16) DEFAULT NULL,
  `category` varchar(32) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`todo_id`, `name`, `body`, `priority`, `due_date`, `complete_by`, `managed_by`, `created_on`, `display_on`, `created_by`, `completed`, `completed_on`, `signed_off`, `signed_off_on`, `meeting_id`, `category`, `entry_date`) VALUES
(6, 'To Catch monster in the kitchen', 'Set a trap with Ollie for tonight at 8pm', 1, '2025-03-23', 1019, 2003, '2024-04-11 13:47:18', '2025-04-24 13:47:18', 1019, 1, '2024-04-12 15:47:25', 1, '2024-04-12 15:47:25', 1, '4', '2024-04-15 10:35:45'),
(7, 'Clean Car Later2', 'Need to clean the car by Monday next year', 0, NULL, 1019, 2003, '2024-04-11 14:31:18', '2024-04-11 14:31:18', 1019, 0, NULL, NULL, NULL, NULL, '2', '2024-04-01 10:35:52'),
(8, 'Clean Car Later5', 'Need to clean the car by Monday next year', 0, NULL, 1019, 2003, '2024-04-11 14:40:55', '2024-04-11 14:40:55', 1019, 0, NULL, NULL, NULL, NULL, '2', '2024-04-08 10:36:05'),
(9, 'Clean Car Later5', 'Need to clean the car by Monday next year', 0, NULL, 1028, NULL, '2024-04-17 09:45:37', '2024-04-17 09:45:37', 1028, 0, NULL, NULL, NULL, NULL, '2', '2024-04-17 09:45:37'),
(16, 'Clean Car Later52', 'Need to clean the car by Monday next year', 0, NULL, 1028, 1001, '2024-04-17 09:52:27', '2024-04-17 09:52:27', 1028, 0, NULL, NULL, NULL, NULL, '2', '2024-04-17 09:52:27'),
(18, 'To Catch monster in the kitchen', 'Set a trap with Ollie for tonight at 8pm', 1, '2025-03-23', 1024, NULL, '2024-04-17 09:52:59', '2024-04-17 09:52:59', 1024, 1, '2024-04-18 09:30:10', 0, NULL, NULL, '1', '2024-04-17 09:52:59'),
(20, 'Clean Car with Dog', 'Need to clean the car by Monday next year', 0, NULL, 1024, NULL, '2024-04-18 10:15:00', '2024-04-18 10:15:00', 1024, 0, NULL, NULL, NULL, NULL, '2', '2024-04-18 10:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `table_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL,
  `token` varchar(80) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`table_id`, `user_id`, `token`, `entry_date`) VALUES
(37, 1020, 'I080QiCaa1Hb01ZW0AUhJCu3dz87g5rk4y1a7X1FjwkjkQPdjynvB1WmS9ht7lVq7CFvnfsX', '2024-04-15 14:18:17'),
(38, 1021, '0v1Q605926qTZKsBdl9R76q5dg0B35N02T8010FoILqzb7kvRG218WuU8mFK9O1hCzohS1cv', '2024-04-15 14:18:35'),
(39, 1022, 'QPfm1kKn11hOeGwl17SwcWmxrMLli2i1q3rFIVgOOUhvnyGa71or62ZQixmRdHhD0aOh', '2024-04-16 10:46:05'),
(40, 1024, 'M2778sJrR2dSKdIWTmbqiYc9jXl9AVWY8vw19paIuREHK08aCSuubPmGW71uGR0gpPg2Cz', '2024-04-16 13:05:20'),
(41, 1024, 'CS27f7m7T2Lh1Mt282TN3cnIk4Sk0N2YD2zU2N7Q3ETEFEAgN4D1PMjmrX2L3JNZcQ7E2sj7bI', '2024-04-16 13:05:31'),
(42, 1024, 'dN27Yxl48jq1Yhgj70jp3b3zv27LyoHM5c722pKoRc2S3O1RWw7E5x1I1rj3FeP237O43331', '2024-04-16 13:05:31'),
(43, 1024, 'z5Rr12HB11GYEZ8oT1B4GyNCwp5sp77GvW3XKOW215pdKZuUC713lLOD3eAvgXBNY6YE', '2024-04-16 13:05:31'),
(44, 1024, 'yZ85rQbGY1vI2QEpr03wTm8U1Ueeg1kLcxn8t3wdA695zd2SpaKHNUmSDF1v56FGn7Yl2sP', '2024-04-16 13:05:31'),
(45, 1024, 'H4ld58p98TIwPpv78APv7TTr2p37441J1lLM1rWheo2HGAsLtJO4eCi1TgQOY31M8X3io7xd7v', '2024-04-16 13:05:31'),
(46, 1024, 'U539D7s24H4Oc3Mj2mu22227VGY7Wp16PCDyiUGB7wjdNyM70fbOYYNy235S2TnQWT4dtn3c', '2024-04-16 13:05:32'),
(47, 1027, 'qg9933bEzbtM71552oBm4561fsn1v5CGbM421k72hn15u2brCdc6RQJ7coGzc3u5Xj', '2024-04-16 13:47:38'),
(48, 1028, 'vBii1rdC3MsZx7V5pA3V73ab6xd1876ssz0w2x74Y6n2ChbC1fyn5pKya3V53FX3T130m', '2024-04-16 13:48:48'),
(50, 1030, '2km284la91S791r6vT9zw4681R601gdHiufYSy78tScB1Kf1R67as0YEy1KIMBr1M9Z389eu', '2024-04-16 14:36:47'),
(51, 1031, '07IPejzffO24qIxk2yIGt6MKWCQ1qh1q43e27w03th4JT1WW0VhhxcuVb83qgsm2Nc', '2024-04-16 14:37:14'),
(52, 1032, 'xunGPmGNCju74tjrK67m3VPL63eh1b3lvNt8Jd7CHGo94HlW9aqxui1vgLXp9HGhS9q', '2024-04-16 14:52:14'),
(57, 1033, 's1ywT1boAbJ199CkXy9w1lgwA9b9bhuqGkruj3iE7XcRVj33FcQ0sS9H333918Itc', '2024-04-17 09:09:59'),
(58, 1024, '3P8M3fN8CJ3kILODZ93HGUl7kCkV4T7F3azyWUap1YaCzyU415twX3BbgXy8DdwKKqE3Iu51cM', '2024-04-18 09:43:09'),
(59, 1024, 'n1I9qSe9H5nh8tQ3AdT0PC5zDVeY99QOFB37HLE14RcFPL1SkHY3pB15cCVNX3X51mR37y4CC', '2024-04-18 09:51:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(16) NOT NULL,
  `email` varchar(331) NOT NULL,
  `password` varchar(128) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `date_joined` timestamp NOT NULL DEFAULT current_timestamp(),
  `school` varchar(32) DEFAULT NULL,
  `school_id` int(16) NOT NULL,
  `line_manager` int(16) DEFAULT NULL COMMENT 'line manager user_id',
  `staffcode` varchar(5) NOT NULL,
  `user_level` int(2) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `firstname`, `surname`, `date_joined`, `school`, `school_id`, `line_manager`, `staffcode`, `user_level`) VALUES
(1020, 'matt@check.com', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Jon', 'Holmes', '2024-04-15 14:18:17', 'Oasis Academy South Bank', 2, NULL, 'JHO', 1),
(1021, 'a2@b.c', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Anne', 'Holmes', '2024-04-15 14:18:35', 'Oasis Academy South Bank', 2, NULL, 'AHO', 2),
(1022, 'a22@b.c', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Anne', 'Holmes', '2024-04-16 10:46:05', 'North London Academy', 3, NULL, 'AHOL', 5),
(1024, 'test@check.com', 'fac77a972133695f47e3e0a4cdf463017908e5893932d2ecc0279818779cec71', 'Matt', 'Holmes', '2024-04-16 13:05:20', 'London Academy', 1, NULL, 'MHO', 2),
(1028, 'aa@b.c', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Matt', 'Holmes', '2024-04-16 13:48:48', 'London Academy', 1, 1001, 'MHOL', 5),
(1033, '1@2.3', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Matt', 'Holmes', '2024-04-17 09:09:59', 'North London Academy', 3, NULL, 'MHOLZ', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign_groups`
--
ALTER TABLE `assign_groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `group_name` (`group_name`,`school_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `assign_participants`
--
ALTER TABLE `assign_participants`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD UNIQUE KEY `meeting_id_2` (`meeting_id`,`user_id`),
  ADD KEY `meeting_id` (`meeting_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD UNIQUE KEY `group_id_2` (`group_id`,`user_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD UNIQUE KEY `meeting_id` (`meeting_id`),
  ADD UNIQUE KEY `owner_2` (`owner`,`title`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `school_id` (`school_id`),
  ADD UNIQUE KEY `school` (`school`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`todo_id`),
  ADD UNIQUE KEY `todo_id` (`todo_id`),
  ADD UNIQUE KEY `name` (`name`,`complete_by`),
  ADD KEY `complete_by` (`complete_by`),
  ADD KEY `created_on` (`created_on`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `meeting_id` (`meeting_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `school` (`school`,`staffcode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign_groups`
--
ALTER TABLE `assign_groups`
  MODIFY `group_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `assign_participants`
--
ALTER TABLE `assign_participants`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `todo_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1034;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
