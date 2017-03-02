
function navSlide(){

    // curProstion滑动块的位置，thisLeft是滑动块的left值，等下说
    // 下面声明的三个变量只是三个容器，值都是undefined
    // 处处蕴含着运动框架的原理，还有一些bug，之后要用运动框架实现一遍
    var curPostion, thisLeft, curPostion_1;

    // 最终获取的是个ul元素
    var obj = getId('z_nav').getElementsByTagName('ul')[0],

        // 清除定时器
        timer = null,

        // 取到滑动块
        navCur = getId('navCur'),
        x,

        // 取得的是一个包含li元素的数组
        liArr = getId('z_nav').getElementsByTagName('li'),

        // 取得的是li元素在数组里的下标号，li元素的长度是从0开始算的
        liLength = liArr.length-1;

        // 循环的次数是li元素的长度，也就是liArr数组的元素
        // 循环的目的是为每个li元素都添加上相关事件
        for (var x=0;x<liArr.length; x++ ){

             // 为最后一个li元素的内右边距赋值为0
             liArr[liLength].style.paddingRight = "0";

             // 当前循环下相应的li元素存到li上
             var li = liArr[x],

                 // 将滑动块的当前的left值赋值给变量curPostion上，每次循环会重新赋值
                 curPostion = navCur.offsetLeft;

             // 如果这次循环到的li元素是起始li元素，则取到当前li元素的left值并赋值给滑动块，意思：如果在起始值，那么滑动块就在起始位置，不改变
             if(li.className == "cur"){
                 navCur.style.left = li.offsetLeft + "px";
             }

             // 当你鼠标滑动进li元素时会触发的事件
             li.onmouseover=function(){

                // 首先会清除定时器
                clearTimeout(timer);

                // 当调用一个事件程序时，事件程序的this是指什么？？？这里的this应该指当前循环的li对象
                // thisLeft是指当前循环到的li元素的left值，而navCur指当前滑动块的left值
                // > 滑动块在触发li标签的左边，< 滑动块在所触发的li标签的右边
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

        // 辅助，主要目的是为了少输入代码，传入一个html元素的id名返回这个html元素
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