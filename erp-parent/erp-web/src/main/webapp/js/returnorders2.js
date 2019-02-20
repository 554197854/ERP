$(function(){
	var _url = 'returnorders_listByPage';
	//显示我的销售退货订单
	if(Request['oper'] == 'myreturnorders'){
		_url = 'returnorders_myListByPage?t1.type=2';
	}
	//显示所有未审核的销售退货订单
	if(Request['oper'] == 'doCheck'){
		_url += '?t1.type=2&t1.state=0';
	}
	//显示所有已审核的销售退货订单
	if(Request['oper'] == 'doInStore'){
		_url += '?t1.type=2&t1.state=1';
	}
	//显示所有销售退货订单
	if(Request['oper'] == 'returnorders'){
		_url += '?t1.type=2';
	}
	$('#dg').datagrid({    
	    url:_url,    
	    columns:[[    
	    	{field:'uuid',title:'编号',width:100},
  		    {field:'createtime',title:'下单日期',width:100,formatter:formatDate},
  		    {field:'checktime',title:'审核日期',width:100,formatter:formatDate},
  		    {field:'endtime',title:'入库日期',width:100,formatter:formatDate},
  		    {field:'createrName',title:'下单员',width:100},
  		    {field:'checkerName',title:'审核员',width:100},
  		    {field:'enderName',title:'库管员',width:100},
  		    {field:'supplierName',title:'客户',width:100},
  		    {field:'totalmoney',title:'合计金额',width:100},
  		    {field:'state',title:'订单状态',width:100,formatter:getState},
  		    {field:'waybillsn',title:'运单号',width:100}
	    ]],    
		singleSelect:true,
		pagination:true,
		onDblClickRow:function(rowIndex,rowData){
			//显示订单详情内容
			$('#uuid').html(rowData.uuid);
			$('#supplierName').html(rowData.supplierName);
			$('#state').html(getState(rowData.state));
			$('#createrName').html(rowData.createrName);
			$('#checkerName').html(rowData.checkerName);
			$('#enderName').html(rowData.enderName);
			$('#createtime').html(formatDate(rowData.createtime));
			$('#checktime').html(formatDate(rowData.checktime));
			$('#endtime').html(formatDate(rowData.endtime));
			//打开订单详情窗口
			$('#orderdetailDlg').dialog('open');
			//显示订单详情条目内容
			$('#item').datagrid('loadData',rowData.returnorderdetails);
		}
	});
	
	//销售退货登记窗口初始化
	$('#addReturnOrdersDlg').dialog({
		title:'增加订单',
		width:800,
		height:400,
		modal:true,
		closed:true
	});
	
	//订单明细窗口初始化
	$('#orderdetailDlg').dialog({    
	    title: '订单详情',    
	    width: 600,    
	    height: 300,    
	    closed: true,   
	    modal: true
	});
	
	//订单详情条目初始化
	$('#item').datagrid({
		columns:[[    
			{field:'uuid',title:'编号',width:100},
  		    {field:'goodsuuid',title:'商品编号',width:100},
  		    {field:'goodsname',title:'商品名称',width:100},
  		    {field:'price',title:'价格',width:100},
  		    {field:'num',title:'数量',width:100},
  		    {field:'money',title:'金额',width:100},
  		    {field:'state',title:'状态',width:100,formatter:getDetailState}
	    ]],
	    singleSelect:true,
	    fitColumns:true
	});
	
	//出入库窗口初始化
	$('#itemDlg').dialog({
		width:300,
		height:200,
		title:'订单明细',
		modal:true,
		closed:true,
		buttons:[
		   {
			   text:'入库',
			   iconCls:'icon-save',
			   handler:doInStore
		   }
		]
	});
	
	//原订单查询窗口初始化
	$('#ordersDlg').dialog({    
	    title: '原订单查询',    
	    width: 350,    
	    height: 100,    
	    closed: true,  
	    modal: true   
	});
	
	//如果是我的审核订单，动态添加销售退货登记按钮
	if(Request['oper'] == 'myreturnorders'){
		$('#dg').datagrid({
			toolbar: [{
				text: '销售退货登记',
				iconCls: 'icon-add',
				handler: function(){
					//$('#addReturnOrdersDlg').dialog('open');
					$('#ordersDlg').dialog('open');
				}
			}]

		});
	}
	
	//如果是审核订单，动态添加审核按钮
	if(Request['oper'] == 'doCheck'){
		$('#orderdetailDlg').dialog({
			toolbar:[{
				text:'审核',
				iconCls:'icon-search',
				handler:function(){
					$.messager.confirm('确认对话框','确定审核订单吗？',function(yes){
						if(yes){
							$.ajax({
								url:'returnorders_doCheck?id=' + $('#uuid').html(),
								dataType:'json',
								type:'post',
								success:function(rtn){
									$.messager.alert('提示信息',rtn.message,'info',function(){
										if(rtn.success){
											$('#orderdetailDlg').dialog('close');
											$('#dg').datagrid('reload');
										}
									});
								}
							});
						}
					});
				}
			}]
		});
	}
	
	//如果销售退货入库,给订单明细添加双击事件
	if(Request['oper'] == 'doInStore'){
		$('#item').datagrid({
			onDblClickRow:function(rowIndex,rowData){
				//显示数据
				$('#itemuuid').val(rowData.uuid);
				$('#goodsuuid').html(rowData.goodsuuid);
				$('#goodsname').html(rowData.goodsname);
				$('#goodsnum').html(rowData.num);
				//打开出入库窗口
				$('#itemDlg').dialog('open');
			}
		});
	}
	
	//给原订单查询按钮绑定点击事件
	$('#btnSearch').bind('click',function(){
		var formData = $('#ordersForm').serializeJSON();
		$.ajax({
			url: 'orders_findById',
			data: formData,
			dataType: 'json',
			type: 'post',
			success:function(rtn){
				if(rtn.success){
					$.ajax({
						url: 'orders_get',
						data: formData,
						dataType: 'json',
						type: 'post',
						success:function(rtn){
							$('#ordersDlg').dialog('close');
							$('#suppliername').val(rtn.supplierName);
							$('#supplieruuid').val(rtn.supplieruuid);
							showDetail();
							$('#returnordersgrid').datagrid("loadData",rtn.orderDetails);
							$('#addReturnOrdersDlg').dialog('open');
						}
					});
				}else{
					$.messager.alert('警告窗口',rtn.message,'info');
				}
			}
		});
	});
	
});

function showDetail(){
	$('#returnordersgrid').datagrid({
		columns:[[
		          {field:'goodsuuid',title:'商品编号',width:100,editor:{type:'numberbox',options:{
		        	  //禁止编辑
		        	  disabled:true
		          }}},
		          {field:'goodsname',title:'商品名称',width:100},
		          {field:'price',title:'价格',width:100,editor:{type:'numberbox',options:{precision:2,disabled:true}}},
		          {field:'-',title:'原订单数量',width:100,formatter:function(value,rowData,index){
		        	  return rowData.num;
		          }},
		          {field:'num',title:'退货数量',width:100,editor:'numberbox'},
		          {field:'money',title:'金额',width:100,editor:{type:'numberbox',options:{precision:2,disabled:true}}},
		          {field:'--',title:'操作',width:100,formatter:function(value, row, rowIndex){
		        	  if(row.goodsuuid != '合计'){
		        		  return '<a href="javascript:void(0)" onclick="deleteRow(' + rowIndex + ')">删除</a>';
		        	  }
		          }}
		]],
		singleSelect:true,
		//显示编辑
		rownumbers: true,
		//显示行脚
		showFooter: true,
		toolbar: [
			{
				text: '提交',
				iconCls: 'icon-save',
				handler: function(){
					//1. 存在编辑状态的行
					if(existEditIndex > -1){
						$('#returnordersgrid').datagrid('endEdit',existEditIndex);
					}
					//获取所有的明细
					var rows = $('#returnordersgrid').datagrid('getRows');
					if(rows.length == 0){
						return;
					}
					var formdata = $('#returnOrderForm').serializeJSON();
					//转换成json字符串
					//给formdata加了一个json属性，key。同时再给它赋值
					formdata.json = JSON.stringify(rows);
					$.ajax({
						url: 'returnorders_add1',
						data: formdata,
						dataType: 'json',
						type: 'post',
						success:function(rtn){
							$.messager.alert('提示',rtn.message,'info',function(){
								if(rtn.success){
									//关闭增加订单的窗口
									$('#addReturnOrdersDlg').dialog('close');
									//刷新订单列表
									$('#dg').datagrid('reload');
								}
							});
						}
					});
				}
			
			}
		],
		onClickRow:function(rowIndex, rowData){
			//rowIndex：点击的行的索引值，该索引值从0开始。
			//rowData：对应于点击行的记录。			
			//关闭当前可以编辑的行
			$('#returnordersgrid').datagrid('endEdit',existEditIndex);
			//设置当前可编辑的索引行
			existEditIndex = rowIndex;
			$('#returnordersgrid').datagrid('beginEdit',existEditIndex);
			//绑定自动计算
			bindGridEditor();
			checkNum(rowData.num);
		},
		onLoadSuccess:function(data){
			//计算合计金额
			sum();
			//$('#returnordersgrid').datagrid('reloadFooter',[{num: '合计', money: 0}]);
		}
	});
	
	//加行脚
	//$('#returnordersgrid').datagrid('reloadFooter',[{goodsuuid: '合计', money: 0}]);
	//$('#returnordersgrid').datagrid('reloadFooter',[{goodsuuid: '合计', money: total}]);
}

/**
 * 格式化日期
 * @returns
 */
function formatDate(value){
	if(null == value){
		return "";
	}
	return new Date(value).Format('yyyy-MM-dd');
}

/**
 * 获得订单状态
 * @param value
 * @returns
 */
function getState(value){
	if(value * 1 == 0){
		return '未审核';
	}
	if(value * 1 == 1){
		return '已审核';
	}
	if(value * 1 == 2){
		return '已结束';
	}
}

/**
 * 获得订单明细状态
 * @param value
 * @returns
 */
function getDetailState(value){
	if(value * 1 == 0){
		return '未入库';
	}
	if(value * 1 == 1){
		return '已入库';
	}
}

/**
 * 入库
 * @returns
 */
function doInStore(){
	var formdata = $('#itemForm').serializeJSON();
	if(formdata.storeuuid == ''){
		$.messager.alert('提示','请选择仓库!','info');
		return;
	}
	$.messager.confirm("确认对话框",'确认要入库吗？',function(yes){
		if(yes){
			$.ajax({
				url: 'returnorderdetail_doInStore',
				data: formdata,
				dataType: 'json',
				type: 'post',
				success:function(rtn){
					$.messager.alert('提示信息',rtn.message,'info',function(){
						if(rtn.success){
							//关闭入库窗口
							$('#itemDlg').dialog('close');
							//设置明细的状态
							$('#item').datagrid('getSelected').state = "1";
							//刷新明细列
							var data = $('#item').datagrid('getData');
							$('#item').datagrid('loadData',data);
							//如果所有明细都 入库了，应该关闭订单详情，并且刷新订单列表
							var allIn = true;
							$.each(data.rows,function(i,row){
								if(row.state * 1 == 0){
									allIn = false;
									//跳出循环
									return false;
								}
							});
							if(allIn == true){
								//关闭详情窗口
								$('#orderdetailDlg').dialog('close');
								//刷新订单列表
								$('#dg').datagrid('reload');
							}
						}
					});
				}
			});
		}
	});
}