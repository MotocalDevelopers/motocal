var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var intl = require('./translate.js')
var selector = GlobalConst.selector
var supportedChartSortkeys = GlobalConst.supportedChartSortkeys
var supportedTurnChartSortkeys = GlobalConst.supportedTurnChartSortkeys
var supportedSimulationChartSortkeys = GlobalConst.supportedSimulationChartSortkeys
var _ua = GlobalConst._ua;

var TurnChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedTurnChartSortkeys)) sortKey = "totalAttack"

        options = {}
        if(_ua.Mobile) {
            for(var key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(var key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        }

        return {
            options: options,
            sortKey: sortKey,
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value

        // optionsをupdate
        options = {}
        if(_ua.Mobile) {
            for(var key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        curveType: 'function',
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(var key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        curveType: 'function',
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }

        }
        newState.options = options

        this.setState(newState)
    },
    render: function() {
        var options = this.state.options
        var data = this.props.data
        var sortKey = this.state.sortKey

        if(_ua.Mobile) {
            return (
                    <div className="HPChart">
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={"90%"} height={"50%"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );
        } else {
            if(window.innerWidth >= 1450) {
                var width = (90.0 / (Object.keys(data).length - 1))
                if(Object.keys(data).length - 1 > 2) {
                    width = 45.0
                }
            } else {
                var width = 90.0
            }

            return (
                    <div className="HPChart">
                        <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector.supported_turnchartsortkeys}</FormControl>
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={width + "%"} height={"600px"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );

        }
    },
});

var HPChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedChartSortkeys)) sortKey = "averageCyclePerTurn"

        return {
            sortKey: sortKey,
        }
    },
    makeChartOption: function(sortKey) {
        var locale = this.props.locale
        var hlabel = (this.props.displayRealHP ? intl.translate("残りHP", locale) : intl.translate("残HP割合", locale));

        options = {}
        for(var key in this.props.data) {
            if(key != "minMaxArr") {
                options[key] = {
                    title: key,
                    curveType: 'function',
                    forcelFrame: true,
                    hAxis: {title: hlabel, titleTextStyle: {italic: false}, textStyle: {italic: false}},
                    vAxis: {title: intl.translate(supportedChartSortkeys[sortKey], locale), textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                    tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                    legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                    chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    lineWidth: 2,
                    pointSize: 0,
                }
            }
        }

        return options
    },
    handleEvent: function(key, e) {
        var locale = this.props.locale
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale
        var data = this.props.data
        var sortKey = this.state.sortKey
        var options = this.makeChartOption(sortKey)

        if(_ua.Mobile) {
            return (
                    <div className="HPChart">
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="ScatterChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={"90%"} height={"50%"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );
        } else {
            if(window.innerWidth >= 1450) {
                var width = (90.0 / (Object.keys(data).length - 1))
                if(Object.keys(data).length - 1 > 2) {
                    width = 45.0
                }
            } else {
                var width = 90.0
            }

            return (
                    <div className="HPChart">
                        <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector[locale].supported_chartsortkeys}</FormControl>
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="ScatterChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={width + "%"} height={"600px"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );

        }
    },
});

var SimulationChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedSimulationChartSortkeys)) sortKey = "summedAverageExpectedDamage"

        return {
            sortKey: sortKey,
        }
    },
    makeChartOption: function(sortKey) {
        var locale = this.props.locale

        options = {}
        for(var key in this.props.data) {
            if(key != "minMaxArr") {
                options[key] = {
                    title: key,
                    forcelFrame: true,
                    hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}, gridlines: {count: this.props.maxTurn}},
                    vAxis: {title: intl.translate(supportedSimulationChartSortkeys[sortKey], locale), textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                    tooltip: {showColorCode: true, textStyle: {fontSize: 15}, trigger: "selection"},
                    legend: {position: "top", maxLines: 5, textStyle: {fontSize: 15}},
                    crosshair: {orientation: "both", opacity: 0.8, trigger: "both"},
                    chartArea: {left: "10%", top: "10%", width: "85%", height: "70%",},
                    lineWidth: 2,
                    point: 2,
                    selectionMode: 'multiple',
                    aggregationTarget: "category",
                }
            }
        }

        return options
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var options = this.state.options
        var data = this.props.data
        var sortKey = this.state.sortKey
        var options = this.makeChartOption(sortKey)

        if(_ua.Mobile) {
            return (
                    <div className="HPChart">
                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={"90%"} height={"50%"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );
        } else {
            if(window.innerWidth > 1000) {
                var width = (98.0 / (Object.keys(data).length - 1))
                if(Object.keys(data).length - 1 > 2) {
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
                                style={{"width": "50%", "margin": "2px 5px"}}
                                onChange={this.handleEvent.bind(this, "sortKey")}>
                                {selector.supported_simulationchartsortkeys}
                            </FormControl>
                        </div>

                        {Object.keys(data).map(function(key, ind) {
                            if(key != "minMaxArr") {
                                return <Chart chartType="LineChart" className="LineChart" data={data[key][sortKey]} key={key} options={options[key]} graph_id={"LineChart" + ind} width={width + "%"} height={"600px"} legend_toggle={true} />
                            }
                        })}
                    </div>
            );

        }
    },
});

module.exports.HPChart = HPChart;
module.exports.TurnChart = TurnChart;
module.exports.SimulationChart = SimulationChart;
