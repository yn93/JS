var new_element=document.createElement('script');
new_element.setAttribute('text','text/javascript');
new_element.setAttribute('src','../task4/task4_public.js');
document.body.appendChild(new_element);

var new_ele=document.createElement("script");
new_ele.setAttribute("type","text/javascript");
new_ele.setAttribute("src","../../public/methodEncapsulation.js");
document.body.appendChild(new_ele);

window.onload=function(){

	init_task5();

}

function init_task5(){
	var doc=document, // 常用的全局对象document存储为局部变量
		leftInputBtn=doc.getElementById('leftInput'),
		rightInputBtn=doc.getElementById('rightInput'),
		leftOutBtn=doc.getElementById('leftOut'),
		rightOutBtn=doc.getElementById('rightOut'),
		input=doc.getElementById('inputText'),
	 	item=doc.getElementById('que-list'),
	 	sortBtn=doc.getElementById('sort');
	 

	// 左输入按钮添加事件：将input中输入的数字从左侧插入队列中；
	eventUtil.addHandler(leftInputBtn,'click',function(){
		inQuenue_setHeight(item,input,'left');
	});

	// 右输入按钮添加事件：将input中输入的数字从右侧插入队列中；
	eventUtil.addHandler(rightInputBtn,'click',function(){
		inQuenue_setHeight(item,input,'right');
	});

	// 左输出按钮添加事件：读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
	eventUtil.addHandler(leftOutBtn,'click',function(){
		outQuenue(item,-1,'left');
	});

	// 右输出按钮添加事件：读取并删除队列右侧第一个元素，并弹窗显示元素中数值；
	eventUtil.addHandler(rightOutBtn,'click',function(){
		outQuenue(item,-1,'right');
	});

	// 事件代理：点击任意一个元素，则该元素会被从队列中删除
	eventUtil.addHandler(item,'click',function(e){
		e=eventUtil.getEvent(e);
		var target=eventUtil.getTarget(e);
		outQuenue(item,target);
	});

	// 给排序按钮添加事件：根据高度进行排序，并显示结果
	eventUtil.addHandler(sortBtn,'click',function(){
		sort(item);

	});
}
var num=1; // 列表中的元素总数

/**
 * @Author    yn
 * @DateTime  2018-02-02
 * @copyright [将数字加入到列表中]
 * @param     {element}    items [node]
 * @param     {element}    input [输入框节点]
 * @param     {string}    flag  [标识符，'flag='left'为左输入，'right'为右输入]
 */
function inQuenue_setHeight(items,input,flag){
	var inputValue=input.value,
		li=styleLi(inputValue);
	// console.log(eventUtil.getStyle(li,'height'));
	console.log(li.style.height);
	if(!isNumber(inputValue)){
		alert('请输入数字');
		return false;
	}
	if(!isRange(inputValue)){
		alert('请输入10-100的数字');
		return false;
	}
	if(num>60){
		alert('队列中最多可以容纳60个');
		return false;
	}
	if(flag==='left'){
		items.insertBefore(li,items.firstChild);
	}else{
		items.appendChild(li);
	}
	num++;
	// console.log(num);

}

/**
 * @Author    yn
 * @DateTime  2018-02-02
 * @copyright [根据输入的值创建不同高度的li节点]
 * @param     {number}    Ovalue [数字]
 * @return    {element}          [li节点]
 */
function styleLi(Ovalue){
	var li=document.createElement('li');
	li.style.height=Ovalue+'px';
	// li.innerText=Ovalue;
	return li;
}

/**
 * @Author    yn
 * @DateTime  2018-02-02
 * @copyright [判断输入的内容是否在10-100之间]
 * @param     {number}    ivalue [数字]
 * @return    {Boolean}          [在10-100范围内返回true，反之返回false]
 */
function isRange(ivalue){
	if(ivalue<10||ivalue>100){
		return false;
	}else{
		return true;
	}

}

/**
 * @Author    yn
 * @DateTime  2018-02-02
 * @copyright [对items的子节点根据高度值进行升序排序，并显示排序结果]
 * @param     {element}    items [node节点]
 */
function sort(items){
	var lis=items.children,
		len=lis.length,
		lisTemp=[];
	if(len<1){
		alert('列表中无数据。请输入数据后再排序');
		return false;
	}
	for(var i=0;i<len;i++){
		// lisTemp.push(parseInt(lis[i].style.height));
		lisTemp.push(parseInt(eventUtil.getStyle(lis[i],'height')))
	}
	bubbleSort(lisTemp);
	// console.log(lisTemp);
	for(var i=0;i<len;i++){
		items.children[i].style.height=lisTemp[i]+'px';
	}
}

/**
 * @Author    yn
 * @DateTime  2018-02-02
 * @version   [用冒泡法对数组进行排序]
 * @param     {Array}    lis 
 */
function bubbleSort(lis){
	var len=lis.length;
	for(var i=0;i<len;i++){
		for(var j=i;j<len;j++){
			if(lis[i]>lis[j]){
				var temp=lis[i];
				lis[i]=lis[j];
				lis[j]=temp;
			}
		}
	}
}