require(['treepage', 'entity', 'datagrid-dnd', 'treegrid-dnd'], function(Page, entity){
	Page.create('system/entity/entity', function($, $c, tab, me){
		var form = tab.find('form'),
			tree = tab.find('ul'),
			grid = tab.find('table'),
			dialog = tab.find('.dialog');
		
		return {
			_init: function(){
				tree.tree({
					 url : $c.getApi('system.entitys', 'tree'),
					 method: 'GET',
					 lines: true,
					 loadFilter: function(res){    
						 if(res.success){
							 me.setState(res.data);
							 return res.data;
						 }else{
							 $.messager.alert('错误提示','加载实体类别时出现异常:'+(res.message||''),'error'); 
						 }  
					 },
					 onLoadSuccess: function(){
						 tree.tree('expandAll');
					 },
					 onClick: me.doQuery
				});
				
				grid.datagrid({
					url : $c.getApi('system.entitys'),
					idField : 'entityId',
					form: form,
					customQueryParam: function(param){
						var node = tree.tree('getSelected');
						if(node){
							param.entityGroup = node.id;
						}
					},
					autoLoad: true,
					columns : [ [ 
						{field : '', checkbox: true},
						{field : 'entityId', title : '实体ID', align:'left'}, 	
						{field : 'entityName', title : '实体名称', align:'left'},
						{field : 'entityGroup', title : '实体组别', align:'left'}, 	
						{field : 'seqno', title : '序号', hidden:true},
						{field : 'des', title : '描述', align:'left'}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-add',text:'新增',handler: me.gotoAdd}
						,'-',
						{iconCls: 'icon-edit',text:'修改',handler: me.gotoUpdate}
						,'-',
						{iconCls: 'icon-remove',text:'删除',handler: me.gotoRemove}
						,'-',
						{iconCls: 'icon-468',text:'维护属性',handler: me.gotoUpdateProperties}
					]
				});
			},
			doQuery: function(){
				grid.datagrid('load');
				grid.datagrid('clearChecked');
			},
			closeDialog : function(){
				dialog.dialog('close');
			},
			gotoAdd: function(){
				dialog.dialog({    
				    title: '新增实体',    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/entity/add'),
				    onLoad : function(){
				    	me.setComboFields($(this));
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : me.doAdd}, 
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				}); 
			},
			doAdd : function(){
				$c.ajaxSubmitForm(dialog.find('form'), {
					url: $c.getApi('system.entitys'),
					method: 'POST'
				}, function(){
					me.doQuery();
					me.closeDialog();
					entity.clearEntityCache();
				});
			},
			gotoUpdate: function(){
				me.selectOne(grid, function(data){
					dialog.dialog({    
					    title: '修改实体',    
					    height: 450,
					    width: 800,
					    href : $c.getUrl('system/entity/edit'),
					    onLoad : function(){
					    	me.setComboFields($(this));
					    	$(this).find('form').form('load', data);
					    },
					    buttons : [ 
					    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdate(data);}}, 
					    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
					    ]
					});
				});
			},
			doUpdate: function(data){
				$c.ajaxSubmitForm(dialog.find('form'), {
					url: $c.getApi('system.entitys', data.entityId),
					method: 'PUT'
				}, function(){
					me.doQuery();
					me.closeDialog();
					entity.clearEntityCache();
				});
			},
			gotoRemove: function(){
				me.selectRows(grid, me.doDelete);
			},
			doDelete: function(rows){
				$.messager.confirm('确认','您确认要删除所选择的 <font color="red">'+rows.length+'</font> 个实体吗？',function(r){    
					if (r){ 
						var entityIds = [];
						$.each(rows, function(i, row){
							entityIds.push(row.entityId);
						});
				    	$c.ajaxSubmit({
				    		method:'POST',
							_method: 'DELETE',
							url: $c.getApi('system.entitys'),
							entityIds: entityIds
						}, function(){
							me.doQuery();
							entity.clearEntityCache();
						});   
				    }    
				}); 
			},
			gotoUpdateProperties: function(){
				me.selectOne(grid, function(data){
					var entityId = data.entityId;
					$c.ajaxSubmit({
	     			   method: "GET",
	     			   url: $c.getApi('system.entitys', '/properties/'+entityId)
	     			}, function(data){
	     				dialog.dialog({    
						    title: '修改实体属性',    
						    height: 450,
						    width: 800,
						    href : $c.getUrl('system/entity/detail'),
						    onLoad : function(){
						    	var content = $(this);
						    	var html = me.getProfileHtml(data, false, 'properties');
						    	content.find('.aut-group-content').empty().append(html);
						    	$.parser.parse(content);
								me.setComboFields(content);
						    },
						    buttons : [ 
						    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdateProperties(entityId);}}, 
						    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
						    ]
						});
	     			});
				});
			},
			doUpdateProperties: function(entityId){
				$c.ajaxSubmitForm(dialog.find('form'), {
					url: $c.getApi('system.entitys', '/properties/'+entityId),
					method: 'POST',
					_method:'PUT'
				}, function(){
					me.doQuery();
					me.closeDialog();
					entity.clearEntityCache();
				});
			}
		};
	});
});