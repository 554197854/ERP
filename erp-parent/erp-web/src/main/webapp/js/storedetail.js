$(function(){
	//列表
	$('#grid').datagrid({
		url:'storedetail_listByPage',
		columns:[[
  		    {field:'uuid',title:'编号',width:100},
  		    {field:'storeName',title:'仓库',width:100},
  		    {field:'goodsName',title:'商品',width:100},
  		    {field:'num',title:'数量',width:100}
		]],
		singleSelect: true,
		pagination: true
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
})
	
