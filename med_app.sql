-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 10 Sie 2022, 15:09
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `med_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane_logowania`
--

CREATE TABLE `dane_logowania` (
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `login` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `dane_logowania`
--

INSERT INTO `dane_logowania` (`user_id`, `login`, `password`, `role`, `name`, `surname`) VALUES
('6655714e-0733-11ed-840d-6c24084f33b4', 'test3', 'test3', 'pacjent', 'Janina', 'Kowalska'),
('81bab2ae-0732-11ed-840d-6c24084f33b4', 'test', 'test', 'pacjent', 'Jan', 'Testowy'),
('81babdc9-0732-11ed-840d-6c24084f33b4', 'test2', 'test2', 'lekarz', 'Janek', 'Kowalsky'),
('87baa4ef-0733-11ed-840d-6c24084f33b4', 'test4', 'test4', 'lekarz', 'Bob', 'Bobson'),
('8a5c03d9-9684-4161-a114-4b992203de8e', 'nowy3', 'nowy3', 'pacjent', 'nowy3', 'nowy3'),
('9923c42f-0996-11ed-b3f6-6c24084f33b4', 'admin', 'admin', 'admin', 'admin', 'admin'),
('d50fb23b-e1d8-4053-b76b-aa43d0ff8ae0', 'lekarz2', 'lekarz2', 'lekarz', 'Hans', 'Kloc'),
('dea6044f-1232-11ed-9d99-6c24084f33b4', 'lekarz1', 'lekarz1', 'lekarz', 'Michał', 'Nowak');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `godziny_wizyt`
--

CREATE TABLE `godziny_wizyt` (
  `term_id` int(11) NOT NULL,
  `godzina_wizyty` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `godziny_wizyt`
--

INSERT INTO `godziny_wizyt` (`term_id`, `godzina_wizyty`) VALUES
(1, '00:00:00'),
(2, '00:15:00'),
(3, '00:30:00'),
(4, '00:45:00'),
(5, '01:00:00'),
(6, '01:15:00'),
(7, '01:30:00'),
(8, '01:45:00'),
(9, '02:00:00'),
(10, '02:15:00'),
(11, '02:30:00'),
(12, '02:45:00'),
(13, '03:00:00'),
(14, '03:15:00'),
(15, '03:30:00'),
(16, '03:45:00'),
(17, '04:00:00'),
(18, '04:15:00'),
(19, '04:30:00'),
(20, '04:45:00'),
(21, '05:00:00'),
(22, '05:15:00'),
(23, '05:30:00'),
(24, '05:45:00'),
(25, '06:00:00'),
(26, '06:15:00'),
(27, '06:30:00'),
(28, '06:45:00'),
(29, '07:00:00'),
(30, '07:15:00'),
(31, '07:30:00'),
(32, '07:45:00'),
(33, '08:00:00'),
(34, '08:15:00'),
(35, '08:30:00'),
(36, '08:45:00'),
(37, '09:00:00'),
(38, '09:15:00'),
(39, '09:30:00'),
(40, '09:45:00'),
(41, '10:00:00'),
(42, '10:15:00'),
(43, '10:30:00'),
(44, '10:45:00'),
(45, '11:00:00'),
(46, '11:15:00'),
(47, '11:30:00'),
(48, '11:45:00'),
(49, '12:00:00'),
(50, '12:15:00'),
(51, '12:30:00'),
(52, '12:45:00'),
(53, '13:00:00'),
(54, '13:15:00'),
(55, '13:30:00'),
(56, '13:45:00'),
(57, '14:00:00'),
(58, '14:15:00'),
(59, '14:30:00'),
(60, '14:45:00'),
(61, '15:00:00'),
(62, '15:15:00'),
(63, '15:30:00'),
(64, '15:45:00'),
(65, '16:00:00'),
(66, '16:15:00'),
(67, '16:30:00'),
(68, '16:45:00'),
(69, '17:00:00'),
(70, '17:15:00'),
(71, '17:30:00'),
(72, '17:45:00'),
(73, '18:00:00'),
(74, '18:15:00'),
(75, '18:30:00'),
(76, '18:45:00'),
(77, '19:00:00'),
(78, '19:15:00'),
(79, '19:30:00'),
(80, '19:45:00'),
(81, '20:00:00'),
(82, '20:15:00'),
(83, '20:30:00'),
(84, '20:45:00'),
(85, '21:00:00'),
(86, '21:15:00'),
(87, '21:30:00'),
(88, '21:45:00'),
(89, '22:00:00'),
(90, '22:15:00'),
(91, '22:30:00'),
(92, '22:45:00'),
(93, '23:00:00'),
(94, '23:15:00'),
(95, '23:30:00'),
(96, '23:45:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `grafik`
--

CREATE TABLE `grafik` (
  `id_terminu` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `id_lekarza` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `data` datetime NOT NULL,
  `od_godziny` time NOT NULL,
  `do_godziny` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `grafik`
--

INSERT INTO `grafik` (`id_terminu`, `id_lekarza`, `data`, `od_godziny`, `do_godziny`) VALUES
('0dac51c9-a62a-4696-b33a-bf1afeee51ff', '87baa4ef-0733-11ed-840d-6c24084f33b4', '2022-08-12 02:00:00', '08:00:00', '09:00:00'),
('18d94455-1233-11ed-9d99-6c24084f33b4', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '2022-08-10 02:00:00', '12:00:00', '14:00:00'),
('5be2da0a-9690-4676-a910-fbb9ec578320', '81babdc9-0732-11ed-840d-6c24084f33b4', '2022-08-19 02:00:00', '09:00:00', '11:00:00'),
('77511fcf-a927-4f6d-adce-0b0716673194', '81babdc9-0732-11ed-840d-6c24084f33b4', '2022-08-14 02:00:00', '07:00:00', '08:00:00'),
('94385fbf-a56f-4409-93cb-76aab694553f', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '2022-08-09 02:00:00', '15:00:00', '16:00:00'),
('a246ff8d-bf4a-4983-8a7f-8bc2b8dff8b0', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '2022-08-13 02:00:00', '09:00:00', '10:00:00'),
('c6d00270-1307-4e1d-97af-a6fa71a22943', '81babdc9-0732-11ed-840d-6c24084f33b4', '2022-08-15 02:00:00', '08:00:00', '09:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lekarze`
--

CREATE TABLE `lekarze` (
  `id_lekarza` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `speciality` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `lekarze`
--

INSERT INTO `lekarze` (`id_lekarza`, `speciality`, `city`) VALUES
('81babdc9-0732-11ed-840d-6c24084f33b4', 'Gastrolog', 'Kraków'),
('87baa4ef-0733-11ed-840d-6c24084f33b4', 'Neurolog, Psycholog', 'Kraków'),
('d50fb23b-e1d8-4053-b76b-aa43d0ff8ae0', 'Chirurg, Kardiolog', 'Poznań'),
('dea6044f-1232-11ed-9d99-6c24084f33b4', 'Neurolog', 'Warszawa');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pacjenci`
--

CREATE TABLE `pacjenci` (
  `id_pacjenta` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `age` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `pacjenci`
--

INSERT INTO `pacjenci` (`id_pacjenta`, `age`) VALUES
('6655714e-0733-11ed-840d-6c24084f33b4', 32),
('81bab2ae-0732-11ed-840d-6c24084f33b4', 24),
('8a5c03d9-9684-4161-a114-4b992203de8e', 18);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wizyty`
--

CREATE TABLE `wizyty` (
  `id_wizyty` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `id_lekarza` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `id_pacjenta` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `id_terminu` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `term_id` int(11) DEFAULT NULL,
  `reason_of_visit` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `wizyty`
--

INSERT INTO `wizyty` (`id_wizyty`, `id_lekarza`, `id_pacjenta`, `id_terminu`, `term_id`, `reason_of_visit`) VALUES
('1969796f-d85d-45fc-8220-6538c9747747', '81babdc9-0732-11ed-840d-6c24084f33b4', '8a5c03d9-9684-4161-a114-4b992203de8e', '5be2da0a-9690-4676-a910-fbb9ec578320', 39, 'mam horom curke'),
('3e69b072-aa9d-4ed0-a7fe-db342e8f0fdb', '81babdc9-0732-11ed-840d-6c24084f33b4', '81bab2ae-0732-11ed-840d-6c24084f33b4', '77511fcf-a927-4f6d-adce-0b0716673194', 31, 'ból brzucha'),
('4f6d1ef6-73fd-4c23-9ec4-850dc73fdf4c', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '8a5c03d9-9684-4161-a114-4b992203de8e', '18d94455-1233-11ed-9d99-6c24084f33b4', 51, 'wizyta kontrolna'),
('8374abdf-60b0-4832-9fee-c7b0e0c92a32', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '8a5c03d9-9684-4161-a114-4b992203de8e', '18d94455-1233-11ed-9d99-6c24084f33b4', 54, 'po skierowanie'),
('9696e402-bf73-43ca-94d3-f2dd067907a6', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '8a5c03d9-9684-4161-a114-4b992203de8e', 'a246ff8d-bf4a-4983-8a7f-8bc2b8dff8b0', 39, 'po skierowanie'),
('a886c2c0-01b6-4144-a079-95bba451bf9b', '87baa4ef-0733-11ed-840d-6c24084f33b4', '6655714e-0733-11ed-840d-6c24084f33b4', '0dac51c9-a62a-4696-b33a-bf1afeee51ff', 36, 'wizyta kontrolna'),
('ab88781e-101d-4fbe-b589-9fdfda3ecc52', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '81bab2ae-0732-11ed-840d-6c24084f33b4', '94385fbf-a56f-4409-93cb-76aab694553f', 61, 'ból brzucha'),
('d747518c-eb5b-4acf-a675-4193a955f99d', '81babdc9-0732-11ed-840d-6c24084f33b4', '6655714e-0733-11ed-840d-6c24084f33b4', '77511fcf-a927-4f6d-adce-0b0716673194', 29, 'ból brzucha po jedzeniu'),
('eacf8cd0-a7ab-47d3-82ea-58831d7a597b', 'dea6044f-1232-11ed-9d99-6c24084f33b4', '6655714e-0733-11ed-840d-6c24084f33b4', '18d94455-1233-11ed-9d99-6c24084f33b4', 49, 'badania kontrolne'),
('fd194373-216a-4504-8874-eeca7348911f', '87baa4ef-0733-11ed-840d-6c24084f33b4', '81bab2ae-0732-11ed-840d-6c24084f33b4', '0dac51c9-a62a-4696-b33a-bf1afeee51ff', 33, 'problemy z głową');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane_logowania`
--
ALTER TABLE `dane_logowania`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `godziny_wizyt`
--
ALTER TABLE `godziny_wizyt`
  ADD PRIMARY KEY (`term_id`);

--
-- Indeksy dla tabeli `grafik`
--
ALTER TABLE `grafik`
  ADD PRIMARY KEY (`id_terminu`),
  ADD KEY `FK_grafik_lekarze` (`id_lekarza`);

--
-- Indeksy dla tabeli `lekarze`
--
ALTER TABLE `lekarze`
  ADD PRIMARY KEY (`id_lekarza`);

--
-- Indeksy dla tabeli `pacjenci`
--
ALTER TABLE `pacjenci`
  ADD PRIMARY KEY (`id_pacjenta`);

--
-- Indeksy dla tabeli `wizyty`
--
ALTER TABLE `wizyty`
  ADD PRIMARY KEY (`id_wizyty`),
  ADD KEY `FK_wizyty_lekarze` (`id_lekarza`),
  ADD KEY `FK_wizyty_pacjenci` (`id_pacjenta`),
  ADD KEY `FK_wizyty_grafik` (`id_terminu`),
  ADD KEY `FK_wizyty_godziny_wizyt` (`term_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `godziny_wizyt`
--
ALTER TABLE `godziny_wizyt`
  MODIFY `term_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `grafik`
--
ALTER TABLE `grafik`
  ADD CONSTRAINT `FK_grafik_lekarze` FOREIGN KEY (`id_lekarza`) REFERENCES `lekarze` (`id_lekarza`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `lekarze`
--
ALTER TABLE `lekarze`
  ADD CONSTRAINT `FK_lekarze_dane_logowania` FOREIGN KEY (`id_lekarza`) REFERENCES `dane_logowania` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `pacjenci`
--
ALTER TABLE `pacjenci`
  ADD CONSTRAINT `FK_pacjenci_dane_logowania` FOREIGN KEY (`id_pacjenta`) REFERENCES `dane_logowania` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `wizyty`
--
ALTER TABLE `wizyty`
  ADD CONSTRAINT `FK_wizyty_godziny_wizyt` FOREIGN KEY (`term_id`) REFERENCES `godziny_wizyt` (`term_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_wizyty_grafik` FOREIGN KEY (`id_terminu`) REFERENCES `grafik` (`id_terminu`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_wizyty_lekarze` FOREIGN KEY (`id_lekarza`) REFERENCES `lekarze` (`id_lekarza`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_wizyty_pacjenci` FOREIGN KEY (`id_pacjenta`) REFERENCES `pacjenci` (`id_pacjenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
