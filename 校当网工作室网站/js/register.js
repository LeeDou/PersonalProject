
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
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
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
                    list.style.left = -1365 * len + 'px';
                }
                if(left<(-1365 * len)) {
                    list.style.left = '-1365px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

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
        animate(-1365);
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
        animate(1365);
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
            var offset = -1365 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    adver.onmouseover = stop;
    adver.onmouseout = play;

    play();
}


function yCheck(){
    var realname = document.getElementById("realname").value;
    var number = document.getElementById("number").value;
    var major = document.getElementById("major").value;
    var name = document.getElementById("name").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var phone=document.getElementById("email").value;
    var phone=document.getElementById("qq").value;
    var phone=document.getElementById("phone").value;
    
    if(realname==""||number==""||major==""||name==""||password1==""||password2==""||phone==""||email==""||qq==""){
        alert("空白处必须填写");
        return false;
    }
    else if(password1.length<8||password1.length>15){
        alert("密码长度不小于8位，不大于15位");
        return false;
    }
    else if(password1!=password2){
        alert("两次密码不一致");
        return false;
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

        var header = getElementById("header");
        var sjx = getElementById("sjx");

}

