
		var ul=document.getElementById("result");
		var sortArr=document.getElementById("sortArr");
		var num=0;

		function In(direction){
			var arr=document.getElementById("input").value;
			if(arr==""||isNaN(arr)||(arr>100)||(arr<10)){
				alert("请输入10-100的数字");
				return 0;
			}

			if(num>60){
				alert("输入的元素已经超过60了")
				return 0  ;
			}
			var liTemp=document.createElement("li");
			if(direction==="left"){
				ul.insertBefore(liTemp,ul.firstChild);
			}else if(direction==="right"){
				ul.appendChild(liTemp);
			}
			
			// liTemp.innerHTML=arr;
			// console.log(liTemp.innerHTML);
			liTemp.style.height=arr+"px";
			// console.log(liTemp.style.height);
			num++;
			
		}
		/**
		*左侧输出
		*/
		function leftOut(){
			if(ul.childNodes[0]===0){
				alert("队列中无数据");
				return;
			}
			var ou=ul.removeChild(ul.firstChild);
			alert("从左侧移除数据："+(parseInt(ou.style.height)));
			num--;
		}
		/**
		*右侧输出
		*/
		function rightOut(){
			if(ul.childNodes[0]===0){
				alert("队列中无数据");
				return;
			}
			var ou=ul.removeChild(ul.lastChild);
			alert("从右侧移除数据："+(parseInt(ou.style.height)));
			num--;
		}
		/**
		*冒泡排序法
		*/
		function BubbleSelect(a){
			for(var i=0;i<a.length-1;i++){
				for(var j=i+1;j<a.length;j++){
					if(a[i]>a[j]){
						var temp=a[i];
						a[i]=a[j];
						a[j]=temp;
					}
				}
			}

		}

		function sortArray(array){
			var arrayTemp=[];
			var len=(ul.childNodes).length;
			for( var i=0;i<len;i++){
				var temp=parseInt(ul.childNodes[i].style.height);
				// console.log(temp);
				arrayTemp.push(temp);
			}

			BubbleSelect(arrayTemp);
			console.log(arrayTemp);
			// resultArr=[];
			// for(var i=0;i<arrayTemp.length;i++){
			// 	for(var j=0;j<len;j++){
			// 		if(arrayTemp[i]==parseInt(ul.childNodes[j].style.height)){
			// 			resultArr.push(ul.childNodes[j]);
						
			// 		}

			// 	}
			// }
			// console.log(resultArr);
			for(var i=0;i<len;i++){
				ul.childNodes[i].style.height=arrayTemp[i]+"px";
				console.log(parseInt(ul.childNodes[i].style.height));
			}

		}

		ul.onclick=function(){
			ul.removeChild(event.target);
		}
		sortArr.onclick=function(){
			sortArray();
		}