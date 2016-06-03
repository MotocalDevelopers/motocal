            // global arrays
            var zenith = {"無し": 0, "★1": 0.01, "★2": 0.03, "★3": 0.05, "★4": 0.06, "★5": 0.08, "★6": 0.10}
            var types = {"無し": 1.0, "有利": 1.5, "不利": 0.75}
            var keyTypes = {"総合攻撃力": "totalAttack", "HP": "totalHP", "戦力": "ATKandHP"}

            // skill data
            var skilltypes = {
                "non": {name: "無し", type:"non", amount: "non"},
                "normalS": {name:"通常攻刃(小)", type:"normal", amount: "S"},
                "normalM": {name:"通常攻刃(中)", type:"normal", amount: "M"},
                "normalL": {name:"通常攻刃(大)", type:"normal", amount: "L"},
                "normalLL": {name:"通常攻刃II", type:"normal", amount: "LL"},
                "normalBoukunL": {name:"通常暴君", type:"normalBoukun", amount: "LL"},
                "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
                "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
                "normalNiteS": {name:"通常二手(小)", type:"normalNite", amount: "S"},
                "normalNiteM": {name:"通常二手(中)", type:"normalNite", amount: "M"},
                "normalNiteL": {name:"通常二手(大)", type:"normalNite", amount: "L"},
                "normalKatsumiM": {name:"通常克己(中)", type:"normalKatsumi", amount: "M"},
                "normalKamui": {name:"神威", type:"normalKamui", amount: "S"},
                "magnaM": {name: "マグナ攻刃", type:"magna", amount:"M"},
                "magnaL": {name: "マグナ攻刃II", type:"magna", amount:"L"},
                "magnaHaisuiS": {name:"マグナ背水(小)", type:"magnaHaisui", amount: "S"},
                "magnaHaisuiL": {name:"マグナ背水(大)", type:"magnaHaisui", amount: "L"},
                "magnaKatsumiM": {name:"マグナ克己(中)", type:"magnaKatsumi", amount: "M"},
                "magnaKamui": {name:"マグナ神威", type:"magnaKamui", amount: "S"},
                "magnaBoukun": {name:"マグナ暴君", type:"magnaBoukun", amount: "L"},
                "bahaAT": {name:"バハ攻", type:"bahaAT", amount: "L"},
                "bahaATHP": {name:"バハ攻HP", type:"bahaATHP", amount: "M"},
                "bahaHP": {name:"バハHP", type:"bahaHP", amount: "L"},
                "unknownM": {name:"アンノウンI", type:"unknown", amount: "M"},
                "unknownL": {name:"アンノウンII", type:"unknown", amount: "L"},
                "strengthL": {name:"ストレングス等(大)", type:"unknownOther", amount: "L"},
                "normalHPS": {name:"通常守護(小)", type:"normalHP", amount: "S"},
                "normalHPM": {name:"通常守護(中)", type:"normalHP", amount: "M"},
                "normalHPL": {name:"通常守護(大)", type:"normalHP", amount: "L"},
                "magnaHPS": {name:"マグナ守護(小)", type:"magnaHP", amount: "S"},
                "magnaHPM": {name:"マグナ守護(中)", type:"magnaHP", amount: "M"},
                "magnaHPL": {name:"マグナ守護(大)", type:"magnaHP", amount: "L"},
                "unknownHPS": {name:"アンノウンVIT(小)", type:"unknownHP", amount: "S"},
                "unknownHPM": {name:"アンノウンVIT(中)", type:"unknownHP", amount: "M"},
                "unknownHPL": {name:"アンノウンVIT(大)", type:"unknownHP", amount: "L"},
                "unknownOtherBoukunL": {name:"ミフネ流・極意", type:"unknownOtherBoukun", amount: "L"},
                "unknownOtherNiteS": {name:"ミフネ流・双星", type:"unknownOtherNite", amount: "S"},
                "cosmosAT": {name:"コスモスAT", type:"cosmos", amount: "L"},
                "cosmosDF": {name:"コスモスDF", type:"cosmos", amount: "L"},
                "cosmosBL": {name:"コスモスBL", type:"cosmos", amount: "L"},
            };

            var armtypes = [
                {name:"短剣", type:"dagger"},
                {name:"剣", type:"sword"},
                {name:"槍", type:"spear"},
                {name:"斧", type:"axe"},
                {name:"杖", type:"wand"},
                {name:"銃", type:"gun"},,
                {name:"格闘", type:"fist"},
                {name:"弓", type:"bow"},
                {name:"楽器", type:"music"},
                {name:"刀", type:"katana"},
            ];

            var summonTypes = {
                "magna": "マグナ",
                "element": "属性",
                "zeus": "ゼウス系",
                "chara": "キャラ",
                "ranko": "蘭子",
            }

            var skillAmounts = {
                // normal と unknown の M Slv11 以降については仮入力
                "normal":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "magna":{
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "unknown":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "unknownOther":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "LL": [7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 16.8, 17.6, 18.4, 19.2, 20.0],
                },
                "normalKamui": {
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                },
                "magnaKamui": {
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.4, 10.8, 11.2, 11.6, 12.0],
                },
                "bahaHP": {
                    // 剣など
                    "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                    "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                },
                "bahaAT": {
                    // 短剣など
                    "M": [10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 15.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                    "L": [20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 30.0, 30.4, 30.8, 31.2, 31.6, 32.0],
                },
                "normalHP":{
                    "S": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "M": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.4, 15.8, 16.2, 16.6, 17.0],
                    "L": [9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 18.6, 19.2, 19.8, 20.4, 21.0],
                },
                "magnaHP":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
                    "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "unknownHP":{
                    "S": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0],
                    "M": [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0],
                    "L": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.0, 15.0, 15.0, 15.0, 15.0],
                    "LL": [6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 15.6, 16.2, 16.8, 17.4, 18.0],
                },
                "normalNite":{
                    "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
                    "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
                    "L": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                    "LL": [1.0, 1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0, 5.4, 5.8, 6.2, 7.0],
                },
                "normalKatsumi":{
                    "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
                },
                "magnaKatsumi":{
                    "M": [0.7, 1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.3, 4.6, 4.9],
                },
                "unknownOtherNite":{
                    "S": [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2],
                },
            }

            // query 取得用の関数
            var query = getDataInQuery();
            function getDataInQuery(){
                var vars = {}, max = 0, hash = "", array = "";
                var url = window.location.search;

                hash  = url.slice(1).split('&');
                max = hash.length;
                for (var i = 0; i < max; i++) {
                    array = hash[i].split('=');
                    vars[array[0]] = array[1];
                }

                var result = ""
                if("data" in vars){
                    result = vars["data"];
                }

                return result;
            }

            // for mapping options
            var selectTemplate = function(opt) { return <option value={opt} key={opt}>{opt}</option>; }

            // global hash for loading new data
            var newData = {}
            var cosmosChecked = false;

            // Root class contains [Profile, ArmList, Results].
            var Root = React.createClass({
              getInitialState: function() {
                  return {
                    armNum: 3,
                    summonNum: 1,
                    profile: [],
                    armlist: [],
                    summon: [],
                    dataName: '',
                  };
              },
              componentDidMount: function(){
                  if(query != ''){
                      var initState = JSON.parse(Base64.decode(query));
                      initState["dataName"] = "urlData"
                      newData["urlData"] = initState
                      this.setState(initState);
                  }
              },
              handleArmNumChange: function(newArmNum) {
                  this.setState({armNum: newArmNum});
                  var newProf = this.state.profile;
                  newProf["armNum"] = newArmNum
                  this.setState({profile: newProf});
              },
              handleSummonNumChange: function(newSummonNum) {
                  this.setState({summonNum: newSummonNum});
                  var newProf = this.state.profile;
                  newProf["summonNum"] = newSummonNum
                  this.setState({profile: newProf});
              },
              onChangeArmData: function(state) {
                  this.setState({armlist: state});
              },
              onChangeProfileData: function(state) {
                  this.setState({profile: state});
              },
              onChangeSummonData: function(state) {
                  this.setState({summon: state});
              },
              handleChangeData: function(newDataName) {
                  this.setState({armNum: newData[newDataName].armNum});
                  this.setState({summonNum: newData[newDataName].summonNum});
                  this.setState({dataName: newDataName});
              },
              render: function() {
                return (
                    <div className="root">
                        <div className="rootLeft">
                            <div className="top">
                                <Profile dataName={this.state.dataName} onArmNumChange={this.handleArmNumChange} onChange={this.onChangeProfileData} onSummonNumChange={this.handleSummonNumChange} />
                                <SummonList dataName={this.state.dataName} summonNum={this.state.summonNum} onChange={this.onChangeSummonData} />
                            </div>
                            <hr />
                            <div className="bottom">
                                <ArmList dataName={this.state.dataName} armNum={this.state.armNum} onChange={this.onChangeArmData} />
                                <hr />
                                <ResultList data={this.state} />
                                <Notice />
                            </div>
                        </div>
                        <div className="rootRight">
                            <Sys data={this.state} onLoadNewData={this.handleChangeData} />
                            <TwitterShareButton data={this.state} />
                        </div>
                    </div>
                );
              }
            });

            var SummonList = React.createClass({
                getInitialState: function() {
                    return {
                        smlist: [],
                    };
                },
                componentWillReceiveProps: function(nextProps) {
                    if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
                        var newsmlist = this.state.smlist;
                        while(newsmlist.length > nextProps.summonNum) {
                            newsmlist.pop();
                        }
                        this.setState({smlist: newsmlist})
                    }
                },
                handleOnChange: function(key, state){
                    var newsmlist = this.state.smlist;
                    newsmlist[key] = state;
                    this.setState({smlist: newsmlist})
                    this.props.onChange(newsmlist);
                },
                render: function() {
                    var summons = [];
                    for(var i=0; i < this.props.summonNum; i++) {
                        summons.push({id: i});
                    }
                    var hChange = this.handleOnChange;
                    var dataName = this.props.dataName;
                    return (
                        <div className="summonList">
                            <h3> 召喚石 </h3>
                            <table>
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>自分の石</th>
                                <th>加護量</th>
                                <th>フレ石</th>
                                <th>フレ加護量</th>
                                <th>合計攻撃力</th>
                                <th>合計HP</th>
                                <th>HPUP(%)</th>
                                <th>DA率</th>
                                <th>TA率</th>
                            </tr>
                            </thead>
                            <tbody>
                                {summons.map(function(sm) {
                                    return <Summon key={sm.id} onChange={hChange} id={sm.id} dataName={dataName} />;
                                })}
                            </tbody>
                            </table>
                        </div>
                    );
                }
            });

            var Summon = React.createClass({
                getInitialState: function() {
                    return {
                        selfSummonType: "magna",
                        selfSummonAmount: 0,
                        friendSummonType: "magna",
                        friendSummonAmount: 0,
                        attack: 0,
                        hp: 0,
                        hpBonus: 0,
                        DA: 0,
                        TA: 0,
                    };
                },
                componentDidMount: function(){
                   var state = this.state;

                   // もし newData に自分に該当するキーがあるなら読み込む
                   // (データロード時に新しく増えたコンポーネント用)
                   if( this.props.dataName in newData ) {
                       var summon = newData[this.props.dataName].summon
                       if( this.props.id in summon ){
                           state = summon[this.props.id]
                           this.setState(state)
                       }
                   }
                   // 初期化後 state を 上の階層に渡しておく
                   // summonList では onChange が勝手に上に渡してくれるので必要なし
                   this.props.onChange(this.props.id, state);
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData[nextProps.dataName].summon[this.props.id]
                        this.setState(newState);
                        this.props.onChange(this.props.id, newState)
                    }
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    newState[key] = e.target.value
                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                render: function() {
                    var smtypes = Object.keys(summonTypes).map(function(opt){return <option value={opt} key={opt}>{summonTypes[opt]}</option>;});

                    return (
                        <tr>
                            <form className="summonForm">
                                <td>{this.props.id + 1}</td>
                                <td><select value={this.state.selfSummonType} onChange={this.handleEvent.bind(this, "selfSummonType")} >{smtypes}</select></td>
                                <td><input type="number" min="0" max="120" value={this.state.selfSummonAmount} onChange={this.handleEvent.bind(this, "selfSummonAmount")} /></td>
                                <td><select value={this.state.friendSummonType} onChange={this.handleEvent.bind(this, "friendSummonType")} >{smtypes}</select></td>
                                <td><input type="number" min="0" max="120" value={this.state.friendSummonAmount} onChange={this.handleEvent.bind(this, "friendSummonAmount")} /></td>
                                <td><input type="number" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")}/></td>
                                <td><input type="number" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                                <td><input type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                                <td><input type="number" min="0" value={this.state.DA} onChange={this.handleEvent.bind(this, "DA")}/></td>
                                <td><input type="number" min="0" value={this.state.TA} onChange={this.handleEvent.bind(this, "TA")}/></td>
                            </form>
                        </tr>
                    );

                }
            });

            var ResultList = React.createClass({
                getInitialState: function() {
                    return {
                        switchTotalAttack: 1,
                        switchATKandHP: 1,
                        switchHP: 1,
                        switchDATA: 1,
                    };
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    newState[key] = (newState[key] == 0) ? 1 : 0
                    this.setState(newState)
                },
                calculateBasedOneSummon: function(summon, prof, arml, buff, sortkey) {
                    var totalSummon = {magna: 0, element: 0, zeus: 0, chara: 0, ranko: 0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0, ta: 0};

                    // 自分の加護
                    totalSummon[summon.selfSummonType] += 0.01 * parseInt(summon.selfSummonAmount)
                    // フレンドの加護
                    totalSummon[summon.friendSummonType] += 0.01 * parseInt(summon.friendSummonAmount)

                    // 後から追加したので NaN でないか判定しておく
                    if(!isNaN(summon.attack)) totalSummon["attack"] = parseInt(summon.attack)
                    if(!isNaN(summon.hp)) totalSummon["hp"] = parseInt(summon.hp)
                    if(!isNaN(summon.hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon.hpBonus)
                    if(!isNaN(summon.DA)) totalSummon["da"] = 0.01 * parseInt(summon.DA)
                    if(!isNaN(summon.TA)) totalSummon["ta"] = 0.01 * parseInt(summon.TA)

                    // 全武器に対して [最小考慮数, ... , 最大考慮数] の配列を計算しておく
                    var armNumArray = []
                    var totalItr = 1;
                    for(var i = 0; i < arml.length; i++){
                        var temp = []
                        var itr = arml[i].considerNumberMax - arml[i].considerNumberMin + 1
                        for(var j = 0; j < itr; j++){
                            temp[j] = j + arml[i].considerNumberMin;
                        }
                        totalItr *= itr;
                        armNumArray[i] = temp;
                    }

                    // index を manage する関数
                    var proceedIndex = function(index, ana, i){
                        if(i == ana.length){
                            return index;
                        } else {
                            index[i]++;
                            if(index[i] > ana[i].length - 1){
                                index[i] = 0;
                                index = proceedIndex(index, ana, i + 1);
                            }
                            return index
                        }
                    }

                    var combinations = []
                    var index = []
                    for(var i = 0; i < armNumArray.length; i++){
                        index[i] = 0;
                    }

                    for(var i = 0; i < totalItr; i++){
                        var temp = []
                        var num = 0;
                        for(var j = 0; j < armNumArray.length; j++){
                            temp.push(armNumArray[j][index[j]]);
                            num += parseInt(armNumArray[j][index[j]])
                        }
                        if(num <= 10) combinations.push(temp)
                        index = proceedIndex(index, armNumArray, 0)
                    }

                    var result = []
                    for(var i = 0; i < combinations.length; i++){
                        var oneres = this.calculateOneCombination(combinations[i], totalSummon, prof, arml, buff)
                        result.push({rank: i, data: oneres, armNumbers: combinations[i]});
                    }

                    if(sortkey == "ATKandHP") {
                        result.sort(function(a, b){
                            if((a.data.displayAttack + a.data.displayHP) < (b.data.displayAttack + b.data.displayHP)) return  1;
                            if((a.data.displayAttack + a.data.displayHP) > (b.data.displayAttack + b.data.displayHP)) return -1;
                            return 0;
                        });
                    } else {
                        result.sort(function(a, b){
                            if(a["data"][sortkey] < b["data"][sortkey]) return  1;
                            if(a["data"][sortkey] > b["data"][sortkey]) return -1;
                            return 0;
                        });
                    }

                    while(result.length > 10){ result.pop(); }

                    for(var i = 0; i < result.length; i++){
                        result[i]["rank"] = i + 1
                    }

                    return result;
                },
                calculateOneCombination: function(comb, totalSummon, prof, arml, buff){
                    var tempArmList = []
                    for(var i = 0; i < arml.length; i++){
                        for(var j = 0; j < comb[i]; j++){
                            tempArmList.push(arml[i]);
                        }
                    }

                    var totalSkills = {magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, unknown: 0, unknownOther: 0, normalKamui: 0, magnaKamui: 0, bahaAT: 0, bahaHP: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0, normalNite: 0, normalKatsumi: 0, magnaKatsumi: 0, unknownOtherNite: 0, cosmosBL: 0};
                    var armAttack = 0;
                    var armHP = 0;

                    // cosmos武器があるかどうかを確認しておく
                    var cosmosType = '';
                    for(var i = 0; i < tempArmList.length; i++){
                        var arm = tempArmList[i];
                        if(arm.isCosmos) {
                            cosmosType = arm.armType
                        }
                    }

                    var HPdebuff = 0.00

                    for(var i = 0; i < tempArmList.length; i++){
                        var arm = tempArmList[i];
                        var armSup= 1.0
                        var hpSup = 1.0

                        if (arm.armType == cosmosType){
                            armSup += 0.3
                            hpSup += 0.3
                        }
                        if(arm.armType == prof.favArm1 && arm.armType == prof.favArm2){
                            armSup += (0.2 + buff["zenith1"] + buff["zenith2"])
                            hpSup += 0.2
                        } else if(arm.armType == prof.favArm1){
                            armSup += (0.2 + buff["zenith1"])
                            hpSup += 0.2
                        } else if(arm.armType == prof.favArm2){
                            armSup += (0.2 + buff["zenith2"])
                            hpSup += 0.2
                        }

                        armAttack += armSup * parseInt(arm.attack)
                        armHP += hpSup * parseInt(arm.hp)

                        for(var j = 1; j <= 2; j++){
                            var skillname = '';
                            if(j == 1) { skillname = arm.skill1 } else { skillname = arm.skill2 }

                            if(skillname != 'non'){
                                var stype = skilltypes[skillname].type;
                                var amount = skilltypes[skillname].amount;
                                var slv = parseInt(arm.slv)

                                // mask invalid slv
                                if(slv == 0) slv = 1

                                // 背水倍率の実装は日比野さんのところのを参照
                                if(stype == 'normalHaisui' || stype == 'magnaHaisui'){
                                    var remainHP = 0.01 * parseInt(prof.hp)
                                    var baseRate = 0.0
                                    if(amount == "S") {
                                        // 小
                                        if(slv < 10) {
                                            baseRate = -0.3 + slv * 1.8;
                                        } else {
                                            baseRate = 18 + 3.0 * ((slv - 10) / 5.0)
                                        }
                                    } else {
                                        // 大
                                        if(slv < 10) {
                                            baseRate = -0.5 + slv * 3.0;
                                        } else {
                                            baseRate = 30 + 3.0 * ((slv - 10) / 5.0)
                                        }
                                    }
                                    var haisuiBuff =  (baseRate/3.0) * ( 2.0 * remainHP * remainHP - 5.0 * remainHP + 3.0 )
                                    totalSkills[stype] += haisuiBuff
                                } else if(stype == 'bahaATHP') {
                                    // バハ剣など
                                    totalSkills["bahaAT"] += skillAmounts["bahaAT"][amount][slv - 1];
                                    totalSkills["bahaHP"] += skillAmounts["bahaHP"][amount][slv - 1];
                                } else if(stype == 'normalBoukun') {
                                    HPdebuff += 0.10
                                    totalSkills["normal"] += skillAmounts["normal"][amount][slv - 1];
                                } else if(stype == 'magnaBoukun') {
                                    HPdebuff += 0.10
                                    totalSkills["magna"] += skillAmounts["magna"][amount][slv - 1];
                                } else if(stype == 'unknownOtherBoukun'){
                                    HPdebuff += 0.07
                                    totalSkills["unknown"] += skillAmounts["unknown"][amount][slv - 1];
                                } else if(stype == 'cosmos') {
                                    // コスモス武器
                                    if(skillname == 'cosmosAT') {
                                        totalSkills["normal"] += 0.20;
                                        HPdebuff += 0.40
                                    } else if(skillname == 'cosmosDF') {
                                        HPdebuff -= 0.10
                                    } else if(skillname == 'cosmosBL') {
                                        totalSkills["cosmosBL"] = 0.20
                                    }
                                } else {
                                    totalSkills[stype] += skillAmounts[stype][amount][slv - 1];
                                }
                            }
                        }
                    }

                    // バハ武器重複上限
                    if(totalSkills["bahaAT"] > 50) totalSkills["bahaAT"] = 50
                    if(totalSkills["bahaHP"] > 50) totalSkills["bahaHP"] = 50

                    var rank = prof.rank;
                    var baseAttack = (rank > 100) ? 5000 + (parseInt(rank) - 100) * 20 : 1000 + (parseInt(rank)) * 40
                    var baseHP = (rank > 100) ? 1400 + (parseInt(rank) - 100) * 4.0 : 600 + (parseInt(rank)) * 8
                    var weakPoint = types[prof.typeBonus];

                    // for attack
                    var magnaCoeff = 1.0 + 0.01 * (totalSkills["magna"] + totalSkills["magnaKamui"]) * ( 1.0 + totalSummon["magna"] )
                    var magnaHaisuiCoeff = 1.0 + 0.01 * (totalSkills["magnaHaisui"]) * ( 1.0 + totalSummon["magna"] )
                    var unknownCoeff = 1.0 + 0.01 * totalSkills["unknown"] * (1.0 + totalSummon["ranko"]) + 0.01 * totalSkills["unknownOther"]

                    var normalCoeff = 1.0 + 0.01 * (totalSkills["normal"] + totalSkills["normalKamui"]) * (1.0 + totalSummon["zeus"]) + 0.01 * totalSkills["bahaAT"] + totalSummon["chara"] + buff["normal"]
                    var normalHaisuiCoeff = 1.0 + 0.01 * (totalSkills["normalHaisui"]) * (1.0 + totalSummon["zeus"])
                    var elementCoeff = weakPoint + totalSummon["element"] + buff["element"]
                    var otherCoeff = 1.0 + buff["other"]

                    var summedAttack = (baseAttack + armAttack + totalSummon["attack"] + parseInt(prof.attackBonus) ) * (1.0 + buff["master"])
                    var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff

                    // for HP
                    var displayHP = (baseHP + totalSummon["hp"] + armHP + buff["hpBonus"]) * (1.0 + buff["masterHP"])
                    var totalHP = displayHP * (1.0 - HPdebuff + buff["hp"] + totalSummon["hpBonus"] + 0.01 * totalSkills["bahaHP"] + 0.01 * totalSkills["magnaHP"] * (1.0 + totalSummon["magna"]) + 0.01 * totalSkills["normalHP"] * (1.0 + totalSummon["zeus"]) + 0.01 * totalSkills["unknownHP"] * (1.0 + totalSummon["ranko"]))

                    // for DA and TA
                    var totalDA = 100.0 * (buff["da"] + totalSummon["da"] + 0.01 * (totalSkills["normalNite"] + totalSkills["normalKatsumi"]) * (1.0 + totalSummon["zeus"]) + 0.01 * totalSkills["magnaKatsumi"] * (1.0 + totalSummon["magna"]) + 0.01 * totalSkills["unknownOtherNite"] + totalSkills["cosmosBL"])
                    var totalTA = 100.0 * (buff["ta"] + totalSummon["ta"])

                    return {totalAttack: Math.ceil(totalAttack), displayAttack: Math.ceil(summedAttack), totalHP: Math.ceil(totalHP), displayHP: Math.ceil(displayHP), totalDA: totalDA, totalTA: totalTA};
                },
                calculateResult: function() {
                  var prof = this.props.data.profile; var arml = this.props.data.armlist;
                  var summon = this.props.data.summon;

                  if (prof != undefined && arml != undefined && summon != undefined) {
                      var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hpBonus: 0.0, hp: 0.0, da: 0.0, ta: 0.0};

                      // 後から追加したパラメータはNaNなことがあるので追加処理
                      if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
                      if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
                      if(!isNaN(prof.hpBonus)) totalBuff["hpBonus"] += parseInt(prof.hpBonus);
                      if(!isNaN(prof.hpBuff)) totalBuff["hp"] += 0.01 * parseInt(prof.hpBuff);
                      if(!isNaN(prof.daBuff)) totalBuff["da"] += 0.01 * parseInt(prof.daBuff);
                      if(!isNaN(prof.taBuff)) totalBuff["ta"] += 0.01 * parseInt(prof.taBuff);
                      totalBuff["normal"] += 0.01 * parseInt(prof.normalBuff);
                      totalBuff["element"] += 0.01 * parseInt(prof.elementBuff);
                      totalBuff["other"] += 0.01 * parseInt(prof.otherBuff);
                      totalBuff["zenith1"] += zenith[prof.zenithBonus1];
                      totalBuff["zenith2"] += zenith[prof.zenithBonus2];

                      // sortKey がNaNでないならそちらを使う、NaNなら総合攻撃力で
                      var sortkey = "totalAttack"
                      var sortkeyname = "総合攻撃力"
                      if(prof.sortKey == prof.sortKey) {
                          sortkey = keyTypes[prof.sortKey]
                          sortkeyname = prof.sortKey
                      }

                      var result = [];
                      for(var i = 0; i < summon.length; i++){
                          result.push({summonNo: i, summon: summon[i], sortkeyname: sortkeyname, result: this.calculateBasedOneSummon(summon[i], prof, arml, totalBuff, sortkey)});
                      }
                      return result
                  } else {
                      return [{summonNo: 1, result: []}]
                  }

                },
                render: function() {
                    res = this.calculateResult();
                    switcher = this.state;
                    var armnames = []
                    for(var i = 0; i < this.props.data.armlist.length; i++){
                        armnames[i] = this.props.data.armlist[i].name;

                        if(armnames[i] == '') {
                            armnames[i] = "武器" + (i + 1).toString()
                        }
                    }

                    var tableheader = []
                    if(switcher.switchTotalAttack) {
                        tableheader.push('総合攻撃力')
                    }
                    if(switcher.switchATKandHP) {
                        tableheader.push('戦力')
                    }
                    if(switcher.switchHP) {
                        tableheader.push('HP')
                    }
                    if(switcher.switchDATA) {
                        tableheader.push('連続攻撃率(%)')
                    }

                    return (
                        <div className="resultList">
                            表示項目: 
                            <input type="checkbox" checked={this.state.switchTotalAttack} onChange={this.handleEvent.bind(this, "switchTotalAttack")} /> 総合攻撃力
                            <input type="checkbox" checked={this.state.switchATKandHP} onChange={this.handleEvent.bind(this, "switchATKandHP")} /> 戦力
                            <input type="checkbox" checked={this.state.switchHP} onChange={this.handleEvent.bind(this, "switchHP")} /> HP
                            <input type="checkbox" checked={this.state.switchDATA} onChange={this.handleEvent.bind(this, "switchDATA")} /> 連続攻撃率

                            {res.map(function(r) {
                                return(
                                    <div className="result">
                                        <h2> 結果({r.sortkeyname}): No. {r.summonNo + 1} ({summonTypes[r.summon.selfSummonType]}{r.summon.selfSummonAmount} + {summonTypes[r.summon.friendSummonType]}{r.summon.friendSummonAmount}) </h2>
                                        <table>
                                        <thead>
                                        <tr>
                                            <th>順位</th>
                                            {tableheader.map(function(m){ return <th>{m}</th>; })}
                                            {armnames.map(function(m){ return <th>{m}</th>; })}
                                        </tr>
                                        </thead>
                                        <Result key={r.summonNo} data={r.result} switcher={switcher}/>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            });

            var Result = React.createClass({
                render: function() {
                    var sw = this.props.switcher;
                    return (
                        <tbody className="result">
                            {this.props.data.map(function(m) {
                                var tablebody = []
                                if(sw.switchTotalAttack) {
                                    tablebody.push(m.data.totalAttack)
                                }
                                if(sw.switchATKandHP) {
                                    var senryoku = parseInt(m.data.displayAttack) + parseInt(m.data.displayHP)
                                    tablebody.push(senryoku + ' (' + parseInt(m.data.displayAttack) + ' + ' + parseInt(m.data.displayHP) + ')')
                                }
                                if(sw.switchHP) {
                                    tablebody.push(m.data.totalHP)
                                }
                                if(sw.switchDATA) {
                                    tablebody.push('DA:' + m.data.totalDA.toFixed(1) + '%, TA: ' + m.data.totalTA.toFixed(1) + '%')
                                }
                                return (
                                    <tr key={m.rank}>
                                        <td>{m.rank}</td>
                                        {tablebody.map(function(am){
                                            return (<td>{am}</td>);
                                        })}
                                        {m.armNumbers.map(function(am){
                                            return (<td>{am} 本</td>);
                                        })}
                                    </tr>
                                );
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
                    return {
                        alist: al,
                    };
                },
                componentWillReceiveProps: function(nextProps) {
                    if (parseInt(nextProps.armNum) < parseInt(this.props.armNum)) {
                        var newalist = this.state.alist;
                        while(newalist.length > nextProps.armNum) {
                            newalist.pop();
                        }
                        this.setState({alist: newalist})
                    }
                },
                handleOnChange: function(key, state){
                    var newalist = this.state.alist;
                    newalist[key] = state;
                    this.setState({alist: newalist})
                    this.props.onChange(newalist);
                },
                render: function(){
                    var dataName = this.props.dataName;
                    var arms = [];
                    for(var i=0; i < this.props.armNum; i++) { arms.push({id: i}); }
                    var hChange = this.handleOnChange;
                    return (
                        <div className="armList">
                            <h2> 武器リスト </h2>
                            <table>
                            <thead>
                            <tr>
                                <th>武器名</th>
                                <th>攻撃力</th>
                                <th>HP</th>
                                <th className="tiny">武器種</th>
                                <th className="tiny">コスモス？</th>
                                <th>スキル1</th>
                                <th>スキル2</th>
                                <th className="tiny">SLv</th>
                                <th className="consider">考慮本数</th>
                            </tr>
                            </thead>
                            <tbody>
                            {arms.map(function(arm) {
                                return <Arm key={arm.id} onChange={hChange} id={arm.id} dataName={dataName} />;
                            })}
                            </tbody>
                            </table>
                        </div>
                    );
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
                            isCosmos: 0,
                            skill1: 'non',
                            skill2: 'non',
                            slv: 1,
                            considerNumberMin: 0,
                            considerNumberMax: 0,
                    };
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData[nextProps.dataName].armlist[this.props.id]
                        this.setState(newState);
                        this.props.onChange(this.props.id, newState);
                    }
                },
                componentDidMount: function(){
                   var state = this.state;

                   // もし newData に自分に該当するキーがあるなら読み込む
                   // (データロード時に新しく増えたコンポーネント用)
                   if( this.props.dataName in newData ) {
                       var armlist = newData[this.props.dataName].armlist
                       if( this.props.id in armlist ){
                           state = armlist[this.props.id]
                           this.setState(state)
                       }
                   }
                   // 初期化後 state を 上の階層に渡しておく
                   // armList では onChange が勝手に上に渡してくれるので必要なし
                   this.props.onChange(this.props.id, state);
                },
                handleEvent: function(key, e) {
                    var newState = this.state
                    if(key == "isCosmos") {
                        // if already checked
                        if( newState[key] == 1 ) {
                            newState[key] = 0
                            cosmosChecked = false;

                            // コスモススキルが設定されていたら外す
                            if( newState["skill1"].search(/cosmos/) >= 0){
                                newState["skill1"] = "non"
                            }
                            if( newState["skill2"].search(/cosmos/) >= 0){
                                newState["skill2"] = "non"
                            }
                        // or else
                        } else {
                            if(!cosmosChecked) {
                                cosmosChecked = true;
                                newState[key] = (newState[key] == 0) ? 1 : 0
                            }
                        }

                    } else if(key == "considerNumberMin"){
                        if (parseInt(e.target.value) <= parseInt(this.state.considerNumberMax)) newState[key] = parseInt(e.target.value)
                    } else if(key == "considerNumberMax") {
                        if (parseInt(e.target.value) >= parseInt(this.state.considerNumberMin)) newState[key] = parseInt(e.target.value)
                    } else if( (key == "skill1" || key == "skill2") && (e.target.value.search(/cosmos/) >= 0)){
                        if( newState["isCosmos"] == 1) {
                            if( (key == "skill1" && newState["skill2"].search(/cosmos/) < 0) || (key == "skill2" && newState["skill1"].search(/cosmos/) < 0)) {
                                // 既にcosmosスキルが設定されていない場合のみ設定可能
                                newState[key] = e.target.value
                            } else {
                                alert("コスモススキルは一種のみ設定可能です。")
                            }
                        } else {
                            alert("コスモススキルはコスモス武器の場合のみ指定することができます。(先にコスモス武器にチェックを入れてください。)")
                        }
                    } else { newState[key] = e.target.value }

                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                render: function(){
                    var stypes = Object.keys(skilltypes).map(function(key){ return <option value={key} key={key}>{skilltypes[key].name}</option>;})
                    var atypes = armtypes.map(function(opt){return <option value={opt.type} key={opt.name}>{opt.name}</option>;});

                    return (
                        <tr>
                            <form className="armForm">
                            <td><input type="text" placeholder="武器名" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} /></td>
                            <td><input type="number" placeholder="0以上の整数" min="0" value={this.state.attack} onChange={this.handleEvent.bind(this, "attack")} /></td>
                            <td><input type="number" placeholder="0以上の整数" min="0" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")} /></td>
                            <td><select value={this.state.armType} onChange={this.handleEvent.bind(this, "armType")} > {atypes} </select></td>
                            <td className="checkbox"><input type="checkbox" checked={this.state.isCosmos} onChange={this.handleEvent.bind(this, "isCosmos")} /></td>
                            <td><select value={this.state.skill1} onChange={this.handleEvent.bind(this, "skill1")} > {stypes}</select></td>
                            <td><select value={this.state.skill2} onChange={this.handleEvent.bind(this, "skill2")} > {stypes}</select></td>
                            <td><input type="number" min="1" max="15" step="1" value={this.state.slv} onChange={this.handleEvent.bind(this, "slv")} /></td>
                            <td>
                                <input className="consider" type="number" min="0" max="10" value={this.state.considerNumberMin} onChange={this.handleEvent.bind(this, "considerNumberMin")} /> 本～
                                <input className="consider" type="number" min="0" max="10" value={this.state.considerNumberMax} onChange={this.handleEvent.bind(this, "considerNumberMax")} /> 本
                            </td>
                            </form>
                        </tr>
                    );
                }
            });

            var Profile = React.createClass({
                getDefaultProps() {
                    var zenithBonuses = Object.keys(zenith).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
                    var typeBonus = Object.keys(types).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
                    var atypes = armtypes.map(function(opt){return <option value={opt.type} key={opt.name}>{opt.name}</option>;});
                    var ktypes = Object.keys(keyTypes).map(function(opt){ return <option value={opt} key={opt}>{opt}</option> });
                    return {
                        zenithBonuses: zenithBonuses,
                        typeBonus: typeBonus,
                        atypes: atypes,
                        keyTypes: ktypes,
                    };
                },
                componentDidMount: function(){
                   // 初期化後 state を 上の階層に渡しておく
                   this.props.onChange(this.state);
                },
                componentWillReceiveProps: function(nextProps){
                    // only fired on Data Load
                    if(nextProps.dataName != this.props.dataName) {
                        var newState = newData[nextProps.dataName].profile
                        this.setState(newState);
                        this.props.onChange(newState);
                    }
                },
                getInitialState: function() {
                    return {
                        rank: 1,
                        attackBonus: 0,
                        hpBonus: 0,
                        masterBonus: 0,
                        masterBonusHP: 0,
                        normalBuff: 0,
                        elementBuff: 0,
                        otherBuff: 0,
                        hpBuff: 0,
                        daBuff: 0,
                        taBuff: 0,
                        hp: 100,
                        zenithBonus1: "無し",
                        zenithBonus2: "無し",
                        typeBonus: "無し",
                        favArm1: "無し",
                        favArm2: "無し",
                        armNum: 3,
                        summonNum: 1,
                        sortKey: "総合攻撃力",
                    };
                },
                handleEvent: function(key, e) {
                  var newState = this.state
                  newState[key] = e.target.value
                  this.setState(newState)
                  this.props.onChange(newState)
                },
                handleSummonNumChange: function(e) {
                  this.setState({summonNum: e.target.value});
                  this.props.onSummonNumChange(e.target.value);
                },
                handleArmNumChange: function(e) {
                  if(e.target.value < 20) {
                      this.setState({armNum: e.target.value});
                      this.props.onArmNumChange(e.target.value);
                  }
                },
                render: function() {
                        return (
                            <div className="profile">
                                <h3> 基本プロフィール </h3>
                                <form className="profileForm">
                                <table>
                                <tr>
                                    <th>Rank</th>
                                    <th>攻撃力ボーナス</th>
                                    <th>HPボーナス</th>
                                    <th>マスターボーナスATK(%)</th>
                                    <th>マスターボーナスHP(%)</th>
                                    <th>HP (%)</th>
                                </tr>
                                <tr>
                                    <td><input type="number"  min="0" max="170" value={this.state.rank} onChange={this.handleEvent.bind(this, "rank")}/></td>
                                    <td><input type="number" min="0" value={this.state.attackBonus} onChange={this.handleEvent.bind(this, "attackBonus")}/></td>
                                    <td><input type="number" min="0" value={this.state.hpBonus} onChange={this.handleEvent.bind(this, "hpBonus")}/></td>
                                    <td><input type="number" min="0" max="100" value={this.state.masterBonus} onChange={this.handleEvent.bind(this, "masterBonus")}/></td>
                                    <td><input type="number" min="0" max="100" value={this.state.masterBonusHP} onChange={this.handleEvent.bind(this, "masterBonusHP")}/></td>
                                    <td> <input type="number" min="0" max="100" value={this.state.hp} onChange={this.handleEvent.bind(this, "hp")}/></td>
                                </tr>
                                <tr>
                                    <th>属性相性</th>
                                    <th>得意武器1</th>
                                    <th>得意武器2</th>
                                    <th>武器ゼニス1</th>
                                    <th>武器ゼニス2</th>
                                </tr>
                                <tr>
                                    <td><select value={this.state.typeBonus} onChange={this.handleEvent.bind(this, "typeBonus")}> {this.props.typeBonus} </select></td>
                                    <td><select value={this.state.favArm1} onChange={this.handleEvent.bind(this, "favArm1")} > {this.props.atypes} </select></td>
                                    <td><select value={this.state.favArm2} onChange={this.handleEvent.bind(this, "favArm2")} > {this.props.atypes} </select></td>
                                    <td><select value={this.state.zenithBonus1} onChange={this.handleEvent.bind(this, "zenithBonus1")} > {this.props.zenithBonuses} </select></td>
                                    <td><select value={this.state.zenithBonus2} onChange={this.handleEvent.bind(this, "zenithBonus2")} > {this.props.zenithBonuses} </select></td>
                                </tr>
                                </table>
                                <h3>バフ(%表記)</h3>
                                <table>
                                    <tr>
                                        <th>通常バフ</th>
                                        <th>属性バフ</th>
                                        <th>その他バフ</th>
                                        <th>HPバフ</th>
                                        <th>DAバフ</th>
                                        <th>TAバフ</th>
                                    </tr>
                                    <tr>
                                        <td><input type="number"  min="0" value={this.state.normalBuff} onChange={this.handleEvent.bind(this, "normalBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.elementBuff} onChange={this.handleEvent.bind(this, "elementBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.otherBuff} onChange={this.handleEvent.bind(this, "otherBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.hpBuff} onChange={this.handleEvent.bind(this, "hpBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.daBuff} onChange={this.handleEvent.bind(this, "daBuff")}/></td>
                                        <td><input type="number"  min="0" value={this.state.taBuff} onChange={this.handleEvent.bind(this, "taBuff")}/></td>
                                    </tr>
                                </table>
                                <h3>システム関連</h3>
                                <table>
                                    <tr>
                                        <th>武器種類数</th>
                                        <th>召喚石の組数</th>
                                        <th>優先する項目</th>
                                    </tr>
                                    <tr>
                                        <td><input type="number" min="1" max="20" step="1" value={this.state.armNum} onChange={this.handleArmNumChange}/></td>
                                        <td><input type="number" min="1" max="4" step="1" value={this.state.summonNum} onChange={this.handleSummonNumChange}/></td>
                                        <td><select value={this.state.sortKey} onChange={this.handleEvent.bind(this, "sortKey")} > {this.props.keyTypes} </select></td>
                                    </tr>
                                </table>
                                </form>
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
                        newData = storedData;
                        this.setState({storedData: storedData})
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
                      newState.selectedData = Object.keys(newData)[0]

                      localStorage.setItem("data", Base64.encode(JSON.stringify(newState.storedData)));
                      this.setState(newState);
                  } else {
                      alert("削除するデータを選択して下さい。")
                  }
                },
                onSubmitLoad: function(e){
                  e.preventDefault();
                  if(this.state.selectedData != ''){
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
                      // expensive deep copy..
                      newState["storedData"][this.state.dataName] = JSON.parse(JSON.stringify(this.props.data));
                      newState["selectedData"] = this.state.dataName;

                      // save data
                      var saveString = Base64.encode(JSON.stringify(newState.storedData));
                      localStorage.setItem("data", saveString);

                      newData = newState.storedData;
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
                        <div className="system">
                            <h2> System </h2>
                            <form className="sysForm">
                                <select size="12" value={this.state.selectedData} onClick={this.handleOnClick.bind(this, "selectedData")} onChange={this.handleEvent.bind(this, "selectedData")} > {datalist} </select>
                                データ名: <input size="10" type="text" value={this.state.dataName} onChange={this.handleEvent.bind(this, "dataName")} /><br />
                                <button type="button" onClick={this.onSubmitSave} >保存</button>
                                <button type="button" onClick={this.onSubmitLoad} >読込</button>
                                <button type="button" onClick={this.onSubmitRemove} >削除</button>
                            </form>
                        </div>
                    );
                }
            });

            // Twitter Button
            var TwitterShareButton = React.createClass ({
                componentWillReceiveProps: function(nextProps){
                    var url = "http://hsimyu.net/motocal?data=" + Base64.encode(JSON.stringify(this.props.data))
                    this.setState({url: url});
                },
                getInitialState: function() {
                    var url = "http://hsimyu.net/motocal?data=" + Base64.encode(JSON.stringify(this.props.data))
                    return {
                        url: url,
                    };
                },
                render: function() {
                  var tweeturl = "http://twitter.com/share?url=" + this.state.url
                  return (
                        <div className="tweet">
                            <h3>保存用URL</h3>
                            {this.state.url}
                        </div>
                   );
                   //<a href={tweeturl} target="_blank"><button type="button" className="tweetButton">Tweet</button></a>
                },
            });

            var Notice = React.createClass ({
                render: function() {
                  return (
                    <div className="notice">
                        <hr/>
                        <div className="noticeLeft">
                            <h3>更新履歴</h3>
                                2016/06/02: コスモスAT/DF/BLの計算を追加。コスモス武器指定がない場合にはコスモススキルを指定できないように修正<br />
                                2016/05/31: 表示項目を選べるように / 属性バフを加算し忘れていたので修正 / 暴君とミフネ流のHP計算に対応 / DATA率の計算に対応<br />
                                2016/05/30: HPマスターボーナスをHPバフ側に加算していたので修正。<br />
                                2016/05/29: 基礎HPの基礎式を修正。召喚石を増やした後減らすと結果表示が残る不具合修正。武器本数が少ないデータを読み込むと前のデータの武器が残ってしまう不具合を修正。<br />
                                2016/05/29: 得意武器ゼニスIIに対応（★4、★5、★6）。得意武器Iはすべてマスター済みという前提で各6%, 8%, 10%として計算します。<br />
                                2016/05/29: HPと守護スキルの実装、優先項目を選んでソートできるように修正<br />
                                2016/05/29: 武器種類数を10本に設定すると表示がバグる不具合を修正 <br />
                                2016/05/26: マスターボーナスがなかった場合のURLを入力してしまうと表示がNaNになってしまう不具合を修正 <br />
                                2016/05/26: マスターボーナスの項が抜けてたので追加 / ついでに表示される攻撃力も算出されるように変更(確認用) <br />
                                2016/05/25: 保存用URLのTweetボタンを追加 <br />
                                2016/05/25: 召喚石関連の入力値も複数持てるように変更しました。（修正前の保存データは一部壊れる可能性があります）

                            <h3>注記</h3>
                                - 未対応: 羅刹/三手<br/>
                                - 二手のDA率上昇量はすんどめ侍氏の検証結果を使っています(二手大SLv15は7.0%としました。)<br/>
                                - 克己のDA率上昇量は二手(中)と全く同じとしています。<br/>
                                - 暴君の攻撃力上昇量は対応するスキルの(大)と同様としています。<br/>
                                - 基礎HPの基礎式は 600 + 8 * rank(100まで) + 4 * (rank - 100)としていますが、ズレる場合はお知らせください。<br/>
                                - 蘭子のアンノウン加護アップってアンノウンVITにも効果ありますよね？<br/>
                                - 背水の計算式は日比野さんのところの式を利用しています。<br/>
                                - 保存用URLを使用することで現在の編成を共有できます

                            <h3>LICENSE</h3>
                            <ul>
                                <li> <a href="http://facebook.github.io/react">React</a>: Copyright &copy; 2013-2016 Facebook Inc. v0.13.3 </li>
                                <li> <a href="http://github.com/dankogai/js-base64">dankogai/js-base64</a>: Copyright &copy; 2014, Dan Kogai <a href="./js-base64/LICENSE.md"> LICENSE </a></li>

                            </ul>

                            <h3>参考文献</h3>
                            以下のサイトを参考にさせていただきました。
                            <ul>
                                <li> <a href="http://gbf-wiki.com">グランブルーファンタジー(グラブル)攻略wiki</a></li>
                                <li> <a href="http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html">グランブルーファンタジー攻撃力計算機</a></li>
                                <li> <a href="http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html">オススメ装備に自信ニキ</a></li>
                                <li> <a href="http://greatsundome.hatenablog.com/entry/2015/12/09/230544">すんどめ侍のグラブル生活 - 【グラブル】武器スキル検証結果</a></li>
                            </ul>
                        </div>
                        <div className="noticeRight">
                            製作者: ほしみ <a href="http://twitter.com/hsimyu" target="_blank"> @hsimyu </a><br/>
                            <img className="banner" src="./ChWJ-LgUgAA2JEy.jpg" />
                        </div>
                    </div>
                   );
                },

            });

            var m = React.render(<Root />, document.getElementById('app'));
