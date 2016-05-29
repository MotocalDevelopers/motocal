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
                "normalHaisuiS": {name:"通常背水(小)", type:"normalHaisui", amount: "S"},
                "normalHaisuiL": {name:"通常背水(大)", type:"normalHaisui", amount: "L"},
                "normalKamui": {name:"神威", type:"normalKamui", amount: "S"},
                "magnaM": {name: "M攻刃", type:"magna", amount:"M"},
                "magnaL": {name: "M攻刃II", type:"magna", amount:"L"},
                "magnaHaisuiS": {name:"M背水(小)", type:"magnaHaisui", amount: "S"},
                "magnaHaisuiL": {name:"M背水(大)", type:"magnaHaisui", amount: "L"},
                "magnaKamui": {name:"M神威", type:"magnaKamui", amount: "S"},
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
            var selectTemplate = function(opt) { return React.createElement("option", {value: opt, key: opt}, opt); }

            // global hash for loading new data
            var newData = {}
            var cosmosChecked = false;

            // Root class contains [Profile, ArmList, Results].
            var Root = React.createClass({displayName: "Root",
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
                    React.createElement("div", {className: "root"}, 
                        React.createElement("div", {className: "rootLeft"}, 
                            React.createElement("div", {className: "top"}, 
                                React.createElement(Profile, {dataName: this.state.dataName, onArmNumChange: this.handleArmNumChange, onChange: this.onChangeProfileData, onSummonNumChange: this.handleSummonNumChange}), 
                                React.createElement(SummonList, {dataName: this.state.dataName, summonNum: this.state.summonNum, onChange: this.onChangeSummonData})
                            ), 
                            React.createElement("hr", null), 
                            React.createElement("div", {className: "bottom"}, 
                                React.createElement(ArmList, {dataName: this.state.dataName, armNum: this.state.armNum, onChange: this.onChangeArmData}), 
                                React.createElement(ResultList, {data: this.state}), 
                                React.createElement(Notice, null)
                            )
                        ), 
                        React.createElement("div", {className: "rootRight"}, 
                            React.createElement(Sys, {data: this.state, onLoadNewData: this.handleChangeData}), 
                            React.createElement(TwitterShareButton, {data: this.state})
                        )
                    )
                );
              }
            });

            var SummonList = React.createClass({displayName: "SummonList",
                getInitialState: function() {
                    return {
                        smlist: [],
                    };
                },
                componentWillReceiveProps: function(nextProps) {
                    if (parseInt(nextProps.summonNum) < parseInt(this.props.summonNum)) {
                        var newsmlist = this.state.smlist;
                        newsmlist.pop();
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
                        React.createElement("div", {className: "summonList"}, 
                            React.createElement("h2", null, " 召喚石 "), 
                            React.createElement("table", null, 
                            React.createElement("thead", null, 
                            React.createElement("tr", null, 
                                React.createElement("th", null, "No."), 
                                React.createElement("th", null, "自分の石"), 
                                React.createElement("th", null, "加護量"), 
                                React.createElement("th", null, "フレ石"), 
                                React.createElement("th", null, "フレ加護量"), 
                                React.createElement("th", null, "召喚石攻撃力"), 
                                React.createElement("th", null, "召喚石HP"), 
                                React.createElement("th", null, "加護HPUP(%)"), 
                                React.createElement("th", null, "召喚石DA率（仮）")
                            )
                            ), 
                            React.createElement("tbody", null, 
                                summons.map(function(sm) {
                                    return React.createElement(Summon, {key: sm.id, onChange: hChange, id: sm.id, dataName: dataName});
                                })
                            )
                            )
                        )
                    );
                }
            });

            var Summon = React.createClass({displayName: "Summon",
                getInitialState: function() {
                    return {
                        selfSummonType: "magna",
                        selfSummonAmount: 0,
                        friendSummonType: "magna",
                        friendSummonAmount: 0,
                        Attack: 0,
                        hp: 0,
                        hpBonus: 0,
                        DA: 0,
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
                    var smtypes = Object.keys(summonTypes).map(function(opt){return React.createElement("option", {value: opt, key: opt}, summonTypes[opt]);});

                    return (
                        React.createElement("tr", null, 
                            React.createElement("form", {className: "summonForm"}, 
                                React.createElement("td", null, this.props.id + 1), 
                                React.createElement("td", null, React.createElement("select", {value: this.state.selfSummonType, onChange: this.handleEvent.bind(this, "selfSummonType")}, smtypes)), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", max: "120", value: this.state.selfSummonAmount, onChange: this.handleEvent.bind(this, "selfSummonAmount")})), 
                                React.createElement("td", null, React.createElement("select", {value: this.state.friendSummonType, onChange: this.handleEvent.bind(this, "friendSummonType")}, smtypes)), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", max: "120", value: this.state.friendSummonAmount, onChange: this.handleEvent.bind(this, "friendSummonAmount")})), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.Attack, onChange: this.handleEvent.bind(this, "Attack")})), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.hp, onChange: this.handleEvent.bind(this, "hp")})), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.hpBonus, onChange: this.handleEvent.bind(this, "hpBonus")})), 
                                React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.DA, onChange: this.handleEvent.bind(this, "DA")}))
                            )
                        )
                    );

                }
            });

            var ResultList = React.createClass({displayName: "ResultList",
                calculateBasedOneSummon: function(summon, prof, arml, buff, sortkey) {
                    var totalSummon = {magna: 0, element: 0, zeus: 0, chara: 0, ranko: 0, attack: 0, hp: 0.0, hpBonus: 0.0, da: 0};

                    // 自分の加護
                    totalSummon[summon.selfSummonType] += 0.01 * parseInt(summon.selfSummonAmount)
                    // フレンドの加護
                    totalSummon[summon.friendSummonType] += 0.01 * parseInt(summon.friendSummonAmount)

                    totalSummon["attack"] = parseInt(summon.Attack)

                    // 後から追加したので NaN でないか判定しておく
                    if(!isNaN(summon.hp)) totalSummon["hp"] = parseInt(summon.hp)
                    if(!isNaN(summon.hpBonus)) totalSummon["hpBonus"] = 0.01 * parseInt(summon.hpBonus)
                    if(!isNaN(summon.DA)) totalSummon["da"] = parseInt(summon.DA)

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
                        result.push({rank: i, totalAttack: oneres.totalAttack, displayAttack: oneres.displayAttack, totalHP: oneres.totalHP, displayHP: oneres.displayHP, armNumbers: combinations[i]});
                    }

                    if(sortkey == "ATKandHP") {
                        result.sort(function(a, b){
                            if((a.displayAttack + a.displayHP) < (b.displayAttack + b.displayHP)) return  1;
                            if((a.displayAttack + a.displayHP) > (b.displayAttack + b.displayHP)) return -1;
                            return 0;
                        });
                    } else {
                        result.sort(function(a, b){
                            if(a[sortkey] < b[sortkey]) return  1;
                            if(a[sortkey] > b[sortkey]) return -1;
                            return 0;
                        });
                    }
                    for(var i = 0; i < result.length; i++){
                        result[i]["rank"] = i + 1
                    }

                    while(result.length > 10){ result.pop(); }

                    return result;
                },
                calculateOneCombination: function(comb, totalSummon, prof, arml, buff){
                    var tempArmList = []
                    for(var i = 0; i < arml.length; i++){
                        for(var j = 0; j < comb[i]; j++){
                            tempArmList.push(arml[i]);
                        }
                    }

                    var totalSkills = {magna: 0, magnaHaisui: 0, normal: 0, normalHaisui: 0, unknown: 0, unknownOther: 0, normalKamui: 0, magnaKamui: 0, bahaAT: 0, bahaHP: 0, magnaHP: 0, normalHP: 0, unknownHP: 0, bahaHP: 0};
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
                    var elementCoeff = weakPoint + totalSummon["element"]
                    var otherCoeff = 1.0 + buff["other"]

                    var summedAttack = (baseAttack + armAttack + totalSummon["attack"] + parseInt(prof.attackBonus) ) * (1.0 + buff["master"])
                    var totalAttack = summedAttack * magnaCoeff * magnaHaisuiCoeff * normalCoeff * normalHaisuiCoeff * elementCoeff * unknownCoeff * otherCoeff

                    // for HP
                    var totalHP = (baseHP + totalSummon["hp"] + armHP + buff["hpBonus"]) * (1.0 + totalSummon["hpBonus"] + 0.01 * totalSkills["bahaHP"] + buff["masterHP"] + 0.01 * totalSkills["magnaHP"] * (1.0 + totalSummon["magna"]) + 0.01 * totalSkills["normalHP"] * (1.0 + totalSummon["zeus"]) + 0.01 * totalSkills["unknownHP"] * (1.0 + totalSummon["ranko"]))
                    var displayHP = (baseHP + totalSummon["hp"] + armHP + buff["hpBonus"]) * (1.0 + buff["masterHP"])
                    return {totalAttack: Math.round(totalAttack), displayAttack: Math.round(summedAttack), totalHP: Math.ceil(totalHP), displayHP: Math.ceil(displayHP)};
                },
                calculateResult: function() {
                  var prof = this.props.data.profile; var arml = this.props.data.armlist;
                  var summon = this.props.data.summon;

                  if (prof != undefined && arml != undefined && summon != undefined) {
                      var totalBuff = {master: 0.0, masterHP: 0.0, normal: 0.0, element: 0.0, other: 0.0, zenith1: 0.0, zenith2: 0.0, hpBonus: 0.0};

                      // 後から追加したパラメータはNaNなことがあるので追加処理
                      if(!isNaN(prof.masterBonus)) totalBuff["master"] += 0.01 * parseInt(prof.masterBonus);
                      if(!isNaN(prof.masterBonusHP)) totalBuff["masterHP"] += 0.01 * parseInt(prof.masterBonusHP);
                      if(!isNaN(prof.hpBonus)) totalBuff["hpBonus"] += parseInt(prof.hpBonus);
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
                    var armnames = []
                    for(var i = 0; i < this.props.data.armlist.length; i++){
                        armnames[i] = this.props.data.armlist[i].name;

                        if(armnames[i] == '') {
                            armnames[i] = "武器" + (i + 1).toString()
                        }
                    }

                    return (
                        React.createElement("div", {className: "resultList"}, 
                            res.map(function(r) {
                                return(
                                    React.createElement("div", {className: "result"}, 
                                        React.createElement("h2", null, " 結果(", r.sortkeyname, "): No. ", r.summonNo + 1, " (", summonTypes[r.summon.selfSummonType], r.summon.selfSummonAmount, " + ", summonTypes[r.summon.friendSummonType], r.summon.friendSummonAmount, ") "), 
                                        React.createElement("table", null, 
                                        React.createElement("thead", null, 
                                        React.createElement("tr", null, 
                                            React.createElement("th", null, "順位"), 
                                            React.createElement("th", null, "総合攻撃力"), 
                                            React.createElement("th", null, "戦力"), 
                                            React.createElement("th", null, "HP"), 
                                            armnames.map(function(m){ return React.createElement("th", null, m); })
                                        )
                                        ), 
                                        React.createElement(Result, {key: r.summonNo, data: r.result})
                                        )
                                    )
                                );
                            })
                        )
                    );
                }
            });

            var Result = React.createClass({displayName: "Result",
                render: function() {
                    return (
                        React.createElement("tbody", {className: "result"}, 
                            this.props.data.map(function(m) {
                                return (
                                    React.createElement("tr", {key: m.rank}, 
                                        React.createElement("td", null, " ", m.rank, " "), 
                                        React.createElement("td", null, " ", m.totalAttack, " "), 
                                        React.createElement("td", null, " ", parseInt(m.displayAttack) + parseInt(m.displayHP), " (", m.displayAttack, " + ", m.displayHP, ")"), 
                                        React.createElement("td", null, " ", m.totalHP, " "), 
                                        m.armNumbers.map(function(am){
                                            return (React.createElement("td", null, am, " 本"));
                                        })
                                    )
                                );
                            })
                        )
                    );
                }
            });

            // ArmList has a number of Arm objects.
            var ArmList = React.createClass({displayName: "ArmList",
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
                        React.createElement("div", {className: "armList"}, 
                            React.createElement("h2", null, " 武器リスト "), 
                            React.createElement("table", null, 
                            React.createElement("thead", null, 
                            React.createElement("tr", null, 
                                React.createElement("th", null, "武器名"), 
                                React.createElement("th", null, "攻撃力"), 
                                React.createElement("th", null, "HP"), 
                                React.createElement("th", {className: "tiny"}, "武器種"), 
                                React.createElement("th", {className: "tiny"}, "コスモス？"), 
                                React.createElement("th", null, "スキル1"), 
                                React.createElement("th", null, "スキル2"), 
                                React.createElement("th", {className: "tiny"}, "SLv"), 
                                React.createElement("th", {className: "consider"}, "考慮本数")
                            )
                            ), 
                            React.createElement("tbody", null, 
                            arms.map(function(arm) {
                                return React.createElement(Arm, {key: arm.id, onChange: hChange, id: arm.id, dataName: dataName});
                            })
                            )
                            )
                        )
                    );
                }
            });

            // Arm is a fundamental object corresponding one arm.
            var Arm = React.createClass({displayName: "Arm",
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
                    } else { newState[key] = e.target.value }

                    this.setState(newState)
                    this.props.onChange(this.props.id, newState)
                },
                render: function(){
                    var stypes = Object.keys(skilltypes).map(function(key){ return React.createElement("option", {value: key, key: key}, skilltypes[key].name);})
                    var atypes = armtypes.map(function(opt){return React.createElement("option", {value: opt.type, key: opt.name}, opt.name);});

                    return (
                        React.createElement("tr", null, 
                            React.createElement("form", {className: "armForm"}, 
                            React.createElement("td", null, React.createElement("input", {type: "text", placeholder: "武器名", value: this.state.name, onChange: this.handleEvent.bind(this, "name")})), 
                            React.createElement("td", null, React.createElement("input", {type: "number", placeholder: "0以上の整数", min: "0", value: this.state.attack, onChange: this.handleEvent.bind(this, "attack")})), 
                            React.createElement("td", null, React.createElement("input", {type: "number", placeholder: "0以上の整数", min: "0", value: this.state.hp, onChange: this.handleEvent.bind(this, "hp")})), 
                            React.createElement("td", null, React.createElement("select", {value: this.state.armType, onChange: this.handleEvent.bind(this, "armType")}, " ", atypes, " ")), 
                            React.createElement("td", {className: "checkbox"}, React.createElement("input", {type: "checkbox", checked: this.state.isCosmos, onChange: this.handleEvent.bind(this, "isCosmos")})), 
                            React.createElement("td", null, React.createElement("select", {value: this.state.skill1, onChange: this.handleEvent.bind(this, "skill1")}, " ", stypes)), 
                            React.createElement("td", null, React.createElement("select", {value: this.state.skill2, onChange: this.handleEvent.bind(this, "skill2")}, " ", stypes)), 
                            React.createElement("td", null, React.createElement("input", {type: "number", min: "1", max: "15", step: "1", value: this.state.slv, onChange: this.handleEvent.bind(this, "slv")})), 
                            React.createElement("td", null, 
                                React.createElement("input", {className: "consider", type: "number", min: "0", max: "10", value: this.state.considerNumberMin, onChange: this.handleEvent.bind(this, "considerNumberMin")}), " 本～", 
                                React.createElement("input", {className: "consider", type: "number", min: "0", max: "10", value: this.state.considerNumberMax, onChange: this.handleEvent.bind(this, "considerNumberMax")}), " 本"
                            )
                            )
                        )
                    );
                }
            });

            var Profile = React.createClass({displayName: "Profile",
                getDefaultProps:function() {
                    var zenithBonuses = Object.keys(zenith).map(function(opt){ return React.createElement("option", {value: opt, key: opt}, opt) });
                    var typeBonus = Object.keys(types).map(function(opt){ return React.createElement("option", {value: opt, key: opt}, opt) });
                    var atypes = armtypes.map(function(opt){return React.createElement("option", {value: opt.type, key: opt.name}, opt.name);});
                    var ktypes = Object.keys(keyTypes).map(function(opt){ return React.createElement("option", {value: opt, key: opt}, opt) });
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
                            React.createElement("div", {className: "profile"}, 
                                React.createElement("h2", null, " プロフィール "), 
                                React.createElement("table", null, 
                                React.createElement("form", {className: "profileForm"}, 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "Rank"), 
                                    React.createElement("th", null, "攻撃力ボーナス"), 
                                    React.createElement("th", null, "HPボーナス"), 
                                    React.createElement("th", null, "マスターボーナスATK(%)"), 
                                    React.createElement("th", null, "マスターボーナスHP(%)(+バフ等)"), 
                                    React.createElement("th", null, "HP (%)")
                                ), 
                                React.createElement("tr", null, 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", max: "170", value: this.state.rank, onChange: this.handleEvent.bind(this, "rank")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.attackBonus, onChange: this.handleEvent.bind(this, "attackBonus")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.hpBonus, onChange: this.handleEvent.bind(this, "hpBonus")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", max: "100", value: this.state.masterBonus, onChange: this.handleEvent.bind(this, "masterBonus")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", max: "100", value: this.state.masterBonusHP, onChange: this.handleEvent.bind(this, "masterBonusHP")})), 
                                    React.createElement("td", null, " ", React.createElement("input", {type: "number", min: "0", max: "100", value: this.state.hp, onChange: this.handleEvent.bind(this, "hp")}))
                                ), 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "属性相性"), 
                                    React.createElement("th", null, "得意武器1"), 
                                    React.createElement("th", null, "得意武器2"), 
                                    React.createElement("th", null, "武器ゼニス1"), 
                                    React.createElement("th", null, "武器ゼニス2"), 
                                    React.createElement("th", null, "通常バフ")
                                ), 
                                React.createElement("tr", null, 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.typeBonus, onChange: this.handleEvent.bind(this, "typeBonus")}, " ", this.props.typeBonus, " ")), 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.favArm1, onChange: this.handleEvent.bind(this, "favArm1")}, " ", this.props.atypes, " ")), 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.favArm2, onChange: this.handleEvent.bind(this, "favArm2")}, " ", this.props.atypes, " ")), 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.zenithBonus1, onChange: this.handleEvent.bind(this, "zenithBonus1")}, " ", this.props.zenithBonuses, " ")), 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.zenithBonus2, onChange: this.handleEvent.bind(this, "zenithBonus2")}, " ", this.props.zenithBonuses, " ")), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.normalBuff, onChange: this.handleEvent.bind(this, "normalBuff")}))
                                ), 
                                React.createElement("tr", null, 
                                    React.createElement("th", null, "属性バフ"), 
                                    React.createElement("th", null, "その他バフ"), 
                                    React.createElement("th", null, "武器種類数"), 
                                    React.createElement("th", null, "召喚石の組数"), 
                                    React.createElement("th", null, "優先する項目")
                                ), 
                                React.createElement("tr", null, 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.elementBuff, onChange: this.handleEvent.bind(this, "elementBuff")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "0", value: this.state.otherBuff, onChange: this.handleEvent.bind(this, "otherBuff")})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "1", max: "20", step: "1", value: this.state.armNum, onChange: this.handleArmNumChange})), 
                                    React.createElement("td", null, React.createElement("input", {type: "number", min: "1", max: "4", step: "1", value: this.state.summonNum, onChange: this.handleSummonNumChange})), 
                                    React.createElement("td", null, React.createElement("select", {value: this.state.sortKey, onChange: this.handleEvent.bind(this, "sortKey")}, " ", this.props.keyTypes, " "))
                                )
                                )
                                )
                            )
                        );
                    }
            });
            var Sys = React.createClass({displayName: "Sys",
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
                                React.createElement("option", {value: opt, key: opt}, opt)
                            );
                        });
                    }
                    return (
                        React.createElement("div", {className: "system"}, 
                            React.createElement("h2", null, " System "), 
                            React.createElement("form", {className: "sysForm"}, 
                                React.createElement("select", {size: "12", value: this.state.selectedData, onClick: this.handleOnClick.bind(this, "selectedData"), onChange: this.handleEvent.bind(this, "selectedData")}, " ", datalist, " "), 
                                "データ名: ", React.createElement("input", {size: "10", type: "text", value: this.state.dataName, onChange: this.handleEvent.bind(this, "dataName")}), React.createElement("br", null), 
                                React.createElement("button", {type: "button", onClick: this.onSubmitSave}, "保存"), 
                                React.createElement("button", {type: "button", onClick: this.onSubmitLoad}, "読込"), 
                                React.createElement("button", {type: "button", onClick: this.onSubmitRemove}, "削除")
                            )
                        )
                    );
                }
            });

            // Twitter Button
            var TwitterShareButton = React.createClass ({displayName: "TwitterShareButton",
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
                        React.createElement("div", {className: "tweet"}, 
                            React.createElement("h3", null, "保存用URL"), 
                            this.state.url
                        )
                   );
                   //<a href={tweeturl} target="_blank"><button type="button" className="tweetButton">Tweet</button></a>
                },
            });

            var Notice = React.createClass ({displayName: "Notice",
                render: function() {
                  return (
                    React.createElement("div", {className: "notice"}, 
                        React.createElement("hr", null), 
                        React.createElement("div", {className: "noticeLeft"}, 
                            React.createElement("h3", null, "更新履歴"), 
                                "2016/05/29: 基礎HPの基礎式を修正。召喚石を増やした後減らすと結果表示が残る不具合修正。武器本数が少ないデータを読み込むと前のデータの武器が残ってしまう不具合を修正。", React.createElement("br", null), 
                                "2016/05/29: 得意武器ゼニスIIに対応（★4、★5、★6）。得意武器Iはすべてマスター済みという前提で各6%, 8%, 10%として計算します。", React.createElement("br", null), 
                                "2016/05/29: HPと守護スキルの実装、優先項目を選んでソートできるように修正", React.createElement("br", null), 
                                "2016/05/29: 武器種類数を10本に設定すると表示がバグる不具合を修正 ", React.createElement("br", null), 
                                "2016/05/26: マスターボーナスがなかった場合のURLを入力してしまうと表示がNaNになってしまう不具合を修正 ", React.createElement("br", null), 
                                "2016/05/26: マスターボーナスの項が抜けてたので追加 / ついでに表示される攻撃力も算出されるように変更(確認用) ", React.createElement("br", null), 
                                "2016/05/25: 保存用URLのTweetボタンを追加 ", React.createElement("br", null), 
                                "2016/05/25: 召喚石関連の入力値も複数持てるように変更しました。（修正前の保存データは一部壊れる可能性があります）", 
                            React.createElement("h3", null, "注記"), 
                                "- DA率の項は仮入力項目です。", React.createElement("br", null), 
                                "- 基礎HPの基礎式は 600 + 8 * rank + 4 * (rank - 100)としていますが、ズレる場合はお知らせください。", React.createElement("br", null), 
                                "- 蘭子のアンノウン加護アップってアンノウンVITにも効果ありますよね？", React.createElement("br", null), 
                                "- 背水の計算式は日比野さんのところの式を利用しています。", React.createElement("br", null), 
                                "- 保存用URLを使用することで現在の編成を共有できます", 
                            React.createElement("h3", null, "LICENSE"), 
                            React.createElement("ul", null, 
                                React.createElement("li", null, " ", React.createElement("a", {href: "http://facebook.github.io/react"}, "React"), ": Copyright © 2013-2016 Facebook Inc. v0.13.3 "), 
                                React.createElement("li", null, " ", React.createElement("a", {href: "http://github.com/dankogai/js-base64"}, "dankogai/js-base64"), ": Copyright © 2014, Dan Kogai ", React.createElement("a", {href: "./js-base64/LICENSE.md"}, " LICENSE "))

                            ), 
                            React.createElement("h3", null, "参考文献"), 
                            "以下のサイトを参考にさせていただきました。", 
                            React.createElement("ul", null, 
                                React.createElement("li", null, " ", React.createElement("a", {href: "http://gbf-wiki.com"}, "グランブルーファンタジー(グラブル)攻略wiki")), 
                                React.createElement("li", null, " ", React.createElement("a", {href: "http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html"}, "グランブルーファンタジー攻撃力計算機")), 
                                React.createElement("li", null, " ", React.createElement("a", {href: "http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html"}, "オススメ装備に自信ニキ"))
                            )
                        ), 
                        React.createElement("div", {className: "noticeRight"}, 
                            "製作者: ほしみ ", React.createElement("a", {href: "http://twitter.com/hsimyu", target: "_blank"}, " @hsimyu "), React.createElement("br", null), 
                            React.createElement("img", {className: "banner", src: "./ChWJ-LgUgAA2JEy.jpg"})
                        )
                    )
                   );
                },

            });

            var m = React.render(React.createElement(Root, null), document.getElementById('app'));
