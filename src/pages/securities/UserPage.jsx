import { Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ButtonOutline from "@components/buttons/ButtonOutline";
import { CssContentInfo } from "@constants/styles";
import EditUser from './EditUser';
import { ResponsiveBarCanvas } from '@nivo/bar'

const data = [
    {
        "country": "AD",
        "hot dog": 59,
        "hot dogColor": "hsl(175, 70%, 50%)",
        "burger": 119,
        "burgerColor": "hsl(56, 70%, 50%)",
        "sandwich": 32,
        "sandwichColor": "hsl(144, 70%, 50%)",
        "kebab": 80,
        "kebabColor": "hsl(301, 70%, 50%)",
        "fries": 55,
        "friesColor": "hsl(296, 70%, 50%)",
        "donut": 136,
        "donutColor": "hsl(50, 70%, 50%)",
        "junk": 158,
        "junkColor": "hsl(284, 70%, 50%)",
        "sushi": 81,
        "sushiColor": "hsl(109, 70%, 50%)",
        "ramen": 129,
        "ramenColor": "hsl(52, 70%, 50%)",
        "curry": 116,
        "curryColor": "hsl(239, 70%, 50%)",
        "udon": 42,
        "udonColor": "hsl(303, 70%, 50%)",
        "bagel": 190,
        "bagelColor": "hsl(303, 70%, 50%)",
        "yakitori": 69,
        "yakitoriColor": "hsl(109, 70%, 50%)",
        "takoyaki": 13,
        "takoyakiColor": "hsl(307, 70%, 50%)",
        "tacos": 141,
        "tacosColor": "hsl(272, 70%, 50%)",
        "miso soup": 98,
        "miso soupColor": "hsl(46, 70%, 50%)",
        "tortilla": 182,
        "tortillaColor": "hsl(339, 70%, 50%)",
        "tapas": 34,
        "tapasColor": "hsl(347, 70%, 50%)",
        "chipirones": 67,
        "chipironesColor": "hsl(205, 70%, 50%)",
        "gazpacho": 128,
        "gazpachoColor": "hsl(237, 70%, 50%)",
        "soba": 102,
        "sobaColor": "hsl(246, 70%, 50%)",
        "bavette": 3,
        "bavetteColor": "hsl(305, 70%, 50%)",
        "steak": 30,
        "steakColor": "hsl(164, 70%, 50%)",
        "pizza": 48,
        "pizzaColor": "hsl(8, 70%, 50%)",
        "spaghetti": 54,
        "spaghettiColor": "hsl(288, 70%, 50%)",
        "ravioli": 5,
        "ravioliColor": "hsl(59, 70%, 50%)",
        "salad": 98,
        "saladColor": "hsl(326, 70%, 50%)",
        "pad thai": 0,
        "pad thaiColor": "hsl(230, 70%, 50%)",
        "bun": 157,
        "bunColor": "hsl(133, 70%, 50%)",
        "waffle": 109,
        "waffleColor": "hsl(180, 70%, 50%)",
        "crepe": 156,
        "crepeColor": "hsl(144, 70%, 50%)",
        "churros": 53,
        "churrosColor": "hsl(86, 70%, 50%)",
        "paella": 110,
        "paellaColor": "hsl(90, 70%, 50%)",
        "empanadas": 24,
        "empanadasColor": "hsl(241, 70%, 50%)",
        "bruschetta": 74,
        "bruschettaColor": "hsl(162, 70%, 50%)",
        "onion soup": 23,
        "onion soupColor": "hsl(97, 70%, 50%)",
        "cassoulet": 185,
        "cassouletColor": "hsl(151, 70%, 50%)",
        "bouillabaisse": 149,
        "bouillabaisseColor": "hsl(147, 70%, 50%)",
        "unagi": 5,
        "unagiColor": "hsl(262, 70%, 50%)",
        "tempura": 2,
        "tempuraColor": "hsl(202, 70%, 50%)",
        "tonkatsu": 89,
        "tonkatsuColor": "hsl(209, 70%, 50%)",
        "shabu-shabu": 77,
        "shabu-shabuColor": "hsl(59, 70%, 50%)",
        "twinkies": 161,
        "twinkiesColor": "hsl(331, 70%, 50%)",
        "jerky": 61,
        "jerkyColor": "hsl(93, 70%, 50%)",
        "fajitas": 38,
        "fajitasColor": "hsl(235, 70%, 50%)",
        "jambalaya": 104,
        "jambalayaColor": "hsl(286, 70%, 50%)",
        "meatloaf": 15,
        "meatloafColor": "hsl(149, 70%, 50%)",
        "mac n' cheese": 194,
        "mac n' cheeseColor": "hsl(304, 70%, 50%)",
        "baked beans": 82,
        "baked beansColor": "hsl(62, 70%, 50%)",
        "popcorn": 199,
        "popcornColor": "hsl(184, 70%, 50%)",
        "buffalo wings": 159,
        "buffalo wingsColor": "hsl(219, 70%, 50%)",
        "BBQ ribs": 147,
        "BBQ ribsColor": "hsl(258, 70%, 50%)",
        "apple pie": 61,
        "apple pieColor": "hsl(97, 70%, 50%)",
        "nachos": 165,
        "nachosColor": "hsl(289, 70%, 50%)",
        "risotto": 122,
        "risottoColor": "hsl(151, 70%, 50%)",
        "tiramisu": 30,
        "tiramisuColor": "hsl(158, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 27,
        "hot dogColor": "hsl(53, 70%, 50%)",
        "burger": 26,
        "burgerColor": "hsl(3, 70%, 50%)",
        "sandwich": 123,
        "sandwichColor": "hsl(222, 70%, 50%)",
        "kebab": 25,
        "kebabColor": "hsl(165, 70%, 50%)",
        "fries": 109,
        "friesColor": "hsl(81, 70%, 50%)",
        "donut": 142,
        "donutColor": "hsl(208, 70%, 50%)",
        "junk": 182,
        "junkColor": "hsl(103, 70%, 50%)",
        "sushi": 72,
        "sushiColor": "hsl(183, 70%, 50%)",
        "ramen": 35,
        "ramenColor": "hsl(271, 70%, 50%)",
        "curry": 98,
        "curryColor": "hsl(116, 70%, 50%)",
        "udon": 145,
        "udonColor": "hsl(120, 70%, 50%)",
        "bagel": 183,
        "bagelColor": "hsl(317, 70%, 50%)",
        "yakitori": 183,
        "yakitoriColor": "hsl(242, 70%, 50%)",
        "takoyaki": 116,
        "takoyakiColor": "hsl(150, 70%, 50%)",
        "tacos": 126,
        "tacosColor": "hsl(340, 70%, 50%)",
        "miso soup": 12,
        "miso soupColor": "hsl(207, 70%, 50%)",
        "tortilla": 20,
        "tortillaColor": "hsl(322, 70%, 50%)",
        "tapas": 109,
        "tapasColor": "hsl(245, 70%, 50%)",
        "chipirones": 85,
        "chipironesColor": "hsl(287, 70%, 50%)",
        "gazpacho": 50,
        "gazpachoColor": "hsl(244, 70%, 50%)",
        "soba": 20,
        "sobaColor": "hsl(160, 70%, 50%)",
        "bavette": 46,
        "bavetteColor": "hsl(106, 70%, 50%)",
        "steak": 153,
        "steakColor": "hsl(340, 70%, 50%)",
        "pizza": 14,
        "pizzaColor": "hsl(271, 70%, 50%)",
        "spaghetti": 150,
        "spaghettiColor": "hsl(140, 70%, 50%)",
        "ravioli": 147,
        "ravioliColor": "hsl(354, 70%, 50%)",
        "salad": 9,
        "saladColor": "hsl(239, 70%, 50%)",
        "pad thai": 169,
        "pad thaiColor": "hsl(350, 70%, 50%)",
        "bun": 80,
        "bunColor": "hsl(64, 70%, 50%)",
        "waffle": 86,
        "waffleColor": "hsl(277, 70%, 50%)",
        "crepe": 8,
        "crepeColor": "hsl(344, 70%, 50%)",
        "churros": 138,
        "churrosColor": "hsl(212, 70%, 50%)",
        "paella": 37,
        "paellaColor": "hsl(353, 70%, 50%)",
        "empanadas": 149,
        "empanadasColor": "hsl(251, 70%, 50%)",
        "bruschetta": 34,
        "bruschettaColor": "hsl(229, 70%, 50%)",
        "onion soup": 171,
        "onion soupColor": "hsl(39, 70%, 50%)",
        "cassoulet": 79,
        "cassouletColor": "hsl(49, 70%, 50%)",
        "bouillabaisse": 29,
        "bouillabaisseColor": "hsl(256, 70%, 50%)",
        "unagi": 149,
        "unagiColor": "hsl(85, 70%, 50%)",
        "tempura": 149,
        "tempuraColor": "hsl(257, 70%, 50%)",
        "tonkatsu": 96,
        "tonkatsuColor": "hsl(226, 70%, 50%)",
        "shabu-shabu": 124,
        "shabu-shabuColor": "hsl(230, 70%, 50%)",
        "twinkies": 32,
        "twinkiesColor": "hsl(99, 70%, 50%)",
        "jerky": 117,
        "jerkyColor": "hsl(111, 70%, 50%)",
        "fajitas": 39,
        "fajitasColor": "hsl(333, 70%, 50%)",
        "jambalaya": 32,
        "jambalayaColor": "hsl(29, 70%, 50%)",
        "meatloaf": 77,
        "meatloafColor": "hsl(32, 70%, 50%)",
        "mac n' cheese": 35,
        "mac n' cheeseColor": "hsl(3, 70%, 50%)",
        "baked beans": 199,
        "baked beansColor": "hsl(117, 70%, 50%)",
        "popcorn": 80,
        "popcornColor": "hsl(63, 70%, 50%)",
        "buffalo wings": 24,
        "buffalo wingsColor": "hsl(228, 70%, 50%)",
        "BBQ ribs": 50,
        "BBQ ribsColor": "hsl(159, 70%, 50%)",
        "apple pie": 78,
        "apple pieColor": "hsl(286, 70%, 50%)",
        "nachos": 130,
        "nachosColor": "hsl(151, 70%, 50%)",
        "risotto": 49,
        "risottoColor": "hsl(42, 70%, 50%)",
        "tiramisu": 140,
        "tiramisuColor": "hsl(253, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 71,
        "hot dogColor": "hsl(123, 70%, 50%)",
        "burger": 176,
        "burgerColor": "hsl(116, 70%, 50%)",
        "sandwich": 17,
        "sandwichColor": "hsl(236, 70%, 50%)",
        "kebab": 53,
        "kebabColor": "hsl(166, 70%, 50%)",
        "fries": 161,
        "friesColor": "hsl(186, 70%, 50%)",
        "donut": 6,
        "donutColor": "hsl(323, 70%, 50%)",
        "junk": 142,
        "junkColor": "hsl(42, 70%, 50%)",
        "sushi": 111,
        "sushiColor": "hsl(83, 70%, 50%)",
        "ramen": 105,
        "ramenColor": "hsl(191, 70%, 50%)",
        "curry": 30,
        "curryColor": "hsl(249, 70%, 50%)",
        "udon": 72,
        "udonColor": "hsl(286, 70%, 50%)",
        "bagel": 168,
        "bagelColor": "hsl(340, 70%, 50%)",
        "yakitori": 71,
        "yakitoriColor": "hsl(309, 70%, 50%)",
        "takoyaki": 95,
        "takoyakiColor": "hsl(190, 70%, 50%)",
        "tacos": 184,
        "tacosColor": "hsl(94, 70%, 50%)",
        "miso soup": 173,
        "miso soupColor": "hsl(77, 70%, 50%)",
        "tortilla": 71,
        "tortillaColor": "hsl(327, 70%, 50%)",
        "tapas": 123,
        "tapasColor": "hsl(26, 70%, 50%)",
        "chipirones": 155,
        "chipironesColor": "hsl(188, 70%, 50%)",
        "gazpacho": 157,
        "gazpachoColor": "hsl(317, 70%, 50%)",
        "soba": 100,
        "sobaColor": "hsl(79, 70%, 50%)",
        "bavette": 146,
        "bavetteColor": "hsl(341, 70%, 50%)",
        "steak": 86,
        "steakColor": "hsl(239, 70%, 50%)",
        "pizza": 118,
        "pizzaColor": "hsl(246, 70%, 50%)",
        "spaghetti": 85,
        "spaghettiColor": "hsl(125, 70%, 50%)",
        "ravioli": 13,
        "ravioliColor": "hsl(118, 70%, 50%)",
        "salad": 112,
        "saladColor": "hsl(208, 70%, 50%)",
        "pad thai": 0,
        "pad thaiColor": "hsl(123, 70%, 50%)",
        "bun": 25,
        "bunColor": "hsl(212, 70%, 50%)",
        "waffle": 152,
        "waffleColor": "hsl(343, 70%, 50%)",
        "crepe": 165,
        "crepeColor": "hsl(126, 70%, 50%)",
        "churros": 70,
        "churrosColor": "hsl(200, 70%, 50%)",
        "paella": 39,
        "paellaColor": "hsl(155, 70%, 50%)",
        "empanadas": 194,
        "empanadasColor": "hsl(42, 70%, 50%)",
        "bruschetta": 50,
        "bruschettaColor": "hsl(263, 70%, 50%)",
        "onion soup": 115,
        "onion soupColor": "hsl(335, 70%, 50%)",
        "cassoulet": 65,
        "cassouletColor": "hsl(56, 70%, 50%)",
        "bouillabaisse": 98,
        "bouillabaisseColor": "hsl(204, 70%, 50%)",
        "unagi": 13,
        "unagiColor": "hsl(36, 70%, 50%)",
        "tempura": 40,
        "tempuraColor": "hsl(120, 70%, 50%)",
        "tonkatsu": 58,
        "tonkatsuColor": "hsl(173, 70%, 50%)",
        "shabu-shabu": 193,
        "shabu-shabuColor": "hsl(69, 70%, 50%)",
        "twinkies": 148,
        "twinkiesColor": "hsl(253, 70%, 50%)",
        "jerky": 98,
        "jerkyColor": "hsl(224, 70%, 50%)",
        "fajitas": 128,
        "fajitasColor": "hsl(142, 70%, 50%)",
        "jambalaya": 196,
        "jambalayaColor": "hsl(138, 70%, 50%)",
        "meatloaf": 144,
        "meatloafColor": "hsl(197, 70%, 50%)",
        "mac n' cheese": 72,
        "mac n' cheeseColor": "hsl(61, 70%, 50%)",
        "baked beans": 25,
        "baked beansColor": "hsl(45, 70%, 50%)",
        "popcorn": 197,
        "popcornColor": "hsl(116, 70%, 50%)",
        "buffalo wings": 63,
        "buffalo wingsColor": "hsl(38, 70%, 50%)",
        "BBQ ribs": 53,
        "BBQ ribsColor": "hsl(281, 70%, 50%)",
        "apple pie": 2,
        "apple pieColor": "hsl(139, 70%, 50%)",
        "nachos": 198,
        "nachosColor": "hsl(36, 70%, 50%)",
        "risotto": 103,
        "risottoColor": "hsl(250, 70%, 50%)",
        "tiramisu": 46,
        "tiramisuColor": "hsl(262, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 59,
        "hot dogColor": "hsl(63, 70%, 50%)",
        "burger": 77,
        "burgerColor": "hsl(66, 70%, 50%)",
        "sandwich": 155,
        "sandwichColor": "hsl(22, 70%, 50%)",
        "kebab": 28,
        "kebabColor": "hsl(260, 70%, 50%)",
        "fries": 105,
        "friesColor": "hsl(242, 70%, 50%)",
        "donut": 54,
        "donutColor": "hsl(131, 70%, 50%)",
        "junk": 63,
        "junkColor": "hsl(109, 70%, 50%)",
        "sushi": 140,
        "sushiColor": "hsl(231, 70%, 50%)",
        "ramen": 90,
        "ramenColor": "hsl(26, 70%, 50%)",
        "curry": 92,
        "curryColor": "hsl(29, 70%, 50%)",
        "udon": 108,
        "udonColor": "hsl(332, 70%, 50%)",
        "bagel": 112,
        "bagelColor": "hsl(357, 70%, 50%)",
        "yakitori": 198,
        "yakitoriColor": "hsl(230, 70%, 50%)",
        "takoyaki": 55,
        "takoyakiColor": "hsl(276, 70%, 50%)",
        "tacos": 76,
        "tacosColor": "hsl(164, 70%, 50%)",
        "miso soup": 167,
        "miso soupColor": "hsl(335, 70%, 50%)",
        "tortilla": 23,
        "tortillaColor": "hsl(255, 70%, 50%)",
        "tapas": 139,
        "tapasColor": "hsl(248, 70%, 50%)",
        "chipirones": 60,
        "chipironesColor": "hsl(337, 70%, 50%)",
        "gazpacho": 43,
        "gazpachoColor": "hsl(306, 70%, 50%)",
        "soba": 80,
        "sobaColor": "hsl(220, 70%, 50%)",
        "bavette": 100,
        "bavetteColor": "hsl(162, 70%, 50%)",
        "steak": 93,
        "steakColor": "hsl(43, 70%, 50%)",
        "pizza": 1,
        "pizzaColor": "hsl(30, 70%, 50%)",
        "spaghetti": 159,
        "spaghettiColor": "hsl(166, 70%, 50%)",
        "ravioli": 184,
        "ravioliColor": "hsl(149, 70%, 50%)",
        "salad": 178,
        "saladColor": "hsl(71, 70%, 50%)",
        "pad thai": 104,
        "pad thaiColor": "hsl(94, 70%, 50%)",
        "bun": 92,
        "bunColor": "hsl(318, 70%, 50%)",
        "waffle": 74,
        "waffleColor": "hsl(38, 70%, 50%)",
        "crepe": 22,
        "crepeColor": "hsl(136, 70%, 50%)",
        "churros": 174,
        "churrosColor": "hsl(80, 70%, 50%)",
        "paella": 149,
        "paellaColor": "hsl(47, 70%, 50%)",
        "empanadas": 172,
        "empanadasColor": "hsl(289, 70%, 50%)",
        "bruschetta": 151,
        "bruschettaColor": "hsl(52, 70%, 50%)",
        "onion soup": 22,
        "onion soupColor": "hsl(11, 70%, 50%)",
        "cassoulet": 181,
        "cassouletColor": "hsl(24, 70%, 50%)",
        "bouillabaisse": 143,
        "bouillabaisseColor": "hsl(343, 70%, 50%)",
        "unagi": 23,
        "unagiColor": "hsl(295, 70%, 50%)",
        "tempura": 2,
        "tempuraColor": "hsl(134, 70%, 50%)",
        "tonkatsu": 57,
        "tonkatsuColor": "hsl(297, 70%, 50%)",
        "shabu-shabu": 27,
        "shabu-shabuColor": "hsl(205, 70%, 50%)",
        "twinkies": 105,
        "twinkiesColor": "hsl(298, 70%, 50%)",
        "jerky": 153,
        "jerkyColor": "hsl(199, 70%, 50%)",
        "fajitas": 132,
        "fajitasColor": "hsl(263, 70%, 50%)",
        "jambalaya": 44,
        "jambalayaColor": "hsl(214, 70%, 50%)",
        "meatloaf": 139,
        "meatloafColor": "hsl(322, 70%, 50%)",
        "mac n' cheese": 84,
        "mac n' cheeseColor": "hsl(334, 70%, 50%)",
        "baked beans": 80,
        "baked beansColor": "hsl(292, 70%, 50%)",
        "popcorn": 153,
        "popcornColor": "hsl(341, 70%, 50%)",
        "buffalo wings": 101,
        "buffalo wingsColor": "hsl(17, 70%, 50%)",
        "BBQ ribs": 13,
        "BBQ ribsColor": "hsl(340, 70%, 50%)",
        "apple pie": 94,
        "apple pieColor": "hsl(262, 70%, 50%)",
        "nachos": 186,
        "nachosColor": "hsl(225, 70%, 50%)",
        "risotto": 102,
        "risottoColor": "hsl(104, 70%, 50%)",
        "tiramisu": 89,
        "tiramisuColor": "hsl(323, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 146,
        "hot dogColor": "hsl(98, 70%, 50%)",
        "burger": 20,
        "burgerColor": "hsl(249, 70%, 50%)",
        "sandwich": 179,
        "sandwichColor": "hsl(221, 70%, 50%)",
        "kebab": 9,
        "kebabColor": "hsl(211, 70%, 50%)",
        "fries": 14,
        "friesColor": "hsl(138, 70%, 50%)",
        "donut": 21,
        "donutColor": "hsl(168, 70%, 50%)",
        "junk": 162,
        "junkColor": "hsl(62, 70%, 50%)",
        "sushi": 61,
        "sushiColor": "hsl(202, 70%, 50%)",
        "ramen": 17,
        "ramenColor": "hsl(153, 70%, 50%)",
        "curry": 95,
        "curryColor": "hsl(325, 70%, 50%)",
        "udon": 61,
        "udonColor": "hsl(119, 70%, 50%)",
        "bagel": 14,
        "bagelColor": "hsl(234, 70%, 50%)",
        "yakitori": 4,
        "yakitoriColor": "hsl(54, 70%, 50%)",
        "takoyaki": 107,
        "takoyakiColor": "hsl(95, 70%, 50%)",
        "tacos": 65,
        "tacosColor": "hsl(20, 70%, 50%)",
        "miso soup": 165,
        "miso soupColor": "hsl(148, 70%, 50%)",
        "tortilla": 170,
        "tortillaColor": "hsl(353, 70%, 50%)",
        "tapas": 182,
        "tapasColor": "hsl(148, 70%, 50%)",
        "chipirones": 37,
        "chipironesColor": "hsl(91, 70%, 50%)",
        "gazpacho": 95,
        "gazpachoColor": "hsl(35, 70%, 50%)",
        "soba": 43,
        "sobaColor": "hsl(207, 70%, 50%)",
        "bavette": 192,
        "bavetteColor": "hsl(210, 70%, 50%)",
        "steak": 110,
        "steakColor": "hsl(50, 70%, 50%)",
        "pizza": 49,
        "pizzaColor": "hsl(271, 70%, 50%)",
        "spaghetti": 18,
        "spaghettiColor": "hsl(343, 70%, 50%)",
        "ravioli": 155,
        "ravioliColor": "hsl(263, 70%, 50%)",
        "salad": 102,
        "saladColor": "hsl(118, 70%, 50%)",
        "pad thai": 162,
        "pad thaiColor": "hsl(24, 70%, 50%)",
        "bun": 87,
        "bunColor": "hsl(307, 70%, 50%)",
        "waffle": 2,
        "waffleColor": "hsl(309, 70%, 50%)",
        "crepe": 93,
        "crepeColor": "hsl(101, 70%, 50%)",
        "churros": 123,
        "churrosColor": "hsl(290, 70%, 50%)",
        "paella": 50,
        "paellaColor": "hsl(65, 70%, 50%)",
        "empanadas": 54,
        "empanadasColor": "hsl(274, 70%, 50%)",
        "bruschetta": 32,
        "bruschettaColor": "hsl(295, 70%, 50%)",
        "onion soup": 14,
        "onion soupColor": "hsl(209, 70%, 50%)",
        "cassoulet": 97,
        "cassouletColor": "hsl(30, 70%, 50%)",
        "bouillabaisse": 168,
        "bouillabaisseColor": "hsl(283, 70%, 50%)",
        "unagi": 39,
        "unagiColor": "hsl(50, 70%, 50%)",
        "tempura": 78,
        "tempuraColor": "hsl(292, 70%, 50%)",
        "tonkatsu": 41,
        "tonkatsuColor": "hsl(88, 70%, 50%)",
        "shabu-shabu": 194,
        "shabu-shabuColor": "hsl(97, 70%, 50%)",
        "twinkies": 108,
        "twinkiesColor": "hsl(341, 70%, 50%)",
        "jerky": 187,
        "jerkyColor": "hsl(358, 70%, 50%)",
        "fajitas": 172,
        "fajitasColor": "hsl(82, 70%, 50%)",
        "jambalaya": 185,
        "jambalayaColor": "hsl(88, 70%, 50%)",
        "meatloaf": 0,
        "meatloafColor": "hsl(199, 70%, 50%)",
        "mac n' cheese": 41,
        "mac n' cheeseColor": "hsl(156, 70%, 50%)",
        "baked beans": 43,
        "baked beansColor": "hsl(81, 70%, 50%)",
        "popcorn": 191,
        "popcornColor": "hsl(250, 70%, 50%)",
        "buffalo wings": 23,
        "buffalo wingsColor": "hsl(82, 70%, 50%)",
        "BBQ ribs": 107,
        "BBQ ribsColor": "hsl(140, 70%, 50%)",
        "apple pie": 89,
        "apple pieColor": "hsl(290, 70%, 50%)",
        "nachos": 118,
        "nachosColor": "hsl(153, 70%, 50%)",
        "risotto": 108,
        "risottoColor": "hsl(256, 70%, 50%)",
        "tiramisu": 110,
        "tiramisuColor": "hsl(310, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 138,
        "hot dogColor": "hsl(117, 70%, 50%)",
        "burger": 154,
        "burgerColor": "hsl(143, 70%, 50%)",
        "sandwich": 135,
        "sandwichColor": "hsl(235, 70%, 50%)",
        "kebab": 148,
        "kebabColor": "hsl(231, 70%, 50%)",
        "fries": 11,
        "friesColor": "hsl(54, 70%, 50%)",
        "donut": 126,
        "donutColor": "hsl(221, 70%, 50%)",
        "junk": 41,
        "junkColor": "hsl(311, 70%, 50%)",
        "sushi": 183,
        "sushiColor": "hsl(53, 70%, 50%)",
        "ramen": 85,
        "ramenColor": "hsl(203, 70%, 50%)",
        "curry": 81,
        "curryColor": "hsl(145, 70%, 50%)",
        "udon": 197,
        "udonColor": "hsl(336, 70%, 50%)",
        "bagel": 57,
        "bagelColor": "hsl(353, 70%, 50%)",
        "yakitori": 154,
        "yakitoriColor": "hsl(31, 70%, 50%)",
        "takoyaki": 182,
        "takoyakiColor": "hsl(17, 70%, 50%)",
        "tacos": 135,
        "tacosColor": "hsl(109, 70%, 50%)",
        "miso soup": 120,
        "miso soupColor": "hsl(175, 70%, 50%)",
        "tortilla": 183,
        "tortillaColor": "hsl(268, 70%, 50%)",
        "tapas": 79,
        "tapasColor": "hsl(130, 70%, 50%)",
        "chipirones": 70,
        "chipironesColor": "hsl(197, 70%, 50%)",
        "gazpacho": 31,
        "gazpachoColor": "hsl(339, 70%, 50%)",
        "soba": 111,
        "sobaColor": "hsl(174, 70%, 50%)",
        "bavette": 29,
        "bavetteColor": "hsl(261, 70%, 50%)",
        "steak": 123,
        "steakColor": "hsl(173, 70%, 50%)",
        "pizza": 52,
        "pizzaColor": "hsl(208, 70%, 50%)",
        "spaghetti": 161,
        "spaghettiColor": "hsl(316, 70%, 50%)",
        "ravioli": 94,
        "ravioliColor": "hsl(272, 70%, 50%)",
        "salad": 179,
        "saladColor": "hsl(74, 70%, 50%)",
        "pad thai": 42,
        "pad thaiColor": "hsl(305, 70%, 50%)",
        "bun": 100,
        "bunColor": "hsl(71, 70%, 50%)",
        "waffle": 12,
        "waffleColor": "hsl(258, 70%, 50%)",
        "crepe": 59,
        "crepeColor": "hsl(144, 70%, 50%)",
        "churros": 39,
        "churrosColor": "hsl(122, 70%, 50%)",
        "paella": 21,
        "paellaColor": "hsl(138, 70%, 50%)",
        "empanadas": 24,
        "empanadasColor": "hsl(195, 70%, 50%)",
        "bruschetta": 64,
        "bruschettaColor": "hsl(128, 70%, 50%)",
        "onion soup": 90,
        "onion soupColor": "hsl(244, 70%, 50%)",
        "cassoulet": 138,
        "cassouletColor": "hsl(227, 70%, 50%)",
        "bouillabaisse": 137,
        "bouillabaisseColor": "hsl(8, 70%, 50%)",
        "unagi": 187,
        "unagiColor": "hsl(144, 70%, 50%)",
        "tempura": 1,
        "tempuraColor": "hsl(180, 70%, 50%)",
        "tonkatsu": 116,
        "tonkatsuColor": "hsl(275, 70%, 50%)",
        "shabu-shabu": 61,
        "shabu-shabuColor": "hsl(71, 70%, 50%)",
        "twinkies": 132,
        "twinkiesColor": "hsl(58, 70%, 50%)",
        "jerky": 3,
        "jerkyColor": "hsl(25, 70%, 50%)",
        "fajitas": 79,
        "fajitasColor": "hsl(217, 70%, 50%)",
        "jambalaya": 63,
        "jambalayaColor": "hsl(117, 70%, 50%)",
        "meatloaf": 54,
        "meatloafColor": "hsl(41, 70%, 50%)",
        "mac n' cheese": 109,
        "mac n' cheeseColor": "hsl(318, 70%, 50%)",
        "baked beans": 161,
        "baked beansColor": "hsl(286, 70%, 50%)",
        "popcorn": 91,
        "popcornColor": "hsl(234, 70%, 50%)",
        "buffalo wings": 45,
        "buffalo wingsColor": "hsl(7, 70%, 50%)",
        "BBQ ribs": 154,
        "BBQ ribsColor": "hsl(224, 70%, 50%)",
        "apple pie": 37,
        "apple pieColor": "hsl(155, 70%, 50%)",
        "nachos": 63,
        "nachosColor": "hsl(348, 70%, 50%)",
        "risotto": 14,
        "risottoColor": "hsl(250, 70%, 50%)",
        "tiramisu": 24,
        "tiramisuColor": "hsl(268, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 148,
        "hot dogColor": "hsl(329, 70%, 50%)",
        "burger": 131,
        "burgerColor": "hsl(204, 70%, 50%)",
        "sandwich": 179,
        "sandwichColor": "hsl(98, 70%, 50%)",
        "kebab": 181,
        "kebabColor": "hsl(327, 70%, 50%)",
        "fries": 45,
        "friesColor": "hsl(78, 70%, 50%)",
        "donut": 32,
        "donutColor": "hsl(351, 70%, 50%)",
        "junk": 121,
        "junkColor": "hsl(72, 70%, 50%)",
        "sushi": 190,
        "sushiColor": "hsl(309, 70%, 50%)",
        "ramen": 47,
        "ramenColor": "hsl(151, 70%, 50%)",
        "curry": 51,
        "curryColor": "hsl(324, 70%, 50%)",
        "udon": 37,
        "udonColor": "hsl(314, 70%, 50%)",
        "bagel": 153,
        "bagelColor": "hsl(84, 70%, 50%)",
        "yakitori": 76,
        "yakitoriColor": "hsl(130, 70%, 50%)",
        "takoyaki": 106,
        "takoyakiColor": "hsl(104, 70%, 50%)",
        "tacos": 50,
        "tacosColor": "hsl(137, 70%, 50%)",
        "miso soup": 89,
        "miso soupColor": "hsl(202, 70%, 50%)",
        "tortilla": 19,
        "tortillaColor": "hsl(45, 70%, 50%)",
        "tapas": 77,
        "tapasColor": "hsl(27, 70%, 50%)",
        "chipirones": 163,
        "chipironesColor": "hsl(54, 70%, 50%)",
        "gazpacho": 100,
        "gazpachoColor": "hsl(197, 70%, 50%)",
        "soba": 184,
        "sobaColor": "hsl(108, 70%, 50%)",
        "bavette": 117,
        "bavetteColor": "hsl(215, 70%, 50%)",
        "steak": 8,
        "steakColor": "hsl(193, 70%, 50%)",
        "pizza": 175,
        "pizzaColor": "hsl(117, 70%, 50%)",
        "spaghetti": 199,
        "spaghettiColor": "hsl(50, 70%, 50%)",
        "ravioli": 114,
        "ravioliColor": "hsl(193, 70%, 50%)",
        "salad": 86,
        "saladColor": "hsl(264, 70%, 50%)",
        "pad thai": 75,
        "pad thaiColor": "hsl(159, 70%, 50%)",
        "bun": 18,
        "bunColor": "hsl(181, 70%, 50%)",
        "waffle": 27,
        "waffleColor": "hsl(350, 70%, 50%)",
        "crepe": 128,
        "crepeColor": "hsl(34, 70%, 50%)",
        "churros": 116,
        "churrosColor": "hsl(168, 70%, 50%)",
        "paella": 159,
        "paellaColor": "hsl(64, 70%, 50%)",
        "empanadas": 177,
        "empanadasColor": "hsl(173, 70%, 50%)",
        "bruschetta": 104,
        "bruschettaColor": "hsl(117, 70%, 50%)",
        "onion soup": 97,
        "onion soupColor": "hsl(174, 70%, 50%)",
        "cassoulet": 187,
        "cassouletColor": "hsl(148, 70%, 50%)",
        "bouillabaisse": 89,
        "bouillabaisseColor": "hsl(113, 70%, 50%)",
        "unagi": 26,
        "unagiColor": "hsl(348, 70%, 50%)",
        "tempura": 45,
        "tempuraColor": "hsl(148, 70%, 50%)",
        "tonkatsu": 127,
        "tonkatsuColor": "hsl(246, 70%, 50%)",
        "shabu-shabu": 167,
        "shabu-shabuColor": "hsl(352, 70%, 50%)",
        "twinkies": 68,
        "twinkiesColor": "hsl(234, 70%, 50%)",
        "jerky": 98,
        "jerkyColor": "hsl(227, 70%, 50%)",
        "fajitas": 191,
        "fajitasColor": "hsl(234, 70%, 50%)",
        "jambalaya": 168,
        "jambalayaColor": "hsl(267, 70%, 50%)",
        "meatloaf": 117,
        "meatloafColor": "hsl(112, 70%, 50%)",
        "mac n' cheese": 6,
        "mac n' cheeseColor": "hsl(300, 70%, 50%)",
        "baked beans": 76,
        "baked beansColor": "hsl(233, 70%, 50%)",
        "popcorn": 36,
        "popcornColor": "hsl(274, 70%, 50%)",
        "buffalo wings": 43,
        "buffalo wingsColor": "hsl(251, 70%, 50%)",
        "BBQ ribs": 60,
        "BBQ ribsColor": "hsl(21, 70%, 50%)",
        "apple pie": 17,
        "apple pieColor": "hsl(190, 70%, 50%)",
        "nachos": 139,
        "nachosColor": "hsl(256, 70%, 50%)",
        "risotto": 94,
        "risottoColor": "hsl(95, 70%, 50%)",
        "tiramisu": 42,
        "tiramisuColor": "hsl(93, 70%, 50%)"
    },
    {
        "country": "AO",
        "hot dog": 9,
        "hot dogColor": "hsl(161, 70%, 50%)",
        "burger": 154,
        "burgerColor": "hsl(227, 70%, 50%)",
        "sandwich": 1,
        "sandwichColor": "hsl(199, 70%, 50%)",
        "kebab": 15,
        "kebabColor": "hsl(60, 70%, 50%)",
        "fries": 55,
        "friesColor": "hsl(89, 70%, 50%)",
        "donut": 61,
        "donutColor": "hsl(135, 70%, 50%)",
        "junk": 145,
        "junkColor": "hsl(293, 70%, 50%)",
        "sushi": 63,
        "sushiColor": "hsl(35, 70%, 50%)",
        "ramen": 176,
        "ramenColor": "hsl(19, 70%, 50%)",
        "curry": 39,
        "curryColor": "hsl(241, 70%, 50%)",
        "udon": 84,
        "udonColor": "hsl(41, 70%, 50%)",
        "bagel": 164,
        "bagelColor": "hsl(317, 70%, 50%)",
        "yakitori": 66,
        "yakitoriColor": "hsl(77, 70%, 50%)",
        "takoyaki": 139,
        "takoyakiColor": "hsl(221, 70%, 50%)",
        "tacos": 139,
        "tacosColor": "hsl(325, 70%, 50%)",
        "miso soup": 23,
        "miso soupColor": "hsl(158, 70%, 50%)",
        "tortilla": 61,
        "tortillaColor": "hsl(289, 70%, 50%)",
        "tapas": 91,
        "tapasColor": "hsl(126, 70%, 50%)",
        "chipirones": 174,
        "chipironesColor": "hsl(216, 70%, 50%)",
        "gazpacho": 195,
        "gazpachoColor": "hsl(215, 70%, 50%)",
        "soba": 115,
        "sobaColor": "hsl(319, 70%, 50%)",
        "bavette": 12,
        "bavetteColor": "hsl(331, 70%, 50%)",
        "steak": 19,
        "steakColor": "hsl(100, 70%, 50%)",
        "pizza": 73,
        "pizzaColor": "hsl(239, 70%, 50%)",
        "spaghetti": 0,
        "spaghettiColor": "hsl(158, 70%, 50%)",
        "ravioli": 100,
        "ravioliColor": "hsl(221, 70%, 50%)",
        "salad": 108,
        "saladColor": "hsl(118, 70%, 50%)",
        "pad thai": 86,
        "pad thaiColor": "hsl(167, 70%, 50%)",
        "bun": 43,
        "bunColor": "hsl(96, 70%, 50%)",
        "waffle": 74,
        "waffleColor": "hsl(247, 70%, 50%)",
        "crepe": 18,
        "crepeColor": "hsl(195, 70%, 50%)",
        "churros": 164,
        "churrosColor": "hsl(209, 70%, 50%)",
        "paella": 185,
        "paellaColor": "hsl(25, 70%, 50%)",
        "empanadas": 77,
        "empanadasColor": "hsl(182, 70%, 50%)",
        "bruschetta": 22,
        "bruschettaColor": "hsl(32, 70%, 50%)",
        "onion soup": 178,
        "onion soupColor": "hsl(288, 70%, 50%)",
        "cassoulet": 59,
        "cassouletColor": "hsl(327, 70%, 50%)",
        "bouillabaisse": 13,
        "bouillabaisseColor": "hsl(340, 70%, 50%)",
        "unagi": 44,
        "unagiColor": "hsl(35, 70%, 50%)",
        "tempura": 180,
        "tempuraColor": "hsl(247, 70%, 50%)",
        "tonkatsu": 135,
        "tonkatsuColor": "hsl(24, 70%, 50%)",
        "shabu-shabu": 2,
        "shabu-shabuColor": "hsl(77, 70%, 50%)",
        "twinkies": 99,
        "twinkiesColor": "hsl(319, 70%, 50%)",
        "jerky": 123,
        "jerkyColor": "hsl(71, 70%, 50%)",
        "fajitas": 111,
        "fajitasColor": "hsl(305, 70%, 50%)",
        "jambalaya": 178,
        "jambalayaColor": "hsl(179, 70%, 50%)",
        "meatloaf": 121,
        "meatloafColor": "hsl(53, 70%, 50%)",
        "mac n' cheese": 194,
        "mac n' cheeseColor": "hsl(116, 70%, 50%)",
        "baked beans": 193,
        "baked beansColor": "hsl(188, 70%, 50%)",
        "popcorn": 167,
        "popcornColor": "hsl(28, 70%, 50%)",
        "buffalo wings": 91,
        "buffalo wingsColor": "hsl(311, 70%, 50%)",
        "BBQ ribs": 175,
        "BBQ ribsColor": "hsl(241, 70%, 50%)",
        "apple pie": 175,
        "apple pieColor": "hsl(222, 70%, 50%)",
        "nachos": 51,
        "nachosColor": "hsl(249, 70%, 50%)",
        "risotto": 36,
        "risottoColor": "hsl(113, 70%, 50%)",
        "tiramisu": 147,
        "tiramisuColor": "hsl(171, 70%, 50%)"
    }
]

function UserPage() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid item xs={12}>
            <EditUser
                open={open}
                handleClose={handleClose}
            />
            <Paper
                sx={{
                    marginTop: "53px",
                    height: '100%',
                    backgroundColor: '#FFFDFA',
                    position: 'overflow',
                    boxShadow: 'none',
                }}
            >
                <div style={{
                    backgroundColor: "#ACCDDC",
                    height: '200px'
                }} />
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    marginTop: "20px"
                }}>
                    <div style={{
                        paddingLeft: "30px"
                    }}>

                        <Typography variant="h6">
                            Joel Tates Asimbaya

                        </Typography>
                        <Typography variant="overline">
                            EPN - Tescnologo en software
                        </Typography>
                    </div>
                    <div style={{

                        paddingRight: "30px"
                    }}>
                        <ButtonOutline text={"Editar"} onClick={handleOpen} />
                    </div>
                </div>
                <div style={CssContentInfo}>
                    <Typography variant='h6' sx={{ marginBottom: '20px' }}>
                        Acerca de
                    </Typography>
                    <div>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                            Correo electronico
                        </Typography>
                        <Typography variant='body2'>
                            gabrielasimbaya@gmail.com
                        </Typography>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                            Celular
                        </Typography>
                        <Typography variant='body2'>
                            09871287831
                        </Typography>
                    </div>
                </div>
                <div style={CssContentInfo}>
                    <Typography variant='h6' sx={{ marginBottom: '20px' }}>
                        Estadisticas
                    </Typography>

                </div>

                <ResponsiveBarCanvas
             
                    data={data}
                    height={300}
                    keys={[
                        'hot dog',
                        'burger',
                        'sandwich',
                        'kebab',
                        'fries',
                        'donut',
                        'junk',
                        'sushi',
                        'ramen',
                        'curry',
                        'udon',
                        'bagel',
                        'yakitori',
                        'takoyaki',
                        'tacos',
                        'miso soup',
                        'tortilla',
                        'tapas',
                        'chipirones',
                        'gazpacho',
                        'soba',
                        'bavette',
                        'steak',
                        'pizza',
                        'spaghetti',
                        'ravioli',
                        'salad',
                        'pad thai',
                        'bun',
                        'waffle',
                        'crepe',
                        'churros',
                        'paella',
                        'empanadas',
                        'bruschetta',
                        'onion soup',
                        'cassoulet',
                        'bouillabaisse',
                        'unagi',
                        'tempura',
                        'tonkatsu',
                        'shabu-shabu',
                        'twinkies',
                        'jerky',
                        'fajitas',
                        'jambalaya',
                        'meatloaf',
                        'baked beans',
                        'popcorn',
                        'buffalo wings',
                        'BBQ ribs',
                        'apple pie',
                        'nachos',
                        'risotto',
                        'tiramisu'
                    ]}
                    indexBy="country"
                    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                    pixelRatio={1.25}
                    padding={0.15}
                    innerPadding={0}
                    minValue="auto"
                    maxValue="auto"
                    groupMode="stacked"
                    layout="vertical"
                    reverse={false}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'red_blue' }}
                    colorBy="id"
                    borderWidth={0}
                    borderRadius={0}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 36,
                        truncateTickAt: 0
                    }}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 36,
                        truncateTickAt: 0
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'food',
                        legendPosition: 'middle',
                        legendOffset: -40,
                        truncateTickAt: 0
                    }}
                    enableGridX={true}
                    enableGridY={false}
                    enableLabel={true}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    isInteractive={true}
                    legends={[]}
                />

            </Paper>
        </Grid>
    )
}

export default UserPage