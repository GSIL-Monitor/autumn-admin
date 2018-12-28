require(['page'], function(Page){
	Page.create('system/user/user', function($, $c, tab, me){
		var form = tab.find('form'),
			grid = tab.find('table'),
			dialog = tab.find('.dialog'),
			subForm,
			subGrid,
			defaultRoleId;
		
		return {
			_init: function(){
				grid.datagrid({
					idField : 'userId',
					form: form,
					autoLoad: true,
					url: $c.getApi('system.users'),
					frozenColumns : [[
						{field : '', checkbox: true},
						{field : 'userId', title : '用户ID', hidden: true}, 	
						{field : 'userName', title : '英文名', align:'left'},
						{field : 'showName', title : '中文名', align:'left'}
					]],
					columns : [ [
						{field : 'email', title : '邮箱', align:'left'}, 	
						{field : 'mobile', title : '手机号', align:'left'},
						{field : 'orgId', title : '部门号', align:'left'},
						{field : 'enable', title : '是否启用', align:'left'},
						{field : 'locked', title : '是否锁定', align:'left'},
						{field : 'lockedTime', title : '锁定时间', align:'left'},
						{field : 'tryLoginTimes', title : '尝试登录次数', align:'left'},
						{field : 'lastLoginDate', title : '最后登录日期', align:'left'}, 	
						{field : 'lastLoginTime', title : '最后登录时间', align:'left'},
						{field : 'lastLoginDevice', title : '最后登录设备', align:'left'},
						{field : 'lastLoginIp', title : '最后登录IP', align:'left'}, 	
						{field : 'lastSessionId', title : '最后会话ID', align:'left'}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-add',text:'新增',handler: me.gotoAdd}
						,'-',
						{iconCls: 'icon-edit',text:'修改',handler: me.gotoEdit}
						,'-',
						{iconCls: 'icon-remove',text:'删除',handler: me.gotoRemove}
						,'-',
						{iconCls: 'aut-icon-right-start',text:'启用',handler: function(){me.gotoUpdateState('enable','启用')}}
						,'-',
						{iconCls: 'aut-icon-right-stop',text:'停用',handler: function(){me.gotoUpdateState('disable','停用')}}
						,'-',
						{iconCls: 'aut-icon-node-64',text:'强制锁定',handler: function(){me.gotoUpdateState('lock','强制锁定')}}
						,'-',
						{iconCls: 'aut-icon-node-63',text:'手工解锁',handler: function(){me.gotoUpdateState('unlock','手工解锁')}}
					]
				});
			},
			doQuery: function(){
				grid.datagrid('load');
			},
			closeDialog : function(){
				dialog.dialog('close');
			},
			gotoAdd: function(){
				if(!form.form('validate')){
					return false;
				}
				dialog.dialog({    
				    title: '新增用户',    
				    height:450,
				    width:800,
				    href : $c.getUrl('system/user/add'),
				    onLoad : function(){
				    	me.loadDialog($(this));
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : me.doAdd}, 
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				}); 
			},
			doAdd : function(){
				if(!subForm.form('validate')){
					return false;
				}
				
				var params = {
						url: $c.getApi('system.users'),
						method: 'POST'
					},
					checkeds = subGrid.datagrid('getChecked');
				$.each(checkeds, function(i, n){
					params['roles[' + i + '].roleId'] = n.roleId;
					params['roles[' + i + '].default'] = defaultRoleId === n.roleId;
				});
				$c.ajaxSubmitForm(subForm, params, me.addCallback);
			},
			addCallback: function(){
				me.doQuery();
				me.closeDialog();
			},
			gotoEdit: function(){
				me.selectOne(grid, function(data){
					dialog.dialog({    
					    title: '修改用户',    
					    height:450,
					    width:800,
					    href : $c.getUrl('system/user/edit'),
					    onLoad : function(){
					    	me.loadDialog($(this), data);
					    },
					    buttons : [ 
					    	{text : '提交', iconCls:'icon-save', handler : me.doUpdate}, 
					    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
					    ]
					}); 
				});
			},
			doUpdate: function(data){
				if(!subForm.form('validate')){
					return false;
				}
				
				var params = {
						url: $c.getApi('system.users', {id:subForm.data.userId}),
						method: 'PUT'
					},
					checkeds = subGrid.datagrid('getChecked');
				$.each(checkeds, function(i, n){
					params['roles[' + i + '].roleId'] = n.roleId;
					params['roles[' + i + '].isDefault'] = defaultRoleId === n.roleId;
				});
				$c.ajaxSubmitForm(subForm, params, me.updateCallback);
			},
			updateCallback: function(){
				me.doQuery();
				me.closeDialog();
			},
			gotoRemove: function(){
				me.selectRows(grid, me.doDelete);
			},
			doDelete: function(rows){
				$.messager.confirm('确认','您确认要删除所选择的 <font color="red">'+rows.length+'</font> 个用户吗？',function(r){    
					if (r){ 
						var ids = [];
						$.each(rows, function(i, row){
							ids.push(row.userId);
						});
				    	$c.ajaxSubmit({
				    		method:'POST',
							_method: 'DELETE',
							url: $c.getApi('system.users'),
							userIds: ids
						}, me.deleteCallback);   
				    }    
				}); 
			},
			deleteCallback: function(){
				me.doQuery();
				grid.datagrid('clearChecked');
			},
			gotoUpdateState: function(opt, hint){
				me.selectOne(grid, function(data){
					$.messager.confirm('确认','您确认要'+hint+'用户 <font color="red">'+data.userName+'('+data.showName+')</font> 吗？',function(r){    
						if (r){ 
					    	$c.ajaxSubmit({
					    		method:'PUT',
								url: $c.getApi('system.users.states', data.userId+'/'+opt),
							}, me.updateStateCallback);   
					    }    
					});
				});
			},
			updateStateCallback: function(){
				me.doQuery();
				grid.datagrid('clearChecked');
			},
			loadDialog : function ($container, data){
				var radioName = $c.guid(),//为了防止在单页面系统中可能出现相同名称的radio，这里每次都使用随机的名称
					params = {};
				
				subForm = $container.find('form');
		    	subGrid = $container.find('table');
		    	
				if(data){
					params.id = data.userId;
					subForm.form('load', data);
					subForm.data = data;
				}
				subGrid.datagrid({
		    		pagination: false,
		    		autoLoad: true,
					url : $c.getApi('system.users.roles', params),
					columns:[[
						{field:'checked', checkbox: true},
						{field:'roleId', title: '角色ID', hidden: true},
						{field:'roleName', title: '角色名称', fit: true},
						{field:'default', title: '是否默认角色', align:'center',formatter:function(value){
							var checked = value ? 'checked="checked"':'';
							return '<input type="radio" name="'+radioName+'" '+checked+'>';
						}}
					]],
					onClickRow: function(index, row){//相当于给单选框添加事件处理
						var radio = $container.find('input:radio').eq(index).is(':checked');
						if(radio){
							defaultRoleId = row.roleId;
							subGrid.datagrid('checkRow', index);
						}else{
							subGrid.datagrid('uncheckRow', index);
						}
					},
					onLoadSuccess: function(data, grid){
						var $g = $(grid||this);
						if(data && data.rows){
							$.each(data.rows, function(i,c){
								if(c.checked){
									$g.datagrid('checkRow', i);
								}
								if(c['default']){
									defaultRoleId = c.roleId;
								}
							});
							$g.datagrid('clearSelections');
						}
					}
				});
				$container.find('.icon-search').click(function(){
					var username = $container.find('[name=userName]').validatebox('getValue');
					if(username){
						$c.ajaxSubmit({
		     			   method: "GET",
		     			   url: $c.getApi('system.users.tof', {id: username})
		     			}, function(data){
		     				if(data){
	     						subForm.form('load', data);
	     					}else{
	     						$.messager.alert('错误提示','未找到英文名:'+username,'error'); 
	     					}
	     			   });
					}
				});
			}
		};
	});
});