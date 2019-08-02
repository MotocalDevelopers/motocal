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
var _ua = GlobalConst._ua;
var {generateHaisuiData, getTotalBuff, getInitialTotals, treatSupportAbility, calcOneCombination, initializeTotals} = require('./global_logic.js');

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
    makeCsvData: function () {
        var d = this.state.chartData['まとめて比較'];
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
    /* Generate TSV for clipboard from CSV for download */
    makeClipboardText: function (csvData) {
        return csvData.map(v => v.join("\t")).join("\n");
    },
    render: function () {
        var locale = this.props.locale;
        var sortKey = this.state.sortKey;
        var data = this.state.chartData;
        var options = this.makeChartOption(sortKey);
        var csvData = this.makeCsvData();
        var clipBoardData = this.makeClipboardText(csvData);

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
                        <CSVLink className={"btn btn-default"} data={csvData}><span
                            className={"glyphicon glyphicon-download-alt"} aria-hidden={"true"}></span></CSVLink>
                        <button className={"btn btn-default"}><CopyToClipboard text={clipBoardData}><span
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
