$(function(){
	$('#dg').datagrid({    
	    url:'noticeBoard_listByPage',    
	    columns:[[ 
	        {field:'head',title:'标题',width:150},    
	        {field:'createTime',title:'创建时间',width:150,formatter:getDate}    
	    ]],
	    pagination:true,
	    singleSelect:true,
	    onDblClickRow:function(rowIndex,rowData){
	    	$("#head").html(rowData.head);
	    	var content = (rowData.content).replaceAll("\n","<br>")
	    	var content = content.replaceAll(" ","&nbsp;&nbsp;");
	    	$("#content").html(content);
	    	$("#yejiao").html(getDate(rowData.createTime)+"&nbsp;&nbsp"+rowData.createName);
	    } 
	});  
	
})
function getDate(value){
	return new Date(value).Format("yyyy-MM-dd");
}
//替换全部字符串的方法
String.prototype.replaceAll=function(reallyDo, replaceWith) {
	    return this.replace(new RegExp(reallyDo, "g" ), replaceWith);
	}