$(function(){
	//加载表格数据
	$('#grid').datagrid({
		queryParams:{},
		columns:[[
		    {field:'name',title:'月份',width:100},
		    {field:'y',title:'销售额',width:100}
		]],
		singleSelect: true,
		onLoadSuccess:function(data){
			//alert(JSON.stringify(data));
			//显示图
			//showChart(data.rows);
			//showLineChart();
			showColumnChart();
		}
	});

	//点击查询按钮
	$('#btnSearch').bind('click',function(){
		//把表单数据转换成json对象
		var formdata = $('#searchForm').serializeJSON();
		$('#grid').datagrid('load',formdata);
		$('#grid').datagrid({
			url:'report_trendReport',
			queryParams:formdata
		});
	});
	
	
});

function showColumnChart() {
	//alert($('#grid').datagrid('getRows'));
	var months = new Array();
	for (var i = 1; i <= 12; i++) {
		months.push(i + "月");
	}
	
    $('#trendColumnChart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '销售趋势柱状图'
        },
        subtitle: {
            text: 'Source: www.itcast.cn'
        },
        xAxis: {
            categories: months,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (元)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '月份',
            data: $('#grid').datagrid('getRows')
        }]
    });
}

function showLineChart(){
	var months = new Array();
	for(var i = 1; i <= 12; i++){
		months.push(i + "月");
	}
	$('#trendLineChart').highcharts({
        title: {
            text:$('#year').combobox('getValue') + "年销售趋势分析",
            x: -20 //center
        },
        subtitle: {
            text: 'Source: www.itcast.com',
            x: -20
        },
        xAxis: {
            categories: months
        },
        yAxis: {
            title: {
                text: '销售额'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '元'
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '销售趋势',
            data: $('#grid').datagrid('getRows')
        }]
    });
}