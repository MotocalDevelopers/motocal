cp src/content-dev.js src/content.js
cp css/style-dev.css css/style.css
cp css/smartphone-dev.css css/smartphone.css
cp css/tablet-dev.css css/tablet.css
browserify -t reactify src/content.js -o build/content.js
