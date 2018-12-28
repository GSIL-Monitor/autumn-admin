define('treepage', ['jquery', 'common', 'page'], function($, $c, Page) {
    // 创建页面对象构造函数
    var TreePage = function() {},
    	emptyFn = function(){};
    /**
     * 添加静态方法
     */
    $.extend(TreePage, Page, {
    	_newInstance: function(){
			return new TreePage();
		}
    });
    
    /**
     * 实例方法
     */
    $.extend(TreePage.prototype, Page.prototype, {
    	
    	/**
    	 * 设置树型数据的状态
    	 */
		setState: function (data) {
			if(!data){
				return;
			}
			var set = function(data){
			 	$.each(data, function(i, c){
			 		if(c.leaf){
			 			c.state = 'open';
				 	}else{
				 		c.state = 'closed';
				 		if(c.children){
				 			set(c.children);
				 		}
				 	}
		 		});
			};
			set(data);
        },
        
        //进入某个目标节点
		onDragEnterFn: function(tree, target){
			if(!tree.tree('isLeaf', target)){
				var children = tree.tree('getChildren', target);
				if(children && children.length >= 1){//如果未展开父菜单并且父节点已经加载过子节点，则先展开	
					tree.tree('expand', target);
				}
			}
		},
        
        /**
         * 拖动操作
         */
        onBeforeDropFn: function(tree, target, source, point, callback){
        	var targetNode = tree.tree('getNode', target),
				parentNode,
				nodes = [],
				children,
				hint = point === 'append' ? '子':(point === 'top' ? '上一个兄弟':'下一个兄弟');
        	$.messager.confirm('操作确认',"您确定要将<font color='red'> "+source.text+" </font> 拖为<font color='red'> "+targetNode.text+" </font> 的"+hint+"节点吗？", function(rs){
				if(rs){
					if(point === 'append'){//拖成目标节点的子节点
						parentNode = targetNode;
						if(!tree.tree('isLeaf', target)){
							children = parentNode.children;
							if(children && children.length >= 1){//子节点已经加载过
								$.each(children, function(i,child){
									nodes.push(child);
								});
								nodes.push(source);
								callback(parentNode, nodes);
							}else{//子节点需要异步加载，先替换expand事件，在expand事件中调用回调，然后再恢复
								var options = tree.tree("options"),
									onExpand = options.onExpand || emptyFn;
								options.onExpand = function(){
									children = targetNode.children;
									$.each(children, function(i,child){
										nodes.push(child);
									});
									nodes.push(source);
									options.onExpand = onExpand;
									callback(parentNode, nodes);
								};
								tree.tree('expand', target);
							}
						}else{
							nodes.push(source);
							tree.tree('append', {//如果父节点原来是叶子节点，需先在页面添加，然后执行reload方法时方可重新加载
								parent : parentNode.target,
								data:[{id: '', text: ''}]
							});
							callback(parentNode, nodes);
						}
					}else{//拖成目标节点的兄弟节点
						parentNode = tree.tree('getParent', target);
						if(parentNode){
							children = parentNode.children;
						}else{
							children = tree.tree('getRoots');
						}
						$.each(children, function(i,child){
							if(child.id !== source.id){
								var is = child.id === targetNode.id;
								if(is && point === 'top'){
									nodes.push(source);
								}
								nodes.push(child);
								if(is && point === 'bottom'){
									nodes.push(source);
								}
							}
						});
						callback(parentNode, nodes);
					}
				}
   			});
			return false;
        }
    });
    
    // 返回页面对象
    return TreePage;
});