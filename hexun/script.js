// script.js
$(function(){
	function tSlice(tag,start,end){
	if (tag==undefined) {
		return ' --';
	}
	else if (tag.length<end) {
		return tag;
	}
	else {
		return tag.slice(start,end);
	}
}


	$.ajax({
		type:"get",
		url:"http://bdcresttest.hexun.com/restES/restful?tag=newsClassifier&args=1,100",
		
		dataType:"jsonp",
		success:function(data){
			var contentText = '';
			// 读取所有数据
			// $.each(data, function(index,argument){
			// 	contentText +='<tr><td>'  + argument.id +'</td><td>' + argument.post_time + '</td><td>' + argument.title + '</td><td>' + argument.tags + '</td></tr>';
			// });
			// 读取前三十条数据展示
			for(var i = 26;i>0;i--){			
				contentText +='<tr><td>'  + data[i].id +'</td><td>' + tSlice(data[i].post_time,11,19) + '</td><td>' + tSlice(data[i].title,0,10) + '</td><td>' + tSlice(data[i].tags,0,2) + '</td></tr>';
			}
			$('#tbd').html(contentText);
		}
	});
	// $('#main').ready(function(){
		$.ajax({
			type:"get",
			url:"http://bdcresttest.hexun.com/restES/restful?tag=newsClassifier&args=0,56359764,20 ",		
			dataType:"jsonp",
			success:function(data){
			    var str ='<h1>' + data[0].title + '</h1>'  + data[0].content;
			    $('#main').html(str);
			    var keyword = data[0].keyword.split(',');									
				var kstr = '';
				for(var j = 6;j>0;j--){
					kstr += '<p class="key' + j + '">' + '' + keyword[j] + '</p>'; 
				}
				$('.colBox').html(kstr);

				var bstr = '';
				for(var j = 20;j>5;j--){
					bstr += '<p class="box' + j + '">' + '' + keyword[j] + '</p>'; 
				}
				$('.keyBox').html(bstr);
			}
		});
	// });
	

})