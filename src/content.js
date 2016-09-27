var React = require('react');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Chart} = require('react-google-charts')
var {Nav, NavItem, Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var SimulatorInput = require('./simulator.js')
var SimulationChart = require('./chart.js')
var GlobalConst = require('./global_const.js')
var Notice = require('./notice.js')
var HowTo = require('./howto.js')
var NiteHowTo = require('./nitehowto.js')
var dataForLoad = GlobalConst.dataForLoad

// inject GlobalConst...
var elementRelation = GlobalConst.elementRelation
var bahamutRelation = GlobalConst.bahamutRelation
var bahamutFURelation = GlobalConst.bahamutFURelation
var selector = GlobalConst.selector
var zenith = GlobalConst.zenith
var Jobs = GlobalConst.Jobs
var armTypes = GlobalConst.armTypes
var jobTypes = GlobalConst.jobTypes
var keyTypes = GlobalConst.keyTypes
var skilltypes = GlobalConst.skilltypes
var skillAmounts = GlobalConst.skillAmounts
var elementTypes = GlobalConst.elementTypes
var summonTypes = GlobalConst.summonTypes
var summonElementTypes = GlobalConst.summonElementTypes
var raceTypes = GlobalConst.raceTypes
var filterElementTypes = GlobalConst.filterElementTypes
var supportedTurnChartSortkeys = GlobalConst.supportedTurnChartSortkeys
var supportedChartSortkeys = GlobalConst.supportedChartSortkeys
var enemyDefenseType = GlobalConst.enemyDefenseType
var _ua = GlobalConst._ua;

// query 取得用の関数
var urldata = getVarInQuery("data");
var urlid = getVarInQuery("id")

function getVarInQuery(key){
    var vars = {}, max = 0, hash = "", array = "";
    var url = window.location.search;

    hash  = url.slice(1).split('&');
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars[array[0]] = array[1];
    }

    var result = ""
    if(key in vars){
        result = vars[key];
    }

    return result;
}

// global hash for loading new data
var touchPosition = null;
var touchDirection = null;

// Root class contains [Profile, ArmList, Results].
var Root = React.createClass({
  getInitialState: function() {
      var initial_width = 30;
      var initial_height = 100;

      return {
          armNum: 5,
          summonNum: 2,
          charaNum: 4,
          profile: [],
          armlist: [],
          chara: [],
          summon: [],
          simulator: [],
          dataName: '',
          sortKey: "totalAttack",
          noResultUpdate: false,
          resultHasChangeButNotUpdated: false,
          oldWidth: window.innerWidth,
          rootleftHeight: initial_height,
          rootleftWidth: initial_width,
          rootrightHeight: initial_height,
          rootrightWidth: 100 - initial_width,
          openHowTo: false,
          openNiteHowTo: false,
          openSimulatorHowTo: false,
          activeKey: "inputTab",
      };
  },
  openHowTo: function(e) {
      this.setState({openHowTo: true})
  },
  closeHowTo: function(e) {
      this.setState({openHowTo: false})
  },
  openNiteHowTo: function(e) {
      this.setState({openNiteHowTo: true})
  },
  closeNiteHowTo: function(e) {
      this.setState({openNiteHowTo: false})
  },
  openSimulatorHowTo: function(e) {
      this.setState({openSimulatorHowTo: true})
  },
  closeSimulatorHowTo: function(e) {
      this.setState({openSimulatorHowTo: false})
  },
  onTouchStart: function(e) {
      //スワイプ開始時の横方向の座標を格納
      touchPosition = this.getPosition(e)
      touchDirection = ''
  },
  onTouchMove: function(e) {
      //スワイプの方向（left / right）を取得
      var td = "none";
      if (touchPosition - this.getPosition(e) > 140) {
          td = 'right'; //左と検知
      } else if (touchPosition - this.getPosition(e) < -140){
          td = 'left'; //右と検知
      }
      touchDirection = td
  },
  onTouchEnd: function(e) {
      if(touchDirection == "left" || touchDirection == "right") {
          this.swipeTab(touchDirection);
      }
  },
  //横方向の座標を取得
  getPosition: function(e) {
      return e.touches[0].pageX;
  },
  swipeTab: function(direction){
      var selected = document.querySelector("button.selected").getAttribute("id")
      document.querySelector("button.selected").removeAttribute("class")
      document.querySelector("div#" + selected).setAttribute("class", selected + " hidden")

      if(direction == "left") {
          switch(selected) {
              case "inputTab":
                  document.querySelector("button#systemTab").setAttribute("class", "selected")
                  document.querySelector("div#systemTab").setAttribute("class", "systemTab")
                  break;
              case "summonTab":
                  document.querySelector("button#inputTab").setAttribute("class", "selected")
                  document.querySelector("div#inputTab").setAttribute("class", "inputTab")
                  break;
              case "charaTab":
                  document.querySelector("button#summonTab").setAttribute("class", "selected")
                  document.querySelector("div#summonTab").setAttribute("class", "summonTab")
                  break;
              case "armTab":
                  document.querySelector("button#charaTab").setAttribute("class", "selected")
                  document.querySelector("div#charaTab").setAttribute("class", "charaTab")
                  break;
              case "resultTab":
                  document.querySelector("button#armTab").setAttribute("class", "selected")
                  document.querySelector("div#armTab").setAttribute("class", "armTab")
                  break;
              case "systemTab":
                  document.querySelector("button#resultTab").setAttribute("class", "selected")
                  document.querySelector("div#resultTab").setAttribute("class", "resultTab")
                  break;
          }
      } else {
          switch(selected) {
              case "inputTab":
                  document.querySelector("button#summonTab").setAttribute("class", "selected")
                  document.querySelector("div#summonTab").setAttribute("class", "summonTab")
                  break;
              case "summonTab":
                  document.querySelector("button#charaTab").setAttribute("class", "selected")
                  document.querySelector("div#charaTab").setAttribute("class", "charaTab")
                  break;
              case "charaTab":
                  document.querySelector("button#armTab").setAttribute("class", "selected")
                  document.querySelector("div#armTab").setAttribute("class", "armTab")
                  break;
              case "armTab":
                  document.querySelector("button#resultTab").setAttribute("class", "selected")
                  document.querySelector("div#resultTab").setAttribute("class", "resultTab")

                  // // resultTabになった時だけ結果を更新する
                  // if(this.state.resultHasChangeButNotUpdated == undefined || this.state.resultHasChangeButNotUpdated) {
                  //     this.setState({noResultUpdate: false});
                  //     this.setState({resultHasChangeButNotUpdated: false});
                  // }
                  break;
              case "resultTab":
                  document.querySelector("button#systemTab").setAttribute("class", "selected")
                  document.querySelector("div#systemTab").setAttribute("class", "systemTab")
                  break;
              case "systemTab":
                  document.querySelector("button#inputTab").setAttribute("class", "selected")
                  document.querySelector("div#inputTab").setAttribute("class", "inputTab")
                  break;
          }
      }
  },
  getDatacharById: function(id) {
      $.ajax({
          url: "getdata.php",
          type: 'POST',
          dataType: 'text',
          cache: false,
          timeout: 10000,
          data: {id: id},
          success: function(data, datatype) {
              var initState = JSON.parse(Base64.decode(data));
              var oldState = this.state
              initState["noResultUpdate"] = false
              initState["oldWidth"] = oldState.oldWidth
              initState["rootleftHeight"] = oldState.rootleftHeight
              initState["rootleftWidth"] = oldState.rootleftWidth
              initState["rootrightHeight"] = oldState.rootrightHeight
              initState["rootrightWidth"] = oldState.rootrightWidth

              dataForLoad = initState
              this.setState(initState);
          }.bind(this),
          error: function(xhr, status, err) {
              alert("Error!: IDが不正です. status: ", status, ", error message: ", err.toString());
          }.bind(this)
      });
  },
  componentDidMount: function(){
      if(urldata != ''){
          var initState = JSON.parse(Base64.decode(urldata));
          initState["dataName"] = "urlData"
          dataForLoad = initState
          this.setState(initState);
      }

      if(urlid != ''){
          this.getDatacharById(urlid);
      }
      this.setState({noResultUpdate: false});
  },
  handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      if(key == "sortKey") newState.noResultUpdate = false
      this.setState(newState)
  },
  onChangeArmData: function(state, isSubtle) {
      // armlistの武器名に変更があればresultはupdateしなくてよい
      this.setState({armlist: state});

      // tablet と smartphoneの時はタブ切り替え時以外updateしない
      if(isSubtle != undefined) {
          this.setState({noResultUpdate: isSubtle});
      } else {
          this.setState({noResultUpdate: false});
      }
  },
  onChangeProfileData: function(state) {
      this.setState({profile: state});
      this.setState({noResultUpdate: false});
  },
  onChangeSummonData: function(state) {
      this.setState({summon: state});
      this.setState({noResultUpdate: false});
  },
  onChangeCharaData: function(state, isSubtle) {
      this.setState({chara: state});

      if(isSubtle != undefined) {
          this.setState({noResultUpdate: isSubtle});
      } else {
          this.setState({noResultUpdate: false});
      }
  },
  onChangeSimulationData: function(state) {
      this.setState({simulator: state});
      this.setState({noResultUpdate: true});
  },
  handleChangeData: function(newDataName) {
      this.setState({armNum: dataForLoad.armNum});
      this.setState({summonNum: dataForLoad.summonNum});
      this.setState({dataName: newDataName});
  },
  captureResultList: function(e){
      html2canvas(document.getElementById("allResult"), {
          onrendered: function(canvas) {
              window.open(canvas.toDataURL("image/png"));
          },
      })
  },
  handleChangeTab: function(eventKey){
      var activeKey = (this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey
      document.querySelector("div#" + activeKey).setAttribute("class", "Tab hidden")

      var target = document.querySelector("div#" + eventKey)
      target.setAttribute("class", "Tab");
      this.setState({activeKey: eventKey})
  },
  changeTab: function(e){
      var selected = document.querySelector("button.selected")
      selected.removeAttribute("class")
      e.target.setAttribute("class", "selected")

      document.querySelector("div#" + selected.getAttribute("id")).setAttribute("class", "Tab hidden")
      var target = document.querySelector("div#" + e.target.getAttribute("id"))
      target.setAttribute("class", "Tab");
  },
  addArmNum: function(e) {
      var newArmNum = parseInt(this.state.armNum);
      if(newArmNum < 20) {
          newArmNum += 1
          this.setState({armNum: newArmNum});
          return newArmNum;
      } else {
          return -1;
      }
  },
  subArmNum: function(e) {
      var newArmNum = parseInt(this.state.armNum);
      if(newArmNum > 1) newArmNum -= 1
      this.setState({armNum: newArmNum});
  },
  addSummonNum: function(e) {
      var newSummonNum = parseInt(this.state.summonNum);
      if(newSummonNum < 6) newSummonNum += 1
      this.setState({summonNum: newSummonNum});
  },
  subSummonNum: function(e) {
      var newSummonNum = parseInt(this.state.summonNum);
      if(newSummonNum > 1) newSummonNum -= 1
      this.setState({summonNum: newSummonNum});
  },
  addCharaNum: function(e) {
      var newCharaNum = parseInt(this.state.charaNum);
      if(newCharaNum < 10) {
          newCharaNum += 1
          this.setState({charaNum: newCharaNum});
          return newCharaNum;
      } else {
          return -1;
      }
  },
  subCharaNum: function(e) {
      var newCharaNum = parseInt(this.state.charaNum);
      if(newCharaNum > 1) newCharaNum -= 1
      this.setState({charaNum: newCharaNum});
  },
  onDragEnd: function(e) {
      if(e.pageX > 0) {
          this.setState({rootleftWidth: parseInt(100.0 * e.pageX / window.innerWidth)})
          this.setState({rootrightWidth: 100 - parseInt(100.0 * e.pageX / window.innerWidth)})
          this.setState({noResultUpdate: true})
      }
  },
  render: function() {
    if(_ua.Mobile) {
        return (
            <div className="root" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
                <h2>元カレ計算機 (グラブル攻撃力計算機)</h2>
                <Button bsStyle="success" style={{margin: "0 0 0 5px"}} onClick={this.openHowTo} > 使い方 </Button>
                <Button bsStyle="success" style={{margin: "0 0 0 5px"}} onClick={this.openNiteHowTo} > 二手スキル等込みの編成について </Button>
                <Modal show={this.state.openHowTo} onHide={this.closeHowTo}>
                    <Modal.Header closeButton>
                        <Modal.Title>元カレ計算機について</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <HowTo />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.openNiteHowTo} onHide={this.closeNiteHowTo}>
                    <Modal.Header closeButton>
                        <Modal.Title>二手・三手・技巧スキル込みの編成について</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NiteHowTo />
                    </Modal.Body>
                </Modal>
                <div className="tabrow">
                    <button id="inputTab" className="selected" onClick={this.changeTab}>ジータさん</button>
                    <button id="summonTab" onClick={this.changeTab} >召喚石</button>
                    <button id="charaTab" onClick={this.changeTab} >キャラ</button>
                    <button id="armTab" onClick={this.changeTab} >武器</button>
                    <button id="resultTab" onClick={this.changeTab} >結果</button>
                    <button id="systemTab" onClick={this.changeTab} >保存</button>
                </div>
                <div className="Tab" id="inputTab">
                    <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                </div>
                <div className="Tab hidden" id="summonTab">
                    <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加(現在{this.state.summonNum}組)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="charaTab">
                    <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加(現在{this.state.charaNum}人)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="armTab">
                    <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加(現在{this.state.armNum}本)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="resultTab">
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {selector.ktypes} </FormControl>
                    <ResultList data={this.state} />
                </div>
                <div className="Tab hidden" id="systemTab">
                    <div className="systemList">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                </div>
            </div>
        );
    } else if(_ua.Tablet) {
        return (
            <div className="root">
                <h2>元カレ計算機 (グラブル攻撃力計算機)
                <Button bsStyle="info" style={{margin: "0 0 0 5px"}} onClick={this.openHowTo} > 使い方 </Button>
                <Button bsStyle="info" style={{margin: "0 0 0 5px"}} onClick={this.openNiteHowTo} > 二手スキル等込みの編成について </Button>
                </h2>
                <Modal className="howTo" show={this.state.openHowTo} onHide={this.closeHowTo}>
                    <Modal.Header closeButton>
                        <Modal.Title>元カレ計算機について</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <HowTo />
                    </Modal.Body>
                </Modal>
                <Modal className="howTo" show={this.state.openNiteHowTo} onHide={this.closeNiteHowTo}>
                    <Modal.Header closeButton>
                        <Modal.Title>二手・三手・技巧スキル込みの編成について</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NiteHowTo />
                    </Modal.Body>
                </Modal>
                <div className="tabrow">
                    <button id="inputTab" className="selected" onClick={this.changeTab}>ジータさん</button>
                    <button id="summonTab" onClick={this.changeTab} >召喚石</button>
                    <button id="charaTab" onClick={this.changeTab} >キャラ</button>
                    <button id="armTab" onClick={this.changeTab} >武器</button>
                    <button id="resultTab" onClick={this.changeTab} >結果</button>
                    <button id="systemTab" onClick={this.changeTab} >保存</button>
                </div>
                <div className="Tab" id="inputTab">
                    <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                </div>
                <div className="Tab hidden" id="summonTab">
                    <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加(現在{this.state.summonNum}組)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="charaTab">
                    <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加(現在{this.state.charaNum}人)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="armTab">
                    <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum}/>
                    <ButtonGroup className="addRemoveButtonGroup">
                        <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加(現在{this.state.armNum}本)</Button>
                        <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除</Button>
                    </ButtonGroup>
                </div>
                <div className="Tab hidden" id="resultTab">
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {selector.ktypes} </FormControl>
                    <ResultList data={this.state} />
                </div>
                <div className="Tab hidden" id="systemTab">
                    <div className="systemList">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="root">
                <div className="rootleft" id="rootleft2" style={{height: this.state.rootleftHeight + "%", width: this.state.rootleftWidth +"%"}}>
                    <h1>元カレ計算機 (グラブル攻撃力計算機)</h1>
                    <Button bsStyle="info" style={{margin: "0 0 2px 2px"}} onClick={this.openHowTo} > 使い方 </Button>
                    <Button bsStyle="info" style={{margin: "0 0 2px 2px"}} onClick={this.openNiteHowTo} > 二手等込みの編成について </Button>
                    <Button bsStyle="info" style={{margin: "0 0 2px 2px"}} onClick={this.openSimulatorHowTo} > ダメージシミュレータについて </Button>
                    <Modal className="howTo" show={this.state.openHowTo} onHide={this.closeHowTo}>
                        <Modal.Header closeButton>
                            <Modal.Title>元カレ計算機について</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <HowTo />
                        </Modal.Body>
                    </Modal>
                    <Modal className="howTo" show={this.state.openNiteHowTo} onHide={this.closeNiteHowTo}>
                        <Modal.Header closeButton>
                            <Modal.Title>二手・三手・技巧スキル込みの編成について</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NiteHowTo />
                        </Modal.Body>
                    </Modal>
                    <Modal className="howTo" show={this.state.openSimulatorHowTo} onHide={this.closeSimulatorHowTo}>
                        <Modal.Header closeButton>
                            <Modal.Title>ダメージシミュレータについて</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SimulatorInput.HowTo />
                        </Modal.Body>
                    </Modal>
                    <Nav bsStyle="tabs" justified activeKey={(this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey} onSelect={this.handleChangeTab}>
                        <NavItem eventKey="inputTab">ジータ</NavItem>
                        <NavItem eventKey="summonTab">召喚石</NavItem>
                        <NavItem eventKey="charaTab">キャラ</NavItem>
                        <NavItem eventKey="armTab">武器</NavItem>
                        <NavItem eventKey="simulatorTab">Simulator</NavItem>
                        <NavItem eventKey="systemTab">保存</NavItem>
                    </Nav>
                    <div className="Tab" id="inputTab">
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} />
                    </div>
                    <div className="Tab hidden" id="summonTab">
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>召喚石追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>キャラ追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddCharaNum={this.addCharaNum} pleaseAddArmNum={this.addArmNum} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>武器追加 / Add</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>削除 / Remove</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="systemTab">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                        <TwitterShareButton data={this.state} />
                        <Notice />
                    </div>
                    <div className="Tab hidden" id="simulatorTab">
                        <SimulatorInput dataName={this.state.dataName} dataForLoad={dataForLoad.simulator} chara={this.state.chara} onChange={this.onChangeSimulationData} />
                    </div>
                </div>
                <div draggable="true" className="drag-hr bg-info" onDragEnd={this.onDragEnd}><span className="label label-primary">drag</span></div>
                <div className="rootRight" style={{height: this.state.rootrightHeight + "%", width: "calc(" + this.state.rootrightWidth + "% - 12px)"}} >
                    優先する項目: <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {selector.ktypes} </FormControl>
                    <ResultList data={this.state} />
                </div>
            </div>
        );
    }
  }
});

var CharaList = React.createClass({
    getInitialState: function() {
        return {
            charalist: [],
            defaultElement: "fire",
            addChara: null,
            addCharaID: -1,
            openPresets: false,
        };
    },
    closePresets: function() {
        this.setState({openPresets: false})
    },
    openPresets: function() {
        this.setState({openPresets: true})
    },
    componentWillReceiveProps: function(nextProps) {
        if (parseInt(nextProps.charaNum) < parseInt(this.props.charaNum)) {
            var newcharalist = this.state.charalist;
            while(newcharalist.length > nextProps.charaNum) {
                newcharalist.pop();
            }
            this.setState({charalist: newcharalist})
        }
    },
    handleOnChange: function(key, state, isSubtle){
        var newcharalist = this.state.charalist;
        newcharalist[key] = state;
        this.setState({charalist: newcharalist})
        this.setState({addChara: null})
        this.props.onChange(newcharalist, isSubtle);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addChara"] = null
        this.setState(newState)
    },
    addTemplateChara: function(templateChara) {
        var minimumID = -1;
        for(key in this.state.charalist) {
            if(this.state.charalist[key].name == "" && this.state.charalist[key].attack == 0){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addChara: templateChara})
            this.setState({addCharaID: minimumID})
            if(_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddCharaNum() - 1;

            if(newKey >= 0) {
                this.setState({addChara: templateChara})
                this.setState({addCharaID: newKey})
                if(_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("キャラがいっぱいです。")
            }
        }
    },
    render: function() {
        var charas = [];
        for(var i=0; i < this.props.charaNum; i++) {
            charas.push({id: i});
        }
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        var addChara = this.state.addChara
        var addCharaID = this.state.addCharaID

        if(_ua.Mobile) {
            return (
                <div className="charaList">
                    <ButtonGroup vertical block>
                        <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>キャラテンプレートを開く</Button>
                    </ButtonGroup>
                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                            <span>(最大50件しか表示されません)</span>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredChara onClick={this.addTemplateChara} />
                        </Modal.Body>
                    </Modal>

                    <ControlLabel>属性一括変更</ControlLabel>
                    <FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.elements} </FormControl>
                    {charas.map(function(c) {
                        return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} />;
                    })}
                </div>
            );

        } else {
            return (
                <div className="charaList">
                    <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}>キャラテンプレートを開く</Button>
                    <br/>
                    <span>属性一括変更</span><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.elements} </FormControl>
                    <Grid fluid>
                        <Row>
                        {charas.map(function(c) {
                            return <Chara key={c.id} onChange={hChange} id={c.id} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} />;
                        })}
                        </Row>
                    </Grid>

                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredChara onClick={this.addTemplateChara} />
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
});

var RegisteredChara = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            charaData: {},
            limit: 50,
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: "./charaData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({charaData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: キャラデータの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.props.onClick(this.state.charaData[e.target.getAttribute("id")]);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var charaData = this.state.charaData
        var limit = this.state.limit;
        var displayed_count = 0;

        if(_ua.Mobile){
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder="キャラ名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector.filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onechara" key={key}>
                                                <p>{charaData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="charaTemplate">
                    <FormControl type="text" placeholder="キャラ名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector.filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onechara" key={key}>
                                            <p>{charaData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}
                    </div>
                </div>
            )
        }
    },
});

var Chara = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            element: "fire",
            race: "human",
            attack: 0,
            hp: 0,
            support: "none",
            type: "attack",
            favArm: "dagger",
            favArm2: "none",
            remainHP: 100,
            DA: 6.5,
            TA: 3.0,
            isConsideredInAverage: true,
        };
    },
    componentDidMount: function(){
       var state = this.state;

       // もし dataForLoad に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var chara = dataForLoad.chara
       if( chara != undefined && this.props.id in chara ){
           state = chara[this.props.id]
           this.setState(state)
       }

       // もし addCharaIDが設定されていて、自分と一致しているなら読み込む
       if(this.props.addChara != null && this.props.id == this.props.addCharaID ) {
           var newchara = this.props.addChara

           state["name"] = newchara.name
           state["attack"] = parseInt(newchara.attack)
           state["hp"] = parseInt(newchara.hp)
           state["type"] = newchara.type
           state["race"] = newchara.race
           state["element"] = newchara.element
           state["favArm"] = newchara.fav1
           state["favArm2"] = newchara.fav2
           state["DA"] = parseFloat(newchara.baseDA)
           state["TA"] = parseFloat(newchara.baseTA)

           this.setState(state);
       }
       // 初期化後 state を 上の階層に渡しておく
       // CharaList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state, false);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var chara = dataForLoad.chara
            if( chara != undefined && this.props.id in chara ){
                state = chara[this.props.id]
                this.setState(state)
                this.props.onChange(this.props.id, state, false)
            }
        }
        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addChara != null && nextProps.addChara != this.props.addChara && this.props.id == nextProps.addCharaID ) {
            var newState = this.state
            var newchara = nextProps.addChara

            newState["name"] = newchara.name
            newState["attack"] = parseInt(newchara.attack)
            newState["hp"] = parseInt(newchara.hp)
            newState["type"] = newchara.type
            newState["race"] = newchara.race
            newState["element"] = newchara.element
            newState["favArm"] = newchara.fav1
            newState["favArm2"] = newchara.fav2
            newState["DA"] = parseFloat(newchara.baseDA)
            newState["TA"] = parseFloat(newchara.baseTA)

            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function(key, e) {
        var newState = this.state

        if(key == "isConsideredInAverage") {
            newState[key] = (newState[key] == false) ? true : false
        } else {
            newState[key] = e.target.value
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState, false)
    },
    handleOnBlur: function(key, e) {
        if(key == "name" && this.state.name != "" && e.target.value != "") {
            this.props.onChange(this.props.id, this.state, true)
        } else {
            this.props.onChange(this.props.id, this.state, false)
        }
    },
    render: function() {
        if(_ua.Mobile) {
            return (
                <table className="table table-bordered"><tbody>
                    <tr><th>名前</th><td><FormControl type="text" placeholder="名前" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")}/></td></tr>
                    <tr><th>属性</th><td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} >{selector.elements}</FormControl></td></tr>
                    <tr><th>種族</th><td><FormControl componentClass="select" value={this.state.race} onChange={this.handleSelectEvent.bind(this, "race")} >{selector.races}</FormControl></td></tr>
                    <tr><th>タイプ</th><td><FormControl componentClass="select" value={this.state.type} onChange={this.handleSelectEvent.bind(this, "type")} >{selector.types}</FormControl></td></tr>
                    <tr><th>得意武器1</th><td><FormControl componentClass="select" value={this.state.favArm} onChange={this.handleSelectEvent.bind(this, "favArm")} >{selector.armtypes}</FormControl></td></tr>
                    <tr><th>得意武器2</th><td><FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleSelectEvent.bind(this, "favArm2")} >{selector.armtypes}</FormControl></td></tr>
                    <tr><th>平均に含める</th><td className="considerAverage"><Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleSelectEvent.bind(this, "isConsideredInAverage")} /></td></tr>
                    <tr><th>素の攻撃力</th><td><FormControl type="number" min="0" max="15000" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")}/></td></tr>
                    <tr><th>素のHP</th><td><FormControl type="number" min="0" max="5000" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")}/></td></tr>
                    <tr><th>残HP割合</th><td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl></td></tr>
                    <tr><th>基礎DA率</th><td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur.bind(this, "DA")} onChange={this.handleEvent.bind(this, "DA")}/></td></tr>
                    <tr><th>基礎TA率</th><td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur.bind(this, "TA")} onChange={this.handleEvent.bind(this, "TA")}/></td></tr>
                </tbody></table>
            );

        } else {
            return (
                <Col xs={12} md={12} lg={12} className="col-bordered">
                    <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>キャラ名&nbsp;</InputGroup.Addon>
                        <FormControl type="text" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")}/>
                        <InputGroup.Addon>
                        <Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleSelectEvent.bind(this, "isConsideredInAverage")}>平均に含める</Checkbox>
                        </InputGroup.Addon>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>属性　　&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} >{selector.elements}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>種族　　&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.race} onChange={this.handleSelectEvent.bind(this, "race")} >{selector.races}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>タイプ　&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.type} onChange={this.handleSelectEvent.bind(this, "type")} >{selector.types}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>得意武器&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.favArm} onChange={this.handleSelectEvent.bind(this, "favArm")} >{selector.armtypes}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>得意武器2</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleSelectEvent.bind(this, "favArm2")} >{selector.armtypes}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>素の攻撃力</InputGroup.Addon>
                        <FormControl type="number" min="0" max="15000" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>素のHP　</InputGroup.Addon>
                        <FormControl type="number" min="0" max="5000" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>残HP割合</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>基礎DA率</InputGroup.Addon>
                        <FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur.bind(this, "DA")} onChange={this.handleEvent.bind(this, "DA")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>基礎TA率</InputGroup.Addon>
                        <FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur.bind(this, "TA")} onChange={this.handleEvent.bind(this, "TA")}/>
                    </InputGroup>
                </FormGroup>
                </Col>
            );
        }

    }
});

var SummonList = React.createClass({
    getInitialState: function() {
        var sm = []
        for(var i=0; i < this.props.summonNum; i++) { sm.push(i); }

        return {
            smlist: [],
            defaultElement: "fire",
            summons: sm,
        };
    },
    updateSummonNum: function(num) {
        var summons = this.state.summons

        if(summons.length < num) {
            var maxvalue = Math.max.apply(null, summons)
            for(var i = 0; i < (num - summons.length); i++){
                summons.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(summons.length > num){
                summons.pop();
            }
        }
        this.setState({summons: summons})
    },
    componentWillReceiveProps: function(nextProps) {
        if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
            var newsmlist = this.state.smlist;
            while(newsmlist.length > nextProps.summonNum) {
                newsmlist.pop();
            }
            this.setState({smlist: newsmlist})
        }
        this.updateSummonNum(nextProps.summonNum)
    },
    handleOnCopy: function(id, keyid, state) {
        var newsummons = this.state.summons
        var maxvalue = Math.max.apply(null, newsummons)

        newsummons.splice(id + 1, 0, maxvalue + 1)
        newsummons.pop();
        this.setState({summons: newsummons})

        // dataForLoad にコピー対象のstateを入れておいて、componentDidMountで読み出されるようにする
        if(!("summon" in dataForLoad)) {
            // もしdataForLoadが更新される前だったらkeyを作っておく
            dataForLoad["summon"] = {}
        }
        dataForLoad.summon[id + 1] = state;

        var newsmlist = this.state.smlist;
        newsmlist.splice(id + 1, 0, state)
        newsmlist.pop();
        this.setState({smlist: newsmlist})

        // Root へ変化を伝搬
        this.props.onChange(newsmlist);
    },
    handleOnRemove: function(id, keyid, state) {
        var newsummons = this.state.summons
        var maxvalue = Math.max.apply(null, newsummons)

        // 該当の "key" を持つものを削除する
        newsummons.splice(this.state.summons.indexOf(keyid), 1)
        // 1個補充
        newsummons.push(maxvalue + 1)
        this.setState({summons: newsummons})

        // dataForLoadにinitial stateを入れておいて、componentDidMountで読み出されるようにする
        if(!("summon" in dataForLoad)) {
            dataForLoad["summon"] = {}
        }
        dataForLoad.summon[newsummons.length - 1] = state;

        var newsmlist = this.state.smlist;
        // 削除した分をalistからも削除
        newsmlist.splice(id, 1)
        // 1個補充
        newsmlist.push(state)
        this.setState({smlist: newsmlist})

        // Root へ変化を伝搬
        this.props.onChange(newsmlist);
    },
    handleOnChange: function(key, state){
        var newsmlist = this.state.smlist;
        newsmlist[key] = state;
        this.setState({smlist: newsmlist})
        this.props.onChange(newsmlist);
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    render: function() {
        var summons = this.state.summons;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        if(_ua.Mobile) {
            return (
                <div className="summonList">
                    <ControlLabel>属性一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.summonElements} </FormControl>
                    {summons.map(function(sm, ind) {
                        return <Summon key={sm} keyid={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} id={ind} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="summonList">
                    [属性一括変更]<FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.summonElements} </FormControl>
                    <h3 className="margin-top"> 召喚石 </h3>
                    <Grid fluid>
                        <Row>
                        {summons.map(function(sm, ind) {
                            return <Summon key={sm} keyid={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} id={ind} dataName={dataName} defaultElement={defaultElement} />;
                        })}
                        </Row>
                    </Grid>
                </div>
            );
        }
    }
});

var Summon = React.createClass({
    getInitialState: function() {
        return {
            selfSummonType: "magna",
            selfSummonAmount: 100,
            selfSummonAmount2: 0,
            selfElement: "fire",
            friendSummonType: "element",
            friendSummonAmount: 80,
            friendSummonAmount2: 0,
            friendElement: "fire",
            attack: 0,
            hp: 0,
            hpBonus: 0,
            DA: 0,
            TA: 0,
            criticalRatio: 0.0,
        };
    },
    componentDidMount: function(){
       var state = this.state;

       // もし dataForLoad に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var summon = dataForLoad.summon
       if( summon != undefined && this.props.id in summon ){
           state = summon[this.props.id]
           this.setState(state)
       }
       // 初期化後 state を 上の階層に渡しておく
       // summonList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = dataForLoad.summon[this.props.id]
            this.setState(newState);
            this.props.onChange(this.props.id, newState)
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["selfElement"] = nextProps.defaultElement
            newState["friendElement"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState);
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    handleOnBlur: function(e) {
        this.props.onChange(this.props.id, this.state)
    },
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
    },
    clickCopyButton: function(e, state) {
        this.props.onCopy(this.props.id, this.props.keyid, this.state)
    },
    handleSummonAmountChange(type, ind, e){
        var newState = this.state
        if(type == "self") {
            if(ind == 0){
                newState["selfSummonAmount"] = e.target.value
            } else {
                newState["selfSummonAmount2"] = e.target.value
            }
        } else {
            if(ind == 0){
                newState["friendSummonAmount"] = e.target.value
            } else {
                newState["friendSummonAmount2"] = e.target.value
            }
        }
        this.setState(newState)
        this.props.onChange(this.props.id, newState)
    },
    render: function() {
        var selfSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.selfSummonType == "odin"){
            selfSummon[1] = {"label": "キャラ ", "input": "select"}
            selfSummon[0].label = "属性 "
        }
        var friendSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.friendSummonType == "odin"){
            friendSummon[1] = {"label": "キャラ ", "input": "select"}
            friendSummon[0].label = "属性 "
        }
        if(_ua.Mobile) {
            return (
                <table className="table table-bordered">
                <tbody>
                <tr>
                    <th>自分の石</th>
                    <td>
                    <FormControl componentClass="select" className="element" value={this.state.selfElement} onChange={this.handleSelectEvent.bind(this, "selfElement")} >{selector.summonElements}</FormControl>
                    <FormControl componentClass="select" className="summontype" value={this.state.selfSummonType} onChange={this.handleSelectEvent.bind(this, "selfSummonType")} >{selector.summons}</FormControl>
                    </td>
                </tr>
                <tr>
                    <th>自分の加護量</th>
                    <td>{selfSummon[0].label}<FormControl componentClass="select" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)}>{selector.summonAmounts}</FormControl><br/>
                    {selfSummon[1].label}<FormControl componentClass="select" className={selfSummon[1].input} value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)}>{selector.summonAmounts}</FormControl>
                    </td>
                </tr>
                <tr>
                    <th>フレンド石</th>
                    <td>
                    <FormControl componentClass="select" className="element" value={this.state.friendElement} onChange={this.handleSelectEvent.bind(this, "friendElement")} >{selector.summonElements}</FormControl>
                    <FormControl componentClass="select" className="summontype" value={this.state.friendSummonType} onChange={this.handleSelectEvent.bind(this, "friendSummonType")} >{selector.summons}</FormControl></td>
                </tr>
                <tr>
                    <th>フレの加護量</th>
                    <td>{friendSummon[0].label}<FormControl componentClass="select" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)}>{selector.summonAmounts}</FormControl><br/>
                    {friendSummon[1].label}<FormControl componentClass="select" className={friendSummon[1].input} value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)}>{selector.summonAmounts}</FormControl>
                    </td>
                </tr>
                <tr>
                    <th>合計攻撃力</th>
                    <td><FormControl type="number" min="0" value={this.state.attack} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "attack")}/></td>
                </tr>
                <tr>
                    <th>合計HP</th>
                    <td><FormControl type="number" min="0" value={this.state.hp} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hp")}/></td>
                </tr>
                <tr>
                    <th>HPUP(%)</th>
                    <td><FormControl type="number" min="0" value={this.state.hpBonus} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                </tr>
                <tr>
                    <th>DA加護</th>
                    <td><FormControl type="number" min="0" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                </tr>
                <tr>
                    <th>TA加護</th>
                    <td><FormControl type="number" min="0" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                </tr>
                <tr>
                    <th>操作</th>
                    <td>
                        <ButtonGroup vertical block>
                            <Button bsStyle="primary" block onClick={this.clickRemoveButton}>削除</Button>
                            <Button bsStyle="primary" block onClick={this.clickCopyButton}>コピー</Button>
                        </ButtonGroup>
                    </td>
                </tr>
                </tbody>
                </table>
            );
        } else {
            return (
                <Col xs={12} md={12} lg={12} className="col-bordered">
                    <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>自分の石　</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleSelectEvent.bind(this, "selfElement")} >{selector.summonElements}</FormControl>
                        <FormControl componentClass="select" value={this.state.selfSummonType} onChange={this.handleSelectEvent.bind(this, "selfSummonType")} >{selector.summons}</FormControl>
                        {selfSummon[0].label}<FormControl componentClass="select" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)}>{selector.summonAmounts}</FormControl>
                        {selfSummon[1].label}<FormControl componentClass="select" className={selfSummon[1].input} value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)}>{selector.summonAmounts}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>フレの石　</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleSelectEvent.bind(this, "friendElement")} >{selector.summonElements}</FormControl>
                        <FormControl componentClass="select" value={this.state.friendSummonType} onChange={this.handleSelectEvent.bind(this, "friendSummonType")} >{selector.summons}</FormControl>
                        {friendSummon[0].label}<FormControl componentClass="select" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)}>{selector.summonAmounts}</FormControl>
                        {friendSummon[1].label}<FormControl componentClass="select" className={friendSummon[1].input} value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)}>{selector.summonAmounts}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>合計攻撃力</InputGroup.Addon>
                        <FormControl type="number" min="0" value={this.state.attack} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "attack")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>合計HP　&nbsp;&nbsp;</InputGroup.Addon>
                        <FormControl type="number" min="0" value={this.state.hp} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hp")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>HP加護　&nbsp;&nbsp;</InputGroup.Addon>
                        <FormControl type="number" min="0" value={this.state.hpBonus} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBonus")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>DA加護　&nbsp;&nbsp;</InputGroup.Addon>
                        <FormControl type="number" min="0" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>TA加護　&nbsp;&nbsp;</InputGroup.Addon>
                        <FormControl type="number" min="0" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/>
                    </InputGroup>
                    <ButtonGroup block>
                        <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickRemoveButton}>内容を消去</Button>
                        <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickCopyButton}>コピー</Button>
                    </ButtonGroup>
                    </FormGroup>
                </Col>
            );
        }
    }
});

var ResultList = React.createClass({
    calculateCombinations: function(arml) {
        // 全武器に対して [最小考慮数, ... , 最大考慮数] の配列を計算しておく
        var armNumArray = []
        var totalItr = 1;
        for(var i = 0; i < arml.length; i++){
            var temp = []
            var numMin = (arml[i].considerNumberMin != undefined) ? parseInt(arml[i].considerNumberMin) : 0
            var numMax = (arml[i].considerNumberMax != undefined) ? parseInt(arml[i].considerNumberMax) : 1
            var itr = numMax - numMin + 1
            for(var j = 0; j < itr; j++){
                temp[j] = j + numMin;
            }
            totalItr *= itr;
            armNumArray[i] = temp;
        }
        var combinations = []
        var index = []
        for(var i = 0; i < armNumArray.length; i++){
            index[i] = 0;
        }

        // isCosmos 事前判定
        var isCosmosArray = []
        for(var i = 0; i < arml.length; i++){
            isCosmosArray[i] = this.isCosmos(arml[i])
        }

        for(var i = 0; i < totalItr; i=(i+1)|0){
            var temp = []
            var num = 0;
            var isCosmosIncluded = false;
            var isValidCombination = true;
            for(var j = 0; j < armNumArray.length; j=(j+1)|0){
                if(!isCosmosArray[j]) {
                    temp.push(armNumArray[j][index[j]]);
                    num += parseInt(armNumArray[j][index[j]])
                } else {
                    // cosmos 武器
                    if(armNumArray[j][index[j]] == 0) {
                        temp.push(armNumArray[j][index[j]]);
                    } else if(armNumArray[j][index[j]] > 0 && !isCosmosIncluded) {
                        temp.push(armNumArray[j][index[j]]);
                        num += parseInt(armNumArray[j][index[j]])
                        isCosmosIncluded = true;
                    } else {
                        isValidCombination = false;
                    }
                }
            }
            if( isValidCombination && ((totalItr <= 1024 && num <= 10) || num == 10) ) combinations.push(temp)
            index = this.proceedIndex(index, armNumArray, 0)
        }
        return combinations
    },
    proceedIndex: function(index, ana, i){
        if(i == ana.length){
            return index;
        } else {
            index[i] = (index[i] + 1)|0;
            if(index[i] > ana[i].length - 1){
                index[i] = 0;
                index = this.proceedIndex(index, ana, i + 1);
            }
            return index
        }
    },
    isCosmos: function(arm){
        var isCos = false;
        if(skilltypes[arm.skill1] != undefined && skilltypes[arm.skill1].type == "cosmosArm") {
            isCos = true;
        } else if(skilltypes[arm.skill2] != undefined && skilltypes[arm.skill2].type == "cosmosArm") {
            isCos = true;
        }

        return isCos
    },
    isValidResult: function(res, minHP){
        // 結果の前処理用の関数

        // 最低保証HP
        if(minHP != undefined) {
            if (minHP > res.Djeeta.totalHP) return false
        }
        return true
    },
    calculateBasedOneSummon: function(summonind, prof, buff, totals) {
        var res = {}

        for(key in totals) {
            var totalSummon = totals[key]["totalSummon"][summonind]

            // for attack
            var magnaCoeff = 1.0 + 0.01 * totals[key]["magna"] * totalSummon["magna"]
            var magnaHaisuiCoeff = 1.0 + 0.01 * (totals[key]["magnaHaisui"]) * totalSummon["magna"]
            var unknownCoeff = 1.0 + 0.01 * totals[key]["unknown"] * totalSummon["ranko"] + 0.01 * totals[key]["unknownOther"]
            var unknownHaisuiCoeff = 1.0 + 0.01 * totals[key]["unknownOtherHaisui"]

            var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * totalSummon["zeus"] + 0.01 * totals[key]["bahaAT"] + totalSummon["chara"] + buff["normal"] + totals[key]["normalBuff"]
            var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * totalSummon["zeus"]
            var normalKonshinCoeff = 1.0 + 0.01 * (totals[key]["normalKonshin"]) * totalSummon["zeus"]
            // 属性(経過ターン)も最大値で計算する
            var elementCoeff = totals[key]["typeBonus"] + (totalSummon["element"] - 1.0 + totalSummon["elementTurn"] - 1.0) + buff["element"] + totals[key]["elementBuff"]
            var otherCoeff = 1.0 + buff["other"] + totals[key]["otherBuff"]

            if(key == "Djeeta") {
                // for Djeeta
                var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + totals["Djeeta"]["zenithATK"] + totals["Djeeta"]["job"].atBonus) * (1.0 + buff["master"])
                var displayHP = (totals[key]["baseHP"] + totalSummon["hp"] + totals[key]["armHP"] + totals["Djeeta"]["zenithHP"]) * (1.0 + buff["masterHP"])
            } else {
                // for chara
                var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"]
                var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]
            }

            var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff * unknownHaisuiCoeff * normalKonshinCoeff
            var totalHP = displayHP * (1.0 - totals[key]["HPdebuff"]) * (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["magnaHP"] * totalSummon["magna"] + 0.01 * totals[key]["normalHP"] * totalSummon["zeus"] + 0.01 * totals[key]["unknownHP"] * totalSummon["ranko"])

            // HPの下限は 1
            if( totalHP <= 0 ) totalHP = 1

            // for DA and TA
            // baseDA: 6.5%, baseTA: 3.0%
            var normalNite = totals[key]["normalNite"] * totalSummon["zeus"]
            var magnaNite = totals[key]["magnaNite"] * totalSummon["magna"]
            var normalSante = totals[key]["normalSante"] * totalSummon["zeus"]
            var magnaSante = totals[key]["magnaSante"] * totalSummon["magna"]
            var unknownOtherNite = totals[key]["unknownOtherNite"]

            // DATA sup
            // 通常・方陣・EX・バハ・コスモスBLで別枠とする
            var armDAupNormal = (normalNite + normalSante > 50.0) ? 50.0 : normalNite + normalSante
            var armDAupMagna = (magnaNite + magnaSante > 50.0) ? 50.0 : magnaNite + magnaSante
            var armDAupBaha = (totals[key]["bahaDA"] > 50.0) ? 50.0 : totals[key]["bahaDA"]
            var armDAupCosmos = (totals[key]["cosmosBL"] > 50.0) ? 50.0 : totals[key]["cosmosBL"]
            // unknownは現状50%に届くことはない
            var totalDA = 0.01 * totals[key]["baseDA"] + buff["da"] + totals[key]["DABuff"] + totalSummon["da"] + 0.01 * (armDAupNormal + armDAupMagna + unknownOtherNite + armDAupBaha + armDAupCosmos)

            var armTAupNormal = (normalSante > 50.0) ? 50.0 : normalSante
            var armTAupMagna  = (magnaSante > 50.0)  ? 50.0 : magnaSante
            var armTAupBaha = (totals[key]["bahaTA"] > 50.0) ? 50.0 : totals[key]["bahaTA"]
            var totalTA = 0.01 * totals[key]["baseTA"] + buff["ta"] + totals[key]["TABuff"] + totalSummon["ta"] + 0.01 * (armTAupNormal + armTAupMagna + armTAupBaha)

            var taRate = (parseFloat(totalTA) >= 1.0) ? 1.0 : parseFloat(totalTA)
            var daRate = (parseFloat(totalDA) >= 1.0) ? 1.0 : parseFloat(totalDA)
            var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))

            if(totals[key]["typeBonus"] != 1.5) {
                var criticalRatio = 1.0
            } else {
                var criticalRatio = this.calculateCriticalRatio(totals[key]["normalCritical"], totals[key]["magnaCritical"], totals[key]["normalSetsuna"], totals[key]["magnaSetsuna"], totals[key]["normalKatsumi"], totalSummon)
            }
            var criticalAttack = parseInt(totalAttack * criticalRatio)
            var expectedOugiGage = (buff["ougiGage"] - totals[key]["ougiDebuff"]) * (taRate * 37.0 + (1.0 - taRate) * (daRate * 22.0 + (1.0 - daRate) * 10.0))
            var expectedTurn = Math.ceil(100.0 / expectedOugiGage)

            // damageは追加ダメージなしの単攻撃ダメージ(減衰・技巧補正あり)
            var damage = this.calculateDamage(criticalRatio * totalAttack, prof.enemyDefense)

            // クリティカル無しの場合のダメージを技巧期待値の補正に使う
            var damageWithoutCritical = this.calculateDamage(totalAttack, prof.enemyDefense)
            // 実質の技巧期待値
            var effectiveCriticalRatio = damage/damageWithoutCritical

            // 追加ダメージ(%)分だけ追加
            if(totals[key]["additionalDamage"] > 0) {
                damage += 0.01 * totals[key]["additionalDamage"] * damage
            }
            var ougiDamage = this.calculateOugiDamage(criticalRatio * totalAttack, prof.enemyDefense, prof.ougiRatio)
            var expectedCycleDamage = ougiDamage + expectedTurn * expectedAttack * damage
            var expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1)

            var nazo_number = parseInt(totalAttack * criticalRatio * expectedAttack)

            // 表示用配列
            var coeffs = {};
            coeffs["normal"] = normalCoeff;
            coeffs["normalHaisui"] = normalHaisuiCoeff;
            coeffs["normalKonshin"] = normalKonshinCoeff;
            coeffs["magna"] = magnaCoeff;
            coeffs["magnaHaisui"] = magnaHaisuiCoeff;
            coeffs["element"] = elementCoeff;
            coeffs["unknown"] = unknownCoeff;
            coeffs["unknownHaisui"] = unknownHaisuiCoeff;
            coeffs["other"] = otherCoeff;

            res[key] = {totalAttack: Math.ceil(totalAttack), displayAttack: Math.ceil(summedAttack), totalHP: Math.round(totalHP), displayHP: Math.round(displayHP), remainHP: totals[key]["remainHP"], totalDA: totalDA, totalTA: totalTA, totalSummon: totalSummon, element: totals[key]["element"], expectedAttack: expectedAttack, criticalAttack: criticalAttack, criticalRatio: criticalRatio, effectiveCriticalRatio: effectiveCriticalRatio, totalExpected: nazo_number, skilldata: coeffs, expectedOugiGage: expectedOugiGage, damage: damage, ougiDamage: ougiDamage, expectedTurn: expectedTurn, expectedCycleDamagePerTurn: expectedCycleDamagePerTurn};
        }
        var average = 0.0;
        var crit_average = 0.0;
        var totalExpected_average = 0.0;
        var averageCyclePerTurn = 0.0;

        var cnt = 0.0
        for(key in res) {
            if(totals[key]["isConsideredInAverage"]) {
                average += res[key].totalAttack
                crit_average += res[key].criticalAttack
                totalExpected_average += res[key].totalExpected
                averageCyclePerTurn += res[key].expectedCycleDamagePerTurn
                cnt += 1.0
            }
        }
        res["Djeeta"]["averageAttack"] = parseInt(average/cnt)
        res["Djeeta"]["averageCriticalAttack"] = parseInt(crit_average/cnt)
        res["Djeeta"]["averageTotalExpected"] = parseInt(totalExpected_average/cnt)
        res["Djeeta"]["averageCyclePerTurn"] = parseInt(averageCyclePerTurn/cnt)
        return res
    },
    calculateCriticalRatio: function(_normalCritical, _magnaCritical, _normalSetsuna, _magnaSetsuna, _normalKatsumi, summon) {
        var magnaCritical = 0.01 * _magnaCritical * summon["magna"]
        var normalCritical = 0.01 * _normalCritical * summon["zeus"]
        var gikouArray = []

        if(normalCritical > 1.0) {
            gikouArray.push(1.0);
        } else if (normalCritical > 0.0) {
            gikouArray.push(normalCritical);
        }

        if(magnaCritical > 1.0) {
            gikouArray.push(1.0);
        } else if (magnaCritical > 0.0) {
            gikouArray.push(magnaCritical);
        }

        // 刹那と克己は[確率1, 確率2, 確率3, ... ]という形式で渡される
        for(var j = 0; j < _normalSetsuna.length; j++){
            // 技巧と刹那は単体スキルなので1.0以上の値が来ないか確認しなくて良い
            gikouArray.push(0.01 * _normalSetsuna[j] * summon["zeus"]);
        }

        for(var j = 0; j < _normalKatsumi.length; j++){
            gikouArray.push(0.01 * _normalKatsumi[j] * summon["zeus"]);
        }

        var criticalRatio = 0.0
        // 最大10要素の技巧配列が来る、それぞれ発動率は違うこともある [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // n要素とした時、最大2^n個の発動確率がある
        // {発動率: {発動本数: x, ケース: 1}}という配列にすればそのあとkeysを使うことで期待値が出せる
        if(gikouArray.length > 0){
            var bitmask = []
            var criticalRatioArray = {}
            for(var i = 0; i < gikouArray.length; i++) {
                bitmask.push(1 << i);
            }

            for(var i = 0; i < Math.pow(2, gikouArray.length); i++) {
                var ratio = 1.0
                var cnt = 0

                for(var j = 0; j < gikouArray.length; j++) {
                    if((bitmask[j] & i) > 0) {
                        // j番目の技巧が発動
                        ratio *= gikouArray[j]
                        cnt += 1
                    } else {
                        // j番目の技巧は非発動
                        ratio *= 1.0 - gikouArray[j]
                    }
                }

                // ここまでである1ケースの発動率が算出できた
                if(ratio > 0.0) {
                    if(ratio > 1.0) ratio = 1.0

                    if(!(ratio in criticalRatioArray)) {
                        // ratioが存在しない場合
                        criticalRatioArray[ratio] = {"cnt": cnt, "case": 1}
                    } else {
                        // ratioが存在する場合
                        criticalRatioArray[ratio]["case"] += 1
                    }
                }
            }

            // ここまでで全てのケースについて算出できた
            for(var ratio in criticalRatioArray) {
                criticalRatio += (1.0 + 0.5 * criticalRatioArray[ratio]["cnt"]) * criticalRatioArray[ratio]["case"] * ratio
            }
        } else {
            criticalRatio = 1.0
        }

        return criticalRatio
    },
    calculateDamage: function(totalAttack, enemyDefense) {
        // ダメージ計算
        var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
        var damage = totalAttack / def
        var overedDamage = 0
        // 補正1
        if(damage > 612500) {
            overedDamage += 0.01 * (damage - 612500)
            damage = 612500
        }
        // 補正2
        if(damage > 550000) {
            overedDamage += 0.10 * (damage - 550000)
            damage = 550000
        }
        // 補正3
        if(damage > 425000) {
            overedDamage += 0.40 * (damage - 425000)
            damage = 425000
        }
        // 補正4
        if(damage > 300000) {
            overedDamage += 0.70 * (damage - 300000)
            damage = 300000
        }

        return damage + overedDamage
    },
    calculateOugiDamage: function(totalAttack, enemyDefense, ougiRatio) {
        // ダメージ計算
        var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
        var ratio = (ougiRatio == undefined) ? 4.5 : ougiRatio
        var damage = totalAttack * ratio / def
        var overedDamage = 0
        // 補正1
        if(damage > 1400000) {
            overedDamage += 0.01 * (damage - 1400000)
            damage = 1400000
        }
        // 補正2
        if(damage > 1300000) {
            overedDamage += 0.05 * (damage - 1300000)
            damage = 1300000
        }
        // 補正3
        if(damage > 1150000) {
            overedDamage += 0.40 * (damage - 1150000)
            damage = 1150000
        }
        // 補正4
        if(damage > 1000000) {
            overedDamage += 0.60 * (damage - 1000000)
            damage = 1000000
        }

        return damage + overedDamage
    },
    calculateOneCombination: function(comb, summon, prof, arml, totals, buff){
        this.addSkilldataToTotals(totals, comb, arml, buff)
        var result = []
        for(var i = 0; i < summon.length; i++){
           // 攻撃などの結果を入れた連想配列の配列を作る
           result.push(this.calculateBasedOneSummon(i, prof, buff, totals));
        }

        return result
    },
    addSkilldataToTotals: function(totals, comb, arml, buff) {
        // cosmos武器があるかどうかを確認しておく
        var cosmosType = '';
        for(var i = 0; i < arml.length; i++){
            if(comb[i] > 0) {
                var arm = arml[i];
                if(this.isCosmos(arm)) {
                    if(skilltypes[arm.skill1].type == "cosmosArm") {
                        cosmosType = skilltypes[arm.skill1].cosmosArm
                    } else {
                        cosmosType = skilltypes[arm.skill2].cosmosArm
                    }
                }
            }
        }

        var index = 0;
        for( key in totals ) {
            index = (index + 1)|0;
            var isBahaAtIncluded = false; var isBahaAthpIncluded = false; var isBahaHpIncluded = false;

            for(var i = 0; i < arml.length; i++){
                if(comb[i] == 0) continue

                var arm = arml[i];
                var armSup= 1.0
                var hpSup = 1.0

                if (arm.armType == cosmosType){
                    armSup += 0.3
                    hpSup += 0.3
                }

                if( key == "Djeeta" ) {
                    // for Djeeta
                    if(arm.armType == totals[key]["fav1"] && arm.armType == totals[key]["fav2"]){
                        armSup += (0.2 + buff["zenith1"] + buff["zenith2"])
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav1"]){
                        armSup += (0.2 + buff["zenith1"])
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav2"]){
                        armSup += (0.2 + buff["zenith2"])
                        hpSup += 0.2
                    }
                } else {
                    // for chara
                    if(arm.armType == totals[key]["fav1"]){
                        armSup += 0.2
                        hpSup += 0.2
                    } else if(arm.armType == totals[key]["fav2"]){
                        armSup += 0.2
                        hpSup += 0.2
                    }
                }

                totals[key]["armAttack"] += armSup * parseInt(arm.attack) * comb[i]
                totals[key]["armHP"] += hpSup * parseInt(arm.hp) * comb[i]

                for(var j = 1; j <= 2; j++){
                    var skillname = '';
                    var element = ''; (arm.element == undefined) ? "fire" : arm.element
                    if(j == 1) {
                        skillname = arm.skill1
                        element = (arm.element == undefined) ? "fire" : arm.element
                    } else {
                        skillname = arm.skill2
                        element = (arm.element2 == undefined) ? "fire" : arm.element2
                    }

                    if(skillname != 'non'){
                        // 古いデータ用の対応
                        if(skillname == "bahaAT" || skillname == "bahaFUATHP") {
                            skillname += "-dagger"
                        } else if (skillname == "bahaATHP") {
                            skillname += "-sword"
                        }
                        var stype = skilltypes[skillname].type;
                        var amount = skilltypes[skillname].amount;
                        var slv = parseInt(arm.slv)

                        // mask invalid slv
                        if(slv == 0) slv = 1

                        // バハとコスモスは属性関係なし
                        if(stype == 'bahaAT') {
                            if(!isBahaAtIncluded) {
                                // バハ短剣など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    isBahaAtIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        isBahaAtIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaATHP') {
                            if(!isBahaAthpIncluded) {
                                // バハ剣など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaAthpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                        totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaAT"][amount][slv - 1];
                                        totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaAthpIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaHP') {
                            if(!isBahaHpIncluded) {
                                // バハ拳など
                                if(totals[key]["race"] == "unknown") {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                    isBahaHpIncluded = true;
                                } else {
                                    var bahatype = skillname.split("-")
                                    if( bahamutRelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutRelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                        totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaHP"][amount][slv - 1];
                                        isBahaHpIncluded = true;
                                    }
                                }
                            }
                        } else if(stype == 'bahaFUATHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaAT"] += comb[i] * skillAmounts["bahaFUATHP"]["AT"][slv - 1];
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUATHP"]["HP"][slv - 1];
                                }
                            }
                        } else if(stype == 'bahaFUHP') {
                            if(totals[key]["race"] == "unknown") {
                                totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                            } else {
                                var bahatype = skillname.split("-")
                                if( bahamutFURelation[bahatype[1]]["type1"] == totals[key]["race"] || bahamutFURelation[ bahatype[1]]["type2"] == totals[key]["race"] ) {
                                    totals[key]["bahaHP"] += comb[i] * skillAmounts["bahaFUHP"]["HP"][slv - 1];
                                    totals[key]["bahaDA"] += comb[i] * skillAmounts["bahaFUHP"]["DA"][slv - 1];
                                    totals[key]["bahaTA"] += comb[i] * skillAmounts["bahaFUHP"]["TA"][slv - 1];
                                }
                            }
                        } else if(stype == 'cosmos') {
                            // コスモス武器
                            if(skillname == 'cosmosAT' && totals[key]["type"] == "attack") {
                                totals[key]["normal"] += comb[i] * 20.0;
                                totals[key]["HPdebuff"] += comb[i] * 0.40
                            } else if(skillname == 'cosmosDF' && totals[key]["type"] == "defense") {
                                totals[key]["HPdebuff"] -= comb[i] * 0.10
                            } else if(skillname == 'cosmosBL' && totals[key]["type"] == "balance") {
                                totals[key]["cosmosBL"] = comb[i] * 20.0
                            }
                        } else if(stype == 'cosmosArm') {
                            // コスモス武器スキルはスキップ
                        } else if(totals[key]["element"] == element){
                            // 属性一致してれば計算

                            if(stype == 'normalHaisui' || stype == 'magnaHaisui' || stype == 'unknownOtherHaisui'){
                                // 背水倍率の実装は日比野さんのところのを参照
                                var remainHP = totals[key]["remainHP"]
                                var baseRate = 0.0
                                if(amount == "S") {
                                    // 小
                                    if(slv < 10) {
                                        baseRate = -0.3 + slv * 1.8;
                                    } else {
                                        baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else if ( amount == "M" ){
                                    // 中
                                    if(slv < 10) {
                                        baseRate = -0.4 + slv * 2.4;
                                    } else {
                                        baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else {
                                    // 大
                                    if(slv < 10) {
                                        baseRate = -0.5 + slv * 3.0;
                                    } else {
                                        baseRate = 30 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                }
                                var haisuiBuff = (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
                                totals[key][stype] += comb[i] * haisuiBuff
                            } else if(stype == 'normalKonshin'){
                                var remainHP = totals[key]["remainHP"]
                                var baseRate = 0.0
                                if(amount == "S") {
                                    // 小
                                    if(slv < 10) {
                                        baseRate = -0.3 + slv * 1.8;
                                    } else {
                                        baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else if ( amount == "M" ){
                                    // 中
                                    if(slv < 10) {
                                        baseRate = -0.4 + slv * 2.4;
                                    } else {
                                        baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                    }
                                } else {
                                    if(slv <= 10) {
                                        baseRate = 10.0 + slv * 1.0;
                                    } else {
                                        baseRate = 20.0 + ((slv - 10) * 0.6);
                                    }
                                }
                                var konshinBuff = baseRate * remainHP
                                totals[key][stype] += comb[i] * konshinBuff
                            } else if(stype == 'normalKamui') {
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                totals[key]["normalHP"] += comb[i] * skillAmounts["normalHP"][amount][slv - 1];
                            } else if(stype == 'magnaKamui') {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                totals[key]["magnaHP"] += comb[i] * skillAmounts["magnaHP"][amount][slv - 1];
                            } else if(stype == 'normalSetsuna') {
                                // totals[key]["normalCritical"] += comb[i] * skillAmounts["normalCritical"][amount][slv - 1];
                                // 通常刹那は複数発動するので確率を加算しないで残しておく
                                for(var setu = 0; setu < comb[i]; setu++){
                                    totals[key]["normalSetsuna"].push(skillAmounts["normalCritical"][amount][slv - 1]);
                                }
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaSetsuna') {
                                totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                                // お前は仲間外れなんだぞ
                                // for(var setu = 0; setu < comb[i]; setu++){
                                //     totals[key]["magnaSetsuna"].push(skillAmounts["magnaCritical"][amount][slv - 1]);
                                // }
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'normalKatsumi') {
                                // totals[key]["normalCritical"] += comb[i] * skillAmounts["normalCritical"][amount][slv - 1];
                                for(var setu = 0; setu < comb[i]; setu++){
                                    totals[key]["normalKatsumi"].push(skillAmounts["normalCritical"][amount][slv - 1]);
                                }
                                totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                            } else if(stype == 'magnaKatsumi') {
                                totals[key]["magnaCritical"] += comb[i] * skillAmounts["magnaCritical"][amount][slv - 1];
                                totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                            } else if(stype == 'normalBoukun') {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                            } else if(stype == 'magnaBoukun') {
                                totals[key]["HPdebuff"] += comb[i] * 0.10
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                            } else if(stype == 'unknownOtherBoukun'){
                                totals[key]["HPdebuff"] += comb[i] * 0.07
                                totals[key]["unknown"] += comb[i] * skillAmounts["unknown"][amount][slv - 1];
                            } else if(stype == 'gurenJuin'){
                                if(index == 2){
                                    totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                }
                            } else if(stype == 'muhyoTuiga'){
                                if(index == 4){
                                    totals[key]["additionalDamage"] += comb[i] * slv;
                                    totals[key]["ougiDebuff"] += comb[i] * 0.30;
                                }
                            } else {
                                totals[key][stype] += comb[i] * skillAmounts[stype][amount][slv - 1];
                            }
                        }
                    }
                }
            }

            // バハ武器重複上限
            if(totals[key]["bahaAT"] > 50) totals[key]["bahaAT"] = 50
            if(totals[key]["bahaHP"] > 50) totals[key]["bahaHP"] = 50
        }
    },
    initializeTotals: function(totals) {
        // 初期化
        for(key in totals){
            totals[key]["armAttack"] = 0; totals[key]["armHP"] = 0;
            totals[key]["HPdebuff"] = 0; totals[key]["magna"] = 0;
            totals[key]["magnaHaisui"] = 0; totals[key]["normal"] = 0;
            totals[key]["normalHaisui"] = 0; totals[key]["normalKonshin"] = 0;
            totals[key]["unknown"] = 0; totals[key]["unknownOther"] = 0;
            totals[key]["unknownOtherHaisui"] = 0; totals[key]["bahaAT"] = 0;
            totals[key]["bahaHP"] = 0; totals[key]["bahaDA"] = 0;
            totals[key]["bahaTA"] = 0; totals[key]["magnaHP"] = 0;
            totals[key]["normalHP"] = 0; totals[key]["unknownHP"] = 0;
            totals[key]["normalNite"] = 0; totals[key]["magnaNite"] = 0;
            totals[key]["normalSante"] = 0; totals[key]["magnaSante"] = 0;
            totals[key]["unknownOtherNite"] = 0; totals[key]["normalCritical"] = 0;
            totals[key]["magnaCritical"] = 0; totals[key]["cosmosBL"] = 0;
            totals[key]["additionalDamage"] = 0; totals[key]["ougiDebuff"] = 0;
            totals[key]["normalSetsuna"] = []; totals[key]["magnaSetsuna"] = [];
            totals[key]["normalKatsumi"] = [];
        }
    },
    getTotalBuff: function(prof) {
        var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hp: 0.0, da: 0.0, ta: 0.0, ougiGage: 1.0};

        if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
        if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
        if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
        if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseInt(prof.daBuff);
        if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseInt(prof.taBuff);
        if(!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
        totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
        totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
        totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
        totalBuff["zenith1"] += zenith[prof.zenithBonus1];
        totalBuff["zenith2"] += zenith[prof.zenithBonus2];

        return totalBuff
    },
    getInitialTotals: function(prof, chara, summon) {
        var baseAttack = (prof.rank > 100) ? 5000 + (parseInt(prof.rank) - 100) * 20 : 1000 + (parseInt(prof.rank)) * 40
        var baseHP = (prof.rank > 100) ? 1400 + (parseInt(prof.rank) - 100) * 4.0 : 600 + (parseInt(prof.rank)) * 8
        var element = (prof.element == undefined) ? "fire" : prof.element
        var djeetaRemainHP = (prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp)
        var djeetaDA = (prof.DA == undefined) ? 6.5 : parseFloat(prof.DA)
        var djeetaTA = (prof.TA == undefined) ? 3.0 : parseFloat(prof.TA)
        var job = (prof.job == undefined) ? Jobs["none"] : Jobs[prof.job]
        var zenithATK = (prof.zenithAttackBonus == undefined) ? 3000 : parseInt(prof.zenithAttackBonus)
        var zenithHP = (prof.zenithHPBonus == undefined) ? 1000 : parseInt(prof.zenithHPBonus)

        var totals = {"Djeeta": {baseAttack: baseAttack, baseHP: baseHP, baseDA: djeetaDA, baseTA: djeetaTA, remainHP: djeetaRemainHP, armAttack: 0, armHP:0, fav1: job.favArm1, fav2: job.favArm2, race: "unknown", type: job.type, element: element, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, normalSetsuna: [], magnaSetsuna: [], normalKatsumi: [], cosmosBL: 0, additionalDamage: 0, ougiDebuff: 0, isConsideredInAverage: true, job: job, zenithATK: zenithATK, zenithHP: zenithHP, normalBuff: 0, elementBuff: 0, otherBuff: 0, DABuff: 0, TABuff: 0}};

        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "") {
                var charaelement = (chara[i].element == undefined) ? "fire" : chara[i].element
                var charaDA = (chara[i].DA == undefined) ? 6.5 : chara[i].DA
                var charaTA = (chara[i].TA == undefined) ? 3.0 : chara[i].TA
                var charaRemainHP = (chara[i].remainHP != undefined && parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(chara[i].remainHP) : 0.01 * parseInt(prof.hp)
                var charaConsidered = (chara[i].isConsideredInAverage == undefined) ? true : chara[i].isConsideredInAverage

                // key 重複対応
                var charakey = chara[i].name;
                var k = 1;
                while(charakey in totals) {
                    charakey = chara[i].name + k
                        k++;
                }

                totals[charakey] = {baseAttack: parseInt(chara[i].attack), baseHP: parseInt(chara[i].hp), baseDA: parseFloat(charaDA), baseTA: parseFloat(charaTA), remainHP: charaRemainHP, armAttack: 0, armHP:0, fav1: chara[i].favArm, fav2: chara[i].favArm2, race: chara[i].race, type: chara[i].type, element: charaelement, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, normalSetsuna: [], magnaSetsuna: [], normalKatsumi: [], cosmosBL: 0, additionalDamage: 0, ougiDebuff: 0, isConsideredInAverage: charaConsidered, normalBuff: 0, elementBuff: 0, otherBuff: 0, DABuff: 0, TABuff: 0}
            }
        }
        for(key in totals) {
            totals[key]["totalSummon"] = []
            for(var s = 0; s < summon.length; s++) {
                var selfElement = (summon[s].selfElement == undefined) ? "fire" : summon[s].selfElement
                var friendElement = (summon[s].friendElement == undefined) ? "fire" : summon[s].friendElement

                var totalSummon = {magna: 1.0, element: 1.0, elementTurn: 1.0, zeus: 1.0, chara: 0.0, ranko: 1.0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};

                if((summonElementTypes[selfElement]["type"].indexOf(totals[key]["element"]) >= 0) || selfElement == "all" ){
                    if(summon[s].selfSummonType == "odin") {
                        // odin(属性+キャラ攻撃)など、複数の場合の処理
                        totalSummon["element"] += 0.01 * parseInt(summon[s].selfSummonAmount)
                        totalSummon["chara"] += 0.01 * parseInt(summon[s].selfSummonAmount2)
                    } else {
                        // 自分の加護 通常の場合
                        totalSummon[summon[s].selfSummonType] += 0.01 * parseInt(summon[s].selfSummonAmount)
                    }
                }
                if((summonElementTypes[friendElement]["type"].indexOf(totals[key]["element"]) >= 0) || friendElement == "all" ){
                    if(summon[s].friendSummonType == "odin") {
                        // odin(属性+キャラ攻撃)など、複数の場合の処理
                        totalSummon["element"] += 0.01 * parseInt(summon[s].friendSummonAmount)
                        totalSummon["chara"] += 0.01 * parseInt(summon[s].friendSummonAmount2)
                    } else {
                        // フレンドの加護 通常の場合
                        totalSummon[summon[s].friendSummonType] += 0.01 * parseInt(summon[s].friendSummonAmount)
                    }
                }

                // 後から追加したので NaN でないか判定しておく
                if(!isNaN(summon[s].attack)) totalSummon["attack"] = parseInt(summon[s].attack)
                if(!isNaN(summon[s].hp)) totalSummon["hp"] = parseInt(summon[s].hp)
                if(!isNaN(summon[s].hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon[s].hpBonus)
                if(!isNaN(summon[s].DA)) totalSummon["da"] = 0.01 * parseInt(summon[s].DA)
                if(!isNaN(summon[s].TA)) totalSummon["ta"] = 0.01 * parseInt(summon[s].TA)

                totals[key]["totalSummon"][s] = totalSummon
            }
        }

        for(key in totals){
            totals[key]["typeBonus"] = this.getTypeBonus(totals[key]["element"], prof)
        }

        return totals
    },
    calculateResult: function(newprops) {
      var prof = newprops.data.profile; var arml = newprops.data.armlist;
      var summon = newprops.data.summon; var chara = newprops.data.chara;

      if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
          var totalBuff = this.getTotalBuff(prof)

          // 後から追加したパラメータはNaNなことがあるので追加処理
          // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
          var sortkey = "totalAttack"
          var sortkeyname = "攻撃力(二手技巧無し,ジータさんのみ)"
          if(newprops.data.sortKey == newprops.data.sortKey) {
              sortkey = newprops.data.sortKey
              sortkeyname = keyTypes[sortkey]
          }

          // combinationsが変更されていないなら古いやつを使う
          if(this.state.previousArmlist != null) {
              var isCombinationChanged = false;
              if(this.state.previousArmlist.length != arml.length) {
                  isCombinationChanged = true;
              }
              if(!isCombinationChanged) {
                  for(var i = 0; i < arml.length; i = (i + 1)|0){
                      if(arml[i].considerNumberMax != this.state.previousArmlist[i].considerNumberMax || arml[i].considerNumberMin != this.state.previousArmlist[i].considerNumberMin) {
                          isCombinationChanged = true;
                      }
                      // コスモス武器になったか、コスモス武器じゃなくなったかでコンビネーションが変わる
                      if(this.isCosmos(arml[i]) != this.isCosmos(this.state.previousArmlist[i])) {
                          isCombinationChanged = true;
                      }
                  }
              }
              if(isCombinationChanged) {
                  var combinations = this.calculateCombinations(arml)
                  this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
                  this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
              } else {
                  var combinations = this.state.previousCombinations
              }
          } else {
              var combinations = this.calculateCombinations(arml)
              this.setState({previousArmlist: JSON.parse(JSON.stringify(arml))})
              this.setState({previousCombinations: JSON.parse(JSON.stringify(combinations))})
          }

          var res = []
          var minSortKey = []
          for(var i = 0; i < summon.length; i++){
              res[i] = []
              minSortKey[i] = -1
          }

          var totals = this.getInitialTotals(prof, chara, summon)
          var itr = combinations.length
          var totalItr = itr * summon.length * Object.keys(totals).length

          // 前処理に必要な値があればここで用意
          var minHP = (prof.minimumHP == undefined) ? undefined : parseInt(prof.minimumHP)

          for(var i = 0; i < itr; i = (i + 1)|0){
              var oneres = this.calculateOneCombination(combinations[i], summon, prof, arml, totals, totalBuff)
              for(var j = 0; j < summon.length; j++){
                  // 各結果に対して前処理
                  if(this.isValidResult(oneres[j], minHP)) {
                      if(res[j].length < 10) {
                          //  まずminSortkeyを更新する
                          if (minSortKey[j] < 0 || minSortKey[j] > oneres[j].Djeeta[sortkey]) {
                              minSortKey[j] = oneres[j].Djeeta[sortkey]
                          }
                          res[j].push({data: oneres[j], armNumbers: combinations[i]});
                      } else {
                          // minSortkey より大きいものだけpush
                          if (oneres[j].Djeeta[sortkey] >= minSortKey[j]) {
                              // 11番目に追加する
                              res[j].push({data: oneres[j], armNumbers: combinations[i]});

                              // 10番目まででminSortkey[j]と一致するものを消す
                              var spliceid = -1;
                              for(var k = 0; k < 10; k = (k + 1)|0) {
                                  if(res[j][k].data.Djeeta[sortkey] == minSortKey[j]) {
                                      spliceid = k
                                  }
                              }
                              res[j].splice(spliceid, 1)
                              minSortKey[j] = -1

                              // 10個の配列になったので、もう一度最小値を計算する
                              for(var k = 0; k < 10; k = (k + 1)|0) {
                                  if (minSortKey[j] < 0 || minSortKey[j] > res[j][k].data.Djeeta[sortkey]) {
                                      minSortKey[j] = res[j][k].data.Djeeta[sortkey]
                                  }
                              }
                          }
                      }
                  }
              }
              this.initializeTotals(totals)
          }
          // この時点で summonres は"各召喚石に対応する結果データの連想配列 を並べた配列"の配列になっているはず

          for(var i = 0; i < summon.length; i++){
              if(sortkey == "ATKandHP") {
                  res[i].sort(function(a, b){
                      if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) < (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return  1;
                      if((a.data.Djeeta.displayAttack + a.data.Djeeta.displayHP) > (b.data.Djeeta.displayAttack + b.data.Djeeta.displayHP)) return -1;
                      return 0;
                  });
              }else {
                  res[i].sort(function(a, b){
                      if(a["data"]["Djeeta"][sortkey] < b["data"]["Djeeta"][sortkey]) return  1;
                      if(a["data"]["Djeeta"][sortkey] > b["data"]["Djeeta"][sortkey]) return -1;
                      return 0;
                  });
              }
              while(res[i].length > 10){ res[i].pop(); }
          }

          return {summon: summon, result: res, sortkeyname: sortkeyname, totalItr: totalItr}
      } else {
          return {summon: summon, result: []}
      }
    },
    getInitialState: function() {
        return {
            switchTotalAttack: 1,
            switchATKandHP: 0,
            switchHP: 0,
            switchCharaHP: 0,
            switchDATA: 0,
            switchExpectedAttack: 0,
            switchSkillTotal: 0,
            switchCharaExpectedAttack: 0,
            switchCriticalRatio: 0,
            switchCriticalAttack: 0,
            switchCharaAttack: 0,
            switchCharaDA: 0,
            switchCharaTotalExpected: 0,
            switchAverageAttack: 0,
            switchAverageCriticalAttack: 0,
            switchTotalExpected: 0,
            switchAverageTotalExpected: 0,
            switchDamage: 0,
            switchOugiGage: 0,
            switchOugiDamage: 0,
            switchCycleDamage: 1,
            switchAverageCycleDamage: 0,
            disableAutoResultUpdate: 0,
            result: {summon: this.props.data.summon, result: []},
            chartSortKey: "totalAttack",
            chartData: {},
            storedList: {"combinations": [], "armlist": []},
            openHPChart: false,
            openTurnChart: false,
            openSimulator: false,
            openHPChartTutorial: false,
            ChartButtonActive: false,
            previousArmlist: null,
            previousCombinations: null,
        };
    },
    closeHPChart: function() {
        this.setState({openHPChart: false})
    },
    closeTurnChart: function() {
        this.setState({openTurnChart: false})
    },
    closeSimulator: function() {
        this.setState({openSimulator: false})
    },
    closeHPChartTutorial: function() {
        this.setState({openHPChartTutorial: false})
    },
    openHPChartTutorial: function() {
        this.setState({openHPChartTutorial: true})
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.state.disableAutoResultUpdate != 1 && (nextProps.data.noResultUpdate == undefined || !nextProps.data.noResultUpdate)){
            var allresult = this.calculateResult(nextProps);
            this.setState({result: allresult});
        }

        // armlistが変更されていないかcheck => 変更されてたら今までの分消す
        var isArmValid = true
        for(var i = 0; i < this.state.storedList.combinations.length; i++) {
            if(nextProps.data.armlist.length != this.state.storedList.armlist[i].length) {
                isArmValid = false
                continue;
            }
            for(var k = 0; k < nextProps.data.armlist.length; k++){
                // 名前と攻撃力が同時に変更されていた場合、削除や追加などが起こっていると予想される
                if(nextProps.data.armlist[k].name != this.state.storedList.armlist[i][k].name && nextProps.data.armlist[k].attack != this.state.storedList.armlist[i][k].attack ) {
                    isArmValid = false
                    break;
                }
            }
        }
        if(!isArmValid){
            this.setState({storedList: {"combinations": [], "armlist": []}})
            this.setState({ChartButtonActive: false})
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = (newState[key] == 0) ? 1 : 0

        // 自動更新ONにしたらUPDATEする
        if(key == "disableAutoResultUpdate" && newState[key] == 0){
            newState["result"] = this.calculateResult(this.props)
        }
        this.setState(newState)
    },
    openHPChart: function() {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.data.profile; var arml = this.props.data.armlist;
        var summon = this.props.data.summon; var chara = this.props.data.chara;
        var totalBuff = this.getTotalBuff(prof)
        var totals = this.getInitialTotals(prof, chara, summon)

        var sortkey = "totalAttack"
        var sortkeyname = "攻撃力(二手技巧無し)"
        if(this.props.data.sortKey == this.props.data.sortKey) {
            sortkey = this.props.data.sortKey
            sortkeyname = keyTypes[sortkey]
        }

        var res = []
        for(var i = 0; i < summon.length; i++){
            res[i] = []
        }

        for(var i = 0; i < storedCombinations.length; i++){
            var oneres = this.calculateOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
            for(var j = 0; j < summon.length; j++){
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            this.initializeTotals(totals)
        }
        // resに再計算されたデータが入っている状態
        // res[summonind][rank]
        this.setState({chartData: this.generateHaisuiData(res, arml, summon, prof, chara, storedCombinations)})
        this.setState({chartSortKey: sortkey})
        this.setState({openHPChart: true})
    },
    generateHaisuiData: function(res, arml, summon, prof, chara, storedCombinations) {
        var data = {}
        var minMaxArr = {
            "totalAttack": {"max": 0, "min": 0},
            "totalHP": {"max": 0, "min": 0},
            "criticalAttack": {"max": 0, "min": 0},
            "totalExpected": {"max": 0, "min": 0},
            "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
            "averageAttack": {"max": 0, "min": 0},
            "averageTotalExpected": {"max": 0, "min": 0},
            "averageCyclePerTurn": {"max": 0, "min": 0},
            "averageCriticalAttack": {"max": 0, "min": 0},
        }
        var cnt = 1
        var considerAverageArray = {}
        for(var ch = 0; ch < chara.length; ch++) {
            var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
            if(charaConsidered && chara[ch].name != "") {
                cnt++;
                considerAverageArray[chara[ch].name] = true
            } else {
                considerAverageArray[chara[ch].name] = false
            }
        }

        if(res.length > 1) {
            var AllTotalAttack = [["残りHP(%)"]];
            var AllCycleDamagePerTurn = [["残りHP(%)"]];
            var AllCriticalAttack = [["残りHP(%)"]];
            var AllTotalExpected = [["残りHP(%)"]];
            var AllAverageTotalAttack = [["残りHP(%)"]];
            var AllAverageTotalExpected = [["残りHP(%)"]];
            var AllAverageCycleDamagePerTurn = [["残りHP(%)"]];
            var AllAverageCriticalAttack = [["残りHP(%)"]];
            var AllTotalHP = [["残りHP(%)"]]

            for(var m = 1; m < 101; m++){
                AllTotalAttack.push([m.toString() + "%"])
                AllCycleDamagePerTurn.push([m.toString() + "%"])
                AllCriticalAttack.push([m.toString() + "%"])
                AllTotalExpected.push([m.toString() + "%"])
                AllTotalHP.push([m.toString() + "%"])
                AllAverageTotalExpected.push([m.toString() + "%"])
                AllAverageTotalAttack.push([m.toString() + "%"])
                AllAverageCycleDamagePerTurn.push([m.toString() + "%"])
                AllAverageCriticalAttack.push([m.toString() + "%"])
            }
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].selfSummonAmount + "キャラ攻" + summon[s].selfSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].selfElement].name + summonTypes[summon[s].selfSummonType] + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].friendSummonAmount + "キャラ攻" + summon[s].friendSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].friendElement].name + summonTypes[summon[s].friendSummonType] + summon[s].friendSummonAmount
            }
            var TotalAttack = [["残りHP(%)"]];
            var TotalHP = [["残りHP(%)"]]
            var CriticalAttack = [["残りHP(%)"]];
            var TotalExpected = [["残りHP(%)"]];
            var CycleDamagePerTurn = [["残りHP(%)"]];
            var AverageTotalExpected = [["残りHP(%)"]];
            var AverageTotalAttack = [["残りHP(%)"]];
            var AverageCriticalAttack = [["残りHP(%)"]];
            var AverageCycleDamagePerTurn = [["残りHP(%)"]];

            for(var m = 1; m < 101; m++){
                TotalAttack.push([m.toString() + "%"])
                CycleDamagePerTurn.push([m.toString() + "%"])
                CriticalAttack.push([m.toString() + "%"])
                TotalExpected.push([m.toString() + "%"])
                TotalHP.push([m.toString() + "%"])
                AverageTotalExpected.push([m.toString() + "%"])
                AverageTotalAttack.push([m.toString() + "%"])
                AverageCycleDamagePerTurn.push([m.toString() + "%"])
                AverageCriticalAttack.push([m.toString() + "%"])

                // 合計値を足すために先に要素を追加しておく
                // (key の 処理順が不明のため)
                for(var j = 0; j < oneresult.length; j++){
                    AverageTotalAttack[m].push(0)
                    AverageTotalExpected[m].push(0)
                    AverageCycleDamagePerTurn[m].push(0)
                    AverageCriticalAttack[m].push(0)
                }
            }

            for(var j = 0; j < oneresult.length; j++){
                var onedata = oneresult[j].data

                var title = "No. " + (j+1).toString() + ":"
                for(var i=0; i < arml.length; i++){
                    if(storedCombinations[j][i] > 0) {
                        var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                        title += name + storedCombinations[j][i] + "本\n"
                    }
                }
                for(key in onedata){
                    var totalSummon = onedata[key].totalSummon
                    var normalHaisuiOrig = onedata[key].skilldata.normalHaisui
                    var magnaHaisuiOrig = onedata[key].skilldata.magnaHaisui
                    var normalKonshinOrig = onedata[key].skilldata.normalKonshin
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig)
                    var haisuiBuff = []
                    for(var k = 0; k < 100; k++){
                        haisuiBuff.push({normalHaisui: 1.0, magnaHaisui: 1.0, normalKonshin: 1.0})
                    }
                    for(var i=0; i < arml.length; i++){
                        var arm = arml[i]
                        for(var jj = 1; jj <= 2; jj++){
                            var skillname = '';
                            var element = ''; (arm.element == undefined) ? "fire" : arm.element
                            if(jj == 1) {
                                skillname = arm.skill1
                                element = (arm.element == undefined) ? "fire" : arm.element
                            } else {
                                skillname = arm.skill2
                                element = (arm.element2 == undefined) ? "fire" : arm.element2
                            }

                            if(skillname != 'non' && onedata[key].element == element){
                                var stype = skilltypes[skillname].type;
                                var amount = skilltypes[skillname].amount;
                                var slv = parseInt(arm.slv)

                                // mask invalid slv
                                if(slv == 0) slv = 1

                                if(stype == "normalHaisui" || stype == "magnaHaisui"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)
                                        var baseRate = 0.0
                                        if(amount == "S") {
                                            // 小
                                            if(slv < 10) {
                                                baseRate = -0.3 + slv * 1.8;
                                            } else {
                                                baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                            }
                                        } else if ( amount == "M" ){
                                            // 中
                                            if(slv < 10) {
                                                baseRate = -0.4 + slv * 2.4;
                                            } else {
                                                baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                            }
                                        } else {
                                            // 大
                                            if(slv < 10) {
                                                baseRate = -0.5 + slv * 3.0;
                                            } else {
                                                baseRate = 30 + 3.0 * ((slv - 10) / 5.0)
                                            }
                                        }
                                        if(stype == "normalHaisui") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 ) * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 ) * totalSummon.magna
                                        }
                                    }
                                } else if(stype == "normalKonshin" || stype == "magnaKonshin"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)
                                        var baseRate = 0.0
                                        if(amount == "S") {
                                            // 小
                                            if(slv < 10) {
                                                baseRate = -0.3 + slv * 1.8;
                                            } else {
                                                baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                            }
                                        } else if ( amount == "M" ){
                                            // 中
                                            if(slv < 10) {
                                                baseRate = -0.4 + slv * 2.4;
                                            } else {
                                                baseRate = 24 + 3.0 * ((slv - 10) / 5.0)
                                            }
                                        } else {
                                            if(slv <= 10) {
                                                baseRate = 10.0 + slv * 1.0;
                                            } else {
                                                baseRate = 20.0 + ((slv - 10) * 0.6);
                                            }
                                        }
                                        if(stype == "normalKonshin") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * baseRate * remainHP * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * baseRate * remainHP * totalSummon.magna
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for(var k = 0; k < 100; k++){
                        var newTotalAttack = totalAttackWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin
                        var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack
                        var newDamage = this.calculateDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense)
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio)
                        var newExpectedCycleDamagePerTurn = (newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                        if(key == "Djeeta") {
                            TotalAttack[k + 1].push( parseInt(newTotalAttack) )
                            TotalExpected[k + 1].push( parseInt(newTotalExpected) )
                            TotalHP[k + 1].push( parseInt(0.01 * (k + 1) * onedata[key].totalHP) )
                            CriticalAttack[k + 1].push(parseInt(onedata[key].criticalRatio * newTotalAttack))
                            CycleDamagePerTurn[k + 1].push( parseInt(newExpectedCycleDamagePerTurn) )
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageTotalExpected[k + 1][j + 1] += parseInt(newTotalExpected / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        } else if (considerAverageArray[key]) {
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageTotalExpected[k + 1][j + 1] += parseInt(newTotalExpected / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        }
                    }
                }
                TotalAttack[0].push(title)
                TotalHP[0].push(title)
                CriticalAttack[0].push(title)
                TotalExpected[0].push(title)
                CycleDamagePerTurn[0].push(title)
                AverageTotalExpected[0].push(title)
                AverageTotalAttack[0].push(title)
                AverageCycleDamagePerTurn[0].push(title)
                AverageCriticalAttack[0].push(title)

                // 召喚石2組以上の場合
                if(res.length > 1) {
                    AllTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllTotalHP[0].push("(" + summonHeader + ")" + title)
                    AllCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllTotalExpected[0].push("(" + summonHeader + ")" + title)
                    AllCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalExpected[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)

                    for(var k = 1; k < 101; k++) {
                        AllTotalAttack[k].push(TotalAttack[k][j + 1])
                        AllTotalHP[k].push(TotalHP[k][j + 1])
                        AllCriticalAttack[k].push(CriticalAttack[k][j + 1])
                        AllTotalExpected[k].push(TotalExpected[k][j + 1])
                        AllCycleDamagePerTurn[k].push(CycleDamagePerTurn[k][j + 1])
                        AllAverageTotalExpected[k].push(AverageTotalExpected[k][j + 1])
                        AllAverageTotalAttack[k].push(AverageTotalAttack[k][j + 1])
                        AllAverageCriticalAttack[k].push(AverageCriticalAttack[k][j + 1])
                        AllAverageCycleDamagePerTurn[k].push(AverageCycleDamagePerTurn[k][j + 1])
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["totalAttack"] = TotalAttack
            data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
            data[summonHeader]["criticalAttack"] = CriticalAttack
            data[summonHeader]["totalExpected"] = TotalExpected
            data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
            data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
            data[summonHeader]["totalHP"] = TotalHP
        }

        if(res.length > 1){
            data["まとめて比較"] = {}
            data["まとめて比較"]["totalAttack"] = AllTotalAttack
            data["まとめて比較"]["totalHP"] = AllTotalHP
            data["まとめて比較"]["criticalAttack"] = AllCriticalAttack
            data["まとめて比較"]["totalExpected"] = AllTotalExpected
            data["まとめて比較"]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
            data["まとめて比較"]["averageCriticalAttack"] = AllAverageCriticalAttack
            data["まとめて比較"]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
            data["まとめて比較"]["averageTotalExpected"] = AllAverageTotalExpected
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k <= 100; k++){
                    for(var j = 1; j <= res[0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    addHaisuiData: function(id, summonid) {
        var newStored = this.state.storedList
        newStored["combinations"].push(JSON.parse(JSON.stringify(this.state.result.result[summonid][id].armNumbers)))
        newStored["armlist"].push(JSON.parse(JSON.stringify(this.props.data.armlist)))
        this.setState({storedList: newStored})
        this.setState({ChartButtonActive: true})
    },
    openTurnChart: function() {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.data.profile; var arml = this.props.data.armlist;
        var summon = this.props.data.summon; var chara = this.props.data.chara;
        var totalBuff = this.getTotalBuff(prof)
        var totals = this.getInitialTotals(prof, chara, summon)

        var sortkey = "totalAttack"
        var sortkeyname = "攻撃力(二手技巧無し)"
        if(this.props.data.sortKey == this.props.data.sortKey) {
            sortkey = this.props.data.sortKey
            sortkeyname = keyTypes[sortkey]
        }

        var res = []
        for(var i = 0; i < summon.length; i++){
            res[i] = []
        }

        for(var i = 0; i < storedCombinations.length; i++){
            var oneres = this.calculateOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
            for(var j = 0; j < summon.length; j++){
                res[j].push({data: oneres[j], armNumbers: storedCombinations[i]});
            }
            this.initializeTotals(totals)
        }
        // resに再計算されたデータが入っている状態
        // res[summonind][rank]
        this.setState({chartData: this.generateTurnData(res, arml, summon, prof, totalBuff, chara, storedCombinations)})
        this.setState({chartSortKey: sortkey})
        this.setState({openTurnChart: true})
    },
    generateTurnData: function(res, arml, summon, prof, buff, chara, storedCombinations) {
        var data = {}
        var minMaxArr = {
            "totalAttack": {"max": 0, "min": 0},
            "criticalAttack": {"max": 0, "min": 0},
            "expectedCycleDamagePerTurn": {"max": 0, "min": 0},
            "averageAttack": {"max": 0, "min": 0},
            "averageCyclePerTurn": {"max": 0, "min": 0},
            "averageCriticalAttack": {"max": 0, "min": 0},
        }
        var cnt = 1
        var considerAverageArray = {}
        for(var ch = 0; ch < chara.length; ch++) {
            var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
            if(charaConsidered && chara[ch].name != "") {
                cnt++;
                considerAverageArray[chara[ch].name] = true
            } else {
                considerAverageArray[chara[ch].name] = false
            }
        }

        if(res.length > 1) {
            var AllTotalAttack = [["経過ターン"]];
            var AllCycleDamagePerTurn = [["経過ターン"]];
            var AllCriticalAttack = [["経過ターン"]];
            var AllAverageTotalAttack = [["経過ターン"]];
            var AllAverageCycleDamagePerTurn = [["経過ターン"]];
            var AllAverageCriticalAttack = [["経過ターン"]];

            for(var m = 0; m < 21; m++){
                AllTotalAttack.push([m])
                AllCycleDamagePerTurn.push([m])
                AllCriticalAttack.push([m])
                AllAverageTotalAttack.push([m])
                AllAverageCycleDamagePerTurn.push([m])
                AllAverageCriticalAttack.push([m])
            }
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].selfSummonAmount + "キャラ攻" + summon[s].selfSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].selfElement].name + summonTypes[summon[s].selfSummonType] + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].friendSummonAmount + "キャラ攻" + summon[s].friendSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].friendElement].name + summonTypes[summon[s].friendSummonType] + summon[s].friendSummonAmount
            }
            var TotalAttack = [["経過ターン"]];
            var CriticalAttack = [["経過ターン"]];
            var CycleDamagePerTurn = [["経過ターン"]];
            var AverageTotalAttack = [["経過ターン"]];
            var AverageCriticalAttack = [["経過ターン"]];
            var AverageCycleDamagePerTurn = [["経過ターン"]];

            for(var m = 0; m < 21; m++){
                TotalAttack.push([m])
                CycleDamagePerTurn.push([m])
                CriticalAttack.push([m])
                AverageTotalAttack.push([m])
                AverageCycleDamagePerTurn.push([m])
                AverageCriticalAttack.push([m])

                // 合計値を足すために先に要素を追加しておく
                // (key の 処理順が不明のため)
                for(var j = 0; j < oneresult.length; j++){
                    AverageTotalAttack[m + 1].push(0)
                    AverageCycleDamagePerTurn[m + 1].push(0)
                    AverageCriticalAttack[m + 1].push(0)
                }
            }

            for(var j = 0; j < oneresult.length; j++){
                var onedata = oneresult[j].data

                var title = "No. " + (j+1).toString() + ":"
                for(var i=0; i < arml.length; i++){
                    if(storedCombinations[j][i] > 0) {
                        var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                        title += name + storedCombinations[j][i] + "本\n"
                    }
                }
                for(key in onedata){
                    var totalSummon = onedata[key].totalSummon
                    var elementCoeff = onedata[key].skilldata.element
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / elementCoeff

                    // 召喚石ターン分を減じておく
                    var elementTurn = totalSummon.elementTurn - 1.0
                    elementCoeff -= elementTurn

                    for(var k = 0; k < 21; k++){
                        // とりあえず 20ターンかかると仮定
                        if(totalSummon.elementTurn > 1.0){
                            elementTurn = 0.20 + (totalSummon.elementTurn - 1.20) * k / 20
                        }
                        var newTotalAttack = totalAttackWithoutHaisui * (elementCoeff + elementTurn)
                        var newDamage = this.calculateDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense)
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio)
                        var newExpectedCycleDamagePerTurn = (newOugiDamage + onedata[key].expectedTurn * onedata[key].expectedAttack * newDamage) / (onedata[key].expectedTurn + 1)

                        if(key == "Djeeta") {
                            TotalAttack[k + 1].push( parseInt(newTotalAttack) )
                            CriticalAttack[k + 1].push(parseInt(onedata[key].criticalRatio * newTotalAttack))
                            CycleDamagePerTurn[k + 1].push( parseInt(newExpectedCycleDamagePerTurn) )
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        } else if (considerAverageArray[key]) {
                            AverageTotalAttack[k + 1][j + 1] += parseInt(newTotalAttack / cnt)
                            AverageCycleDamagePerTurn[k + 1][j + 1] += parseInt(newExpectedCycleDamagePerTurn / cnt)
                            AverageCriticalAttack[k + 1][j + 1] += parseInt(onedata[key].criticalRatio * newTotalAttack / cnt)
                        }
                    }
                }
                TotalAttack[0].push(title)
                CriticalAttack[0].push(title)
                CycleDamagePerTurn[0].push(title)
                AverageTotalAttack[0].push(title)
                AverageCycleDamagePerTurn[0].push(title)
                AverageCriticalAttack[0].push(title)

                // 召喚石2組以上の場合
                if(res.length > 1) {
                    AllTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)
                    AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCriticalAttack[0].push("(" + summonHeader + ")" + title)
                    AllAverageCycleDamagePerTurn[0].push("(" + summonHeader + ")" + title)

                    for(var k = 1; k < 22; k++) {
                        AllTotalAttack[k].push(TotalAttack[k][j + 1])
                        AllCriticalAttack[k].push(CriticalAttack[k][j + 1])
                        AllCycleDamagePerTurn[k].push(CycleDamagePerTurn[k][j + 1])
                        AllAverageTotalAttack[k].push(AverageTotalAttack[k][j + 1])
                        AllAverageCriticalAttack[k].push(AverageCriticalAttack[k][j + 1])
                        AllAverageCycleDamagePerTurn[k].push(AverageCycleDamagePerTurn[k][j + 1])
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["totalAttack"] = TotalAttack
            data[summonHeader]["expectedCycleDamagePerTurn"] = CycleDamagePerTurn
            data[summonHeader]["criticalAttack"] = CriticalAttack
            data[summonHeader]["averageCriticalAttack"] = AverageCriticalAttack
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageCyclePerTurn"] = AverageCycleDamagePerTurn
        }

        if(res.length > 1){
            data["まとめて比較"] = {}
            data["まとめて比較"]["totalAttack"] = AllTotalAttack
            data["まとめて比較"]["criticalAttack"] = AllCriticalAttack
            data["まとめて比較"]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
            data["まとめて比較"]["averageCriticalAttack"] = AllAverageCriticalAttack
            data["まとめて比較"]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k < 22; k++){
                    for(var j = 1; j <= res[0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    openSimulator: function() {
        var storedCombinations = this.state.storedList.combinations
        var storedArmlist = this.state.storedList.armlist

        var prof = this.props.data.profile; var arml = this.props.data.armlist;
        var summon = this.props.data.summon; var chara = this.props.data.chara;
        var totalBuff = this.getTotalBuff(prof)
        var totals = this.getInitialTotals(prof, chara, summon)

        var sortkey = "averageExpectedDamage"

        var turnBuff = this.props.data.simulator;
        var maxTurn = 5
        if(turnBuff != undefined) {
            maxTurn = turnBuff.maxTurn
        } else {
            alert("シミュレータ用の入力を設定して下さい。")
            return 1;
        }
        var res = []
        // res[summonid][turn][rank]にする
        for(var i = 0; i < summon.length; i++){
            res[i] = []
            for(var j = 0; j < maxTurn; j++){
                res[i][j] = []
            }
        }

        for(var k = 0; k < maxTurn; k++){
            // 各ターン毎のバフ、HPなどをアレする
            totalBuff["normal"] = 0.01 * turnBuff.buffs["全体バフ"][k].normal
            totalBuff["element"] = 0.01 * turnBuff.buffs["全体バフ"][k].element
            totalBuff["other"] = 0.01 * turnBuff.buffs["全体バフ"][k].other
            totalBuff["da"] = 0.01 * turnBuff.buffs["全体バフ"][k].DA
            totalBuff["ta"] = 0.01 * turnBuff.buffs["全体バフ"][k].TA

            // 個別バフとHP
            for(key in totals) {
                totals[key].remainHP = (turnBuff.buffs["全体バフ"][k].remainHP > turnBuff.buffs[key][k].remainHP) ? 0.01 * turnBuff.buffs[key][k].remainHP : 0.01 * turnBuff.buffs["全体バフ"][k].remainHP
                totals[key].normalBuff = 0.01 * turnBuff.buffs[key][k].normal
                totals[key].elementBuff = 0.01 * turnBuff.buffs[key][k].element
                totals[key].otherBuff = 0.01 * turnBuff.buffs[key][k].other
                totals[key].DABuff = 0.01 * turnBuff.buffs[key][k].DA
                totals[key].TABuff = 0.01 * turnBuff.buffs[key][k].TA
            }

            for(var i = 0; i < storedCombinations.length; i++){
                var oneres = this.calculateOneCombination(storedCombinations[i], summon, prof, arml, totals, totalBuff)
                for(var j = 0; j < summon.length; j++){
                    res[j][k].push({data: oneres[j], armNumbers: storedCombinations[i]});
                }
                this.initializeTotals(totals)
            }
        }
        this.setState({chartData: this.generateSimulationData(res, turnBuff, arml, summon, prof, totalBuff, chara, storedCombinations)})
        this.setState({chartSortKey: sortkey})
        this.setState({openSimulator: true})
    },
    generateSimulationData: function(res, turnBuff, arml, summon, prof, buff, chara, storedCombinations) {
        var data = {}
        var minMaxArr = {
            "averageAttack": {"max": 0, "min": 0},
            "averageTotalExpected": {"max": 0, "min": 0},
            "expectedDamage": {"max": 0, "min": 0},
            "averageExpectedDamage": {"max": 0, "min": 0},
            "summedAverageExpectedDamage": {"max": 0, "min": 0},
        }
        var cnt = 1
        var considerAverageArray = {}
        for(var ch = 0; ch < chara.length; ch++) {
            var charaConsidered = (chara[ch].isConsideredInAverage == undefined) ? true : chara[ch].isConsideredInAverage
            if(charaConsidered && chara[ch].name != "") {
                cnt++;
                considerAverageArray[chara[ch].name] = true
            } else {
                considerAverageArray[chara[ch].name] = false
            }
        }

        if(res.length > 1) {
            var AllAverageTotalAttack = [["ターン"]];
            var AllAverageTotalExpected = [["ターン"]];
            var AllExpectedDamage = [["ターン"]];
            var AllAverageExpectedDamage = [["ターン"]];
            var AllSummedAverageExpectedDamage = [["ターン"]];

            for(var m = 1; m <= turnBuff.maxTurn; m++){
                AllAverageTotalAttack.push([m])
                AllAverageTotalExpected.push([m])
                AllExpectedDamage.push([m])
                AllAverageExpectedDamage.push([m])
                AllSummedAverageExpectedDamage.push([m])
            }
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].selfSummonAmount + "キャラ攻" + summon[s].selfSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].selfElement].name + summonTypes[summon[s].selfSummonType] + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += "属性攻" + summon[s].friendSummonAmount + "キャラ攻" + summon[s].friendSummonAmount2
            } else {
                summonHeader += summonElementTypes[summon[s].friendElement].name + summonTypes[summon[s].friendSummonType] + summon[s].friendSummonAmount
            }
            var AverageTotalAttack = [["ターン"]];
            var AverageTotalExpected = [["ターン"]];
            var ExpectedDamage = [["ターン"]];
            var AverageExpectedDamage = [["ターン"]];
            var SummedAverageExpectedDamage = [["ターン"]];

            for(var m = 1; m <= turnBuff.maxTurn; m++){
                AverageTotalAttack.push([m])
                AverageTotalExpected.push([m])
                ExpectedDamage.push([m])
                AverageExpectedDamage.push([m])
                SummedAverageExpectedDamage.push([m])

                for(var j = 0; j < oneresult[0].length; j++) {
                    AverageExpectedDamage[m].push(0)
                    SummedAverageExpectedDamage[m].push(0)
                }
            }

            for(var t = 1; t <= turnBuff.maxTurn; t++){
                var turndata = oneresult[t - 1]
                for(var j = 0; j < turndata.length; j++){
                    var onedata = turndata[j].data

                    AverageTotalAttack[t].push( onedata["Djeeta"].averageAttack )
                    AverageTotalExpected[t].push( onedata["Djeeta"].averageTotalExpected )

                    for(key in onedata) {
                        if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougi" || turnBuff.buffs[key][t-1].turnType == "ougi") {
                            // 基本的に奥義の設定が優先
                            var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * onedata[key].totalAttack, prof.enemyDefense, prof.ougiRatio)
                            if(key == "Djeeta") {
                                ExpectedDamage[t].push( parseInt(newOugiDamage) )
                                AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                            } else if(considerAverageArray[key]) {
                                AverageExpectedDamage[t][j + 1] += parseInt(newOugiDamage/cnt)
                            }

                        } else if(turnBuff.buffs["全体バフ"][t-1].turnType == "ougiNoDamage" || turnBuff.buffs[key][t-1].turnType == "ougiNoDamage") {
                            // しコルワ
                            if(key == "Djeeta") {
                                ExpectedDamage[t].push(0)
                            }
                        } else {
                            // 通常攻撃
                            var newDamage = this.calculateDamage(onedata[key].criticalRatio * onedata[key].totalAttack, prof.enemyDefense)
                            if(key == "Djeeta") {
                                ExpectedDamage[t].push( parseInt(newDamage * onedata[key].expectedAttack) )
                                AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                            } else if(considerAverageArray[key]) {
                                AverageExpectedDamage[t][j + 1] += parseInt(onedata[key].expectedAttack * newDamage/cnt)
                            }
                        }
                    }

                    if(t == 1) {
                        var title = "No. " + (j+1).toString() + ":"
                        for(var i=0; i < arml.length; i++){
                            if(storedCombinations[j][i] > 0) {
                                var name = (arml[i].name == "") ? "武器(" + i.toString() + ")" : arml[i].name
                                title += name + storedCombinations[j][i] + "本\n"
                            }
                        }
                        AverageTotalAttack[0].push(title)
                        AverageTotalExpected[0].push(title)
                        ExpectedDamage[0].push(title)
                        AverageExpectedDamage[0].push(title)
                        SummedAverageExpectedDamage[0].push(title)

                        // 召喚石2組以上の場合
                        if(res.length > 1) {
                            AllAverageTotalAttack[0].push("(" + summonHeader + ")" + title)
                            AllAverageTotalExpected[0].push("(" + summonHeader + ")" + title)
                            AllExpectedDamage[0].push("(" + summonHeader + ")" + title)
                            AllAverageExpectedDamage[0].push("(" + summonHeader + ")" + title)
                            AllSummedAverageExpectedDamage[0].push("(" + summonHeader + ")" + title)
                        }
                        SummedAverageExpectedDamage[t][j + 1] = AverageExpectedDamage[t][j + 1]
                    } else {
                        SummedAverageExpectedDamage[t][j + 1] = SummedAverageExpectedDamage[t - 1][j + 1] + AverageExpectedDamage[t][j + 1]
                    }

                    if(res.length > 1) {
                        AllAverageTotalAttack[t].push(AverageTotalAttack[t][j + 1])
                        AllAverageTotalExpected[t].push(AverageTotalExpected[t][j + 1])
                        AllExpectedDamage[t].push(ExpectedDamage[t][j + 1])
                        AllAverageExpectedDamage[t].push(AverageExpectedDamage[t][j + 1])
                        AllSummedAverageExpectedDamage[t].push(SummedAverageExpectedDamage[t][j + 1])
                    }
                }
            }

            data[summonHeader] = {}
            data[summonHeader]["averageAttack"] = AverageTotalAttack
            data[summonHeader]["averageTotalExpected"] = AverageTotalExpected
            data[summonHeader]["expectedDamage"] = ExpectedDamage
            data[summonHeader]["averageExpectedDamage"] = AverageExpectedDamage
            data[summonHeader]["summedAverageExpectedDamage"] = SummedAverageExpectedDamage
        }

        if(res.length > 1){
            data["まとめて比較"] = {}
            data["まとめて比較"]["averageAttack"] = AllAverageTotalAttack
            data["まとめて比較"]["averageTotalExpected"] = AllAverageTotalExpected
            data["まとめて比較"]["expectedDamage"] = AllExpectedDamage
            data["まとめて比較"]["averageExpectedDamage"] = AllAverageExpectedDamage
            data["まとめて比較"]["summedAverageExpectedDamage"] = AllSummedAverageExpectedDamage
        }

        // グラフ最大値最小値を抽出
        for(key in minMaxArr) {
            for(summonkey in data) {
                for(var k = 1; k <= turnBuff.maxTurn; k++){
                    for(var j = 1; j <= res[0][0].length; j++){
                        // グラフ最大値最小値を保存
                        if(data[summonkey][key][k][j] > minMaxArr[key]["max"]) minMaxArr[key]["max"] = data[summonkey][key][k][j]
                        if(data[summonkey][key][k][j] < minMaxArr[key]["min"] || minMaxArr[key]["min"] == 0) minMaxArr[key]["min"] = data[summonkey][key][k][j]
                    }
                }
            }
        }

        data["minMaxArr"] = minMaxArr
        return data
    },
    getTypeBonus: function(self_elem, prof) {
        // "水"は過去に間違ったデータを入れていた際に対する対応
        var enemy_elem = (prof.enemyElement == undefined || prof.enemyElement == "水") ? "fire" : prof.enemyElement
        var elem = (self_elem == undefined) ? "fire" : self_elem

        if(elementRelation[ elem ]["weak"] == enemy_elem) {
            return 0.75
        } else if(elementRelation[ elem ]["strong"] == enemy_elem) {
            return 1.5
        } else {
            return 1.0
        }
    },
    getTypeBonusStr: function(self_elem, prof) {
        switch(this.getTypeBonus(self_elem, prof)) {
            case 1.0:
                return "非有利"
                break;
            case 1.5:
                return "有利"
                break;
            case 0.75:
                return "不利"
                break;
            default:
                return "非有利"
                break;
        }
    },
    resetStoredList: function(e) {
        this.setState({storedList: {"combinations": [], "armlist": []}})
        this.setState({openHPChart: false})
        this.setState({ChartButtonActive: false})
    },
    render: function() {
        res = this.state.result;
        var prof = this.props.data.profile
        var arm = this.props.data.armlist
        var chara = this.props.data.chara
        var summondata = res.summon
        var result = res.result
        var onAddToHaisuiData = this.addHaisuiData

        switcher = this.state;
        var armnames = []
        for(var i = 0; i < arm.length; i++){
            if(arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if(armname == '') {
                    armname = "武器" + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = []
        if(switcher.switchTotalAttack) {
            tableheader.push('攻撃力(二手技巧無し)')
        }
        if(switcher.switchATKandHP) {
            tableheader.push('戦力')
        }
        if(switcher.switchCharaAttack) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "\n(攻撃力)")
                }
            }
        }
        if(switcher.switchDATA) {
            tableheader.push('連続攻撃率(%)')
        }
        if(switcher.switchCharaDA) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "\n(連撃率)")
                }
            }
        }
        if(switcher.switchExpectedAttack) {
            tableheader.push("期待攻撃回数\n(期待攻撃力)")
        }
        if(switcher.switchCriticalAttack) {
            tableheader.push("技巧期待攻撃力")
        }
        if(switcher.switchCriticalRatio) {
            tableheader.push("技巧期待値\n(減衰補正後)")
        }
        if(switcher.switchHP) {
            tableheader.push("HP\n(残HP)")
        }
        if(switcher.switchCharaHP) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "\n(HP)")
                }
            }
        }
        if(switcher.switchAverageAttack) {
            tableheader.push('パーティ平均攻撃力(二手技巧無し)')
        }
        if(switcher.switchAverageCriticalAttack) {
            tableheader.push('技巧平均攻撃力')
        }
        if(switcher.switchTotalExpected) {
            tableheader.push('総合*回数*技巧')
        }
        if(switcher.switchCharaTotalExpected) {
            for(var i = 0; i < chara.length; i++){
                if(chara[i].name != "") {
                    tableheader.push(chara[i].name + "\n(総回技)")
                }
            }
        }
        if(switcher.switchAverageTotalExpected) {
            tableheader.push('総回技値の平均値')
        }
        if(switcher.switchDamage) {
            tableheader.push("単攻撃ダメージ\n(期待回数*単ダメージ)")
        }
        if(switcher.switchOugiGage) {
            tableheader.push("ターン毎の\n奥義ゲージ上昇量")
        }
        if(switcher.switchOugiDamage) {
            tableheader.push("奥義ダメージ")
        }
        if(switcher.switchCycleDamage) {
            tableheader.push("予想ターン毎ダメージ")
        }
        if(switcher.switchAverageCycleDamage) {
            tableheader.push("予想ターン毎ダメージ\nのパーティ平均値")
        }
        if(switcher.switchSkillTotal) {
            tableheader.push("スキル合計")
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name
        var remainHPstr = "ジータさん(" + job + ") HP";
        if(prof.remainHP != undefined) {
            remainHPstr += (parseInt(prof.remainHP) < parseInt(prof.hp)) ? prof.remainHP : prof.hp
        } else {
            remainHPstr += prof.hp
        }
        remainHPstr += "% (" + this.getTypeBonusStr(prof.element, prof) + ")"
        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "" && chara[i].isConsideredInAverage) {
                remainHPstr += ", " + chara[i].name + "HP"
                if(chara[i].remainHP != undefined) {
                    remainHPstr += (parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? chara[i].remainHP : prof.hp
                } else {
                    remainHPstr += prof.hp
                }
                remainHPstr += "% (" + this.getTypeBonusStr(chara[i].element, prof) + ")"
            }
        }
        remainHPstr += ", 通常バフ" + prof.normalBuff + "%, 属性バフ" + prof.elementBuff + "%, その他バフ" + prof.otherBuff + "%"

        if(_ua.Mobile) {
            return (
                <div className="resultList">
                    表示項目制御:
                    <table className="displayElement">
                    <tbody>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 攻撃力(二手技巧無し)</td>
                        <td><Checkbox inline checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP</td>
                        <td><Checkbox inline checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchExpectedAttack} onChange={this.handleEvent.bind(this, "switchExpectedAttack")} /> 期待攻撃回数</td>
                        <td><Checkbox inline checked={this.state.switchCriticalRatio} onChange={this.handleEvent.bind(this, "switchCriticalRatio")} /> 技巧期待値</td>
                        <td><Checkbox inline checked={this.state.switchCriticalAttack} onChange={this.handleEvent.bind(this, "switchCriticalAttack")} /> 技巧期待*攻撃力</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchAverageAttack} onChange={this.handleEvent.bind(this, "switchAverageAttack")} /> パーティ平均攻撃力(二手技巧無し)</td>
                        <td><Checkbox inline checked={this.state.switchAverageCriticalAttack} onChange={this.handleEvent.bind(this, "switchAverageCriticalAttack")} /> 技巧平均攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchTotalExpected} onChange={this.handleEvent.bind(this, "switchTotalExpected")} /> 総合*期待回数*技巧期待値</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchAverageTotalExpected} onChange={this.handleEvent.bind(this, "switchAverageTotalExpected")} /> 総回技のパーティ平均値</td>
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 単攻撃ダメージ</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCharaAttack} onChange={this.handleEvent.bind(this, "switchCharaAttack")} /> キャラ攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchCharaHP} onChange={this.handleEvent.bind(this, "switchCharaHP")} /> キャラHP</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCharaDA} onChange={this.handleEvent.bind(this, "switchCharaDA")} /> キャラ連続攻撃率</td>
                        <td><Checkbox inline checked={this.state.switchCharaTotalExpected} onChange={this.handleEvent.bind(this, "switchCharaTotalExpected")} /> キャラ総回技値</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchOugiGage} onChange={this.handleEvent.bind(this, "switchOugiGage")} />奥義ゲージ上昇期待値</td>
                        <td><Checkbox inline checked={this.state.switchOugiDamage} onChange={this.handleEvent.bind(this, "switchOugiDamage")} />奥義ダメージ</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchCycleDamage} onChange={this.handleEvent.bind(this, "switchCycleDamage")} />予想ターン毎ダメージ</td>
                        <td><Checkbox inline checked={this.state.switchAverageCycleDamage} onChange={this.handleEvent.bind(this, "switchAverageCycleDamage")} />予想ターン毎ダメージの平均値</td>
                        <td><Checkbox inline checked={this.state.switchSkillTotal} onChange={this.handleEvent.bind(this, "switchSkillTotal")} />スキル合計値</td>
                    </tr>
                    </tbody>
                    </table>
                    <br/>
                    動作制御:
                    <Checkbox inline checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る
                    <span> / 計算総数:{res.totalItr}組(1万超の場合、計算に時間がかかります)</span>
                    <ButtonGroup style={{width: "100%"}}>
                        <Button block style={{float: "left", width: "50%", margin: "0 0 5px 0", "font-size": "10pt", "padding-left": "2px", "padding-right": "2px", "text-align": "center"}} bsStyle="primary" bsSize="large" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >背水渾身グラフ</Button>
                        <Button block style={{float: "left", width: "50%", margin: "0 0 5px 0", "font-size": "10pt", "padding-left": "2px", "padding-right": "2px", "text-align": "center"}} bsStyle="primary" bsSize="large" onClick={this.openTurnChart} disabled={!this.state.ChartButtonActive} >初期攻撃力推移グラフ</Button>
                    </ButtonGroup>
                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <h2> 結果{summonindex + 1}: {selfSummonHeader} + {friendSummonHeader} [優先項目: {res.sortkeyname}]</h2>
                                <div className="charainfo"><span>{remainHPstr}</span></div>
                                <table className="table table-bordered">
                                <thead className="result">
                                <tr>
                                    <th>順位</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind} >{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind} className="resultFirst">{m}</th>;
                                        } else {
                                            return <th key={ind} className="resultList">{m}</th>;
                                        }})
                                    }
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} />
                            <Modal className="hpChartTutotial" show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}>
                                <Modal.Header closeButton>
                                    <Modal.Title>HP Chartsの使い方</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>HPチャート機能は「保存された武器編成の攻撃力等を、残りHP割合ごとに再計算する」機能です。</p>
                                    <h2>1.</h2>
                                    <p>適当に編成を計算した後、グラフを見たい編成をグラフに加えます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial1.png">
                                    </Thumbnail>
                                    <h2>2.</h2>
                                    <p>グラフに加えると、「背水渾身チャートを開く」ボタンが有効化されるので、クリックします。</p>
                                    <h2>3.</h2>
                                    <p>「優先する項目」に設定されている値を描画したグラフが表示されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial2.png">
                                    </Thumbnail>
                                    <p className="text-danger">まだサポートされていない要素が「優先する項目」に設定されている場合、"総合攻撃力"のグラフに変更されます。</p>
                                    <h2>4.</h2>
                                    <p>上部の選択ボタンで、他の要素を表示することも可能です。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial3.png">
                                    </Thumbnail>
                                    <h2>5.</h2>
                                    <p>複数の召喚石組み合わせが設定されている場合、複数のグラフが作成されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial4.png">
                                    </Thumbnail>
                                    <p className="text-danger">現在は、ある組み合わせをグラフに保存すると、全てのグラフに追加されるようになっています。
                                    これを召喚石別にするかどうかは、今後検討します。</p>
                                    <h2>注記</h2>
                                    <p>編成として保存されるのは「武器の組み合わせの本数」のみです。
                                    そのため、武器攻撃力やバフ量などを変更した場合、結果のグラフも自動的に変更されます。</p>
                                    <p className="text-danger">武器枠の数が追加/削除された場合、武器枠のデータがリセットされた場合は、
                                    保存されている編成はリセットされてしまいますのでご注意下さい。
                                    これは、武器組み合わせのみを保存しているため、誤って組み合わせで再計算されることを防ぐためです。</p>
                                    <p>また、現在「追加した特定のグラフを削除する」機能は実装されておりませんので、
                                    グラフが多くなりすぎてしまった場合、全削除を行い、保存されている編成をリセットしてください。</p>
                                    <p>ご要望・不具合等あればお知らせ下さい。</p>
                                </Modal.Body>
                            </Modal>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openTurnChart} onHide={this.closeTurnChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>初期攻撃力推移 ({remainHPstr})</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TurnChart data={this.state.chartData} sortKey={this.state.chartSortKey} />
                        </Modal.Body>
                    </Modal>
                </div>
            );

        } else {
            return (
                <div className="resultList">
                    表示項目制御:
                    <table className="displayElement"><tbody>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 攻撃力(二手技巧無し) </td>
                        <td><Checkbox inline checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力</td>
                        <td><Checkbox inline checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP</td>
                        <td><Checkbox inline checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率</td>
                        <td><Checkbox inline checked={this.state.switchExpectedAttack} onChange={this.handleEvent.bind(this, "switchExpectedAttack")} /> 期待攻撃回数</td>
                        <td><Checkbox inline checked={this.state.switchCriticalRatio} onChange={this.handleEvent.bind(this, "switchCriticalRatio")} /> 技巧期待値</td>
                        <td><Checkbox inline checked={this.state.switchCriticalAttack} onChange={this.handleEvent.bind(this, "switchCriticalAttack")} /> 技巧期待値*攻撃力</td>
                    </tr><tr>
                        <td><Checkbox inline checked={this.state.switchAverageAttack} onChange={this.handleEvent.bind(this, "switchAverageAttack")} /> パーティ平均攻撃力(二手技巧無し)</td>
                        <td><Checkbox inline checked={this.state.switchAverageCriticalAttack} onChange={this.handleEvent.bind(this, "switchAverageCriticalAttack")} /> 技巧平均攻撃力 </td>
                        <td><Checkbox inline checked={this.state.switchTotalExpected} onChange={this.handleEvent.bind(this, "switchTotalExpected")} /> 総合*期待回数*技巧期待値</td>
                        <td><Checkbox inline checked={this.state.switchAverageTotalExpected} onChange={this.handleEvent.bind(this, "switchAverageTotalExpected")} /> 総回技のパーティ平均値</td>
                        <td><Checkbox inline checked={this.state.switchCycleDamage} onChange={this.handleEvent.bind(this, "switchCycleDamage")} /> 予想ターン毎ダメージ </td>
                        <td><Checkbox inline checked={this.state.switchAverageCycleDamage} onChange={this.handleEvent.bind(this, "switchAverageCycleDamage")} /> 予想ターン毎ダメージの平均値 </td>
                        <td><Checkbox inline checked={this.state.switchDamage} onChange={this.handleEvent.bind(this, "switchDamage")} /> 単攻撃ダメージ</td>
                    </tr>
                    <tr>
                        <td><Checkbox inline checked={this.state.switchOugiGage} onChange={this.handleEvent.bind(this, "switchOugiGage")} /> 奥義ゲージ上昇期待値 </td>
                        <td><Checkbox inline checked={this.state.switchOugiDamage} onChange={this.handleEvent.bind(this, "switchOugiDamage")} /> 奥義ダメージ </td>
                        <td><Checkbox inline checked={this.state.switchCharaAttack} onChange={this.handleEvent.bind(this, "switchCharaAttack")} /> キャラ攻撃力</td>
                        <td><Checkbox inline checked={this.state.switchCharaHP} onChange={this.handleEvent.bind(this, "switchCharaHP")} /> キャラHP</td>
                        <td><Checkbox inline checked={this.state.switchCharaDA} onChange={this.handleEvent.bind(this, "switchCharaDA")} /> キャラ連続攻撃率</td>
                        <td><Checkbox inline checked={this.state.switchCharaTotalExpected} onChange={this.handleEvent.bind(this, "switchCharaTotalExpected")} /> キャラ総回技値</td>
                        <td><Checkbox inline checked={this.state.switchSkillTotal} onChange={this.handleEvent.bind(this, "switchSkillTotal")} />スキル合計値</td>
                    </tr>
                    </tbody></table>
                    <br/>
                    動作制御:
                    <Checkbox inline className="autoupdate" checked={this.state.disableAutoResultUpdate} onChange={this.handleEvent.bind(this, "disableAutoResultUpdate")} /> 自動更新を切る

                    <span> / 計算総数:{res.totalItr}組(1万超の場合、計算に時間がかかります)</span>
                    <hr />
                        <ButtonGroup style={{width: "100%"}}>
                            <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >背水渾身グラフを開く(beta)</Button>
                            <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openTurnChart} disabled={!this.state.ChartButtonActive} >初期攻撃力推移グラフを開く(beta)</Button>
                            <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openSimulator} disabled={!this.state.ChartButtonActive} >ダメージシミュレータ(beta)</Button>
                        </ButtonGroup>
                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <h2> 結果{summonindex + 1}: {selfSummonHeader} + {friendSummonHeader} [優先項目: {res.sortkeyname}]</h2>
                                <div className="charainfo"><span>{remainHPstr}</span></div>
                                <table className="table table-bordered">
                                <thead className="result">
                                <tr>
                                    <th>順位</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind}>{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind} className="resultFirst">{m}</th>;
                                        } else {
                                            return <th key={ind} className="resultList">{m}</th>;
                                        }})
                                    }
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} />
                            <Modal className="hpChartTutotial" show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}>
                                <Modal.Header closeButton>
                                    <Modal.Title>HP Chartsの使い方</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>HPチャート機能は「保存された武器編成の攻撃力等を、残りHP割合ごとに再計算する」機能です。</p>
                                    <h2>1.</h2>
                                    <p>適当に編成を計算した後、グラフを見たい編成をグラフに加えます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial1.png">
                                    </Thumbnail>
                                    <h2>2.</h2>
                                    <p>グラフに加えると、「背水渾身チャートを開く」ボタンが有効化されるので、クリックします。</p>
                                    <h2>3.</h2>
                                    <p>「優先する項目」に設定されている値を描画したグラフが表示されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial2.png">
                                    </Thumbnail>
                                    <p className="text-danger">まだサポートされていない要素が「優先する項目」に設定されている場合、"総合攻撃力"のグラフに変更されます。</p>
                                    <h2>4.</h2>
                                    <p>上部の選択ボタンで、他の要素を表示することも可能です。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial3.png">
                                    </Thumbnail>
                                    <h2>5.</h2>
                                    <p>複数の召喚石組み合わせが設定されている場合、複数のグラフが作成されます。</p>
                                    <Thumbnail alt="HPチャート操作1" src="./otherImages/hpChartTutorial4.png">
                                    </Thumbnail>
                                    <p className="text-danger">現在は、ある組み合わせをグラフに保存すると、全てのグラフに追加されるようになっています。
                                    これを召喚石別にするかどうかは、今後検討します。</p>
                                    <h2>注記</h2>
                                    <p>編成として保存されるのは「武器の組み合わせの本数」のみです。
                                    そのため、武器攻撃力やバフ量などを変更した場合、結果のグラフも自動的に変更されます。</p>
                                    <p className="text-danger">武器枠の数が追加/削除された場合、武器枠のデータがリセットされた場合は、
                                    保存されている編成はリセットされてしまいますのでご注意下さい。
                                    これは、武器組み合わせのみを保存しているため、誤って組み合わせで再計算されることを防ぐためです。</p>
                                    <p>また、現在「追加した特定のグラフを削除する」機能は実装されておりませんので、
                                    グラフが多くなりすぎてしまった場合、全削除を行い、保存されている編成をリセットしてください。</p>
                                    <p>ご要望・不具合等あればお知らせ下さい。</p>
                                </Modal.Body>
                            </Modal>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openTurnChart} onHide={this.closeTurnChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>初期攻撃力推移 ({remainHPstr})</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TurnChart data={this.state.chartData} sortKey={this.state.chartSortKey} />
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openSimulator} onHide={this.closeSimulator}>
                        <Modal.Header closeButton>
                            <Modal.Title>ダメージシミュレータ ({remainHPstr})</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SimulationChart data={this.state.chartData} sortKey={this.state.chartSortKey} />
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
});

var TurnChart = React.createClass({
    getInitialState: function() {
        var sortKey = this.props.sortKey
        if(!(sortKey in supportedTurnChartSortkeys)) sortKey = "totalAttack"

        options = {}
        if(_ua.Mobile) {
            for(key in this.props.data) {
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
            for(key in this.props.data) {
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
            for(key in this.props.data) {
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
            for(key in this.props.data) {
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
                        {/*<FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector.supported_chartsortkeys}</FormControl>*/}
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
        if(!(sortKey in supportedChartSortkeys)) sortKey = "totalAttack"

        options = {}
        if(_ua.Mobile) {
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[sortKey], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][sortKey]["min"], maxValue: this.props.data["minMaxArr"][sortKey]["max"]},
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
                        curveType: 'function',
                        forcelFrame: true,
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
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
            for(key in this.props.data) {
                if(key != "minMaxArr") {
                    options[key] = {
                        title: key,
                        forcelFrame: true,
                        curveType: 'function',
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
                        vAxis: {title: supportedChartSortkeys[e.target.value], textStyle: {italic: false}, minValue: this.props.data["minMaxArr"][e.target.value]["min"], maxValue: this.props.data["minMaxArr"][e.target.value]["max"]},
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
                        curveType: 'function',
                        hAxis: {title: "残りHP", titleTextStyle: {italic: false}, textStyle: {italic: false}},
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
                        {/*<FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector.supported_chartsortkeys}</FormControl>*/}
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
                        <FormControl componentClass="select" value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")}>{selector.supported_chartsortkeys}</FormControl>
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

var Result = React.createClass({
    onClick: function(e) {
        this.props.onAddToHaisuiData(e.target.id, this.props.summonid)
    },
    render: function() {
        var sw = this.props.switcher;
        var arm = this.props.arm;
        var prof = this.props.prof;
        var onClick = this.onClick;
        return (
            <tbody className="result">
                {this.props.data.map(function(m, rank) {
                    var skillstr = "";
                    for(var key in m.data){
                        var skilldata = m.data[key].skilldata

                        if(key == "Djeeta") {
                            skillstr += "ジータさん: "
                        } else {
                            skillstr += key + ": "
                        }

                        if(skilldata.normal != 1.0) {skillstr += "攻刃" + (100.0 * (skilldata.normal - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.normalHaisui != 1.0) {skillstr += "攻刃背水" + (100.0 * (skilldata.normalHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.normalKonshin != 1.0) {skillstr += "攻刃渾身" + (100.0 * (skilldata.normalKonshin - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.element != 1.0) {skillstr += "属性" + (100.0 * (skilldata.element - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.magna != 1.0) {skillstr += "マグナ" + (100.0 * (skilldata.magna - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.magnaHaisui != 1.0) {skillstr += "マグナ背水" + (100.0 * (skilldata.magnaHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.unknown != 1.0) {skillstr += "アンノウン" + (100.0 * (skilldata.unknown - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.unknownHaisui != 1.0) {skillstr += "アンノウン背水" + (100.0 * (skilldata.unknownHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                        if(skilldata.other != 1.0) {skillstr += "その他枠" + (100.0 * (skilldata.other - 1.0)).toFixed(1); skillstr += "% ";}

                        skillstr += "\n"
                    }

                    var tablebody = []
                    if(sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                    }
                    if(sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + "\n(" + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                    }
                    if(sw.switchCharaAttack) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalAttack)
                            }
                        }
                    }
                    if(sw.switchDATA) {
                        tablebody.push('DA:' + (100.0 * m.data.Djeeta.totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data.Djeeta.totalTA).toFixed(1) + '%')
                    }
                    if(sw.switchCharaDA) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push('DA:' + (100.0 * m.data[key].totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data[key].totalTA).toFixed(1) + '%')
                            }
                        }
                    }
                    if(sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(2) + "\n(" + expectedAttack + ")")
                    }
                    if(sw.switchCriticalRatio) {
                        tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.effectiveCriticalRatio.toFixed(4) + ")")
                    }
                    if(sw.switchCriticalAttack) {
                        tablebody.push(m.data.Djeeta.criticalAttack)
                    }
                    if(sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "\n(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                    }
                    if(sw.switchCharaHP) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalHP + "\n(" + parseInt(m.data[key].totalHP * m.data[key].remainHP) + ")")
                            }
                        }
                    }
                    if(sw.switchAverageAttack) {
                        tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                    }
                    if(sw.switchAverageCriticalAttack) {
                        tablebody.push(m.data.Djeeta.averageCriticalAttack)
                    }
                    if(sw.switchTotalExpected) {
                        tablebody.push(m.data.Djeeta.totalExpected)
                    }
                    if(sw.switchCharaTotalExpected) {
                        for(key in m.data){
                            if(key != "Djeeta") {
                                tablebody.push(m.data[key].totalExpected)
                            }
                        }
                    }
                    if(sw.switchAverageTotalExpected) {
                        tablebody.push(m.data.Djeeta.averageTotalExpected)
                    }
                    if(sw.switchDamage) {
                        var damage = m.data.Djeeta.damage
                        var expectedDamage = m.data.Djeeta.expectedAttack * damage
                        tablebody.push(parseInt(damage) + "\n(" + parseInt(expectedDamage) + ")")
                    }
                    if(sw.switchOugiGage) {
                        tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn + "ターン)")
                    }
                    if(sw.switchOugiDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.ougiDamage))
                    }
                    if(sw.switchCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.expectedCycleDamagePerTurn))
                    }
                    if(sw.switchAverageCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.averageCyclePerTurn))
                    }
                    if(sw.switchSkillTotal) {
                        tablebody.push(skillstr)
                    }
                    if(_ua.Mobile) {
                        return (
                            <tr className="result" title={skillstr} key={rank + 1}>
                                <td>{rank + 1}</td>
                                {tablebody.map(function(am, ind){
                                    return (<td key={ind} >{am}</td>);
                                })}
                                {m.armNumbers.map(function(am, ind){
                                    if(arm[ind].considerNumberMax != 0) {
                                        if(ind == 0){
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultFirst"><p className="text-info">{am}</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultFirst"><p className="text-muted">{am}</p></td>);
                                            }
                                        } else {
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultList"><p className="text-info">{am}</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultList"><p className="text-muted">{am}</p></td>);
                                            }
                                        }
                                    }
                                 })}
                                <td><Button id={rank} bsStyle="primary" bsSize="xsmall" onClick={onClick}>グラフに<br/>加える</Button></td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr className="result" title={skillstr} key={rank + 1}>
                                <td>{rank + 1}</td>
                                {tablebody.map(function(am, ind){
                                    return (<td key={ind} >{am}</td>);
                                })}
                                {m.armNumbers.map(function(am, ind){
                                    if(arm[ind].considerNumberMax != 0) {
                                        if(ind == 0){
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultFirst"><p className="text-info">{am} 本</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultFirst"><p className="text-muted">{am} 本</p></td>);
                                            }
                                        } else {
                                            if(parseInt(am) > 0) {
                                                return (<td key={ind} className="resultList"><p className="text-info">{am} 本</p></td>);
                                            } else {
                                                return (<td key={ind} className="resultList"><p className="text-muted">{am} 本</p></td>);
                                            }
                                        }
                                    }
                                 })}
                                <td><Button id={rank} bsStyle="primary" block onClick={onClick}>グラフに<br/>加える</Button></td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        );
    }
});

// ArmList has a number of Arm objects.
var ArmList = React.createClass({
    getInitialState: function() {
        var al = []
        for(var i = 0; i < this.props.armNum; i++) al[i] = []

        var arms = []
        for(var i=0; i < this.props.armNum; i++) { arms.push(i); }

        return {
            // 武器リストをRootに渡すための連想配列
            alist: al,
            // 武器リストを管理するための連想配列
            // indexによって保存データとの対応を取り、
            // その値をkeyとして使うことでコンポーネントの削除などを行う
            arms: arms,
            defaultElement: "fire",
            addArm: null,
            addArmID: -1,
            considerNum: 1,
            openPresets: false,
        };
    },
    closePresets: function() {
        this.setState({openPresets: false})
    },
    openPresets: function() {
        this.setState({openPresets: true})
    },
    updateArmNum: function(num) {
        var arms = this.state.arms
        if(arms.length < num) {
            var maxvalue = Math.max.apply(null, arms)
            for(var i = 0; i < (num - arms.length); i++){
                arms.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(arms.length > num){
                arms.pop();
            }
        }
        this.setState({arms: arms})
    },
    componentWillReceiveProps: function(nextProps) {
        // iPadなどで一度数字が消された場合NaNになる
        if(!isNaN(parseInt(nextProps.armNum))) {
            // 今回のarmNumが小さくなったらalistも切り落とす (前回がNaNの場合も行う)
            if (isNaN(parseInt(this.props.armNum)) || (parseInt(nextProps.armNum) < parseInt(this.props.armNum))) {
                var newalist = this.state.alist;
                while(newalist.length > nextProps.armNum) {
                    newalist.pop();
                }
                this.setState({alist: newalist})
            }
            this.updateArmNum(nextProps.armNum)
        }
    },
    handleOnCopy: function(id, keyid, state) {
        var newarms = this.state.arms
        var maxvalue = Math.max.apply(null, newarms)

        newarms.splice(id + 1, 0, maxvalue + 1)
        newarms.pop();
        this.setState({arms: newarms})

        // dataForLoadにコピー対象のstateを入れておいて、componentDidMountで読み出されるようにする
        if(!("armlist" in dataForLoad)) {
            // もしdataForLoadが更新される前だったらkeyを作っておく
            dataForLoad["armlist"] = {}
        }
        dataForLoad.armlist[id + 1] = state;

        var newalist = this.state.alist;
        newalist.splice(id + 1, 0, state)
        newalist.pop();
        this.setState({alist: newalist})

        // Root へ変化を伝搬
        this.props.onChange(newalist, false);
    },
    handleOnRemove: function(id, keyid, state) {
        var newarms = this.state.arms
        var maxvalue = Math.max.apply(null, newarms)

        // 該当の "key" を持つものを削除する
        newarms.splice(this.state.arms.indexOf(keyid), 1)
        // 1個補充
        newarms.push(maxvalue + 1)
        this.setState({arms: newarms})

        //dataForLoadにinitial stateを入れておいて、componentDidMountで読み出されるようにする
        if(!("armlist" in dataForLoad)) {
            dataForLoad["armlist"] = {}
        }
        dataForLoad.armlist[newarms.length - 1] = state;

        var newalist = this.state.alist;
        // 削除した分をalistからも削除
        newalist.splice(id, 1)
        // 1個補充
        newalist.push(state)
        this.setState({alist: newalist})

        // Root へ変化を伝搬
        this.props.onChange(newalist, false);
    },
    handleOnChange: function(key, state, isSubtle){
        var newalist = this.state.alist;
        newalist[key] = state;
        this.setState({alist: newalist})
        this.setState({addArm: null})
        this.props.onChange(newalist, isSubtle);
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        newState["addArm"] = null
        this.setState(newState)
    },
    addTemplateArm: function(templateArm, considerNum) {
        var minimumID = -1;
        for(key in this.state.alist) {
            if(this.state.alist[key].name == "" && this.state.alist[key].attack == 0){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addArm: templateArm})
            this.setState({addArmID: minimumID})
            this.setState({considerNum: considerNum})
            if(_ua.Mobile || _ua.Tablet) {
                alert("追加しました。")
            }
        } else {
            var newKey = this.props.pleaseAddArmNum() - 1;
            if(newKey >= 0) {
                this.setState({addArm: templateArm})
                this.setState({addArmID: newKey})
                this.setState({considerNum: considerNum})
                if(_ua.Mobile || _ua.Tablet) {
                    alert("追加しました。")
                }
            } else {
                alert("武器がいっぱいです。")
            }
        }
    },
    render: function(){
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var defaultElement = this.state.defaultElement;
        var addArm = this.state.addArm;
        var addArmID = this.state.addArmID;
        var considerNum = this.state.considerNum;

        if(_ua.Mobile) {
            return (
                <div className="armList">
                    <ButtonGroup vertical block>
                        <Button bsStyle="success" bsSize="large" onClick={this.openPresets}>武器テンプレートを開く</Button>
                    </ButtonGroup>
                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                            <span>(最大50件しか表示されません)</span>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredArm onClick={this.addTemplateArm} />
                        </Modal.Body>
                    </Modal>

                    <ControlLabel>属性一括変更</ControlLabel><FormControl componentClass="select" className="element" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.elements} </FormControl>
                    {arms.map(function(arm, ind) {
                        return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                    })}
                </div>
            );
        } else {
            return (
                <div className="armList">
                    <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}>武器テンプレートを開く</Button>
                    <br/>
                    <span>属性一括変更</span>
                    <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector.elements} </FormControl>
                    <Grid fluid>
                        <Row>
                            {arms.map(function(arm, ind) {
                                return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} />;
                            })}
                        </Row>
                    </Grid>

                    <Modal show={this.state.openPresets} onHide={this.closePresets}>
                        <Modal.Header closeButton>
                            <Modal.Title>Presets</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RegisteredArm onClick={this.addTemplateArm} />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        };
    }
});

var RegisteredArm = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            armData: {},
            limit: 50,
            tempArm: {},
            openConsiderNumberModal: false,
            plusNum: 0,
            armLv: 1,
            armSLv: 1,
            additionalSelect: null,
            additionalSelectKey: "",
            additionalSelectClass: "hidden",
            old_element: "light",
            cosmos_skill: "cosmosAT",
        };
    },
    closeConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: false})
    },
    openConsiderNumberModal: function() {
        this.setState({openConsiderNumberModal: true})
    },
    componentDidMount: function() {
        $.ajax({
            url: "./armData.json",
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function(data) {
                this.setState({armData: data})
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 武器データの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    clickedTemplate: function(e) {
        this.setState({tempArm: this.state.armData[e.target.getAttribute("id")]});
        var arm = this.state.armData[e.target.getAttribute("id")]
        this.setState({armLv: parseInt(arm.maxlv)})
        this.setState({armSLv: parseInt(arm.slvmax)})
        if(arm.maxlv == "150") {
            this.setState({selectLevel: selector.levelNoLimit})
            this.setState({selectSkillLevel: selector.skilllevelNoLimit})
        } else {
            this.setState({selectLevel: selector.levelLimit})
            this.setState({selectSkillLevel: selector.skilllevelLimit})
        }
        if(arm.name.indexOf("・属性変更") > 0 || arm.name.indexOf("・覚醒") > 0){
            this.setState({additionalSelectKey: "old_element"})
            this.setState({additionalSelect: selector.elements})
            this.setState({additionalSelectClass: "visible"})
        } else if (arm.name.indexOf("コスモス") > 0) {
            this.setState({additionalSelectKey: "cosmos_skill"})
            this.setState({additionalSelect: selector.cosmosSkills})
            this.setState({additionalSelectClass: "visible"})
        } else {
            this.setState({additionalSelectKey: ""})
            this.setState({additionalSelect: null})
            this.setState({additionalSelectClass: "hidden"})
        }
        this.setState({openConsiderNumberModal: true})
    },
    clickedConsiderNumber: function(e) {
        var arm = this.state.tempArm
        arm["plus"] = this.state.plusNum
        arm["lv"] = this.state.armLv
        arm["slv"] = this.state.armSLv
        if(this.state.additionalSelectKey == "old_element") {
            arm["name"] += "[" + elementTypes[this.state.old_element] + "]"
            arm["element"] = this.state.old_element
            arm["element2"] = this.state.old_element
        } else if(this.state.additionalSelectKey == "cosmos_skill") {
            arm["skill2"] = this.state.cosmos_skill
        }
        this.props.onClick(arm, e.target.value);
        this.setState({openConsiderNumberModal: false})
        this.setState({plusNum: 0})
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var armData = this.state.armData
        var limit = this.state.limit;
        var displayed_count = 0;

        if(_ua.Mobile){
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder="武器名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector.filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>{armData[key].name}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    } else {
                                        return "";
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>
                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>何本追加しますか？</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>
                            <FormControl componentClass="select" value={this.state[this.state.additionalSelectKey]} className={this.state.additionalSelectClass} onChange={this.handleEvent.bind(this, this.state.additionalSelectKey)}>{this.state.additionalSelect}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5本</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10本</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="armTemplate">
                    <FormControl type="text" placeholder="武器名" value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector.filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement)){
                                if(filterText == "" || key.indexOf(filterText) != -1){
                                    return (
                                        <div className="onearm" key={key}>
                                            <p>{armData[key].name}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}
                    </div>
                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>何本追加しますか？</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>
                            <FormControl componentClass="select" value={this.state[this.state.additionalSelectKey]} className={this.state.additionalSelectClass} onChange={this.handleEvent.bind(this, this.state.additionalSelectKey)}>{this.state.additionalSelect}</FormControl>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5本</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9本</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10本</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});

// Arm is a fundamental object corresponding one arm.
var Arm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            attack: 0,
            hp: 0,
            armType: 'sword',
            skill1: 'non',
            skill2: 'non',
            slv: 1,
            considerNumberMin: 0,
            considerNumberMax: 1,
            element: 'fire',
            element2: 'fire',
        };
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = dataForLoad.armlist[this.props.id]
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            newState["element2"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addArm != null && nextProps.addArm != this.props.addArm && this.props.id == nextProps.addArmID ) {
            var newState = this.state
            var newarm = nextProps.addArm

            newState["name"] = newarm.name

            // Lv別処理
            if(newarm.lv == 1) {
                newState["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
                newState["hp"] = parseInt(newarm.minhp) + newarm.plus
            } else if(newarm.lv <= 100) {
                if(newarm.maxlv == "100" || newarm.maxlv == "75") {
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
                } else {
                    // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                    newState["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
                }
            } else {
                // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
                newState["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * parseInt(newarm.plus))
                newState["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + parseInt(newarm.plus))
            }

            if(newarm.lv != parseInt(newarm.maxlv)) newState["name"] += "Lv." + newarm.lv
            if(newarm.plus != 0) newState["name"] += "+" + newarm.plus

            newState["armType"] = newarm.type
            newState["element"] = newarm.element
            newState["skill1"] = newarm.skill1
            newState["element2"] = newarm.element2
            newState["skill2"] = newarm.skill2
            newState["slv"] = newarm.slv
            newState["considerNumberMax"] = parseInt(nextProps.considerNum)

            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    componentDidMount: function(){
       var state = this.state;

       // もし dataForLoad に自分に該当するキーがあるなら読み込む
       // (データロード時に新しく増えたコンポーネント用)
       var armlist = dataForLoad.armlist
       if( armlist != undefined && this.props.id in armlist ){
           state = armlist[this.props.id]
           this.setState(state)
       }

       // もし addArmID が自分のIDと同じなら、templateデータを読み込む
       if(this.props.addArm != null && this.props.id == this.props.addArmID ) {
           var newarm = this.props.addArm

           state["name"] = newarm.name

           // Lv別処理
           if(newarm.lv == 1) {
               state["attack"] = parseInt(newarm.minattack) + 5 * newarm.plus
               state["hp"] = parseInt(newarm.minhp) + newarm.plus
           } else if(newarm.lv <= 100) {
               if(newarm.maxlv == "100" || newarm.maxlv == "75") {
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hp) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
               } else {
                   // 4凸武器の場合は、Lv100以下の計算にattacklv100を使う
                   state["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attacklv100) - parseInt(newarm.minattack))/100.0 + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
                   state["hp"] = Math.floor(newarm.lv * (parseInt(newarm.hplv100) - parseInt(newarm.minhp))/100 + parseInt(newarm.minhp) + parseInt(newarm.plus))
               }
           } else {
               // 4凸がない場合は100までしか入ってこないので例外処理する必要なし
               state["attack"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.attack) - parseInt(newarm.attacklv100))/50 + parseInt(newarm.attacklv100) + 5 * parseInt(newarm.plus))
               state["hp"] = Math.floor((newarm.lv - 100) * (parseInt(newarm.hp) - parseInt(newarm.hplv100))/50 + parseInt(newarm.hplv100) + parseInt(newarm.plus))
           }
           if(newarm.lv != parseInt(newarm.maxlv)) state["name"] += "Lv." + newarm.lv
           if(newarm.plus != 0) state["name"] += "+" + newarm.plus

           state["armType"] = newarm.type
           state["element"] = newarm.element
           state["skill1"] = newarm.skill1
           state["element2"] = newarm.element2
           state["skill2"] = newarm.skill2
           state["slv"] = newarm.slv
           state["considerNumberMax"] = parseInt(this.props.considerNum)

           this.setState(state);
       }
       // 初期化後 state を 上の階層に渡しておく
       // armList では onChange が勝手に上に渡してくれるので必要なし
       this.props.onChange(this.props.id, state, false);
    },
    handleEvent: function(key, e) {
        // input の時は親に送らない
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleSelectEvent: function(key, e) {
        // Selectの時は親に送ってしまっていい
        var newState = this.state
        if(key == "considerNumberMin"){
            if (parseInt(e.target.value) > parseInt(this.state.considerNumberMax)) {
                newState["considerNumberMax"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else if(key == "considerNumberMax") {
            if (parseInt(e.target.value) < parseInt(this.state.considerNumberMin)) {
                newState["considerNumberMin"] = parseInt(e.target.value)
            }
            newState[key] = parseInt(e.target.value)
        } else {
            newState[key] = e.target.value
        }

        this.setState(newState)
        this.props.onChange(this.props.id, newState, false)
    },
    handleOnBlur: function(key, e) {
        // フォーカスが外れた時だけ変更を親に送る
        if(key == "name") {
            this.props.onChange(this.props.id, this.state, true)
        } else {
            this.props.onChange(this.props.id, this.state, false)
        }
    },
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
    },
    clickCopyButton: function(e, state) {
        this.props.onCopy(this.props.id, this.props.keyid, this.state)
    },
    render: function(){
        if(_ua.Mobile) {
            return (
                <table className="table table-bordered">
                <tbody>
                    <tr><th>武器名</th><td><FormControl type="text" placeholder="武器名" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")} /></td></tr>
                    <tr><th>攻撃力</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")} /></td></tr>
                    <tr><th>HP</th><td className="atkhp"><FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")} /></td></tr>
                    <tr><th>種類</th><td className="select"><FormControl componentClass="select" value={this.state.armType} onChange={this.handleSelectEvent.bind(this, "armType")} > {selector.armtypes} </FormControl></td></tr>
                    <tr><th>スキル</th>
                    <td>
                        <FormControl componentClass="select" className="element" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} > {selector.elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill1} onChange={this.handleSelectEvent.bind(this, "skill1")} > {selector.skills}</FormControl><br/>
                        <FormControl componentClass="select" className="element" value={this.state.element2} onChange={this.handleSelectEvent.bind(this, "element2")} > {selector.elements} </FormControl>
                        <FormControl componentClass="select" className="skill" value={this.state.skill2} onChange={this.handleSelectEvent.bind(this, "skill2")} > {selector.skills}</FormControl>
                    </td></tr>
                    <tr><th>スキルレベル</th><td className="select"><FormControl componentClass="select" value={this.state.slv} onChange={this.handleSelectEvent.bind(this, "slv")} > {selector.slv} </FormControl></td></tr>
                    <tr><th>考慮本数</th><td className="consider">
                        min: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMin} onChange={this.handleSelectEvent.bind(this, "considerNumberMin")} > {selector.consider} </FormControl><br/>
                        max: <FormControl componentClass="select" className="consider" value={this.state.considerNumberMax} onChange={this.handleSelectEvent.bind(this, "considerNumberMax")} > {selector.consider} </FormControl>
                    </td></tr>
                    <tr><th>操作</th>
                    <td>
                        <ButtonGroup>
                            <Button bsStyle="primary" onClick={this.clickRemoveButton}>削除</Button>
                            <Button bsStyle="primary" onClick={this.clickCopyButton}>コピー</Button>
                        </ButtonGroup>
                    </td></tr>
                </tbody>
                </table>
            );
        } else {
            return (
                <Col xs={12} md={12} lg={12} className="col-bordered">
                    <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>武器名　</InputGroup.Addon>
                        <FormControl type="text" placeholder="武器名" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>攻撃力　</InputGroup.Addon>
                    <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>HP&nbsp;&nbsp;　　</InputGroup.Addon>
                        <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>種類　　</InputGroup.Addon>
                    <td><FormControl componentClass="select" value={this.state.armType} onChange={this.handleSelectEvent.bind(this, "armType")} > {selector.armtypes} </FormControl></td>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>スキル1&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} > {selector.elements} </FormControl>
                        <FormControl componentClass="select" value={this.state.skill1} onChange={this.handleSelectEvent.bind(this, "skill1")} > {selector.skills}</FormControl><br/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>スキル2&nbsp;</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.element2} onChange={this.handleSelectEvent.bind(this, "element2")} > {selector.elements} </FormControl>
                        <FormControl componentClass="select" value={this.state.skill2} onChange={this.handleSelectEvent.bind(this, "skill2")} > {selector.skills}</FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>SLv&nbsp;　　</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.slv} onChange={this.handleSelectEvent.bind(this, "slv")} > {selector.slv} </FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>最小本数</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.considerNumberMin} onChange={this.handleSelectEvent.bind(this, "considerNumberMin")} > {selector.consider} </FormControl>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Addon>最大本数</InputGroup.Addon>
                        <FormControl componentClass="select" value={this.state.considerNumberMax} onChange={this.handleSelectEvent.bind(this, "considerNumberMax")} > {selector.consider} </FormControl>
                    </InputGroup>
                    <ButtonGroup block>
                        <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0 2px 0"}} onClick={this.clickRemoveButton}>削除</Button>
                        <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0 2px 0"}} onClick={this.clickCopyButton}>コピー</Button>
                    </ButtonGroup>
                    </FormGroup>
                </Col>
            );
        }
    }
});

var Profile = React.createClass({
    getDefaultProps() {
        var zenithBonuses = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
        var alljobs = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{Jobs[opt].name}</option> });

        return {
            zenithBonuses: zenithBonuses,
            alljobs: alljobs,
        };
    },
    componentDidMount: function(){
       // 初期化後 state を 上の階層に渡しておく
       this.props.onChange(this.state);
    },
    componentWillReceiveProps: function(nextProps){
        // only fired on Data Load
        if(nextProps.dataName != this.props.dataName) {
            var newState = dataForLoad.profile
            this.setState(newState);
            this.props.onChange(newState);
        }
    },
    getInitialState: function() {
        return {
            rank: 1,
            zenithAttackBonus: 3000,
            zenithHPBonus: 1000,
            masterBonus: 0,
            masterBonusHP: 0,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            hpBuff: 0,
            daBuff: 0,
            taBuff: 0,
            hp: 100,
            remainHP: 100,
            zenithBonus1: "無し",
            zenithBonus2: "無し",
            enemyElement: "fire",
            enemyDefense: 10.0,
            job: "none",
            element: "fire",
            DA: 6.5,
            TA: 3.0,
            ougiGageBuff: 0,
            ougiRatio: 4.5,
            minimumHP: 0,
        };
    },
    handleEvent: function(key, e) {
        // input タイプの入力フォームはonBlurを利用する
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    handleOnBlur: function(e) {
        // フォーカスが外れた時だけ変更を親に送る
        this.props.onChange(this.state)
    },
    handleSelectEvent: function(key, e) {
        // select タイプの入力フォームはonChangeの際で良い
        var newState = this.state
        newState[key] = e.target.value
        if(key == "job") {
            newState.DA = Jobs[e.target.value].DaBonus
            newState.TA = Jobs[e.target.value].TaBonus
        }
        this.setState(newState)
        this.props.onChange(newState)
    },
    render: function() {
        if(_ua.Mobile) {
            return (
                <div className="profile">
                    <h3> ジータさん情報 (*: 推奨入力項目)</h3>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="prof">Rank*</th>
                            <th className="prof">ゼニス攻撃力*</th>
                            <th className="prof">ゼニスHP</th>
                            <th className="prof">マスボ<br/>ATK(%)*</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="1" max="175" value={this.state.rank} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "rank")}/></td>
                            <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleSelectEvent.bind(this, "zenithAttackBonus")} > {selector.zenithAttack} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithHPBonus")} > {selector.zenithHP} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleSelectEvent.bind(this, "masterBonus")}>{selector.masteratk}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">マスボ<br/>HP(%)*</th>
                            <th className="prof">ジョブ*</th>
                            <th className="prof">残HP(%)<br/>(ジータさんのみ)</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleSelectEvent.bind(this, "masterBonusHP")}>{selector.masterhp}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleSelectEvent.bind(this, "job")} > {this.props.alljobs}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">ジータ属性*</th>
                            <th className="prof">敵の属性*</th>
                            <th className="prof">武器ゼニス1</th>
                            <th className="prof">武器ゼニス2</th>
                        </tr>
                        <tr>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")}> {selector.elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {selector.elements} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleSelectEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleSelectEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                        </tr>
                        <tr>
                            <th className="prof">基礎DA率</th>
                            <th className="prof">基礎TA率</th>
                            <th className="prof">敵防御固有値</th>
                            <th className="prof">奥義倍率</th>
                        </tr>
                        <tr>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {selector.enemydeftypes} </FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {selector.ougiRatio} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>
                    <span>
                    {Jobs[this.state.job].name}:
                    得意 [{armTypes[Jobs[this.state.job].favArm1]}, {armTypes[Jobs[this.state.job].favArm2]}],
                    {jobTypes[Jobs[this.state.job].type]}タイプ,
                    攻撃ボーナス {Jobs[this.state.job].atBonus},
                    HPボーナス {Jobs[this.state.job].hpBonus},
                    攻刃バフ {Jobs[this.state.job].kouzinBonus},
                    守護バフ {Jobs[this.state.job].shugoBonus},
                    基礎DA率 {Jobs[this.state.job].DaBonus}%,
                    基礎TA率 {Jobs[this.state.job].TaBonus}%
                    </span>

                    <h3> パーティ全体への効果 (%表記)</h3>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th className="buff">通常バフ</th>
                            <th className="buff">属性バフ</th>
                            <th className="buff">その他バフ</th>
                            <th className="buff">HPバフ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" value={this.state.normalBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.elementBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.otherBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                            <td><FormControl type="number"  min="0" value={this.state.hpBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                        </tr><tr>
                            <th className="buff">DAバフ</th>
                            <th className="buff">TAバフ</th>
                            <th className="buff">残HP(%)</th>
                            <th className="prof">奥義ゲージ上昇率アップ</th>
                        </tr><tr>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.daBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                            <td><FormControl type="number"  min="0" max="100" value={this.state.taBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                            <td><FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl></td>
                            <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.ougiGageBuff} </FormControl></td>
                        </tr>
                        </tbody>
                    </table>

                    <h3 className="margin-top"> Advanced settings</h3>
                    <p>もっともっと詳しく計算したい方向けの項目です。</p>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="advanced-setting">項目名</th>
                            <th></th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="advanced-setting">敵防御固有値</th>
                            <td className="advanced-setting"><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {selector.enemydeftypes} </FormControl></td>
                            <td className="advanced-setting">
                            想定される敵の防御固有値を設定します。<br/>
                            単攻撃ダメージ、奥義ダメージ、<br/>
                            予想ターン毎ダメージの計算に影響します。<br/>
                            (単攻撃ダメージに減衰補正がかかる(44万超え)<br/>
                             ような攻撃力でない限り、編成の順位自体は変化しないと思われます。)
                            </td>
                        </tr>
                        <tr>
                            <th className="advanced-setting">ジータさん<br/>基礎DA率</th>
                            <td className="advanced-setting"><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td className="advanced-setting">ジータさんの基礎DA率を設定します。<br/>ジョブを変更すると自動的に切り替わります。</td>
                        </tr>
                        <tr>
                            <th className="advanced-setting">ジータさん<br/>基礎TA率</th>
                            <td className="advanced-setting"><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td className="advanced-setting">ジータさんの基礎TA率を設定します。<br/>ジョブを変更すると自動的に切り替わります。</td>
                        </tr>
                        <tr>
                            <th className="advanced-setting">ジータさん<br/>奥義倍率</th>
                            <td className="advanced-setting"><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {selector.ougiRatio} </FormControl></td>
                            <td className="advanced-setting">ジータさんの奥義倍率を設定します。<br/>奥義ダメージ、予想ターン毎ダメージの計算に影響します。</td>
                        </tr>
                        <tr>
                            <th className="advanced-setting">確保したい<br/>ジータさんHP</th>
                            <td className="advanced-setting"><FormControl type="number"  min="0" value={this.state.minimumHP} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "minimumHP")}/></td>
                            <td className="advanced-setting">暴君・守護など混みの最終HPの最低ラインを設定できます。<br/>これを下回った編成は表示されません。<br/>(初期値は0です) ジータさんのHPベースです。</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="profile">
                    <h3> ジータさん情報 (*: 推奨入力項目)</h3>
                    <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="table-profile-th">項目名</th>
                            <th></th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="table-profile-th">Rank*</th>
                            <td className="table-profile-td"><FormControl type="number" min="1" max="175" value={this.state.rank} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "rank")}/></td>
                            <td className="table-profile-td">基礎攻撃力、基礎HPなどはランクに従って自動で計算されます</td>
                        </tr><tr>
                            <th className="table-profile-th">ジョブ*</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.job} onChange={this.handleSelectEvent.bind(this, "job")} > {this.props.alljobs} </FormControl></td>
                            <td className="table-profile-td">
                                <p>ジョブごとのボーナス等は自動で反映されます。
                                得意武器補正などを反映したくない場合"なし"を選択して下さい。</p>
                                <ul className="list-group list-unstyled">
                                <li className="list-group-item">ジョブ名:{Jobs[this.state.job].name}</li>
                                <li className="list-group-item">得意1:{armTypes[Jobs[this.state.job].favArm1]}</li>
                                <li className="list-group-item">得意2:{armTypes[Jobs[this.state.job].favArm2]}</li>
                                <li className="list-group-item">タイプ:{jobTypes[Jobs[this.state.job].type]}タイプ</li>
                                <li className="list-group-item">攻撃ボーナス:{Jobs[this.state.job].atBonus}</li>
                                <li className="list-group-item">HPボーナス:{Jobs[this.state.job].hpBonus}</li>
                                <li className="list-group-item">攻刃バフ:{Jobs[this.state.job].kouzinBonus}</li>
                                <li className="list-group-item">守護バフ:{Jobs[this.state.job].shugoBonus}</li>
                                <li className="list-group-item">基礎DA率:{Jobs[this.state.job].DaBonus}%</li>
                                <li className="list-group-item">基礎TA率:{Jobs[this.state.job].TaBonus}%</li>
                                </ul>
                            </td>
                        </tr><tr>
                            <th className="table-profile-th">ゼニス攻撃力*</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleSelectEvent.bind(this, "zenithAttackBonus")} > {selector.zenithAttack} </FormControl></td>
                            <td className="table-profile-td"></td>
                        </tr><tr>
                            <th className="table-profile-th">ゼニスHP</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithHPBonus")} > {selector.zenithHP} </FormControl></td>
                            <td className="table-profile-td"></td>
                        </tr><tr>
                            <th className="table-profile-th">マスターボーナス<br/>ATK*</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleSelectEvent.bind(this, "masterBonus")}>{selector.masteratk}</FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">ジョブマスターボーナスの"攻撃力+○○％"の値です<br/>(各ジョブごとのボーナスとは別です)</td>
                        </tr><tr>
                            <th className="table-profile-th">マスターボーナス<br/>HP</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleSelectEvent.bind(this, "masterBonusHP")}>{selector.masterhp}</FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">ジョブマスターボーナスの"HP+○○％"の値です<br/>(各ジョブごとのボーナスとは別です)</td>
                        </tr><tr>
                            <th className="table-profile-th">残HP割合<br/>(ジータさんのみ)</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">ジータさんの残りHP割合です。パーティ全体の残りHP割合を一括で指定したい場合は、"パーティ全体への効果"の”残HP割合"を指定して下さい。</td>
                        </tr><tr>
                            <th className="table-profile-th">ジータさん属性*</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")}> {selector.elements} </FormControl></td>
                            <td className="table-profile-td">ジータさんの属性です</td>
                        </tr><tr>
                            <th className="table-profile-th">敵の属性*</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {selector.elements} </FormControl></td>
                            <td className="table-profile-td">有利/非有利/不利は、敵の属性に従って自動で判定されます。</td>
                        </tr><tr>
                            <th className="table-profile-th">武器ゼニス1({armTypes[Jobs[this.state.job].favArm1]})</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleSelectEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </FormControl></td>
                            <td className="table-profile-td">得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。</td>
                        </tr><tr>
                            <th className="table-profile-th">武器ゼニス2({armTypes[Jobs[this.state.job].favArm2]})</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleSelectEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </FormControl></td>
                            <td className="table-profile-td">得意武器IIのゼニス（★4以上）は、Iをすべてマスター済みという前提で各6%, 8%, 10%として計算します。</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                    <h3 className="margin-top"> パーティ全体への効果 (%表記)</h3>
                    <p>パーティメンバ全体にかかるバフ等の情報を入力してください</p>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="table-profile-th">項目名</th>
                            <th></th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        </tr><tr>
                            <th className="table-profile-th">通常バフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" value={this.state.normalBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "normalBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">通常枠のバフ</td>
                        </tr><tr>
                            <th className="table-profile-th">属性バフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" value={this.state.elementBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "elementBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">属性枠のバフ</td>
                        </tr><tr>
                            <th className="table-profile-th">その他バフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" value={this.state.otherBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "otherBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">別枠乗算のバフ(乗算を複数加味したい場合は乗算後の値を入力してください)</td>
                        </tr><tr>
                            <th className="table-profile-th">HPバフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" value={this.state.hpBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">HP上昇のバフ(古戦場スタックとかの計算用)</td>
                        </tr><tr>
                            <th className="table-profile-th">DAバフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" max="100" value={this.state.daBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "daBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">DA率が上がります。各キャラの基礎DA率に加算されます。</td>
                        </tr><tr>
                            <th className="table-profile-th">TAバフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl type="number"  min="0" max="100" value={this.state.taBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "taBuff")}/>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">TA率が上がります。各キャラの基礎TA率に加算されます。</td>
                        </tr><tr>
                            <th className="table-profile-th">残HP割合</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">パーティ全体の残りHP割合です。(キャラ個別の値が入力されている場合、より低い方を採用します)</td>
                        </tr><tr>
                            <th className="table-profile-th">追加ダメージバフ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.ougiGageBuff} </FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">追加ダメージが発生するとしてダメージを上乗せします。予想ターン毎ダメージの算出に使用されます。</td>
                        </tr><tr>
                            <th className="table-profile-th">奥義ゲージ上昇率アップ</th>
                            <td className="table-profile-td">
                            <InputGroup>
                            <FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.ougiGageBuff} </FormControl>
                            <InputGroup.Addon>%</InputGroup.Addon>
                            </InputGroup>
                            </td>
                            <td className="table-profile-td">奥義ゲージ上昇量に影響します。予想ターン毎ダメージの算出に使用されます。</td>
                        </tr>
                        </tbody>
                    </table>

                    <h3 className="margin-top"> Advanced settings</h3>
                    <p>もっともっと詳しく計算したい方向けの項目です。</p>
                    <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="table-profile-th">項目名</th>
                            <th></th>
                            <th>説明</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="table-profile-th">敵防御固有値</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {selector.enemydeftypes} </FormControl></td>
                            <td className="table-profile-td">
                            想定される敵の防御固有値を設定します。<br/>
                            単攻撃ダメージ、奥義ダメージ、<br/>
                            予想ターン毎ダメージの計算に影響します。<br/>
                            (単攻撃ダメージに減衰補正がかかる(44万超え)<br/>
                             ような攻撃力でない限り、編成の順位自体は変化しないと思われます。)
                            </td>
                        </tr>
                        <tr>
                            <th className="table-profile-th">ジータさん<br/>基礎DA率</th>
                            <td className="table-profile-td"><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                            <td className="table-profile-td">ジータさんの基礎DA率を設定します。<br/>ジョブを変更すると自動的に切り替わります。</td>
                        </tr>
                        <tr>
                            <th className="table-profile-th">ジータさん<br/>基礎TA率</th>
                            <td className="table-profile-td"><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            <td className="table-profile-td">ジータさんの基礎TA率を設定します。<br/>ジョブを変更すると自動的に切り替わります。</td>
                        </tr>
                        <tr>
                            <th className="table-profile-th">ジータさん<br/>奥義倍率</th>
                            <td className="table-profile-td"><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {selector.ougiRatio} </FormControl></td>
                            <td className="table-profile-td">ジータさんの奥義倍率を設定します。<br/>奥義ダメージ、予想ターン毎ダメージの計算に影響します。</td>
                        </tr>
                        <tr>
                            <th className="table-profile-th">確保したい<br/>ジータさんHP</th>
                            <td className="table-profile-td"><FormControl type="number"  min="0" value={this.state.minimumHP} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "minimumHP")}/></td>
                            <td className="table-profile-td">暴君・守護など混みの最終HPの最低ラインを設定できます。<br/>これを下回った編成は表示されません。<br/>(初期値は0です) ジータさんのHPベースです。</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            );
        }
    }
});
var Sys = React.createClass({
    getInitialState: function() {
        return {
            storedData: {},
            dataName: '',
            selectedData: '',
        };
    },
    componentDidMount: function(){
        // localStorage から data をロードする
        if ("data" in localStorage && localStorage.data != "{}" ) {
            var storedData = JSON.parse(Base64.decode(localStorage["data"]))
            this.setState({storedData: storedData})
            this.setState({selectedData: Object.keys(storedData)[0]})
        }
    },
    handleOnClick: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)
    },
    handleEvent: function(key, e) {
      var newState = this.state
      newState[key] = e.target.value
      this.setState(newState)

      if(key == "dataName") {
          // 短縮URL取得時に使用するために保存しておく
          dataForLoad["dataName"] = e.target.value;
      }
    },
    onSubmitRemove: function(e) {
      if(this.state.selectedData != ''){
          // remove data
          var newState = this.state;
          delete newState["storedData"][this.state.selectedData];
          newState.selectedData = Object.keys(this.state.storedData)[0]

          localStorage.setItem("data", Base64.encodeURI(JSON.stringify(newState.storedData)));
          this.setState(newState);
      } else {
          alert("削除するデータを選択して下さい。")
      }
    },
    onSubmitLoad: function(e){
      e.preventDefault();
      if(this.state.selectedData != ''){
          dataForLoad = JSON.parse(JSON.stringify(this.state.storedData[this.state.selectedData]));

          // これは will receive props が発火したあとしか反映されない
          this.setState({dataName: this.state.selectedData});
          this.props.onLoadNewData(this.state.selectedData)
      } else {
          alert("読み込むデータを選択して下さい。")
      }
    },
    onSubmitSave: function(e){
      e.preventDefault();
      if(this.state.dataName != ''){
          var newState = this.state;
          var propsdata = JSON.parse(JSON.stringify(this.props.data));

          // dataName だけ Root に持っていっていないので、上書きしておく
          propsdata["dataName"] = this.state.dataName;

          newState["storedData"][this.state.dataName] = propsdata;
          newState["selectedData"] = this.state.dataName;

          // save data
          var saveString = Base64.encodeURI(JSON.stringify(newState.storedData));
          localStorage.setItem("data", saveString);

          dataForLoad = propsdata;
          this.setState(newState);
      } else {
          alert("データ名を入力して下さい。")
      }
    },
    render: function() {
        var datalist = []
        if(Object.keys(this.state.storedData).length != 0){
            var keys = Object.keys(this.state.storedData);
            datalist = keys.map(function(opt){
                return (
                    <option value={opt} key={opt}>{opt}</option>
                );
            });
        }
        return (
            <div className="dataControl">
                データ名: <FormControl size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} />
                ブラウザに保存されたデータ
                <FormControl componentClass="select" value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >保存</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitLoad} >読込</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitRemove} >削除</Button>
                </ButtonGroup>
            </div>
        );
    }
});

// Twitter Button
var TwitterShareButton = React.createClass ({
    componentWillReceiveProps: function(nextProps){
        var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
        this.setState({datatext: datatext});
    },
    componentDidMount: function(){
        // localStorage から sharehistory をロードする
        if ("sharehist" in localStorage && localStorage.sharehist != "{}" ) {
            var sharehist = JSON.parse(localStorage["sharehist"])
            this.setState({shareurl_history: sharehist})
        }
    },
    getInitialState: function() {
        var datatext = Base64.encodeURI(JSON.stringify(this.props.data))
        return {
            shareurl: "",
            shareurl_history: {},
            datatext: datatext,
        };
    },
    getShortenUrl: function() {
        var data = JSON.parse(JSON.stringify(this.props.data));
        if("dataName" in dataForLoad && dataForLoad["dataName"] != '') {
            // 基本的にSys.dataNameに入力されているものをベースにして保存
            data["dataName"] = dataForLoad["dataName"];
        } else {
            // Sys.dataNameが空の場合
            data["dataName"] = "savedData";
        }

        $.ajax({
            url: "getshort.php",
            type: 'POST',
            dataType: 'text',
            cache: false,
            timeout: 10000,
            data: {datachar: Base64.encodeURI(JSON.stringify(data))},
            success: function(data, datatype) {
                var shareurl = 'http://hsimyu.net/motocal?id=' + data
                var tweeturl = 'https://twitter.com/intent/tweet?';
                tweeturl += 'text=元カレ計算機（グラブル攻撃力計算機）'
                tweeturl += '&url=' + shareurl
                window.open(tweeturl, '_blank')
                var sharehist = this.state.shareurl_history
                sharehist[this.props.data["dataName"]] = shareurl;
                this.setState({shareurl: shareurl, shareurl_history: sharehist})
                localStorage.setItem("sharehist", JSON.stringify(sharehist));
            }.bind(this),
            error: function(xhr, status, err) {
                alert("Error!: 何かがおかしいです。@hsimyuまで連絡して下さい。status: ", status, ", error message: ", err.toString());
            }.bind(this)
        });
    },
    render: function() {
      var sharehist = this.state.shareurl_history;
      return (
            <div className="tweet">
                <Button bsStyle="primary" className="tweetButton" onClick={this.getShortenUrl}> サーバに保存<br/>(短縮URLを取得) </Button>
                <div className="list-group">
                {Object.keys(sharehist).map(function(s, ind){
                    return (
                        <a className="list-group-item" href={sharehist[s]} key={s} >{s}: {sharehist[s]} </a>
                    )
                })}
                </div>
            </div>
       );
    },
});

ReactDOM.render(<Root />, document.getElementById('app'));
