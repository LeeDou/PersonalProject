
function navSlide(){
    var curPostion, thisLeft, curPostion_1;
    var obj = getId('z_nav').getElementsByTagName('ul')[0],
        timer = null,
        navCur = getId('navCur'),
        x,
        liArr = getId('z_nav').getElementsByTagName('li'),
        liLength = liArr.length-1;

        for (var x=0;x<liArr.length; x++ ){
             liArr[liLength].style.paddingRight = "0";
             var li = liArr[x],
                 curPostion = navCur.offsetLeft;

             if(li.className == "cur"){
                 navCur.style.left = li.offsetLeft + "px";
             }
             li.onmouseover=function(){
                clearTimeout(timer);
                thisLeft = this.offsetLeft;
                if (thisLeft > navCur.offsetLeft)
                {
                    hover();
                }
                else
                {
                    curPostion_1 = this.offsetLeft;
                    out();
                }
             };

             li.onmouseout=function(){
                clearTimeout(timer);
                if(curPostion < navCur.offsetLeft){
                    curPostion_1 = curPostion;
                    out();
                }
                else
                {
                    thisLeft = curPostion;
                    hover();
                }
             };
        }

        function hover(){
            if(navCur.offsetLeft <= thisLeft){
                var a = Math.max(parseInt((thisLeft - navCur.offsetLeft) / 15), 3);
                    navCur.style.left = navCur.offsetLeft + a + "px";
                    timer = setTimeout(arguments.callee, 20);
            }
            else
            {
                navCur.style.left = thisLeft + "px";
                clearTimeout(timer);
            }
        }

        function out(){
            if(navCur.offsetLeft >= curPostion_1){
                var a = Math.max(parseInt((navCur.offsetLeft - curPostion_1) / 15), 3);
                    navCur.style.left = navCur.offsetLeft - a + "px";
                    timer = setTimeout(arguments.callee, 20);
                }
            else
            {
                navCur.style.left = curPostion_1 + "px";
                clearTimeout(timer);
            }
        }

        function getId(id){
            return document.getElementById(id)
        }
}


function openNew(){
    //获取页面的高度和宽度
    var sWidth=document.body.scrollWidth;
    var sHeight=document.body.scrollHeight;
    
    //获取页面的可视区域高度和宽度
    var wHeight=document.documentElement.clientHeight;
    
    var oMask=document.createElement("div");
      oMask.id="mask";
      oMask.style.height=sHeight+"px";
      oMask.style.width=sWidth+"px";
      document.body.appendChild(oMask);
    var oLogin=document.createElement("div");
      oLogin.id="login";
      oLogin.innerHTML="<div id='z_login'><div class='z_login_title'>登陆账号</div><div id='close'></div><form id='loginForm' name='loginForm' action='/' method='post'><div class='loginBox'><div class='loginBoxCenter'><p><label for='username'>账号：</label></p><p><input type='text' id='name' name='name' class='loginInput' autofocus='autofocus' required='required' autocomplete='off' placeholder='请输入账号' value='' /></p><p><label for='password'>密码：</label></p><p><input type='password' id='password' name='password' class='loginInput' required='required' placeholder='请输入密码' value='' /></p></div><div class='loginBoxButtons'><p><button class='loginBtn'>登录</button></p><p><a class='register' href='register.html'>注册</a></p></div></div></form></div>";
      document.body.appendChild(oLogin);
    
    //获取登陆框的宽和高
    var dHeight=oLogin.offsetHeight;
    var dWidth=oLogin.offsetWidth;
      //设置登陆框的left和top
      oLogin.style.left=sWidth/2-dWidth/2+"px";
      oLogin.style.top=wHeight/2-dHeight/2+"px";
    //点击关闭按钮
    var oClose=document.getElementById("close");
  
    //点击登陆框以外的区域也可以关闭登陆框
    oClose.onclick=oMask.onclick=function(){
          document.body.removeChild(oLogin);
          document.body.removeChild(oMask);
          };
          };





function adverload() {
    var adver = document.getElementById('adver');
    var list = document.getElementById('list');
    // var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 3;
    var animated = false;
    var interval = 3000;
    var timer;

    function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-200){
                    list.style.left = -1200 * len + 'px';
                }
                if(left<(-1200 * len)) {
                    list.style.left = '-1200px';
                }
                animated = false;
            }
        }
        go();
    }

    // function showButton() {
    //     for (var i = 0; i < buttons.length ; i++) {
    //         if( buttons[i].className == 'on'){
    //             buttons[i].className = '';
    //             break;
    //         }
    //     }
    //     buttons[index - 1].className = 'on';
    // }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 3) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-1200);
        showButton();
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 3;
        }
        else {
            index -= 1;
        }
        animate(1200);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if(this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -1200 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    adver.onmouseover = stop;
    adver.onmouseout = play;

    play();
}





function artiPage() {
    var oBox = document.getElementById("artiList");
    var aLi = oBox.getElementsByTagName("li");
    var aA = oBox.getElementsByTagName("a");

    var li_len = aLi.length;
    var zIndex = li_len - 1;

    var oMenu = getClass(oBox, 'menu')[0];
    var aMenu_a = oMenu.getElementsByTagName('a');

    var len = aMenu_a.length;

    var i = aList = 0;
    var timer = null;
    var oSwitch = true;
    var oPlace = [];

    var aTit = [
        {title:'标题1',href:'http://www.baidu.com',writer:'作者1',date:'2016-03-06'},
        {title:'标题2',writer:'作者2',date:'2016-03-06'},
        {title:'标题3',writer:'作者3',date:'2016-03-06'},
        {title:'标题4',writer:'作者4',date:'2016-03-06'},
        {title:'标题5',writer:'作者5',date:'2016-03-06'},
        {title:'标题6',writer:'作者1',date:'2016-03-06'},
        {title:'标题7',writer:'作者1',date:'2016-03-06'},
        {title:'标题8',writer:'作者1',date:'2016-03-06'},
        {title:'标题9',writer:'作者1',date:'2016-03-06'},
        {title:'标题10',writer:'作者1',date:'2016-03-06'},
        {title:'标题11',writer:'作者1',date:'2016-03-06'},
        {title:'标题12',writer:'作者1',date:'2016-03-06'},
        {title:'标题13',writer:'作者1',date:'2016-03-06'},
        {title:'标题14',writer:'作者1',date:'2016-03-06'},
        {title:'标题15',writer:'作者1',date:'2016-03-06'},
        {title:'标题16',writer:'作者1',date:'2016-03-06'},
        {title:'标题17',writer:'作者1',date:'2016-03-06'},
        {title:'标题18',writer:'作者1',date:'2016-03-06'},
        {title:'标题19',writer:'作者1',date:'2016-03-06'},
        {title:'标题20',writer:'作者1',date:'2016-03-06'},
    ];

    function list() {
        for(i = 0; i < li_len; i++){
            var oTit_title = aLi[i].getElementsByTagName('a')[0];
            var oTit_writer = aLi[i].getElementsByTagName('span')[0];
            var oTit_date = aLi[i].getElementsByTagName('span')[1];
            
            if(aList < aTit.length){
                aLi[i].style.display= 'block';
                oTit_title.href = aTit[aList].href;
                oTit_writer.innerHTML= oTit_writer.title = aTit[aList].writer;
                oTit_date.innerHTML = aTit[aList].date;
                oTit_title.innerHTML = oTit_title.title = aTit[aList].title;
            }
            else {
                aLi[i].style.display= 'none';
            }
            aList++
        }
    }
    list();

    for(i = 0; i < li_len; i++){
        aLi[i].style.top = aLi[i].offsetTop+'px';
        aLi[i].style.left = aLi[i].offsetLeft+'px';
        aLi[i].style.zIndex = zIndex--;
    }

    for(i = 0; i < li_len; i++){
        aLi[i].style.margin = '0';
        aLi[i].style.position = 'absolute';
        aLi[i].index = i;
        oPlace.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
    }

    for(i=0;i<len;i++){
        var cli = 0;
        aMenu_a[i].index = i;

        aMenu_a[i].onclick = function(){
            var _this = this;

            if(this.className != 'hover'){
                var iNow = diNow = li_len-1;
                for(i=0;i<len;i++)aMenu_a[i].className = '';
                aMenu_a[this.index].className = 'hover';
                for(i=0;i<li_len;i++)aLi[i].onclick = null;
                if(cli==0){

                    timer = setInterval(function(){

                        if(oSwitch){
                            startMove(aLi[iNow],{opacity:0,top:500,left:parseInt(800/2-440/2)});
                            iNow--;
                            if(iNow<0)oSwitch=false,cli=0,_this.index == 0 ? (aList = 0,list()) : (aList = 10,list());
                        }
                        else{
                            setTimeout(function(){
                                iNow++;
                                if(diNow>=0)startMove(aLi[diNow],{opacity:80,top:oPlace[diNow].top,left:oPlace[diNow].left});
                                diNow--;
                                if(iNow==li_len-1){
                                    oSwitch=true;
                                    clearInterval(timer);
                                    for(i=0;i<li_len;i++){
                                        aLi[i].onclick = function(){
                                            img(this)
                                        };
                                    }
                                }
                            },1100);
                        }

                    },100);

                }
                cli++;
            }

        };

    }

    //运动框架
    function startMove(obj, json, fnEnd){
        if(obj.timer)clearInterval(obj.timer);
        obj.timer = setInterval(function (){
            doMove(obj, json, fnEnd);
        }, 30);
    }


    function getStyle(obj, attr){
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    }


    function doMove(obj, json, fnEnd){
        var iCur = 0;
        var attr = '';
        var bStop = true;
        for(attr in json){
            attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, 'opacity'))*100) : iCur = parseInt(getStyle(obj, attr));
            if(isNaN(iCur))iCur = 0;
            if(navigator.userAgent.indexOf("Firefox") > 0){
                var iSpeed = (json[attr]-iCur) / 6;
            }else{
                var iSpeed = (json[attr]-iCur) / 4;
            }
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(parseInt(json[attr])!=iCur)bStop = false;
            if(attr=='opacity'){
                obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else{
                attr == 'zIndex' ? obj.style[attr] = iCur + iSpeed : obj.style[attr] = iCur + iSpeed +'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            obj.timer = null;       
            if(fnEnd)fnEnd();
        }
    }



    function getClass(oParent, sClass){
        var aElem = oParent.getElementsByTagName('*');
        var aClass = [];
        var i = 0;
        for(i=0;i<aElem.length;i++)if(aElem[i].className == sClass)aClass.push(aElem[i]);
        return aClass;
    }

}



window.onload = function(){
        var oBtn=document.getElementById("z_loginbtn");
            //点击登录按钮
            oBtn.onclick=function(){
                openNew();
                return false;
            }
        navSlide();
        adverload();
        artiPage();
}