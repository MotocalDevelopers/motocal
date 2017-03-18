var React = require('react');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var Profile = require('./profile.js')
var SimulatorInput = require('./simulator.js')
var GlobalConst = require('./global_const.js')
var Notice = require('./notice.js')
var {ResultList, Result, StoredListEditor, ControlAutoUpdate} = require('./result.js')
var {HowTo, NiteHowTo, HPChartHowTo} = require('./howto.js')
var {ColP} = require('./gridp.js')
var intl = require('./translate.js')
var {RegisteredArm, RegisteredChara} = require('./template.js')
var dataForLoad = GlobalConst.dataForLoad
var TextWithTooltip = GlobalConst.TextWithTooltip
var ElementColorLabel = GlobalConst.ElementColorLabel

// inject GlobalConst...
var elementRelation = GlobalConst.elementRelation
var bahamutRelation = GlobalConst.bahamutRelation
var bahamutFURelation = GlobalConst.bahamutFURelation
var supportAbilities = GlobalConst.supportAbilities
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

var touchPositionX = null;
var touchPositionY = null;
var touchDirection = null;

// Root class contains [Profile, ArmList, Results].
var Root = React.createClass({
  getInitialState: function() {
      var initial_width = 25;
      var initial_height = 100;

      return {
          armNum: 6,
          summonNum: 2,
          charaNum: 4,
          profile: [],
          armlist: [],
          chara: [],
          summon: [],
          simulator: [],
          dataName: '',
          sortKey: "averageCyclePerTurn",
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
          locale: intl.getLocale(),
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
      touchPositionX = this.getPositionX(e)
      touchPositionY = this.getPositionY(e)
      touchDirection = ''
  },
  onTouchMove: function(e) {
      //スワイプの方向（left / right）を取得
      var td = "none";
      // 縦方向に大きなスワイプの場合は無視
      if(Math.abs(touchPositionY - this.getPositionY(e)) < 20) {
          if (touchPositionX - this.getPositionX(e) > 100) {
              td = 'right'; //左と検知
          } else if (touchPositionX - this.getPositionX(e) < -100){
              td = 'left'; //右と検知
          }
      }
      touchDirection = td
  },
  onTouchEnd: function(e) {
      // if(touchDirection == "left" || touchDirection == "right") {
      //     this.swipeTab(touchDirection);
      // }
  },
  //横方向の座標を取得
  getPositionX: function(e) {
      return e.touches[0].pageX;
  },
  //縦方向の座標を取得
  getPositionY: function(e) {
      return e.touches[0].pageY;
  },
  swipeTab: function(direction){
      document.querySelector("div#" + this.state.activeKey).setAttribute("class", "Tab hidden")
      var newActiveKey = "";

      if(direction == "left") {
          switch(this.state.activeKey) {
              case "inputTab":
                  newActiveKey = "systemTab"
                  break;
              case "summonTab":
                  newActiveKey = "inputTab"
                  break;
              case "charaTab":
                  newActiveKey = "summonTab"
                  break;
              case "armTab":
                  newActiveKey = "charaTab"
                  break;
              case "resultTab":
                  newActiveKey = "armTab"
                  break;
              case "systemTab":
                  newActiveKey = "resultTab"
                  break;
          }
      } else {
          switch(this.state.activeKey) {
              case "inputTab":
                  newActiveKey = "summonTab"
                  break;
              case "summonTab":
                  newActiveKey = "charaTab"
                  break;
              case "charaTab":
                  newActiveKey = "armTab"
                  break;
              case "armTab":
                  newActiveKey = "resultTab"
                  break;
              case "resultTab":
                  newActiveKey = "systemTab"
                  break;
              case "systemTab":
                  newActiveKey = "inputTab"
                  break;
          }
      }
      document.querySelector("div#" + newActiveKey).setAttribute("class", "Tab")
      this.setState({activeKey: newActiveKey})
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
              initState["activeKey"] = "inputTab"
              initState["rootleftHeight"] = oldState.rootleftHeight
              initState["rootleftWidth"] = oldState.rootleftWidth
              initState["rootrightHeight"] = oldState.rootrightHeight
              initState["rootrightWidth"] = oldState.rootrightWidth
              initState["locale"] = intl.getLocale()

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
  componentDidUpdate: function() {
      window.dispatchEvent(new Event('resize'))
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
      this.setState({profile: dataForLoad.profile});
      this.setState({summon: dataForLoad.summon});
      this.setState({armlist: dataForLoad.armlist});
      this.setState({chara: dataForLoad.chara});
      this.setState({simulator: dataForLoad.simulator});
      this.setState({dataName: newDataName});
      this.setState({noResultUpdate: false});
  },
  changeLang: function(key, e) {
      if(key != "ja" && key != "en") key = "ja";

      this.setState({locale: key});
  },
  handleChangeTab: function(eventKey){
      var activeKey = (this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey
      document.querySelector("div#" + activeKey).setAttribute("class", "Tab hidden")

      var target = document.querySelector("div#" + eventKey)
      target.setAttribute("class", "Tab");
      this.setState({activeKey: eventKey})
      this.setState({noResultUpdate: true});
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
    var locale = this.state.locale
    if(_ua.Mobile || _ua.Tablet) {
        return (
            <div className="root" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
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
                <div className="smartphone-content">
                    <div className="Tab" id="inputTab">
                        <h2 style={{"marginTop": "10px", "marginBottom": "5px"}} >{intl.translate("motocal", locale)}</h2>
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={locale} dataForLoad={dataForLoad} />
                    </div>
                    <div className="Tab hidden" id="summonTab">
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} locale={locale} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>{intl.translate("追加", locale)}(現在{this.state.summonNum}組)</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} locale={locale} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>{intl.translate("追加", locale)}(現在{this.state.charaNum}人)</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum} locale={locale}/>
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>{intl.translate("追加", locale)}(現在{this.state.armNum}本)</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="resultTab">
                        <ResultList
                            profile={this.state.profile}
                            armlist={this.state.armlist}
                            chara={this.state.chara}
                            summon={this.state.summon}
                            sortKey={this.state.sortKey}
                            simulator={this.state.simulator}
                            noResultUpdate={this.state.noResultUpdate}
                            onChangeSortkey={this.handleEvent.bind(this, "sortKey")}
                            locale={locale}
                         />
                    </div>
                    <div className="Tab hidden" id="systemTab">
			<ButtonGroup>
			    <Button onClick={this.changeLang.bind(this, "ja")}>日本語</Button>
			    <Button onClick={this.changeLang.bind(this, "en")}>English</Button>
			    <DropdownButton title={intl.translate("使い方", locale)}>
				<MenuItem onClick={this.openHowTo}>{intl.translate("使い方", locale)}</MenuItem>
				<MenuItem onClick={this.openNiteHowTo}>二手等について </MenuItem>
			    </DropdownButton>
			</ButtonGroup>
                        <div className="systemList">
                            <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
                            <TwitterShareButton data={this.state} locale={locale} />
                            <Notice locale={locale} />
                        </div>
                    </div>
                </div>
		<Nav className="footerNav" bsStyle="pills" activeKey={(this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey} onSelect={this.handleChangeTab}>
                    <NavItem eventKey="inputTab">{intl.translate("ジータ", locale)}</NavItem>
                    <NavItem eventKey="summonTab">{intl.translate("召喚石", locale)}</NavItem>
                    <NavItem eventKey="charaTab">{intl.translate("キャラ", locale)}</NavItem>
                    <NavItem eventKey="armTab">{intl.translate("武器", locale)}</NavItem>
                    <NavItem eventKey="resultTab">{intl.translate("結果", locale)}</NavItem>
                    <NavItem eventKey="systemTab">{intl.translate("保存", locale)}</NavItem>
                </Nav>
            </div>
        );
    } else {
        return (
            <div className="root">
                <div className="rootleft" id="rootleft2" style={{height: this.state.rootleftHeight + "%", width: this.state.rootleftWidth +"%"}}>
                    <h1> {intl.translate("motocal", locale)} </h1>
                    <Navbar fluid>
                        <Navbar.Header>
                        <Navbar.Brand> motocal </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavDropdown id="dropdown_howto" title={intl.translate("使い方", locale)}>
                            <MenuItem> <p onClick={this.openHowTo}>{intl.translate("使い方", locale)}</p> </MenuItem>
                            <MenuItem> <p onClick={this.openNiteHowTo}> 二手技巧等込みの最適編成について </p> </MenuItem>
                            <MenuItem> <p onClick={this.openSimulatorHowTo}> ダメージシミュレータについて </p> </MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight>
                            <ButtonGroup>
                                <Button bsSize="small" onClick={this.changeLang.bind(this, "ja")}>日本語</Button>
                                <Button bsSize="small" onClick={this.changeLang.bind(this, "en")}>English</Button>
                            </ButtonGroup>
                        </Navbar.Form>
                    </Navbar>
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
                        <NavItem eventKey="inputTab">{intl.translate("ジータ", locale)}</NavItem>
                        <NavItem eventKey="summonTab">{intl.translate("召喚石", locale)}</NavItem>
                        <NavItem eventKey="charaTab">{intl.translate("キャラ", locale)}</NavItem>
                        <NavItem eventKey="armTab">{intl.translate("武器", locale)}</NavItem>
                        <NavItem eventKey="simulatorTab"><s>Simu</s></NavItem>
                        <NavItem eventKey="systemTab">{intl.translate("保存", locale)}</NavItem>
                    </Nav>
                    <div className="Tab" id="inputTab">
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={this.state.locale} dataForLoad={dataForLoad} />
                    </div>
                    <div className="Tab hidden" id="summonTab">
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} locale={locale} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>{intl.translate("追加", locale)}</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} locale={locale} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>{intl.translate("追加", locale)}</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddCharaNum={this.addCharaNum} pleaseAddArmNum={this.addArmNum} locale={locale} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>{intl.translate("追加", locale)}</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="systemTab">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
                        <TwitterShareButton data={this.state} locale={locale}/>
                        <Notice locale={locale} />
                    </div>
                    <div className="Tab hidden" id="simulatorTab">
                        <SimulatorInput dataName={this.state.dataName} dataForLoad={dataForLoad.simulator} chara={this.state.chara} onChange={this.onChangeSimulationData} />
                    </div>
                </div>
                <div draggable="true" className="drag-hr bg-info" onDragEnd={this.onDragEnd}></div>
                <div className="rootRight" style={{height: this.state.rootrightHeight + "%", width: "calc(" + this.state.rootrightWidth + "% - 12px)"}} >
                    <ResultList
                        profile={this.state.profile}
                        armlist={this.state.armlist}
                        chara={this.state.chara}
                        summon={this.state.summon}
                        sortKey={this.state.sortKey}
                        simulator={this.state.simulator}
                        noResultUpdate={this.state.noResultUpdate}
                        onChangeSortkey={this.handleEvent.bind(this, "sortKey")}
                        locale={locale}
                     />
                </div>
            </div>
        );
    }
  }
});

var CharaList = React.createClass({
    getInitialState: function() {
        var charas = [];
        for(var i=0; i < this.props.charaNum; i++) {
            charas.push(i);
        }

        return {
            charalist: [],
            charas: charas,
            defaultElement: "fire",
            addChara: null,
            addCharaID: -1,
            openPresets: false,
        };
    },
    updateCharaNum: function(num) {
        var charas = this.state.charas

        if(charas.length < num) {
            var maxvalue = Math.max.apply(null, charas)
            for(var i = 0; i < (num - charas.length); i++){
                charas.push(i + maxvalue + 1)
            }
        } else {
            // ==の場合は考えなくてよい (問題がないので)
            while(charas.length > num){
                charas.pop();
            }
        }
        this.setState({charas: charas})
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
        this.updateCharaNum(nextProps.charaNum)
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
    handleOnRemove: function(id, keyid, state) {
        var newcharas = this.state.charas
        var maxvalue = Math.max.apply(null, newcharas)

        // 該当の "key" を持つものを削除する
        newcharas.splice(id, 1)
        // 1個補充
        newcharas.push(maxvalue + 1)
        this.setState({charalist: newcharas})

        // dataForLoadにinitial stateを入れておいて、componentDidMountで読み出されるようにする
        if(!("chara" in dataForLoad)) {
            dataForLoad["chara"] = {}
        }
        dataForLoad.chara[newcharas.length - 1] = state;

        var newcharalist = this.state.charalist;
        // 削除した分をlistからも削除
        newcharalist.splice(id, 1)
        // 1個補充
        newcharalist.push(state)
        this.setState({charalist: newcharalist})

        // Root へ変化を伝搬
        this.props.onChange(newcharalist, false);
    },
    handleMoveUp: function(id){
        if(id > 0) {
            var newcharas = this.state.charas

            // charas swap
            newcharas.splice(id - 1, 2, newcharas[id], newcharas[id - 1])
            this.setState({charas: newcharas})

            // charalist swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id - 1, 2, newcharalist[id], newcharalist[id - 1])
            this.setState({charalist: newcharalist})
            // Root へ変化を伝搬
            this.props.onChange(newcharalist, false);
        }
    },
    handleMoveDown: function(id){
        if(id < this.props.charaNum - 1) {
            var newcharas = this.state.charas

            // charas swap
            newcharas.splice(id, 2, newcharas[id + 1], newcharas[id])
            this.setState({charas: newcharas})

            // charalist swap
            var newcharalist = this.state.charalist;
            newcharalist.splice(id, 2, newcharalist[id + 1], newcharalist[id])
            this.setState({charalist: newcharalist})
            // Root へ変化を伝搬
            this.props.onChange(newcharalist, false);
        }
    },
    addTemplateChara: function(templateChara) {
        var minimumID = -1;
        for(key in this.state.charalist) {
            if(this.state.charalist[key].name == ""){
                minimumID = key;
                break;
            }
        }
        if(minimumID >= 0) {
            this.setState({addChara: templateChara})
            this.setState({addCharaID: minimumID})
            if(_ua.Mobile || _ua.Tablet) {
                alert(intl.translate("追加しました", this.props.locale))
            }
        } else {
            var newKey = this.props.pleaseAddCharaNum() - 1;

            if(newKey >= 0) {
                this.setState({addChara: templateChara})
                this.setState({addCharaID: newKey})
                if(_ua.Mobile || _ua.Tablet) {
                    alert(intl.translate("追加しました", this.props.locale))
                }
            } else {
                alert(intl.translate("キャラがいっぱい", this.props.locale))
            }
        }
    },
    render: function() {
        var locale = this.props.locale;
        var charas = this.state.charas;
        var hChange = this.handleOnChange;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        var addChara = this.state.addChara
        var addCharaID = this.state.addCharaID
        var handleOnRemove = this.handleOnRemove
        var handleMoveUp = this.handleMoveUp
        var handleMoveDown = this.handleMoveDown
        var openPresets = this.openPresets

        return (
            <div className="charaList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("キャラテンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>
                <Grid fluid style={{"width": "100%"}} >
                    <Row>
                    {charas.map(function(c, ind) {
                        return <Chara key={c} keyid={c} onChange={hChange} onRemove={handleOnRemove} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} id={ind} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} locale={locale} openPresets={openPresets} />;
                    })}
                    </Row>
                </Grid>

                <Modal show={this.state.openPresets} onHide={this.closePresets}>
                    <Modal.Header closeButton>
                        <Modal.Title>Presets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisteredChara onClick={this.addTemplateChara} locale={locale} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
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
            support2: "none",
            type: "attack",
            favArm: "dagger",
            favArm2: "none",
            remainHP: 100,
            DA: 6.5,
            TA: 3.0,
            isConsideredInAverage: true,
            openBufflist: false,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            additionalDamageBuff: 0,
            daBuff: 0,
            taBuff: 0,
            ougiGageBuff: 0,
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
           state = this.setNewCharaState(state, newchara)
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
                return 0;
            }
        }

        if(nextProps.defaultElement != this.props.defaultElement) {
            var newState = this.state
            newState["element"] = nextProps.defaultElement
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }

        if(nextProps.addChara != null && nextProps.addChara != this.props.addChara && this.props.id == nextProps.addCharaID ) {
            var newchara = nextProps.addChara
            var newState = this.setNewCharaState(this.state, newchara)
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    setNewCharaState: function(newState, newchara){
        newState["name"] = newchara[this.props.locale]
        newState["attack"] = parseInt(newchara.attack)
        newState["hp"] = parseInt(newchara.hp)
        newState["type"] = newchara.type
        newState["race"] = newchara.race
        newState["element"] = newchara.element
        newState["favArm"] = newchara.fav1
        newState["favArm2"] = newchara.fav2
        newState["DA"] = parseFloat(newchara.baseDA)
        newState["TA"] = parseFloat(newchara.baseTA)
        newState["support"] = newchara.support
        newState["support2"] = newchara.support2

        return newState;
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
    openPresets: function(e) {
        if(e.target.value == "" && this.state.attack == 0) {
            e.target.blur()
            this.setState({attack: 1})
            this.props.openPresets()
        }
    },
    clickRemoveButton: function(e) {
        this.props.onRemove(this.props.id, this.props.keyid, this.getInitialState())
    },
    clickMoveUp: function(e) {
        this.props.onMoveUp(this.props.id)
    },
    clickMoveDown: function(e) {
        this.props.onMoveDown(this.props.id)
    },
    switchBufflist: function(e) {
        this.setState({openBufflist: !(this.state.openBufflist)})
    },
    render: function() {
        var locale = this.props.locale

        return (
            <ColP sxs={12} ssm={6} smd={4} className="col-no-bordered">
                {(this.props.id < 3) ?
                    <h3><Label bsStyle="primary">Front No.{this.props.id+1}</Label></h3>
                        :
                    <h3><Label bsStyle="default">Sub No.{this.props.id+1}</Label></h3>
                }

                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <th className="bg-primary">{intl.translate("キャラ名", locale)}</th>
                            <td>
                            <InputGroup>
                                <FormControl componentClass="textarea" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets} onChange={this.handleEvent.bind(this, "name")}/>
                                <InputGroup.Addon>
                                <Checkbox inline checked={this.state.isConsideredInAverage} onChange={this.handleSelectEvent.bind(this, "isConsideredInAverage")}>{intl.translate("平均に含める", locale)}</Checkbox>
                                </InputGroup.Addon>
                            </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("属性", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} >{selector[locale].elements}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("種族", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.race} onChange={this.handleSelectEvent.bind(this, "race")} >{selector[locale].races}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("タイプ", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.type} onChange={this.handleSelectEvent.bind(this, "type")} >{selector[locale].types}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("得意武器", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.favArm} onChange={this.handleSelectEvent.bind(this, "favArm")} >{selector[locale].armtypes}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("得意武器", locale)}2</th>
                            <td><FormControl componentClass="select" value={this.state.favArm2} onChange={this.handleSelectEvent.bind(this, "favArm2")} >{selector[locale].armtypes}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("素の攻撃力", locale)}</th>
                            <td><FormControl type="number" min="0" max="15000" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")}/></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("素のHP", locale)}</th>
                            <td><FormControl type="number" min="0" max="5000" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")}/></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("残HP割合", locale)}</th>
                            <td><FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("基礎DA率", locale)}</th>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur.bind(this, "DA")} onChange={this.handleEvent.bind(this, "DA")}/></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("基礎TA率", locale)}</th>
                            <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur.bind(this, "TA")} onChange={this.handleEvent.bind(this, "TA")}/></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("サポアビ", locale)}1</th>
                            <td><FormControl componentClass="select" value={this.state.support} onChange={this.handleSelectEvent.bind(this, "support")}>{selector.supportAbilities}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("サポアビ", locale)}2</th>
                            <td><FormControl componentClass="select" value={this.state.support2} onChange={this.handleSelectEvent.bind(this, "support2")}>{selector.supportAbilities}</FormControl></td>
                        </tr>
                        <tr>
                            <th className="bg-primary"><Button onClick={this.switchBufflist}>{intl.translate("個別バフ", locale)}</Button></th>
                            <td></td>
                        </tr>
                        {this.state.openBufflist ?
                            [
                            <tr key="normalBuff">
                                <th className="bg-primary">{intl.translate("通常バフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.normalBuff} onChange={this.handleSelectEvent.bind(this, "normalBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="elementBuff">
                                <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.elementBuff} onChange={this.handleSelectEvent.bind(this, "elementBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="otherBuff">
                                <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.otherBuff} onChange={this.handleSelectEvent.bind(this, "otherBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="daBuff">
                                <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.daBuff} onChange={this.handleSelectEvent.bind(this, "daBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="taBuff">
                                <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.taBuff} onChange={this.handleSelectEvent.bind(this, "taBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="additionalDamageBuff">
                                <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.additionalDamageBuff} onChange={this.handleSelectEvent.bind(this, "additionalDamageBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>,
                            <tr key="ougiGageBuff">
                                <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}>{selector.buffLevel}</FormControl></td>
                            </tr>
                            ]
                        : null}
                    </tbody>
                </table>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0 2px 0"}} onClick={this.clickMoveUp}><i className="fa fa-angle-double-up" aria-hidden="true"></i>{intl.translate("前へ", locale)}</Button>
                    <Button bsStyle="danger" style={{"width": "50%", "margin": "2px 0 2px 0"}} onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="info" style={{"width": "25%", "margin": "2px 0 2px 0"}} onClick={this.clickMoveDown}><i className="fa fa-angle-double-down" aria-hidden="true"></i>{intl.translate("後へ", locale)}</Button>
                </ButtonGroup>
            </ColP>
        );
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
        var locale = this.props.locale;
        var summons = this.state.summons;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var dataName = this.props.dataName;
        var defaultElement = this.state.defaultElement;
        return (
            <div className="summonList">
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")}> {selector[locale].summonElements} </FormControl>
                <h3 className="margin-top"> {intl.translate("召喚石", locale)} </h3>
                <Grid fluid>
                    <Row>
                    {summons.map(function(sm, ind) {
                        return <Summon key={sm} keyid={sm} onRemove={hRemove} onCopy={hCopy} onChange={hChange} id={ind} dataName={dataName} defaultElement={defaultElement} locale={locale} />;
                    })}
                    </Row>
                </Grid>
            </div>
        );
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
            return 0;
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
        var locale = this.props.locale

        var selfSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.selfSummonType == "odin"){
            selfSummon[1] = {"label": intl.translate("キャラ", locale)+ " ", "input": "select"}
            selfSummon[0].label = intl.translate("属性", locale) + " "
        }
        var friendSummon = [{"label": "", "input": "select"}, {"input": "hidden"}]
        if(this.state.friendSummonType == "odin"){
            friendSummon[1] = {"label": intl.translate("キャラ", locale) + " ", "input": "select"}
            friendSummon[0].label = intl.translate("属性", locale) + " "
        }
        return (
            <ColP sxs={12} ssm={6} smd={4} className="col-no-bordered">
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                        <tr>
                            <th rowSpan={3} className="bg-primary">{intl.translate("自分の石", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleSelectEvent.bind(this, "selfElement")} >{selector[locale].summonElements}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl componentClass="select" value={this.state.selfSummonType} onChange={this.handleSelectEvent.bind(this, "selfSummonType")} >{selector[locale].summons}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {selfSummon[0].label}<FormControl componentClass="select" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)}>{selector.summonAmounts}</FormControl>
                                {selfSummon[1].label}<FormControl componentClass="select" className={selfSummon[1].input} value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)}>{selector.summonAmounts}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3} className="bg-primary">{intl.translate("フレの石", locale)}</th>
                            <td>
                                <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleSelectEvent.bind(this, "friendElement")} >{selector[locale].summonElements}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FormControl componentClass="select" value={this.state.friendSummonType} onChange={this.handleSelectEvent.bind(this, "friendSummonType")} >{selector[locale].summons}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {friendSummon[0].label}<FormControl componentClass="select" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)}>{selector.summonAmounts}</FormControl>
                                {friendSummon[1].label}<FormControl componentClass="select" className={friendSummon[1].input} value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)}>{selector.summonAmounts}</FormControl>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("合計攻撃力", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.attack} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "attack")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("合計HP", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.hp} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hp")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("HP加護", locale)}</th>
                            <td>
                    <FormControl type="number" min="0" value={this.state.hpBonus} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBonus")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("DA加護", locale)}</th>
                            <td>
                    <FormControl type="number" min="0" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/>
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("TA加護", locale)}</th>
                            <td>
                                <FormControl type="number" min="0" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickRemoveButton}>{intl.translate("内容を消去", locale)}</Button>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickCopyButton}>{intl.translate("コピー", locale)}</Button>
                </ButtonGroup>
            </ColP>
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
        if(nextProps.dataName != this.props.dataName) {
            this.setState({alist: dataForLoad.armlist});
            return 0;
        }

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
            if(this.state.alist[key].name == ""){
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
        var locale = this.props.locale
        var dataName = this.props.dataName;
        var arms = this.state.arms;
        var hChange = this.handleOnChange;
        var hRemove = this.handleOnRemove;
        var hCopy = this.handleOnCopy;
        var defaultElement = this.state.defaultElement;
        var addArm = this.state.addArm;
        var addArmID = this.state.addArmID;
        var considerNum = this.state.considerNum;
        var openPresets = this.openPresets;

        return (
            <div className="armList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("武器テンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>
                <Grid fluid>
                    <Row>
                        {arms.map(function(arm, ind) {
                            return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} locale={locale} openPresets={openPresets} />;
                        })}
                    </Row>
                </Grid>

                <Modal show={this.state.openPresets} onHide={this.closePresets}>
                    <Modal.Header closeButton>
                        <Modal.Title>Presets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisteredArm onClick={this.addTemplateArm} locale={locale} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
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
            return 0;
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
                    newState["attack"] = Math.floor(newarm.lv * (parseInt(newarm.attack) - parseInt(newarm.minattack))/newarm.maxlv + parseInt(newarm.minattack) + 5 * parseInt(newarm.plus))
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
    openPresets: function(e) {
        if(e.target.value == "" && this.state.attack == 0) {
            e.target.blur();
            this.setState({attack: 1})
            this.props.openPresets();
        }
    },
    render: function(){
        var locale = this.props.locale;

        return (
            <ColP sxs={12} xs={6} ssm={4} className="col-bordered">
                <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("武器名", locale)}　</InputGroup.Addon>
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onFocus={this.openPresets} onChange={this.handleEvent.bind(this, "name")} />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("攻撃力", locale)}　</InputGroup.Addon>
                <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onBlur={this.handleOnBlur.bind(this, "attack")} onChange={this.handleEvent.bind(this, "attack")} />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>HP&nbsp;&nbsp;　　</InputGroup.Addon>
                    <FormControl type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onBlur={this.handleOnBlur.bind(this, "hp")} onChange={this.handleEvent.bind(this, "hp")} />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("種類", locale)}　　</InputGroup.Addon>
                <FormControl componentClass="select" value={this.state.armType} onChange={this.handleSelectEvent.bind(this, "armType")} > {selector[locale].armtypes} </FormControl>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("スキル", locale)}1&nbsp;</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")} > {selector[locale].elements} </FormControl>
                    <FormControl componentClass="select" value={this.state.skill1} onChange={this.handleSelectEvent.bind(this, "skill1")} > {selector[locale].skills}</FormControl><br/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("スキル", locale)}2&nbsp;</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.element2} onChange={this.handleSelectEvent.bind(this, "element2")} > {selector[locale].elements} </FormControl>
                    <FormControl componentClass="select" value={this.state.skill2} onChange={this.handleSelectEvent.bind(this, "skill2")} > {selector[locale].skills}</FormControl>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>SLv&nbsp;　　</InputGroup.Addon>
                <FormControl componentClass="select" value={this.state.slv} onChange={this.handleSelectEvent.bind(this, "slv")} > {selector.slv} </FormControl>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("最小本数", locale)}</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.considerNumberMin} onChange={this.handleSelectEvent.bind(this, "considerNumberMin")} > {selector.consider} </FormControl>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("最大本数", locale)}</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.considerNumberMax} onChange={this.handleSelectEvent.bind(this, "considerNumberMax")} > {selector.consider} </FormControl>
                </InputGroup>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0 2px 0"}} onClick={this.clickRemoveButton}>{intl.translate("削除", locale)}</Button>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0 2px 0"}} onClick={this.clickCopyButton}>{intl.translate("コピー", locale)}</Button>
                </ButtonGroup>
                </FormGroup>
            </ColP>
        );
    }
});

var Sys = React.createClass({
    getInitialState: function() {
        return {
            storedData: {},
            dataName: '',
            selectedData: '',
            uploadedData: '',
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

          // dataName だけ反映されていないので上書きしておく
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
    onSubmitDownload: function(e){
      e.preventDefault();
      if(this.state.dataName != ''){
          var newState = this.state;

          // deep copy
          var propsdata = JSON.parse(JSON.stringify(this.props.data));

          // dataName だけ反映されていないので上書きしておく
          propsdata["dataName"] = this.state.dataName;

          var saveString = JSON.stringify(propsdata, null, "    ");

          var blob = new Blob([saveString], {"type": "application/json"});

          if (window.navigator.msSaveBlob) {
              // IE10/11
              window.navigator.msSaveBlob(blob, this.state.dataName + ".json");
          } else {
              // other browsers
	      var newlink = document.createElement('a');
	      newlink.href = window.URL.createObjectURL(blob);
	      newlink.setAttribute('download', this.state.dataName + '.json');
	      newlink.click();
          }
      } else {
          alert("データ名を入力して下さい。")
      }
    },
    onSubmitUpload: function(e){
      console.log("データアップロードテスト")
      console.log(this.state.uploadedData);
      console.log(e.target);
      $.ajax({
          url: this.state.uploadedData,
          dataType: 'json',
          cache: false,
          success: function(data) {
              console.log(data)
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(status, err.toString());
          }.bind(this)
      });
      var testdata = require('json!' + this.state.uploadedData);
      console.log(testdata);
      // console.log(JSON.parse(this.state.uploadedData));
      // console.log(JSON.parse(chrome.runtime.getURL(this.state.uploadedData)));
    },
    render: function() {
        var locale = this.props.locale;
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
                {intl.translate("データ名", locale)}: <FormControl size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} />
                {intl.translate("ブラウザデータリスト", locale)}
                <FormControl componentClass="select" size={3} value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >{intl.translate("ブラウザに保存", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitLoad} >{intl.translate("ブラウザデータ読込", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitRemove} >{intl.translate("削除", locale)}</Button>
                </ButtonGroup>
                {/*
                <FormGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitDownload} >{intl.translate("ダウンロード", locale)}</Button>
                    <FormControl type="file" label="アップロード" value={this.state.uploadedData} onChange={this.handleEvent.bind(this, "uploadedData")} />
                    <Button type="submit" bsStyle="primary" className="systemButton" onClick={this.onSubmitUpload}>{intl.translate("アップロード", locale)}</Button>
                </FormGroup>
                */}
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
                tweeturl += 'text=' + intl.translate("motocal", this.props.locale)
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
                <Button bsStyle="primary" className="tweetButton" onClick={this.getShortenUrl}>{intl.translate("サーバに保存", this.props.locale)}</Button>
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
