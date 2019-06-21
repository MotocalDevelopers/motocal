var React = require('react');
var ReactDOM = require('react-dom');
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover, Panel, Glyphicon} = require('react-bootstrap');
var CreateClass = require('create-react-class');
var intl = require('./translate.js');
var ChangeLog = require('./changelog.js');

var Notice = CreateClass({
    render: function () {
        var locale = this.props.locale;

        return (
            <div className="notice">
                <div className="divright"><a href={`${location.origin}${location.pathname}`}>入力リセット</a></div>
                <h2>{intl.translate("入力例:", locale)}<a href={`${location.origin}${location.pathname}thumbnail.php`}
                            target="_blank"> 元カレ計算機データビューア </a></h2>
                <h2>{intl.translate("不具合報告・ご要望:", locale)} <a href="https://goo.gl/forms/z1Z8ThAOJxZLAUxc2" target="_blank">Google フォーム</a></h2>
                <h2>{intl.translate("開発者募集:", locale)} <a href="https://github.com/MotocalDevelopers/motocal" target="_blank">MotocalDevelopers/motocal</a></h2>
                <h3>{intl.translate("更新履歴", locale)}</h3>
                <Panel bsStyle="default" collapsible="true"
                       header={<span><Glyphicon glyph="chevron-right"/>&nbsp;Update Logs</span>}>
                    <ChangeLog className="list-group" length={10} step={20} buttonText={intl.translate("次の{step}件を表示", locale)}>

                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190618-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190617-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190615-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190608-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190606-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190528-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190518-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190517-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190514-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190511-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190501-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190430-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190428-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190427-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190426-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190424-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190424-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190414-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190414-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20190310-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20180311-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20180205-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20180102-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20171229-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20171211-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20171117-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20171011-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20171011-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170907-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170819-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170817-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170805-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170802-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170725-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170704-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170617-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170531-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170517-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170516-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170501-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170415-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170414-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170410-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170409-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170331-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170329-3", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170329-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170328-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170317-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170315-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170312-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170312-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170311-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170310-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170308-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170306-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170305-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170305-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170302-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170218-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170218-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170216-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170212-3", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170212-2", locale)}</li>
                        <li className="list-group-item list-group-item-danger">{intl.translate("notice-20170212-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170208-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170204-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170202-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170129-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170123-1", locale)}</li>
                        <li className="list-group-item list-group-item-danger">{intl.translate("notice-20170122-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170122-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170121-5", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170121-4", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170121-3", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170121-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170121-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170118-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170116-2", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170116-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">{intl.translate("notice-20170114-1", locale)}</li>
                        <li className="list-group-item list-group-item-info">2016/1/12: リリィのサポアビが自動セットされない不具合を修正/
                            イリュージョンセプターのテンプレートが3凸のものになっている不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-success">2016/1/6: 奥義ターンの値を整数値から小数点に変更 (詳しくは <a
                            href="http://dev-hsimyu.hatenablog.com/entry/2017/01/06/214517">こちら</a> )
                        </li>
                        <li className="list-group-item list-group-item-info">2016/1/6: ハウンドドッグ追加</li>
                        <li className="list-group-item list-group-item-info">2016/12/17: ネツァのサポアビ2をTA5%から3%に修正</li>
                        <li className="list-group-item list-group-item-info">2016/12/16: サポアビ対応開始</li>
                        <li className="list-group-item list-group-item-info">2016/12/10: 括目を追加(二手のエイリアスです) / 羅刹を追加</li>
                        <li className="list-group-item list-group-item-info">2016/11/30: レスラー追加 / 攻撃力のマスターボーナスに18%を追加.
                        </li>
                        <li className="list-group-item list-group-item-info">2016/11/25: 渾身の計算式を三次関数に修正.</li>
                        <li className="list-group-item list-group-item-info">2016/11/25: 渾身の計算式を修正. /
                            rank1の時の攻撃力が1000ではなくて1040になっていたのを修正
                        </li>
                        <li className="list-group-item list-group-item-info">2016/11/18:
                            テスカトリポカ(属性(種族数))の場合に、表示される加護量も自動で変化するようにした / テスカトリポカの加護量計算を適当なままにしていたので修正
                        </li>
                        <li className="list-group-item list-group-item-info">2016/11/3: 武器とキャラテンプレートデータを更新</li>
                        <li className="list-group-item list-group-item-info">2016/10/18: 表示項目の切り替えをクリックしやすくした</li>
                        <li className="list-group-item list-group-item-info">2016/10/18: キャラの削除と入れ替え機能を実装</li>
                        <li className="list-group-item list-group-item-info">2016/10/18: 通常守護(小)のSLv111-15の効果量を反映 /
                            レイアウト調整
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/10/17:
                            朱雀翼弦のスキル「紅蓮の呪印・弐」にゼウス系石の効果が乗ってしまっていた不具合を修正 / シミュレータのバフリストに「40％」が抜けていたので追記
                        </li>
                        <li className="list-group-item list-group-item-info">2016/10/14:
                            武器テンプレートにマルメターノを追加/ブラックアックス解放に対応/召喚石加護量に66%を追加(蘭子用)
                        </li>
                        <li className="list-group-item list-group-item-info">2016/10/01: PC版レイアウトの調整 (縦分割レイアウトの撤廃)</li>
                        <li className="list-group-item list-group-item-danger">2016/09/30:
                            コスモスATにゼウス石加護が乗ってしまっていた不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-info">2016/09/27:
                            シャノワール、ソシエ、ヴァイト等のキャラと、対応する武器を追加
                        </li>
                        <li className="list-group-item list-group-item-info">2016/09/24: 技巧期待値の計算式を修正
                            (通常刹那・克己の別枠化を行いました)
                        </li>
                        <li className="list-group-item list-group-item-success">2016/09/21: 最低限確保したいHPを設定できるように /
                            レイアウト調整
                        </li>
                        <li className="list-group-item list-group-item-success">2016/09/21: キャラの連撃率、総回技値も表示可能にした</li>
                        <li className="list-group-item list-group-item-success">2016/09/17: ジータさんのみの値を表示していることを分かりやすくした
                            / ジータさんに表記を統一した
                        </li>
                        <li className="list-group-item list-group-item-success">2016/09/14: 古戦場武器の属性変更と覚醒版を追加 /
                            古戦場武器やコスモス武器は、追加時に属性やスキルを選べるようにした
                        </li>
                        <li className="list-group-item list-group-item-success">2016/09/14: 背水グラフに総合回数技巧の項目を追加 /
                            パーティ平均値処理がおかしくなっていたので再度修正
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/09/14:
                            武器テンプレートで火属性フィルタ時にアンノウン武器の一部が表示されてしまう不具合を修正 / アンノウン武器のI系のスキルが適切に設定されない場合がある不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/09/12: ユエル武器の最終解放後のステータスが間違っていたので修正
                            / シミュレータ欄に「平均に含めない」キャラが表示されないように修正
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/09/09:
                            武器テンプレートのマグナ背水系が(小)ではなく(中)になっていたので修正.
                        </li>
                        <li className="list-group-item list-group-item-info">2016/09/08: 玄武殻拳のスキル1(霧氷の追牙・肆)をサポート。</li>
                        <li className="list-group-item list-group-item-success">2016/09/08: 武器テンプレートにSR武器を追加</li>
                        <li className="list-group-item list-group-item-info">2016/09/07: 検証情報を元に三手スキルの上限判定を別枠化 /
                            三手(大)SLv15 の効果量を再度7.0%に修正
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/09/07:
                            コスモスAT+暴君6本以上の場合に、HP表示が負になってしまう不具合を修正(下限を1に)
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/09/06:
                            通常暴君のみ、攻刃(大)ではなく攻刃IIを参照していた不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-success">2016/09/04: ダメージシミュレータの実装 /
                            ビルド環境改善による大幅な高速化
                        </li>
                        <li className="list-group-item list-group-item-info">2016/09/03: スマホ版スタイル調整</li>
                        <li className="list-group-item list-group-item-info">2016/08/31:
                            仮の機能として初期攻撃力推移のグラフ機能を追加、召喚石に"属性(経過ターン)"を追加。(とりあえず単純に20ターンで上限まで行くと仮定しています) /
                            武器テンプレートで+をつけた時にHPの値がおかしくなる不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/08/31:
                            SRが存在するSSRキャラの一部がテンプレートに表示されていなかったのを修正。
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/08/30:
                            特定の操作を行うと、コスモス武器が複数同時に編成されてしまう不具合を修正。
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/29:
                            通常二手SLv15を7.0%から6.6%に、三手の効果量を二手大と同様のものに変更しました。
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/28: 結果の計算タイミングを変更 / 計算機の使い方を追加</li>
                        <li className="list-group-item list-group-item-info">2016/08/27:
                            優先キー"総合攻撃力"を、"攻撃力(二手技巧無し)"に変更。（勘違いされる方が多かったため)
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/27: グラフ表示キーに技巧期待値と技巧期待値のパーティ平均を追加
                        </li>
                        <li className="list-group-item list-group-item-danger">2016/08/26: 背水グラフの値がおかしくなっていたのを修正
                            (8/25の計算量削減処理でのミス)
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/26: 武器追加時にLvとSLvも選べるようにした</li>
                        <li className="list-group-item list-group-item-success">2016/08/26: 新武器の画像を追加</li>
                        <li className="list-group-item list-group-item-success">2016/08/25: 計算量削減処理を追加 (倍くらい早くなりました)
                        </li>
                        <li className="list-group-item list-group-item-success">2016/08/25: 新武器の情報を武器テンプレートに追加(画像なし)
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/25: カオスルーダーと義賊を追加 /
                            フェリ(SSR)がキャラテンプレートに表示されていない不具合を修正
                        </li>
                        <li className="list-group-item list-group-item-info">2016/08/25: 武器追加時に+を計算できるようにした</li>
                    </ChangeLog>
                </Panel>

                <h3>Tips</h3>
                    <li className="list-group-item list-group-item-info">メイン武器等1本は必ず入れたい武器がある時は最小本数を入力して下さい。</li>
                    <li className="list-group-item list-group-item-info">スキル効果は上部「表示する項目を選択」 → 「キャラ情報・スキル合計値」 → 「スキル合計」で確認できます。(加護適応済みの値)(バフ・サポアビも含む)</li>
                    <li className="list-group-item list-group-item-info">奥義編成の理想を知りたい場合は、ジータタブ「より細かい設定」からチェイン数4選択後、編成一覧上の「優先項目」から「奥義+チェンバダメージ」を選択して下さい。</li>
                    <li className="list-group-item list-group-item-info">上部「背水渾身グラフを開く」を選択するには、その前に編成右側からグラフ「追加」を選択する必要があります。</li>

                <h3>注記</h3>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-info"><font color="#6c2c2f">情報求:</font> 武器やキャラのステータスズレ、Rank200辺りからの基礎攻撃力増加量、キャラの基礎連撃率(現在対応済リストは<a href="https://github.com/MotocalDevelopers/motocal/blob/master/scripts/chara_data_converter.py" target="_blank">こちら</a>の100行辺りから。デフォルト値はDA7%,TA3%)、各種計算式の検証データ。</li>
                    <li className="list-group-item list-group-item-info"><font color="#6c2c2f">未対応:</font> ゲージ200%キャラ、バフの効果ターン・リキャスト、経過ターンで増減するスキル、多数の英雄武器の効果。</li>
                    <li className="list-group-item list-group-item-info">編成データを読み込むとホワイトアウトしてしまう場合があります。恐らく仕様変更が原因なので、新しく編成を作り直すか対策パッチをお待ち下さい。</li>
                    <li className="list-group-item list-group-item-info">乱数や技巧によるブレがあるため、実際のダメージとは多少異なる可能性があります。</li>
                    <li className="list-group-item list-group-item-info">キャラの基礎連撃率やサポアビ等が追加されても既存の編成データは自動で更新されません。キャラの入れ直しをお願いします。</li>
                    <li className="list-group-item list-group-item-info">基本的に考えうる全ての武器編成パターンを計算しますが、計算数が1024通りを超えた場合は合計本数10本の編成のみ算出・比較します。(計算量削減のため)</li>
                    <li className="list-group-item list-group-item-info">パーティ全体の残HP指定と個別の残HP指定のうち、低い方を適用して背水値を計算します。(背水キャラ運用用)</li>
                    <li className="list-group-item list-group-item-info">別枠バフが複数ある場合、スキル効果表示には乗算後の値が出てきます。</li>
                    <li className="list-group-item list-group-item-info">弱体耐性率は目安です。あまり参考にしないで下さい。</li>
                    <li className="list-group-item list-group-item-info">"パーティ平均〇〇"にはSubに配置したキャラも含まれます。</li>
                </ul>

                <h3>LICENSE</h3>
                <ul className="list-group">
                    <li className="list-group-item"> テンプレート用の画像: &copy; Cygames</li>
                    <li className="list-group-item"><a href="http://facebook.github.io/react">React</a>:
                        Copyright &copy; 2013-2016 Facebook Inc. v15.3.0
                    </li>
                    <li className="list-group-item"><a
                        href="http://github.com/dankogai/js-base64">dankogai/js-base64</a>: Copyright &copy; 2014, Dan
                        Kogai <a href="./js-base64/LICENSE.md"> LICENSE </a></li>

                </ul>

                <h3>参考文献</h3>
                以下のサイト・ツイートを参考にさせていただきました。
                <ul className="list-group">
                    <li className="list-group-item"><a href="http://gbf-wiki.com" target="_blank">グランブルーファンタジー(グラブル)攻略wiki</a></li>
                    <li className="list-group-item"><a
                        href="http://hibin0.web.fc2.com/grbr_atk_calc/atk_calc.html" target="_blank">グランブルーファンタジー攻撃力計算機</a></li>
                    <li className="list-group-item"><a
                        href="http://hibin0.web.fc2.com/grbr_weapon_calc/weapon_calc.html" target="_blank">オススメ装備に自信ニキ</a></li>
                    <li className="list-group-item"><a
                        href="http://greatsundome.hatenablog.com/entry/2015/12/09/230544" target="_blank">すんどめ侍のグラブル生活 -
                        【グラブル】武器スキル検証結果</a></li>
                    <li className="list-group-item"><a
                        href="http://greatsundome.hatenablog.com/entry/2015/10/11/175521" target="_blank">すんどめ侍のグラブル生活 -
                        【グラブル】ジョブデータ検証結果</a></li>
                    <li className="list-group-item"><a
                        href="http://greatsundome.hatenablog.com/entry/2015/10/07/114737" target="_blank">すんどめ侍のグラブル生活 -
                        【グラブル】減衰補正検証まとめ</a></li>
                    <li className="list-group-item"><a
                        href="http://greatsundome.hatenablog.com/archive/category/%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E6%A4%9C%E8%A8%BC" target="_blank">すんどめ侍のグラブル生活 -
                        キャラクター検証</a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/hibino_naoki/status/722338377127735296" target="_blank"> @hibino_naoki
                        さんのコルタナ(三手大)検証情報</a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/gekikara_s/status/746274346251882496" target="_blank"> @gekikara_s さんのバハフツ拳検証情報</a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2/status/765508148689985537" target="_blank"> @Hecate_mk2 さんの渾身(大)検証情報</a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/firemagma/status/765632239526830080" target="_blank"> @firemagma さんの渾身(大)検証情報</a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/hibino_naoki/status/765749475457413120" target="_blank"> @hibino_naoki
                        さんの渾身(大)検証情報</a></li>
                    <li className="list-group-item"><a
                        href="http://twitter.com/Hecate_mk2/status/773365651465396225" target="_blank"> @Hecate_mk2 さんの三手検証結果検証結果</a>
                    </li>
                    <li className="list-group-item"><a
                        href="http://twitter.com/umiumipkm/status/773383133739622400" target="_blank"> @umiumipkm さんのコスモスBLの枠についての情報</a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/hakanid/status/770966731271512065/photo/1" target="_blank"> @hakanid
                        さんのセスランス加護量変動検証結果</a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/yah68291/status/730397040891453445" target="_blank"> @yah68291 さんのオールドペルセウス検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="http://gbf.xzz.jp/dev/%E9%98%B2%E5%BE%A1%E5%9B%BA%E6%9C%89%E5%80%A4%E3%83%A1%E3%83%A2/" target="_blank"> 防御固有値メモ
                        - グラメモ</a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2/status/801961194965766144" target="_blank"> @Hecate_mk2 さんの渾身修正検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2/status/809987671326072833" target="_blank"> @Hecate_mk2 さんのネツァ検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/hibino_naoki/status/858792702514573312" target="_blank"> @hibino_naoki
                        さんの攻刃III検証結果 </a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2/status/889634680005414914" target="_blank"> @Hecate_mk2
                        さんの神威(中)、リミットブレイク検証結果 </a></li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/soufflex_/status/893379153478668288" target="_blank"> @soufflex_ さんの新奥義上限に関する情報 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Granblue_GW/status/947109401294389249" target="_blank"> GameWithさん</a>, <a
                        href="https://twitter.com/metalgaldra/status/946360446130327552" target="_blank"> @metalgaldra さん</a>の乱舞効果量に関する情報
                    </li>
                    <li className="list-group-item"><a
                        href="http://hiroxgbf.blog.fc2.com/blog-entry-7.html" target="_blank"> グラブル調べもの記録 - 過去検証まとめ </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/search?f=tweets&q=from%3A%40agavenighto%20%E6%A4%9C%E8%A8%BC&src=typd" target="_blank"> @agavenighto さんの方陣破壊(小)、方陣乱舞(中)検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2/status/1119458102934269953" target="_blank"> @Hecate_mk2 さんの防御値一覧 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://docs.google.com/spreadsheets/d/1kea2IL6wLNbw4RNUcrrxMTpoIdlXU13pYOzBXjgoBbs/edit#gid=199555968" target="_blank"> ポキールさんのグラブル検証置き場 - 奥義性能 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/" target="_blank"> Gamewithさんの諸々のスキル効果量検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="http://gbf-verification.blog.jp/" target="_blank"> グラブル検証Logさんの諸々の検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/Hecate_mk2" target="_blank"> @Hecate_mk2 さんの諸々の検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://docs.google.com/spreadsheets/d/1SUhqwiq3UC7ba7jh22s0mhHJ_33Zi443aRywe-CmURQ/edit#gid=321585253" target="_blank"> スフレさんのLB背水・渾身検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/i/moments/1040200666260459520" target="_blank"> @Duran_grablu さんの方陣技巧検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/CryingOfLot307/status/1134475816065069056" target="_blank"> @CryingOfLot307 さんの技巧中Slv15検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/search?f=tweets&q=from%3A%40usa_akasa%20%E6%A4%9C%E8%A8%BC&src=typd" target="_blank"> @usa_akasa さんの基礎連撃率検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/i/moments/1112721760560926721" target="_blank"> @takeshi310310 さんの基礎連撃率検証結果 </a>
                    </li>
                    <li className="list-group-item"><a
                        href="https://twitter.com/search?f=tweets&vertical=default&q=from%3A%40KST33166653%20%E6%A4%9C%E8%A8%BC&src=typd" target="_blank"> @KST33166653 さんの基礎連撃率検証結果 </a>
                    </li>
                </ul>

                <h3>スキル性能・各種計算式</h3>
                表示する項目 → キャラ情報・スキル合計値 → スキル合計で確認できます。(加護適応済みの値)
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>スキル名/SLv</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                            <th>19</th>
                            <th>20</th>
                        </tr>
                        <tr>
                            <td>通常攻刃(小)</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.4</td>
                            <td>10.8</td>
                            <td>11.2</td>
                            <td>11.6</td>
                            <td>12.0</td>
                            <td>12.2</td>
                            <td>12.4</td>
                            <td>12.6</td>
                            <td>12.8</td>
                            <td>13.0</td>
                        </tr>
                        <tr>
                            <td>通常攻刃(中)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>14.5</td>
                            <td>14.8</td>
                            <td>15.1</td>
                            <td>15.4</td>
                            <td>15.7</td>
                            <td>16.3</td>
                        </tr>
                        <tr>
                            <td>通常攻刃(大)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                            <td>18.4</td>
                            <td>18.8</td>
                            <td>19.2</td>
                            <td>19.6</td>
                            <td>20.0</td>
                        </tr>
                        <tr>
                            <td>通常攻刃II</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>16.8</td>
                            <td>17.6</td>
                            <td>18.4</td>
                            <td>19.2</td>
                            <td>20.0</td>
                            <td>20.4</td>
                            <td>20.8</td>
                            <td>21.2</td>
                            <td>21.6</td>
                            <td>22.0</td>
                        </tr>
                        <tr>
                            <td>通常攻刃III</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>22.5</td>
                            <td>23.0</td>
                            <td>23.5</td>
                            <td>24.0</td>
                            <td>24.5</td>
                        </tr>
                        <tr>
                            <td>通常暴君II</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>18.0</td>
                            <td>19.0</td>
                            <td>20.0</td>
                            <td>21.0</td>
                            <td>22.0</td>
                            <td>23.0</td>
                            <td>23.5</td>
                            <td>24.0</td>
                            <td>24.5</td>
                            <td>25.0</td>
                            <td>25.5</td>
                        </tr>
                        <tr>
                            <td>マグナ攻刃(小)</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.4</td>
                            <td>10.8</td>
                            <td>11.2</td>
                            <td>11.6</td>
                            <td>12.0</td>
                            <td>12.1</td>
                            <td>12.2</td>
                            <td>12.3</td>
                            <td>12.4</td>
                            <td>12.5</td>
                        </tr>
                        <tr>
                            <td>マグナ攻刃(中)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>14.5</td>
                            <td>14.8</td>
                            <td>15.1</td>
                            <td>15.4</td>
                            <td>15.7</td>
                            <td>16.0</td>
                        </tr>
                        <tr>
                            <td>マグナ攻刃(大)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                            <td>18.4</td>
                            <td>18.8</td>
                            <td>19.2</td>
                            <td>19.6</td>
                            <td>20.0</td>
                        </tr>
                        <tr>
                            <td>EX/アンノウン(小)</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.4</td>
                            <td>10.8</td>
                            <td>11.2</td>
                            <td>11.6</td>
                            <td>12.0</td> 
                            <td>12.6</td>
                            <td>13.2</td>
                            <td>13.8</td>
                            <td>14.4</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>EX/アンノウン(中)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>14.5</td>
                            <td>15.0</td>
                            <td>15.5</td>
                            <td>16.0</td>
                            <td>16.5</td>
                            <td>17.0</td>
                        </tr>
                        <tr>
                            <td>EX/アンノウン(大)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                            <td>18.6</td> 
                            <td>19.2</td>
                            <td>19.8</td>
                            <td>20.4</td>
                            <td>21.0</td>
                        </tr>
                        <tr>
                            <td>EX/アンノウン(特大)</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>18.0</td>
                            <td>19.0</td>
                            <td>20.0</td>
                            <td>21.0</td>
                            <td>22.0</td>
                            <td>23.0</td>
                            <td>24.0</td> 
                            <td>25.0</td>
                            <td>26.0</td>
                            <td>27.0</td>
                            <td>28.0</td>
                        </tr>
                        <tr>
                            <td>バハHP(剣など)</td>
                            <td>10.0</td>
                            <td>10.5</td>
                            <td>11.0</td>
                            <td>11.5</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                        </tr>
                        <tr>
                            <td>バハHP(拳など)</td>
                            <td>20.0</td>
                            <td>21.0</td>
                            <td>22.0</td>
                            <td>23.0</td>
                            <td>24.0</td>
                            <td>25.0</td>
                            <td>26.0</td>
                            <td>27.0</td>
                            <td>28.0</td>
                            <td>30.0</td>
                            <td>30.4</td>
                            <td>30.8</td>
                            <td>31.2</td>
                            <td>31.6</td>
                            <td>32.0</td>
                        </tr>
                        <tr>
                            <td>バハ攻(剣など)</td>
                            <td>10.0</td>
                            <td>10.5</td>
                            <td>11.0</td>
                            <td>11.5</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>30.4</td>
                            <td>30.8</td>
                            <td>31.2</td>
                            <td>31.6</td>
                            <td>32.0</td>
                        </tr>
                        <tr>
                            <td>バハ攻(短剣等)</td>
                            <td>20.0</td>
                            <td>21.0</td>
                            <td>22.0</td>
                            <td>23.0</td>
                            <td>24.0</td>
                            <td>25.0</td>
                            <td>26.0</td>
                            <td>27.0</td>
                            <td>28.0</td>
                            <td>30.0</td>
                            <td>30.4</td>
                            <td>30.8</td>
                            <td>31.2</td>
                            <td>31.6</td>
                            <td>32.0</td>
                        </tr>
                        <tr>
                            <td>バハフツHP(短剣等)</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                        </tr>
                        <tr>
                            <td>バハフツ攻(短剣等)</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.4</td>
                            <td>30.8</td>
                            <td>31.2</td>
                            <td>31.6</td>
                            <td>32.0</td>
                        </tr>
                        <tr>
                            <td>バハフツHP(拳等)</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.0</td>
                            <td>30.4</td>
                            <td>30.8</td>
                            <td>31.2</td>
                            <td>31.6</td>
                            <td>32.0</td>
                        </tr>
                        <tr>
                            <td>バハフツDA率</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>5.0</td>
                            <td>5.6</td>
                            <td>6.2</td>
                            <td>6.8</td>
                            <td>7.4</td>
                            <td>8.0</td>
                        </tr>
                        <tr>
                            <td>バハフツTA率</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>0.0</td>
                            <td>5.0</td>
                            <td>5.4</td>
                            <td>5.8</td>
                            <td>6.2</td>
                            <td>6.6</td>
                            <td>7.0</td>
                        </tr>
                        <tr>
                            <td>通常守護(小)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.4</td>
                            <td>12.8</td>
                            <td>13.2</td>
                            <td>13.6</td>
                            <td>14.0</td>
                        </tr>
                        <tr>
                            <td>通常守護(中)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.4</td>
                            <td>15.8</td>
                            <td>16.2</td>
                            <td>16.6</td>
                            <td>17.0</td>
                        </tr>
                        <tr>
                            <td>通常守護(大)</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>18.0</td>
                            <td>18.6</td>
                            <td>19.2</td>
                            <td>19.8</td>
                            <td>20.4</td>
                            <td>21.0</td>
                        </tr>
                        <tr>
                            <td>通常守護(特大)</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>18.0</td>
                            <td>19.0</td>
                            <td>20.0</td>
                            <td>21.0</td>
                            <td>22.0</td>
                            <td>23.0</td>
                            <td>24.0</td>
                        </tr>
                        <tr>
                            <td>マグナ守護(小)</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.4</td>
                            <td>10.8</td>
                            <td>11.2</td>
                            <td>11.6</td>
                            <td>12.0</td>
                        </tr>
                        <tr>
                            <td>マグナ守護(中)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                        </tr>
                        <tr>
                            <td>マグナ守護(大)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>マグナ守護II</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.6</td>
                            <td>16.2</td>
                            <td>16.8</td>
                            <td>17.4</td>
                            <td>18.0</td>
                        </tr>
                        <tr>
                            <td>アンノウンVIT(小)</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.0</td>
                            <td>10.0</td>
                            <td>10.0</td>
                            <td>10.0</td>
                            <td>10.0</td>
                        </tr>
                        <tr>
                            <td>アンノウンVIT(中)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                            <td>12.0</td>
                        </tr>
                        <tr>
                            <td>アンノウンVIT(大)</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                            <td>15.0</td>
                        </tr>
                        <tr>
                            <td>二手三手(小)</td>
                            <td>0.25</td>
                            <td>0.50</td>
                            <td>0.75</td>
                            <td>1.00</td>
                            <td>1.25</td>
                            <td>1.50</td>
                            <td>1.75</td>
                            <td>2.00</td>
                            <td>2.25</td>
                            <td>2.5</td>
                            <td>2.7</td>
                            <td>2.9</td>
                            <td>3.1</td>
                            <td>3.3</td>
                            <td>3.5</td>
                        </tr>
                        <tr>
                            <td>二手三手(中)</td>
                            <td>0.8</td>
                            <td>1.1</td>
                            <td>1.4</td>
                            <td>1.7</td>
                            <td>2.0</td>
                            <td>2.3</td>
                            <td>2.6</td>
                            <td>2.9</td>
                            <td>3.2</td>
                            <td>3.5</td>
                            <td>3.8</td>
                            <td>4.1</td>
                            <td>4.4</td>
                            <td>4.7</td>
                            <td>5.0</td>
                        </tr>
                        <tr>
                            <td>二手三手(大)</td>
                            <td>1.2</td>
                            <td>1.6</td>
                            <td>2.0</td>
                            <td>2.4</td>
                            <td>2.8</td>
                            <td>3.2</td>
                            <td>3.6</td>
                            <td>4.0</td>
                            <td>4.4</td>
                            <td>5.0</td>
                            <td>5.4</td>
                            <td>5.8</td>
                            <td>6.2</td>
                            <td>6.6</td>
                            <td>7.0</td>
                        </tr>
                        {/*<tr><td>マグナ二手(小)</td><td>0.4</td><td>0.6</td><td>0.8</td><td>1.0</td><td>1.2</td><td>1.4</td><td>1.6</td><td>1.8</td><td>2.0</td><td>2.2</td><td>2.4</td><td>2.6</td><td>2.8</td><td>3.0</td><td>3.2</td></tr>
                <tr><td>マグナ二手(中)</td><td>0.7</td><td>1.0</td><td>1.3</td><td>1.6</td><td>1.9</td><td>2.2</td><td>2.5</td><td>2.8</td><td>3.1</td><td>3.4</td><td>3.7</td><td>4.0</td><td>4.3</td><td>4.6</td><td>4.9</td></tr>
                <tr><td>マグナ二手(大)</td><td>1.0</td><td>1.4</td><td>1.8</td><td>2.2</td><td>2.6</td><td>3.0</td><td>3.4</td><td>3.8</td><td>4.2</td><td>4.6</td><td>5.0</td><td>5.4</td><td>5.8</td><td>6.2</td><td>6.6</td></tr>*/}
                        <tr>
                            <td>技巧(小)</td>
                            <td>1.0</td>
                            <td>1.1</td>
                            <td>1.2</td>
                            <td>1.3</td>
                            <td>1.4</td>
                            <td>1.5</td>
                            <td>1.6</td>
                            <td>1.7</td>
                            <td>1.9</td>
                            <td>2.0</td>
                            <td>2.2</td>
                            <td>2.4</td>
                            <td>2.6</td>
                            <td>2.8</td>
                            <td>3.0</td>
                        </tr>
                        <tr>
                            <td>技巧(中)</td>
                            <td>3.2</td>
                            <td>3.4</td>
                            <td>3.6</td>
                            <td>3.8</td>
                            <td>4.0</td>
                            <td>4.2</td>
                            <td>4.4</td>
                            <td>4.6</td>
                            <td>4.8</td>
                            <td>5.0</td>
                            <td>5.3</td>
                            <td>5.6</td>
                            <td>5.9</td>
                            <td>6.2</td>
                            <td>6.5</td>
                        </tr>
                        <tr>
                            <td>技巧(大)</td>
                            <td>4.4</td>
                            <td>4.8</td>
                            <td>5.2</td>
                            <td>5.6</td>
                            <td>6.0</td>
                            <td>6.4</td>
                            <td>6.8</td>
                            <td>7.2</td>
                            <td>7.6</td>
                            <td>8.0</td>
                            <td>8.4</td>
                            <td>8.8</td>
                            <td>9.2</td>
                            <td>9.6</td>
                            <td>10.0</td>
                        </tr>
                        <tr>
                            <td>通常乱舞TA(小)</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.0</td>
                            <td>1.2</td>
                            <td>1.4</td>
                            <td>1.6</td>
                            <td>1.8</td>
                            <td>2.0</td>
                        </tr>
                        <tr>
                            <td>マグナ乱舞TA(中)</td>
                            <td>0.18</td>
                            <td>0.31</td>
                            <td>0.44</td>
                            <td>0.57</td>
                            <td>0.7</td>
                            <td>0.83</td>
                            <td>1.96</td>
                            <td>1.09</td>
                            <td>1.22</td>
                            <td>1.35</td>
                            <td>1.48</td>
                            <td>1.61</td>
                            <td>1.74</td>
                            <td>1.87</td>
                            <td>2.0</td>
                        </tr>
                        <tr>
                            <td>マグナ破壊(中)</td>
                            <td>0.4</td>
                            <td>0.55</td>
                            <td>0.7</td>
                            <td>0.85</td>
                            <td>1.0</td>
                            <td>1.15</td>
                            <td>1.3</td>
                            <td>1.45</td>
                            <td>1.6</td>
                            <td>1.75</td>
                            <td>1.9</td>
                            <td>2.05</td>
                            <td>2.20</td>
                            <td>2.35</td>
                            <td>2.5</td>
                        </tr>
                        <tr>
                            <td>楚歌(1本目)</td>
                            <td>3.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>8.0</td>
                            <td>8.0</td>
                            <td>8.0</td>
                            <td>8.0</td>
                            <td>8.0</td>
                        </tr>
                        <tr>
                            <td>先制の刃(中)</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                            <td>16.0</td>
                            <td>17.0</td>
                            <td>18.0</td>
                            <td>19.0</td>
                            <td>20.0</td>
                        </tr>
                        <tr>
                            <td>鷲王の結界(中)</td>
                            <td>6.0</td>
                            <td>6.5</td>
                            <td>7.0</td>
                            <td>7.5</td>
                            <td>8.0</td>
                            <td>8.5</td>
                            <td>9.0</td>
                            <td>9.5</td>
                            <td>10.0</td>
                            <td>10.5</td>
                            <td>11.0</td>
                            <td>11.5</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>23.0</td>
                        </tr>
                        <tr>
                            <td>追牙・肆</td>
                            <td>1.0</td>
                            <td>2.0</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>10.4</td>
                            <td>10.8</td>
                            <td>11.2</td>
                            <td>11.6</td>
                            <td>12.0</td>
                            <td>12.2</td>
                            <td>12.4</td>
                            <td>12.6</td>
                            <td>12.8</td>
                            <td>13.0</td>
                        </tr>
                        <tr>
                            <td>秘奥/必殺(奥義ダメージ) (小)</td>
                            <td>0.5</td>
                            <td>1.0</td>
                            <td>1.5</td>
                            <td>2.0</td>
                            <td>2.5</td>
                            <td>3.0</td>
                            <td>3.5</td>
                            <td>4.0</td>
                            <td>4.5</td>
                            <td>5.0</td>
                            <td>5.5</td>
                            <td>6.0</td>
                            <td>6.5</td>
                            <td>7.0</td>
                            <td>7.5</td>
                        </tr>
                        <tr>
                            <td>秘奥/必殺(奥義ダメージ) (中)</td>
                            <td>2.5</td>
                            <td>3.0</td>
                            <td>3.5</td>
                            <td>4.0</td>
                            <td>4.5</td>
                            <td>5.0</td>
                            <td>5.5</td>
                            <td>6.0</td>
                            <td>6.5</td>
                            <td>7.0</td>
                            <td>7.5</td>
                            <td>8.0</td>
                            <td>8.5</td>
                            <td>9.0</td>
                            <td>9.5</td>
                        </tr>
                        <tr>
                            <td>秘奥/必殺(奥義ダメージ) (大)</td>
                            <td>5.5</td>
                            <td>5.0</td>
                            <td>6.5</td>
                            <td>6.0</td>
                            <td>7.5</td>
                            <td>7.0</td>
                            <td>8.5</td>
                            <td>8.0</td>
                            <td>9.5</td>
                            <td>10.0</td>
                            <td>10.5</td>
                            <td>11.0</td>
                            <td>11.5</td>
                            <td>12.0</td>
                            <td>12.5</td>
                        </tr>
                        <tr>
                            <td>必殺(奥義上限) (中)</td>
                            <td>0.8</td>
                            <td>1.1</td>
                            <td>1.4</td>
                            <td>1.7</td>
                            <td>2.0</td>
                            <td>2.3</td>
                            <td>2.6</td>
                            <td>2.9</td>
                            <td>3.2</td>
                            <td>3.5</td>
                            <td>3.8</td>
                            <td>4.1</td>
                            <td>4.4</td>
                            <td>4.7</td>
                            <td>5.0</td>
                        </tr>
                        <tr>
                            <td>必殺(奥義上限) (大)</td>
                            <td>1.2</td>
                            <td>1.6</td>
                            <td>2.0</td>
                            <td>2.4</td>
                            <td>2.8</td>
                            <td>3.2</td>
                            <td>3.6</td>
                            <td>4.0</td>
                            <td>4.4</td>
                            <td>4.8</td>
                            <td>5.2</td>
                            <td>5.6</td>
                            <td>6.0</td>
                            <td>6.4</td>
                            <td>6.8</td>
                        </tr>
                        <tr>
                            <td>英傑(CB)</td>
                            <td>3.0</td>
                            <td>4.0</td>
                            <td>5.0</td>
                            <td>6.0</td>
                            <td>7.0</td>
                            <td>8.0</td>
                            <td>9.0</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>12.5</td>
                            <td>13.0</td>
                            <td>13.5</td>
                            <td>14.0</td>
                            <td>14.5</td>
                        </tr>
                        <tr>
                            <td>英傑(奥義上限)</td>
                            <td>1.2</td>
                            <td>1.6</td>
                            <td>2.0</td>
                            <td>2.4</td>
                            <td>2.8</td>
                            <td>3.2</td>
                            <td>3.6</td>
                            <td>4.0</td>
                            <td>4.4</td>
                            <td>4.8</td>
                            <td>5.2</td>
                            <td>5.6</td>
                            <td>6.0</td>
                            <td>6.4</td>
                            <td>6.8</td>
                        </tr>
                        <tr>
                            <td>イクシード(奥義上限)</td>
                            <td>5.5</td>
                            <td>6.0</td>
                            <td>6.5</td>
                            <td>7.0</td>
                            <td>7.5</td>
                            <td>8.0</td>
                            <td>8.5</td>
                            <td>9.0</td>
                            <td>9.5</td>
                            <td>10.0</td>
                            <td>11.0</td>
                            <td>12.0</td>
                            <td>13.0</td>
                            <td>14.0</td>
                            <td>15.0</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">神威: 攻刃の値を攻刃と守護として扱う</li>
                    <li className="list-group-item">刹那: 技巧 + 攻刃</li>
                    <li className="list-group-item">克己: 技巧 + 二手</li>
                    <li className="list-group-item">刃界: HP + 技巧</li>
                    <li className="list-group-item">無双: 攻刃 + 二手</li>
                    <li className="list-group-item">乱舞: 攻刃 + 三手(二手は上昇しない)</li>
                    <li className="list-group-item">軍神: 守護 + 二手(軍神)</li>
                    <li className="list-group-item">暴君: 攻刃(大) + HP減少(10%)</li>
                    <li className="list-group-item">暴君II: 攻刃(暴君II) + HP減少(10%)</li>
                    <li className="list-group-item">羅刹: 攻刃 + (DA率-20%)</li>
                    <li className="list-group-item">破壊: 三手(破壊)(二手は上昇しない)</li>
                    <li className="list-group-item">楚歌,先制: 1本目しか発動しない</li>
                    <li className="list-group-item">括目: 二手</li>
                    <li className="list-group-item">アンノウン暴君(ミフネ): アンノウン攻刃(大) + HP減少(7%)</li>
                    <li className="list-group-item">技巧(小, 中, 大): クリティカル時倍率 50%</li>
                    <li className="list-group-item">背水(小): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは
                        (Slv10以下) -0.3 + Slv * 1.8, (Slv10以上) 18.0 + 3.0 * (Slv - 10) / 5.0
                    </li>
                    <li className="list-group-item">背水(中): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは
                        (Slv10以下) -0.4 + Slv * 2.4, (Slv10以上) 24.0 + 6.0 * (Slv - 10) / 5.0
                    </li>
                    <li className="list-group-item">背水(大): (baseRate/3) * (2 * 残りHP割合^2 - 5 * 残りHP割合 + 3) <br/>(baseRateは
                        (Slv10以下) -0.5 + Slv * 3.0, (Slv10以上) 30.0 + 7.5 * (Slv - 10) / 5.0
                    </li>
                    <li className="list-group-item">渾身: <a target="_blank"
                                                           href="http://binarysblog.blog.fc2.com/blog-entry-1.html">こちらを参照</a>
                    </li>
                    <li className="list-group-item">紅蓮の呪印: 通常攻刃(大)</li>
                    <li className="list-group-item">紅蓮の呪印・弐: パーティ2番目のキャラに通常攻刃(大)(ゼウス石は<s>乗らない</s>乗る)</li>
                    <li className="list-group-item">霧氷の追牙・肆: パーティ4番目のキャラに追加ダメージ / 奥義ゲージ上昇量 - 30%</li>
                    <li className="list-group-item">攻撃回数期待値: 3.0 * TA率 + (1.0 - TA率) * (2.0 * DA率 + (1.0 - DA率))
                        (TA→DAの順で判定、TA率が100％なら3回、TA率0％でDA率100％なら2回)
                    </li>
                    <li className="list-group-item">技巧期待値: 通常技巧の複数発動分も計算してます</li>
                    <li className="list-group-item">基礎HP: 600 + 8 * rank(100まで) + 4 * (rank - 100)</li>
                    <li className="list-group-item">奥義上限枠: [通常必殺枠(上限30%)、方陣必殺枠(上限30%)、イクシード枠(上限30%)](上限60%)、四象邪系枠(上限20%)、オメガ枠(上限15%)</li>
                </ul>
            </div>
        );
    },

});

module.exports = Notice;
