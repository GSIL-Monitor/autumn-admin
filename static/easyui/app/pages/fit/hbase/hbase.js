require(['page', 'entity'], function(Page, entity){
	Page.create('fit/hbase/hbase', function($, $c, tab, me){
		var form = tab.find('form'),
			grid = tab.find('table'),
			subForm,
			dialog = tab.find('.dialog'),
			hbaseClient = tab.find('div.hbase-client'),
			content = tab.find('div.hbase-client-content'),
			tableName = tab.find('input[textboxname=tableName]'),
			rowNames = tab.find('input[textboxname=rowNames]');
		
		return {
			_init: function(){
				hbaseClient.panel({    
					  title: 'Hbase客户端配置<span style="font-size:10px;color:red;">&nbsp;&nbsp;点击右边保存按钮可将配置保存，以便之后复用</span>',  
					  collapsible:true, 
					  collapsed: true,
					  tools: [{    
						title: '保存客户端配置',
					    iconCls:'aut-icon-right-save',    
					    handler: me.gotoSave    
					  }]    
				});
				
				grid.datagrid({
					title: '查询结果',
					form: form,
					pagination: false,
					autoLoad: false,
					url: $c.getApi('fit.hbases'),
					frozenColumns : [[
						{field : 'row', title : '行键', align:'left'}, 	
						{field : 'family', title : '列簇', align:'left'},
						{field : 'qualifier', title : '列', align:'left'}
					]],
					columns : [ [
						{field : 'value', title : '值', align:'left', fit:true}
			        ] ],
			        toolbar: [
						{iconCls: 'icon-search',text:'查询',handler: me.doQuery}
					]
				});

				entity.setEntityCombos('HBASE', form.find('[name=hbaseClient]'), me.onEntityChange);
				me.onEntityChange();
			},
			onEntityChange: function(id){
				id = id || 'group:HBASE';
				entity.getEntityProperties(id, function(properties){
					var html = me.getProfileHtml(properties, false, 'properties'); 
					content.empty().append(html);
					$.parser.parse(content);
					me.setComboFields(content);
				});
			},
			doQuery: function(){
				tableName.textbox('enableValidation');//启用校验
				rowNames.textbox('enableValidation');//启用校验
				grid.datagrid('load');
			},
			gotoSave: function(){
				tableName.textbox('disableValidation');//暂时不校验
				rowNames.textbox('disableValidation');//暂时不校验
				if(form.form('validate')){
					dialog.dialog({    
					    title: '保存Hbase配置',    
					    height: 450,
					    width: 800,
					    href : $c.getUrl('fit/hbase/add'),
					    onLoad: function(){
					    	subForm = $(this).find('form');
					    },
					    buttons : [ 
					    	{text : '保存', iconCls:'icon-save', handler : me.doSave}, 
					    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
					    ]
					}); 
                }else{
                	hbaseClient.panel('expand');
                	$.messager.alert('系统提示','请检查配置是否有效','error');
                }
			},
			doSave: function(){
				if(form.form('validate') && subForm.form('validate')){
					$c.ajaxSubmitForm(form, {
						url: $c.getApi('system.entitys'),
						entityId: dialog.find('[textboxname=entityId]').textbox('getValue'),
						entityName: dialog.find('[textboxname=entityName]').textbox('getValue'),
						entityGroup: 'HBASE',
						des: dialog.find('[textboxname=des]').textbox('getValue')
					}, me.saveCallback);
				}
			},
			saveCallback: function(){
				entity.clearEntityCache();
				me.closeDialog();
			},
			closeDialog : function(){
				dialog.dialog('close');
			},
			callback: function(){
				$.messager.alert('系统提示','操作成功','info');
			}
		};
	});
});