


var eventUtil={

	// 添加事件处理程序的方法
	addHandler:function(ele,type,fn){
		if(ele.addEventListener){
			ele.addEventListener(type,fn,false); 
		}else if(ele.attachEvent){
			ele.attachEvent('on'+type,fn); // for IE
		}else{
			ele['on'+type]=fn;
		}
	},

	// 删除事件处理程序的方法
	removeHandler:function(ele,type,fn){
		if(ele.removeEventListener){
			ele.remoceEventListener(type,fn,false);
		}else if(ele.detachEvent){
			ele.detachEvent(type,fn); // for IE
		}else{
			ele['on'+type]=null;
		}
	},

	// 获取事件对象的方法
	getEvent:function(event){
		return event?event:window.event;
	},

	// 获取事件的目标的方法
	getTarget:function(event){
		return event.target||event.srcElement;
	},

	// 阻止冒泡的函数
	stopBubble:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true; // for IE
		}
	},

	// 阻止默认行为的函数
	stopDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false; // for IE
		}
	},

	// 通过类名以及父类（可选）查找到对应的元素并返回
	getClassByName:function(oParent,clsName){
		// var iParent=oParent?document.getElementById(oParent):document,
		var eles=[];
		var element=oParent.getElementsByTagName("*");
		for(var i=0;i<element.length;i++){
			if(eventUtil.hasClass(element[i],clsName)){ 
				eles.push(element[i]);
			}
		}
		return eles;
	},

	// 判断是否含有此类名
	hasClass:function(obj,cls){
		return obj.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"));
	},

	// 添加类名
	addClass:function(obj,cls){
		if(!eventUtil.hasClass(obj,cls)){
			obj.className+=" "+cls;
		}
	},

	// 删除类名
	removeClass:function(obj,cls){
		if(eventUtil.hasClass(obj,cls)){
			var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)"); // 正则表达式
			obj.className=obj.className.replace(reg,'');
		}
	},

	// 获得客户区大小的函数，返回一个对象
	getViewPort:function(){
		if(document.compatMode=="BackCompact"){
			return {
				width:document.body.clientWidth,
				height:document.body.clientHeight
			};
		}else{
			return {
				width:document.documentElement.clientWidth,
				height:document.documentElement.clientHeight
			};
		}
	},
	
	// 当前元素相对于其上级层左边的距离
	getElementLeft:function(ele){
		var actualLeft=ele.offsetLeft;
		var current=ele.offsetParent(); // 获取与当前元素ele最近的经过定位（position不等于static）的父级元素
		while(current!=null){
			actualLeft+=current.offsetLeft;
			current=current.offsetParent();
		}
		return actualLeft;
	},

	// 当前元素相对于其上级层顶部的距离
	getElementTop:function(ele){
		var actualTop=ele.offsetTop;
		var current=ele.offsetParent(); // 获取与当前元素ele最近的经过定位（position不等于static）的父级元素
		while(current!=null){
			actualTop+=current.offsetTop;
			current=current.offsetParent();
		}
	},

	// 获取属性值
	getStyle:function(obj,attr){
		if(obj.currentStyle){ // for IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},

	// 包含多种运动，可变速，可链式(设置fn函数,为链式的第二个动作)，可同时(第二个参数为JSON)
	move:function(obj,json,fn){

		var cur=0; // 属性的当前值
		var flag=true;
		obj.timer=null;
		if(obj.timer){
			clearInterval(obj.timer);
		}

		obj.timer=setInterval(function(){
			for(var attr in json){

				// 获取属性的当前值
				if(attr=="opacity"){
					cur=Math.round(parseFloat(eventUtil.getStyle(obj,attr))*100);
				}else{
					cur=parseInt(eventUtil.getStyle(obj,attr));
				}
				if(json[attr]<1){
					json[attr]=json[attr]*100;
				}

				// 运动速度
				var speed=(json[attr]-cur)/5;
				var speed=speed>0?Math.ceil(speed):Math.floor(speed);

				// 函数停止条件
				if(cur!=json[attr]){
					flag=false;
				}else{
					flag=true;
				}
				if(attr=="opacity"){
					obj.style.filter='aplha(opacity:'+(cur+speed)+')'; // for IE 8 and earlier
					obj.style.opacity=(cur+speed)/100;
				}else {
					obj.style[attr]=(cur+speed)+'px';
				}
			}
			if(flag){
				clearInterval(obj.timer);  // 停止setInterval的执行
				if(fn){
					fn();
				}
			}
		},300);
	}

}