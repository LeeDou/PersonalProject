
window.onload=function(){
    imgLocation("container","box")
    var imgData={"data":[{"src":"y-10.jpg"},{"src":"y-9.jpg"},{"src":"y-11.jpg"},{"src":"y-12.jpg"},{"src":"y-4.jpg"},{"src":"y-7.jpeg"},{"src":"y-8.jpg"},{"src":"y-13.jpg"}]}
    

    window.onscroll=function(){
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent=document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);

                var boximg=document.createElement("div");
                boximg.className="box-img";
                ccontent.appendChild(boximg);

                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);

                var text=document.createElement("div");
                text.className="box-p";
                ccontent.appendChild(text);
            }
            imgLocation("container","box")

        }

    }



    var ybox= document.getElementsByClassName('box');
    var ytext = document.getElementsByClassName('box-p');

    var k = 0;
    for(var i = 0; i < ybox.length; i++) {
        ybox[i].onmouseover = function (){
            // var yimg = ybox[k];

            // console.log(yimg);
            // var ytext = yimg.getElementsByClassName('box-p');
            // alert(ytext.length);
            // alert(ytext[1].style.width);
            ytext.style.display = 'block';
            // alert(ytext.style.display);
        }
        ybox[i].onmouseout = function (){
                ytext.style.display = 'none';
        }
    }





    var oBtn=document.getElementById("z_loginbtn");
            //点击登录按钮
        oBtn.onclick=function(){
            openNew();
            return false;
        }
        navSlide();
        // adverload();

}

function checkFlag(){
    var cparent=document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}

function imgLocation(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var num=Math.floor(cparent.offsetWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 0 0 10px";

    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            BoxHeightArr[i]=ccontent[i].offsetHeight;
        }
        else{
            var minheight=Math.min.apply(null,BoxHeightArr);
            var minIndex=getminheightLocation(BoxHeightArr,minheight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minheight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }

}

function getminheightLocation(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
        }
    }

}

function getChildElement(parent,content){
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}

function yshow(){
    var obj=document.getElementById("box-p");
    obj.style.display="block";
}



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



// function adverload() {
//     var adver = document.getElementById('adver');
//     var list = document.getElementById('list');
//    // / var buttons = document.getElementById('buttons').getElementsByTagName('span');
//     var prev = document.getElementById('prev');
//     var next = document.getElementById('next');
//     var index = 1;
//     var len = 3;
//     var animated = false;
//     var interval = 3000;
//     var timer;

//     function animate (offset) {
//         if (offset == 0) {
//             return;
//         }
//         animated = true;
//         var time = 300;
//         var inteval = 10;
//         var speed = offset/(time/inteval);
//         var left = parseInt(list.style.left) + offset;

//         var go = function (){
//             if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
//                 list.style.left = parseInt(list.style.left) + speed + 'px';
//                 setTimeout(go, inteval);
//             }
//             else {
//                 list.style.left = left + 'px';
//                 if(left>-200){
//                     list.style.left = -1365 * len + 'px';
//                 }
//                 if(left<(-1365 * len)) {
//                     list.style.left = '-1365px';
//                 }
//                 animated = false;
//             }
//         }
//         go();
//     }

//     function showButton() {
//         for (var i = 0; i < buttons.length ; i++) {
//             if( buttons[i].className == 'on'){
//                 buttons[i].className = '';
//                 break;
//             }
//         }
//         buttons[index - 1].className = 'on';
//     }

//     function play() {
//         timer = setTimeout(function () {
//             next.onclick();
//             play();
//         }, interval);
//     }
//     function stop() {
//         clearTimeout(timer);
//     }

//     next.onclick = function () {
//         if (animated) {
//             return;
//         }
//         if (index == 3) {
//             index = 1;
//         }
//         else {
//             index += 1;
//         }
//         animate(-1365);
//         showButton();
//     }
//     prev.onclick = function () {
//         if (animated) {
//             return;
//         }
//         if (index == 1) {
//             index = 3;
//         }
//         else {
//             index -= 1;
//         }
//         animate(1365);
//         showButton();
//     }

//     for (var i = 0; i < buttons.length; i++) {
//         buttons[i].onclick = function () {
//             if (animated) {
//                 return;
//             }
//             if(this.className == 'on') {
//                 return;
//             }
//             var myIndex = parseInt(this.getAttribute('index'));
//             var offset = -1365 * (myIndex - index);

//             animate(offset);
//             index = myIndex;
//             showButton();
//         }
//     }

//     adver.onmouseover = stop;
//     adver.onmouseout = play;

//     play();
// }
