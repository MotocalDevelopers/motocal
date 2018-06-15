var React = require('react');
var createClass = require('create-react-class');
var ReactDOM = require('react-dom');
var {Base64} = require('js-base64');
var {Button, ButtonGroup, FormControl, InputGroup, FormGroup} = require('react-bootstrap');
var intl = require('./translate.js')

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
var Root = createClass({
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
    return (
        <div className="root" style={{width: "50%"}}>
            <h1>元元カレ計算機 / moto motocal</h1>
            <div>
                <p>元カレ計算機は運営移譲に伴い、以下のURLへ移動しました。</p>
                <p>長らくのご愛願ありがとうございました。 （ほしみ）</p>
            </div>
            <ul className="list-group">
                <li className="list-group-item">移転先1: <a href="https://www.n0pj.com/motocal/">n0pjさん運用サイト</a></li>
                <li className="list-group-item">移転先2: <a href="http://futatsume.com/motocal/">ありこべさん運用サイト</a></li>
                <li className="list-group-item">移転先3: <a href="https://medon-lab.com/keisanki/">ミムメモ速報さん運用サイト</a></li>
            </ul>
            <div>
                <p>Motocal was moved to the urls below.</p>
                <p>Thank you very much for using my user-unfriendly calculator. (@hsimyu) </p>
            </div>

            <hr/>
            <div>
                <p>※サーバー保存データを出力する際は、URLからアクセス後に、</p>
                <p>データ名を入力し<strong>「保存」</strong>ボタンをクリックしてから、</p>
                <p><strong>データ出力</strong>ボタンをクリックしてください。</p>
                <p>※When you need to <strong>export</strong> your data saved on this server:</p>
                <p>Access the data URL, input <strong>dataname</strong>, click <strong>save</strong>button,</p>
                <p>then click <strong>export</strong> button.</p>
            </div>
            <hr/>

            <Sys data={this.state} onLoadNewData={this.handleChangeData} locale={locale} />
        </div>
    );
  }
});

var Sys = createClass({
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
                データ名 / DataName: <FormControl size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} />
                {intl.translate("ブラウザデータリスト", locale)}
                <FormControl componentClass="select" size={15} value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </FormControl>
                <ButtonGroup className="systemButtonGroup">
                    <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitSave} >ブラウザに保存 / Save</Button>
                </ButtonGroup>
                <FormGroup>
                    {intl.translate("データ移行", locale)}
                    <FormControl componentClass="textarea" size={20} bsSize="large" value={this.state.rawData} onChange={this.handleEvent.bind(this, "rawData")} />
                    <ButtonGroup>
                    <Button tye="submit" bsStyle="primary" onClick={this.onSubmitSaveRawData}>データ出力 / Export</Button>

                    {/* rawdataが発行されている場合にJSONダウンロードボタンを表示 */}
                    { this.state.rawData != '' ?
                        <Button bsStyle="primary" className="systemButton" onClick={this.onSubmitDownload} >ダウンロード / Download</Button>
                        :
                        null
                    }
                    </ButtonGroup>
                </FormGroup>
            </div>
        );
    }
});

ReactDOM.render(<Root />, document.getElementById('app'));
