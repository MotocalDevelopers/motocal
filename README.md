# motocal
This is a repository for the development of former curry calculator (gbf attack power calculator).\

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/MotocalDevelopers/motocal)

## Preparation for development

### Local Development
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ open index.html
```
or
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ npm install
$ npm run build
$ npm run start
$ open localhost:8000
```
### Docker version
```sh
$ git clone https://github.com/MotocalDevelopers/motocal.git motocal
$ cd motocal
$ docker-compose up
```

## Build command
### Commands for development environment
```sh
$ npm run start
```

### Debug Build
```sh
$ npm run build
```
### Debug Watch
```sh
$ npm run watch-dev
```
### Build for release
```sh
$ npm run production-build
```
### Release Watch
```sh
$ npm run production-watch-dev
```

## Structure
- src: Source code before trans-piling
- dist: Source code after trans-piling
- scripts: Script for generating data
- txt_sources: Text data for template processing
- imgs, charaimgs: Image data for templates display

## Workflow
### Function development
1. Fiddling inside src
2. Generate dist / main.js etc. with npm run build
    - For release builds, run ''npm run production-build''
    - Or monitor with ''npm run watch-dev''
3. Merge the production branch on release and then run ''npm run production-build''

### Updating weapon templates
1. For the weapon you want to add, copy the corresponding line of the wiki and paste it on the top of txt_source/armData-ssr.txt
2. Run arm_data_converter.py
    - When dealing with new skills, please add the corresponding new skill name to arm_data_converter.py => Add the new skill to the calculator.

※ For new upper limit breaking weapon it is necessary, to add a status at the end for 4 stars and 5 stars, the data added at the end is ○ (4 stars) or ◎ (5 stars) and Lv 100, Lv 150 stats. Please add it appropriately with reference to the examples.

### Updating character templates
1. For the character you want to add, copy the corresponding line of the wiki and paste it on the top of txt_source/charaData.txt
2. Run chara_data_converter.py

※ For new upper limit breaking of a character, it is OK just to update the stats (All characters stats are for their highest uncap, only exception are eternal character that have a version for 4 and 5 star)

## Note
- Php file for DB communication is not managed.
- The repository does not manage image files for templates. It is necessary to DL using the following scripts.

## About scripts / 作業用スクリプトについて
This is section for scripts that generates json data for templates and pulls weapon/character image data from gbfwiki.

※ Downloading images from the game is possible, but that may be considered as a bannable offense, if you use that script, you use it on your own personal responsibility.

For python scripts / pythonスクリプトなら、
```sh
$ python3 ./scripts/arm_data_converter.py
```

Please execute in the order of.

#### arm\_data\_converter.py
- Generate armData.json from txt_source/armData-ssr.txt and txt_source/armData-sr.txt.

#### chara\_data\_converter.py
- Generate charaData.json from txt_source/charaData.txt.

#### download\_images.py arm
- Downloads the image data for weapons described in txt_source/armImageWikiURLList.txt from the wiki.

#### download\_images.py chara
- Downloads the image data for characters described in txt_source/charaImageWikiURLList.txt from the wiki.

## LICENSE
MIT
