require(['treepage', 'datagrid-dnd', 'treegrid-dnd'], function(Page){
	Page.create('system/param/define', function($, $c, tab, me){
		var form = tab.find('form'),
			tree = tab.find('ul'),
			grid = tab.find('table'),
			dialog = tab.find('.dialog'),
			editIndex,
			editId,
			subGrid,
			cNode;
		
		return {
			_init: function(){
				tree.tree({
					 url : $c.getApi('system.param.defines', 'tree'),
					 method: 'GET',
					 lines: true,
					 loadFilter: function(res){    
						 if(res.success){
							 me.setState(res.data);
							 return res.data;
						 }else{
							 $.messager.alert('错误提示','加载参数组别时出现异常:'+(res.message||''),'error'); 
						 }  
					 },
					 onLoadSuccess: function(){
						 tree.tree('expandAll');
					 },
					 onClick: me.doQuery
				});
				
				grid.datagrid({
					url : $c.getApi('system.param.defines'),
					idField : 'paramCode',
					form: form,
					customQueryParam: function(param){
						var node = tree.tree('getSelected');
						if(node){
							param.paramGroup = node.id;
						}else{
							$.messager.alert('错误提示','请从左边的树型结构中选择参数组别之后再查询','error'); 
							return false;
						}
					},
					autoLoad: false,
					columns : [ [ 
						{field : '', checkbox: true},
						{field : 'paramCode', title : '参数代码', align:'left'}, 	
						{field : 'paramName', title : '参数名称', align:'left'},
						{field : 'paramGroup', title : '参数组别代码', align:'left'}, 	
						{field : 'paramGroupName', title : '参数组别名称', align:'left'},
						{field : 'paramType', title : '参数类型代码', align:'left'},
						{field : 'paramTypeName', title : '参数类型名称', align:'left'}, 	
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
						{iconCls: 'icon-468',text:'维护明细',handler: me.gotoDetail}
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
				    title: '新增参数定义',    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/param/add'),
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
					url: $c.getApi('system.param.defines'),
					method: 'POST'
				}, function(){
					me.doQuery();
					me.closeDialog();
				});
			},
			gotoUpdate: function(){
				me.selectOne(grid, function(data){
					dialog.dialog({    
					    title: '修改参数定义',    
					    height: 450,
					    width: 800,
					    href : $c.getUrl('system/param/edit'),
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
					url: $c.getApi('system.param.defines', data.paramCode),
					method: 'PUT'
				}, function(){
					me.doQuery();
					me.closeDialog();
					me.cleanParamCodes(data.paramCode);
				});
			},
			gotoRemove: function(){
				me.selectRows(grid, me.doDelete);
			},
			doDelete: function(rows){
				$.messager.confirm('确认','您确认要删除所选择的 <font color="red">'+rows.length+'</font> 个参数定义吗？',function(r){    
					if (r){ 
						var paramCodes = [];
						$.each(rows, function(i, row){
							paramCodes.push(row.paramCode);
						});
				    	$c.ajaxSubmit({
				    		method:'POST',
							_method: 'DELETE',
							url: $c.getApi('system.param.defines'),
							paramCodes: paramCodes
						}, function(){
							me.doQuery();
							me.cleanParamCodes(paramCodes);
						});   
				    }    
				}); 
			},
			gotoDetail: function(){
				me.selectOne(grid, function(data){
					var paramType = data.paramType.toLowerCase();
					switch(paramType){
					case 'single':
						me.gotoUpdateSingle(data);
						break;
					case 'list':
						me.gotoUpdateEnums(data);
						break;
					case 'region':
						me.gotoUpdateRegion(data);
						break;
					case 'tree':
						me.gotoUpdateTree(data);
						break;
					}
				});
			},
			gotoUpdateSingle: function(data){
				dialog.dialog({    
				    title: '修改单值参数定义：'+data.paramName,    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/param/single'),
				    onLoad : function(){
				    	var form = $(this).find('form');
				    	me.setComboFields($(this));
				    	$c.ajaxSubmit({url: $c.getApi('system.param.singles', data.paramCode), method:'GET'}, function(rs){
				    		form.form('load', rs);
				    	})
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdateSingle(data);}},
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				});
			},
			doUpdateSingle: function(data){
				$c.ajaxSubmitForm(dialog.find('form'), {
					url: $c.getApi('system.param.singles', data.paramCode),
					method: 'PUT'
				}, function(){
					me.doQuery();
					me.closeDialog();
					me.cleanParamCodes(data.paramCode);
				});
			},
			gotoUpdateEnums: function(data){
				dialog.dialog({    
				    title: '修改枚举参数定义',    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/param/grid'),
				    onLoad : function(){
				    	editIndex = undefined;
						subGrid = $(this).find('table');
				    	
						subGrid.datagrid({
							url : $c.getApi('system.param.enums', data.paramCode),
							title: '枚举参数:'+data.paramName+'（<font color="red">双击可开始编辑，也可拖动排序，但所有操作均需点击下面的保存按钮后方能生效</font>）',
							pagination: false,
							fitColumns: true,
							autoLoad: true,
							dnd : true,
							columns : [ [ 
								{field : 'itemCode', title : '枚举项代码', align:'left', editor:{type:'validatebox',options:{required: true}}},
								{field : 'itemText', title : '枚举项名称', align:'left', editor:{type:'validatebox',options:{required: true}}}, 	
								{field : 'itemParam', title : '枚举项参数', align:'left', editor:'text'},
								{field : 'des', title : '描述', align:'left', editor:'textarea'}
					        ] ],
					        toolbar: [
								{iconCls: 'icon-add',text:'添加新行',handler: me.editor.append}
								,'-',
								{iconCls: 'icon-remove',text:'移除编辑行',handler: me.editor.removeit}
							],
							onDblClickRow: me.editor.beginEditRow,
							onClickRow: me.editor.onClickRow,
							onEndEdit: me.editor.onEndEdit,
							onLoadSuccess:function(){
				                $(this).datagrid('enableDnd');
				            }
						});
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdateEnums(data);}},
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				});
			},
			doUpdateEnums: function(data){
				if(!me.editor.endEditing()){
					return false;
				}
				var params = {
						url: $c.getApi('system.param.enums', data.paramCode),
						method: 'PUT',
						paramCode: data.paramCode
					},
					rows = subGrid.datagrid('getRows');
				if(rows && rows.length >= 1){
					$.each(rows, function(i, row){
						params['items[' + i + '].itemCode'] = row.itemCode;
						params['items[' + i + '].itemText'] = row.itemText;
						params['items[' + i + '].itemParam'] = row.itemParam;
						params['items[' + i + '].des'] = row.des;
					});
				}
				
				$c.ajaxSubmit(params, function(){
					me.doQuery();
					me.closeDialog();
					me.cleanParamCodes(data.paramCode);
				});
			},
			gotoUpdateRegion: function(data){
				dialog.dialog({    
				    title: '修改区间参数定义',    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/param/grid'),//复用
				    onLoad : function(){
				    	editIndex = undefined;
						subGrid = $(this).find('table');
				    	
						subGrid.datagrid({
							url : $c.getApi('system.param.regions', data.paramCode),
							idField : 'itemCode',
							title: '区间参数:'+data.paramName+'（<font color="red">双击可开始编辑，也可拖动排序，但所有操作均需点击下面的保存按钮后方能生效</font>）',
							pagination: false,
							fitColumns: true,
							autoLoad: true,
							dnd : true,
							columns : [ [ 
								{field : 'itemCode', title : '枚举项代码', align:'left', editor:{type:'validatebox',options:{required: true}}},
								{field : 'itemText', title : '枚举项名称', align:'left', editor:{type:'validatebox',options:{required: true}}},
								{field : 'leftSign', title : '左区间符号', align:'left', editor:{type:'combobox',options:{required: true, data:me.getComboArray('REGION_SIGN_OPTIONS')}}},
								{field : 'leftValue', title : '左区间值', align:'right', editor:'numberbox'},
								{field : 'rightSign', title : '右区间符号', align:'left', editor:{type:'combobox',options:{required: true, data:me.getComboArray('REGION_SIGN_OPTIONS')}}},
								{field : 'rightValue', title : '右区间值', align:'right', editor:'numberbox'},
								{field : 'itemParam', title : '枚举项参数', align:'left', editor:'text'},
								{field : 'des', title : '描述', align:'left'}
					        ] ],
					        toolbar: [
								{iconCls: 'icon-add',text:'添加新行',handler: me.editor.append}
								,'-',
								{iconCls: 'icon-remove',text:'移除编辑行',handler: me.editor.removeit}
							],
							onDblClickRow: me.editor.beginEditRow,
							onClickRow: me.editor.onClickRow,
							onEndEdit: me.editor.onEndEdit,
							onLoadSuccess:function(){
				                $(this).datagrid('enableDnd');
				            }
						});
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdateRegion(data);}},
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				});
			},
			doUpdateRegion: function(data){
				if(!me.editor.endEditing()){
					return false;
				}
				var params = {
						url: $c.getApi('system.param.regions', data.paramCode),
						method: 'PUT',
						paramCode: data.paramCode
					},
					rows = subGrid.datagrid('getRows');
				if(rows && rows.length >= 1){
					$.each(rows, function(i, row){
						params['items[' + i + '].itemCode'] = row.itemCode;
						params['items[' + i + '].itemText'] = row.itemText;
						params['items[' + i + '].itemParam'] = row.itemParam;
						params['items[' + i + '].des'] = row.des;
						params['items[' + i + '].leftSign'] = row.leftSign;
						params['items[' + i + '].leftValue'] = row.leftValue;
						params['items[' + i + '].rightSign'] = row.rightSign;
						params['items[' + i + '].rightValue'] = row.rightValue;
					});
				}
				
				$c.ajaxSubmit(params, function(){
					me.doQuery();
					me.closeDialog();
					me.cleanParamCodes(data.paramCode);
				});
			},
			gotoUpdateTree: function(data){
				dialog.dialog({    
				    title: '修改树型参数定义',    
				    height: 450,
				    width: 800,
				    href : $c.getUrl('system/param/grid'),
				    onLoad : function(){
				    	subGrid = $(this).find('table');
				    	
				    	subGrid.treegrid({
							url : $c.getApi('system.param.trees', data.paramCode),
							title: '树型参数:'+data.paramName+'（<font color="red">双击可开始编辑，可右键操作，也可拖动排序，但所有操作均需点击下面的保存按钮后方能生效</font>）',
							method: 'get',
			                checkbox: false,
			                rownumbers: true,
			                idField: 'id',
			                treeField: 'text',
			                lines: true,
			                fitColumns:true,
			                dnd : true,
							columns:[[
								{field: 'id', title: '节点Id', hidden:true},
								{field: 'code', title: '节点代码', align: 'left', editor:{type:'validatebox',options:{required: true}}},
								{field: 'text', title: '节点名称', align: 'left', editor:{type:'validatebox',options:{required: true}}},
								{field: 'data', title: '节点参数', align: 'left', editor:'text'},
								{field: 'icon', title : '节点图标', align:'left', editor:'text'},
								{field: 'url', title : '节点URL', align:'left', editor:'text'},
								{field: 'des', title : '节点描述', align:'left', editor:'textarea'}
							]],
							loadFilter: function(res){   
								 if(res.success){
									 me.setState(res.data);
									 return [{id:'-1', code:'', text: data.paramName, state: 'open', children:res.data}];
								 }else if($.isArray(res)){
									 return res;
								 }else{
									 $.messager.alert('错误提示','加载树型参数时出现异常:'+(res.message||''),'error'); 
								 }  
							},
							onContextMenu: function(e,node){
								if(me.treeeditor.endEditing()){
									 editId = node.id;
									 var items = [];
									 items.push({ text: '新增', iconCls: 'icon-add', onclick: me.treeeditor.append});
									 if(me._isRoot(node)){
										items.push({ text: '删除', iconCls: 'icon-remove', disabled: true});
									 }else{
										items.push({ text: '删除', iconCls: 'icon-remove', onclick: me.treeeditor.removeit});
									 }
									 me.showContextMenu(e, items);
								}
							},
							onBeforeDrop: function(target, source, point){
								if(me._isRoot(target) && (point === 'top' || point === 'bottom')){
									// 不能拖成根节点的兄弟节点
									return false;
								}
							},
							onDblClickRow: me.treeeditor.beginEditRow,
							onClickRow: me.treeeditor.onClickRow,
							onAfterEdit: me.treeeditor.onAfterEdit,
							onLoadSuccess:function(row){
								//$(this).treegrid('expandAll');
								$(this).treegrid('enableDnd', row?row.code:null);
				            }
						});
				    },
				    buttons : [ 
				    	{text : '保存', iconCls:'icon-save', handler : function(){me.doUpdateTree(data);}},
				    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
				    ]
				});
			},
			doUpdateTree: function(data){
				if(!me.treeeditor.endEditing()){
					return false;
				}
				var params = {
						url: $c.getApi('system.param.trees', data.paramCode),
						method: 'PUT',
						paramCode: data.paramCode
					},
					root = subGrid.treegrid('find', '-1'),
					i = 0,
					collect = function(parentCode, row){
						params['items[' + i + '].code'] = row.code;
						params['items[' + i + '].parentCode'] = parentCode;
						params['items[' + i + '].text'] = row.text;
						params['items[' + i + '].data'] = row.data;
						params['items[' + i + '].des'] = row.des;
						params['items[' + i + '].icon'] = row.icon;
						params['items[' + i + '].url'] = row.url;
						i++;
						if(row.children){
							for(var j=0,l=row.children.length; j <l; j++){
								collect(row.code, row.children[j]);
							}
						}
					};
				if(root && root.children){
					$.each(root.children, function(i, row){
						collect('', row);
					});
				}
				
				$c.ajaxSubmit(params, function(){
					me.doQuery();
					me.closeDialog();
					me.cleanParamCodes(data.paramCode);
				});
			},
			editor:{
				endEditing: function(){
					if (editIndex == undefined){return true}
					if (subGrid.datagrid('validateRow', editIndex)){
						subGrid.datagrid('endEdit', editIndex);
						editIndex = undefined;
						return true;
					} else {
						return false;
					}
				},
				onEndEdit: function (index, row, changes){
					$.extend(row, changes);
					if(row.leftSign){
						var des = '';
						if(row.leftSign === 'infinite'){
							des = '(-∞,';
						}else if(row.leftSign === 'open'){
							des = '('+row.leftValue+',';
						}else{
							des = '['+row.leftValue+',';
						}
						if(row.rightSign === 'infinite'){
							des += '+∞)';
						}else if(row.rightSign === 'open'){
							des += row.rightValue+')';
						}else{
							des += row.rightValue+']';
						}
						row.des = des;
					}
				},
				onClickRow: function (index){
					if (editIndex != index){
						me.editor.endEditing();
					}
				},
				beginEditRow: function (index){
					if (editIndex != index){
						if (me.editor.endEditing()){
							subGrid.datagrid('selectRow', index)
									.datagrid('beginEdit', index);
							editIndex = index;
						} else {
							subGrid.datagrid('selectRow', editIndex);
						}
					}
				},
				append: function (){
					if (me.editor.endEditing()){
						subGrid.datagrid('appendRow', {});
						editIndex = subGrid.datagrid('getRows').length-1;
						subGrid.datagrid('selectRow', editIndex)
								.datagrid('beginEdit', editIndex);
					}
				},
				removeit: function (){
					if (editIndex == undefined){return}
					subGrid.datagrid('cancelEdit', editIndex)
							.datagrid('deleteRow', editIndex);
					editIndex = undefined;
				}
			},
			treeeditor:{
				endEditing: function(){
					if (editId == undefined){return true}
					if (subGrid.treegrid('validateRow', editId)){
						subGrid.treegrid('endEdit', editId);
						editId = undefined;
						return true;
					} else {
						return false;
					}
				},
				onAfterEdit: function (row, changes){
					$.extend(row, changes);
				},
				onClickRow: function (row){
					if (editId != row.id){
						me.treeeditor.endEditing();
					}
				},
				beginEditRow: function (row){
					if(me._isRoot(row)){
						return false;
					}
					if (editId != row.id){
						if (me.treeeditor.endEditing()){
							subGrid.treegrid('select', row.id)
									.treegrid('beginEdit', row.id);
							editId = row.id;
						} else {
							subGrid.treegrid('select', editId);
						}
					}
				},
				append: function (){
					var id = $c.guid();
					subGrid.treegrid('append', {parent: editId, data:[{id: id, text:''}]});
					subGrid.treegrid('expand', editId);
					editId = id;
					subGrid.treegrid('select', editId)
							.treegrid('beginEdit', editId);
				},
				removeit: function (){
					subGrid.treegrid('remove', editId);
				}
			},
			_isRoot: function(node){
				return node.id === '-1';
			}
		};
	});
});