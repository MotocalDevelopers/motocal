var React = require('react');

var Advertisement = React.createClass({
    render: function() {
        var myID = "hsimyu-001";
        return (
            <div>
              <iframe src="http://blogparts.dmm.com/ranking?adid=4c021465f9ca26c3612817fa53c1e108" style={{width:"400px", height:"150px", marginLeft: "calc(50% - 200px)", marginRight: "calc(50% - 200px)"}} scrolling="no" frameBorder="0">
                  この部分は iframe 対応のブラウザで見てください。
              </iframe>
              <a href={"http://www.dmm.com/lp/game/kamipro/index001_html/=/navi=none/" + myID} target="_blank"><img src="http://pics.dmm.com/af/c_olg030/300_60.jpg" style={{width:"300px", height:"60px", marginLeft: "calc(50% - 150px)", marginRight: "calc(50% - 150px)", border: "0px"}} alt="神姫PROJECT"/></a>
              <a href={"http://www.dmm.co.jp/lp/game/kamipror/index001.html/=/navi=none/" + myID} target="_blank"><img src="http://pics.dmm.com/af/a_olg027/300_60.jpg" style={{width:"300px", height:"60px", marginLeft: "calc(50% - 150px)", marginRight: "calc(50% - 150px)", border: "0px"}} alt="神姫PROJECT R"/></a>
                <a href={"http://www.dmm.com/lp/game/oshirore/index001_html/=/navi=none/" + myID} target="_blank"><img src="http://pics.dmm.com/af/c_olg031/300_60.jpg" style={{width:"300px", height:"60px", marginLeft: "calc(50% - 150px)", marginRight: "calc(50% - 150px)", border: "0px"}} alt="御城プロジェクト～CASTLEDEFENCE～" /></a>
            </div>
        );
    },
});

module.exports = Advertisement;
