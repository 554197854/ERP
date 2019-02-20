//保存当编辑的行的索引
var existEditIndex = -1;

/**
 * 获取当前编辑行的指定编辑器
 * @param _field
 * @returns
 */
function getEditor(_field){
	return $('#returnordersgrid').datagrid('getEditor',{index:existEditIndex,field:_field});
}

/**
 * 计算金额
 */
function cal(){
	//获取数量编辑器
	var numEditor = getEditor('num');
	//取得商品的数量
	var num = $(numEditor.target).val();
	
	//获取价格编辑器
    var priceEditor = getEditor('price');
    //取出进货价格
    var price = $(priceEditor.target).val();
    
    //计算金额
    var money = num * price;
    //保留2位小数
    money = money.toFixed(2);

    //获取金额编辑器
    var moneyEditor = getEditor('money');
    //设置金额
    $(moneyEditor.target).val(money);
    
    //更新表格中的数据,设置row json对象里的key对应的值
    $('#returnordersgrid').datagrid('getRows')[existEditIndex].money = money;
}

/**
 * 绑定键盘的输入事件
 */
function bindGridEditor(){
	//获取数量编辑器
	var numEditor = getEditor('num');
	$(numEditor.target).bind('keyup',function(){
		//计算金额
		cal();
		//计算合计金额
		sum();
	});
	
	//绑定价格编辑器
	var priceEditor = getEditor('price');
	$(priceEditor.target).bind('keyup',function(){
		//计算金额
		cal()
		//计算合计金额
		sum();
	});
}

/**
 * 计算合计金额
 */
function sum(){	
	//获取所有行
	var rows = $('#returnordersgrid').datagrid('getRows');
	var total = 0;
	//循环累计
	$.each(rows, function(i, row){
		total += parseFloat(row.money);
	});
	total = total.toFixed(2);
	
	//设置合计金额到行脚里去
	$('#returnordersgrid').datagrid('reloadFooter',[{goodsuuid: '合计', money: total}]);
}

/**
 * 删除行
 * @param rowIndex
 */
function deleteRow(rowIndex){
	//alert(JSON.stringify(data));
	//关闭编辑
	$('#returnordersgrid').datagrid('endEdit',existEditIndex);
	//删除行
	$('#returnordersgrid').datagrid('deleteRow',rowIndex);
	
	var data = $('#returnordersgrid').datagrid('getData');
	//重新加载数据
	$('#returnordersgrid').datagrid('loadData',data);
	//计算合计
	sum();
}

/**
 * 检查退货的数量，不能大于原订单数量，也不能小于0
 * @param num	原订单数量
 * @returns
 */
function checkNum(num){
	//获取数量编辑器
	var numEditor = getEditor('num');
	
	$(numEditor.target).bind('keyup',function(){
		//取得商品的数量
		var endNum = $(numEditor.target).val();
		if(endNum > num){
			$(numEditor.target).val(num);
			$.messager.alert('警告窗口','退货数量不能大于原订单数量！','info');
		}
		if(endNum == 0){
			$(numEditor.target).val(num);
			$.messager.alert('警告窗口','退货数量不能为0！','info');
		}
		if(endNum < 0){
			$(numEditor.target).val(num);
			$.messager.alert('警告窗口','退货数量不能小于0！','info');
		}
		//计算金额
		cal()
		//计算合计金额
		sum();
	});
}