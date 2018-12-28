require([ 'jquery', 'common'  ], function($, $c) {
	var globalTabpanel = $('#GlobalTabpanel'),
	    globalNavigator = $('#GlobalNavigator'),
		tabsOptMenu = $('.easyui-menu.tabs-opt-menu'),
		icons = {
			home: 'icon-279',//首页
			accordion: 'icon-255',//拉风琴
			tree_node:'icon-62',//导航树节点（非叶子节点）
			tree_node_leaf:'icon-150'//导航树节点（叶子节点）
		};
	
	//全局变量，主页对象
	window.AUT = {
		/**
		 * 右键菜单对象
		 */
		contextMenu : $('#GlobalContextMenu'), 
		/**
		 * 加载页面 
		 * url		：链接地址，如果为相对路径，添加$consts.view.prefix，如果不包含后缀，添加$consts.view.suffix
		 * id  		：id一般为菜单id,easy ui中通过title选择
		 * title    ：标题，一般为菜单名称
		 * iconCls  ：图标样式
		 * path     ：路径
		 * iframe   ：是否使用iframe形式，默认http://或https://使用iframe，其它将不使用iframe
		 * rebuild  ：如果相同id的页面已经存在，是否摧毁重建，默认不重建
		 * closable ：页面是否可关闭，默认可以
		 * showPageName ：如果是弹窗页面，表示弹出页面的名称
		 */	
		loadPage : function(options){
			if(!!options.showPageName && !!options.url){//弹出新页面
				window.open(options.url, options.showPageName);
				return;
			}
			
			var tabId = '_tabId'+options.id,
				url = options.url,
				title = options.title || options.text,
				index = globalTabpanel.tabs('getTabIndexById', {tabId: tabId, remove: options.rebuild === true}),
				iframe = !!options.iframe,
				iframeHtml,
				tabOptions;
			
			if(-1 != index){//tab已经存在，并且不需要重建
				globalTabpanel.tabs('select', index);
				return;
			}
			tabOptions = {
				title: title,
				closable: options.closable !== false,
				iconCls: options.iconCls || options.icon,
				tabId : tabId,
				path  : options.path || title,
				url   : url
			};
			
			if(-1 === url.indexOf('://')){
				url = $c.getUrl(url);
			}else{
				iframe = true;
			}
			
			if(iframe){//单个框架
				globalTabpanel.tabs('add', tabOptions);
				iframeHtml = '<iframe scrolling="no" application="yes" frameborder="0" src="'+url+'" style="width:100%;height:100%;"></iframe>';
				$(iframeHtml).appendTo(globalTabpanel.tabs('getSelected'));
			}else{
				//通过ajax方式加载页面
				tabOptions.href = url;
				globalTabpanel.tabs('add', tabOptions);
			}
		},
		getTab : function(url){
			var tabs = globalTabpanel.tabs('tabs');
			for(var i=tabs.length-1; i>=0; i--){
				if (tabs[i].panel('options').url === url){
					return tabs[i];
				}
			}
			return null;
		}
	};
	
	/**
	 * 导航菜单
	 */
	globalNavigator.accordion({    
		 onSelect: function(title,index){
			 var menu = globalNavigator.menus[index],
			 	 panel = globalNavigator.accordion('getPanel',index),
			 	 tree = $(panel).find('ul'),
			 	 set = function(data){
				 	$.each(data, function(i, c){
				 		if(c.leaf){
				 			c.state = 'open';
					 		c.iconCls = c.icon || icons.tree_node_leaf;
					 	}else{
					 		c.state = 'closed';
					 		c.iconCls = c.icon || icons.tree_node;
					 		set(c.children);
					 	}
			 		});
				 };
			 if(!menu.menuFlag){
				 menu.menuFlag = true;
				 $(tree).tree({
					 url : $c.getApi('nav.menus.tree', menu.id),
					 method: 'GET',
					 lines: true,
					 loadFilter: function(res){    
						 if(res.success){
							 if(res.data){
								 set(res.data);
								 return res.data;
							 }else{
								 return [];
							 }
						 }else{
							 $.messager.alert('错误提示','加载“'+title+'”的子菜单出现异常:'+(res.message||''),'error'); 
						 }  
					 },
					 onClick: function(node){
						 if(node.url){
							 AUT.loadPage(node);
						 }else{
							 //
						 }
					 }
				 });
			 }
		 }
    });
	globalNavigator.menus = [];
	$c.ajaxSubmit({
	   method: "GET",
	   url: $c.getApi('nav.menus.children', 0)
	}, function(data){
		$.each(data, function(i, menu){
			 globalNavigator.accordion('add', {    
	    		 title: menu.text,
	    		 selected: i == 0,
	    		 iconCls: menu.icon || icons.accordion,
	    		 content: '<ul class="easyui-tree"></ul>'
		     });
			 globalNavigator.menus.push(menu);
	     });
    });
	
	// 主题
	var themes = [
		{value:'default',text:'Default',group:'Base'},
		{value:'gray',text:'Gray',group:'Base'},
		{value:'metro',text:'Metro',group:'Base'},
		{value:'material',text:'Material',group:'Base'},
		{value:'material-teal',text:'Material Teal',group:'Base'},
		{value:'bootstrap',text:'Bootstrap',group:'Base'},
		{value:'black',text:'Black',group:'Base'},
		{value:'metro-blue',text:'Metro Blue',group:'Metro'},
		{value:'metro-gray',text:'Metro Gray',group:'Metro'},
		{value:'metro-green',text:'Metro Green',group:'Metro'},
		{value:'metro-orange',text:'Metro Orange',group:'Metro'},
		{value:'metro-red',text:'Metro Red',group:'Metro'},
		{value:'ui-cupertino',text:'Cupertino',group:'UI'},
		{value:'ui-dark-hive',text:'Dark Hive',group:'UI'},
		{value:'ui-pepper-grinder',text:'Pepper Grinder',group:'UI'},
		{value:'ui-sunny',text:'Sunny',group:'UI'}
	];

	$('#GlobalTheme').combobox({
		groupField:'group',
		data: themes,
		editable:false,
		panelHeight:'auto',
		valueField:'value',
		onChange: function(newTheme, oldTheme){
			if(newTheme){
				$('link[href$="/easyui.css"]').attr('href', 'lib/easyui/1.5.5.5/themes/'+newTheme+'/easyui.css');
			}
		}
	});
	
	// 加载首页
	AUT.loadPage({
		url    : 'base/home/home',
		id     : 'home',
		title  : '首页',
		iconCls: icons.home, 
		closable: false
	});
	// 首页选项卡
	globalTabpanel.tabs({
		onSelect:function(title, index){    
			var tabs = globalTabpanel.tabs('tabs'), 
			    path = tabs[index].panel('options').path || title;
			$('#GlobalContainer').layout('panel','center').panel('setTitle', '当前位置：'+ path);  
	    },
		onContextMenu : function(e, title, index){
			e.preventDefault();
			var tabs = globalTabpanel.tabs('tabs'), 
				leftFlag = false, 
				flag = false, 
				rightFlag = false, 
				menuId = tabs[index].panel('options').menuId;
			tabsOptMenu._tabIndex = index;
			tabsOptMenu._menuId = menuId;
			for(var i=0, l=tabs.length; i<l; i++){
				if(tabs[i].panel('options').closable !== false){//可关闭
					if(i < index){
						leftFlag = true;
						i = index -1;
					}else if(i == index){
						flag = true;
					}else{
						rightFlag = true;
						break;
					}
				}
			}
			tabsOptMenu.menu('enableSelector', ['.menu-item', false]);
			if(leftFlag){
				tabsOptMenu.menu('enableSelector', ['.close-left', true]);
			}
			if(rightFlag){
				tabsOptMenu.menu('enableSelector', ['.close-right', true]);
			}
			if(flag){
				tabsOptMenu.menu('enableSelector', ['.close-self', true]);
			}
			if(leftFlag || rightFlag){
				tabsOptMenu.menu('enableSelector', ['.close-other', true]);
			}
			if(flag || leftFlag || rightFlag){
				tabsOptMenu.menu('enableSelector', ['.close-all', true]);
			}
			tabsOptMenu.menu('show',{left: e.pageX, top: e.pageY});
		}
	});
	tabsOptMenu.menu('click', {
		'.close-self' : function(){
			globalTabpanel.tabs('closeIfClosable', tabsOptMenu._tabIndex);
		},
		'.close-all' : function(){
			globalTabpanel.tabs('closeAllClosable');
		},
		'.close-other' : function(){
			globalTabpanel.tabs('closeOtherClosable', tabsOptMenu._tabIndex);
		},
		'.close-left' : function(){
			globalTabpanel.tabs('closeLeftClosable', tabsOptMenu._tabIndex);
		},
		'.close-right' : function(){
			globalTabpanel.tabs('closeRightClosable', tabsOptMenu._tabIndex);
		}
	});
});