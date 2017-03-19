#!/bin/sh
cd charaimgs
wget -i imageURLlist.txt
rename index.php\?plugin=attach\&refer=img\&openfile= "" index.php\?plugin=attach\&refer=img\&openfile=*
