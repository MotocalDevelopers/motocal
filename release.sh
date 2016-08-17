cp src/content-dev.js src/content.js
cp style-dev.css style.css
browserify -t reactify src/content.js -o build/content.js
