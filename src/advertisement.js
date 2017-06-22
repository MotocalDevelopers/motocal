var React = require('react');
var ReactDOM = require('react-dom');
var intl = require('./translate.js')

var AdsenseAdvertisement = React.createClass({
    showUpAdsense: function() {
        var adsense = document.getElementById("adsense-original-div");
        adsense.className = '';
        ReactDOM.findDOMNode(this.refs["adsense-space"]).appendChild(adsense);
    },
    componentDidMount: function() {
        this.showUpAdsense();
    },
    render: function() {
        return (
            <div style={{width: "100%"}}>
                <div ref="adsense-space"></div>
            </div>
        );
    },
});

var AdstirAdvertisement = React.createClass({
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
            </div>
        );
    },
});

module.exports.AdsenseAdvertisement = AdsenseAdvertisement;
module.exports.AdstirAdvertisement = AdstirAdvertisement;
