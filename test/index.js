$(function(){
	//alert(1)
	var index = 0;
	//console.log(index)
	var res = 0;
			// *****************  按下回车 插入元素
	$(".word").on("keydown",function(event){
		var evt = event || window.event;
		var keyCode = evt.keyCode||evt.which;
		if(keyCode == 13){
			var sValue = $(".word").val()
			var html = `<div class="textT">
							<input type="checkbox" class="box">
							<p>${sValue}</p>
							<a href="#javascript" class="remove">-</a>
						</div>`
			$(".text1").append(html)
			index++
				
			if(!$.cookie("going")){
				$.cookie("going",'[{"value":"'+$(this).val()+'"}]',10)
			}else{
				var sCookie = $.cookie("going")
				var aCookie = JSON.parse(sCookie);
				aCookie.push({
					value : $(this).val()
				})
				//console.log(aCookie)
				var oCookie = JSON.stringify(aCookie)
				$.cookie("going",oCookie)

			}
			//console.log($.cookie("going"))
			$(this).val("")
		}
		//index = $(".int").html()
		$(".int").html(index)
		
	})

			// *******************  点击减号 移除元素
	$(".text1").on("click",".remove",function(){
		index = $(".int").html()
		$(this).parent().remove();
		index--;
		$(".int").html(index)
	})
	$(".text2").on("click",".remove",function(){
		res = $(".out").html()
		$(this).parent().remove();
		res--;
		$(".out").html(res)
	})

			// *******************  点击checkbos 移动 元素

	$(".text1").on("click",".box",function(){
		index = $(".int").html()
		res = $(".out").html()
		$(".text2").append($(this).parent());
		index--;
		res++;
		$(".int").html(index);  // 上方的数字自减
		$(".out").html(res)	    // 下方的数字自增 

		if(!$.cookie("finish")){                //  获取点击元素中 p 标签的值 存入cookie中
			$.cookie("finish",'[{"value1":"'+$(this).parent().find("p").html()+'"}]')
		}else{
			var sCookie = $.cookie("finish");
			var aCookie = JSON.parse(sCookie);
			aCookie.push({
				value1 : $(this).parent().find("p").html()
			})
			console.log(aCookie)
			var oCookie = JSON.stringify(aCookie);
			$.cookie("finish",oCookie)
		}

		//console.log($.cookie("finish"))
	})

	function rendring(){
		var sCookie = $.cookie("going");
		if(sCookie == ""){
			return 0
		}
		var aCookie = JSON.parse(sCookie);   //   拼接  进行时 的字符串 根据cookie
		var html = ""
		for(var i = 0; i < aCookie.length; i++){
			 html += `<div class="textT">
							<input type="checkbox" class="box">
							<p>${aCookie[i].value}</p>
							<a href="#javascript" class="remove">-</a>
						</div>`

		}
		$(".text1").html(html)
		$(".int").html(aCookie.length); 

		var cCookie = $.cookie("finish");
		if(cCookie == ""){
			return 0
		}
		var dCookie = JSON.parse(cCookie);  //  拼接  完成时  的字符串  根据cookie
		var res = "";
		for(var j = 0; j < dCookie.length; j++){
			res += `<div class="textT">
						<input type="checkbox" class="box">
						<p>${dCookie[j].value1}</p>
						<a href="#javascript" class="remove">-</a>
					</div>`
		}
		$(".text2").html(res)
		$(".out").html(dCookie.length)
	}
	rendring()
		
})