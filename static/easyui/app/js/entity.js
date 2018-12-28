define('entity', ['jquery', 'common'], function($, $c) {
	
	var entitys = {}, entityProperties = {};
	
    return {
    	/**
    	 * 获取实体列表
    	 */
    	getEntitys: function(group, callback){
    		if(entitys[group]){
    			callback.call(this, [].concat(entitys[group]));
    		}else{
    			$c.ajaxSubmit({
    				url: $c.getApi('system.entitys', '/groups/'+group),
    				method: 'GET'
    			}, function(data){
    				entitys[group] = data;
    				callback.call(this, [].concat(data));
    			});
    		}
    	},
    	/**
    	 * 获取一个实体属性
    	 */
    	getEntityProperties: function(id, callback){
    		var p = entityProperties[id];
    		if(p){
    			callback.call(this, [].concat(p));
    		}else{
    			$c.ajaxSubmit({
    				url: $c.getApi('system.entitys', '/properties/'+id),
    				method: 'GET'
    			}, function(data){
    				entityProperties[id] = data;
    				callback.call(this, [].concat(data));
    			});
    		}
    	},
    	/**
    	 * 设置实体下拉选择项
    	 */
    	setEntityCombos: function(group, field, onChange){
    		this.getEntitys(group, function(){
    			$(field).combobox({
	   				 valueField: 'entityId',    
	   			     textField: 'entityName',
	   			     onChange: onChange
	   			 }).combobox('loadData', [{entityId:'', entityName:'请选择'}].concat(entitys[group]));
    		});
    	},
    	/**
    	 * 清除实体相关缓存
    	 */
    	clearEntityCache: function(){
    		entitys = {}; 
    		entityProperties = {};
    	}
    };
});