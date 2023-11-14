<?php
if(count(get_included_files()) ==1) {
    http_response_code(404);
    header("Location: /-404");
    exit;
}
#FETCH
if($_SERVER['REQUEST_METHOD']=='POST' && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])){
    //session_start();
    if(!isset(getallheaders()['X-Token'])){
        header('HTTP/1.0 403 Forbidden');
        echo json('0','F0010. Error.');
        exit;
    }
    $token=getallheaders()['X-Token'];
    if(empty($token)){
        header('HTTP/1.0 403 Forbidden');
        echo json('0','F0011. Error.');
        exit;
    }
    if(!checkToken($token)){//html input type hidden token
        header('HTTP/1.0 403 Forbidden');
        echo json('0','F0012. Error.');
        exit;
    }
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    /**
     * object(stdClass)#1 (3) {
    ["location_"]=>
    string(27) "https://r.pro/#"
    ["set"]=>
    string(8) "feedback"
    ["data"]=>
    object(stdClass)#2 (4) {
        ["name"]=>
        string(21) "Name"
        ["phone"]=>
        string(10) "5555555555"
        ["text"]=>
        string(26) "fghfghhhhhhhhh hhhhhhhhhhh"
        ["mailto"]=>
        string(60) "ZmN0WU1DZ29RNmV6dytVWFhlT0I1UTNOT1Q5OEhZa1dJMXFDd1JGRFRZdz0="
    }
    }

     */
    if(empty($json)){
        http_response_code(403);
        exit;
    }
    if (stripos($data->location_,url())!==false
        && stripos($_SERVER['HTTP_REFERER'],url())!==false
        && $_SERVER['HTTPS'] == 'on'
        && $_SERVER['CONTENT_TYPE'] == 'application/json'
    ){
        header('Content-Type: application/json');
        if (!empty($data->set)){
            if($data->set==='setThemeWhite'){
                $theme=(int)$data->data;
                var_dump($eeeeee);
                if($theme!==0&&$theme!==1){
                    echo json('0','set err');
                    exit;
                }
                $_SESSION['theme']=$theme;

//var_dump($eeeeee);
                echo json('1','set ok');
                exit;
            }
            if($data->set=='feedback'){
                /**  $data->data
                 * object(stdClass)#2 (4) {
                ["name"]=>
                string(21) "2023-01-22_ALL_DB_DEV"
                ["phone"]=>
                string(10) "5555555555"
                ["text"]=>
                string(26) "fghfghhhhhhhhh hhhhhhhhhhh"
                ["mailto"]=>
                string(60) "ZmN0WU1DZ29RNmV6dytVWFhlT0I1UTNOT1Q5OEhZa1dJMXFDd1JGRFRZdz0="
                }
                 */
                if(!isset($data->data->phone) OR !isset($data->data->mailto) OR empty($data->data->phone) OR strlen($data->data->phone)<8){// name & tel
                    echo json('0','Error 010. Проверьте введённые данные');
                    exit;
                }
                $name=$data->data->name;
                $phone=$data->data->phone;
                $header='';
                if(isset($data->data->phone)) {
                    $header = 'Покупка/Обращение: '.clear($data->data->header)."\n";
                }
                $name=clear($name);
                $nameLength=length($name);
                $phone=clear($phone);
                $phoneLength=length($phone);
                $text=$data->data->text;
                $text=clear($text);

                $emailTO=$data->data->mailto;
                if(!isset($emailTO)){echo json('0','Error 01921');exit;}
                $emailTO=clear(decrypt_($emailTO,0),true);
                if($nameLength<2 OR $nameLength>90){
                    echo json('0','Проверьте имя.');
                    exit;
                }
                if($phoneLength<6 OR $phoneLength>90){
                    echo json('0','Проверьте номер тел.');
                    exit;
                }
                $date=date("Y-m-d H:i:s");
                $message='<h3>'.getenv('HTTP_HOST').'</h3><pre>'.$header.'Имя: '.$name."\nТел.: ".$phone."\nОбращение: ".$text.'</pre><hr />USER_AGENT: '.getenv('HTTP_USER_AGENT')."\n<br />IP: ".ip()."\n<br /><hr />{$data->location_}<hr /><br/>";
                $message.=getenv('HTTP_HOST').'|fetch</pre>';
                $siteName=$siteEmail='';
                if(file_exists(SITE_SETTINGS)){
                    $siteSettings=file_get_contents(SITE_SETTINGS);
                    $siteSet=json_decode($siteSettings);
                    if(isset($siteSet->emailTo)&&isset($siteSet->companyName)) {
                        $siteEmail = trim($siteSet->emailTo);
                        $siteName=trim($siteSet->companyName);
                        if($siteEmail!==$emailTO) {
                            echo json(1,'ok','
                            <script>(()=>{
                            alt("Возникла ошибка 098. Свяжитесь с нашим менеджером по email или телефону");
                            const inp=a(".contact input");
                            if(inp&&inp?.length>0){
                             for(const el of inp){
                              el.value="";
                             }
                            }
                            })()
                            </script>
                            ');
                            throw new Error('EMAIL FROM USER !== SITE_SETTINGS email');
                        }
                    }
                }
                $to=(!empty($siteEmail))?"<$siteEmail>":"<{$emailTO}>";/*TO SUPER*/
                //$to="<go@inverser.pro>";/*TO ME, JFT!*/
                $headers ="Content-type: text/html; charset=utf-8 \r\n";
                $headers .= "From: Inverser.PRO <go@inverser.pro>\r\n";
                $headers .= "Reply-To: Inverser.PRO <go@inverser.pro>\r\n";
                mail($to, $siteName.' | Сайт/обр. связь '.$date, $message, $headers);
                echo json(1,'ok','
                <script>(()=>{
                alt("Благодарим за Ваше обращение. Мы скоро свяжемся с Вами.");
                const inp=a(".contact input");
                if(inp&&inp?.length>0){
                 for(const el of inp){
                  el.value="";
                 }
                }
                })()
                </script>
                ');
                exit;
            }
        }
        exit;
    }else{
        http_response_code(403);
        echo json(0,'Error F001.');
        exit;
    }

}
#\FETCH
