define('easyui-extend', ['jquery', 'easyui-locale'], function($){
    // 验证规则
	var validateRules = {
    	select: {
            validator: function (value) {
                return value !== ' 请选择   ' && value !== '--请选择--' && value !== '请选择';
            },
            message: '请选择'
        },
        minLength: {    
	        validator: function(value, param){    
	            return $.trim(value).length >= param[0];    
	        },    
	        message: '请至少输入 {0} 个字符'   
	    },
	    maxLength: {
            validator: function (value, param) {
            	return $.trim(value).length <= param[0]; 
            },
            message: '最多只能输入 {0} 个字符'
        },
	    alphanum : {
	    	validator: function(value){ 
	            return /^[_a-zA-Z0-9]*$/.test(value);    
	        },    
	        message: '只能输入字母、数字和下划线...'
	    },
	    same : {
			validator : function(value, param){
				//var cv = $(this).closest('form').find('[name='+param[0]+']').val();
				var cv = $('#'+param[0]).val(); 
				if(cv != "" && value != ""){
					return cv == value; 
				}else{
					return true;
				}
			},
			message : '两次输入不一致！'
		}	
    };
    $.extend($.fn.validatebox.defaults.rules, validateRules);
	
    /**
     * 默认值
     */
	//修改combobox默认配置
    var comboDefaults = {
		valueField	: 'id',
		textField   : 'text',
		limitToList : true,
		editable : true,
		groupFormatter: function(group){
			return '<span style="color:red">' + group + '</span>';
		}
	};
	$.extend($.fn.combobox.defaults, comboDefaults);
	$.extend($.fn.combogrid.defaults, comboDefaults);
	//修改分页默认配置
	$.extend($.fn.pagination.defaults, {
		total	: 0,
		pageNumber:0,
		showPageInfo: true,
		//layout	: ['list','sep','first','prev','sep','links','sep','manual','sep','next','last','sep','refresh']
	});
	//修改panel默认配置
	var windowDefaults = {
		minimizable : false,
		resizable   : true,
		modal       : true,
		closable	: true
	};
	$.extend($.fn.window.defaults, windowDefaults);
	$.extend($.fn.dialog.defaults, windowDefaults);
	//修改数据表格默认配置，添加是否自动加载和加载参数
	$.extend($.fn.datagrid.defaults, {
		pageSize: 15,
		pageList: [10,15,20,30,50,100,500,1000],
		fit: true,			//表格自动填满父容器
	    fitColumns:true,	//表列自动填充宽度
	    striped:true,		//显示斑马线
	    rownumbers:true,	//显示数据序号列
	    //singleSelect:true,//是否允许多选
	    checkOnSelect:false,//选择数据的时候是否勾选复选框,
	    //multiSort:true,//组合排序
	    loadMsg :'正在加载数据，请稍候...',
	    firstLoad: true,
	    method: 'GET',
	    pagination: true,
	    onBeforeLoad : function(param){
	    	var options = $(this).datagrid("options"),
	    		queryParam = options.customQueryParam,
	    		form = options.form;
	    	
	    	if(options.autoLoad !== true && options.firstLoad){
	    		options.firstLoad = false;
	    		return false;
	    	}
	    	
	    	if($(form).is('.easyui-form')){
	    		if($(form).form('validate')){
	    			$.extend(param, $(form).form('getValues'));
	    		}else{
	    			return false;
	    		}
	    	}
	    	
	    	if(typeof queryParam === 'function'){
	    		var customParam = queryParam.apply(this, arguments);
	    		if(customParam === false){
	    			return false;
	    		}else if(!!customParam){
	    			$.extend(param, customParam);
	    		}
	    	}else if(typeof queryParam === 'object'){
	    		$.extend(param, queryParam);
	    	}
	    	return param;
	    },
	    loadFilter : function(data){
	    	if(data.success){
	    		if(data.meta){
	    			return {
	    				rows : data.data, 
	    				total: data.meta.totalCount
	    			};
	    		} else{
	    			return {
	    				rows: data.data
	    			};
	    		}
	    	}else{
	    		$.messager.alert('数据加载错误', data.message||'数据加载错误','error');
	    	}
	    }
	});
    
	/**
	 * 扩展方法
	 */
    var tabMethods = {
		/**
		 * 根据id获取tab，如果需要移除，则移除后返回-1
		 */
		getTabIndexById : function(jq, options){
			var tabs = $.data(jq[0],'tabs').tabs,
				tabId = options.tabId,
				remove = options.remove;
			for(var i=tabs.length-1; i>=0; i--){
				if (tabs[i].panel('options').tabId === tabId){
					if(remove){
						jq.tabs('close', i);
						return -1;
					}else{
						return i;
					}
				}
			}
			return -1;
		},
		//关闭
		closeIfClosable : function(jq, index){
			return jq.each(function(){
				var tabs = $.data(this,'tabs').tabs,
					tab = tabs[index];
				if(tab && tab.panel('options').closable !== false){
					$(this).tabs('close', index);
				}
			});
		},
		//关闭全部
		closeAllClosable : function(jq){
			return jq.each(function(){
				var tabs = $.data(this,'tabs').tabs, $t = $(this);
				for(var i=tabs.length-1; i>0; i--){
					if (tabs[i].panel('options').closable !== false){
						$t.tabs('close', i);
					}
				}
			});
		},
		//关闭其他
		closeOtherClosable : function(jq, index){
			return jq.each(function(){
				var tabs = $.data(this,'tabs').tabs, tab = tabs[index], $t = $(this);
				for(var i=tabs.length-1; i>0; i--){
					if (tabs[i].panel('options').closable !== false && tabs[i] !== tab){
						$t.tabs('close', i);
					}
				}
			});
		},
		//关闭左边
		closeLeftClosable : function(jq, index){
			return jq.each(function(){
				var tabs = $.data(this,'tabs').tabs, $t = $(this);
				for(var i=index-1; i>0; i--){
					if (tabs[i].panel('options').closable !== false ){
						$t.tabs('close', i);
					}
				}
			});
		},
		//关闭右边
		closeRightClosable : function(jq, index){
			return jq.each(function(){
				var tabs = $.data(this,'tabs').tabs, $t = $(this);
				for(var i=tabs.length-1; i>index; i--){
					if (tabs[i].panel('options').closable !== false){
						$t.tabs('close', i);
					}
				}
			});
		}
	};
	$.extend($.fn.tabs.methods, tabMethods);
	
	var menuMethods = {
    	//绑定事件
        click: function(jq, options){
            return jq.each(function(){
            	var $t = $(this), o = $.data(this, 'menu');
            	if(!o){
            		$(this).menu();
            	}
            	if(typeof options === 'function'){
            		$.data(this, 'menu').options.onClick = options;
            	}else{
            		for(var selector in options){
                		$t.find(selector).each(function(){
                			$(this).click(options[selector]); 
                		});
            		}	
            	}
            });
        },
        //启用/禁用菜单 options为一个数组，第一项为选择器，第二项是是否启用
        enableSelector: function(jq, options){
        	var selector = options[0], method = options[1] ? 'enableItem' : 'disableItem';
            return jq.each(function(){
            	var $t = $(this);
            	$t.find(selector).each(function(){
					$t.menu(method, this);	
				});
            });
        }
    };
	$.extend($.fn.menu.methods, menuMethods);
	
	var formMethods = {
		/**
		 * 获取表单数据
		 * 先对简单类型做处理，后续遇到再对其它特殊类型处理
		 */
		getValues : function(jq){
			var values = {};
			$('input:enabled,select:enabled,textarea:enabled', jq[0]).each(function(){
				var m = this, name = m.name;
				if(name){
					switch(m.type){
					case 'radio':
						if($(m).is(':checked')){
							values[name] = m.value;
						}
						break;
					case 'checkbox':
						if($(m).is(':checked')){
							if($('input[name='+name+'][type=checkbox]', jq[0]).length == 1){
								values[name] = m.value;
							}else{
								var v = values[name]||[];
								v.push(m.value);
								values[name] = v;
							}
						}
						break;
					default:
						values[name] = m.value;
						break;
					}
				}
			});
			return values;
		}
	};
	$.extend($.fn.form.methods, formMethods);
	
	var linkbuttonMethods = {
		//绑定事件:由于直接使用jquery中bind/click绑定的方法，当disable按钮时仍然有效，因此这里添加绑定click方法
		click: function(jq, fn){
            return jq.each(function(){
            	var o = $.data(this, 'linkbutton');
            	if(!o){
            		$(this).linkbutton();
            	}
            	$.data(this, 'linkbutton').options.onClick = fn;
            });
        }	
	};
    $.extend($.fn.linkbutton.methods, linkbuttonMethods);
    
    var validMethods = {
    	/**
    	 * 设置值
    	 * @param target
    	 * @param value
    	 */
        setValue : function (target, value) {
            var t = $(target), opts = t.validatebox("options"), val = t.val();
            if (val != value) {
                t.val(opts.value = (value ? value : ""));
            }
            validate(target);
        },

        /**
         * 获取值
         * @param target
         * @returns
         */
        getValue : function(target) {
            return $(target).val();
        },

        /**
         * 清除值
         * @param target
         */
        clear : function(target) {
            var t = $(target), opts = t.validatebox("options");
            t.validatebox("setValue", "");
        },

        /**
         * 重置值
         * @param target
         */
        reset : function(target) {
            var t = $(target), opts = t.validatebox("options");
            t.validatebox("setValue", opts.originalValue ? opts.originalValue : "");
        },

        /**
         * 重新设置大小
         * @param target
         * @param width
         */
        resize : function(target, width) {
            var t = $(target), opts = t.validatebox("options");
            t._outerWidth(opts.width = width);
        },

        /**
         * 设置可用性
         * @param target
         * @param disabled
         */
        setDisabled : function(target, disabled) {
            var t = $(target), state = $.data(target, "validatebox");
            if (disabled) {
                if (state && state.options) { state.options.disabled = true; }
                t.attr("disabled", true);
            } else {
                if (state && state.options) { state.options.disabled = false; }
                t.removeAttr("disabled");
            }
        },
        
        /**
         * 设置和取消红星（标识是否必填）
         * @param target
         * @param disabled
         */
        setStar : function(target, disabled){
            var t = $(target);
            var label = t.closest('.aut-cell').prev('.aut-cell').find('label');
            if (disabled) {
                label.append('<font color=red>*</font>');
            } else {
                label.remove('font');
            }
        }
    };
    $.extend($.fn.validatebox.methods, {
        setValue: function (jq, value) { 
        	return jq.each(function () { validMethods.setValue(this, value); }); 
        },

        getValue: function (jq) { 
        	return validMethods.getValue(jq[0]); 
        },

        clear: function (jq) { 
        	return jq.each(function () { validMethods.clear(this); }); 
        },

        reset: function (jq) { 
        	return jq.each(function () { validMethods.reset(this); }); 
        },

        resize: function (jq, width) { 
        	return jq.each(function () { validMethods.resize(this, width); }); 
        },

        enable: function (jq) { 
        	return jq.each(function () { validMethods.setDisabled(this, false); }); 
        },

        disable: function (jq) { 
        	return jq.each(function () { validMethods.setDisabled(this, true); }); 
        },
        
        unStar: function (jq) { 
        	return jq.each(function () { validMethods.setStar(this, false); }); 
        },
        
        setStar: function (jq) { 
        	return jq.each(function () { validMethods.setStar(this, true); }); 
        }
    });
});