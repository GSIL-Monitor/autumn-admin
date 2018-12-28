require(['page'], function(Page){
	Page.create('fit/selfstock/feature', function($, $c, tab, me){
		var tabpanel = tab.find('.easyui-tabs'),
			queryForm,
			queryGrid,
			monitorForm,
			monitor,
			monitorCount,
			monitorConsole;
		return {
			_init: function(){
				tabpanel.tabs({
					onLoad: function(panel){
						var qf = tab.find('.easyui-form.query');
						if(!queryForm && qf && qf.length >= 1){
							queryForm = qf;
							queryGrid = tab.find('table.query');
							me.initQueryTab();
							tab.find('.easyui-linkbutton[fn=doQuery]').linkbutton('click', me.doQuery);
						}
						var mt = tab.find('.easyui-form.monitor');
						if(!monitorForm && mt && mt.length >= 1){
							monitorForm = mt;
							monitorConsole = tab.find('div.monitor-console');
							me.bindEvent(tab.find('header.monitor-console-header'));
						}
					}
				});
			},
			initQueryTab: function(){
				queryGrid.datagrid({
					idField : 'key',
					form: queryForm,
					autoLoad: false,
					pagination: false,
					url: $c.getApi('fit.selfstocks'),
					frozenColumns : [[
						{field : 'key', title : 'uid#日期', align:'left'}, 	
						{field : 'version', title : '当前版本', align:'right'},
						{field : 'host', title : '计算主机', align:'left'},
						{field : 'thread', title : '计算线程号', align:'right'}
					]],
					columns : [ [
						{field : 'stockClickNums', title : '股票点击次数', align:'right'},
						{field : 'infoClickNums', title : '资讯点击次数', align:'right'},
						{field : 'addSelfStockNums', title : '添加自选股次数', align:'right'},
						{field : 'discussStockNums', title : '评论股票次数', align:'right'}, 	
						{field : 'clickStockIds', title : '点击的股票ID', align:'left'},
						{field : 'addSelfStockIds', title : '添加为自选股的股票ID', align:'left'},
						{field : 'discussStockIds', title : '评论的股票ID', align:'left'}
			        ] ],
			        tools:[
			        	{iconCls: 'icon-reload', handler: me.doQuery}
			        ]
				});
			},
			doQuery: function(){
				queryGrid.datagrid('load');
			},
			startMonitor: function(){
				var last,
					values,
					append = function(){
						$c.ajaxSubmit({
							url: $c.getApi('fit.selfstocks'),
							method: 'GET',
							uids: values.uids,
							date: values.date,
							needBlock: false
						},function(feature){
							var html = me.getMonitorHtml(monitorCount, last, feature);
							last = feature;
							monitorConsole.append(html);
							if(monitorCount < values.num && monitor){
								monitorCount++;
								monitor = setTimeout(append, values.interval*1000);
							}else{
								if(monitor){
									monitorConsole.append('<div class="panel-title" style="color:blue;">已完成'+values.num+'次查询...</div>');
								}else{
									monitorConsole.append('<div class="panel-title" style="color:red;">手工停止监控，已完成'+monitorCount+'次查询...</div>');
								}
								monitor = undefined;
							}
						});
					};
				
				//monitorConsole.empty();
				if(!monitorForm.form('validate')){
					monitorConsole.append('<div class="panel-title" style="color:red;">请检查监控设定的条件...</div>');
				}else if(monitor){
					$.messager.alert('错误提示','已经在监控，如果监控设定的条件有变更，请先停止监控，或者等待本次监控运行完成','error'); 
				}else{
					monitorCount = 1;
					values = monitorForm.form('getValues');
					monitorConsole.append('<div class="panel-title" style="color:blue;">监控条件：用户ID='+values.uids+',日期='+values.date+',共查询'+values.num+'次，每隔'+values.interval+'秒查询一次</div>');
					monitor = true;
					append();
				}
			},
			stopMonitor: function(){
				if(monitor){
					clearTimeout(monitor);
					monitor = undefined;
					monitorConsole.append('<div class="panel-title" style="color:red;">手工停止监控，已完成'+(monitorCount-1)+'次查询...</div>');
				}
			},
			clearMonitor: function(){
				if(monitorConsole){
					monitorConsole.empty();
				}
			},
			getMonitorHtml: function(monitorCount, last, feature){
				var i,
					l,
					html = '<div style="color:blue;">第'+monitorCount+'次查询</div>';
				for(i = 0, l = feature.length; i < l; i++){
					html += '<div>'+JSON.stringify(feature[i])+'</div>';
					if(last && last[i].version < feature[i].version){
						html += '<div style="color:red;">change: {'+me.getFeatureDiffHtml(last[i], feature[i])+'}</div>';
					}
				}
				return html;
			},
			getFeatureDiffHtml: function(f1, f2){
				var html = 'key: "'+f1.key+'", version: "'+f1.version+'-->'+f2.version+'"';
				if(f2.stockClickNums > f1.stockClickNums){
					html += ', addStockClickNums: '+(f2.stockClickNums - f1.stockClickNums);
					html += ', addStockClickIds: "'+me.getArrDiff(f1.clickStockIds, f2.clickStockIds).join(',')+'"';
				}
				if(f2.infoClickNums > f1.infoClickNums){
					html += ', addInfoClickNums: '+(f2.infoClickNums - f1.infoClickNums);
				}
				if(f2.addSelfStockNums > f1.addSelfStockNums){
					html += ', addAddSelfStockNums: '+(f2.addSelfStockNums - f1.addSelfStockNums);
					html += ', addAddSelfStockIds: "'+me.getArrDiff(f1.addSelfStockIds, f2.addSelfStockIds).join(',')+'"';
				}
				if(f2.discussStockNums > f1.discussStockNums){
					html += ', addDiscussStockNums: '+(f2.discussStockNums - f1.discussStockNums);
					html += ', addDiscussStockIds: "'+me.getArrDiff(f1.discussStockIds, f2.discussStockIds).join(',')+'"';
				}
				return html;
			},
			getArrDiff: function(arr1, arr2){
				var arr = [];
				for(var i = arr1.length, l = arr2.length; i < l; i++){
					arr.push(arr2[i]);
				}
				return arr;
			}
		};
	});
});