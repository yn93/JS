

window.onload=function(){
	init();
}

/**
*init
*desciption 初始化，给button绑定一个点击事件
*/
function init(){
	var sort_bn=document.getElementById('sort-bn');
	sort_bn.onclick=btnHandler;

}
/**
*getData
*根据ul中的数据，将其读出，放入data数组中
*return  data
*/
function getData(){
	var data=[],
		lis=document.getElementById('source').getElementsByTagName('li');
	for(var i=0,len=lis.length;i<len;i++){
		var temp=lis[i].innerText;
		data[i]=temp.slice(0,2)+'+'+temp.slice(-2);
		// console.log(data[i]);
	
	}
	return data;
}
/**
*sortAqiData
*description 根据排序条件排序
*input   data数组
*return   tempData数组
*/
function sortAqiData(data){
	var tempData=[];
	for(var i=0,len=data.length;i<len;i++){
		tempData[i]=data[i].split('+');
	}
	tempData.sort(function(value1,value2){
		if(value1[1]<value2[1]){
			return 1;
		}else if(value1[1]>value2[1]){
			return -1;
		}else{
			return 0;
		}
	});
	return tempData;
	// console.log(tempData);
}

/**
*render
*description 创建dom：li，显示排序结果
*/
function render(data){
	var html='',
		resort=document.getElementById('resort');
	for(var i=0,len=data.length;i<len;i++){
		html+='<li>'+'第'+(i+1)+'名：'+data[i][0]+'空气质量:'+'<b>'+data[i][1]+'</b>';
	}
	resort.innerHTML=html;
}
/**
*btnHandler
*description  给按钮的绑定的事件
*/
function btnHandler(){
	var aqiData=getData();
	var sortData=sortAqiData(aqiData);
	console.log(sortData);
	render(sortData);
}