var React = require('react');
var ReactDOM = require('react-dom');
var intl = require('./translate.js')

var Advertisement = React.createClass({
    showUpAdmax: function() {
        var admax = document.getElementById("admax-original-div");
        admax.className = '';
        ReactDOM.findDOMNode(this.refs["admax-space"]).appendChild(admax);
    },
    showUpAdstir: function() {
        var adstir = document.getElementById("adstir-original-div");
        adstir.className = '';
        ReactDOM.findDOMNode(this.refs["adstir-space"]).appendChild(adstir);
    },
    componentDidMount: function() {
        this.showUpAdstir();
    },
    render: function() {
        return (
            <div style={{width: "100%"}}>
              <div ref="adstir-space"></div>
              <div ref="admax-space"></div>
            </div>
        );
    },
});

module.exports = Advertisement;
