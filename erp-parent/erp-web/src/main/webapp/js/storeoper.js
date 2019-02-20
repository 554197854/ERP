$(function(){
	$('#grid').datagrid({
		url:'storeoper_listByPage',
		columns:[[
  		    {field:'uuid',title:'编号',width:100},
  		    {field:'empName',title:'操作员',width:100},
  		    {field:'opertime',title:'操作日期',width:100,formatter:formatDate},
  		    {field:'storeName',title:'仓库',width:100},
  		    {field:'goodsName',title:'商品',width:100},
  		    {field:'num',title:'数量',width:100},
  		    {field:'type',title:'类型',width:100,formatter:function(value){
  		    	if(value * 1 == 1){
  		    		return "采购入库";
  		    	}
  		    	if(value * 1 == 2){
  		    		return "销售出库";
  		    	}
  		    	if(value * 1 == 3){
  		    		return "盘盈入库";
  		    	}
  		    	if(value * 1 == 4){
  		    		return "盘亏出库";
  		    	}
  		    	if(value * 1 == 5){
  		    		return "销售退货入库";
  		    	}
  		    	if(value * 1 == 6){
  		    		return "采购退货出库";
  		    	}
  		    }}
		]],
		singleSelect:true,
		pagination:true,
		fitColumns:true
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
/**
 * 日期格式转换
 * @param value
 * @returns
 */
function formatDate(value){
	return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
}
