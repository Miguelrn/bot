const checker = require('./checker.js');

var series = new checker('D:/series', 'series.json');
series.start();
var anime = new checker('D:/anime', 'anime.json');
anime.start();
