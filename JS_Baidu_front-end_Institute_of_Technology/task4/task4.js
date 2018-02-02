var new_element=document.createElement('script');
new_element.setAttribute('type','text/javascript');
new_element.setAttribute('src','../../public/methodEncapsulation.js');
document.body.appendChild(new_element);

var new_ele=document.createElement('script');
new_ele.setAttribute('type','text/javascript');
new_ele.setAttribute('src','task4_public.js');
document.body.appendChild(new_ele);



window.onload=function(){
	// var constants={
	// 	INVALID_INPUT_MSG:'输入有误，请输入数字',
	// 	INVALID_VALUE_EMPTY:'数列为空，无法删除',
	// 	REMOVE_MSG:'删除数字'
	// }
	init();
	
}



function init(){
	var doc=document, // 常用的全局对象document存储为局部变量
		leftInputBtn=doc.getElementById('leftInput'),
		rightInputBtn=doc.getElementById('rightInput'),
		leftOutBtn=doc.getElementById('leftOut'),
		rightOutBtn=doc.getElementById('rightOut'),
		input=doc.getElementById('inputText'),
	 	item=doc.getElementById('que-list');

	//左输入按钮添加事件：将input中输入的数字从左侧插入队列中；
	eventUtil.addHandler(leftInputBtn,'click',function(){
		inQuenue(item,input,'left');
	});

	//右输入按钮添加事件：将input中输入的数字从右侧插入队列中；
	eventUtil.addHandler(rightInputBtn,'click',function(){
		inQuenue(item,input,'right');
	});

	//左输出按钮添加事件：读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
	eventUtil.addHandler(leftOutBtn,'click',function(){
		outQuenue(item,-1,'left');
	});

	//右输出按钮添加事件：读取并删除队列右侧第一个元素，并弹窗显示元素中数值；
	eventUtil.addHandler(rightOutBtn,'click',function(){
		outQuenue(item,-1,'right');
	});

	//事件代理：点击任意一个元素，则该元素会被从队列中删除
	eventUtil.addHandler(item,'click',function(e){
		e=eventUtil.getEvent(e);
		var target=eventUtil.getTarget(e);
		outQuenue(item,target);
	});


}

