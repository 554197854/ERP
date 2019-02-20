$(function(){
	var url = 'inventory_listByPage';
	
	//如果是审核业务，加上state=0，只查询出未审核的订单
	if(Request['oper'] == 'add') {
		url = "inventory_MyListByPage";
		document.getElementById('divSearch').style.display="";//显示查询的div
	}
	
	//如果是审核业务，加上state=0，只查询出未审核的订单
	if(Request['oper'] == 'doCheck') {
		url += "?t1.state=0";
	}
	
	//如果是查询业务
	if(Request['oper'] == 'search') {
//		$('#divSearch').style.display="";//为什么不行？
		document.getElementById('divSearch').style.display="";
	}
	
	$('#grid').datagrid({
		url: url,
		columns:[[
  		    {field:'uuid',title:'编号',width:100},
  		    {field:'goodsName',title:'商品',width:100},
  		    {field:'storeName',title:'仓库',width:100},
  		    {field:'num',title:'数量',width:100},
  		    {field:'type',title:'类型',width:100,formatter:getType},
  		    {field:'createtime',title:'登记日期',width:100,formatter:formateDate},
  		    {field:'checktime',title:'审核日期',width:100,formatter:formateDate},
  		    {field:'createrName',title:'登记员',width:100},
  		    {field:'checkerName',title:'审核员',width:100},
  		    {field:'state',title:'状态',width:100,formatter:getState},
  		    {field:'remark',title:'备注',width:100}
		]],
		singleSelect:true,//如果为true，则只允许选择一行。
		pagination:true,//如果为true，则在DataGrid控件底部显示分页工具栏
		fitColumns:true,//真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动。
		striped:'true',//是否显示斑马线效果。
	    pageSize:10,// 每页显示多少条记录
	    pageList:[3,5,8,10,20,30,40,50,60]
	});
	
	//启用EasyUI DataGrid的排序功能
	var columns_ = $("#grid").datagrid("options").columns[0];
    for (i = 0; i < columns_.length; i++) {
    	columns_[i].sortable = true;
    }
	
	//点击查询按钮
	$('#btnSearch').bind('click',function(){
		//把表单数据转换成json对象
		var formData = $('#searchForm').serializeJSON();
		$('#grid').datagrid('load',formData);
	});
	
	//如果是审核业务
	if(Request['oper'] == 'doCheck') {
		$('#grid').datagrid({
			onDblClickRow:function (rowIndex, rowData){
				//rowIndex， 行的索引
				//rowData， 行里的数据
				//alert(JSON.stringify(rowData));
				//显示详情
				$('#uuid').html(rowData.uuid);
				$('#createtime').html(formateDate(rowData.createtime));
				$('#goodsname').html(rowData.goodsName);
				$('#storename').html(rowData.storeName);
				$('#num').html(rowData.num);
				$('#type').html(getType(rowData.type));
				$('#remark').html(rowData.remark);
				//打开窗口
				$('#inventoryDlg').dialog('open');
			}
		});
	}
	
	/**
	 * 审核
	 */
	$('#doCheck').bind('click', function(){    
		$.messager.confirm('确认', '确认要审核吗？', function(yes){
			if(yes){
			    $.ajax({
			    	url: 'inventory_doCheck?id=' + $('#uuid').html(),
			    	dataType: 'json',
			    	type: 'post',
			    	success:function(rtn){
			    		$.messager.alert('提示',rtn.message,'info',function(){
			    			if(rtn.success){
			    				//关闭窗口
			    				$('#inventoryDlg').dialog('close');
			    				//刷新表格
			    				$('#grid').datagrid('reload');
			    			}
			    		});
			    	}
			    });  
			}
		});
	});
	
	//添加盘盈盘亏登记按钮
	if (Request['oper'] == 'add') {
		$('#grid').datagrid({
			toolbar: [{
				text: '盘盈盘亏登记',
				iconCls: 'icon-add',
				handler: function(){
					//设置保存按钮提交的方法为add
					method = "add";
					//清空表单内容
					$('#editForm').form('clear');
					//打开编辑窗口
					$('#editDlg').dialog('open');
				}
			}]
		});
	}
	
	//点击保存按钮
	$('#btnSave').bind('click',function(){
		var formData = $('#editForm').serializeJSON();
		if(formData==false) {
			return;
		}
		$.ajax({
			url: 'inventory_add',
			data: formData,
			dataType: 'json',
			type: 'post',
			success:function(rtn){    
		        $.messager.show({
		        	title:'提示消息',
		        	msg:rtn.message,
		        	timeout:3000,
		        	showType:'slide'
		        });
		        
		     	// 关闭窗口
				$("#editDlg").window("close");
				//清空表单内容
				$('#editForm').form('clear');
				// 表格重新加载
				$("#grid").datagrid("reload");
		    }
		});
	});
});


/**
 * 获取类型
 * @param value
 * @returns
 * 1：盘盈  2：盘亏
 */
function getType(value){
	switch(value * 1){
		case 1:return '盘盈';
		case 2:return '盘亏';
		default: return '';
	}
}

/**
 * 获取状态
 * @param value
 * @returns
 * 0 未审核  1:已审核 
 */
function getState(value){
	switch(value * 1){
	case 0:return '未审核';
	case 1:return '已审核';
	default: return '';
	}
}

/**
 * 日期格式化
 * @param dateValue
 * @returnsformatDate
 */
function formateDate(dateValue) {
	if(dateValue==null){
		return "";
	}
	return new Date(dateValue).Format('yyyy-MM-dd');
}

