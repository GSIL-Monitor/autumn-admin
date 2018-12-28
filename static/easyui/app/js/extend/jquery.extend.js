define('jquery-extend', ['jquery'], function($){
    // 扩展选择器
	$.extend($.expr[':'], {
    	fn : function(obj){
    		var me = $(obj),fn = me.attr('fn');
    		if(fn !== undefined){
    			var index = fn.indexOf(':'), type, fname;
    			if(-1 === index){
    				type = 'click';
    				fname = fn;
    			}else{
    				type = fn.substring(0, index) || 'click';
    				fname = fn.substring(index+1); 
    			}
    			me.data('fn', {type : type, fname : fname});
    			return true;
    		}else{
    			return false;
    		}
    	},
    	combo : function(obj){
    		return $(obj).attr('combo-options') !== undefined;
    	}
    });
});