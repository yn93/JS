
/**
 * @Author    yn
 * @DateTime  2018-01-31
 * @copyright [copyright]
 * @license   [license]
 * @version   [version] 将指定内容input放到队列中
 * @param     {element} node节点
 * @param     {string} input 需要显示的内容
 * @param     {string} flag 标识（flag='left' or 'right'），根据flag判断是左输入还是右输入
 */

function inQuenue(items,input,flag){
	var valueTemp=input.value;
	if(!isNumber(valueTemp)){
		alert('输入有误，请输入数字');
		return false;	
	}
	var li=createLi(valueTemp);
	if(flag=='left'){
		items.insertBefore(li,items.firstChild);
	}else{
		items.appendChild(li);
	}	
}

/**
 * @DateTime  2018-01-31
 * @param     {element}  items 
 * @param     {element}  node 
 * @param     {string} flag 
 * @version   将指定的节点移除本队列(flag='left' 左移出; flag='right' 右移除; 其它情况直接删除指定的node节点)
 */
function outQuenue(items,node,flag){
	// var lis=items.getElementsByTagName('li');
	var lis=items.children,
		len=lis.length;
	if(len<1){
		alert('数列为空，无法删除');
		return false;
	}
	if(flag==='left'){
		alert('删除数字' +lis[0].innerText+' ?');
		items.removeChild(lis[0]);
		// console.log(items.children);
	}else if(flag==='right'){
		alert('删除数字' +lis[len-1].innerText+' ?');
		items.removeChild(lis[len-1]);
		// console.log(items.children);
	}else{
		items.removeChild(node);
	}
}


/**
 * @Author    yn
 * @DateTime  2018-01-31
 * @copyright [copyright]
 * @license   [license]
 * @version   [version] 验证输入的内容是否都是0-9的数字
 * @param     {string} input 需要验证的数据
 * @return    {Boolean}
 */
function isNumber(input){
	// var reg=new RegExp("\d","g");
	var reg=/\D/g;
	console.log('reg.test(input):'+reg.test(input));
	if(reg.exec(input)){
		console.log('is false');
		return false;
	}else{
		console.log('is true');
		return true;
	}

}


/**
 * @DateTime  2018-01-31
 * @param     {Number} Ovalue li节点显示的文本内容
 * @return    {li} DOM节点
 */
function createLi(Ovalue){
	var li=document.createElement('li');	
	li.appendChild(document.createTextNode(Ovalue));
	// li.innerText=Ovalue;
	return li;
}

