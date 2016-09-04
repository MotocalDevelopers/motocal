var React = require('react');
var ReactDOM = require('react-dom');
var {Chart} = require('react-google-charts')
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');
var GlobalConst = require('./global_const.js')
var selector = GlobalConst.selector
var supportedSimulationChartSortkeys = GlobalConst.supportedSimulationChartSortkeys
var _ua = GlobalConst._ua;

var SimulationChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedSimulationChartSortkeys)) sortKey = "averageExpectedDamage"

        options = {}
        if(_ua.Mobile) {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedSimulationChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedSimulationChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
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
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedSimulationChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
                        tooltip: {ignoreBounds: true, isHtml: true, showColorCode: true, textStyle: {fontSize: 10}},
                        legend: {position: "top", maxLines: 3, textStyle: {fontSize: 8}},
                        chartArea: {left: "20%", top: "10%", width: "80%", height: "70%",},
                    }
                }
            }
        } else {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        hAxis: {title: "ターン数", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedSimulationChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
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
                        <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector.supported_simulationchartsortkeys}</FormControl>
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

module.exports = SimulationChart;
