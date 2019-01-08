import csv
import inspect
import json
import os
import re
from collections import OrderedDict

skillnamelist = OrderedDict()

# normal L and LL
skillnamelist["normalLLM"] = {
    u"紅蓮の攻刃III": "fire",
    u"霧氷の攻刃III": "water",
    u"地裂の攻刃III": "earth",
    u"乱気の攻刃III": "wind",
    u"天光の攻刃III": "light",
    u"奈落の攻刃III": "dark"
}

skillnamelist["normalLL"] = {
    u"紅蓮の攻刃II": "fire",
    u"霧氷の攻刃II": "water",
    u"地裂の攻刃II": "earth",
    u"乱気の攻刃II": "wind",
    u"天光の攻刃II": "light",
    u"奈落の攻刃II": "dark"
}

skillnamelist["normalHPLL"] = {
    u"紅蓮の守護II": "fire",
    u"霧氷の守護II": "water",
    u"地裂の守護II": "earth",
    u"乱気の守護II": "wind",
    u"天光の守護II": "light",
    u"奈落の守護II": "dark"
}

skillnamelist["gurenJuin"] = {u"紅蓮の呪印・弐": "fire"}
skillnamelist["muhyoTuiga"] = {u"霧氷の追牙・肆": "water"}

# 紅蓮の呪印（弐ではない）は通常攻刃大として扱う
skillnamelist["normalL"] = {
    u"紅蓮の攻刃": "fire",
    u"霧氷の攻刃": "water",
    u"地裂の攻刃": "earth",
    u"乱気の攻刃": "wind",
    u"天光の攻刃": "light",
    u"奈落の攻刃": "dark",
    u"紅蓮の呪印": "fire"
}

skillnamelist["normalHPL"] = {
    u"紅蓮の守護": "fire",
    u"霧氷の守護": "water",
    u"地裂の守護": "earth",
    u"乱気の守護": "wind",
    u"天光の守護": "light",
    u"奈落の守護": "dark"
}

skillnamelist["normalCriticalL"] = {
    u"紅蓮の技巧": "fire",
    u"霧氷の技巧": "water",
    u"地裂の技巧": "earth",
    u"乱気の技巧": "wind",
    u"天光の技巧": "light",
    u"奈落の技巧": "dark"
}

skillnamelist["normalHaisuiL"] = {
    u"紅蓮の背水": "fire",
    u"霧氷の背水": "water",
    u"地裂の背水": "earth",
    u"乱気の背水": "wind",
    u"天光の背水": "light",
    u"奈落の背水": "dark"
}

skillnamelist["normalBoukunLLL"] = {
    u"紅蓮の暴君II": "fire",
    u"霧氷の暴君II": "water",
    u"地裂の暴君II": "earth",
    u"乱気の暴君II": "wind",
    u"天光の暴君II": "light",
    u"奈落の暴君II": "dark"
}

skillnamelist["normalBoukunL"] = {
    u"紅蓮の暴君": "fire",
    u"霧氷の暴君": "water",
    u"地裂の暴君": "earth",
    u"乱気の暴君": "wind",
    u"天光の暴君": "light",
    u"奈落の暴君": "dark"
}

skillnamelist["normalNiteL"] = {
    u"紅蓮の二手": "fire",
    u"霧氷の二手": "water",
    u"地裂の二手": "earth",
    u"乱気の二手": "wind",
    u"天光の二手": "light",
    u"奈落の二手": "dark"
}

skillnamelist["normalSanteL"] = {
    u"紅蓮の三手": "fire",
    u"霧氷の三手": "water",
    u"地裂の三手": "earth",
    u"乱気の三手": "wind",
    u"天光の三手": "light",
    u"奈落の三手": "dark"
}

# 渾身は現状通常扱いで良いが、〜星系スキルが別枠で扱われるようになった場合には別スキルにする必要がある
skillnamelist["normalKonshinL"] = {
    u"紅蓮の渾身": "fire",
    u"霧氷の渾身": "water",
    u"地裂の渾身": "earth",
    u"乱気の渾身": "wind",
    u"天光の渾身": "light",
    u"奈落の渾身": "dark",
    u"青星の渾身": "water",
    u"白星の渾身": "light"
}

# skillnamelist["normalKamui"] = {u"紅蓮の神威": "fire", u"霧氷の神威": "water", u"地裂の神威": "earth", u"乱気の神威": "wind", u"天光の神威": "light", u"奈落の神威": "dark"}
skillnamelist["normalKatsumokuS"] = {
    u"紅蓮の括目": "fire",
    u"霧氷の括目": "water",
    u"地裂の括目": "earth",
    u"乱気の括目": "wind",
    u"天光の括目": "light",
    u"奈落の括目": "dark"
}

# normalM
skillnamelist["normalM"] = {
    u"業火の攻刃": "fire",
    u"渦潮の攻刃": "water",
    u"大地の攻刃": "earth",
    u"竜巻の攻刃": "wind",
    u"雷電の攻刃": "light",
    u"憎悪の攻刃": "dark"
}

skillnamelist["normalHPM"] = {
    u"業火の守護": "fire",
    u"渦潮の守護": "water",
    u"大地の守護": "earth",
    u"竜巻の守護": "wind",
    u"雷電の守護": "light",
    u"憎悪の守護": "dark"
}

skillnamelist["normalKamuiM"] = {
    u"業火の神威": "fire",
    u"渦潮の神威": "water",
    u"大地の神威": "earth",
    u"竜巻の神威": "wind",
    u"雷電の神威": "light",
    u"憎悪の神威": "dark"
}

skillnamelist["normalNiteM"] = {
    u"業火の二手": "fire",
    u"渦潮の二手": "water",
    u"大地の二手": "earth",
    u"竜巻の二手": "wind",
    u"雷電の二手": "light",
    u"憎悪の二手": "dark"
}

skillnamelist["normalCriticalM"] = {
    u"業火の技巧": "fire",
    u"渦潮の技巧": "water",
    u"大地の技巧": "earth",
    u"竜巻の技巧": "wind",
    u"雷電の技巧": "light",
    u"憎悪の技巧": "dark"
}

skillnamelist["normalHaisuiM"] = {
    u"業火の背水": "fire",
    u"渦潮の背水": "water",
    u"大地の背水": "earth",
    u"竜巻の背水": "wind",
    u"雷電の背水": "light",
    u"憎悪の背水": "dark"
}

skillnamelist["normalKonshinM"] = {
    u"業火の渾身": "fire",
    u"渦潮の渾身": "water",
    u"大地の渾身": "earth",
    u"竜巻の渾身": "wind",
    u"雷電の渾身": "light",
    u"憎悪の渾身": "dark"
}

skillnamelist["normalSetsuna"] = {
    u"業火の刹那": "fire",
    u"渦潮の刹那": "water",
    u"大地の刹那": "earth",
    u"竜巻の刹那": "wind",
    u"雷電の刹那": "light",
    u"憎悪の刹那": "dark"
}

skillnamelist["normalKatsumiS"] = {
    u"火の克己": "fire",
    u"水の克己": "water",
    u"土の克己": "earth",
    u"風の克己": "wind",
    u"光の克己": "light",
    u"闇の克己": "dark"
}

skillnamelist["normalKatsumiM"] = {
    u"業火の克己": "fire",
    u"渦潮の克己": "water",
    u"大地の克己": "earth",
    u"竜巻の克己": "wind",
    u"雷電の克己": "light",
    u"憎悪の克己": "dark"
}

skillnamelist["normalRasetsuM"] = {
    u"業火の羅刹": "fire",
    u"渦潮の羅刹": "water",
    u"大地の羅刹": "earth",
    u"竜巻の羅刹": "wind",
    u"雷電の羅刹": "light",
    u"憎悪の羅刹": "dark"
}

# 無双: 攻刃 + 二手
skillnamelist["normalMusouM"] = {
    u"業火の無双": "fire",
    u"渦潮の無双": "water",
    u"大地の無双": "earth",
    u"竜巻の無双": "wind",
    u"雷電の無双": "light",
    u"憎悪の無双": "dark"
}

skillnamelist["normalMusouLL"] = {
    u"業火の無双II": "fire",
    u"渦潮の無双II": "water",
    u"地裂の無双II": "earth",
    u"竜巻の無双II": "wind",
    u"雷電の無双II": "light",
    u"憎悪の無双II": "dark"
}

skillnamelist["normalJinkaiS"] = {
    u"火の刃界": "fire",
    u"水の刃界": "water",
    u"土の刃界": "earth",
    u"風の刃界": "wind",
    u"光の刃界": "light",
    u"闇の刃界": "dark"
}

# normalS
skillnamelist["normalS"] = {
    u"火の攻刃": "fire",
    u"水の攻刃": "water",
    u"土の攻刃": "earth",
    u"風の攻刃": "wind",
    u"光の攻刃": "light",
    u"闇の攻刃": "dark"
}

skillnamelist["normalHPS"] = {
    u"火の守護": "fire",
    u"水の守護": "water",
    u"土の守護": "earth",
    u"風の守護": "wind",
    u"光の守護": "light",
    u"闇の守護": "dark"
}

skillnamelist["normalCriticalS"] = {
    u"火の技巧": "fire",
    u"水の技巧": "water",
    u"土の技巧": "earth",
    u"風の技巧": "wind",
    u"光の技巧": "light",
    u"闇の技巧": "dark"
}

skillnamelist["normalHaisuiS"] = {
    u"火の背水": "fire",
    u"水の背水": "water",
    u"土の背水": "earth",
    u"風の背水": "wind",
    u"光の背水": "light",
    u"闇の背水": "dark"
}

skillnamelist["normalKamui"] = {
    u"火の神威": "fire",
    u"水の神威": "water",
    u"土の神威": "earth",
    u"風の神威": "wind",
    u"光の神威": "light",
    u"闇の神威": "dark"
}

skillnamelist["normalNiteS"] = {
    u"火の二手": "fire",
    u"水の二手": "water",
    u"土の二手": "earth",
    u"風の二手": "wind",
    u"光の二手": "light",
    u"闇の二手": "dark"
}

skillnamelist["normalSanteS"] = {
    u"火の三手": "fire",
    u"水の三手": "water",
    u"土の三手": "earth",
    u"風の三手": "wind",
    u"光の三手": "light",
    u"闇の三手": "dark"
}

skillnamelist["normalSetsunaS"] = {
    u"火の刹那": "fire",
    u"水の刹那": "water",
    u"土の刹那": "earth",
    u"風の刹那": "wind",
    u"光の刹那": "light",
    u"闇の刹那": "dark"
}

skillnamelist["normalRanbuS"] = {
    u"火の乱舞": "fire",
    u"水の乱舞": "water",
    u"土の乱舞": "earth",
    u"風の乱舞": "wind",
    u"光の乱舞": "light",
    u"闇の乱舞": "dark"
}

skillnamelist["normalHiouS"] = {
    u"火の秘奥": "fire",
    u"水の秘奥": "water",
    u"土の秘奥": "earth",
    u"風の秘奥": "wind",
    u"光の秘奥": "light",
    u"闇の秘奥": "dark"
}

skillnamelist["normalHiouM"] = {
    u"業火の秘奥": "fire",
    u"渦潮の秘奥": "water",
    u"大地の秘奥": "earth",
    u"竜巻の秘奥": "wind",
    u"雷電の秘奥": "light",
    u"憎悪の秘奥": "dark"
}

skillnamelist["normalHiouL"] = {
    u"紅蓮の秘奥": "fire",
    u"霧氷の秘奥": "water",
    u"地裂の秘奥": "earth",
    u"乱気の秘奥": "wind",
    u"天光の秘奥": "light",
    u"奈落の秘奥": "dark"
}

skillnamelist["normalHissatsuM"] = {
    u"業火の必殺": "fire",
    u"渦潮の必殺": "water",
    u"地裂の必殺": "earth",
    u"竜巻の必殺": "wind",
    u"雷電の必殺": "light",
    u"憎悪の必殺": "dark"
}

skillnamelist["normalHissatsuL"] = {
    u"紅蓮の必殺": "fire",
    u"霧氷の必殺": "water",
    u"地裂の必殺": "earth",
    u"乱気の必殺": "wind",
    u"天光の必殺": "light",
    u"奈落の必殺": "dark"
}

# magna II
skillnamelist["magnaL"] = {
    u"機炎方陣・攻刃II": "fire",
    u"海神方陣・攻刃II": "water",
    u"創樹方陣・攻刃II": "earth",
    u"嵐竜方陣・攻刃II": "wind",
    u"騎解方陣・攻刃II": "light",
    u"黒霧方陣・攻刃II": "dark"
}

skillnamelist["magnaHPL"] = {
    u"機炎方陣・守護II": "fire",
    u"海神方陣・守護II": "water",
    u"創樹方陣・守護II": "earth",
    u"嵐竜方陣・守護II": "wind",
    u"騎解方陣・守護II": "light",
    u"黒霧方陣・守護II": "dark"
}

skillnamelist["magnaHaisuiL"] = {
    u"機炎方陣・背水II": "fire",
    u"海神方陣・背水II": "water",
    u"創樹方陣・背水II": "earth",
    u"嵐竜方陣・背水II": "wind",
    u"騎解方陣・背水II": "light",
    u"黒霧方陣・背水II": "dark"
}

skillnamelist["magnaCriticalL"] = {
    u"機炎方陣・技巧II": "fire",
    u"海神方陣・技巧II": "water",
    u"創樹方陣・技巧II": "earth",
    u"嵐竜方陣・技巧II": "wind",
    u"騎解方陣・技巧II": "light",
    u"黒霧方陣・技巧II": "dark"
}

# magna I
skillnamelist["magnaM"] = {
    u"機炎方陣・攻刃": "fire",
    u"海神方陣・攻刃": "water",
    u"創樹方陣・攻刃": "earth",
    u"嵐竜方陣・攻刃": "wind",
    u"騎解方陣・攻刃": "light",
    u"黒霧方陣・攻刃": "dark"
}

skillnamelist["magnaHPM"] = {
    u"機炎方陣・守護": "fire",
    u"海神方陣・守護": "water",
    u"創樹方陣・守護": "earth",
    u"嵐竜方陣・守護": "wind",
    u"騎解方陣・守護": "light",
    u"黒霧方陣・守護": "dark"
}

skillnamelist["magnaKatsumiM"] = {
    u"機炎方陣・克己": "fire",
    u"海神方陣・克己": "water",
    u"創樹方陣・克己": "earth",
    u"嵐竜方陣・克己": "wind",
    u"騎解方陣・克己": "light",
    u"黒霧方陣・克己": "dark"
}

skillnamelist["magnaKamuiM"] = {
    u"機炎方陣・神威II": "fire",
    u"海神方陣・神威II": "water",
    u"創樹方陣・神威II": "earth",
    u"嵐竜方陣・神威II": "wind",
    u"騎解方陣・神威II": "light",
    u"黒霧方陣・神威II": "dark"
}

skillnamelist["magnaKamui"] = {
    u"機炎方陣・神威": "fire",
    u"海神方陣・神威": "water",
    u"創樹方陣・神威": "earth",
    u"嵐竜方陣・神威": "wind",
    u"騎解方陣・神威": "light",
    u"黒霧方陣・神威": "dark"
}

skillnamelist["magnaHaisuiS"] = {
    u"機炎方陣・背水": "fire",
    u"海神方陣・背水": "water",
    u"創樹方陣・背水": "earth",
    u"嵐竜方陣・背水": "wind",
    u"騎解方陣・背水": "light",
    u"黒霧方陣・背水": "dark"
}

skillnamelist["magnaKonshinM"] = {
    u"機炎方陣・渾身": "fire",
    u"海神方陣・渾身": "water",
    u"創樹方陣・渾身": "earth",
    u"嵐竜方陣・渾身": "wind",
    u"騎解方陣・渾身": "light",
    u"黒霧方陣・渾身": "dark"
}

skillnamelist["magnaSetsuna"] = {
    u"機炎方陣・刹那II": "fire",
    u"海神方陣・刹那II": "water",
    u"創樹方陣・刹那II": "earth",
    u"嵐竜方陣・刹那II": "wind",
    u"騎解方陣・刹那II": "light",
    u"黒霧方陣・刹那II": "dark"
}

skillnamelist["magnaSetsunaS"] = {
    u"機炎方陣・刹那": "fire",
    u"海神方陣・刹那": "water",
    u"創樹方陣・刹那": "earth",
    u"嵐竜方陣・刹那": "wind",
    u"騎解方陣・刹那": "light",
    u"黒霧方陣・刹那": "dark"
}

# skillnamelist["magnaNiteM"] = {u"機炎方陣・二手": "fire", u"海神方陣・二手": "water", u"創樹方陣・二手": "earth", u"嵐竜方陣・二手": "wind", u"騎解方陣・二手": "light", u"黒霧方陣・二手": "dark"}
skillnamelist["magnaBoukun"] = {
    u"機炎方陣・暴君": "fire",
    u"海神方陣・暴君": "water",
    u"創樹方陣・暴君": "earth",
    u"嵐竜方陣・暴君": "wind",
    u"騎解方陣・暴君": "light",
    u"黒霧方陣・暴君": "dark"
}

skillnamelist["magnaHakaiS"] = {
    u"機炎方陣・破壊": "fire",
    u"海神方陣・破壊": "water",
    u"創樹方陣・破壊": "earth",
    u"嵐竜方陣・破壊": "wind",
    u"騎解方陣・破壊": "light",
    u"黒霧方陣・破壊": "dark"
}

skillnamelist["magnaSanteL"] = {
    u"機炎方陣・三手": "fire",
    u"海神方陣・三手": "water",
    u"創樹方陣・三手": "earth",
    u"嵐竜方陣・三手": "wind",
    u"騎解方陣・三手": "light",
    u"黒霧方陣・三手": "dark"
}

skillnamelist["magnaKatsumokuS"] = {
    u"機炎方陣・括目": "fire",
    u"海神方陣・括目": "water",
    u"創樹方陣・括目": "earth",
    u"嵐竜方陣・括目": "wind",
    u"騎解方陣・括目": "light",
    u"黒霧方陣・括目": "dark"
}

skillnamelist["magnaRasetsuM"] = {
    u"機炎方陣・羅刹": "fire",
    u"海神方陣・羅刹": "water",
    u"創樹方陣・羅刹": "earth",
    u"嵐竜方陣・羅刹": "wind",
    u"騎解方陣・羅刹": "light",
    u"黒霧方陣・羅刹": "dark"
}

skillnamelist["magnaRanbuM"] = {
    u"機炎方陣・乱舞": "fire",
    u"海神方陣・乱舞": "water",
    u"創樹方陣・乱舞": "earth",
    u"嵐竜方陣・乱舞": "wind",
    u"騎解方陣・乱舞": "light",
    u"黒霧方陣・乱舞": "dark"
}

skillnamelist["magnaMusouM"] = {
    u"機炎方陣・無双": "fire",
    u"海神方陣・無双": "water",
    u"創樹方陣・無双": "earth",
    u"嵐竜方陣・無双": "wind",
    u"騎解方陣・無双": "light",
    u"黒霧方陣・無双": "dark"
}

# 軍神は二手(小) + 守護(小)扱い?
skillnamelist["magnaGunshinS"] = {
    u"機炎方陣・軍神": "fire",
    u"海神方陣・軍神": "water",
    u"創樹方陣・軍神": "earth",
    u"嵐竜方陣・軍神": "wind",
    u"騎解方陣・軍神": "light",
    u"黒霧方陣・軍神": "dark"
}

# 意志は技巧(中)扱い
skillnamelist["magnaCriticalM"] = {
    u"機炎方陣・意志": "fire",
    u"海神方陣・意志": "water",
    u"創樹方陣・意志": "earth",
    u"嵐竜方陣・意志": "wind",
    u"騎解方陣・意志": "light",
    u"黒霧方陣・意志": "dark"
}

# 不可侵は守護(小)扱い
skillnamelist["magnaHPS"] = {
    u"機炎方陣・不可侵": "fire",
    u"海神方陣・不可侵": "water",
    u"創樹方陣・不可侵": "earth",
    u"嵐竜方陣・不可侵": "wind",
    u"騎解方陣・不可侵": "light",
    u"黒霧方陣・不可侵": "dark"
}

skillnamelist["magnaHissatsuM"] = {
    u"機炎方陣・必殺": "fire",
    u"海神方陣・必殺": "water",
    u"創樹方陣・必殺": "earth",
    u"嵐竜方陣・必殺": "wind",
    u"騎解方陣・必殺": "light",
    u"黒霧方陣・必殺": "dark"
}

skillnamelist["magnaJojutsuL"] = {
    u"海神方陣・杖術": "water"
}

skillnamelist["magnaKenbuL"] = {
    u"機炎方陣・拳武": "fire"
}

# アンノウン
skillnamelist["unknownL"] = {u"アンノウン・ATK II": "unknown"}
skillnamelist["unknownM"] = {u"アンノウン・ATK": "unknown"}
skillnamelist["unknownHPL"] = {u"アンノウン・VIT II": "unknown"}
skillnamelist["unknownHPM"] = {u"アンノウン・VIT": "unknown"}
skillnamelist["strengthS"] = {u"スピードスペル": "light"}
skillnamelist["strengthM"] = {
    u"大自然の摂理": "light",
    u"花戦の攻刃": "wind",
    u"国広第一の傑作": "earth",
    u"足利宝剣": "dark",
    u"龍馬の愛刀": "wind",
    u"土方の愛刀": "fire",
    u"クールな攻刃": "water",
    u"錬金の攻刃": "light"
}
skillnamelist["strengthL"] = {
    u"ストレングス": "unknown",
    u"セービングアタック": "water",
    u"Vスキル": "earth",
    u"その魂よ、安らかに": "light",
    u"烈光の至恩": "dark",
    u"自動辻斬装置": "water",
    u"半獣の咆哮": "fire",
    u"西風のラプソディ": "wind",
    u"我流の太刀筋": "wind",
    u"カースドテンタクル": "dark",
    u"ポイント・オブ・エイム": "earth",
    u"天の福音": "light",
    u"森林の祝福": "wind",
    u"お友達になってくれる？": "dark",
    u"貴方へ贈る言葉": "wind",
    u"蒼薔薇の棘": "water",
    u"翠薔薇の棘": "wind",
    u"橙薔薇の棘": "earth",
    u"紅薔薇の棘": "fire",
    u"震天の雷鳴": "light",
    u"靂天の暗雲": "dark",
    u"大いなる業": "light",
    u"ロイヤルアフェクション": "earth",
    u"超カッコいい攻刃": "water",
    u"叉棘": "fire",
    u"天下五剣": "light",
    u"利無動": "water",
    u"マナリアの聖なる息吹": "wind",
    u"紫水の光輝": "dark",
    u"闇の力を秘めし鍵": "dark",
    u"狐火の閃揺": "fire",
    u"肉削ぐ撓刃": "wind",
    u"竜伐の心得": "earth",
    u"アーキテクト・ATK II": "dark",
    u"天の理": "light",
    u"超壊獣デスパワーZ": "dark",
    u"ウィーバースタンス": "wind",
    u"阿笠博士の発明品": "light",
    u"サウザンド・ドリーム": "fire",
    u"極上バナナ": "water",
    u"ザ・ファントム": "dark",
    u"フォルテ・スオーノ": "earth",
    u"頂点捕食者": "light",
    u"スクールフレンズ": "fire",
    u"サンシャイナー": "water",
    u"摩武駄致": "wind",
    u"螺旋の攻刃": "earth",
    u"プリズムストーンの力": "light",
    u"テイスティーズグッド": "fire",
    u"ブレイズオブアームズ": "fire",
    u"紅ニ染マル刃": "dark",
    u"フローズン・ブレード": "water",
    u"ジャスティス・ロッド": "light",
    u"トラフィックエナジー": "light",
}

skillnamelist["exATKandHPM"] = {
    u"蒼薔薇の髄": "water",
    u"翠薔薇の髄": "wind",
    u"橙薔薇の髄": "earth",
    u"紅薔薇の髄": "fire",
}

skillnamelist["strengthLL"] = {
    u"灼滅の覇道": "fire",
    u"裁考の覇道": "earth",
    u"人馬の覇道": "wind",
    u"氷逆の覇道": "water",
    u"幻魔の覇道": "dark",
    u"妃光の覇道": "light"
}

skillnamelist["normalSoka"] = {
    u"竜巻の楚歌": "wind",
}

skillnamelist["magnaSoka"] = {
    u"嵐竜方陣・楚歌": "wind",
}

skillnamelist["sensei"] = {
    u"先制の炎刃": "fire",
    u"先制の氷刃": "water",
    u"先制の闇刃": "dark",
}

skillnamelist["strengthHaisuiM"] = {u"マジックチャージ": "light"}
skillnamelist["unknownOtherBoukunL"] = {u"ミフネ流剣法・極意": "fire", u"インテリジェンス": "dark"}
skillnamelist["unknownOtherNiteS"] = {u"ミフネ流剣法・双星": "fire", u"デクステリティ": "dark"}

# バハ
# フツルス拳系はスキル名が同じなので先に処理
skillnamelist["bahaFUHP-fist"] = {u"ヒュムアニムス・メンスII": "dark"}
skillnamelist["bahaFUHP-katana"] = {u"ドーラアニムス・メンスII": "dark"}
skillnamelist["bahaFUHP-bow"] = {u"エルンアニムス・メンスII": "dark"}
skillnamelist["bahaFUHP-music"] = {u"ハヴンアニムス・メンスII": "dark"}
skillnamelist["bahaAT-dagger"] = {u"ヒュムアニムス・ウィス": "dark"}
skillnamelist["bahaAT-axe"] = {u"ドーラアニムス・ウィス": "dark"}
skillnamelist["bahaAT-spear"] = {u"エルンアニムス・ウィス": "dark"}
skillnamelist["bahaAT-gun"] = {u"ハヴンアニムス・ウィス": "dark"}
skillnamelist["bahaATHP-sword"] = {u"コンキリオ・ルーベル": "dark"}
skillnamelist["bahaATHP-wand"] = {u"コンキリオ・ケルレウス": "dark"}
skillnamelist["bahaHP-fist"] = {u"ヒュムアニムス・メンス": "dark"}
skillnamelist["bahaHP-katana"] = {u"ドーラアニムス・メンス": "dark"}
skillnamelist["bahaHP-bow"] = {u"エルンアニムス・メンス": "dark"}
skillnamelist["bahaHP-music"] = {u"ハヴンアニムス・メンス": "dark"}
skillnamelist["bahaFUATHP-sword"] = {u"コンキリオ・イグニス": "dark"}
skillnamelist["bahaFUATHP-dagger"] = {u"コンキリオ・ウェントス": "dark"}
skillnamelist["bahaFUATHP-spear"] = {u"コンキリオ・コルヌ": "dark"}
skillnamelist["bahaFUATHP-axe"] = {u"コンキリオ・テラ": "dark"}
skillnamelist["bahaFUATHP-wand"] = {u"コンキリオ・インベル": "dark"}
skillnamelist["bahaFUATHP-gun"] = {u"コンキリオ・アルボス": "dark"}

# オメガウェポン
# 属性は仮として火としておく
skillnamelist["omega-raw"] = {
    u"グラディウス・ルーベル": "fire",
    u"シーカー・ルーベル": "fire",
    u"ランセア・ルーベル": "fire",
    u"ラブリュス・ルーベル": "fire",
    u"バクラム・ルーベル": "fire",
    u"アルマ・ルーベル": "fire",
    u"ルクトール・ルーベル": "fire",
    u"アルクス・ルーベル": "fire",
    u"ムーシカ・ルーベル": "fire",
    u"マカエラ・ルーベル": "fire",
}

skillnamelist["akasha-sword"] = {u"虚脱の隻翼": "dark"}
skillnamelist["akasha-spear"] = {u"虚栄の矛戟": "fire"}
skillnamelist["akasha-axe"] = {u"虚勢の巌": "earth"}
skillnamelist["akasha-wand"] = {u"虚飾の隻腕": "earth"}
skillnamelist["akasha-bow"] = {u"虚像の鋒鏑": "light"}

# コスモス
skillnamelist["cosmosAT"] = {u"アタック・スタンス": "light"}
skillnamelist["cosmosBL"] = {u"バランス・スタンス": "light"}
skillnamelist["cosmosDF"] = {u"ディフェンド・スタンス": "light"}
skillnamelist["cosmosPC"] = {u"ペキューリア・スタンス": "light"}
skillnamelist["cosmos-sword"] = {u"ソード・オブ・コスモス": "light"}
skillnamelist["cosmos-dagger"] = {u"ダガー・オブ・コスモス": "light"}
skillnamelist["cosmos-spear"] = {u"ランス・オブ・コスモス": "light"}
skillnamelist["cosmos-axe"] = {u"サイス・オブ・コスモス": "light"}
skillnamelist["cosmos-wand"] = {u"ロッド・オブ・コスモス": "light"}
skillnamelist["cosmos-gun"] = {u"ガン・オブ・コスモス": "light"}
skillnamelist["cosmos-fist"] = {u"ガントレット・オブ・コスモス": "light"}
skillnamelist["cosmos-bow"] = {u"アロー・オブ・コスモス": "light"}
skillnamelist["cosmos-katana"] = {u"ブレイド": "light"}
skillnamelist["cosmos-music"] = {u"ハープ・オブ・コスモス": "light"}

# 天司の祝福系
skillnamelist["tenshiShukufukuII"] = {
    u"ミカエルの祝福II": "fire",
    u"ガブリエルの祝福II": "water",
    u"ウリエルの祝福II": "earth",
    u"ラファエルの祝福II": "wind"
}

skillnamelist["tenshiShukufuku"] = {
    u"ミカエルの祝福": "fire",
    u"ガブリエルの祝福": "water",
    u"ウリエルの祝福": "earth",
    u"ラファエルの祝福": "wind"
}

# ダメージ上限アップ系
skillnamelist["normalDamageLimit7"] = {
    u"賢者の加護": "earth",
}
skillnamelist["normalDamageLimit10"] = {
    u"靂天の極致": "dark",
}

skillnamelist["ougiDamageLimitExceedM"] = {
    u"イクシード・ウォータ": "water",
    u"イクシード・アース": "earth",
    u"イクシード・ウィンド": "wind",
    u"イクシード・ダーク": "dark",
}

# キャラ固有武器
skillnamelist["tsuranukiKiba"] = {u"貫きの牙": "fire"}
skillnamelist["washiouKekkai"] = {u"鷲王の結界": "fire"}
skillnamelist["maihimeEnbu"] = {u"舞姫の演武": "water"}
skillnamelist["hengenKengi"] = {u"変幻自在の剣技": "dark"}
skillnamelist["kochoKenbu"] = {u"胡蝶の剣舞": "earth"}
skillnamelist["normalHPL"][u"氷晶宮の加護"] = "water"
skillnamelist["normalL"][u"聖女の行進"] = "light"
skillnamelist["normalL"][u"天を統べる強風"] = "wind"
skillnamelist["normalL"][u"血啜りの一閃"] = "dark"
skillnamelist["normalL"][u"未完の錬金術"] = "fire"
skillnamelist["normalL"][u"英雄たる証明"] = "wind"
skillnamelist["normalL"][u"禁忌の悲恋"] = "dark"
skillnamelist["normalL"][u"狙撃の極意"] = "water"

# その他調整が必要な武器
skillnamelist["extendedDjeetaNormalDATA30"] = {u"立体機動戦術": "wind"}

armtypelist = OrderedDict()
armtypelist[u"剣"] = "sword"
armtypelist[u"銃"] = "gun"
armtypelist[u"短剣"] = "dagger"
armtypelist[u"槍"] = "spear"
armtypelist[u"斧"] = "axe"
armtypelist[u"杖"] = "wand"
armtypelist[u"格闘"] = "fist"
armtypelist[u"弓"] = "bow"
armtypelist[u"楽器"] = "music"
armtypelist[u"刀"] = "katana"

########################################################################################################################
filename = inspect.getframeinfo(inspect.currentframe()).filename
path = os.path.dirname(os.path.abspath(filename))

# json translation
translation = json.load(open(os.path.join(path, "../txt_source/arm-translation.json"), "r", encoding="utf-8"))


def skill_replace(skill):
    for inner_skillname, onelist in skillnamelist.items():
        for skillname, element in onelist.items():
            if re.match(skillname, skill):
                return inner_skillname, element
    return "non", "none"


def type_replace(armtype):
    for armtypename, inner_armtype in armtypelist.items():
        if re.match(armtypename, armtype):
            return inner_armtype
    return "none"


def processCSVdata(csv_file_name, json_data, image_wiki_url_list, image_game_url_list, PROCESS_TYPE_SSR=True):
    key_pattern = re.compile("\d+")
    key_pattern = re.compile("(\d+.*\.png)")
    skill_pattern = re.compile("\[\[([\W\w]+)\>")
    jougen_4_pattern = re.compile(u"○")
    jougen_5_pattern = re.compile(u"◎")
    baha_pattern = re.compile(u"bahaFU")

    mycsv = csv.reader(open(csv_file_name, 'r', encoding="utf-8"), delimiter="|")

    for row in mycsv:
        newdict = {}

        if len(row) <= 1:
            continue
        else:
            m = key_pattern.search(row[1])
            if m:
                key = m.group(1)

            name = row[2].replace("&br;", "")
            name = name.replace("[]", "")
            newdict["ja"] = name

            # element
            if row[3].find("火") > 0:
                newdict["element"] = "fire"
            elif row[3].find("水") > 0:
                newdict["element"] = "water"
            elif row[3].find("土") > 0:
                newdict["element"] = "earth"
            elif row[3].find("風") > 0:
                newdict["element"] = "wind"
            elif row[3].find("光") > 0:
                newdict["element"] = "light"
            elif row[3].find("全属性") > 0:
                newdict["element"] = "all"
            else:
                newdict["element"] = "dark"

            # type
            newdict["type"] = type_replace(row[4])

            skill = "non"
            element1 = "none"
            m = skill_pattern.search(row[7])
            if m:
                skill, element1 = skill_replace(m.group(1))

            newdict["skill1"] = skill

            skill = "non"
            element2 = "none"
            m = skill_pattern.search(row[8])
            if m:
                skill, element2 = skill_replace(m.group(1))

            if element2 == "none" or element2 == "unknown":
                element2 = newdict["element"]

            newdict["skill2"] = skill
            newdict["element2"] = element2
            newdict["minhp"] = row[9]
            newdict["minattack"] = row[10]
            newdict["hp"] = row[11]
            newdict["attack"] = row[12]

            if PROCESS_TYPE_SSR:
                if jougen_5_pattern.search(row[15]):
                    newdict["slvmax"] = 20
                    newdict["maxlv"] = 200
                    newdict["hplv100"] = int(row[16])
                    newdict["attacklv100"] = int(row[17])
                    newdict["hplv150"] = int(row[18])
                    newdict["attacklv150"] = int(row[19])
                else:
                    if jougen_4_pattern.search(row[15]):
                        newdict["slvmax"] = 15
                        newdict["maxlv"] = 150
                        newdict["hplv100"] = row[16]
                        newdict["attacklv100"] = row[17]
                    else:
                        if baha_pattern.search(newdict["skill1"]):
                            newdict["slvmax"] = 15
                            newdict["maxlv"] = 150
                            newdict["hplv100"] = row[16]
                            newdict["attacklv100"] = row[17]
                        else:
                            newdict["slvmax"] = 10
                            newdict["maxlv"] = 100

            else:
                if jougen_4_pattern.search(row[15]):
                    newdict["slvmax"] = 15
                    newdict["maxlv"] = 120
                    newdict["hplv75"] = row[16]
                    newdict["attacklv75"] = row[17]
                else:
                    newdict["slvmax"] = 10
                    newdict["maxlv"] = 75

            newdict["imageURL"] = "./imgs/" + key

            if name in translation:
                newdict["en"] = translation[name]
            else:
                print(name)
                newdict["en"] = name

            json_data[name] = newdict
            # Wiki
            image_wiki_url_list.append("http://gbf-wiki.com/index.php?plugin=attach&refer=img&openfile=" + key + "\n")
            # Game - Might get you banned...
            image_game_url_list.append("http://gbf.game-a.mbga.jp/assets/img/sp/assets/weapon/b/" + key + "\n")
            image_wiki_url_list = list(OrderedDict.fromkeys(image_wiki_url_list))
            image_game_url_list = list(OrderedDict.fromkeys(image_game_url_list))

    return json_data, image_wiki_url_list, image_game_url_list


if __name__ == '__main__':
    json_data = OrderedDict()
    image_wiki_url_list = []
    image_game_url_list = []

    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(
        os.path.join(path, "../txt_source/armData-ssr.txt"), json_data, image_wiki_url_list, image_game_url_list, True)
    json_data, image_wiki_url_list, image_game_url_list = processCSVdata(
        os.path.join(path, "../txt_source/armData-sr.txt"), json_data, image_wiki_url_list, image_game_url_list, False)

    f = open(os.path.join(path, "../armData.json"), "w", encoding="utf-8")
    json.dump(json_data, f, ensure_ascii=False, indent=4)
    f.close()

    f = open(os.path.join(path, "../txt_source/armImageWikiURLList.txt"), "w", encoding="utf-8")
    for x in image_wiki_url_list:
        f.write(x)
    f.close()
    f = open(os.path.join(path, "../txt_source/armImageGameURLList.txt"), "w", encoding="utf-8")
    for x in image_game_url_list:
        f.write(x)
    f.close()
