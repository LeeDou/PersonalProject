function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}

q_tab.onclick=function(){
	//鼠标点击的标签和要切换内容的元素
	var q_icon=$('q_tab-icon').getElementsByTagName('li');
	var	q_divs=$('q_tab-content').getElementsByTagName('div');
	if(q_icon.length!=q_divs.length)
		return;
	//遍历icon下所有的li
	for(var i=0;i<q_icon.length;i++){
		q_icon[i].id=i;
		q_icon[i].onclick=function(){
			for(var j=0;j<q_icon.length;j++){
				q_divs[j].style.display='none';
			}
			q_divs[this.id].style.display='block';
		}
	}
}