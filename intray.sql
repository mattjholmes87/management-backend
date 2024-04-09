-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 09, 2024 at 04:54 PM
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
  `table_id` int(10) NOT NULL,
  `group_name` varchar(32) NOT NULL,
  `group_id` int(10) NOT NULL,
  `meeting_id` int(10) DEFAULT NULL,
  `todo_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assign_participants`
--

CREATE TABLE `assign_participants` (
  `table_id` int(10) NOT NULL,
  `meeting_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `staffcode` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(10) NOT NULL,
  `group_name` varchar(32) NOT NULL,
  `user_id` int(10) NOT NULL,
  `table_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `user_id`, `table_id`) VALUES
(2, 'TEACHER', 1002, 3),
(1, 'SLT', 1001, 4),
(2, 'TEACHER', 1001, 5);

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(10) NOT NULL,
  `owner` int(10) NOT NULL COMMENT 'user_id',
  `agenda` text NOT NULL,
  `date_of_meeting` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_of_next` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `todos` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `todo_id` int(10) NOT NULL,
  `name` char(32) NOT NULL,
  `body` text NOT NULL,
  `priority` tinyint(1) NOT NULL,
  `complete_by` mediumint(10) NOT NULL COMMENT 'User_id',
  `managed_by` mediumint(10) NOT NULL COMMENT 'user_id of manager',
  `display_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` mediumint(10) NOT NULL,
  `completed_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `signed_off_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `meeting_id` int(10) DEFAULT NULL,
  `category` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `user_id` int(11) NOT NULL,
  `token` varchar(55) NOT NULL,
  `table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `email` varchar(331) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `date_joined` datetime NOT NULL DEFAULT current_timestamp(),
  `staffcode` varchar(5) NOT NULL,
  `user_level` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `firstname`, `surname`, `date_joined`, `staffcode`, `user_level`) VALUES
(1001, 'x@y.z', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Matt', 'Holmes', '2024-04-09 13:57:02', 'MHO', 1),
(1002, 'b@c.d', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Jen', 'Noble', '2024-04-09 13:58:41', 'JNO', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign_groups`
--
ALTER TABLE `assign_groups`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `meeting_id` (`meeting_id`),
  ADD KEY `todo_id` (`todo_id`);

--
-- Indexes for table `assign_participants`
--
ALTER TABLE `assign_participants`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD KEY `meeting_id` (`meeting_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`table_id`),
  ADD UNIQUE KEY `table_id` (`table_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`),
  ADD UNIQUE KEY `meeting_id` (`meeting_id`),
  ADD KEY `owner` (`owner`);

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`todo_id`),
  ADD UNIQUE KEY `todo_id` (`todo_id`),
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
  ADD UNIQUE KEY `staffcode` (`staffcode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign_groups`
--
ALTER TABLE `assign_groups`
  MODIFY `table_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assign_participants`
--
ALTER TABLE `assign_participants`
  MODIFY `table_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `table_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `todo_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `table_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
