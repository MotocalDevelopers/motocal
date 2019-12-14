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
var _ua = GlobalConst._ua;
var {generateHaisuiData, getTotalBuff, getInitialTotals, treatSupportAbility, calcOneCombination, initializeTotals} = require('./global_logic.js');
var colors = ['#000000','#000080','#00008B','#0000CD','#0000FF','#006400','#008000','#008080','#008B8B','#00BFFF','#00CED1',
    '#00FA9A','#00FF00','#00FF7F','#00FFFF','#00FFFF','#191970','#1E90FF','#20B2AA','#228B22','#2E8B57','#2F4F4F','#2F4F4F',
    '#32CD32','#3CB371','#40E0D0','#4169E1','#4682B4','#483D8B','#48D1CC','#4B0082','#556B2F','#5F9EA0','#6495ED','#663399',
    '#66CDAA','#696969','#696969','#6A5ACD','#6B8E23','#708090','#708090','#778899','#778899','#7B68EE','#7CFC00','#7FFF00',
    '#7FFFD4','#800000','#800080','#808000','#808080','#808080','#87CEEB','#87CEFA','#8A2BE2','#8B0000','#8B008B','#8B4513',
    '#8FBC8F','#90EE90','#9370DB','#9400D3','#98FB98','#9932CC','#9ACD32','#A0522D','#A52A2A','#A9A9A9','#A9A9A9','#ADD8E6',
    '#ADFF2F','#AFEEEE','#B0C4DE','#B0E0E6','#B22222','#B8860B','#BA55D3','#BC8F8F','#BDB76B','#C0C0C0','#C71585','#CD5C5C',
    '#CD853F','#D2691E','#D2B48C','#D3D3D3','#D3D3D3','#D8BFD8','#DA70D6','#DAA520','#DB7093','#DC143C','#DCDCDC','#DDA0DD',
    '#DEB887','#E0FFFF','#E6E6FA','#E9967A','#EE82EE','#EEE8AA','#F08080','#F0E68C','#F0F8FF','#F0FFF0','#F0FFFF','#F4A460',
    '#F5DEB3','#F5F5DC','#F5F5F5','#F5FFFA','#F8F8FF','#FA8072','#FAEBD7','#FAF0E6','#FAFAD2','#FDF5E6','#FF0000','#FF00FF',
    '#FF00FF','#FF1493','#FF4500','#FF6347','#FF69B4','#FF7F50','#FF8C00','#FFA07A','#FFA500','#FFB6C1','#FFC0CB','#FFD700',
    '#FFDAB9','#FFDEAD','#FFE4B5','#FFE4C4','#FFE4E1','#FFEBCD','#FFEFD5','#FFF0F5','#FFF5EE','#FFF8DC','#FFFACD','#FFFAF0',
    '#FFFAFA','#FFFF00','#FFFFE0','#FFFFF0'];

var HPChart = CreateClass({
    makeChartData: function (props) {
        var storedCombinations = props.storedList.combinations;
        var storedArmlist = props.storedList.armlist;
        var storedNames = props.storedList.names;

        var prof = props.prof;
        var armlist = props.armlist;
        var summon = props.summon;
        var chara = props.chara;
        var totalBuff = getTotalBuff(prof);
        var totals = getInitialTotals(prof, chara, summon);
        treatSupportAbility(totals, chara, totalBuff);

        var res = [];
        for (var i = 0; i < summon.length; i++) {
            res[i] = []
        }

        for (var i = 0; i < storedCombinations.length; i++) {
            var oneres = calcOneCombination(storedCombinations[i], summon, prof, armlist, totals, totalBuff);
            for (var j = 0; j < summon.length; j++) {
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            initializeTotals(totals)
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
    /* Formatted for CSV */
    makeWikiData: function (locale) {
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
            var graphData = d[this.state.sortKey];

            var xAxis=graphData[0][0];
            var sortkeyname = keyTypes[this.state.sortKey];
            var yAxis = intl.translate(sortkeyname, locale);
            var width="800px";
            var height="500px";
            var alt="Motocal Graph: " + yAxis + "," + xAxis;

            var data = "";
            var nvd3Chart = "";
            for (var j = 1; j < graphData[0].length; j++) {
                // Remove unnecessary line feed letters which break CSV format.
                var label = graphData[0][j].replace(/\r?\n/g, "");
                // Get Random css color
                var color = colors[Math.floor(Math.random() * colors.length)];
                var area = false;
                var chartDataXArray = [];
                var chartDataYArray = [];
                for (var i = 1; i < graphData.length; i++) {
                    chartDataXArray.push(graphData[i][0]);
                    chartDataYArray.push(graphData[i][j]);
                }
                var chartDataX = chartDataXArray.toString();
                var chartDataY = chartDataYArray.toString();
                var chartalt ="Motocal Graph: " + label;
                data = data + "  {{NVD3Series\n    |label="+label+"\n    |color="+color+"\n    |area="+area+"\n    |chartDataX="+chartDataX+"\n    |chartDataY="+chartDataY+"\n    |alt="+chartalt+"\n  }}\n";
            }
            nvd3Chart = "{{NVD3Chart\n|xAxis="+xAxis+"\n|yAxis="+yAxis+"\n|yAxisWidth=100\n|yFormat=,.04s\n|width="+width+"\n|height="+height+"\n|alt="+alt+"\n|data=\n"+data+"}}\n";
            return nvd3Chart;
        }
    },
    /* Generate TSV for clipboard from CSV for download */
    makeCsvClipboardText: function (csvdata) {
        return csvdata.map(v => v.join("\t")).join("\n");
    },
    makeNvd3ClipboardText: function (wikiData) {
        return wikiData;
    },
    render: function () {
        var locale = this.props.locale;
        var sortKey = this.state.sortKey;
        var data = this.state.chartData;
        var options = this.makeChartOption(sortKey);
        var csvData = this.makeCsvData(locale);
        var wikiData = this.makeWikiData(locale);
        var csvClipBoardData = this.makeCsvClipboardText(csvData);
        var wikiClipBoardData = this.makeNvd3ClipboardText(wikiData);

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
                        <span>WIKI</span>
                        <CSVLink className={"btn btn-default"} data={wikiData} filename={"motocal_charts_wiki.txt"}><span
                            className={"glyphicon glyphicon-download-alt"} aria-hidden={"true"}></span></CSVLink>
                        <button className={"btn btn-default"}><CopyToClipboard text={wikiClipBoardData}><span
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
