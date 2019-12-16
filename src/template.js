var React = require('react');
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid, HelpBlock} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var GlobalConst = require('./global_const.js');
var _ua = GlobalConst._ua;
var selector = GlobalConst.selector;
var elementTypes = GlobalConst.elementTypes;
var sishoSufix = GlobalConst.sishoSufix;
var skilltypes = GlobalConst.skilltypes;
var intl = require('./translate.js');
var {githubAPItoken} = require('./secret_consts.js');

var SendRequest = CreateClass({
    getInitialState: function () {
        return {
            name: "",
            message: "",
            yourname: "",
            sendingMessage: false,
        }
    },
    sendRequestToGithub: function () {
        if (this.state.name != "") {
            this.setState({sendingMessage: true});
            var sendData = {"body": ""};
            if (this.yourname != "") {
                sendData["body"] += "投稿者: " + this.state.yourname + "\n"
            }

            sendData["body"] += "種別: " + this.props.type + "\n" + this.props.type + "名: " + this.state.name + "\n";

            if (this.message != "") {
                sendData["body"] += "メッセージ:" + this.state.message + "\n"
            }

            $.ajax({
                url: "https://api.github.com/repos/MotocalDevelopers/motocal/issues/" + this.props.issueNumber + "/comments",
                type: 'post',
                data: JSON.stringify(sendData),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "token " + githubAPItoken);
                    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
                },
                success: function (data) {
                    alert(intl.translate("送信成功", this.props.locale));
                    this.setState({sendingMessage: false});
                    this.props.closeSendRequest();
                }.bind(this),
                error: function (xhr, status, err) {
                    this.setState({sendingMessage: false});
                    this.props.closeSendRequest();
                }.bind(this)
            });
        } else {
            if (this.props.locale == "ja") {
                alert("要望した" + this.props.type + "名が空です");
            } else {
                alert(this.props.type + " name must not be empty.");
            }
        }
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    render: function () {
        var locale = this.props.locale;

        return (
            <div className="sendRequestForm">
                <p><a href="https://github.com/MotocalDevelopers/motocal"> github.com / motocal </a></p>
                <p>{intl.translate("要望送信メッセージ", locale)}</p>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <th className="bg-primary">{intl.translate("要望種別", locale)}</th>
                        <td>{this.props.type}</td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{this.props.type}{intl.translate("名", locale)}</th>
                        <td>
                            <FormControl type="text" value={this.state.name}
                                         onChange={this.handleEvent.bind(this, "name")} style={{textAlign: "left"}}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("メッセージ", locale)}</th>
                        <td>
                            <FormControl componentClass="textarea" value={this.state.message}
                                         onChange={this.handleEvent.bind(this, "message")}
                                         style={{textAlign: "left", height: "200px"}}/>
                        </td>
                    </tr>
                    <tr>
                        <th className="bg-primary">{intl.translate("あなたのお名前", locale)}</th>
                        <td>
                            <FormControl type="text" value={this.state.yourname}
                                         onChange={this.handleEvent.bind(this, "yourname")}
                                         style={{textAlign: "left"}}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Button bsStyle="primary" onClick={this.sendRequestToGithub}
                        disabled={this.sendingMessage}>{intl.translate("送信", locale)}</Button>
            </div>
        )
    },
});

/**
 * @param {object} state
 * @param {string} locale
 * @return {function}
 */
function _generateCharaFilterFunc(state, locale="en") {
    const {
        filterElement,
        filterText,
        filterRace,
        filterType,
        filterFav,
        filterSex,
    } = state;

    return ([key, val]) => (
        (filterElement == "all" || val.element == filterElement) &&
        (filterText == "" || val[locale].toLowerCase().indexOf(filterText.toLowerCase()) != -1) &&
        (filterRace === "all" || val.race === filterRace || val.race.includes(filterRace)) &&
        (filterType === "all" || val.type === filterType) &&
        (filterFav === "all" || [val.fav1, val.fav2].includes(filterFav)) &&
        (filterSex === "all" || val.sex === filterSex || val.sex.match(new RegExp("\\b" + filterSex + "\\b"))));
}

module.exports._generateCharaFilterFunc = _generateCharaFilterFunc;


var RegisteredChara = CreateClass({
    getInitialState: function () {
        return {
            filterText: "",
            filterElement: "all",
            filterSex: "all",
            filterType: "all",
            filterRace: "all",
            filterFav: "all",
            charaData: {},
            limit: 99,
            openSendRequest: false,
        };
    },
    onDataRequested: function () {
        return new Promise(resolve => {
            $.ajax({
                url: "./charaData.json",
                dataType: 'json',
                cache: false,
                timeout: 10000,
                success: function (data) {
                    resolve(data);
                }.bind(this),
                error: function (xhr, status, err) {
                    alert("Error!: キャラデータの取得に失敗しました。\nstatus: " + status + "\nerror message: " + err.toString());
                    console.log("xhr:", xhr);
                    console.log("status:", status);
                    console.log("error: ", err);
                    throw new Error(err.toString());
                }.bind(this)
            });
        });
    },
    onDataObtained: async function (callback) {
        this.onDataRequested().then(callback);
    },
    componentDidMount: function () {
        this.onDataObtained((charadata) => {
            this.setState({charaData: charadata});
        });
    },
    clickedTemplate: function (e) {
        this.props.onClick(this.state.charaData[e.target.getAttribute("id")]);
    },
    handleEvent: function (key, e) {
        this.setState({[key]: e.target.value});
    },
    openSendRequest: function (e) {
        this.setState({openSendRequest: true});
    },
    closeSendRequest: function (e) {
        this.setState({openSendRequest: false});
    },
    render: function () {
        const locale = this.props.locale;
        const clickedTemplate = this.clickedTemplate;
        const {
            filterText,
            filterElement,
            filterSex,
            filterType,
            filterRace,
            filterFav,
            charaData,
            limit,
        } = this.state;

        const charaTemplateHeader = <>
            <span>検索:</span>
            <FormControl type="text" placeholder={intl.translate("キャラ名", locale)} value={this.state.filterText}
                         onChange={this.handleEvent.bind(this, "filterText")}/>
            <FormControl componentClass="select" value={this.state.filterElement}
                         onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterElements}</FormControl>
            <FormControl componentClass="select" value={this.state.filterSex}
                         onChange={this.handleEvent.bind(this, "filterSex")}>{selector[locale].filterSexes}</FormControl>
            <FormControl componentClass="select" value={this.state.filterType}
                         onChange={this.handleEvent.bind(this, "filterType")}>{selector[locale].filterTypes}</FormControl>
            <FormControl componentClass="select" value={this.state.filterRace}
                         onChange={this.handleEvent.bind(this, "filterRace")}>{selector[locale].filterRaces}</FormControl>
            <FormControl componentClass="select" value={this.state.filterFav}
                         onChange={this.handleEvent.bind(this, "filterFav")}>{selector[locale].filterFavs}</FormControl>
            </>;

        const filterFunc = _generateCharaFilterFunc(this.state, locale);

        const mapFunc = ([key,val]) =>
            <div className="onechara" key={key}>
                <p>{val[locale]}</p><br/>
                <Image rounded onClick={clickedTemplate} id={key}
                       src={val.imageURL} alt={key} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "./otherImages/imgError.png"
                }}/>
            </div>;

        const result = Object.entries(charaData).filter(filterFunc);
        const total = result.length;

        if (_ua.Mobile || _ua.Tablet) {
            return (
                <div className="charaTemplate">
                    {charaTemplateHeader}
                    <div className="charaTemplateContent">
                        {result.slice(0, limit).map(mapFunc)}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="charaTemplate">
                    {charaTemplateHeader}
                    <div className="charaTemplateContent">
                        {result.slice(0, limit).map(mapFunc)}
                    </div>

                    {locale == "en" ?
                        <p className="text-danger">
                            Help me English translation of templates on&nbsp;
                            <a href="https://docs.google.com/spreadsheets/d/12R-ZQD8xy1dYYoFxjcWNN0mva1NaDIQB1XSY95jfSKg/edit"
                               target="_blank">Google Spreadsheet</a>!
                        </p>
                        :
                        null
                    }

                    <p className="text-danger">
                        最新{limit}/{total}件を表示しています。
                        それより古い場合は武器検索/属性フィルターをご利用下さい。
                    </p>

                    <Button onClick={this.openSendRequest} bsStyle="danger">{intl.translate("追加要望を送る", locale)}</Button>

                    <Modal show={this.state.openSendRequest} onHide={this.closeSendRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("キャラ追加要望", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SendRequest locale={locale} type={intl.translate("キャラ", locale)} issueNumber={29}
                                         closeSendRequest={this.closeSendRequest}/>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});

var RegisteredArm = CreateClass({
    getInitialState: function () {
        return {
            filterText: "",
            filterElement: "all",
            armData: {},
            limit: (_ua.Mobile) ? 99 : 300,
            tempArm: {},
            openConsiderNumberModal: false,
            plusNum: 0,
            armLv: 1,
            armSLv: 1,
            additionalNotation: "",
            additionalSelectKeysNotation: "",
            additionalSelectKeys: [],
            additionalSelectSelectors: [],
            additionalSelectClass: "hidden",
            openSendRequest: false,
        };
    },
    openSendRequest: function (e) {
        this.setState({openSendRequest: true})
    },
    closeSendRequest: function (e) {
        this.setState({openSendRequest: false})
    },
    closeConsiderNumberModal: function () {
        this.setState({openConsiderNumberModal: false})
    },
    openConsiderNumberModal: function () {
        this.setState({openConsiderNumberModal: true})
    },
    onDataRequested: async function () {
        return new Promise(resolve => {
            $.ajax({
                url: "./armData.json",
                dataType: 'json',
                cache: false,
                timeout: 10000,
                success: function (data) {
                    resolve(data)
                }.bind(this),
                error: function (xhr, status, err) {
                    alert("Error!: 武器データの取得に失敗しました。 status: ", status, ", error message: ", err.toString());
                    throw new Error(err.toString());
                }.bind(this)
            });
        });
    },
    onDataObtained: async function (callback) {
        this.onDataRequested().then(callback)
    },
    componentDidMount: function () {
        this.onDataObtained((armData) => {
            this.setState({armData: armData})
        });
    },
    clickedTemplate: function (e) {
        var newState = this.state;
        newState["tempArm"] = this.state.armData[e.target.getAttribute("id")];

        var arm = this.state.armData[e.target.getAttribute("id")];
        newState["armLv"] = parseInt(arm.maxlv);
        newState["armSLv"] = parseInt(arm.slvmax);

        if (arm.maxlv == "200") {
            newState["selectLevel"] = selector.level200Limit;
            newState["selectSkillLevel"] = selector.skilllevel20Limit
        } else if (arm.maxlv == "150") {
            newState["selectLevel"] = selector.level150Limit;
            newState["selectSkillLevel"] = selector.skilllevel15Limit
        //SR
        } else if (arm.maxlv == "120") {
            newState["selectLevel"] = selector.SRLevel120Limit;
            newState["selectSkillLevel"] = selector.skilllevel15Limit
        } else if (arm.maxlv == "75") {
            newState["selectLevel"] = selector.SRLevel75Limit;
            newState["selectSkillLevel"] = selector.skilllevel10Limit
        } else {
            newState["selectLevel"] = selector.level100Limit;
            newState["selectSkillLevel"] = selector.skilllevel10Limit
        }

        var isAdditionalSelectFound = false;

        for (var key in GlobalConst.additionalSelectList) {
            if ((!isAdditionalSelectFound) && (arm.ja.indexOf(key) >= 0)) {
                newState["additionalNotation"] = GlobalConst.additionalSelectList[key].notationText;
                newState["additionalSelectKeysNotation"] = GlobalConst.additionalSelectList[key].selectKeysNotation;
                newState["additionalSelectKeys"] = GlobalConst.additionalSelectList[key].selectKeys;
                newState["additionalSelectSelectors"] = GlobalConst.additionalSelectList[key].selectors;

                // Set initial key
                for (var itr = 0; itr < newState.additionalSelectKeys.length; ++itr) {
                    newState[newState.additionalSelectKeys[itr]] = GlobalConst.additionalSelectList[key].defaultKeys[itr]
                }

                newState["additionalSelectClass"] = "visible";
                isAdditionalSelectFound = true;
            }
        }

        if (!isAdditionalSelectFound) {
            newState["additionalNotation"] = "";
            newState["additionalSelectKeysNotation"] = "";
            newState["additionalSelectKeys"] = [];
            newState["additionalSelectSelectors"] = [];
            newState["additionalSelectClass"] = "hidden"
        }

        newState["openConsiderNumberModal"] = true;
        this.setState(newState)
    },
    clickedConsiderNumber: function (e) {
        var arm = JSON.parse(JSON.stringify(this.state.tempArm));
        arm["name"] = arm[this.props.locale];
        arm["plus"] = this.state.plusNum;
        arm["lv"] = this.state.armLv;
        arm["slv"] = this.state.armSLv;

        for (var itr = 0; itr < this.state.additionalSelectKeys.length; ++itr) {
            var additionalKeys = this.state.additionalSelectKeys[itr];

            if (additionalKeys === "skill1") {
                arm["skill1"] = this.state.skill1
            } else if (additionalKeys === "skill2") {
                arm["skill2"] = this.state.skill2
            } else if (additionalKeys === "sishoskill2") {
                arm["name"] += intl.translate(sishoSufix[this.state.sishoskill2].name, this.props.locale);
                arm["skill2"] = this.state.sishoskill2;
            } else if (additionalKeys === "skill3") {
                arm["skill3"] = this.state.skill3
            } else if (additionalKeys === "elements") {
                arm["name"] += "[" + intl.translate(elementTypes[this.state.elements], this.props.locale) + "]";
                arm["element"] = this.state.elements;
                arm["element2"] = this.state.elements;
                arm["element3"] = this.state.elements;
            } else if (additionalKeys === "main_weapon_change") {
                // The skill that switches the effect at the time of main equipment is placed second
                if (this.state.main_weapon_change) {
                    arm["skill2"] += "Main";
                    arm["skill3"] = "non";
                }
            } else if (additionalKeys === "main_weapon_switch") {
                // The skill that turns off the effect at the time of main equipment is placed second and third
                if (!this.state.main_weapon_switch) {
                    arm["skill2"] = "non";
                    arm["skill3"] = "non";
                }
            } else if (additionalKeys === "main_weapon_switch_all") {
                // The skill that turns off the effect at the time of main equipment is placed first, second and third
                if (!this.state.main_weapon_switch_all) {
                    arm["skill1"] = "non";
                    arm["skill2"] = "non";
                    arm["skill3"] = "non";
                }
            } else if (additionalKeys === "skill1Detail") {
                arm["skill1Detail"] = this.state.skill1Detail;
            } else if (additionalKeys === "skill2Detail") {
                arm["skill2Detail"] = this.state.skill2Detail;
            } else if (additionalKeys === "skill3Detail") {
                arm["skill3Detail"] = this.state.skill3Detail;
            }
        }

        this.props.onClick(arm, e.target.value);
        this.setState({openConsiderNumberModal: false});
        this.setState({plusNum: 0})
    },
    handleEvent: function (key, e) {
        var newState = this.state;
        newState[key] = e.target.value;
        this.setState(newState)
    },
    render: function () {
        var locale = this.props.locale;
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var armData = this.state.armData;
        var limit = this.state.limit;
        var displayed_count = 0;

        if (_ua.Mobile || _ua.Tablet) {
            return (
                <div className="armTemplate">
                    <span>検索:</span>
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText}
                                 onChange={this.handleEvent.bind(this, "filterText")}/>
                    <FormControl componentClass="select" value={this.state.filterElement}
                                 onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterElements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function (key, ind) {
                            var armName = armData[key][locale];
                            if (filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement || armData[key].element3 == filterElement || armData[key].element == "all")) {
                                if (filterText == "" || armName.toLowerCase().indexOf(filterText.toLowerCase()) != -1) {
                                    if (filterElement != "all" || displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>{armName}</p><br/>
                                                <Image rounded onClick={clickedTemplate} id={key}
                                                       src={armData[key].imageURL} alt={key} onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "./otherImages/imgError.png"
                                                }}/>
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

                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal}
                           onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv}
                                         onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv}
                                         onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum}
                                         onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>

                            {/* 追加の選択肢 */}
                            <FormGroup className={this.state.additionalSelectClass}>
                                <HelpBlock>{(this.state.additionalSelectKeysNotation !== "") ? intl.translate(this.state.additionalSelectKeysNotation, locale) : ""}</HelpBlock>
                                {this.state.additionalSelectKeys.map(
                                    (key, ind) => {
                                        return (
                                            <FormControl
                                                key={key}
                                                componentClass="select"
                                                value={this.state[key]}
                                                onChange={this.handleEvent.bind(this, key)}>
                                                {selector[locale][this.state.additionalSelectSelectors[ind]]}
                                            </FormControl>
                                        );
                                    }
                                )}
                                <HelpBlock>{(this.state.additionalNotation !== "") ? intl.translate(this.state.additionalNotation, locale) : ""}</HelpBlock>
                            </FormGroup>

                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1"
                                            onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2"
                                            onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3"
                                            onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4"
                                            onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5"
                                            onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6"
                                            onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7"
                                            onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8"
                                            onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9"
                                            onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10"
                                            onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div className="armTemplate">
                    <span>検索:</span>
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText}
                                 onChange={this.handleEvent.bind(this, "filterText")}/>
                    <FormControl componentClass="select" value={this.state.filterElement}
                                 onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterElements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function (key, ind) {
                            var armName = armData[key][locale];
                            if (filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement || armData[key].element3 == filterElement || armData[key].element == "all")) {
                                if (filterText == "" || armName.toLowerCase().indexOf(filterText.toLowerCase()) != -1) {
                                    if (filterElement != "all" || displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>
                                                    {armName}<br/>
                                                    {intl.translate(skilltypes[armData[key].skill1].name, locale)}<br/>
                                                    {intl.translate(skilltypes[armData[key].skill2].name, locale)}<br/>
                                                    {intl.translate(skilltypes[armData[key].skill3].name, locale)}
                                                </p>
                                                <Image rounded style={{"width": "100%"}} onClick={clickedTemplate}
                                                       id={key} src={armData[key].imageURL} alt={key} onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "./otherImages/imgError.png"
                                                }}/>
                                            </div>
                                        );
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>

                    {locale == "en" ?
                        <p className="text-danger">
                            Help me English translation of templates on&nbsp;
                            <a href="https://docs.google.com/spreadsheets/d/12R-ZQD8xy1dYYoFxjcWNN0mva1NaDIQB1XSY95jfSKg/edit"
                               target="_blank">Google Spreadsheet</a>!
                        </p>
                        :
                        null
                    }

                    <p className="text-danger">
                        最新{limit}件を表示しています。
                        それより古い場合は武器検索/属性フィルターをご利用下さい。
                    </p>

                    <Button onClick={this.openSendRequest} bsStyle="danger">{intl.translate("追加要望を送る", locale)}</Button>

                    <Modal show={this.state.openSendRequest} onHide={this.closeSendRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("武器追加要望", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SendRequest locale={locale} type={intl.translate("武器", locale)} issueNumber={30}
                                         closeSendRequest={this.closeSendRequest}/>
                        </Modal.Body>
                    </Modal>

                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal}
                           onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv}
                                         onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv}
                                         onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum}
                                         onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>

                            {/* 追加の選択肢 */}
                            <FormGroup className={this.state.additionalSelectClass}>
                                <HelpBlock>{(this.state.additionalSelectKeysNotation !== "") ? intl.translate(this.state.additionalSelectKeysNotation, locale) : ""}</HelpBlock>
                                {this.state.additionalSelectKeys.map(
                                    (key, ind) => {
                                        return (
                                            <FormControl
                                                key={key}
                                                componentClass="select"
                                                value={this.state[key]}
                                                onChange={this.handleEvent.bind(this, key)}>
                                                {selector[locale][this.state.additionalSelectSelectors[ind]]}
                                            </FormControl>
                                        );
                                    }
                                )}
                                <HelpBlock>{(this.state.additionalNotation !== "") ? intl.translate(this.state.additionalNotation, locale) : ""}</HelpBlock>
                            </FormGroup>

                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="1"
                                            onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2"
                                            onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3"
                                            onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4"
                                            onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5"
                                            onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6"
                                            onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7"
                                            onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8"
                                            onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9"
                                            onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10"
                                            onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});


module.exports.RegisteredChara = RegisteredChara;
module.exports.RegisteredArm = RegisteredArm;
