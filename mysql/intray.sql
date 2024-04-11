-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2024 at 06:14 PM
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
  `table_id` int(16) NOT NULL,
  `group_name` varchar(32) NOT NULL,
  `group_id` int(16) NOT NULL,
  `meeting_id` int(16) DEFAULT NULL,
  `todo_id` int(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assign_participants`
--

CREATE TABLE `assign_participants` (
  `table_id` int(16) NOT NULL,
  `meeting_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL,
  `staffcode` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `table_id` int(16) NOT NULL,
  `group_id` int(16) NOT NULL,
  `group_name` varchar(32) NOT NULL,
  `user_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`table_id`, `group_id`, `group_name`, `user_id`) VALUES
(3, 2, 'TEACHER', 1002),
(4, 1, 'SLT', 1001),
(5, 2, 'TEACHER', 1001);

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(16) NOT NULL,
  `owner` int(16) NOT NULL COMMENT 'user_id',
  `agenda` text NOT NULL,
  `date_of_meeting` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_of_next` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `todos` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `todo_id` int(16) NOT NULL,
  `name` char(32) NOT NULL,
  `body` text NOT NULL,
  `priority` tinyint(1) NOT NULL,
  `complete_by` int(16) NOT NULL COMMENT 'User_id',
  `managed_by` int(16) NOT NULL COMMENT 'user_id of manager',
  `display_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(16) NOT NULL,
  `completed_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `signed_off_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `meeting_id` int(16) DEFAULT NULL,
  `category` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 1013, 'aMVA8i7K97OZG9qV3Yy4857876zGniIII4bX62z5A5T56a2xS7FrNkSm6un0vI7L15s85kBh8', '2024-04-10 14:00:53'),
(4, 1013, '7VpDjtW9q833k8j5v3AjqkYYcW16Ip5c67v4279n5tBR9HLDkuvhys1OlKZpL75NVcM', '2024-04-10 14:00:57'),
(5, 1013, 'CmB6Aylm7QU6607Z0f53gxJ5nQoF2pR0fGH9IdngDbY7W2k7e56921No9Y1HyT5roI96sN45pY', '2024-04-10 14:00:59'),
(6, 1001, 'cYO3t74xZ2j0JGlXsZsiaxvSpglLmaP47WIr3Ld2TXxZrlJhrFzkt2aXOjkd4vj2mtC5M', '2024-04-10 14:03:46'),
(9, 1001, 'l17AmJm7RykhSlt5Y8xRBE8S7nP2trtoAkk7R5gtA59T7N17q2Fr4qa0H2UMCHhFI4Ki', '2024-04-10 14:03:47'),
(10, 1016, 'Gi4lE4tajI9PHcqgv68jkhT1b58o1gM82u78D723505Dg7zPqgiE47Ji8rMmSEZmSIm62sBX', '2024-04-10 14:11:55'),
(13, 1019, 'k4WnCRMNKH13Doa4zFZtXVH4EwNawtEJuFrRbt9vf2K0RlUZa62dzEoBd0S72a4I3v2', '2024-04-10 14:47:18');

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
  `staffcode` varchar(5) NOT NULL,
  `user_level` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `firstname`, `surname`, `date_joined`, `school`, `staffcode`, `user_level`) VALUES
(1002, 'b@c.d', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Jen', 'Noble', '2024-04-09 12:58:41', 'LA', 'JNO', 2),
(1019, 'a@b.c', '2e0a86a660a3f40f309f7e0b5236285aac58fb2bbb863ca6a455847d9b755f84', 'Matt', 'Holmes', '2024-04-10 14:47:18', 'London Academy', 'AWA', 1);

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
  ADD UNIQUE KEY `school` (`school`,`staffcode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign_groups`
--
ALTER TABLE `assign_groups`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assign_participants`
--
ALTER TABLE `assign_participants`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `todo_id` int(16) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `table_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1020;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
