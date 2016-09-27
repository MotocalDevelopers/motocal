var React = require('react');
var ReactDOM = require('react-dom');
var {Thumbnail, ControlLabel, Button, ButtonGroup, FormControl, Checkbox, Modal, Image, Popover} = require('react-bootstrap');

var HowTo = React.createClass({
    render: function(){
        return (
            <div className="howTo">
                <h2>この計算機について</h2>
                <p>元カレ計算機（グラブル攻撃力計算機）は、入力された情報を元に、「どのような武器編成が最大の火力を出せるか」を比較算出するためのツールです。</p>
                <p className="text-info">本計算機は「編成の比較をすること」がメインの計算機です。入力が面倒だし特定の武器編成の攻撃力だけ見られればいい！という方は <a href="http://gbf.xzz.jp">グラブル装備シミュレータ</a> のがオススメです。</p>

                <h2>使い方</h2>
                <p>基本的に各項目を埋めていけば、それに従って結果が自動的に更新されます。(選択メニューは値を選択した時点、入力フォームは値を入力した後にフォーム外をクリックする等の操作を行った際に、新しい結果が算出されます。)</p>
                <p>以下、各項目について説明します。</p>

                <hr/>
                <h3>入力 / Input タブ</h3>
                <Thumbnail src="./otherImages/prof_howto.png" href="./otherImages/prof_howto.png"><h3>プロフィール入力例</h3></Thumbnail>
                <p>ジータに関する情報や、パーティ全体へのバフ、敵の属性などを入力します。</p>
                <p>ジータの属性はスキルの計算に、敵の属性は有利不利判定の計算に使用されますので、 どちらもお忘れなく入力して下さい。
                また、得意武器補正やジョブごとの攻撃ボーナス等（例: ベルセルクマスター時 攻撃力+6000)は、ジョブを選択すれば自動的に適用されます。（マスターしていない場合(Lv20以下)は考慮していません。）
                得意武器補正やボーナスなしで計算したい場合、ジョブ欄で「なし」を選択して下さい。</p>
                <p>背水計算用の残HP割合は、</p>
                <dl className="dl-horizontal">
                    <dt>パーティ全体への効果: </dt><dd>パーティ全員のHPが下がっているとして攻撃力を算出</dd>
                    <dt>ジータ残HP: </dt><dd>ジータだけHPが下がった攻撃力を算出</dd>
                    <dt>どちらも変更されている: </dt><dd>残割合が低い方を適用</dd>
                </dl>
                <p>として計算します。（キャラごとの残HP割合もキャラタブにて設定可能です。)</p>

                <hr/>
                <h3>召喚石 / Summon タブ</h3>
                <Thumbnail src="./otherImages/summon_input_howto.png" href="./otherImages/summon_input_howto.png"><h3>召喚石入力例</h3></Thumbnail>
                <p>召喚石の情報を入力します。攻撃力とHPは、下記画像の通り、すべての召喚石の値が合計されたものを入力してください。</p>
                <Thumbnail src="./otherImages/summon_howto.png">
                </Thumbnail>

                <hr/>
                <h3>キャラ / Chara タブ</h3>
                <Thumbnail src="./otherImages/chara_howto.png" href="./otherImages/chara_howto.png"><h3>キャラ入力例</h3></Thumbnail>
                <p>キャラの情報を入力します。「キャラテンプレートを開く」ボタンから任意のキャラを選択することで、既存のキャラ情報を入力することが可能です。</p>
                <p>現在、キャラごとの基礎DA/TA率についてはテンプレートからの入力をサポートしていません。個別に設定したい場合、直接入力を行って下さい。</p>
                <p>キャラクターの情報は「パーティ平均値」を計算するときにのみ考慮されます。ジータのみの情報を計算する場合にはキャラの情報を入力する必要はありません。</p>

                <hr/>
                <h3>武器 / Weapon タブ</h3>
                <Thumbnail src="./otherImages/weapon_howto.png" href="./otherImages/weapon_howto.png"><h3>武器入力例</h3></Thumbnail>
                <p>武器の情報を入力します。ここに入力された一覧から、最適な武器編成が算出されます。キャラと同様「武器テンプレートを開く」ボタンから、既存の武器情報を入力することが可能です。</p>
                <p>"考慮本数"とは、最小で何本、最大で何本所持しているかを入力する欄です。例えば、ある武器を3本持っていて、それが何本編成に入るのかを算出したい場合、最小考慮本数(min)を0本、最大考慮本数(max)を3本に設定して下さい。</p>
                <p>メイン武器等、必ず1本以上入れたい場合は最小考慮本数を1本以上に設定して下さい。</p>
                <p>コスモス武器も複数設定することが可能ですが、2本以上は同時に編成されないようになっています。</p>

                <hr/>
                <h3>保存・注記 / System タブ</h3>
                <p>データの保存などを行うことができます。</p>
                <p>"保存"ボタンはお使いのブラウザにデータを保存します。この場合、ブラウザを変えると保存されたデータは読み出せません。</p>
                <p>データを他人に公開したい場合、もしくはブラウザを変えても結果が読み出せるようにしたい場合、"サーバに保存"ボタンを使用して下さい。
                hsimyu.net/motocal/?id=数字 の形のURLにアクセスすることで、いつでもデータを読み出せるようになります。</p>
                <p>上記の各タブの入力例をそのまま保存したものが<a href="http://hsimyu.net/motocal/?id=1101">こちら</a>です。ご参考になれば幸いです。</p>

                <hr/>
                <h3>結果 / Result タブ</h3>
                <p>他のすべてのタブの入力を基に算出された計算結果が表示されます。（PC版ではタブ分けされていません。）
                上部の「優先する項目」を変更することで、どの項目を優先するのかを選択することができます。</p>
                <p>また、表示したい項目にチェックを入れることで、攻撃力やダメージ以外にも様々な情報を表示することができます。</p>

                <hr/>
                <h2>開発情報</h2>
                <p>元カレ計算機は <a href="https://twitter.com/hsimyu/">@hsimyu</a> with ゼタの元カレ団 が開発しています。
                ソースコードは<a href="https://github.com/hoshimi/motocal">github</a>にて公開しています。
                ご要望のある方はPull requestを送って下さい。</p>
            </div>
        );
    },
});

module.exports = HowTo
