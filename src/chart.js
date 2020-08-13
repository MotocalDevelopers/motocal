var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts');
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var {CSVLink, CSVDownload} = require('react-csv');
var {CopyToClipboard} = require('react-copy-to-clipboard');
var CreateClass = require('create-react-class');
var GlobalConst = require('./global_const.js');
var intl = require('./translate.js');
var selector = GlobalConst.selector;
var supportedChartSortkeys = GlobalConst.supportedChartSortkeys;
var supportedSimulationChartSortkeys = GlobalConst.supportedSimulationChartSortkeys;
var keyTypes = GlobalConst.keyTypes;
var raceTypes = GlobalConst.raceTypes;
var opusWeaponSkill1 = GlobalConst.opusWeaponSkill1;
var opusNormalWeaponSkill2 = GlobalConst.opusNormalWeaponSkill2;
var opusMagnaWeaponSkill2 = GlobalConst.opusMagnaWeaponSkill2;
var _ua = GlobalConst._ua;
var {generateHaisuiData, getTotalBuff, getInitialTotals, calcOneCombination} = require('./global_logic.js');
var colors = ['#000000','#000080','#00008B','#0000CD',
    '#0000FF','#006400','#008000','#008080',
    '#008B8B','#00BFFF','#00CED1','#00FA9A',
    '#00FF00','#00FF7F','#00FFFF','#00FFFF',
    '#191970','#1E90FF','#20B2AA','#228B22',
    '#2E8B57','#2F4F4F','#2F4F4F','#32CD32',
    '#3CB371','#40E0D0','#4169E1','#4682B4',
    '#483D8B','#48D1CC','#4B0082','#556B2F',
    '#5F9EA0','#6495ED','#663399','#66CDAA',
    '#696969','#696969','#6A5ACD','#6B8E23',
    '#708090','#708090','#778899','#778899',
    '#7B68EE','#7CFC00','#7FFF00','#7FFFD4',
    '#800000','#800080','#808000','#808080',
    '#808080','#87CEEB','#87CEFA','#8A2BE2',
    '#8B0000','#8B008B','#8B4513','#8FBC8F',
    '#90EE90','#9370DB','#9400D3','#98FB98',
    '#9932CC','#9ACD32','#A0522D','#A52A2A',
    '#A9A9A9','#A9A9A9','#ADD8E6','#ADFF2F',
    '#AFEEEE','#B0C4DE','#B0E0E6','#B22222',
    '#B8860B','#BA55D3','#BC8F8F','#BDB76B',
    '#C0C0C0','#C71585','#CD5C5C','#CD853F',
    '#D2691E','#D2B48C','#D3D3D3','#D3D3D3',
    '#D8BFD8','#DA70D6','#DAA520','#DB7093',
    '#DC143C','#DCDCDC','#DDA0DD','#DEB887',
    '#E9967A','#EE82EE','#EEE8AA','#F08080',
    '#F0E68C','#F4A460','#F5DEB3','#FA8072',
    '#FF0000','#FF00FF','#FF00FF','#FF1493',
    '#FF4500','#FF6347','#FF69B4','#FF7F50',
    '#FF8C00','#FFA07A','#FFA500','#FFB6C1',
    '#FFC0CB','#FFD700','#FFDAB9','#FFDEAD',
    '#FFE4B5','#FFE4C4','#FFE4E1','#FFEBCD',
    '#FFEFD5','#FFFACD','#FFFF00'];

var HPChart = CreateClass({
    makeChartData: function (props) {
        var storedCombinations = props.storedList.combinations;
        var storedArmlist = props.storedList.armlist;
        var storedNames = props.storedList.names;

        var prof = props.prof;
        var armlist = props.armlist;
        var summon = props.summon;
        var chara = props.chara;

        var res = [];
        for (var i = 0; i < summon.length; i++) {
            res[i] = []
        }

        for (var i = 0; i < storedCombinations.length; i++) {
            var totalBuff = getTotalBuff(prof);
            var totals = getInitialTotals(prof, chara, summon);
            var oneres = calcOneCombination(storedCombinations[i], summon, prof, chara, armlist, totals, totalBuff);
            for (var j = 0; j < summon.length; j++) {
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
        }
        // State in which recalculated data is stored in res
        // res[summonind][rank]
        return generateHaisuiData(res, armlist, summon, prof, chara, storedCombinations, storedNames, props.displayRealHP, props.locale);
    },
    componentWillReceiveProps: function (nextProps) {
        // It is called when changing the name of StoredList while opening the chart
        this.setState({chartData: this.makeChartData(nextProps)})
    },
    getInitialState: function () {
        var sortKey = this.props.sortKey;
      
        if (!(sortKey in supportedChartSortkeys)) sortKey = "averageCyclePerTurn";

        return {
            sortKey: sortKey,
            chartData: this.makeChartData(this.props),
        }
    },
    makeChartOption: function (sortKey) {
        var locale = this.props.locale;
        var hlabel = (this.props.displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale));

        var options = {};
        for (var key in this.state.chartData) {
            if (key != "minMaxArr") {
                options[key] = {
                    title: key,
                    curveType: 'function',
                    forcelFrame: true,
                    hAxis: {title: hlabel, titleTextStyle: {italic: false}, textStyle: {italic: false}},
                    vAxis: {
                        title: intl.translate(supportedChartSortkeys[sortKey], locale),
                        textStyle: {italic: false},
                        minValue: this.state.chartData["minMaxArr"][sortKey]["min"],
                        maxValue: this.state.chartData["minMaxArr"][sortKey]["max"]
                    },
                    tooltip: {showColorCode: true, textStyle: {fontSize: 13}, trigger: "selection"},
                    legend: {position: "top", maxLines: 5, textStyle: {fontSize: 13}},
                    crosshair: {orientation: "both", opacity: 0.8, trigger: "both"},
                    chartArea: {left: "10%", top: "10%", width: "85%", height: "80%",},
                    lineWidth: 2,
                    pointSize: 0,
                    selectionMode: 'multiple',
                    aggregationTarget: "category",
                }
            }
        }

        return options
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    /* Formatted for CSV */
    makeCsvData: function (locale) {
        var d = this.state.chartData[intl.translate("まとめて比較", locale)];
        if (d == null) {
            // When there is no "compare all together", when the set of summons is one type
            for (var p in this.state.chartData) {
                if (p != "minMaxArr") {
                    d = this.state.chartData[p];
                    break;
                }
            }
        }

        // where d can not be null but conservatively returns
        if (d != null) {
            var data = d[this.state.sortKey];
            var csvData = [];
            var header = [];
            header.push(data[0][0]);
            for (var i = 1; i < data[0].length; i++) {
                // Remove unnecessary line feed letters which break CSV format.
                header.push(data[0][i].replace(/\r?\n/g, ""));
            }
            csvData.push(header);
            for (var i = 1; i < data.length; i++) {
                csvData.push(data[i]);
            }
            return csvData;
        }
    },
    /* Formatted for NVD3 */
    makeNvd3Data: function (locale) {
        var d = this.state.chartData[intl.translate("まとめて比較", locale)];
        if (d == null) {
            // When there is no "compare all together", when the set of summons is one type
            for (var p in this.state.chartData) {
                if (p != "minMaxArr") {
                    d = this.state.chartData[p];
                    break;
                }
            }
        }

        var basesheet = "{|class=\"wikitable mw-collapsible mw-collapsed\"\n" +
            "|-\n" +
            "!colspan=\"2\"| Base Info\n";
        var b = this.props.prof;
        if (b != null) {
            basesheet +=
                "|-\n" +
                "! Rank\n" +
                "|" + b.rank + "\n";
            basesheet +=
                "|-\n" +
                "! Job\n" +
                "|" + intl.translate(GlobalConst.Jobs[b.job].name, locale) + "\n";
            basesheet +=
                "|-\n" +
                "! Proficiency\n" +
                "|" + intl.translate(GlobalConst.armTypes[GlobalConst.Jobs[b.job].favArm1], locale) + " / " +intl.translate(GlobalConst.armTypes[GlobalConst.Jobs[b.job].favArm2], locale) + "\n";
            basesheet +=
                "|-\n" +
                "! Type\n" +
                "|" + intl.translate(GlobalConst.jobTypes[GlobalConst.Jobs[b.job].type], locale) + "\n";
            basesheet +=
                "|-\n" +
                "! Element\n" +
                "|" + this.getElementName(b.element, locale) +
                "\n";
            basesheet +=
                "|-\n" +
                "! Enemy Defense\n" +
                "|" + (parseFloat(b.enemyDefense) * (1.0 - (parseFloat(b.defenseDebuff)/100.0))) + " (" + b.enemyDefense + " - " + b.defenseDebuff + "%)\n";
            basesheet +=
                "|-\n" +
                "! Enemy Element\n" +
                "|" + this.getElementName(b.enemyElement, locale) + "\n";
            basesheet +=
                "|}\n";
        }
        basesheet += "\n";

        var p = this.props.chara;
        var charasheet = "{|class=\"wikitable mw-collapsible mw-collapsed\"\n" +
            "|-\n" +
            "!colspan=\""+(p.length+1)+"\"| Character Info\n";
        if (p != null) {
            charasheet += "|-\n";
            charasheet += "! Name\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + "{{Itm|" + p[i].name.replace(/\[5凸]/g, "").replace(/\[5★]/g, "").trim() + "}}";
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Element\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + this.getElementName(p[i].element, locale);
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Proficiency\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + intl.translate(GlobalConst.armTypes[p[i].favArm], locale) + " / " +intl.translate(GlobalConst.armTypes[p[i].favArm2], locale);
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Type\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + intl.translate(GlobalConst.jobTypes[p[i].type], locale);
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Race\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + intl.translate(GlobalConst.raceTypes[p[i].race], locale);
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Attack\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + p[i].attack;
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! HP\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + p[i].hp;
            }
            charasheet += "\n";
            charasheet += "|-\n";
            charasheet += "! Pluses\n";
            for (var i = 0; i < p.length; i++) {
                if (i > 0) {
                    charasheet += "|"
                }
                charasheet += "|" + p[i].plusBonus;
            }
            charasheet += "\n";
            charasheet +=
                "|}\n";
        }
        charasheet += "\n";

        var loadoutSheet = "{|class=\"wikitable mw-collapsible mw-collapsed\"\n" +
            "|-\n" +
            "! Label\n" +
            "! colspan=\"2\" | Summons\n" +
            "! colspan=\"3\" | Weapons\n";
        var s = this.props.summon;
        var sl = this.props.storedList;
        if (s != null && sl != null) {
            for (var i = 0; i < s.length; i++) {
                for (var j = 0; j < sl.names.length; j++) {
                    var rowspan = 0;
                    for (var k = 0; k < sl.armlist[j].length; k++) {
                        if (sl.combinations[j][k] != 0) {
                            rowspan++;
                        }
                    }
                    loadoutSheet += "|-\n";
                    loadoutSheet += "| rowspan=\""+rowspan+"\" style=\"border-width: thick thin thin thin\"| " + sl.names[j].replace(/\r?\n/g, "") + "\n";
                    loadoutSheet += "| rowspan=\""+rowspan+"\" style=\"border-width: thick thin thin thin\"| " + this.getCommonSummonName(s[i].selfElement, s[i].selfSummonType, s[i].selfSummonAmount, locale) + "<br><br>" + this.getCommonSummonName(s[i].friendElement, s[i].friendSummonType, s[i].friendSummonAmount, locale) +"\n";
                    loadoutSheet += "| rowspan=\""+rowspan+"\" style=\"border-width: thick thin thin thin\"| ";
                    if ( s[i].attack != 0) {
                        loadoutSheet += intl.translate("合計攻撃力", locale) + ": " + s[i].attack + "<br>";
                    }
                    if ( s[i].hp != 0) {
                        loadoutSheet += intl.translate("合計HP", locale) + ": " + s[i].hp + "<br>";
                    }
                    if ( s[i].hpBonus != 0) {
                        loadoutSheet += intl.translate("HP加護", locale) + ": " + s[i].hpBonus + "%<br>";
                    }
                    if ( s[i].damageLimit != 0) {
                        loadoutSheet += intl.translate("ダメージ上限加護", locale) + ": " + s[i].damageLimit + "%<br>";
                    }
                    if ( s[i].tenshiDamageUP != 0) {
                        loadoutSheet += intl.translate("与ダメージ加護", locale) + ": " + s[i].tenshiDamageUP + "%<br>";
                    }
                    if ( s[i].ougiDamage != 0) {
                        loadoutSheet += intl.translate("奥義ダメージ加護", locale) + ": " + s[i].ougiDamage + "%<br>";
                    }
                    if ( s[i].TA != 0) {
                        loadoutSheet += intl.translate("TA加護", locale) + ": " + s[i].TA + "%<br>";
                    }
                    if ( s[i].DA != 0) {
                        loadoutSheet += intl.translate("DA加護", locale) + ": " + s[i].DA + "%<br>";
                    }
                    loadoutSheet += "\n";
                    var first = true;
                    for (var k = 0; k < sl.armlist[j].length; k++) {
                        if (sl.combinations[j][k] != 0) {
                            var arm = sl.armlist[j][k];
                            if (first) {
                                loadoutSheet += "| style=\"border-width: thick thin thin thin\"|" + sl.combinations[j][k] + " ";
                                loadoutSheet += "|| style=\"border-width: thick thin thin thin\"|{{Itm|" + arm.name.replace(/\[4凸]/g, "").replace(/\[5凸]/g, "").replace(/\[4★]/g, "").replace(/\[5★]/g, "").trim() + "}}  ";
                                loadoutSheet += "|| style=\"border-width: thick thin thin thin\"|" + (arm.slv > 10 ? (arm.slv > 15 ? "5{{star}}" : "4{{star}}") : "0-3{{star}}");
                                first = false;
                            } else {
                                loadoutSheet += "| " + sl.combinations[j][k] + " ";
                                loadoutSheet += "|| {{Itm|" + arm.name.replace(/\[4凸]/g, "").replace(/\[5凸]/g, "").replace(/\[4★]/g, "").replace(/\[5★]/g, "").trim() + "}}  ";
                                loadoutSheet += "|| " + (arm.slv > 10 ? (arm.slv > 15 ? "5{{star}}" : "4{{star}}") : "0-3{{star}}");
                            }
                            loadoutSheet += (arm.skill2.startsWith("opus") ? ", " + intl.translate(opusWeaponSkill1[arm.skill2].name, locale) + ", " + (arm.skill3.includes("normal") ? intl.translate(opusNormalWeaponSkill2[arm.skill3].name, locale): intl.translate(opusMagnaWeaponSkill2[arm.skill3].name, locale)) : "");
                            loadoutSheet += "\n";
                            loadoutSheet += "|- \n";
                        }
                    }
                }
            }
            loadoutSheet +=
                "|}\n";
        }
        loadoutSheet = loadoutSheet + "\n";

        // where d can not be null but conservatively returns
        if (d != null) {
            var graphData = d[this.state.sortKey];

            var xAxis=graphData[0][0];
            var sortkeyname = keyTypes[this.state.sortKey];
            var yAxis = intl.translate(sortkeyname, locale);
            var width="800px";
            var height="500px";
            var alt="Motocal Graph: " + yAxis + "," + xAxis;

            var data = "";
            for (var j = 1; j < graphData[0].length; j++) {
                // Remove unnecessary line feed letters which break CSV format.
                var label = graphData[0][j].replace(/\r?\n/g, "");
                // Get Random css color
                var color = colors[Math.floor(Math.random() * colors.length)];
                var area = false;
                var chartDataXArray = [];
                var chartDataYArray = [];
                for (var i = 1; i < graphData.length; i++) {
                    if (graphData[i][j] != null) {
                        chartDataXArray.push(graphData[i][0]);
                        chartDataYArray.push(graphData[i][j]);
                    }
                }
                var chartDataX = chartDataXArray.toString();
                var chartDataY = chartDataYArray.toString();
                var chartalt ="Motocal Graph: " + label;
                data += "  {{NVD3Series\n    |label="+label+"\n    |color="+color+"\n    |area="+area+"\n    |chartDataX="+chartDataX+"\n    |chartDataY="+chartDataY+"\n    |alt="+chartalt+"\n  }}\n";
            }
            var nvd3Chart = "{{NVD3Chart\n|xAxis="+xAxis+"\n|yAxis="+yAxis+"\n|yAxisWidth=100\n|yFormat=,.04s\n|width="+width+"\n|height="+height+"\n|alt="+alt+"\n|data=\n"+data+"}}\n";
            return basesheet + charasheet + loadoutSheet + nvd3Chart;
        }
    },
    getCommonSummonName: function (element, type, amount, locale) {
        if (element == "fire") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Colossus Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Colossus Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Colossus Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Michael}}"
                } else if (amount == "120") {
                    return "0{{star}} {{Itm|Shiva (Summon)}}"
                } else if (amount == "140") {
                    return "3{{star}} {{Itm|Shiva (Summon)}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Agni}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Agni}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Agni}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Agni}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Agni}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Agni}}"
                }
            }
            if (type == "chara") {
                if (amount == "100") {
                    return "3{{star}} {{Itm|The Devil (SSR)}}"
                } else if (amount == "110") {
                    return "4{{star}} {{Itm|The Devil (SSR)}}"
                } else if (amount == "130") {
                    return "5{{star}} {{Itm|The Devil (SSR)}}"
                }
            }
        } else if (element == "water") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Leviathan Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Leviathan Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Leviathan Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Gabriel}}"
                } else if (amount == "120") {
                    return "0{{star}} {{Itm|Europa (Summon)}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Bonito}}"
                } else if (amount == "140") {
                    return "3{{star}} {{Itm|Europa (Summon)}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Varuna}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Varuna}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Varuna}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Varuna}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Varuna}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Varuna}}"
                }
            }
            if (type == "chara") {
                if (amount == "100") {
                    return "3{{star}} {{Itm|Justice (SSR)}}"
                } else if (amount == "110") {
                    return "4{{star}} {{Itm|Justice (SSR)}}"
                } else if (amount == "130") {
                    return "5{{star}} {{Itm|Justice (SSR)}}"
                }
            }
        } else if (element == "earth") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Yggdrasil Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Yggdrasil Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Yggdrasil Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Uriel}}"
                } else if (amount == "120") {
                    return "0{{star}} {{Itm|Godsworn Alexiel (Summon)}}"
                } else if (amount == "140") {
                    return "3{{star}} {{Itm|Godsworn Alexiel (Summon)}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Titan}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Titan}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Titan}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Titan}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Titan}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Titan}}"
                }
            }
            if (type == "chara") {
                if (amount == "100") {
                    return "3{{star}} {{Itm|The Hanged Man (SSR)}}"
                } else if (amount == "110") {
                    return "4{{star}} {{Itm|The Hanged Man (SSR)}}"
                } else if (amount == "130") {
                    return "5{{star}} {{Itm|The Hanged Man (SSR)}}"
                }
            }
        } else if (element == "wind") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Tiamat Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Tiamat Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Tiamat Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Raphael}}"
                } else if (amount == "120") {
                    return "0{{star}} {{Itm|Grimnir (Summon)}}"
                } else if (amount == "140") {
                    return "3{{star}} {{Itm|Grimnir (Summon)}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Zephyrus}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Zephyrus}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Zephyrus}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Zephyrus}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Zephyrus}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Zephyrus}}"
                }
            }
            if (type == "chara") {
                if (amount == "100") {
                    return "3{{star}} {{Itm|Judgement (SSR)}}"
                } else if (amount == "110") {
                    return "4{{star}} {{Itm|Judgement (SSR)}}"
                } else if (amount == "130") {
                    return "5{{star}} {{Itm|Judgement (SSR)}}"
                }
            }
        } else if (element == "light") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Luminiera Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Luminiera Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Luminiera Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Lucifer}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Lucifer}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Lucifer}}"
                } else if (amount == "150") {
                    return "5{{star}} {{Itm|Lucifer}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Zeus}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Zeus}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Zeus}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Zeus}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Zeus}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Zeus}}"
                }
            }
        } else if (element == "dark") {
            if (type == "magna") {
                if (amount == "50") {
                    return "0{{star}} {{Itm|Celeste Omega}}"
                } else if (amount == "100") {
                    return "3{{star}} {{Itm|Celeste Omega}}"
                } else if (amount == "120") {
                    return "4{{star}} {{Itm|Celeste Omega}}"
                }
            }
            if (type == "element") {
                if (amount == "100") {
                    return "0{{star}} {{Itm|Bahamut}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Bahamut}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Bahamut}}"
                } else if (amount == "150") {
                    return "5{{star}} {{Itm|Bahamut}}"
                }
            }
            if (type == "zeus") {
                if (amount == "70") {
                    return "0{{star}} {{Itm|Demi Hades}}"
                } else if (amount == "80") {
                    return "0{{star}} {{Itm|Hades}}"
                } else if (amount == "110") {
                    return "3{{star}} {{Itm|Demi Hades}}"
                } else if (amount == "120") {
                    return "3{{star}} {{Itm|Hades}}"
                } else if (amount == "130") {
                    return "4{{star}} {{Itm|Demi Hades}}"
                } else if (amount == "140") {
                    return "4{{star}} {{Itm|Hades}}"
                }
            }
        }
        return intl.translate(GlobalConst.summonElementTypes[element].name, locale) + " " + intl.translate(GlobalConst.summonTypes[type], locale) + " " + amount;
    },
    getElementName: function (element, locale) {
        if (element == "fire") {
            return intl.translate("火", locale);
        } else if (element == "water") {
            return intl.translate("水", locale);
        } else if (element == "earth") {
            return intl.translate("土", locale);
        } else if (element == "wind") {
            return intl.translate("風", locale);
        } else if (element == "light") {
            return intl.translate("光", locale);
        } else if (element == "dark") {
            return intl.translate("闇", locale);
        } else if (element == "non") {
            return intl.translate("無", locale);
        } else if (element == "non-but-critical") {
            return intl.translate("無（技巧あり）", locale);
        }
        return intl.translate("火", locale);
    },
    /* Generate TSV for clipboard from CSV for download */
    makeCsvClipboardText: function (csvdata) {
        return csvdata.map(v => v.join("\t")).join("\n");
    },
    makeNvd3ClipboardText: function (nvd3Data) {
        return nvd3Data;
    },
    render: function () {
        var locale = this.props.locale;
        var sortKey = this.state.sortKey;
        var data = this.state.chartData;
        var options = this.makeChartOption(sortKey);
        var csvData = this.makeCsvData(locale);
        var nvd3Data = this.makeNvd3Data(locale);
        var csvClipBoardData = this.makeCsvClipboardText(csvData);
        var nvd3ClipBoardData = this.makeNvd3ClipboardText(nvd3Data);

        if (_ua.Mobile) {
            return (
                <div className="HPChart">
                    {Object.keys(data).map(function (key, ind) {
                        if (key != "minMaxArr") {
                            return <Chart chartType="ScatterChart" className="LineChart" data={data[key][sortKey]}
                                          key={key} options={options[key]} graph_id={"LineChart" + ind} width={"90%"}
                                          height={"50%"} legend_toggle={true}/>
                        }
                    })}
                </div>
            );
        } else {
            if (window.innerWidth > 1000) {
                var width = (98.0 / (Object.keys(data).length - 1));
                if (Object.keys(data).length - 1 > 2) {
                    width = 49.0
                }
            } else {
                var width = 98.0
            }

            return (
                <div className="HPChart">
                    <div style={{"alignItems": "center", "textAlign": "center"}}>
                        <span>{intl.translate("表示項目", locale)}</span>
                        <FormControl
                            componentClass="select"
                            value={this.state.sortKey}
                            style={{"width": "400px", "margin": "2px 5px"}}
                            onChange={this.handleEvent.bind(this, "sortKey")}>
                            {selector[locale].supported_chartsortkeys}
                        </FormControl>
                        <span>CSV</span>
                        <CSVLink className={"btn btn-default"} data={csvData} filename={"motocal_charts.csv"}><span
                            className={"glyphicon glyphicon-download-alt"} aria-hidden={"true"}></span></CSVLink>
                        <button className={"btn btn-default"}><CopyToClipboard text={csvClipBoardData}><span
                            className={"glyphicon glyphicon-copy"} aria-hidden={"true"}></span></CopyToClipboard>
                        </button>
                        <span>NVD3</span>
                        <CSVLink className={"btn btn-default"} data={nvd3Data} filename={"motocal_charts_nvd3.txt"}><span
                            className={"glyphicon glyphicon-download-alt"} aria-hidden={"true"}></span></CSVLink>
                        <button className={"btn btn-default"}><CopyToClipboard text={nvd3ClipBoardData}><span
                            className={"glyphicon glyphicon-copy"} aria-hidden={"true"}></span></CopyToClipboard>
                        </button>
                    </div>
                    {Object.keys(data).map(function (key, ind) {
                        if (key != "minMaxArr") {
                            return <Chart chartType="ScatterChart" className="LineChart" data={data[key][sortKey]}
                                          key={key} options={options[key]} graph_id={"LineChart" + ind}
                                          width={width + "%"} height={"400px"} legend_toggle={true}/>
                        }
                    })}
                </div>
            );

        }
    },
});

var SimulationChart = CreateClass({
    getInitialState: function () {
        var sortKey = this.props.sortKey;
        if (!(sortKey in supportedSimulationChartSortkeys)) sortKey = "summedAverageExpectedDamage";

        return {
            sortKey: sortKey,
        }
    },
    makeChartOption: function (sortKey) {
        var locale = this.props.locale;

        var options = {};
        for (var key in this.props.data) {
            if (key != "minMaxArr") {
                options[key] = {
                    title: key,
                    forcelFrame: true,
                    hAxis: {
                        title: intl.translate("ターン", locale),
                        titleTextStyle: {italic: false},
                        textStyle: {italic: false},
                        gridlines: {count: this.props.maxTurn}
                    },
                    vAxis: {
                        title: intl.translate(supportedSimulationChartSortkeys[sortKey], locale),
                        textStyle: {italic: false},
                        minValue: this.props.data["minMaxArr"][sortKey]["min"],
                        maxValue: this.props.data["minMaxArr"][sortKey]["max"]
                    },
                    tooltip: {showColorCode: true, textStyle: {fontSize: 13}, trigger: "selection"},
                    legend: {position: "top", maxLines: 5, textStyle: {fontSize: 13}},
                    crosshair: {orientation: "both", opacity: 0.8, trigger: "both"},
                    chartArea: {left: "10%", top: "10%", width: "85%", height: "80%",},
                    lineWidth: 2,
                    pointSize: 8,
                    selectionMode: 'multiple',
                    aggregationTarget: "category",
                }
            }
        }

        return options
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    render: function () {
        var options = this.state.options;
        var data = this.props.data;
        var sortKey = this.state.sortKey;
        var options = this.makeChartOption(sortKey);

        if (_ua.Mobile) {
            return (
                <div className="HPChart">
                    {Object.keys(data).map(function (key, ind) {
                        if (key != "minMaxArr") {
                            return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]}
                                          key={key} options={options[key]} graph_id={"LineChart" + ind} width={"98%"}
                                          height={"50%"} legend_toggle={true}/>
                        }
                    })}
                </div>
            );
        } else {
            if (window.innerWidth > 1000) {
                var width = (98.0 / (Object.keys(data).length - 1));
                if (Object.keys(data).length - 1 > 2) {
                    width = 49.0
                }
            } else {
                var width = 98.0
            }

            return (
                <div className="HPChart">
                    <div style={{"alignItems": "center", "textAlign": "center"}}>
                        <span>{intl.translate("表示項目", this.props.locale)}</span>
                        <FormControl
                            componentClass="select"
                            value={this.state.sortKey}
                            style={{"width": "400px", "margin": "2px 5px"}}
                            onChange={this.handleEvent.bind(this, "sortKey")}>
                            {selector[this.props.locale].supported_simulationchartsortkeys}
                        </FormControl>
                    </div>

                    {Object.keys(data).map(function (key, ind) {
                        if (key != "minMaxArr") {
                            return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]}
                                          key={key} options={options[key]} graph_id={"LineChart" + ind}
                                          width={width + "%"} height={"400px"} legend_toggle={true}/>
                        }
                    })}
                </div>
            );

        }
    },
});

module.exports.HPChart = HPChart;
module.exports.SimulationChart = SimulationChart;
