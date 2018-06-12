var React = require('react');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var Profile = require('./profile.js')
var {SummonList, Summon} = require('./summon.js');
var {CharaList, Chara} = require('./chara.js');
var {ArmList, Arm} = require('./armlist.js')
var { AdsenseAdvertisement } = require('./advertisement.js');
var GlobalConst = require('./global_const.js')
var Notice = require('./notice.js')
var {ResultList, Result} = require('./result.js')
var {HowTo, NiteHowTo, HPChartHowTo, SimulatorHowTo} = require('./howto.js')
var {ColP} = require('./gridp.js')
var intl = require('./translate.js')
var _ua = GlobalConst._ua;

// query 取得用の関数
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

// Root class contains [Profile, ArmList, Results].
var Root = CreateClass({
  getInitialState: function() {
      var initial_width = 25;
      var initial_height = 100;

      return {
          armNum: 6,
          summonNum: 2,
          charaNum: 4,
          profile: {},
          armlist: [],
          chara: [],
          summon: [],
          simulator: {},
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
          dataForLoad: {},
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
              initState["dataName"] = "serverData"

              if(initState["dataForLoad"] == undefined) {
                  initState["dataForLoad"] = {}
              }

              initState["dataForLoad"]["profile"] = initState.profile
              initState["dataForLoad"]["summon"] = initState.summon
              initState["dataForLoad"]["chara"] = initState.chara
              initState["dataForLoad"]["armlist"] = initState.armlist

              this.setState(initState);
          }.bind(this),
          error: function(xhr, status, err) {
              alert("Error!: IDが不正です. status: ", status, ", error message: ", err.toString());
          }.bind(this)
      });
  },
  componentDidMount: function(){
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
  handleChangeData: function(newDataName, newData) {
      // Rootが持つデータを更新
      this.setState({armNum: newData.armNum});
      this.setState({summonNum: newData.summonNum});
      this.setState({charaNum: newData.charaNum});

      this.setState({profile: newData.profile});
      this.setState({summon: newData.summon});
      this.setState({armlist: newData.armlist});
      this.setState({chara: newData.chara});
      this.setState({simulator: newData.simulator});

      // 子要素に伝搬させるためのデータも同様に更新
      this.setState({
          dataForLoad: {
              "profile": newData.profile,
              "summon": newData.summon,
              "armlist": newData.armlist,
              "chara": newData.chara,
          }
      });

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
            <div className="root">
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
                <AdsenseAdvertisement locale={locale} type="mobile" />
                <div className="smartphone-content">
                    <div className="Tab" id="inputTab">
                        <h2 style={{"marginTop": "10px", "marginBottom": "5px"}} >{intl.translate("motocal", locale)}</h2>
                        <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={locale} dataForLoad={this.state.dataForLoad.profile} />
                    </div>
                    <div className="Tab hidden" id="summonTab">
                        <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} locale={locale} dataForLoad={this.state.dataForLoad.summon} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>{intl.translate("追加", locale)}(現在{this.state.summonNum}組)</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="charaTab">
                        <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} locale={locale} dataForLoad={this.state.dataForLoad.chara} />
                        <ButtonGroup className="addRemoveButtonGroup">
                            <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>{intl.translate("追加", locale)}(現在{this.state.charaNum}人)</Button>
                            <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>{intl.translate("削除", locale)}</Button>
                        </ButtonGroup>
                    </div>
                    <div className="Tab hidden" id="armTab">
                        <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddArmNum={this.addArmNum} locale={locale} dataForLoad={this.state.dataForLoad.armlist} />
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
                            <DropdownButton title={intl.translate("使い方", locale)} id="system-howto">
                                <MenuItem onClick={this.openHowTo}>{intl.translate("使い方", locale)}</MenuItem>
                                <MenuItem onClick={this.openNiteHowTo}>二手等について </MenuItem>
                                <MenuItem href="http://www.hsimyu.net/" target="_blank"> Blog </MenuItem>
                            </DropdownButton>
                        </ButtonGroup>
                        <div className="systemList">
                            <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
                            <Notice locale={locale} />
                        </div>
                    </div>
                </div>
                <Nav className="footerNav" bsStyle="pills"
                    activeKey={(this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey}
                    onSelect={this.handleChangeTab}>
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
                            <MenuItem href="http://www.hsimyu.net/" target="_blank"> Blog </MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight>
                            <ButtonGroup>
                                <Button bsSize="small" onClick={this.changeLang.bind(this, "ja")}>日本語</Button>
                                <Button bsSize="small" onClick={this.changeLang.bind(this, "en")}>English</Button>
                            </ButtonGroup>
                        </Navbar.Form>
                    </Navbar>
                    <Nav bsStyle="tabs" justified activeKey={(this.state.activeKey == undefined) ? "inputTab" : this.state.activeKey} onSelect={this.handleChangeTab}>
                        <NavItem eventKey="inputTab">{intl.translate("ジータ", locale)}</NavItem>
                        <NavItem eventKey="summonTab">{intl.translate("召喚石", locale)}</NavItem>
                        <NavItem eventKey="charaTab">{intl.translate("キャラ", locale)}</NavItem>
                        <NavItem eventKey="armTab">{intl.translate("武器", locale)}</NavItem>
                        <NavItem eventKey="systemTab">{intl.translate("保存", locale)}</NavItem>
                    </Nav>
                    <div className="main-content">
                        <div className="Tab" id="inputTab">
                            <Profile dataName={this.state.dataName} onChange={this.onChangeProfileData} locale={this.state.locale} dataForLoad={this.state.dataForLoad.profile} />
                        </div>
                        <div className="Tab hidden" id="summonTab">
                            <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} locale={locale} dataForLoad={this.state.dataForLoad.summon} />
                            <ButtonGroup className="addRemoveButtonGroup">
                                <Button className="addRemoveButton" bsStyle="primary" onClick={this.addSummonNum}>{intl.translate("追加", locale)}</Button>
                                <Button className="addRemoveButton" bsStyle="danger" onClick={this.subSummonNum}>{intl.translate("削除", locale)}</Button>
                            </ButtonGroup>
                        </div>
                        <div className="Tab hidden" id="charaTab">
                            <CharaList dataName={this.state.dataName} onChange={this.onChangeCharaData} charaNum={this.state.charaNum} pleaseAddCharaNum={this.addCharaNum} locale={locale} dataForLoad={this.state.dataForLoad.chara}/>
                            <ButtonGroup className="addRemoveButtonGroup">
                                <Button className="addRemoveButton" bsStyle="primary" onClick={this.addCharaNum}>{intl.translate("追加", locale)}</Button>
                                <Button className="addRemoveButton" bsStyle="danger" onClick={this.subCharaNum}>{intl.translate("削除", locale)}</Button>
                            </ButtonGroup>
                        </div>
                        <div className="Tab hidden" id="armTab">
                            <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} pleaseAddCharaNum={this.addCharaNum} pleaseAddArmNum={this.addArmNum} locale={locale} dataForLoad={this.state.dataForLoad.armlist}/>
                            <ButtonGroup className="addRemoveButtonGroup">
                                <Button className="addRemoveButton" bsStyle="primary" onClick={this.addArmNum}>{intl.translate("追加", locale)}</Button>
                                <Button className="addRemoveButton" bsStyle="danger" onClick={this.subArmNum}>{intl.translate("削除", locale)}</Button>
                            </ButtonGroup>
                        </div>
                        <div className="Tab hidden" id="systemTab">
                            <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
                            <Notice locale={locale} />
                        </div>
                    </div>
                </div>
                <div draggable="true" className="drag-hr" onDragEnd={this.onDragEnd}></div>
                <div className="rootRight" style={{height: this.state.rootrightHeight + "%", width: "calc(" + this.state.rootrightWidth + "% - 10px)"}} >
                    <ResultList
                        profile={this.state.profile}
                        armlist={this.state.armlist}
                        chara={this.state.chara}
                        summon={this.state.summon}
                        sortKey={this.state.sortKey}
                        dataName={this.state.dataName}
                        simulator={this.state.simulator}
                        noResultUpdate={this.state.noResultUpdate}
                        onChangeSortkey={this.handleEvent.bind(this, "sortKey")}
                        onChangeSimulationData={this.onChangeSimulationData}
                        locale={locale}
                     />
                </div>
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
                        <SimulatorHowTo />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
  }
});

var Sys = CreateClass({
    getInitialState: function() {
        return {
            storedData: {},
            dataName: '',
            selectedData: '',
            uploadedData: '',
            rawData: '',
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
            var dataForLoad = JSON.parse(JSON.stringify(this.state.storedData[this.state.selectedData]));

            // これは will receive props が発火したあとしか反映されない
            this.setState({dataName: this.state.selectedData});
            this.props.onLoadNewData(this.state.selectedData, dataForLoad)
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

            this.setState(newState);
        } else {
            alert("データ名を入力して下さい。")
        }
    },
    onSubmitDownload: function(e){
        e.preventDefault();
        if(this.state.rawData != ''){
            var blob = new Blob([this.state.rawData], {"type": "application/json"});

            if (window.navigator.msSaveBlob) {
                // IE10/11
                window.navigator.msSaveBlob(blob, "motocal_data.json");
            } else {
                // other browsers
                var newlink = document.createElement('a');
                newlink.href = window.URL.createObjectURL(blob);
                newlink.setAttribute('download', 'motocal_data.json');
                newlink.click();
            }
        }
    },
    onSubmitSaveRawData: function(e){
        var rawData = JSON.stringify(this.state.storedData, null, 2);
        this.setState({rawData: rawData});
    },
    onSubmitLoadRawData: function(e){
        var storedData = JSON.parse(this.state.rawData);
        this.setState({storedData: storedData});
        this.setState({selectedData: Object.keys(storedData)[0]});

        // save data
        var saveString = Base64.encodeURI(JSON.stringify(storedData));
        localStorage.setItem("data", saveString);
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
                <FormControl componentClass="select" size={10} value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >{intl.translate("ブラウザに保存", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitLoad} >{intl.translate("ブラウザデータ読込", locale)}</Button>
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitRemove} >{intl.translate("削除", locale)}</Button>
                </ButtonGroup>
                {/*
                <FormGroup className="systemButtonGroup">
                    <FormControl type="file" label="アップロード" value={this.state.uploadedData} onChange={this.handleEvent.bind(this, "uploadedData")} />
                    <Button type="submit" bsStyle="primary" className="systemButton" onClick={this.onSubmitUpload}>{intl.translate("アップロード", locale)}</Button>
                </FormGroup>
                */}
                <TwitterShareButton data={this.props.data} dataName={this.state.dataName} locale={locale} />
                <FormGroup>
                    {intl.translate("データ移行", locale)}
                    <FormControl componentClass="textarea" bsSize="large" value={this.state.rawData} onChange={this.handleEvent.bind(this, "rawData")} />
                    <ButtonGroup>
                    <Button tye="submit" bsStyle="primary" onClick={this.onSubmitSaveRawData}>{intl.translate("移行データ出力", locale)}</Button>
                    <Button tye="submit" bsStyle="primary" onClick={this.onSubmitLoadRawData}>{intl.translate("移行データ入力", locale)}</Button>

                    {/* rawdataが発行されている場合にJSONダウンロードボタンを表示 */}
                    { this.state.rawData != '' ?
                        <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitDownload} >{intl.translate("ダウンロード", locale)}</Button>
                        :
                        null
                    }
                    </ButtonGroup>
                </FormGroup>
            </div>
        );
    }
});

// Twitter Button
var TwitterShareButton = CreateClass ({
    componentDidMount: function(){
        // localStorage から sharehistory をロードする
        if ("sharehist" in localStorage && localStorage.sharehist != "{}" ) {
            var sharehist = JSON.parse(localStorage["sharehist"])
            this.setState({shareurl_history: sharehist})
        }
    },
    getInitialState: function() {
        return {
            shareurl: "",
            shareurl_history: {},
        };
    },
    getShortenUrl: function() {
        var data = JSON.parse(JSON.stringify(this.props.data));
        if(this.props.dataName != '') {
            // 基本的にSys.dataNameに入力されているものをベースにして保存
            data["dataName"] = this.props.dataName;
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
