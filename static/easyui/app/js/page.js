define('page', ['jquery', 'common'], function($, $c) {
    // 创建页面对象构造函数
    var Page = function() {},
    	_comboDataCache = {}; 

    /**
     * 添加静态方法
     */
    $.extend(Page, {
		/**
		 * 创建页面实例对象，如果有_init函数，则创建页面对象之后，调用该函数，该函数包含四个参数：jQuery对象$；基于jQuery的公共库对象$c；当前页面对应的tab面板对象tab；页面对象本身
		 * 
		 * @param {String} url 页面URL，和菜单导航中的URL对应
		 * @param {Object|Function} options 页面对象选项，这些属性和方法将被添加到新创建的对象实例中，如果是一个函数，先调用该函数(函数参数和_init相同)，再合并到新创建对象中
		 * 
		 * @return 页面对象
		 */
		create : function(url, options) {
		    var me = this._newInstance(),// 创建新实例
		    	id = $c.guid(),
		    	tab = $(AUT.getTab(url));
		    if(!tab || tab.length === 0){
		    	$.messager.alert('错误提示', '和<font color="red">'+url+'</font>对应的tab面板不存在','error');
		    	return;
		    }else{
		    	tab.attr('id', id);
		    	tab = $('#'+id);
		    	options = options || {};
		    }
		    if (typeof options === 'function') {
			    $.extend(me, options.call(me, $, $c, tab, me));
			} else {
			    $.extend(me, options);
			}
		    if(options.initComboField !== false){
		    	me.setComboFields(tab);
		    }
		    if (typeof me._init === 'function') {
		    	me._init.call(me, $, $c, tab, me);
			}
		    if(options.initBindEvent !== false){
		    	me.bindEvent(tab);
		    }
			return me;
		},
		_newInstance: function(){
			return new Page();
		}
    });
    
    /**
     * 实例方法
     */
    $.extend(Page.prototype, {
    	
    	/**
    	 * 获取下拉数据项
    	 */
    	getComboItem  : function(key, dataCode){
    		var data = this.getComboData(key);
    		if(data && data.map){
    			return data.map[dataCode];
    		}
    		return null;
    	},
    	
    	/**
    	 * 获取下拉数据项
    	 */
    	getComboArray  : function(key){
    		var data = this.getComboData(key);
    		if(data && data.data){
    			return data.data;
    		}
    		return null;
    	},
    	
    	/**
    	 * 获取下拉选项的渲染函数
    	 * 注：返回值是一个函数
    	 */
    	comboFormatter: function(key){
    		var me = this;
    		return function(value,row,index){
    			var item = me.getComboItem(key, value);
    			return item ? item.text : '';
    		};
    	},
    	
    	cleanParamCodes: function(paramCodes){
    		if($.isArray(paramCodes)){
    			$.each(paramCodes, function(i, paramCode){
    				delete _comboDataCache[paramCode];
    			});
    		}else{
    			delete _comboDataCache[paramCodes];
    		}
    	},
    	
		/**
		 * 获取选择的一条记录，如果未选择或者已选择多条，返回false
		 * @param dataGrid 数据表格
		 * @param callback 回调函数
		 */
		selectOne : function(dataGrid, callback){
			var rows = $(dataGrid).datagrid('getChecked');
			switch(rows.length){
			case 0:
				$.messager.alert('操作提示', '请选择数据后操作','warning');
				return false;
			case 1:
				if(typeof callback === 'function'){
					return callback.call(this, rows[0]);
				}else{
					return rows[0];
				}
			default:
				$.messager.alert('操作提示', '只能选择一条数据操作','warning');
				return false;
			}
		},
		
		/**
		 * 获取选择的记录，如果未选择，返回false
		 * @param dataGrid 数据表格
		 * @param callback 回调函数
		 */
		selectRows : function(dataGrid, callback){
			var rows = $(dataGrid).datagrid('getChecked');
			if(rows.length === 0){
				$.messager.alert('操作提示', '请选择数据后操作','warning');
				return false;
			}else if(typeof callback === 'function'){
				return callback.call(this, rows);
			}else{
				return rows;
			}
		},
		
		/**
		 * 右键菜单事件函数
		 */
		showContextMenu: function(event, items){
	    	var menu = AUT.contextMenu;
	    	event.preventDefault();
			menu.empty();
			$.each(items, function(i, item){
				menu.menu('appendItem', item);
			});
			menu.menu('show',{left: event.pageX, top: event.pageY});
		},
		
		/**
		 * 根据fn属性绑定事件
		 * @Param container jQuery搜索范围的DOM元素
		 */
		bindEvent : function(container){
			var me = this;
			$(container).find(':fn').each(function(i, n){
				var m = $(this), fn = m.data('fn');
				if(typeof me[fn.fname] === 'function'){
					if(m.is('.easyui-linkbutton')){
						m.linkbutton('click', me[fn.fname]);
					}else{
						m.off(fn.type).on(fn.type, me[fn.fname]);
					}
				}
			});
		},
		
		/**
		 * 初始化设置下拉域
		 * 这里只处理最通用的情形，其它特殊要求的需要单独写脚本
		 * @param container jQuery搜索范围的DOM元素
		 */
		setComboFields : function(container){
			var me = this,
				comboKeys = [],
				comboFields = {},
				comboDatas;
			//搜索所有包含combo-options属性的元素，提取访问后台需要的属性
			$.each($(container).find(':combo'), function(i, f){
				var $f = $(f), 
					options = $f.attr('combo-options'), 
					key;
				try{
					options = $c.parseJson('{'+options+'}');
				}catch(e){}
				
				if(typeof options === 'string'){//只配置了简单字符串
					key = options;
				}else if(options.key){
					key = options.key;
				}else{// 如果既没有key，也不是简单字符串，则不处理
					return;
				}
				if(-1 === $.inArray(key, comboKeys)){
					comboKeys.push(key);	
				}
				comboFields[key] = comboFields[key] || [];
				comboFields[key].push([$f, options]);
			});
			if(comboKeys.length >= 1){
				comboDatas = me.getComboDatas(comboKeys);
				$.each(comboFields, function(key, fields){
					var data = comboDatas[key];
					if(!data || data.type === 'SINGLE' || data.type === 'NONE'){
						$.messager.alert('错误提示', '未找到名称为“'+key+'”的下拉选项数据','error');
					}else{
						$.each(fields, function(i, f){
							me.renderCombo(f[0], $.extend(true,{},data), f[1]);
						});	
					}
				});
			}
		},
		
		/**
		 * 渲染combo域
		 */
		renderCombo : function($f, data, options){
			var dataOptions = $f.attr('data-options'), 
				type = data.type,
				map = data.map;
			
			if(dataOptions){
				dataOptions = $c.parseJson('{'+dataOptions+'}');
			}else{
				dataOptions = {};
			}
			//添加请选择的校验
			if(dataOptions.required === true && dataOptions.validType === undefined){
				dataOptions.validType = 'select';
			}
			data = data.data;
			if(type === 'TREE'){
				if(options.root && map){
					data = [];
					$.each(options.root.split(','), function(i, v){
						var item = map[v];
						if(item){
							data.push(item);
						}else{
							$.messager.alert('错误提示', '不能找到节点“'+v+'”','error');
						}
					});
				}
				$f.addClass('easyui-combotree').combotree($.extend({idField:'id',treeField:'text',animate:' true'}, dataOptions)).combotree('loadData', data);
			}else{
				if(options.extra || options.excludes){
					data = $c.evaluateExtraData(data, options.extra, options.excludes);
				}
				if(options.group === true){
					dataOptions.groupField = 'param';
				}
				$f.addClass('easyui-combobox').combobox($.extend({valueField:'id',textField: 'text'},dataOptions)).combobox('loadData', data);
			}
		},
		
		/** 
         * 获取列表项数据
         * 
         * @param names {String|Array} 参数名称/逗号分隔的多个名称/参数名称数组
         * @returns rs {Object} 返回数据结构{paramCode1:paramCode1_data, paramCode2:paramCode2_data}，例如：
         *  	{
         * 			BOOLEAN : {
         * 				type : 'LIST',
         *          	data : [{id : '1', text : '是'}, {id : '0', text : '否'}]
         * 			},
         *      	PARAM_GROUP: {
         *          	type : 'TREE',
         *          	data : [
         *          		{id : 'SYSTEM_CONFIG', text:'系统配置', children : [...]},
         *          		{id : 'USER_OPTION', text:'用户设置', children : [...]}
         *          	]
         *      	}
         * 		}
         */
		getComboDatas: function (names) {
            var codes = [],
                rs = {};
            if (typeof names === 'string') {
                names = names.split(',');
            } else if (!$.isArray(names)) {
            	$.messager.alert('错误提示', '获取下拉选型数据的参数类型不正确','error');
            	return;
            }
            $.each(names, function(i, name){
            	if(_comboDataCache[name]){//已经存在，直接返回
            		rs[name] = _comboDataCache[name];
            	}else{
            		codes.push(name);
            	}
            });

            if(0 !== codes.length){
            	$c.ajaxSubmit({
            		async: false,//同步获取
            		url: $c.getApi('base.combos', codes),
            		method: 'GET'
            	}, function(data){
            		$.each(data, function(i, d){
         				 rs[d.name] = d;
         				 _comboDataCache[d.name] = d;
         				 d.map = $c.convertArray2Object(d.data, 'id', 'this');
         		     });
         		     
         			$.each(codes, function(i, code){
	                   	if(!_comboDataCache[code]){//从服务器获取之后，依然不存在，则设置不存在的标志
	                   		_comboDataCache[code] = {name: code, data:[], map: {}, type: 'NONE'};
	                   	}
                    });
            	});
            }
            return rs;
        },
        
        /** 
         * 获取列表项数据
         * 
         * @param name String 参数名称
         * @returns rs {Object} 例如：
         *  	{
         *          type : 'TREE',
         *          name : 'PARAM_GROUP',
         *          data : [
         *          	{id : 'SYSTEM_CONFIG', text:'系统配置', children : [...]},
         *          	{id : 'USER_OPTION', text:'用户设置', children : [...]}
         *          ],
         *          map : {
         *          	'SYSTEM_CONFIG': {id : 'SYSTEM_CONFIG', text:'系统配置', children : [...]},
         *          	'USER_OPTION': {id : 'USER_OPTION', text:'用户设置', children : [...]}
         *          }
         *      }
         */
        getComboData: function(name){
        	var data = this.getComboDatas(name);
    		if(data && data[name]){
    			return data[name];
    		}
    		return null;
        },
        
        /**
         * 获取动态生成的属性设置的HTML页面
         * @param profiles Array 属性定义集合
         * @param isDefault Boolean 初始化表单时，是否已默认值初始化
         * @param name String 表单项名称，默认为profiles[i].code和profiles[i].value
         */
        getProfileHtml: function(profiles, isDefault, name){
			var html = '', 
				profile, 
				dataOptions,
				rule,
				allowEmpty,
				dataType,
				value,
				title,
				des = '';
			if(!name){
				name = 'profiles';
			}
			for(var i = 0, l = profiles.length; i < l; i++){
				profile = profiles[i];
				dataOptions = 'width:\'400px\'',
				rule = profile.valueRule;
				allowEmpty = profile.allowEmpty === true;
				dataType = profile.dataType;
				value = isDefault === true ? profile.defaultValue : profile.paramValue;
				if(profile.des){
					title = ' title="'+profile.paramCode+'（'+profile.des+'）"';
					des += '\n'+profile.paramName+':'+profile.des;
				}else{
					title = ' title="'+profile.paramCode+'"';
				}
				
				html += '<div class="aut-line"'+title+'>'
				      		+'<div class="aut-cell aut-c4">'
				      		+'<label>'+profile.paramName+':</label>'
				      		+'</div>'
				      		+'<div class="aut-cell aut-c4">'
				      		+'<span class="aut-input">'
				      		+'<input type="hidden" name="'+name+'['+i+'].code" value="'+profile.paramCode+'">'
				//后续可继续扩展日期、日历等类型，添加最小、最大值判断等
				if(dataType === 'INTEGER' || dataType === 'DECIMAL' || dataType === 'PERCENTAG'){//整型、数字型、百分数
					if(allowEmpty === false){
						dataOptions += ',required: true';
					}
					switch(dataType){
					case 'INTEGER':
						dataOptions += ',precision:0';
						break;
					case 'DECIMAL':
						dataOptions += ',precision:2';
						break;
					case 'PERCENTAG':
						dataOptions += ',precision:4';
						break;
					}
					html += '<input class="easyui-numberbox" name="'+name+'['+i+'].value" data-options="'+dataOptions+'" value="'+value+'"/>';
				}else if(dataType === 'BOOLEAN'){//布尔型
					if(allowEmpty === false){
						dataOptions += ',required: true,limitToList:false,validType: \'select\'';
					}
					html += '<input class="aut-combo" name="'+name+'['+i+'].value" data-options="'+dataOptions+'" value="'+value+'" combo-options="extra:\'select\',key:\'BOOLEAN_OPTIONS\'"/>';
				}else{//字符串
					if(rule === 'ENUM'){//枚举
						if(allowEmpty === false){
							dataOptions += ',required: true,limitToList:false,validType: \'select\'';
						}
						html += '<input class="aut-combo" name="'+name+'['+i+'].value" data-options="'+dataOptions+'" value="'+value+'" combo-options="extra:\'select\',key:\''+profile.valueRuleParam+'\'"/>';
					}else{
						if(allowEmpty === false){
							dataOptions += ',required: true';
						}
						html += '<input class="easyui-textbox" name="'+name+'['+i+'].value" data-options="'+dataOptions+'" value="'+value+'"/>';
					}
				}
				html += '</span></div></div>';
			}
			if(des !== ''){
				html += '<div class="aut-line"><div class="aut-cell aut-c12" style="color: red"><pre>'+des+'</pre></div></div>';
			}
			return html;
		}
    });
    
    // 返回页面对象
    return Page;
});