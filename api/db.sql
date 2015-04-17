-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 17 Apr 2015 pada 15.06
-- Versi Server: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `puterin`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `me_login`
--

CREATE TABLE IF NOT EXISTS `me_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `key` varchar(200) NOT NULL,
  `ip` varchar(25) NOT NULL,
  `browser` varchar(200) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `last_login` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data untuk tabel `me_login`
--

INSERT INTO `me_login` (`id`, `id_user`, `key`, `ip`, `browser`, `status`, `last_login`, `created`) VALUES
(1, 6, 'UWC0wyoBvP55309ad765960kAkRFWZd8Z', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 07:41:55', '2015-04-17 05:32:07'),
(2, 6, 'U4SA5UH7XT55309d257c3beLlwBPGf06W', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 07:42:17', '2015-04-17 05:41:57'),
(3, 6, 'QUfaH8_TV955309d3bce1f7pHRq7QkYQ3', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 07:44:15', '2015-04-17 05:42:19'),
(4, 6, 'MvihjfZB1g55309db57c6c9pCofWMCsn5', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 08:01:04', '2015-04-17 05:44:21'),
(5, 6, 'YoO8tXq0_a5530a1a3986915u7hzaS1gC', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 08:01:21', '2015-04-17 06:01:07'),
(6, 6, 'ifB8Pd9T0x5530a1b387d64KnLhHqB7Hn', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 08:03:14', '2015-04-17 06:01:23'),
(7, 6, 'IdHtQahU4g5530a225ef31eHxauv7ziQN', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 08:03:25', '2015-04-17 06:03:17'),
(8, 6, 'yQqpNBkWP05530a22fa6ef3TVJHVm81OH', '::1', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36', 1, '2015-04-17 15:04:41', '2015-04-17 06:03:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `me_users`
--

CREATE TABLE IF NOT EXISTS `me_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `status` int(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data untuk tabel `me_users`
--

INSERT INTO `me_users` (`id`, `username`, `password`, `email`, `status`, `created`) VALUES
(4, 'tuan', 'bf5098c13e067701a47f6bf8e2d95393', 'surat@afief.net', 1, '2015-02-28 07:50:55'),
(5, 'nona', 'bf488a9877b4f85e809d29ee5052de1b', 'putdar2610@gmail.com', 1, '2015-02-28 07:50:55'),
(6, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'ramacyber@gmail.com', 1, '2015-03-20 01:21:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pu_playlist`
--

CREATE TABLE IF NOT EXISTS `pu_playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `public` int(1) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data untuk tabel `pu_playlist`
--

INSERT INTO `pu_playlist` (`id`, `key`, `id_user`, `nama`, `public`, `timestamp`) VALUES
(1, 'By4PSEceLv5531044572773', 6, 'Playlist Baru', 1, '2015-04-17 13:01:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pu_songs`
--

CREATE TABLE IF NOT EXISTS `pu_songs` (
  `n` int(11) NOT NULL AUTO_INCREMENT,
  `id_playlist` int(11) NOT NULL,
  `from` varchar(2) NOT NULL,
  `id` varchar(50) NOT NULL,
  `url` varchar(200) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `duration` varchar(20) NOT NULL,
  `tanggal` datetime NOT NULL,
  `deskripsi` text NOT NULL,
  `thumbnail` text NOT NULL,
  `meta` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`n`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
