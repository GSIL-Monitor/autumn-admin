require(['page', 'entity'], function(Page, entity){
	Page.create('fit/tde/tde', function($, $c, tab, me){
		var form = tab.find('form'),
			subForm,
			dialog = tab.find('.dialog'),
			tdeClient = tab.find('div.tde-client'),
			content = tab.find('div.tde-client-content'),
			key = tab.find('input[textboxname=key]'),
			deserializerId = tab.find('input[name=deserializerId]'),
			cacheData = tab.find('div.cache-data');
		
		return {
			_init: function(){
				tdeClient.panel({    
					  title: 'TDE客户端配置<span style="font-size:10px;color:red;">&nbsp;&nbsp;点击右边保存按钮可将配置保存，以便之后复用</span>',  
					  collapsible:true, 
					  collapsed: true,
					  tools: [{    
						title: '保存客户端配置',
					    iconCls:'aut-icon-right-save',    
					    handler: me.gotoSave    
					  }]    
				}); 
				$c.ajaxSubmit({
    				url: $c.getApi('fit.tdes', '/deserializers'),
    				method: 'GET'
    			}, function(data){
    				$(deserializerId).combobox({
	   	   				 valueField: 'id',    
	   	   			     textField: 'name'
	   	   			 }).combobox('loadData', [{id:'', name:'请选择'}].concat(data||[]));
    			});

				entity.setEntityCombos('TDE', form.find('[name=tdeClient]'), me.onEntityChange);
				me.onEntityChange();
			},
			onEntityChange: function(id){
				id = id || 'group:TDE';
				entity.getEntityProperties(id, function(properties){
					var html = me.getProfileHtml(properties, false, 'properties'); 
					content.empty().append(html);
					$.parser.parse(content);
					me.setComboFields(content);
				});
			},
			doReset: function(){
				cacheData.empty();
			},
			doQuery: function(){
				key.textbox('enableValidation');//启用校验key
				form.attr('method','GET');
				$c.ajaxSubmitForm(form, {
					url: $c.getApi('fit.tdes')
				}, function(data){
					var html = JSON.stringify(data, null, 2);
					cacheData.html('<pre>'+html+'</pre>');//设置
				});
			},
			gotoSave: function(){
				key.textbox('disableValidation');//暂时不校验key
				if(form.form('validate')){
					dialog.dialog({    
					    title: '保存TDE配置',    
					    height: 450,
					    width: 800,
					    href : $c.getUrl('fit/tde/add'),
					    onLoad: function(){
					    	subForm = $(this).find('form');
					    },
					    buttons : [ 
					    	{text : '保存', iconCls:'icon-save', handler : me.doSave}, 
					    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
					    ]
					}); 
                }else{
                	tdeClient.panel('expand');
                	$.messager.alert('系统提示','请检查配置是否有效','error');
                }
			},
			doSave: function(){
				if(form.form('validate') && subForm.form('validate')){
					form.attr('method','POST');
					$c.ajaxSubmitForm(form, {
						url: $c.getApi('system.entitys'),
						entityId: dialog.find('[textboxname=entityId]').textbox('getValue'),
						entityName: dialog.find('[textboxname=entityName]').textbox('getValue'),
						entityGroup: 'TDE',
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