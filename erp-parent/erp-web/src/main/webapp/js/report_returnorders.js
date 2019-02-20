
$(function() {
	
	$('#grid').datagrid({
		
		url: 'returnorders_returnOrdersReport',
		columns: [[
			{field: 'name', title: '商品类型', width: 100},
			{field: 'y', title: '退货总金额', width: 100}
		]],
		singleSelect: true,
		onLoadSuccess: function(data) {
			showPieChart(data.rows);
		}
	});
	
	//绑定查询按钮
	$('#btnSearch').bind('click', function() {
		//将页面表单中的查询条件数据转换成json格式
		var formdata = $('#searchForm').serializeJSON();
		//如果有截止日期，在截止日期的最后加上23:59:59，查询这一天截至到最后的时间
		//因为某一天的时间，默认的是00：00：00，这样会造成查询的误差，少一天
		if('' != formdata.endDate) {
			formdata.endDate += " 23:59:59";
		}
		$('#grid').datagrid('load', formdata);
	});
	
});

function showPieChart(_data) {
	
	 $('#pieChart').highcharts({
	 	chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '销售退货总计'
        },
        credits: {enabled: false},
        exporting: {enabled: true},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: "所占比例",
            colorByPoint: true,
            data: _data
        }]
    });
}
