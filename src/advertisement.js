var React = require('react');

var Advertisement = React.createClass({
    render: function() {
        var myID = "hsimyu-001";
        var style468 = {width:"468px", height:"60px", marginLeft: "5px", marginRight: "5px", display: "inline", border: "0px"};
        var style300 = {width:"300px", height:"60px", marginLeft: "5px", marginRight: "5px", display: "inline", border: "0px"};

        return (
            <div style={{width: "100%", height: "60px", overflow: "hidden"}}>
              <a href="http://www.dmm.com/lp/game/ragst/index001_html/=/navi=none/hsimyu-001" target="_blank"><img src="http://pics.dmm.com/af/c_olg043/468_60.jpg" style={style468} alt="ラグナストライクエンジェルズ"/></a>
              <a href="http://www.dmm.com/lp/game/icchibanketu/index001_html/=/navi=none/hsimyu-001" target="_blank"><img src="http://pics.dmm.com/af/c_olg040/468_60.jpg" style={style468} alt="一血卍傑-ONLINE-"/></a>
            </div>
        );
    },
});

module.exports = Advertisement;
