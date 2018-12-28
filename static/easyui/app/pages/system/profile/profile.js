require(['treepage'], function(Page){
	Page.create('system/profile/profile', function($, $c, tab, me){
		var tree = tab.find('ul'),
			form = tab.find('.easyui-form'),
			content = tab.find('.easyui-form .aut-group .aut-group-content');
		
		return {
			_init: function(){
				tree.tree({
					 url : $c.getApi('system.profiles', 'tree'),
					 method: 'GET',
					 lines: true,
					 loadFilter: function(res){    
						 if(res.success){
							 me.setState(res.data);
							 return res.data;
						 }else{
							 $.messager.alert('错误提示','加载应用设置的类别时出现异常:'+(res.message||''),'error'); 
						 }  
					 },
					 onLoadSuccess: function(){
						 tree.tree('expandAll');
					 },
					 onClick: function(node){
						 me.gotoLoadProfile(node, false);
					 }
				 });
			},
			resetDefault: function(){
				me.gotoLoadProfile(undefined, true);
			},
			doUpdate: function(){
				$c.ajaxSubmitForm(form, {
					url: $c.getApi('system.profiles'),
					method: 'POST',
					_method:'PUT',
					paramGroup:tree.tree('getSelected').id
				});
			},
			gotoLoadProfile: function(node, isDefault){
				if(node === undefined){
					node = tree.tree('getSelected');
				}
				if(!node){
					return;
				}
				me.doLoadProfile(node.id, isDefault);
			},
			doLoadProfile: function(group, isDefault){
				$c.ajaxSubmit({
     			   method: "GET",
     			   url: $c.getApi('system.profiles'),
     			   paramGroup: group
     			}, function(data){
     				me.renderProfile(data, isDefault);
     			});
			},
			renderProfile: function(profiles, isDefault){
				var html = me.getProfileHtml(profiles, isDefault); 
				content.empty().append(html);
				$.parser.parse(content);
				me.setComboFields(content);
			}
		};
	});
});