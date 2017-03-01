document.getElementById("submit").onclick=function(){
    //发送Ajax提交信息请求
    var request= new XMLHttpRequest();
    request.open("POST","");
    var data= "name=" +document.getElementById("name").value
            +"&number=" +document.getElementById("number").value
            +"&e-mail=" +document.getElementById("e-mail").value
            +"&direction=" +document.getElementById("direction").value
            +"&introduction=" +document.getElementById("introduction").value
    request.send(data);
    request.onreadystatechange = function(){
        if(request.readyState===4){
            if(request.status===200){
                document.getElementById("jion").innerHTML=request.responseText;
            }else{
                alert("错误："+request.status);
            }
        }
    }
}
