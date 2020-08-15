# motocal
This is a repository for the development of motocal calculator (Granblue Fantasy ATK Calculator).
* 📝README: **English** / [日本語](README-ja.md)
* 📒Wiki: [GitHub](https://github.com/MotocalDevelopers/motocal/wiki)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://www.heroku.com/deploy/?template=https://github.com/MotocalDevelopers/motocal)
[<img alt="Edit on CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg" height="32" />](https://kei-gbf.github.io/codesandbox-button/redirect.html)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/MotocalDevelopers/motocal)

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
    
SSR: https://gbf-wiki.com/index.php?%C9%F0%B4%EFSSR  
SSR2: https://gbf-wiki.com/index.php?%C9%F0%B4%EFSSR%2F%C6%C3%BC%EC%C9%F0%B4%EF  
SR: https://gbf-wiki.com/index.php?%C9%F0%B4%EFSR  

\* For new upper limit breaking weapon it is necessary, to add a status at the end for 4 stars and 5 stars, the data added at the end is ○ (4 stars) or ◎ (5 stars) and Lv 100, Lv 150 stats. Please add it appropriately with reference to the examples.

### Updating character templates
1. For the character you want to add, copy the corresponding line of the wiki and paste it on the top of txt_source/charaData.txt
2. Run chara_data_converter.py

SSR: https://gbf-wiki.com/index.php?%BF%CD%CA%AASSR  
SR: https://gbf-wiki.com/index.php?%BF%CD%CA%AASR  
R: https://gbf-wiki.com/index.php?%BF%CD%CA%AAR  

\* For new upper limit breaking of a character, it is OK just to update the stats (All characters stats are for their highest uncap, only exception are eternal character that have a version for 4 and 5 star)  
\* Updating of Base Multiattack Rate and C.A. Multiplier is done by adding to chara\_data\_converter.py.

## Note
- Php file for DB communication is not managed.
- The repository does not manage image files for templates. It is necessary to DL using the following scripts.

## About scripts
This is section for scripts that generates json data for templates and pulls weapon/character image data from gbfwiki.

\* Downloading images from the game is possible, but that may be considered as a bannable offense, if you use that script, you use it on your own personal responsibility.

For python scripts
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
- Requires Python 3.7+ and python3 in the path.
- Can be directly called using npm run download:run.
- More advanced configuration can be done by passing parameters to npm script -- [PARAMETERS].
- Help on script options can be learn via npm run download:help
- Updates on images can be fetch by rerunning script.

#### download\_images.py chara
- Downloads the image data for characters described in txt_source/charaImageWikiURLList.txt from the wiki.
- Requires Python 3.7+ and python3 in the path.
- Can be directly called using npm run download:run.
- More advanced configuration can be done by passing parameters to npm script -- [PARAMETERS].
- Help on script options can be learn via npm run download:help
- Updates on images can be fetch by rerunning script.

## LICENSE
MIT
