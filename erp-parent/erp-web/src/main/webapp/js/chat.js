var startName = "";
var map = new Map();
var ws ;
var names;
var sendName = "请选择会话人";
var wenzi = "";
var number = 0;
var job;
$(function(){
	connection();
	showOnline();
})
function send(text){
		ws.send(text);
}
  function connection(){
     $("#friends").html("");
	  if ("WebSocket" in window){
        alert("聊天插件已经成功登录");
        // 打开一个 web socket
        ws = new WebSocket("ws://localhost:8080/erp_web//ws");
        ws.onopen = function()
        {
           // Web Socket 已连接上，使用 send() 方法发送数据
          // ws.send("发送数据");
           //alert("数据发送中...");
        	$("#state").html("");
        	$("#state").append("<font onclick='out()' color='red'>在线</font>");
        };
		//收到回复数据的方法
        ws.onmessage = function (evt) 
        { 
           var text = evt.data;
		   if(text=="#refresh#"){
			   $('#friends').html("");
			   showOnline();
		   }else if(text=="#shangxian#"){
			   $('#friends').html("");
			   showOnline();
		   }else{
	 		   accept(text);
		   }
        };
        ws.onclose = function()
        { 
           // 关闭 websocket
        	$("#friends").html("");
        	$("#state").html("");
        	$("#state").append("<font onclick='_in()' color='red'>离线</font>");
        	$.messager.alert('我的消息','聊天插件已为离线状态','info');
        };
     }
     else
     {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持聊天插件");
     }
  }
function out2(){
	ws.close();
}
function out(){
	$.messager.confirm('确认对话框', '确定要下线？', function(r){
		if (r){
			 	ws.close();
				// 关闭 websocket
				$("#state").html("");
	        	$("#state").append("<font onclick='_in()' color='red'>离线</font>");
	        	$("#friends").html("");
	        	$("#text").html("");
	        	$("#myText").html("");
				
		    
		}
	});
}
function _in(){
	//登入
	$.messager.confirm('确认对话框', '确定要上线么？', function(r){
		if (r){
			connection();
		}
	});
}

function say(){
	if(sendName=="请选择会话人"){
		alert("请选择对话人");
		return;
	}
	if($("#myText").val()==""){
		$.messager.alert('我的消息','请不要发送空内容！','info');
		return;
	}
	send(sendName+"##"+$("#myText").val());
	$("#text").append("<div style='clear:both'></div>");
	var text = getTime()+"<br>"+  $("#myText").val();                            
	text = text.replaceAll("\n","<br>");
	text = text.replaceAll(" ","&nbsp");
	$("#text").append("<div style='padding-left:260px'>"+text+"</div>");
	$("#text")[0].scrollTop = $("#text")[0].scrollHeight;
	$("#myText").val("");
}
//初始化列表的方法
function showOnline(){
	$.post("login_getAllOnlineName",function(data){
		names = data;
		$(data).each(function(m,n){
			$("#friends").append("<li ><a onclick='changeName("+m+")' href='javascript:void(0)'>"+n+"</a></li>");
		});
		
	},"json");
}
function changeName(m){
	//修正颜色
	var a  = $("#friends").find("li");
	$(a).each(function(i,n){
		var _a = $(n).find("a");
		if(names[m] == _a.html() ){
			_a.css("color","black");
		}
	});
	if(sendName!="请选择会话人"){
		if(sendName==names[m]){
			//啥都不干
		}else{
			//干事情
			//说明是第一次,map里面啥都没有的
			
			if(!map.containsKey(sendName)){
				//如果map里面没有这个key,那么就创建一个div id为字符串名字
				$("#shiyan").append("<div style='display:none;' id='"+sendName+"'></div>");
				//把数据抓到刚创建的map里面
				$("#"+sendName).append($("#text").contents());
				map.put(sendName,$("#"+sendName));
				//然后让text添加这个div
				//$("#text").append($("#text").contents());
			}else{
				//如果map里面有
				//那么
				map.get(sendName).append($("#text").contents());
			}
		}
	}
	sendName = names[m];
	//判断有没有数据
	if(!map.containsKey(sendName)){
	}else{
		map.get(sendName).contents();
		$("#text").append(map.get(sendName).contents());
	}
	$('#titles').panel({title: sendName});
	
}
function getTime() {
    var startName;
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 

function shanshuo(){
	job =  setInterval('shanshuo2()', '500');

}
function shanshuo2(){
	if(number%2==0){
		$("#image").css("display","none");
	}else{
		$("#image").css("display","block");
	}
	number++;
	if(number==20){
		number = 0;
	}
}
function accept(value){
	if($("#chat").parent().is(":hidden")==true){
		//说明是关闭状态，那么闪烁图片
		shanshuo();
	}
	//拿到前要做判断,看是谁发的消息,区分放在不同的map里
	var arr = value.split("##");
	//arr[0]是对方的用户名
	//arr[1]是发送的文本内容
	//先判断这个用户名和面板名字是否相同
	//alert($('#titles').panel("options").title);
	arr[1] = arr[1].replaceAll("\n","<br>");
	arr[1] = arr[1].replaceAll(" ","&nbsp");
	if(arr[0]==$('#titles').panel("options").title){
		$("#text").append("<div style='clear:both'></div>");
		var text = getTime()+"<br>"+ arr[1];                            
		$("#text").append("<div >"+text+"</div>");
		$("#text")[0].scrollTop = $("#text")[0].scrollHeight;
	}else{
		//如果不等于,那么就给他扔map里面去,
		//改变颜色
		var a  = $("#friends").find("li");
		$(a).each(function(i,n){
			var _a = $(n).find("a");
			if(arr[0] == _a.html() ){
				_a.css("color","red");
			}
		});
		if(map.containsKey(arr[0])){
			//如果map里面有,那么就添加进去不管了
			map.get(arr[0]).append("<div>"+arr[1]+"</div>");
		}else{
			//如果map里面没有,创建
			$("#shiyan").append("<div style='display:none;' id='"+arr[0]+"'></div>");
			//把数据抓到刚创建的map里面
			var text = getTime()+"<br>"+ arr[1]; 
			$("#"+arr[0]).append("<div>"+text+"</div>");
			map.put(arr[0],$("#"+arr[0]));
			//然后让text添加这个div
			//$("#text").append($("#text").contents());
		}
	}
}
function showChat(){
	//打开界面的方法
	$("#chat").window("open");
	if(job!=null){
		window.clearTimeout(job);
		$("#image").css("display","block");
	}
}
function dianji(){
	//var arr = new Array();
	var data = $("#text").contents();
	map.put("1",data)
	//$("#shiyan").append(map.get("1"));
	
}



function Map() {  
    this.elements = new Array();  
  
    //获取MAP元素个数  
    this.size = function() {  
        return this.elements.length;  
    };  
  
    //判断MAP是否为空  
    this.isEmpty = function() {  
        return (this.elements.length < 1);  
    };  
  
    //删除MAP所有元素  
    this.clear = function() {  
        this.elements = new Array();  
    };  
  
    //向MAP中增加元素（key, value)   
    this.put = function(_key, _value) {  
        this.elements.push( {  
            key : _key,  
            value : _value  
        });  
    };  
  
    //删除指定KEY的元素，成功返回True，失败返回False  
    this.removeByKey = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
      
    //删除指定VALUE的元素，成功返回True，失败返回False  
    this.removeByValue = function(_value) {//removeByValueAndKey  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
      
    //删除指定VALUE的元素，成功返回True，失败返回False  
    this.removeByValueAndKey = function(_key,_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value && this.elements[i].key == _key) {  
                    this.elements.splice(i, 1);  
                    return true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
  
    //获取指定KEY的元素值VALUE，失败返回NULL  
    this.get = function(_key) {  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    return this.elements[i].value;  
                }  
            }  
        } catch (e) {  
            return false;  
        }  
        return false;  
    };  
  
    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
    this.element = function(_index) {  
        if (_index < 0 || _index >= this.elements.length) {  
            return null;  
        }  
        return this.elements[_index];  
    };  
  
    //判断MAP中是否含有指定KEY的元素  
    this.containsKey = function(_key) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].key == _key) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
  
    //判断MAP中是否含有指定VALUE的元素  
    this.containsValue = function(_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
      
    //判断MAP中是否含有指定VALUE的元素  
    this.containsObj = function(_key,_value) {  
        var bln = false;  
        try {  
            for (i = 0; i < this.elements.length; i++) {  
                if (this.elements[i].value == _value && this.elements[i].key == _key) {  
                    bln = true;  
                }  
            }  
        } catch (e) {  
            bln = false;  
        }  
        return bln;  
    };  
  
    //获取MAP中所有VALUE的数组（ARRAY）  
    this.values = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].value);  
        }  
        return arr;  
    };  
      
    //获取MAP中所有VALUE的数组（ARRAY）  
    this.valuesByKey = function(_key) {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            if (this.elements[i].key == _key) {  
                arr.push(this.elements[i].value);  
            }  
        }  
        return arr;  
    };  
  
    //获取MAP中所有KEY的数组（ARRAY）  
    this.keys = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            arr.push(this.elements[i].key);  
        }  
        return arr;  
    };  
      
    //获取key通过value  
    this.keysByValue = function(_value) {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            if(_value == this.elements[i].value){  
                arr.push(this.elements[i].key);  
            }  
        }  
        return arr;  
    };  
      
    //获取MAP中所有KEY的数组（ARRAY）  
    this.keysRemoveDuplicate = function() {  
        var arr = new Array();  
        for (i = 0; i < this.elements.length; i++) {  
            var flag = true;  
            for(var j=0;j<arr.length;j++){  
                if(arr[j] == this.elements[i].key){  
                    flag = false;  
                    break;  
                }   
            }  
            if(flag){  
                arr.push(this.elements[i].key);  
            }  
        }  
        return arr;  
    };  
} 
//替换全部字符串的方法
String.prototype.replaceAll=function(reallyDo, replaceWith) {
	    return this.replace(new RegExp(reallyDo, "g" ), replaceWith);
}
//关闭前的方法

