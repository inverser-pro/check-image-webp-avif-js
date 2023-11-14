<?php

define('SITESETTINGSJSON',APP.'templates/cassiopeia/siteSettings.json');

if(!isset($_SESSION['wp'])){//once create
    if( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false ) {
        $_SESSION['wp']=4;//supported 4
    }else{
        $_SESSION['wp']=3;//not supported
    }
}
function clear($data,$email=false){
    if(!$email) {
        $email = '@';
    }else{
        $email=null;
    }
    $array1 = array('%','\x','--','/*',$email,'\\','#','*/','//','wss:','ws:','blob:','localhost','http:','https:','script', 'base64','mysql','union','select','update','global','integer','between','where','\0x','delete','drop','information','schema');
    $data = strip_tags($data);
    $data = htmlspecialchars($data, ENT_QUOTES);
    $data = trim($data);
    $data = filter_var($data,FILTER_SANITIZE_STRING);
    return str_ireplace($array1, '_^_', $data);
}
function ob_html_compress($buf){
    $ret=preg_replace(array('/<!--(.*)-->/Uis',"/[[:blank:]]+/"),array('',' '),str_replace(array("\n","\r","\t"),'',$buf));
    $ret=preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $ret);
    #//$ret=preg_replace('~\\\\(?!n)~', '', $ret);
    #//$ret=str_replace(array('; ',' { ','> <','} .'),array(';','{','><','}.',),$ret);
    return str_replace(
        array('; ',' { ','> <','} .',' = ',': "','{ ','} }',') }',', {','"> '),
        array(';', '{',  '><', '}.', '=',  ':"', '{', '}}', ')}', ',{','">')
        ,$ret);
}
if(!function_exists('ip')){

    function ip()
    {
        $ip='';
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip=$_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip=$_SERVER['REMOTE_ADDR'];
        }
        if(!filter_var($ip, FILTER_VALIDATE_IP)){
            return '127.0.0.1';
        }
        return $ip;
    }
}
function url(){
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    }else{$protocol = 'http';}
    return $protocol . "://" . $_SERVER['HTTP_HOST'];
}
function decrypt_($data,$clear=true){
    $method = "aes-256-cbc";
    $pass = "278fdg21dfg1fdg1d014";
    $iv = '9874-88-11447e8u';
    $data = base64_decode(base64_decode($data));
    $data = openssl_decrypt($data, $method, $pass, true, $iv);
    $data=($clear)?clear($data):$data;
    return $data;
}

function crypt_($data){
    $method = "aes-256-cbc";
    $pass = "278fdg21dfg1fdg1d014";
    $iv = '9874-88-11447e8u';
    $data = openssl_encrypt($data, $method, $pass, true, $iv);
    return base64_encode(base64_encode($data));
}

function length($str){
    return iconv_strlen($str,'UTF-8');
}
function checkEmptyReturn($array){
    foreach ($array as $q){
        if(empty($q)){
            return false;
        }
    }
    return true;
}
function x($ar){
    if(is_array($ar)){
        foreach ($ar as $k=>$v){
            if($v=="" AND $k!="d"){
                unset($ar[$k]);
            }
        }
        return $ar;
    }else{
        return $ar;
    }
}
function json($stateTxt,$text='',$script='',$customScript='',$webp='',$compressHtml=NULL){
    $script=str_ireplace(['<script>','</script>'], '', $script);
    if($webp===4){$webp='1';}
    if($webp===0){$webp='0';}
    if($compressHtml===0){//No compress HTML (for `fulltext`)
        if(empty($script)){
            return json_encode(x(['s'=>$stateTxt,'d'=>$text,'c'=>ob_html_compress($customScript),'wp'=>$webp]),JSON_UNESCAPED_UNICODE);
        }else{
            return json_encode(x(['s'=>$stateTxt,'d'=>$text,'j'=>ob_html_compress($script),'c'=>ob_html_compress($customScript),'wp'=>$webp]),JSON_UNESCAPED_UNICODE);
        }
    }else{
        if(empty($script)){
            return json_encode(x(['s'=>$stateTxt,'d'=>ob_html_compress($text),'c'=>$customScript,'wp'=>$webp]),JSON_UNESCAPED_UNICODE);
        }else{
            return json_encode(x(['s'=>$stateTxt,'d'=>ob_html_compress($text),'j'=>ob_html_compress($script),'c'=>$customScript,'wp'=>$webp]),JSON_UNESCAPED_UNICODE);
        }
    }
}

function checkToken($token){
    $val=decrypt_($token);
    $ar=explode('|',$val);
    if(count($ar)!==2){
        echo 'err sdf1';return false;
        // getenv('HTTP_USER_AGENT').'|'.ip()
    }
    if(getenv('HTTP_USER_AGENT')!==$ar[0]){
        echo 'err df1g';return false;
    }
    if(ip()!==$ar[1]){
        echo 'err frkf';return false;
    }
    return true;
}