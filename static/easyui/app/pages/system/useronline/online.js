require(['page'], function(Page){
	Page.create('system/useronline/online', function($, $c, tab, me){
		var grid = tab.find('table');
		
		return {
			_init: function(){
				grid.datagrid({
					url : $c.getApi('system.users.onlines'),
					autoLoad: true,
					columns : [ [ 
						{field : '', checkbox: true},
						{field : 'sessionId', title : '会话ID', hidden: true},
						{field : 'userId', title : '英文名', align:'left'},
						{field : 'userName', title : '中文名', align:'left'},
						{field : 'clientDevice', title : '设备', align:'left'}, 
						{field : 'os', title : '操作系统', align:'left'},
						{field : 'browser', title : '浏览器', align:'left'}, 	
						{field : 'clientIp', title : 'IP地址', align:'left'},
						{field : 'loginDate', title : '登录日期', align:'left'},
						{field : 'loginTime', title : '登录时间', align:'left'},
						{field : 'serverIp', title : '服务器IP', align:'left'},
						{field : 'email', title : '邮箱', align:'left'}, 	
						{field : 'mobile', title : '手机号', align:'left'},
						{field : 'orgId', title : '部门号', align:'left'}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-reload',text:'强制下线',handler: me.gotoOffline}
					]
				});
			},
			doQuery: function(){
				grid.datagrid('load');
			},
			gotoOffline: function(){
				me.selectOne(grid, me.doOffline);
			},
			doOffline: function(data){
				$.messager.confirm('确认','您确认要将该会话强制下线吗？',function(r){    
					if (r){
						$c.ajaxSubmit({
				    		method:'PUT',
							url: $c.getApi('system.users.states', data.sessionId+'/offline'),
						}, me.offlineCallback);
				    }    
				}); 
			},
			offlineCallback: function(){
				me.doQuery();
				grid.datagrid('clearChecked');
			}
		};
	});
});
