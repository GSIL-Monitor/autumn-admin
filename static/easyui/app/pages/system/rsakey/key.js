require(['page'], function(Page){
	Page.create('system/rsakey/key', function($, $c, tab, me){
		var grid = tab.find('table');
		
		return {
			_init: function(){
				grid.datagrid({
					url : $c.getApi('system.rsakeypairs'),
					autoLoad: true,
					idField: 'publicKey',
					columns : [ [ 
						{field : '', checkbox: true},
						{field : 'publicKey', title : '公钥', align:'left'}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-reload',text:'更新密钥',handler: me.gotoRefresh}
					]
				});
			},
			doQuery: function(){
				grid.datagrid('load');
			},
			gotoRefresh: function(){
				me.selectOne(grid, me.doRefresh);
			},
			doRefresh: function(data){
				$.messager.confirm('确认','您确认要刷新公钥吗？',function(r){    
					if (r){ 
				    	$c.ajaxSubmit({
				    		method:'POST',
							_method: 'PUT',
							url: $c.getApi('system.rsakeypairs')
						}, me.refreshCallback);   
				    }    
				}); 
			},
			refreshCallback: function(){
				me.doQuery();
				grid.datagrid('clearChecked');
			}
		};
	});
});