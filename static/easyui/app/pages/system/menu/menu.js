require(['treepage'], function(Page){
	Page.create('system/menu/menu', function($, $c, tab, me){
		var tree = tab.find('ul'),
			form = tab.find('.easyui-form'),
			contextMenu = AUT.contextMenu,
			cNode,//当前节点
			optFlag,//当前操作
			addButton = tab.find('[fn=doAdd]'),
			updateButton = tab.find('[fn=doUpdate]');
		
		return {
			_init: function(){
				tree.tree({
					 url : $c.getApi('system.menus.tree'),
					 method: 'GET',
					 animate: true,
					 lines : true,
					 dnd : true,
					 loadFilter: function(res){ 
						 if(res.success){
							 me.setState(res.data);
							 return res.data;
						 }else if($.isArray(res)){
							 me.setState(res);
							 return res;
						 }else{
							 $.messager.alert('错误提示','加载应用菜单时出现异常:'+(res.message||''),'error'); 
						 }  
					 },
					//右键事件
					 onContextMenu: function(e,node){
						 cNode = node;
						 var items = [];
						 items.push({ text: '新增', iconCls: 'icon-add', onclick: me.gotoAdd});
						 items.push({ text: '修改', iconCls: 'icon-edit', onclick: me.gotoUpdate});
						 items.push({ text: '删除', iconCls: 'icon-remove', onclick: me.doDelete});
						 me.showContextMenu(e, items);
					 },
					 onSelect: function(node){
						 cNode = node;
						 me.gotoUpdate();
					 },
					 //进入某个目标节点
					 onDragEnter: function(target){
						me.onDragEnterFn(tree, target);
					 },
					 //拖动
					 onBeforeDrop: function(target, source, point){
						 return me.doMove(target, source, point);
					 }
				});
			},
			
			gotoAdd : function (){
				var node = cNode;
				form.form('reset');
				me._setOptFlag('insert');
				form.form('load', {
					parentCode: node.id,
					parentText: node.text
				});
			},
			
			doAdd : function (){
				$c.ajaxSubmitForm(form, {url : $c.getApi('system.menus.tree')}, me.addCallback);
			},
			
			addCallback : function (){
				var node = cNode;
				tree.tree('append', {//如果父节点原来是叶子节点，需先在页面添加，然后执行reload方法时方可重新加载
					parent : node.target,
					data:[{id: '', text: ''}]
				});
				node.leaf = false;
				tree.tree('reload', node.target);
				$.messager.alert('操作提示','添加成功','info'); 
			},
			
			gotoUpdate : function (){
				var node = cNode;
				form.form('reset');
				$c.ajaxSubmit({
     			   method: "GET",
     			   url: $c.getApi('system.menus.tree', {id:node.id})
     			}, function(data){
     				 var parent = tree.tree('getParent', node.target);
					 if(parent){
						data.parentText = parent.text;
					 }else{
						data.parentText = '';
						data.parentCode = '0';
					 }
					 form.form('load', data);
     			 });
				me._setOptFlag('update');
			},
			
			doUpdate : function (){
				$c.ajaxSubmitForm(form, {
					url : $c.getApi('system.menus.tree', {id: cNode.id}),
					method: 'PUT'
				}, me.updateCallback);
			},
			
			updateCallback : function (rs){
				tree.tree('update',{target:cNode.target, text: rs.text, iconCls: rs.icon});
				tree.tree('select',cNode.target);
				$.messager.alert('操作提示','修改成功','info'); 
			},
			
			doDelete : function (node){
				var node = cNode,
					leaf = tree.tree('isLeaf', node.target);
				$.messager.confirm('操作确认',"您确定要删除<font color='red'> "+node.text+ (leaf?'':'及其所有子')+ "菜单</font>吗？", function(rs){
					if(rs){
						$c.ajaxSubmit({
		   					url : $c.getApi('system.menus.tree', {id: node.id}),
		   					method: 'DELETE'
		   				}, me.deleteCallback);
					}
	   			});
			},
			
			deleteCallback : function (){
				me._setOptFlag('delete');
				form.form('reset');
				tree.tree('remove', cNode.target);
				$.messager.alert('操作提示','成功删除<font color="red">' + cNode.text + '</font>','info');
			},
			
			doMove : function(target, source, point){
				return me.onBeforeDropFn(tree, target, source, point, function(pNode, nodes){
					var options = {
							parentMenuId: (pNode ? pNode.id : '0'),
							url : $c.getApi('system.menus.tree', {id: source.id}),
		   					method: 'POST'
						};
					$.each(nodes, function(i, node){
						options['menuIds['+i+']'] = node.id;
					})
					$c.ajaxSubmit(options, function(){
						tree.tree('remove', source.target);
						tree.tree('reload', pNode ? pNode.target : undefined);
   						$.messager.alert('操作提示','移动成功','info'); 
	   				});
				});
			},
			_setOptFlag: function(flag){
				optFlag = flag;
				switch(flag){
				case 'insert':
					addButton.linkbutton('enable');
					updateButton.linkbutton('disable');
					break;
				case 'update':
					addButton.linkbutton('disable');
					updateButton.linkbutton('enable');
					break;
				default:
					addButton.linkbutton('disable');
					updateButton.linkbutton('disable');
					break;
				}
			}
		};
	});
});