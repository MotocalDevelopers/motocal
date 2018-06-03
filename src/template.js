var React = require('react');
var {Label, Nav, NavItem, Navbar, NavDropdown, MenuItem, Collapse, Thumbnail, ControlLabel, Button, ButtonGroup, ButtonToolbar, DropdownButton, SplitButton, FormControl, InputGroup, FormGroup, Checkbox, Modal, Image, Popover, Col, Row, Grid, HelpBlock} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var GlobalConst = require('./global_const.js')
var _ua = GlobalConst._ua;
var selector = GlobalConst.selector
var elementTypes = GlobalConst.elementTypes
var skilltypes = GlobalConst.skilltypes
var intl = require('./translate.js')
var {githubAPItoken} = require('./secret_consts.js')

var SendRequest = CreateClass({
    getInitialState: function() {
        return {
            name: "",
            message: "",
            yourname: "",
            sendingMessage: false,
        }
    },
    sendRequestToGithub: function() {
        if(this.state.name != "") {
            this.setState({sendingMessage: true})
            var sendData = {"body": ""}
            if(this.yourname != "") {
                sendData["body"] += "投稿者: " + this.state.yourname + "\n"
            }

            sendData["body"] += "種別: " + this.props.type + "\n" + this.props.type + "名: " + this.state.name + "\n"

            if(this.message != "") {
                sendData["body"] += "メッセージ:" + this.state.message + "\n"
            }

            $.ajax({
                url: "https://api.github.com/repos/hoshimi/motocal/issues/" + this.props.issueNumber + "/comments",
                type: 'post',
                data: JSON.stringify(sendData),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "token " + githubAPItoken);
                    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
                },
                success: function(data) {
                    alert(intl.translate("送信成功", this.props.locale));
                    this.setState({sendingMessage: false})
                    this.props.closeSendRequest();
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setState({sendingMessage: false})
                    this.props.closeSendRequest();
                }.bind(this)
            });
        } else {
            if(this.props.locale == "ja") {
                alert("要望した" + this.props.type + "名が空です");
            } else {
                alert(this.props.type + " name must not be empty.");
            }
        }
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale

        return (
            <div className="sendRequestForm">
                <p> <a href="https://github.com/hoshimi/motocal"> github.com / motocal </a> </p>
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
                                <FormControl type="text" value={this.state.name} onChange={this.handleEvent.bind(this, "name")} style={{textAlign: "left"}} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("メッセージ", locale)}</th>
                            <td>
                                <FormControl componentClass="textarea" value={this.state.message} onChange={this.handleEvent.bind(this, "message")} style={{textAlign: "left", height: "200px"}} />
                            </td>
                        </tr>
                        <tr>
                            <th className="bg-primary">{intl.translate("あなたのお名前", locale)}</th>
                            <td>
                                <FormControl type="text" value={this.state.yourname} onChange={this.handleEvent.bind(this, "yourname")} style={{textAlign: "left"}} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button bsStyle="primary" onClick={this.sendRequestToGithub} disabled={this.sendingMessage}>{intl.translate("送信", locale)}</Button>
            </div>
        )
    },
});

var RegisteredChara = CreateClass({
    getInitialState: function() {
        return {
            filterText: "",
            filterElement: "all",
            charaData: {},
            limit: 99,
            openSendRequest: false,
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
                alert("Error!: キャラデータの取得に失敗しました。\nstatus: " + status + "\nerror message: " + err.toString());
                console.log("xhr:", xhr);
                console.log("status:", status);
                console.log("error: ", err);
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
    openSendRequest: function(e) {
        this.setState({openSendRequest: true})
    },
    closeSendRequest: function(e) {
        this.setState({openSendRequest: false})
    },
    render: function() {
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var charaData = this.state.charaData
        var limit = this.state.limit;
        var displayed_count = 0;
        var locale = this.props.locale

        if(_ua.Mobile || _ua.Tablet){
            return (
                <div className="charaTemplate">
                    <span>検索:</span>
                    <FormControl type="text" placeholder={intl.translate("キャラ名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            var charaName = charaData[key][locale]
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || charaName.indexOf(filterText) != -1){
                                    if(displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onechara" key={key}>
                                                <p>{charaName}</p><br/>
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
                    <span>検索:</span>
                    <FormControl type="text" placeholder={intl.translate("キャラ名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="charaTemplateContent">
                        {Object.keys(charaData).map(function(key, ind) {
                            var charaName = charaData[key][locale]
                            if(filterElement == "all" || (charaData[key].element == filterElement)){
                                if(filterText == "" || charaName.indexOf(filterText) != -1){
                                    return (
                                        <div className="onechara" key={key}>
                                            <p>{charaName}</p><br/>
                                            <Image rounded onClick={clickedTemplate} id={key} src={charaData[key].imageURL} alt={key} />
                                        </div>
                                    );
                                }
                            }
                            return "";
                        })}

                    </div>

                    { locale == "en" ?
                        <p className="text-danger">
                            Help me English translation of templates on&nbsp;
                            <a href="https://docs.google.com/spreadsheets/d/12R-ZQD8xy1dYYoFxjcWNN0mva1NaDIQB1XSY95jfSKg/edit" target="_blank">Google Spreadsheet</a>!
                        </p>
                        :
                        null
                    }
                    <Button onClick={this.openSendRequest} bsStyle="danger">{intl.translate("追加要望を送る", locale)}</Button>

                    <Modal show={this.state.openSendRequest} onHide={this.closeSendRequest}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("キャラ追加要望", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SendRequest locale={locale} type={intl.translate("キャラ", locale)} issueNumber={29} closeSendRequest={this.closeSendRequest} />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});

var RegisteredArm = CreateClass({
    getInitialState: function() {
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
            additionalSelectKeys: [],
            additionalSelectSelectors: [],
            additionalSelectClass: "hidden",
            openSendRequest: false,
        };
    },
    openSendRequest: function(e) {
        this.setState({openSendRequest: true})
    },
    closeSendRequest: function(e) {
        this.setState({openSendRequest: false})
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
        var newState = this.state
        newState["tempArm"] = this.state.armData[e.target.getAttribute("id")]

        var arm = this.state.armData[e.target.getAttribute("id")]
        newState["armLv"] = parseInt(arm.maxlv)
        newState["armSLv"] = parseInt(arm.slvmax)

        if (arm.maxlv == "200") {
            newState["selectLevel"] = selector.level200Limit
            newState["selectSkillLevel"] = selector.skilllevel20Limit
        } else if (arm.maxlv == "150") {
            newState["selectLevel"] = selector.level150Limit
            newState["selectSkillLevel"] = selector.skilllevel15Limit
        } else {
            newState["selectLevel"] = selector.level100Limit
            newState["selectSkillLevel"] = selector.skilllevel10Limit
        }

        var isAdditionalSelectFound = false;

        for(var key in GlobalConst.additionalSelectList) {
            if( (!isAdditionalSelectFound) && (arm.ja.indexOf(key) >= 0)) {
                newState["additionalNotation"] = GlobalConst.additionalSelectList[key].notationText
                newState["additionalSelectKeys"] = GlobalConst.additionalSelectList[key].selectKeys
                newState["additionalSelectSelectors"] = GlobalConst.additionalSelectList[key].selectors

                // 初期キーをセット
                for(var itr = 0; itr < newState.additionalSelectKeys.length; ++itr) {
                    newState[ newState.additionalSelectKeys[itr] ] = GlobalConst.additionalSelectList[key].defaultKeys[itr]
                }

                newState["additionalSelectClass"] = "visible"
                isAdditionalSelectFound = true;
            }
        }

        if(!isAdditionalSelectFound) {
            newState["additionalNotation"] = ""
            newState["additionalSelectKeys"] = []
            newState["additionalSelectSelectors"] = []
            newState["additionalSelectClass"] = "hidden"
        }

        newState["openConsiderNumberModal"] = true
        this.setState(newState)
    },
    clickedConsiderNumber: function(e) {
        var arm = JSON.parse(JSON.stringify(this.state.tempArm))
        arm["name"] = arm[this.props.locale]
        arm["plus"] = this.state.plusNum
        arm["lv"] = this.state.armLv
        arm["slv"] = this.state.armSLv

        for(var itr = 0; itr < this.state.additionalSelectKeys.length; ++itr) {
            var additionalKeys = this.state.additionalSelectKeys[itr]

            if (additionalKeys === "skill1") {
                arm["skill1"] = this.state.skill1
            } else if (additionalKeys === "skill2") {
                arm["skill2"] = this.state.skill2
            } else if (additionalKeys === "elements") {
                arm["name"] += "[" + elementTypes[this.state.elements] + "]"
                arm["element"] = this.state.elements
                arm["element2"] = this.state.elements
            } else if (additionalKeys === "main_weapon_change") {
                // メイン装備時に効果が切り替わるスキルは2番目に配置する
                if (this.state.main_weapon_change) {
                    arm["skill2"] += "Main"
                }
            } else if (additionalKeys === "main_weapon_switch") {
                // メイン装備時に効果がONになるスキルは2番目に配置する
                if (!this.state.main_weapon_switch) {
                    arm["skill2"] = "non"
                }
            }
        }

        this.props.onClick(arm, e.target.value)
        this.setState({openConsiderNumberModal: false})
        this.setState({plusNum: 0})
    },
    handleEvent: function(key, e) {
        var newState = this.state
        newState[key] = e.target.value
        this.setState(newState)
    },
    render: function() {
        var locale = this.props.locale;
        var clickedTemplate = this.clickedTemplate;
        var filterText = this.state.filterText;
        var filterElement = this.state.filterElement;
        var armData = this.state.armData
        var limit = this.state.limit;
        var displayed_count = 0;

        if (_ua.Mobile || _ua.Tablet){
            return (
                <div className="armTemplate">
                    <span>検索:</span>
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            var armName = armData[key][locale]
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement || armData[key].element == "all")){
                                if(filterText == "" || armName.indexOf(filterText) != -1){
                                    if(filterElement != "all" || displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>{armName}</p><br/>
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
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>

                            {/* 追加の選択肢 */}
                            <FormGroup className={this.state.additionalSelectClass}>
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
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
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
                    <FormControl type="text" placeholder={intl.translate("武器名", locale)} value={this.state.filterText} onChange={this.handleEvent.bind(this, "filterText")} />
                    <FormControl componentClass="select" value={this.state.filterElement} onChange={this.handleEvent.bind(this, "filterElement")}>{selector[locale].filterelements}</FormControl>
                    <div className="armTemplateContent">
                        {Object.keys(armData).map(function(key, ind) {
                            var armName = armData[key][locale]
                            if(filterElement == "all" || (armData[key].element == filterElement || armData[key].element2 == filterElement || armData[key].element == "all")){
                                if(filterText == "" || armName.indexOf(filterText) != -1){
                                    if(filterElement != "all" || displayed_count < limit) {
                                        displayed_count++;
                                        return (
                                            <div className="onearm" key={key}>
                                                <p>
                                                    {armName}<br/>
                                                    {intl.translate(skilltypes[armData[key].skill1].name, locale)}<br/>
                                                    {intl.translate(skilltypes[armData[key].skill2].name, locale)}
                                                </p>
                                                <Image rounded style={{"width":"100%"}} onClick={clickedTemplate} id={key} src={armData[key].imageURL} alt={key} />
                                            </div>
                                        );
                                    }
                                }
                            }
                            return "";
                        })}
                    </div>

                    { locale == "en" ?
                        <p className="text-danger">
                            Help me English translation of templates on&nbsp;
                            <a href="https://docs.google.com/spreadsheets/d/12R-ZQD8xy1dYYoFxjcWNN0mva1NaDIQB1XSY95jfSKg/edit" target="_blank">Google Spreadsheet</a>!
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
                            <SendRequest locale={locale} type={intl.translate("武器", locale)} issueNumber={30} closeSendRequest={this.closeSendRequest} />
                        </Modal.Body>
                    </Modal>

                    <Modal className="presetsConsiderNumber" show={this.state.openConsiderNumberModal} onHide={this.closeConsiderNumberModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{intl.translate("何本追加", locale)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl componentClass="select" value={this.state.armLv} onChange={this.handleEvent.bind(this, "armLv")}>{this.state.selectLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.armSLv} onChange={this.handleEvent.bind(this, "armSLv")}>{this.state.selectSkillLevel}</FormControl>
                            <FormControl componentClass="select" value={this.state.plusNum} onChange={this.handleEvent.bind(this, "plusNum")}>{selector.plusnum}</FormControl>

                            {/* 追加の選択肢 */}
                            <FormGroup className={this.state.additionalSelectClass}>
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
                                    <button type="button" className="btn btn-default" value="1" onClick={this.clickedConsiderNumber}>1{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="2" onClick={this.clickedConsiderNumber}>2{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="3" onClick={this.clickedConsiderNumber}>3{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="4" onClick={this.clickedConsiderNumber}>4{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="5" onClick={this.clickedConsiderNumber}>5{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="6" onClick={this.clickedConsiderNumber}>6{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="7" onClick={this.clickedConsiderNumber}>7{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="8" onClick={this.clickedConsiderNumber}>8{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="9" onClick={this.clickedConsiderNumber}>9{intl.translate("本", locale)}</button>
                                </div>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-default" value="10" onClick={this.clickedConsiderNumber}>10{intl.translate("本", locale)}</button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }
    },
});


module.exports.RegisteredChara = RegisteredChara
module.exports.RegisteredArm = RegisteredArm
