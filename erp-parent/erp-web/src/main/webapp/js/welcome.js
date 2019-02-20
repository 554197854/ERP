
$(function(){
	$("#cc").combobox({
		onSelect:function(record){
			if(record.value=="1"){
				$('#grid').datagrid({
					url:"item_getItemsToDo"
				});
			}else if(record.value=="2"){
				$('#grid').datagrid({
					url:"item_getItemsDone"
				});
			}
			$('#grid').datagrid("load");
		}
	})
	
	//加载表格数据
	$('#grid').datagrid({
		url:"item_getItemsToDo",
		columns:[[
  		    {field:'uuid',title:'编号',width:50},
  		    {field:'text',title:'内容',width:500},
  		    {field:'starttime',title:'发起时间',width:100,formatter:function(value){
  		    	return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
  		    }},
  		    {field:'endtime',title:'结束时间',width:100,formatter:function(value){
  		    	return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
  		    }},
  		    {field:'url',title:'路径',width:100}
		]],
		singleSelect: true,
		onClickRow:function(rowIndex, rowData){
			window.location.href=rowData.url;
		}
	});

});
