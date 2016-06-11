<?php
    header("Content-type: text/plain; charset=UTF-8");
    // APIキーの設定
    $api_key = 'AIzaSyBRN9yshOoNByfs4pGLX3LnTVUJWalrOAk';
    $postURL = "https://www.googleapis.com/urlshortener/v1/url?key=" . $api_key;
    $before_url = '';

    // GETメソッドで指定がある場合は上書き
    if( isset( $_GET['url'] ) && !empty( $_GET['url'] ) ) {
        $before_url = $_GET['url'] ;
    } else {
        exit;
    }

    // cURLを利用してリクエスト
    $curl = curl_init() ;
    curl_setopt( $curl, CURLOPT_URL , $postURL ) ;
    curl_setopt( $curl, CURLOPT_HTTPHEADER, array( 'Content-type: application/json' ) );       // JSONの送信
    curl_setopt( $curl, CURLOPT_CUSTOMREQUEST , 'POST' ) ;                      // POSTメソッド
    curl_setopt( $curl, CURLOPT_POSTFIELDS, json_encode( array( 'longUrl' => $before_url ) ) ) ;                // 送信するJSONデータ
    curl_setopt( $curl, CURLOPT_HEADER, 1 ) ;                                           // ヘッダーを取得する
    curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, false ) ;                       // 証明書の検証を行わない
    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true ) ;                        // curl_execの結果を文字列で返す
    curl_setopt( $curl, CURLOPT_TIMEOUT, 15 ) ;                                         // タイムアウトの秒数
    curl_setopt( $curl, CURLOPT_FOLLOWLOCATION , true ) ;                       // リダイレクト先を追跡するか？
    curl_setopt( $curl, CURLOPT_MAXREDIRS, 5 ) ;                                        // 追跡する回数
    $res1 = curl_exec( $curl ) ;
    $res2 = curl_getinfo( $curl ) ;
    curl_close( $curl ) ;

    // 取得したデータ
    $json = substr( $res1, $res2['header_size'] ) ;             // 取得したデータ(JSONなど)
    $header = substr( $res1, 0, $res2['header_size'] ) ;        // レスポンスヘッダー (検証に利用したい場合にどうぞ)

    echo $json;
    exit;

    // 取得したJSONをオブジェクトに変換
    $obj = json_decode( $json ) ;

    // 成功時
    if( isset( $obj->id ) && !empty( $obj->id ) ) {
        $shorten_url = $obj->id ;
        echo $shorten_url;
    // 失敗時
    } else {
        echo "error!". $before_url;
    }
?>
