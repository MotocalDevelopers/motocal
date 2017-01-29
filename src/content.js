var React = require('react');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Chart} = require('react-google-charts')
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var SimulatorInput = require('./simulator.js')
var {HPChart, TurnChart, SimulationChart} = require('./chart.js')
var GlobalConst = require('./global_const.js')
var Notice = require('./notice.js')
var {StoredListEditor, ControlAutoUpdate} = require('./result.js')
var {HowTo, NiteHowTo, HPChartHowTo} = require('./howto.js')
var {ColP} = require('./gridp.js')
var intl = require('./translate.js')
var {RegisteredArm, RegisteredChara} = require('./template.js')
var dataForLoad = GlobalConst.dataForLoad
var TextWithTooltip = GlobalConst.TextWithTooltip

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

var touchPosition = null;
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
      touchPosition = this.getPosition(e)
      touchDirection = ''
  },
  onTouchMove: function(e) {
      //スワイプの方向（left / right）を取得
      var td = "none";
      if (touchPosition - this.getPosition(e) > 100) {
          td = 'right'; //左と検知
      } else if (touchPosition - this.getPosition(e) < -100){
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
      this.setState({dataName: newDataName});
  },
  captureResultList: function(e){
      html2canvas(document.getElementById("allResult"), {
          onrendered: function(canvas) {
              window.open(canvas.toDataURL("image/png"));
          },
      })
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
                <h2>{intl.translate("motocal", locale)}</h2>
                <ButtonGroup>
                    <Button onClick={this.changeLang.bind(this, "ja")}>日本語</Button>
                    <Button onClick={this.changeLang.bind(this, "en")}>English</Button>
                    <DropdownButton title={intl.translate("使い方", locale)}>
                        <MenuItem onClick={this.openHowTo}>{intl.translate("使い方", locale)}</MenuItem>
                        <MenuItem onClick={this.openNiteHowTo}>二手等について </MenuItem>
                    </DropdownButton>
                </ButtonGroup>
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
                <Nav bsStyle="tabs" activeKey={(this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey} onSelect={this.handleChangeTab}>
                    <NavItem eventKey="inputTab">ジータ</NavItem>
                    <NavItem eventKey="summonTab">召喚石</NavItem>
                    <NavItem eventKey="charaTab">キャラ</NavItem>
                    <NavItem eventKey="armTab">武器</NavItem>
                    <NavItem eventKey="resultTab">結果</NavItem>
                    <NavItem eventKey="systemTab">保存</NavItem>
                </Nav>
                <div className="Tab" id="inputTab">
                    <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={locale} />
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
                    <ResultList data={this.state} onChangeSortkey={this.handleEvent.bind(this, "sortKey")} locale={locale} />
                </div>
                <div className="Tab hidden" id="systemTab">
                    <div className="systemList">
                        <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
                        <TwitterShareButton data={this.state} locale={locale} />
                        <Notice locale={locale} />
                    </div>
                </div>
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
                        <NavItem eventKey="simulatorTab">Simulator</NavItem>
                        <NavItem eventKey="systemTab">{intl.translate("保存", locale)}</NavItem>
                    </Nav>
                    <div className="Tab" id="inputTab">
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={this.state.locale} />
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
                    <ResultList data={this.state} onChangeSortkey={this.handleEvent.bind(this, "sortKey")} locale={locale} />
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
            if(this.state.charalist[key].name == "" && this.state.charalist[key].attack == 0){
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

        return (
            <div className="charaList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("キャラテンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>
                <Grid fluid style={{"width": "100%"}} >
                    <Row>
                    {charas.map(function(c, ind) {
                        return <Chara key={c} keyid={c} onChange={hChange} onRemove={handleOnRemove} onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} id={ind} dataName={dataName} defaultElement={defaultElement} addChara={addChara} addCharaID={addCharaID} locale={locale} />;
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
            hpBuff: 0,
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
            var newchara = nextProps.addChara
            var newState = this.setNewCharaState(this.state, newchara)
            this.setState(newState);
            this.props.onChange(this.props.id, newState, false);
        }
    },
    setNewCharaState: function(newState, newchara){
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
                                <FormControl type="text" value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")}/>
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
                            <tr key="hpBuff">
                                <th className="bg-primary">{intl.translate("HPバフ", locale)}</th>
                                <td><FormControl componentClass="select" value={this.state.hpBuff} onChange={this.handleSelectEvent.bind(this, "hpBuff")}>{selector.buffLevel}</FormControl></td>
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
            <ColP sxs={12} xs={6} sm={4} className="col-bordered">
                <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("自分の石", locale)}　</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.selfElement} onChange={this.handleSelectEvent.bind(this, "selfElement")} >{selector[locale].summonElements}</FormControl>
                    <FormControl componentClass="select" value={this.state.selfSummonType} onChange={this.handleSelectEvent.bind(this, "selfSummonType")} >{selector[locale].summons}</FormControl>
                    {selfSummon[0].label}<FormControl componentClass="select" value={this.state.selfSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "self", 0)}>{selector.summonAmounts}</FormControl>
                    {selfSummon[1].label}<FormControl componentClass="select" className={selfSummon[1].input} value={this.state.selfSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "self", 1)}>{selector.summonAmounts}</FormControl>
                </InputGroup>

                <InputGroup>
                    <InputGroup.Addon>{intl.translate("フレの石", locale)}　</InputGroup.Addon>
                    <FormControl componentClass="select" value={this.state.friendElement} onChange={this.handleSelectEvent.bind(this, "friendElement")} >{selector[locale].summonElements}</FormControl>
                    <FormControl componentClass="select" value={this.state.friendSummonType} onChange={this.handleSelectEvent.bind(this, "friendSummonType")} >{selector[locale].summons}</FormControl>
                    {friendSummon[0].label}<FormControl componentClass="select" value={this.state.friendSummonAmount} onChange={this.handleSummonAmountChange.bind(this, "friend", 0)}>{selector.summonAmounts}</FormControl>
                    {friendSummon[1].label}<FormControl componentClass="select" className={friendSummon[1].input} value={this.state.friendSummonAmount2} onChange={this.handleSummonAmountChange.bind(this, "friend", 1)}>{selector.summonAmounts}</FormControl>
                </InputGroup>

                <InputGroup>
                    <InputGroup.Addon>{intl.translate("合計攻撃力", locale)}</InputGroup.Addon>
                    <FormControl type="number" min="0" value={this.state.attack} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "attack")}/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("合計HP", locale)}　&nbsp;&nbsp;</InputGroup.Addon>
                    <FormControl type="number" min="0" value={this.state.hp} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hp")}/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("HP加護", locale)}　&nbsp;&nbsp;</InputGroup.Addon>
                    <FormControl type="number" min="0" value={this.state.hpBonus} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBonus")}/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("DA加護", locale)}　&nbsp;&nbsp;</InputGroup.Addon>
                    <FormControl type="number" min="0" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("TA加護", locale)}　&nbsp;&nbsp;</InputGroup.Addon>
                    <FormControl type="number" min="0" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/>
                </InputGroup>
                <ButtonGroup style={{"width": "100%"}}>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickRemoveButton}>{intl.translate("内容を消去", locale)}</Button>
                    <Button bsStyle="primary" style={{"width": "50%", "margin": "2px 0px 2px 0px"}} onClick={this.clickCopyButton}>{intl.translate("コピー", locale)}</Button>
                </ButtonGroup>
                </FormGroup>
            </ColP>
        );
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

            var normalCoeff = 1.0 + 0.01 * totals[key]["normal"] * totalSummon["zeus"] + 0.01 * totals[key]["bahaAT"] + 0.01 * totals[key]["normalOther"] + 0.01 * totals[key]["cosmosAT"] + totalSummon["chara"] + buff["normal"] + totals[key]["normalBuff"]
            var normalHaisuiCoeff = 1.0 + 0.01 * (totals[key]["normalHaisui"]) * totalSummon["zeus"]
            var normalKonshinCoeff = 1.0 + 0.01 * (totals[key]["normalKonshin"]) * totalSummon["zeus"]
            // 属性(経過ターン)も最大値で計算する
            var elementCoeff = totals[key]["typeBonus"] + (totalSummon["element"] - 1.0 + totalSummon["elementTurn"] - 1.0) + buff["element"] + totals[key]["elementBuff"]
            var otherCoeff = 1.0 + buff["other"] + totals[key]["otherBuff"]

            // キャラ背水枠
            var charaHaisuiCoeff = 1.0 + 0.01 * totals[key]["charaHaisui"]

            // hp倍率
            var hpCoeff = (1.0 - totals[key]["HPdebuff"]) * (1.0 + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totals[key]["bahaHP"] + 0.01 * totals[key]["magnaHP"] * totalSummon["magna"] + 0.01 * totals[key]["normalHP"] * totalSummon["zeus"] + 0.01 * totals[key]["unknownHP"] * totalSummon["ranko"])

            // ベースHP
            var displayHP = totals[key]["baseHP"] + totals[key]["armHP"] + totalSummon["hp"]

            if(key == "Djeeta") {
                // for Djeeta
                var summedAttack = (totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"] + totals["Djeeta"]["job"].atBonus) * (1.0 + buff["master"])
                // 主人公HP計算
                displayHP += totals["Djeeta"]["job"].hpBonus
                displayHP *= (1.0 + buff["masterHP"])
                hpCoeff += 0.01 * totals["Djeeta"]["job"].shugoBonus
                var totalHP = displayHP * hpCoeff
            } else {
                // for chara
                var summedAttack = totals[key]["baseAttack"] + totals[key]["armAttack"] + totalSummon["attack"]
                var totalHP = displayHP * hpCoeff
            }

            var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff * unknownHaisuiCoeff * normalKonshinCoeff * charaHaisuiCoeff

            // HPの下限は 1
            if( totalHP <= 0 ) totalHP = 1

            // for DA and TA
            var normalNite = totals[key]["normalNite"] * totalSummon["zeus"];
            var magnaNite = totals[key]["magnaNite"] * totalSummon["magna"];
            var normalSante = totals[key]["normalSante"] * totalSummon["zeus"];
            var magnaSante = totals[key]["magnaSante"] * totalSummon["magna"];
            var unknownOtherNite = totals[key]["unknownOtherNite"]

            // DATA sup
            // 通常・方陣・EX・バハ・コスモスBLで別枠とする
            // DATA debuff は羅刹用
            var armDAupNormal = (normalNite + normalSante > 50.0) ? 50.0 : normalNite + normalSante
            var armDAupMagna = (magnaNite + magnaSante > 50.0) ? 50.0 : magnaNite + magnaSante
            var armDAupBaha = (totals[key]["bahaDA"] > 50.0) ? 50.0 : totals[key]["bahaDA"]
            var armDAupCosmos = (totals[key]["cosmosBL"] > 50.0) ? 50.0 : totals[key]["cosmosBL"]
            // unknownは現状50%に届くことはない
            var totalDA = 0.01 * totals[key]["baseDA"] + buff["da"] + totals[key]["DABuff"] + totalSummon["da"] + 0.01 * (armDAupNormal + armDAupMagna + unknownOtherNite + armDAupBaha + armDAupCosmos - totals[key]["DATAdebuff"])
            if(totalDA < 0.0) totalDA = 0.0

            var armTAupNormal = (normalSante > 50.0) ? 50.0 : normalSante
            var armTAupMagna  = (magnaSante > 50.0)  ? 50.0 : magnaSante
            var armTAupBaha = (totals[key]["bahaTA"] > 50.0) ? 50.0 : totals[key]["bahaTA"]
            var totalTA = 0.01 * totals[key]["baseTA"] + buff["ta"] + totals[key]["TABuff"] + totalSummon["ta"] + 0.01 * (armTAupNormal + armTAupMagna + armTAupBaha - totals[key]["DATAdebuff"])
            if(totalTA < 0.0) totalTA = 0.0

            var taRate = (parseFloat(totalTA) >= 1.0) ? 1.0 : parseFloat(totalTA)
            var daRate = (parseFloat(totalDA) >= 1.0) ? 1.0 : parseFloat(totalDA)
            var expectedAttack = 3.0 * taRate + (1.0 - taRate) * (2.0 * daRate + (1.0 - daRate))

            if(totals[key]["typeBonus"] != 1.5) {
                var criticalRatio = 1.0
            } else {
                var criticalRatio = this.calculateCriticalRatio(totals[key]["normalCritical"], totals[key]["magnaCritical"], totals[key]["normalSetsuna"], totals[key]["magnaSetsuna"], totals[key]["normalKatsumi"], totalSummon)
            }
            var criticalAttack = parseInt(totalAttack * criticalRatio)
            var expectedOugiGage = (buff["ougiGage"] + totals[key]["ougiGageBuff"]- totals[key]["ougiDebuff"]) * (taRate * 37.0 + (1.0 - taRate) * (daRate * 22.0 + (1.0 - daRate) * 10.0))
            var expectedTurn = 100.0 / expectedOugiGage

            // damageは追加ダメージなしの単攻撃ダメージ(減衰・技巧補正あり)
            var damage = this.calculateDamage(criticalRatio * totalAttack, prof.enemyDefense)

            // クリティカル無しの場合のダメージを技巧期待値の補正に使う
            var damageWithoutCritical = this.calculateDamage(totalAttack, prof.enemyDefense)
            // 実質の技巧期待値
            var effectiveCriticalRatio = damage/damageWithoutCritical

            // 追加ダメージ(%)分だけ追加
            if(totals[key]["additionalDamage"] > 0 || buff["additionalDamage"] > 0) {
                damage += (0.01 * totals[key]["additionalDamage"] + buff["additionalDamage"]) * damage
            }
            var ougiDamage = this.calculateOugiDamage(criticalRatio * totalAttack, prof.enemyDefense, prof.ougiRatio, totals[key]["ougiDamageBuff"])
            var expectedCycleDamage = ougiDamage + expectedTurn * expectedAttack * damage
            var expectedCycleDamagePerTurn = expectedCycleDamage / (expectedTurn + 1.0)

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
            coeffs["charaHaisui"] = charaHaisuiCoeff;
            coeffs["other"] = otherCoeff;
            coeffs["ougiDamageBuff"] = totals[key]["ougiDamageBuff"];
            coeffs["hpRatio"] = hpCoeff

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
    calculateOugiDamage: function(totalAttack, enemyDefense, ougiRatio, ougiDamageBuff) {
        // ダメージ計算
        var def = (enemyDefense == undefined) ? 10.0 : enemyDefense
        var ratio = (ougiRatio == undefined) ? 4.5 : ougiRatio
        var damage = (1.0 + ougiDamageBuff) * totalAttack * ratio / def
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
                    } else if(arm.armType == totals[key]["fav2"]){
                        armSup += 0.2
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
                                totals[key]["cosmosAT"] += comb[i] * 20.0;
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
                            if(stype == 'normalHaisui' || stype == 'magnaHaisui' || stype == 'unknownOtherHaisui' || stype == 'normalKonshin'){
                                // 背水計算部分は別メソッドで
                                totals[key][stype] += comb[i] * this.calcHaisuiValue(stype, amount, slv, totals[key]["remainHP"])
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
                            } else if(stype == 'normalKatsumoku') {
                                totals[key]["normalNite"] += comb[i] * skillAmounts["normalNite"][amount][slv - 1];
                            } else if(stype == 'magnaKatsumoku') {
                                totals[key]["magnaNite"] += comb[i] * skillAmounts["magnaNite"][amount][slv - 1];
                            } else if(stype == 'normalRasetsu') {
                                totals[key]["normal"] += comb[i] * skillAmounts["normal"][amount][slv - 1];
                                totals[key]["DATAdebuff"] += comb[i] * 38.0;
                            } else if(stype == 'magnaRasetsu') {
                                totals[key]["magna"] += comb[i] * skillAmounts["magna"][amount][slv - 1];
                                totals[key]["DATAdebuff"] += comb[i] * 38.0;
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
    calcHaisuiValue: function(haisuiType, haisuiAmount, haisuiSLv, haisuiRemainHP){
        var remainHP = haisuiRemainHP
        var baseRate = 0.0

        if(haisuiType == 'normalHaisui' || haisuiType == 'magnaHaisui' || haisuiType == 'unknownOtherHaisui' || haisuiType == "charaHaisui")
        {
            // 背水倍率の実装は日比野さんのところのを参照
            if(haisuiAmount == "S") {
                // 小
                if(haisuiSLv < 10) {
                    baseRate = -0.3 + haisuiSLv * 1.8;
                } else {
                    baseRate = 18 + 3.0 * ((haisuiSLv - 10) / 5.0)
                }
            } else if ( haisuiAmount == "M" ){
                // 中
                if(haisuiSLv < 10) {
                    baseRate = -0.4 + haisuiSLv * 2.4;
                } else {
                    baseRate = 24 + 3.0 * ((haisuiSLv - 10) / 5.0)
                }
            } else {
                // 大
                if(haisuiSLv < 10) {
                    baseRate = -0.5 + haisuiSLv * 3.0;
                } else {
                    baseRate = 30 + 3.0 * ((haisuiSLv - 10) / 5.0)
                }
            }
            return (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
        } else if(haisuiType == 'normalKonshin' || haisuiType == "magnaKonshin"){
            if(haisuiAmount == "S") {
                // 小
                if(haisuiSLv < 10) {
                    baseRate = -0.3 + haisuiSLv * 1.8;
                } else {
                    baseRate = 18 + 3.0 * ((haisuiSLv - 10) / 5.0)
                }
            } else if ( haisuiAmount == "M" ){
                // 中
                if(haisuiSLv < 10) {
                    baseRate = -0.4 + haisuiSLv * 2.4;
                } else {
                    baseRate = 24 + 3.0 * ((haisuiSLv - 10) / 5.0)
                }
            } else {
                if(haisuiSLv <= 10) {
                    // baseRate = 5.0 + haisuiSLv * 0.8;
                    baseRate = 0.0518 + 3.29e-3 * haisuiSLv
                } else {
                    // baseRate = 20.0 + ((haisuiSLv - 10) * 0.6);
                    // 11/24のアップデート、暫定対応
                    baseRate = 0.0847 + (haisuiSLv - 10) * 6.58e-3
                }
            }
            if(remainHP >= 0.25) {
                // HP25%以下で打ち切りになる
                return 100.0 * (baseRate * Math.pow(remainHP + 0.0317, 3) + 0.0207)
            } else {
                return 0.0;
            }
        } else {
            console.error("Unknown Haisui Type Passed: " + haisuiType)
            return 0.0;
        }
    },
    initializeTotals: function(totals) {
        // 初期化
        // 武器編成によって変わらないものは除く
        for(key in totals){
            totals[key]["armAttack"] = 0; totals[key]["armHP"] = 0;
            totals[key]["HPdebuff"] = 0; totals[key]["magna"] = 0;
            totals[key]["magnaHaisui"] = 0; totals[key]["normal"] = 0;
            totals[key]["normalOther"] = 0;
            totals[key]["normalHaisui"] = 0; totals[key]["normalKonshin"] = 0;
            totals[key]["unknown"] = 0; totals[key]["unknownOther"] = 0;
            totals[key]["unknownOtherHaisui"] = 0; totals[key]["bahaAT"] = 0;
            totals[key]["bahaHP"] = 0; totals[key]["bahaDA"] = 0;
            totals[key]["bahaTA"] = 0; totals[key]["magnaHP"] = 0;
            totals[key]["normalHP"] = 0; totals[key]["unknownHP"] = 0;
            totals[key]["normalNite"] = 0; totals[key]["magnaNite"] = 0;
            totals[key]["normalSante"] = 0; totals[key]["magnaSante"] = 0;
            totals[key]["unknownOtherNite"] = 0; totals[key]["normalCritical"] = 0;
            totals[key]["magnaCritical"] = 0;
            totals[key]["cosmosBL"] = 0; totals[key]["cosmosAT"] = 0;
            totals[key]["additionalDamage"] = 0; totals[key]["ougiDebuff"] = 0;
            totals[key]["normalSetsuna"] = []; totals[key]["magnaSetsuna"] = [];
            totals[key]["normalKatsumi"] = [];
            totals[key]["DATAdebuff"] = 0;
        }
    },
    getTotalBuff: function(prof) {
        var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hp: 0.0, da: 0.0, ta: 0.0, ougiGage: 1.0, additionalDamage: 0.0};

        if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
        if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
        if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
        if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseFloat(prof.daBuff);
        if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseFloat(prof.taBuff);
        if(!isNaN(prof.additionalDamageBuff)) totalBuff["additionalDamage"] += 0.01 * parseInt(prof.additionalDamageBuff);
        if(!isNaN(prof.ougiGageBuff)) totalBuff["ougiGage"] += 0.01 * parseInt(prof.ougiGageBuff);
        totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
        totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
        totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
        totalBuff["zenith1"] += zenith[prof.zenithBonus1];
        totalBuff["zenith2"] += zenith[prof.zenithBonus2];

        return totalBuff
    },
    getInitialTotals: function(prof, chara, summon) {
        var baseAttack = (prof.rank > 100) ? 5000 + (parseInt(prof.rank) - 100) * 20 : ((prof.rank > 1) ? 1000 + (parseInt(prof.rank)) * 40 : 1000)
        var baseHP = (prof.rank > 100) ? 1400 + (parseInt(prof.rank) - 100) * 4.0 : 600 + (parseInt(prof.rank)) * 8
        var element = (prof.element == undefined) ? "fire" : prof.element
        var djeetaRemainHP = (prof.remainHP != undefined && parseInt(prof.remainHP) < parseInt(prof.hp)) ? 0.01 * parseInt(prof.remainHP) : 0.01 * parseInt(prof.hp)
        var djeetaDA = (prof.DA == undefined) ? 6.5 : parseFloat(prof.DA)
        var djeetaTA = (prof.TA == undefined) ? 3.0 : parseFloat(prof.TA)
        var job = (prof.job == undefined) ? Jobs["none"] : Jobs[prof.job]
        var zenithATK = (prof.zenithAttackBonus == undefined) ? 3000 : parseInt(prof.zenithAttackBonus)
        var zenithHP = (prof.zenithHPBonus == undefined) ? 1000 : parseInt(prof.zenithHPBonus)
        var zenithPartyHP = (prof.zenithPartyHPBonus == undefined) ? 0 : parseInt(prof.zenithPartyHPBonus)

        var totals = {"Djeeta": {baseAttack: (baseAttack + zenithATK), baseHP: (baseHP + zenithPartyHP + zenithHP), baseDA: djeetaDA, baseTA: djeetaTA, remainHP: djeetaRemainHP, armAttack: 0, armHP:0, fav1: job.favArm1, fav2: job.favArm2, race: "unknown", type: job.type, element: element, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalOther: 0, normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, normalSetsuna: [], magnaSetsuna: [], normalKatsumi: [], cosmosAT: 0, cosmosBL: 0, additionalDamage: 0, ougiDebuff: 0, isConsideredInAverage: true, job: job, normalBuff: 0, elementBuff: 0, otherBuff: 0, DABuff: 0, TABuff: 0, ougiGageBuff: 0, ougiDamageBuff: 0, additionalDamageBuff: 0, DATAdebuff: 0, support: "none", support2: "none", charaHaisui: 0}};

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

                totals[charakey] = {baseAttack: parseInt(chara[i].attack), baseHP: parseInt(chara[i].hp) + zenithPartyHP, baseDA: parseFloat(charaDA), baseTA: parseFloat(charaTA), remainHP: charaRemainHP, armAttack: 0, armHP:0, fav1: chara[i].favArm, fav2: chara[i].favArm2, race: chara[i].race, type: chara[i].type, element: charaelement, HPdebuff: 0.00, magna: 0, magnaHaisui: 0, normal: 0, normalOther: 0,normalHaisui: 0, normalKonshin: 0, unknown: 0, unknownOther: 0, unknownOtherHaisui: 0, bahaAT: 0, bahaHP: 0, bahaDA: 0, bahaTA: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, magnaNite: 0, normalSante: 0, magnaSante: 0, unknownOtherNite: 0, normalCritical: 0, magnaCritical: 0, normalSetsuna: [], magnaSetsuna: [], normalKatsumi: [], cosmosAT: 0, cosmosBL: 0, additionalDamage: 0, ougiDebuff: 0, isConsideredInAverage: charaConsidered, normalBuff: 0, elementBuff: 0, otherBuff: 0, DABuff: 0, TABuff: 0, ougiGageBuff: 0, ougiDamageBuff: 0, additionalDamageBuff: 0, DATAdebuff: 0, support: chara[i].support, support2: chara[i].support2, charaHaisui: 0}
            }
        }
        var races = this.checkNumberofRaces(chara)
        for(var key in totals) {
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
                    } else if(summon[s].selfSummonType == "elementByRace") {
                        totalSummon["element"] += 0.01 * this.getTesukatoripokaAmount(parseInt(summon[s].selfSummonAmount), races)
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
                    } else if(summon[s].friendSummonType == "elementByRace") {
                        totalSummon["element"] += 0.01 * this.getTesukatoripokaAmount(parseInt(summon[s].friendSummonAmount), races)
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

        for(var key in totals){
            totals[key]["typeBonus"] = this.getTypeBonus(totals[key]["element"], prof)
        }

        return totals
    },
    checkNumberofRaces: function(chara){
        // check num of races
        var includedRaces = {
            "human": false,
            "erune": false,
            "doraf": false,
            "havin": false,
            "unknown": true,
        }
        // ジータがいるのでunknown枠は常にtrue
        // indの初期値も1からで良い
        var ind = 1;
        for(var key in chara) {
            if(chara[key].name != "" && chara[key].isConsideredInAverage) {
                if(ind < 4) {
                    includedRaces[chara[key]["race"]] = true
                }
                ind++;
            }
        }

        var races = 0
        for(var key in includedRaces) {
            if(includedRaces[key]) races++;
        }
        return races
    },
    getTesukatoripokaAmount: function(amount, numOfRaces){
        if(amount != 100 && amount != 120) return 0;

        var resultAmount = 10;
        switch(numOfRaces){
            case 1:
                break;
            case 2:
                resultAmount = 30;
                break;
            case 3:
                resultAmount = 60;
                break;
            case 4:
                resultAmount = 100;
                break;
        }

        if(amount == 120){
            resultAmount += 20;
        }

        return resultAmount;
    },
    calculateResult: function(newprops) {
      var prof = newprops.data.profile; var arml = newprops.data.armlist;
      var summon = newprops.data.summon; var chara = newprops.data.chara;

      if (prof != undefined && arml != undefined && summon != undefined && chara != undefined) {
          var totalBuff = this.getTotalBuff(prof)

          // 後から追加したパラメータはNaNなことがあるので追加処理
          // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
          var sortkey = "averageCyclePerTurn"
          var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
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
          this.treatSupportAbility(totals, chara)
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
    treatSupportAbility: function(totals, chara) {
        for(var key in totals){
            for(var i = 0; i < 2; i++) {
                if(i == 0) {
                    if(totals[key]["support"] == undefined) continue;
                    var support = supportAbilities[totals[key]["support"]];
                } else {
                    if(totals[key]["support2"] == undefined) continue;
                    var support = supportAbilities[totals[key]["support2"]];
                }

                if(support.type == "none") continue;

                // 特殊なサポアビの処理
                switch(support.type){
                    case "normalBuff_doraf":
                        if(totals[key].isConsideredInAverage) {
                            // ドラフと種族不明のみキャラ攻刃
                            for(var key2 in totals){
                                if(totals[key2]["race"] == "doraf" || totals[key2]["race"] == "unknown") {
                                    totals[key2]["normalBuff"] += support.value
                                }
                            }
                        } else {
                            // 平均に入れない場合は自分だけ計算
                            totals[key]["normalBuff"] += support.value
                        }
                        continue;
                        break;
                    case "normalBuff_depends_races":
                        var races = this.checkNumberofRaces(chara);
                        // 4種族なら50%, それ以外なら種族数*10%
                        totals[key]["normalBuff"] += (races == 4 ? 0.50 : races * 0.10);
                        continue;
                        break;
                    case "normalBuff_depends_member":
                        continue;
                        break;
                    case "critical_up_10_30":
                        continue;
                        break;
                    case "taiyou_sinkou":
                        // ザルハメリナのHPを参照する
                        var charaHaisuiValue = this.calcHaisuiValue("charaHaisui", "L", 10, totals[key]["remainHP"])
                        for(var key2 in totals){
                            totals[key2]["charaHaisui"] += charaHaisuiValue
                        }
                        continue;
                        break;
                    default:
                        break;
                }

                // 単純なバフ系の場合の処理
                if(support.range == "own") {
                    totals[key][support.type] += support.value
                } else {
                    // range == "all"
                    if(totals[key].isConsideredInAverage) {
                        for(var key2 in totals){
                            totals[key2][support.type] += support.value
                        }
                    } else {
                        totals[key][support.type] += support.value
                    }
                }
            }
        }
    },
    recalcCharaHaisui: function(chara, remainHP) {
        var charaHaisuiValue = 1.0;

        for(var ch = 0; ch < chara.length; ch++){
            if(chara[ch].name != "" && chara[ch].isConsideredInAverage) {
                for(var i = 0; i < 2; i++) {
                    if(i == 0) {
                        if(chara[ch]["support"] == undefined) continue;
                        var support = supportAbilities[chara[ch]["support"]];
                    } else {
                        if(chara[ch]["support2"] == undefined) continue;
                        var support = supportAbilities[chara[ch]["support2"]];
                    }

                    if(support.type == "none") continue;

                    // 背水サポアビのみ処理
                    switch(support.type){
                        case "taiyou_sinkou":
                            // ザルハメリナのHPを参照する
                            charaHaisuiValue += 0.01 * this.calcHaisuiValue("charaHaisui", "L", 10, remainHP)
                            continue;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        return charaHaisuiValue;
    },
    getInitialState: function() {
        return {
            switchTotalAttack: 1,
            switchATKandHP: 0,
            switchHP: 1,
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
            openDisplayElementTable: false,
            openHPChartTutorial: false,
            openShowStoredList: false,
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
        this.treatSupportAbility(totals, chara)

        var sortkey = "averageCyclePerTurn"
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
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
        var locale = this.props.locale

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

        // キャラ編成は武器編成毎には変わらないので先に計算することができる
        var charaHaisuiBuff = []
        for(var k = 0; k < 100; ++k){
            var charaHaisuiValue = this.recalcCharaHaisui(chara, 0.01 * (k + 1));
            charaHaisuiBuff.push(charaHaisuiValue);
        }

        for(var s = 0; s < res.length; s++) {
            var oneresult = res[s]
            var summonHeader = ""
            if(summon[s].selfSummonType == "odin"){
                summonHeader += intl.translate("属性攻", locale) + summon[s].selfSummonAmount + intl.translate("キャラ攻", locale) + summon[s].selfSummonAmount2
            } else {
                summonHeader += intl.translate(summonElementTypes[summon[s].selfElement].name, locale) + intl.translate(summonTypes[summon[s].selfSummonType], locale) + summon[s].selfSummonAmount
            }

            summonHeader += " + "
            if(summon[s].friendSummonType == "odin"){
                summonHeader += intl.translate("属性攻", locale) + summon[s].friendSummonAmount + intl.translate("キャラ攻", locale) + summon[s].friendSummonAmount2
            } else {
                summonHeader += intl.translate(summonElementTypes[summon[s].friendElement].name, locale) + intl.translate(summonTypes[summon[s].friendSummonType], locale) + summon[s].friendSummonAmount
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
                    var charaHaisuiOrig = onedata[key].skilldata.charaHaisui
                    var normalKonshinOrig = onedata[key].skilldata.normalKonshin
                    var totalAttackWithoutHaisui = onedata[key].totalAttack / (normalHaisuiOrig * magnaHaisuiOrig * normalKonshinOrig * charaHaisuiOrig)

                    var haisuiBuff = []
                    // キャラ背水はキャラ個別で計算するべき
                    for(var k = 0; k < 100; k++){
                        haisuiBuff.push({normalHaisui: 1.0, magnaHaisui: 1.0, normalKonshin: 1.0, charaHaisui: charaHaisuiBuff[k]})
                    }

                    // 武器データ計算
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

                                if(stype == "normalHaisui" || stype == "magnaHaisui" || stype == "normalKonshin" || stype == "magnaKonshin"){
                                    for(var l=0; l < haisuiBuff.length; l++) {
                                        var remainHP = 0.01 * (l + 1)

                                        if(stype == "normalHaisui" || stype == "normalKonshin") {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * this.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.zeus
                                        } else {
                                            haisuiBuff[l][stype] += storedCombinations[j][i] * 0.01 * this.calcHaisuiValue(stype, amount, slv, remainHP) * totalSummon.magna
                                        }
                                    }
                                }
                            }
                        }
                    }

                    for(var k = 0; k < 100; k++){
                        var newTotalAttack = totalAttackWithoutHaisui * haisuiBuff[k].normalHaisui * haisuiBuff[k].magnaHaisui * haisuiBuff[k].normalKonshin * haisuiBuff[k].charaHaisui
                        var newTotalExpected = newTotalAttack * onedata[key].criticalRatio * onedata[key].expectedAttack
                        var newDamage = this.calculateDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense)
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff)
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
            var matomete = intl.translate("まとめて比較", locale)
            data[matomete] = {}
            data[matomete]["totalAttack"] = AllTotalAttack
            data[matomete]["totalHP"] = AllTotalHP
            data[matomete]["criticalAttack"] = AllCriticalAttack
            data[matomete]["totalExpected"] = AllTotalExpected
            data[matomete]["expectedCycleDamagePerTurn"] = AllCycleDamagePerTurn
            data[matomete]["averageAttack"] = AllAverageTotalAttack
            data[matomete]["averageCriticalAttack"] = AllAverageCriticalAttack
            data[matomete]["averageCyclePerTurn"] = AllAverageCycleDamagePerTurn
            data[matomete]["averageTotalExpected"] = AllAverageTotalExpected
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
        this.treatSupportAbility(totals, chara)

        var sortkey = "averageCyclePerTurn"
        var sortkeyname = "予想ターン毎ダメージのパーティ平均値"
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
                        var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * newTotalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff)
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
        this.treatSupportAbility(totals, chara)

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
                            var newOugiDamage = this.calculateOugiDamage(onedata[key].criticalRatio * onedata[key].totalAttack, prof.enemyDefense, prof.ougiRatio, onedata[key].skilldata.ougiDamageBuff)
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
        this.setState({
            storedList: {"combinations": [], "armlist": []},
            openShowStoredList: false,
            openHPChart: false,
            openTurnChart: false,
            openSimulator: false,
            ChartButtonActive: false,
        });
    },
    openStoredList: function(e) {
        this.setState({openShowStoredList: true})
    },
    closeStoredList: function(e) {
        this.setState({openShowStoredList: false})
    },
    removeOneStoredList: function(e) {
        var targetIndex = parseInt(e.target.id)
        var newCombinations = this.state.storedList.combinations
        newCombinations.splice(targetIndex, 1)
        var newArmList = this.state.storedList.armlist
        newArmList.splice(targetIndex, 1)

        if(newArmList.length == 0){
            this.resetStoredList()
        } else {
            this.setState({
                storedList: {
                    "combinations": newCombinations,
                    "armlist": newArmList,
                },
            });
            if(this.state.openHPChart) {
                this.openHPChart();
            } else if(this.state.openTurnChart) {
                this.openTurnChart();
            } else if(this.state.openSimulator) {
                this.openSimulator();
            }
        }
    },
    forceResultUpdate: function() {
        this.setState({result: this.calculateResult(this.props)})
    },
    openDisplayTable: function() {
        this.setState({openDisplayElementTable: !this.state.openDisplayElementTable})
    },
    render: function() {
        var locale = this.props.locale

        res = this.state.result;
        var prof = this.props.data.profile
        var arm = this.props.data.armlist
        var chara = this.props.data.chara

        // テスカトリポカ計算用
        var races = this.checkNumberofRaces(chara)
        var tesukatoripoka = this.getTesukatoripokaAmount

        var summondata = res.summon
        var result = res.result
        var onAddToHaisuiData = this.addHaisuiData

        switcher = this.state;
        var armnames = []
        for(var i = 0; i < arm.length; i++){
            if(arm[i].considerNumberMax != 0) {
                var armname = arm[i].name;
                if(armname == '') {
                    armname = intl.translate("武器", locale) + (i + 1).toString()
                }
                armnames.push(armname)
            }
        }

        var tableheader = []
        if(switcher.switchTotalAttack) {
            tableheader.push(intl.translate("攻撃力(二手技巧無し)", locale))
        }
        if(switcher.switchATKandHP) {
            tableheader.push(intl.translate("戦力", locale))
        }
        if(switcher.switchExpectedAttack) {
            tableheader.push(intl.translate("期待攻撃回数", locale))
        }
        if(switcher.switchCriticalAttack) {
            tableheader.push(intl.translate("技巧期待攻撃力", locale))
        }
        if(switcher.switchCriticalRatio) {
            tableheader.push(intl.translate("技巧期待値", locale))
        }
        if(switcher.switchHP) {
            tableheader.push("HP\n(" + intl.translate("残HP", locale) + ")")
        }
        if(switcher.switchAverageAttack) {
            tableheader.push(intl.translate("パーティ平均攻撃力", locale))
        }
        if(switcher.switchAverageCriticalAttack) {
            tableheader.push(intl.translate("技巧平均攻撃力", locale))
        }
        if(switcher.switchTotalExpected) {
            tableheader.push(intl.translate("総合*回数*技巧", locale))
        }
        if(switcher.switchAverageTotalExpected) {
            tableheader.push(intl.translate("総回技の平均", locale))
        }
        if(switcher.switchDamage) {
            tableheader.push(intl.translate("単攻撃ダメージ", locale))
        }
        if(switcher.switchOugiGage) {
            tableheader.push(intl.translate("ターン毎の奥義ゲージ上昇量", locale))
        }
        if(switcher.switchOugiDamage) {
            tableheader.push(intl.translate("奥義ダメージ", locale))
        }
        if(switcher.switchCycleDamage) {
            tableheader.push(intl.translate("予想ターン毎ダメージ", locale))
        }
        if(switcher.switchAverageCycleDamage) {
            tableheader.push(intl.translate("パーティ平均予想ターン毎ダメージ", locale))
        }

        var job = (prof.job == undefined) ? Jobs["none"].name : Jobs[prof.job].name
        var remainHPstr = intl.translate("ジータさん", locale) + "(" + intl.translate(job, locale) + ") HP";
        if(prof.remainHP != undefined) {
            remainHPstr += (parseInt(prof.remainHP) < parseInt(prof.hp)) ? prof.remainHP : prof.hp
        } else {
            remainHPstr += prof.hp
        }
        remainHPstr += "% (" + intl.translate(this.getTypeBonusStr(prof.element, prof), locale) + ")"
        for(var i = 0; i < chara.length; i++){
            if(chara[i].name != "" && chara[i].isConsideredInAverage) {
                remainHPstr += ", " + chara[i].name + "HP"
                if(chara[i].remainHP != undefined) {
                    remainHPstr += (parseInt(chara[i].remainHP) < parseInt(prof.hp)) ? chara[i].remainHP : prof.hp
                } else {
                    remainHPstr += prof.hp
                }
                remainHPstr += "% (" + intl.translate(this.getTypeBonusStr(chara[i].element, prof), locale) + ")"
            }
        }
        remainHPstr += ", " + intl.translate("通常バフ", locale) + prof.normalBuff + "%, " + intl.translate("属性バフ", locale) + prof.elementBuff + "%, " + intl.translate("その他バフ", locale) + prof.otherBuff + "%, " + intl.translate("追加ダメージバフ", locale) + ((prof.additionalDamageBuff == undefined) ? "0" : prof.additionalDamageBuff) + "%, " + intl.translate("敵防御固有値", locale) + prof.enemyDefense

        if(_ua.Mobile || _ua.Tablet) {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "250px", padding: "0"}} value={this.props.data.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <Button block onClick={this.openDisplayTable}>
                    表示項目切替
                    </Button>
                    <Collapse in={this.state.openDisplayElementTable}>
                    <table style={{"width": "100%", textAlign: "center", marginBottom: "2px"}} className="table table-bordered"><tbody>
                    <tr>
                        <td onClick={this.handleEvent.bind(this, "switchTotalAttack")} className={(this.state.switchTotalAttack == 1) ? "display-checked" : "display-unchecked"}> 攻撃力(二手技巧無し) </td>
                        <td onClick={this.handleEvent.bind(this, "switchATKandHP")} className={(this.state.switchATKandHP == 1) ? "display-checked" : "display-unchecked"}>戦力</td>
                        <td onClick={this.handleEvent.bind(this, "switchHP")} className={(this.state.switchHP == 1) ? "display-checked" : "display-unchecked"}> HP</td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchDATA")} className={(this.state.switchDATA == 1) ? "display-checked" : "display-unchecked"}> 連続攻撃率</td>
                        <td onClick={this.handleEvent.bind(this, "switchExpectedAttack")} className={(this.state.switchExpectedAttack == 1) ? "display-checked" : "display-unchecked"}> 期待攻撃回数</td>
                        <td onClick={this.handleEvent.bind(this, "switchCriticalRatio")} className={(this.state.switchCriticalRatio == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値</td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchCriticalAttack")} className={(this.state.switchCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧期待値*攻撃力</td>
                        <td onClick={this.handleEvent.bind(this, "switchAverageAttack")} className={(this.state.switchAverageAttack == 1) ? "display-checked" : "display-unchecked"}> パーティ平均攻撃力(二手技巧無し)</td>
                        <td onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")} className={(this.state.switchAverageCriticalAttack == 1) ? "display-checked" : "display-unchecked"}> 技巧平均攻撃力 </td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchTotalExpected")} className={(this.state.switchTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総合*期待回数*技巧期待値</td>
                        <td onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")} className={(this.state.switchAverageTotalExpected == 1) ? "display-checked" : "display-unchecked"}> 総回技のパーティ平均値</td>
                        <td onClick={this.handleEvent.bind(this, "switchCycleDamage")} className={(this.state.switchCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージ </td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")} className={(this.state.switchAverageCycleDamage == 1) ? "display-checked" : "display-unchecked"}> 予想ターン毎ダメージの平均値 </td>
                        <td onClick={this.handleEvent.bind(this, "switchDamage")} className={(this.state.switchDamage == 1) ? "display-checked" : "display-unchecked"}> 単攻撃ダメージ</td>
                        <td onClick={this.handleEvent.bind(this, "switchOugiGage")} className={(this.state.switchOugiGage == 1) ? "display-checked" : "display-unchecked"}> 奥義ゲージ上昇期待値 </td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchOugiDamage")} className={(this.state.switchOugiDamage == 1) ? "display-checked" : "display-unchecked"}> 奥義ダメージ </td>
                        <td onClick={this.handleEvent.bind(this, "switchCharaAttack")} className={(this.state.switchCharaAttack == 1) ? "display-checked" : "display-unchecked"}> キャラ攻撃力</td>
                        <td onClick={this.handleEvent.bind(this, "switchCharaHP")} className={(this.state.switchCharaHP == 1) ? "display-checked" : "display-unchecked"}> キャラHP</td>
                    </tr><tr>
                        <td onClick={this.handleEvent.bind(this, "switchCharaDA")} className={(this.state.switchCharaDA == 1) ? "display-checked" : "display-unchecked"}> キャラ連続攻撃率</td>
                        <td onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} className={(this.state.switchCharaTotalExpected == 1) ? "display-checked" : "display-unchecked"}> キャラ総回技値</td>
                        <td onClick={this.handleEvent.bind(this, "switchSkillTotal")} className={(this.state.switchSkillTotal == 1) ? "display-checked" : "display-unchecked"}> スキル合計値</td>
                    </tr>
                    </tbody></table>
                    </Collapse>
                    <br/>
                    <ButtonGroup style={{width: "100%"}}>
                        <Button block style={{float: "left", width: "50%", margin: "0 0 5px 0", fontSize: "10pt", paddingLeft: "2px", paddingRight: "2px", textAlign: "center"}} bsStyle="primary" bsSize="large" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >背水渾身グラフ</Button>
                        <Button block style={{float: "left", width: "50%", margin: "0 0 5px 0", fontSize: "10pt", paddingLeft: "2px", paddingRight: "2px", textAlign: "center"}} bsStyle="primary" bsSize="large" onClick={this.openTurnChart} disabled={!this.state.ChartButtonActive} >初期攻撃力推移グラフ</Button>
                    </ButtonGroup>
                    <ControlAutoUpdate autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    <hr/>
                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性攻" + s.selfSummonAmount + "キャラ攻" + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = summonElementTypes[s.selfElement].name + summonTypes[s.selfSummonType] + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性攻" + s.friendSummonAmount + "キャラ攻" + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + "属性(種族数)" + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = summonElementTypes[s.friendElement].name + summonTypes[s.friendSummonType] + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <p> 結果{summonindex + 1}:{selfSummonHeader}+{friendSummonHeader} <br/>[優先:{changeSortKey}]</p>
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
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} locale={locale} />
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="info" onClick={this.openHPChartTutorial}>使い方</Button>
                            <Button bsStyle="primary" onClick={this.openStoredList}>保存された編成を編集</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openTurnChart} onHide={this.closeTurnChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>初期攻撃力推移 ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openStoredList}>保存された編成を編集</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>保存された編成を全て削除</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <TurnChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList} onHide={this.closeStoredList} storedList={this.state.storedList} removeOneStoredList={this.removeOneStoredList} locale={locale} />
                </div>
            );

        } else {
            var changeSortKey = <FormControl componentClass="select" style={{"width": "350px"}} value={this.props.data.sortKey} onChange={this.props.onChangeSortkey} > {selector[locale].ktypes} </FormControl>
            return (
                <div className="resultList">
                    <ControlLabel>{intl.translate("表示項目切替", locale)}</ControlLabel>
                    <ButtonToolbar>
                    <DropdownButton title={intl.translate("攻撃力・HP・連撃率", locale)} id="atk-hp-etcs">
                        <MenuItem onClick={this.handleEvent.bind(this, "switchTotalAttack")} active={(this.state.switchTotalAttack == 1) ? true : false}>{intl.translate("攻撃力(二手技巧無し)", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchATKandHP")} active={(this.state.switchATKandHP == 1) ? true : false}>{intl.translate("戦力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchHP")} active={(this.state.switchHP == 1) ? true : false}>HP</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchDATA")} active={(this.state.switchDATA == 1) ? true : false}>{intl.translate("連撃率", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchExpectedAttack")} active={(this.state.switchExpectedAttack == 1) ? true : false}>{intl.translate("期待攻撃回数", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalRatio")} active={(this.state.switchCriticalRatio == 1) ? true : false}>{intl.translate("技巧期待値", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCriticalAttack")} active={(this.state.switchCriticalAttack == 1) ? true : false}>{intl.translate("技巧期待攻撃力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchTotalExpected")} active={(this.state.switchTotalExpected == 1) ? true : false}>{intl.translate("総合*回数*技巧", locale)}</MenuItem>
                    </DropdownButton>

                    <DropdownButton title={intl.translate("パーティ平均攻撃力", locale)} id="party-averafed-atk">
                        <MenuItem onClick={this.handleEvent.bind(this, "switchAverageAttack")} active={(this.state.switchAverageAttack == 1) ? true : false}>{intl.translate("パーティ平均攻撃力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCriticalAttack")} active={(this.state.switchAverageCriticalAttack == 1) ? true : false}>{intl.translate("技巧平均攻撃力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchAverageTotalExpected")} active={(this.state.switchAverageTotalExpected == 1) ? true : false}>{intl.translate("総回技の平均", locale)}</MenuItem>
                    </DropdownButton>

                    <DropdownButton title={intl.translate("予測ダメージ", locale)} id="expected-damage">
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCycleDamage")} active={(this.state.switchCycleDamage == 1) ? true : false}> {intl.translate("予想ターン毎ダメージ", locale)} </MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchAverageCycleDamage")} active={(this.state.switchAverageCycleDamage == 1) ? true : false}> {intl.translate("パーティ平均予想ターン毎ダメージ", locale)} </MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchDamage")} active={(this.state.switchDamage == 1) ? true : false}> {intl.translate("単攻撃ダメージ", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchOugiDamage")} active={(this.state.switchOugiDamage == 1) ? true : false}> {intl.translate("奥義ダメージ", locale)} </MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchOugiGage")} active={(this.state.switchOugiGage == 1) ? true : false}> {intl.translate("ターン毎の奥義ゲージ上昇量", locale)} </MenuItem>
                    </DropdownButton>

                    <DropdownButton title={intl.translate("キャラ情報・スキル合計値", locale)} id="chara-and-skill-info">
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaAttack")} active={(this.state.switchCharaAttack == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("攻撃力", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaHP")} active={(this.state.switchCharaHP == 1) ? true : false}>{intl.translate("キャラ", locale)}HP</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaDA")} active={(this.state.switchCharaDA == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("連撃率", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchCharaTotalExpected")} active={(this.state.switchCharaTotalExpected == 1) ? true : false}>{intl.translate("キャラ", locale)}{intl.translate("総回技", locale)}</MenuItem>
                        <MenuItem onClick={this.handleEvent.bind(this, "switchSkillTotal")} active={(this.state.switchSkillTotal == 1) ? true : false}>{intl.translate("スキル合計", locale)}</MenuItem>
                    </DropdownButton>
                    <ControlAutoUpdate autoupdate={this.state.disableAutoResultUpdate} switchAutoUpdate={this.handleEvent.bind(this, "disableAutoResultUpdate")} forceResultUpdate={this.forceResultUpdate} locale={locale} />
                    </ButtonToolbar>

                    <hr />

                    <ButtonGroup style={{width: "100%"}}>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openHPChart} disabled={!this.state.ChartButtonActive} >{intl.translate("背水グラフ", locale)}</Button>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openTurnChart} disabled={!this.state.ChartButtonActive} >{intl.translate("初期攻撃力推移グラフ", locale)}</Button>
                        <Button block style={{float: "left", width: "33.3%", margin: "0 0 5px 0"}} bsStyle="primary" bsSize="large" onClick={this.openSimulator} disabled={!this.state.ChartButtonActive} >{intl.translate("ダメージシミュレータ", locale)}</Button>
                    </ButtonGroup>

                    {summondata.map(function(s, summonindex) {
                        var selfSummonHeader = ""
                        if(s.selfSummonType == "odin"){
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性攻", locale) + s.selfSummonAmount + intl.translate("キャラ攻", locale) + s.selfSummonAmount2
                        } else if (s.selfSummonType == "elementByRace") {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.selfSummonAmount), races)
                        } else {
                            selfSummonHeader = intl.translate(summonElementTypes[s.selfElement].name, locale) + intl.translate(summonTypes[s.selfSummonType], locale) + s.selfSummonAmount
                        }

                        var friendSummonHeader = ""
                        if(s.friendSummonType == "odin"){
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性攻", locale) + s.friendSummonAmount + intl.translate("キャラ攻", locale) + s.friendSummonAmount2
                        } else if (s.friendSummonType == "elementByRace") {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate("属性(種族数)", locale) + tesukatoripoka(parseInt(s.friendSummonAmount), races)
                        } else {
                            friendSummonHeader = intl.translate(summonElementTypes[s.friendElement].name, locale) + intl.translate(summonTypes[s.friendSummonType], locale) + s.friendSummonAmount
                        }

                        return(
                            <div key={summonindex} className="result">
                                <h2> {intl.translate("結果", locale)}{summonindex + 1}: {selfSummonHeader} + {friendSummonHeader} [{intl.translate("優先項目", locale)}: {changeSortKey}]</h2>
                                <div className="charainfo"><span>{remainHPstr}</span></div>
                                <table className="table table-bordered">
                                <thead className="result">
                                <tr>
                                    <th>{intl.translate("順位", locale)}</th>
                                    {tableheader.map(function(m, ind){ return <th key={ind}>{m}</th>; })}
                                    {
                                        armnames.map(function(m, ind){
                                        if(ind == 0) {
                                            return <th key={ind} className="resultFirst">{m}</th>;
                                        } else {
                                            return <th key={ind} className="resultList">{m}</th>;
                                        }})
                                    }
                                    <th>{intl.translate("操作", locale)}</th>
                                </tr>
                                </thead>
                                <Result key={summonindex} summonid={summonindex} data={result[summonindex]} switcher={switcher} arm={arm} prof={prof} onAddToHaisuiData={onAddToHaisuiData} locale={locale}/>
                                </table>
                            </div>
                        );
                    })}
                    <Modal className="hpChart" show={this.state.openHPChart} onHide={this.closeHPChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>HP Charts ({remainHPstr})</Modal.Title>
                            <Button bsStyle="info" onClick={this.openHPChartTutorial}>{intl.translate("使い方", locale)}</Button>
                            <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <HPChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                            <HPChartHowTo show={this.state.openHPChartTutorial} onHide={this.closeHPChartTutorial}/>
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openTurnChart} onHide={this.closeTurnChart}>
                        <Modal.Header closeButton>
                            <Modal.Title>初期攻撃力推移 ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <TurnChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                        </Modal.Body>
                    </Modal>
                    <Modal className="hpChart" show={this.state.openSimulator} onHide={this.closeSimulator}>
                        <Modal.Header closeButton>
                            <Modal.Title>ダメージシミュレータ ({remainHPstr})</Modal.Title>
                            <Button bsStyle="primary" onClick={this.openStoredList}>{intl.translate("保存された編成を編集", locale)}</Button>
                            <Button bsStyle="danger" onClick={this.resetStoredList}>{intl.translate("保存された編成を削除", locale)}</Button>
                        </Modal.Header>
                        <Modal.Body>
                            <SimulationChart data={this.state.chartData} sortKey={this.state.chartSortKey} locale={locale} />
                        </Modal.Body>
                    </Modal>
                    <StoredListEditor className="hpChartTutotial" show={this.state.openShowStoredList} onHide={this.closeStoredList} storedList={this.state.storedList} removeOneStoredList={this.removeOneStoredList} locale={locale} />
                </div>
            );
        }
    }
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
        var locale = this.props.locale;

        return (
            <tbody className="result">
                {this.props.data.map(function(m, rank) {
                    var colSize = 2;
                    var tablebody = []
                    var tablebody2 = {};
                    // initialize tablebody2
                    for(key in m.data){
                        tablebody2[key] = "";
                    }

                    if(sw.switchTotalAttack) {
                        tablebody.push(m.data.Djeeta.totalAttack)
                        ++colSize;
                    }
                    if(sw.switchATKandHP) {
                        var senryoku = parseInt(m.data.Djeeta.displayAttack) + parseInt(m.data.Djeeta.displayHP)
                        tablebody.push(senryoku + "\n(" + parseInt(m.data.Djeeta.displayAttack) + ' + ' + parseInt(m.data.Djeeta.displayHP) + ')')
                        ++colSize;
                    }
                    if(sw.switchCharaAttack) {
                        for(key in m.data){
                            tablebody2[key] += intl.translate("攻撃力", locale) + " " + m.data[key].totalAttack + " "
                        }
                    }

                    if(sw.switchDATA) {
                        tablebody2["Djeeta"] += 'DA:' + (100.0 * m.data.Djeeta.totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data.Djeeta.totalTA).toFixed(1) + '% '
                    }

                    if(sw.switchCharaDA) {
                        for(key in m.data){
                            // switchDATAが指定されていなかったら全員分
                            // 指定されていたらDjeetaじゃない場合だけ
                            if(!sw.switchDATA || (key != "Djeeta")) {
                                tablebody2[key] += 'DA:' + (100.0 * m.data[key].totalDA).toFixed(1) + '%,\n TA: ' + (100.0 * m.data[key].totalTA).toFixed(1) + '% '
                            }
                        }
                    }

                    if(sw.switchExpectedAttack) {
                        var expectedAttack = parseInt(m.data.Djeeta.expectedAttack * m.data.Djeeta.totalAttack)
                        tablebody.push(m.data.Djeeta.expectedAttack.toFixed(4) + "\n(" + expectedAttack + ")")
                        ++colSize;
                    }
                    if(sw.switchCriticalRatio) {
                        tablebody.push(m.data.Djeeta.criticalRatio.toFixed(4) + "\n(" + m.data.Djeeta.effectiveCriticalRatio.toFixed(4) + ")")
                        ++colSize;
                    }
                    if(sw.switchCriticalAttack) {
                        tablebody.push(m.data.Djeeta.criticalAttack)
                        ++colSize;
                    }
                    if(sw.switchHP) {
                        tablebody.push(m.data.Djeeta.totalHP + "\n(" + parseInt(m.data.Djeeta.totalHP * m.data.Djeeta.remainHP) + ")")
                        ++colSize;
                    }
                    if(sw.switchCharaHP) {
                        for(key in m.data){
                            tablebody2[key] += "HP " + m.data[key].totalHP + "\n (" + intl.translate("残HP", locale) + " " + parseInt(m.data[key].totalHP * m.data[key].remainHP) + ") "
                        }
                    }
                    if(sw.switchAverageAttack) {
                        tablebody.push(parseInt(m.data.Djeeta.averageAttack))
                        ++colSize;
                    }
                    if(sw.switchAverageCriticalAttack) {
                        tablebody.push(m.data.Djeeta.averageCriticalAttack)
                        ++colSize;
                    }
                    if(sw.switchTotalExpected) {
                        tablebody.push(m.data.Djeeta.totalExpected)
                        ++colSize;
                    }
                    if(sw.switchCharaTotalExpected) {
                        for(key in m.data){
                            tablebody2[key] += intl.translate("総回技", locale) + " " + m.data[key].totalExpected + " "
                        }
                    }
                    if(sw.switchAverageTotalExpected) {
                        tablebody.push(m.data.Djeeta.averageTotalExpected)
                        ++colSize;
                    }
                    if(sw.switchDamage) {
                        var damage = m.data.Djeeta.damage
                        var expectedDamage = m.data.Djeeta.expectedAttack * damage
                        tablebody.push(parseInt(damage) + "\n(" + parseInt(expectedDamage) + ")")
                        ++colSize;
                    }
                    if(sw.switchOugiGage) {
                        tablebody.push(m.data.Djeeta.expectedOugiGage.toFixed(2) + "%\n(" + m.data.Djeeta.expectedTurn.toFixed(2) + "T)")
                        ++colSize;
                    }
                    if(sw.switchOugiDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.ougiDamage))
                        ++colSize;
                    }
                    if(sw.switchCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.expectedCycleDamagePerTurn))
                        ++colSize;
                    }
                    if(sw.switchAverageCycleDamage) {
                        tablebody.push(parseInt(m.data.Djeeta.averageCyclePerTurn))
                        ++colSize;
                    }

                    if(sw.switchSkillTotal) {
                        for(var key in m.data){
                            var skillstr = "";
                            var skilldata = m.data[key].skilldata

                            if(skilldata.normal != 1.0) {skillstr += intl.translate("通常攻刃", locale) + (100.0 * (skilldata.normal - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.normalHaisui != 1.0) {skillstr += intl.translate("通常背水", locale) + (100.0 * (skilldata.normalHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.normalKonshin != 1.0) {skillstr += intl.translate("通常渾身", locale) + (100.0 * (skilldata.normalKonshin - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.element != 1.0) {skillstr += intl.translate("属性", locale) + (100.0 * (skilldata.element - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.magna != 1.0) {skillstr += intl.translate("マグナ", locale) + (100.0 * (skilldata.magna - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.magnaHaisui != 1.0) {skillstr += intl.translate("マグナ背水", locale) + (100.0 * (skilldata.magnaHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.unknown != 1.0) {skillstr += intl.translate("アンノウン", locale) + (100.0 * (skilldata.unknown - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.unknownHaisui != 1.0) {skillstr += intl.translate("アンノウン背水", locale) + (100.0 * (skilldata.unknownHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.charaHaisui != 1.0) {skillstr += intl.translate("キャラ背水", locale) + (100.0 * (skilldata.charaHaisui - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.hpRatio != 1.0) {skillstr += intl.translate("HP増加", locale) + (100.0 * (skilldata.hpRatio - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.other != 1.0) {skillstr += intl.translate("その他バフ", locale) + (100.0 * (skilldata.other - 1.0)).toFixed(1); skillstr += "% ";}
                            if(skilldata.ougiDamageBuff != 0.0) {skillstr += intl.translate("奥義ダメージ", locale) + (100.0 * (1.0 + skilldata.ougiDamageBuff)).toFixed(0); skillstr += "% ";}

                            tablebody2[key] += skillstr;
                        }
                    }

                    var res = [
                        <tr className="result" title={skillstr} key={rank + 1}>
                            <td>{rank + 1}</td>
                            {tablebody.map(function(am, ind){
                                return (<td key={ind} >{am}</td>);
                            })}
                            {m.armNumbers.map(function(am, ind){
                                if(arm[ind].considerNumberMax != 0) {
                                    ++colSize;
                                    if(ind == 0){
                                        if(parseInt(am) > 0) {
                                            return (<td key={ind} className="resultFirst"><p className="text-info">{am} {intl.translate("本", locale)}</p></td>);
                                        } else {
                                            return (<td key={ind} className="resultFirst"><p className="text-muted">{am} {intl.translate("本", locale)}</p></td>);
                                        }
                                    } else {
                                        if(parseInt(am) > 0) {
                                            return (<td key={ind} className="resultList"><p className="text-info">{am} {intl.translate("本", locale)}</p></td>);
                                        } else {
                                            return (<td key={ind} className="resultList"><p className="text-muted">{am} {intl.translate("本", locale)}</p></td>);
                                        }
                                    }
                                }
                             })}
                            <td style={{"padding": "2px"}}><Button id={rank} bsStyle="primary" block className="add-graph-button" onClick={onClick}>{intl.translate("グラフに加える", locale)}</Button></td>
                        </tr>,
                    ];

                    for(var key in tablebody2) {
                        if(tablebody2[key] != "") {
                            res.push(<tr>
                                <td colSpan="4">
                                    <p className="text-info">{key}</p>
                                </td>
                                <td colSpan={colSize - 4}>
                                    <p className="text-left">{tablebody2[key]}</p>
                                </td>
                            </tr>);
                        }
                    }

                    return res;
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

        return (
            <div className="armList">
                <Button block bsStyle="success" bsSize="large" onClick={this.openPresets}><i className="fa fa-folder-open" aria-hidden="true"></i>{intl.translate("武器テンプレート", locale)}</Button>
                <br/>
                <span>{intl.translate("属性一括変更", locale)}</span>
                <FormControl componentClass="select" value={this.state.defaultElement} onChange={this.handleEvent.bind(this, "defaultElement")} > {selector[locale].elements} </FormControl>
                <Grid fluid>
                    <Row>
                        {arms.map(function(arm, ind) {
                            return <Arm key={arm} onChange={hChange} onRemove={hRemove} onCopy={hCopy} addArm={addArm} addArmID={addArmID} considerNum={considerNum} id={ind} keyid={arm} dataName={dataName} defaultElement={defaultElement} locale={locale} />;
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
        var locale = this.props.locale;

        return (
            <ColP sxs={12} xs={6} ssm={4} className="col-bordered">
                <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>{intl.translate("武器名", locale)}　</InputGroup.Addon>
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.name} onBlur={this.handleOnBlur.bind(this, "name")} onChange={this.handleEvent.bind(this, "name")} />
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

var Profile = React.createClass({
    getDefaultProps() {
        var zenithBonuses = {"ja": {}, "en": {}}
        zenithBonuses.ja = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
        zenithBonuses.en = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{intl.translate(opt, "en")}</option> });

        var alljobs = {"ja": {}, "en": {}}
        alljobs.ja = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{Jobs[opt].name}</option> });
        alljobs.en = Object.keys(Jobs).map(function(opt){ return <option value={opt} key={opt}>{intl.translate(Jobs[opt].name, "en")}</option> });

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
            zenithPartyHPBonus: 0,
            masterBonus: 0,
            masterBonusHP: 0,
            normalBuff: 0,
            elementBuff: 0,
            otherBuff: 0,
            additionalDamageBuff: 0,
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
        var locale = this.props.locale

        return (
            <div className="profile">
                <table className="table table-sm table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("プロフィールタイトル", locale)}</strong>
                        </td>
                    </tr>
                    <TextWithTooltip tooltip={intl.translate("ランク説明", locale)} id={"tooltip-rank-detail"}>
                        <tr>
                            <th className="bg-primary">Rank*</th>
                            <td><FormControl type="number" min="1" max="175" value={this.state.rank} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "rank")}/></td>
                        </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジョブ説明", locale)} id={"tooltip-job-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("ジョブ", locale)}*
                        <span style={{display: "block"}} className="label label-default">{intl.translate("得意", locale)} [{intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)}, {intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)}]</span>
                        <span style={{display: "block"}} className="label label-primary">{intl.translate(jobTypes[Jobs[this.state.job].type], locale)}{intl.translate("タイプ", locale)}</span>
                        <span style={{display: "block"}} className="label label-success">{intl.translate("攻撃ボーナス", locale)} {Jobs[this.state.job].atBonus}</span>
                        <span style={{display: "block"}} className="label label-danger">{intl.translate("HPボーナス", locale)} {Jobs[this.state.job].hpBonus}</span>
                        <span style={{display: "block"}} className="label label-success">{intl.translate("攻刃ボーナス", locale)} {Jobs[this.state.job].kouzinBonus}</span>
                        <span style={{display: "block"}} className="label label-primary">{intl.translate("守護ボーナス", locale)} {Jobs[this.state.job].shugoBonus}</span>
                        <span style={{display: "block"}} className="label label-danger">{intl.translate("基礎DA率", locale)} {Jobs[this.state.job].DaBonus}%</span>
                        <span style={{display: "block"}} className="label label-default">{intl.translate("基礎TA率", locale)} {Jobs[this.state.job].TaBonus}%</span>
                        </th>
                        <td><FormControl componentClass="select" value={this.state.job} onChange={this.handleSelectEvent.bind(this, "job")} > {this.props.alljobs[locale]} </FormControl></td>
                    </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボATK説明", locale)} id={"tooltip-masterbonus-atk-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("マスボATK", locale)}*
                        </th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.masterBonus} onChange={this.handleSelectEvent.bind(this, "masterBonus")}>{selector.masteratk}</FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr></TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("マスボHP説明", locale)} id={"tooltip-masterbonus-hp-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("マスボHP", locale)}
                        </th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.masterBonusHP} onChange={this.handleSelectEvent.bind(this, "masterBonusHP")}>{selector.masterhp}</FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr></TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("残HP割合説明(ジータのみ)", locale)} id={"tooltip-remain-hp-djeeta-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("残HP割合", locale)}<br/>{intl.translate("ジータさんのみ", locale)}
                        </th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.remainHP} onChange={this.handleSelectEvent.bind(this, "remainHP")}>{selector.hplist}</FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr></TextWithTooltip>

                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん属性", locale)}*</th>
                        <td><FormControl componentClass="select" value={this.state.element} onChange={this.handleSelectEvent.bind(this, "element")}> {selector[locale].elements} </FormControl></td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("敵の属性説明", locale)} id={"tooltip-enemy-element-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("敵の属性", locale)}*
                        </th>
                        <td><FormControl componentClass="select" value={this.state.enemyElement} onChange={this.handleSelectEvent.bind(this, "enemyElement")}> {selector[locale].elements} </FormControl></td>
                    </tr></TextWithTooltip>

                    <tr>
                        <td colSpan="2">
                        <strong>{intl.translate("ゼニスパーク", locale)}</strong>
                        </td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("ゼニス攻撃力", locale)}*</th>
                        <td><FormControl componentClass="select" value={this.state.zenithAttackBonus} onChange={this.handleSelectEvent.bind(this, "zenithAttackBonus")}>{selector.zenithAttack} </FormControl></td>
                    </tr>

                    <tr>
                        <th className="bg-primary">{intl.translate("ゼニスHP", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.zenithHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithHPBonus")} > {selector.zenithHP} </FormControl></td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("武器ゼニス説明", locale)} id={"tooltip-weapon-zenith-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("武器ゼニス1", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm1], locale)})</th>
                        <td><FormControl componentClass="select" value={this.state.zenithBonus1} onChange={this.handleSelectEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses[locale]} </FormControl></td>
                    </tr></TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("武器ゼニス説明", locale)} id={"tooltip-weapon-zenith-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("武器ゼニス2", locale)}({intl.translate(armTypes[Jobs[this.state.job].favArm2], locale)})</th>
                        <td><FormControl componentClass="select" value={this.state.zenithBonus2} onChange={this.handleSelectEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses[locale]} </FormControl></td>
                    </tr></TextWithTooltip>

                    <tr>
                        <th className="bg-primary">{intl.translate("味方全体のHP", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.zenithPartyHPBonus} onChange={this.handleSelectEvent.bind(this, "zenithPartyHPBonus")} > {selector.zenithHP} </FormControl></td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                        <strong>{intl.translate("パーティバフタイトル", locale)}</strong>
                        <p>{intl.translate("パーティバフ説明", locale)}</p>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("通常バフ説明", locale)} id={"tooltip-normalbuff-detail"}>
                    <tr>
                        <th className="bg-primary">
                        {intl.translate("通常バフ", locale)}
                        </th>
                        <td className="table-profile-td">
                        <InputGroup>
                        <FormControl type="number"  min="0" value={this.state.normalBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "normalBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                </TextWithTooltip>

                <TextWithTooltip tooltip={intl.translate("属性バフ説明", locale)} id={"tooltip-elementbuff-detail"}>
                <tr>
                        <th className="bg-primary">{intl.translate("属性バフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl type="number"  min="0" value={this.state.elementBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "elementBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("その他バフ説明", locale)} id={"tooltip-otherbuff-detail"}><tr>
                        <th className="bg-primary">{intl.translate("その他バフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl type="number"  min="0" value={this.state.otherBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "otherBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("HPバフ説明", locale)} id={"tooltip-hpbuff-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("HPバフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl type="number"  min="0" value={this.state.hpBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "hpBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("DAバフ説明", locale)} id={"tooltip-dabuff-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("DAバフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl type="number"  min="0" max="100" value={this.state.daBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "daBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("TAバフ説明", locale)} id={"tooltip-tabuff-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("TAバフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl type="number"  min="0" max="100" value={this.state.taBuff} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "taBuff")}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("残HP割合", locale)} id={"tooltip-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("残HP割合", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.hp} onChange={this.handleSelectEvent.bind(this, "hp")}>{selector.hplist}</FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("追加ダメージバフ説明", locale)} id={"tooltip-additionalbuff-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("追加ダメージバフ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.additionalDamageBuff} onChange={this.handleSelectEvent.bind(this, "additionalDamageBuff")}> {selector.buffLevel} </FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("奥義ゲージ上昇率アップ説明", locale)} id={"tooltip-ougigagebuff-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("奥義ゲージ上昇率アップ", locale)}</th>
                        <td>
                        <InputGroup>
                        <FormControl componentClass="select" value={this.state.ougiGageBuff} onChange={this.handleSelectEvent.bind(this, "ougiGageBuff")}> {selector.buffLevel} </FormControl>
                        <InputGroup.Addon>%</InputGroup.Addon>
                        </InputGroup>
                        </td>
                    </tr>
                    </TextWithTooltip>

                    <tr>
                        <td colSpan="2">
                            <strong>{intl.translate("Advanced", locale)}</strong>
                            <p>{intl.translate("Advanced 説明", locale)}</p>
                        </td>
                    </tr>

                    <TextWithTooltip tooltip={intl.translate("敵防御固有値説明", locale)} id={"tooltip-enemy-defense-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("敵防御固有値", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.enemyDefense} onChange={this.handleSelectEvent.bind(this, "enemyDefense")}> {selector[locale].enemydeftypes} </FormControl></td>
                    </tr>
                    </TextWithTooltip>

                    <TextWithTooltip tooltip={intl.translate("ジータさん基礎DA率説明", locale)} id={"tooltip-player-baseda-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("基礎DA率", locale)}</th>
                        <td><FormControl type="number" min="0" step="0.1" value={this.state.DA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "DA")}/></td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("ジータさん基礎TA率説明", locale)} id={"tooltip-player-baseta-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("基礎TA率", locale)}</th>
                        <td><FormControl type="number" min="0" step="0.1" value={this.state.TA} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "TA")}/></td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("ジータさん奥義倍率説明", locale)} id={"tooltip-ougi-ratio-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("ジータさん", locale)}<br/>{intl.translate("奥義倍率", locale)}</th>
                        <td><FormControl componentClass="select" value={this.state.ougiRatio} onChange={this.handleSelectEvent.bind(this, "ougiRatio")}> {selector.ougiRatio} </FormControl></td>
                    </tr>
                    </TextWithTooltip>
                    <TextWithTooltip tooltip={intl.translate("確保HP説明", locale)} id={"tooltip-minimu-hp-detail"}>
                    <tr>
                        <th className="bg-primary">{intl.translate("確保HP", locale)}</th>
                        <td><FormControl type="number"  min="0" value={this.state.minimumHP} onBlur={this.handleOnBlur} onChange={this.handleEvent.bind(this, "minimumHP")}/></td>
                    </tr>
                    </TextWithTooltip>
                    </tbody>
                </table>
            </div>
        );
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
                <FormControl componentClass="select" value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >{intl.translate("ブラウザに保存", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitLoad} >{intl.translate("ブラウザデータ読込", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitRemove} >{intl.translate("削除", locale)}</Button>
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
