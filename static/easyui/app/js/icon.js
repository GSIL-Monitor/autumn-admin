define('icon', function() {
	
	var icons = {
			'xml':'icon-215',
			'java':'icon-314'
		};
	
    return {
    	/**
    	 * 根据名称获取图标
    	 */
    	getIcon: function(name){
    		var icon = icons[name];
    		if(icon){
    			return icon;
    		}
    		var index = name.lastIndexOf('.');
    		if(-1 != index){
    			var suffix = name.substring(index+1);
    			return icons[suffix];
    		}
    	}
    };
});