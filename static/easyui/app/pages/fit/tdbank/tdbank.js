require(['page', 'entity'], function(Page, entity){
	Page.create('fit/tdbank/tdbank', function($, $c, tab, me){
		var form = tab.find('form'),
			subForm,
			dialog = tab.find('.dialog'),
			tdbankClient = tab.find('div.tdbank-client'),
			content = tab.find('div.tdbank-client-content'),
			consumerData = tab.find('div.consumer-data');
		
		return {
			_init: function(){
				tdbankClient.panel({    
					  title: 'Tube/Hippo客户端配置<span style="font-size:10px;color:red;">&nbsp;&nbsp;点击右边保存按钮可将配置保存，以便之后复用</span>',  
					  collapsible:true, 
					  collapsed: true,
					  tools: [{    
						title: '保存客户端配置',
					    iconCls:'aut-icon-right-save',    
					    handler: me.gotoSave    
					  }]    
				});   

				entity.setEntityCombos('TDBANK', form.find('[name=tdbankClient]'), me.onEntityChange);
				me.onEntityChange();
			},
			onEntityChange: function(id){
				id = id || 'group:TDBANK';
				entity.getEntityProperties(id, function(properties){
					var html = me.getProfileHtml(properties, false, 'properties'); 
					content.empty().append(html);
					$.parser.parse(content);
					me.setComboFields(content);
				});
			},
			doReset: function(){
				consumerData.empty();//重置
			},
			doQuery: function(){
				form.attr('method','GET');
				$c.ajaxSubmitForm(form, {
					url: $c.getApi('fit.tdbanks')
				}, function(data){
					var html = JSON.stringify(data, null, 2);
					consumerData.html('<pre>'+html+'</pre>');//设置
				});
			},
			gotoSave: function(){
				if(form.form('validate')){
					dialog.dialog({    
					    title: '保存Tube/Hippo配置',    
					    height: 450,
					    width: 800,
					    href : $c.getUrl('fit/tdbank/add'),
					    onLoad: function(){
					    	subForm = $(this).find('form');
					    },
					    buttons : [ 
					    	{text : '保存', iconCls:'icon-save', handler : me.doSave}, 
					    	{text : '取消', iconCls:'icon-clear', handler : me.closeDialog} 
					    ]
					}); 
                }else{
                	tdbankClient.panel('expand');
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
						entityGroup: 'TDBANK',
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