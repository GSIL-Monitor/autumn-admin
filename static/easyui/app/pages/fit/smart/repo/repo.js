require(['treepage', 'icon'], function(Page, icon){
	Page.create('fit/smart/repo/repo', function($, $c, tab, me){
		var form = tab.find('form'),
			tree = tab.find('table'),
			cNode,//当前节点
			repoField = form.find('[name=name]'),
			versionField = form.find('[name=version]'),
			versionFieldValue,
			dialog = tab.find('.dialog'),
			idPathMapping = {};
		
		return {
			_init: function(){
				$(repoField).combobox({required:true, valueField: 'name', textField: 'name',onChange: me.onRepoChange});
				$(versionField).combobox({required:true, valueField: 'version', textField: 'description',onChange: me.onVersionChange});
				
				$c.ajaxSubmit({
    				url: $c.getApi('fit.smart.repos'),
    				method: 'GET'
    			}, function(data){
    				$(repoField).combobox('loadData', [{name:'请选择'}].concat(data));
    			});
				me.initTree();
			},
			onRepoChange: function(newValue, oldValue){
				$(versionField).combobox('setValue', '');
				tree.treegrid('loadData', {success: true, data:[]});
				if(newValue === '请选择'){
					$(versionField).combobox('loadData', []);
				}else{
					$c.ajaxSubmit({
	    				url: $c.getApi('fit.smart.repos', newValue+'/versions'),
	    				method: 'GET'
	    			}, function(data){
	    				$(versionField).combobox('loadData', [{version:'workspace',description:'工作空间'}].concat(data));
	    			});
				}
			},
			onVersionChange: function(newVersion, oldVersion){
				versionFieldValue = newVersion;
				if(newVersion){
					tree.treegrid('reload', form.form('getValues'));
				}
			},
			doDownload: function(){
				
			},
			initTree: function(){
				tree.treegrid({
					url : $c.getApi('fit.smart.repos', 'tree'),
					method: 'get',
	                checkbox: false,
	                rownumbers: false,
	                idField: 'id',
	                treeField: 'name',
	                lines: true,
	                fitColumns:true,
					columns:[[
						{field:'id', hidden: true},
						{field:'name', title: '名称', width:'500'},
						{field:'description', title: '版本'}
					]],
					onBeforeLoad: function(row, param){
						if(!form.form('validate')){
							return false;
						}
						param.parent = idPathMapping[param.id]||param.id;
					},
					loadFilter: function(res){    
						 if(res.success){
							 $.each(res.data, function(i, node){
								 node.state = node.leaf ? 'open':'closed';
								 node.iconCls = icon.getIcon(node.name);
								 if(!node.iconCls){
									 node.iconCls = node.leaf? 'icon-217':'icon-25';
								 }
								 if(!node.id){
									 node.id = $c.guid();
									 idPathMapping[node.id] = node.path;
								 }
								 node.description = node.version?node.version.description:'?';
							 });
							 return res.data;
						 }else{
							 $.messager.alert('错误提示','加载仓库资源时出现异常:'+(res.message||''),'error'); 
						 } 
					},
					toolbar: [
						{iconCls: 'aut-icon-right-offline',text:'下载仓库',handler: me.doDownload},
						{iconCls: 'aut-icon-right-save',text:'提交新版本',handler: me.doDownload}
					],
					onContextMenu: function(e,node){
						 cNode = node;
						 var items = [];
						 if(versionFieldValue === 'workspace'){
							 items.push({ text: '重命名', iconCls: 'aut-icon-right-edit', onclick: me.doDownload});
							 if(node.leaf){//文件
								 items.push({ text: '更新文件', iconCls: 'aut-icon-right-reset', onclick: me.doDownload});
								 items.push({ text: '删除文件', iconCls: 'aut-icon-right-delete', onclick: me.doDownload});
								 items.push({ text: '查看文件', iconCls: 'aut-icon-right-search', onclick: me.doDownload});
							 }else{
								 items.push({ text: '新增文件', iconCls: 'aut-icon-right-add', onclick: me.doDownload});
								 items.push({ text: '创建子目录', iconCls: 'aut-icon-right-add', onclick: me.doDownload});
								 items.push({ text: '删除目录', iconCls: 'aut-icon-right-delete', onclick: me.doDownload});
								 items.push({ text: '下载目录', iconCls: 'aut-icon-right-offline', onclick: me.doDownload});
							 }
						 }else{
							 items.push({ text: '下载', iconCls: 'aut-icon-right-offline', onclick: me.doDownload});
						 }
						 me.showContextMenu(e, items);
					}
				});
			}
		};
	});
});