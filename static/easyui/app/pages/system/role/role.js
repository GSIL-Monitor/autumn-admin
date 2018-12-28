require(['treepage'], function(Page){
	Page.create('system/role/role', function($, $c, tab, me){
		var form = tab.find('form'),
			grid = tab.find('table'),
			dialog = tab.find('.dialog'),
			subForm,
			menuTree,
			spans;
		
		return {
			_init: function(){
				grid.datagrid({
					idField : 'roleId',
					form: form,
					autoLoad: true,
					url: $c.getApi('system.roles'),
					columns : [ [ 
						{field : '', checkbox: true},
						{field : 'roleId', title : '角色ID', hidden: true}, 	
						{field : 'roleName', title : '角色名称', align:'left'},
						{field : 'des', title : '描述', align:'left'}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-add',text:'新增',handler: me.gotoAdd}
						,'-',
						{iconCls: 'icon-edit',text:'修改',handler: me.gotoEdit}
						,'-',
						{iconCls: 'icon-remove',text:'删除',handler: me.gotoRemove}
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
				    title: '新增角色',    
				    height:450,
				    width:800,
				    href : $c.getUrl('system/role/add'),
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
				me.endEdit();
				
				var params = {
						url: $c.getApi('system.roles'),
						method: 'POST'
					},
					checkeds = dialog.find('span.tree-checkbox1[menu-id],span.tree-checkbox2[menu-id]');
				$.each(checkeds, function(i, n){
					var me = $(n), 
						menuId = me.attr('menu-id'),
						node = menuTree.treegrid('find', menuId);
					params['rolePerms[' + i + '].permId'] = node.permId;
					params['rolePerms[' + i + '].dataLevel'] = node.dataLevel;
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
					    title: '修改角色',    
					    height:450,
					    width:800,
					    href : $c.getUrl('system/role/edit'),
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
				me.endEdit();
				
				var params = {
						url: $c.getApi('system.roles', {id:subForm.data.roleId}),
						method: 'PUT'
					},
					checkeds = dialog.find('span.tree-checkbox1[menu-id],span.tree-checkbox2[menu-id]');
				$.each(checkeds, function(i, n){
					var me = $(n), 
						menuId = me.attr('menu-id'),
						node = menuTree.treegrid('find', menuId);
					params['rolePerms[' + i + '].permId'] = node.permId;
					params['rolePerms[' + i + '].dataLevel'] = node.dataLevel;
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
				$.messager.confirm('确认','您确认要删除所选择的 <font color="red">'+rows.length+'</font> 个角色吗？',function(r){    
					if (r){ 
						var ids = [];
						$.each(rows, function(i, row){
							ids.push(row.roleId);
						});
				    	$c.ajaxSubmit({
				    		method:'POST',
							_method: 'DELETE',
							url: $c.getApi('system.roles'),
							roleIds: ids
						}, me.deleteCallback);   
				    }    
				}); 
			},
			deleteCallback: function(){
				me.doQuery();
				grid.datagrid('clearChecked');
			},
			loadDialog : function ($container, data){
				var params = {};
				
				subForm = $container.find('form');
		    	menuTree = $container.find('table');
		    	
				if(data){
					params.id = data.roleId;
					subForm.form('load', data);
					subForm.data = data;
				}
				menuTree.treegrid({
					url : $c.getApi('system.roles.perms', params),
					method: 'get',
	                checkbox: false,
	                rownumbers: true,
	                idField: 'code',
	                treeField: 'text',
	                lines: true,
	                fitColumns:true,
					columns:[[
						{field:'code', title: '菜单ID', hidden: true},
						{field:'permId', title: '权限ID', hidden: true},
						{title:'菜单 <span class="menuTreeCheckAll tree-checkbox tree-checkbox0"> </span>', field:'text',
							  formatter: function(v,row){
								  return '<span menu-id="'+row.code+'" depth="'+row.depth+'" class="tree-checkbox '+row.cls +'"> </span> '+v;
							  }  
						},
						{field:'dataLevel', title: '权限级别', align:'center',editor : { type:'numberbox', options:{ min: -9,  max: 9 } }}
					]],
					loadFilter: function(res){    
						 if(res.success){
							 if(res.data){
								 var r = function(i,n){
										var children = n.children;
										if(!children || children.lenghth === 0){
											$.extend(n, {
												childrenNum : 1,
												thirdNum : 0, 
												checkedNum : (n.hasChecked ? 1 : 0), 
												cls : (n.hasChecked ? 'tree-checkbox1' : 'tree-checkbox0')
											});
										}else{
											n.state = 'closed';//非叶子节点置为关闭状态
											$.each(children, r);
											$.extend(n, me._resolver(children));
										}
									};
								$.each(res.data, r);
								return res.data;
							 }else{
								return [];
							 }
						 }else{
							 $.messager.alert('错误提示','加载菜单树时出现异常:'+(res.message||''),'error'); 
						 } 
					},
					onClickCell : function(field, record){
			      		me.endEdit();
			      		if(field === 'dataLevel'){
			      			menuTree.treegrid('beginEdit', record.code);
			      			menuTree.editingId = record.code;	
			      		}else{
			      			return true;
			      		}
					},
					onLoadSuccess: function(){
						me._setAllChecked();
						spans = dialog.find('span[menu-id]').click(function(){
							me._onCheckbox(this);
						});
						dialog.find('span.menuTreeCheckAll').click(function(){
							var checked = $(this).hasClass('tree-checkbox1');
							me._changeCls({cls: (checked?'tree-checkbox0':'tree-checkbox1')});
							$.each(dialog.find('span[menu-id][depth=1]'), function(){
								me._onCheckbox(this,checked);
							});
						});
					},
					onAfterEdit: function(row,changes){
						$.extend(row, changes);
						//编辑完之后，dom结构被重新构造了，这里需要重新选择spans，并且重新绑定事件到被重新构造的那一个span
						spans = dialog.find('span[menu-id]');
						spans.filter('[menu-id='+row.code+']').click(function(){
							me._onCheckbox(this);
						});
					}
				});
			},
			/**
			 * 结束编辑状态
			 */
			endEdit : function(){
				if(menuTree && menuTree.editingId){
					menuTree.treegrid('endEdit', menuTree.editingId);
	      		}
			},
			//复选框事件
			_onCheckbox : function(obj, checked){
				var $obj = $(obj),
					menuId = $obj.attr('menu-id'),
					node = menuTree.treegrid('find', menuId),
					setSelfAndChildren = function(id,checked){//设置自身和子节点的选择状态
						var toggle = function(id,checked){
								var nd = menuTree.treegrid('find', id);
								$.extend(nd,{
									thirdNum: 0, 
									checkedNum : (checked ? 0 : nd.childrenNum),
									cls : (checked ? 'tree-checkbox0' : 'tree-checkbox1')
								});
								me._changeCls(nd);
							};
						toggle(id, checked);
						$.each(menuTree.treegrid('getChildren', id), function(i, child){
							toggle(child.code, checked);
						});
					},
					setParent = function(id){//设置父节点的状态
						var nd = menuTree.treegrid('find', id);
						if(nd){
							$.extend(nd, me._resolver(nd.children));
							me._changeCls(nd);
							setParent(nd.parentCode);
						}
					};
				if(checked === undefined){
					checked = !$obj.hasClass('tree-checkbox0');//当前是否已选择
				}
				setSelfAndChildren(menuId, checked);
				setParent(node.parentCode);
				me._setAllChecked();
			},
			//设置全选框
			_setAllChecked : function (){
				var roots = dialog.find('span[menu-id][depth=1]'), children = [];
				$.each(roots, function(i, cc){
					children.push(menuTree.treegrid('find', $(cc).attr('menu-id')));
				});
				me._changeCls(me._resolver(children));
			},
			//解析子节点个数、已勾选节点个数、部分勾选节点个数、样式等
			_resolver : function(children){
				var tcn = children.length, cn = 0, tn = 0, cls = 'tree-checkbox2';
				$.each(children, function(i, c){
					if(c.childrenNum == c.checkedNum){
						cn++;
					}else if(c.checkedNum > 0){
						tn++;
					}
				});
				if(cn == tcn){
					cls = 'tree-checkbox1';
			    }else if(cn == 0 && tn == 0){
			    	cls = 'tree-checkbox0';
			    }
				return {childrenNum : tcn, checkedNum : cn, thirdNum : tn, cls : cls};
			},
			//改变样式
			_changeCls: function(node){
				var id = node.code,$n;
				if(!id){
					$n = dialog.find('span.menuTreeCheckAll');
				}else{
					$n = spans.filter('[menu-id='+id+']');
				}
				$n.removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2').addClass(node.cls);
			}
		};
	});
});