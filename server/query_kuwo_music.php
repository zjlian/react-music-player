<?php

//发起一个http请求，参数1为url,参数2为请求方式
function requestByCurl($remote_server, $post_string) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $remote_server);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'mypost=' . $post_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, "snsgou.com's CURL Example beta");
    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}
//解析酷我音乐的搜索api的返回结果中的MUSICRID,参数是queryMusicAll()的返回值,返回值是一个数组
function getMusicRid($str) {
    $result = array();
    $pattern = "|'MUSICRID':'(MUSIC_\d+)',|";
    preg_match_all($pattern, $str, $result, PREG_PATTERN_ORDER);

    return $result[1];
}
//请求酷我音乐搜索api，获取返回音乐信息，参数为要搜索的歌曲名
function queryMusicAll($str) {
    $data = requestByCurl(
        "http://search.kuwo.cn/r.s?all=".$str."&ft=music&client=kt&pn=0&rn=6&rformat=json&encoding=utf8",
        "GET"
    );
    return $data;
}
//请求酷我音乐搜索api,获取返回对应RID的具体音乐信息，参数为RID
function getMusicInfoByRid($RID) {
    $url = "http://player.kuwo.cn/webmusic/st/getNewMuiseByRid?rid=".$RID;
    $data = requestByCurl($url, "GET");
    return $data;
}

function analysisXMLTage($str, $tagName) {
    $result = array();
    $pattern = "|<".$tagName.">(.*)</".$tagName.">|";
    preg_match_all($pattern, $str, $result, PREG_PATTERN_ORDER);
    return $result[1][0];
}

function queryMusic($querystr) {
    $infos = array();
    $allInfo = queryMusicAll($querystr);
    $musicRids = getMusicRid($allInfo);
    foreach($musicRids as $key => $rid) {
        $xml = getMusicInfoByRid($rid);
        $tmp = array(
            "name" => analysisXMLTage($xml, "name"),
            "singer" => analysisXMLTage($xml, "singer"),
            "special" => analysisXMLTage($xml, "special"),
            "url" => ("http://".analysisXMLTage($xml, "mp3dl")."/resource/".analysisXMLTage($xml, "mp3path")),
            "cover" => analysisXMLTage($xml, "artist_pic"),
        );
        $infos[$key] = $tmp;
    }

    return $infos;
}
//queryMusic("陀飞轮");
//var_dump(queryMusic("陀飞轮"));
