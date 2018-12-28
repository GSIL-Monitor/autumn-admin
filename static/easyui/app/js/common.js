define(['jquery', 'jquery-extend'], function($){
	var $c = {};
	
	var _c = {
		/**
    	 * 产生唯一键值
    	 * 
    	 * @returns {String}  唯一键值的字符串
    	 */
        guid : function(){
            var guid = '', i;
            for (i = 32; i > 0; i--){
                guid += Math.floor(Math.random()*16.0).toString(16);
            }
            return guid;
        },
		/**
    	 * 将符合json格式的字符串，封装为JSON对象
    	 * 
    	 * @param {String} json  json字符串
    	 * @returns {String}  返回转换后的json对象
    	 */
        parseJson : function(json){
            //$.parseJSON函数要求属性要使用双引号
            return eval("(" + json + ')');
        },
        /**
    	 * 时钟处理方法，可以当计数器用，也可以当一秒刷一次回调函数的处理工具来用
    	 * 
    	 * @example $c.showClock(function(time, sec){//todo ...});
    	 * @param {Object} callback  回调函数，回调函数当中可以传入两个参数，一个参数为格式化后的计时时间，别一个参数是以秒为单位的计时
    	 */
        showClock : function(callback){
            var i = 0,
                toClock = function(t){
                    var h = Math.floor(t / 3600),
                        m = Math.floor(t % 3600 / 60),
                        s = t % 3600 % 60;
                    h = h < 10 ? ('0'+h) : h;
                    m = m < 10 ? ('0'+m) : m;
                    s = s < 10 ? ('0'+s) : s;
                    return h + ':' + m +  ':' + s;
                },
                setClock = function(){
                    callback(toClock(i), i++);
                    setTimeout(setClock,1000);
                };
            //初始调用
            setClock();
        },
        /**
    	 * 删除对象的属性
    	 * 
    	 * @example $c.deleteProperties(user , ['userName', 'age' , 'sex']);
    	 * @param {Object} obj  需要删除属性的对象
	     * @param {String|Array} deleteProperties  删除的属性数组
    	 */
        deleteProperties: function(obj, properties){
        	if (typeof properties === 'string') {
        		try{
                    delete obj[properties];
                }catch(e){}
            } else if ($.isArray(properties)) {
            	for(var i=properties.length-1; i>=0; i--){
                    try{
                        delete obj[properties[i]];
                    }catch(e){}
                }
            } else{
            	$.messager.alert('错误提示', '删除对象属性的参数不正确','error');
            }
        },
        /**
    	 * 将参数转换为不重复的数组
    	 * 
    	 * ### 示例一		'a' ==> ['a']
    	 * ### 示例二		'a','b' ==> ['a','b']
    	 * ### 示例三		['a','b'],'c' ==> ['a','b','c']
    	 * ### 示例四		['a','b'],['b','c'] ==> ['a','b','c']
    	 * ### 示例五		'a', ['b',['c','d']],'e' ==> ['a','b','c','d','e']
    	 * @param {Object} obj  可以传入多个参数，类似java中的可变参数...
    	 * @returns {Array}  转换后的数组
    	 */
        makeArray  : function(){
            var arrs = [],
                push = function(index, item){
                    if($.isArray(item)){
                        $.each(item, push);
                    }else if(-1 === $.inArray(item, arrs)){
                        arrs.push(item);
                    }
                };
            $.each($.makeArray(arguments), push);
            return arrs;
        },
        /**
    	 * 根据extra和exclude参数解析数组，此方法多用于combox等组件的数据处理上
    	 * 
    	 * @example $c.evaluateExtraData([{id:'1' , text:'小学'} , {id:'2' , text:'中学'} , {id:'3' , text:'大学'}] ,  'all' , '3' )
    	 * - 返回结果：Array  [ Object, Object, Object ]，新增了对象{id:'' , text:'全部'},且删除了为对象{id:'3' , text:'大学'}
    	 * 
    	 * @param {Array} arr  原始数组
	     * @param {String} extra  需附加数据的类型，目前可取的值有all, com, select, all_com
	     * @param {String|Array} exclude  需排除数据的代码|代码数组|逗号分割的代码组|含有冒号表示用于过滤的字符串
    	 * @returns {Array}  解析后的数组，是在原数组基础之上解析，不会影响原数组
    	 */
        evaluateExtraData:function(arr, extra, exclude){
            var data = [].concat(arr||[]), exs = [];//创建本地副本(浅拷贝)
            if(exclude){
            	$.each($.isArray(exclude)?exclude:[exclude], function(i, ex){
            		$.each(ex.split(','), function(j, e){
            			var a = e.split(':');
            			if(a.length === 1){
            				exs.push({field:'id', value:e});
            			}else{
            				exs.push({field:a[0], value:a[1]});
            			}
            		});
            	})
                var length = exs.length;
                data = $.grep(data, function(value){
                    for(var index = 0; index < length; index++){
                        if(value[exs[index].field] === exs[index].value){
                            return false;
                        }
                    }
                    return true;
                });
            }
            if(extra){
                switch(extra){
                    case 'all':
                        data.unshift({id : '', text : '全部'});
                        break;
                    case 'com':
                        data.unshift({id : 'com', text : '公共'});
                        break;
                    case 'select':
                        data.unshift({id : '', text :  '请选择'});
                        break;
                    case 'all_com':
                        data.unshift({id : '', text : '全部'}, {id : 'com', text : '公共'});
                        break;
                    default:
                        break;
                }
            }
            return data;
        },
        /**
    	 * 将数组转换为对象
    	 * 
    	 * @example [{id:'id1',text:'text1'},{id:'id2',text:'text2'}] ==> {id1:'text1', id2:'text2'}
    	 * @param {Array} arr  原始数组
	     * @param {String} key  数组元素对象中表示键值的属性名称，默认为id
	     * @param {String} value 数组元素对象中表示值的属性名称，默认为text，若传入'this'，则将数组中的项作为值
    	 * @returns {Object}  解析后的对象
    	 */
        convertArray2Object : function(arr, key, value){
            var rs = {},
                self = false,
	            fn = function(index, val){
	                rs[val[key]] = self ? val : val[value];
	                if($.isArray(val.children)){
	                    $.each(val.children, fn);
	                }
	            };
            key = key || 'id';
            value = value || 'text';
            self = value === 'this';
            $.each(arr, fn);
            return rs;
        },
        /**
         * 获取url
         * 
         * 1. 如果包含":"，直接返回
         * 2. 如果不是以'/'开头，就添加$consts.view.prefix
         * 3. 如果不包含'.'，就添加$consts.view.suffix
         */
        getUrl: function(url){
        	if(-1 === url.indexOf('://')){
				if(url.charAt(0) !== '/'){//相对路径
					url = $consts.view.prefix + url;
				}
				if(-1 === url.indexOf('.')){//不包含后缀
					url = url + $consts.view.suffix;
				}
			}
        	return url;
        },
        /**
    	 * 获取真实访问的API
    	 * 
    	 * @example 
    	 * 1. $c.getApi('v1/menus/{id}') ==> v1/menus
    	 * 2. $c.getApi('v1/menus/{id}', 'a') ==> v1/menus/a
    	 * 3. $c.getApi('v1/menus/{id}', 1) ==> v1/menus/1
    	 * 4. $c.getApi('v1/menus/{id}', ['a','b']) ==> v1/menus/a;b
    	 * 5. $c.getApi('v1/menus/{id}/{name}', {id: 'a', name: 'n'}) ==> v1/menus/a/n
    	 * 6. $c.getApi('v1/menus/{id}/{name}', {id: 'a', name: ['n1','n2']}) ==> v1/menus/a/n1,n2
    	 * 7. $c.getApi('v1/menus/{id}/{name}', {id: ['a','b'], name: ['n1','n2']}) ==> v1/menus/a,b/n1,n2
    	 * 
    	 * @param {String} api  包含占位符的API或者表示API的key值
	     * @param {String|Number|Object} param  占位符参数
	     * @param {Boolean} key  true表示API=$apis[api]，false表示API=api，默认为true
    	 * @returns {String}  解析后不含占位符的API
    	 */
        getApi : function(api, param, key){
        	var pattern = /\{([^}]+?)\}/g,
       			match,
       			apis;
        	if(key !== false){
        		try{
        			key = api;
        			api = $apis[key];
        			if(!api){
        				$.messager.alert('错误提示', '没有找到键值为“'+key+'”的api配置','error');
        				return;
        			}
        		}catch(e){}
        	}
	       	if(param === undefined){
	       		api = api.replace(pattern, '');
	       	}else if(typeof param === 'string' || typeof param === 'number'){// 参数是字符串或数值，直接替换所有占位符
	       		api = api.replace(pattern, param);
	       	}else if($.isArray(param)){
	       		api = api.replace(pattern, param.join(','));
	       	}else{
	       		match = api.match(pattern);
	       		if(match){
	       			$.each(match, function(i, c){
	       				var s = c.substring(1,c.length-1),
	       					value = param[s];
	       				if(value === undefined){
	       					api = api.replace(new RegExp(c, 'g'), '');
	       				}else if(typeof value === 'string' || typeof value === 'number'){
	       					api = api.replace(new RegExp(c, 'g'), value);
	       				}else if($.isArray(value)){
	       					api = api.replace(new RegExp(c, 'g'), value.join(','));
	       				}else{
	       					$.messager.alert('错误提示', '占位符参数类型错误'+c,'error');
	       				}
	       			});
	       		}
	       	}
	       	if(api.charAt(api.length-1) === '/'){
	       		api = api.substring(0, api.length-1);
	       	}
	       	api = $apis['server']+api.replace(/\/{2,}/g, '/');
	       	return api;
       },
       
       /**
	   	 * ### 描述
	   	 * ajax调用
	   	 * 
	     * @param {Object} options  状态了请求参数的配置项，是一个对象
	     * 
	     * - 属性url：请求URL
	     * - 属性needBlock：是否需要锁屏处理，默认值为true，需要锁屏
	     * - 属性async：ajax的调用方式，同步还是异步，默认是同步处理。(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	     * - 属性dataType：客户端数据解析的方式。如果指定为json类型，则会把获取到的数据作为一个JavaScript对象来解析，并且把构建好的对象作为结果返回；如果指定为html类型，任何内嵌的JavaScript都会在HTML作为一个字符串返回之前执行；支持的数据类型有html、json、jsonp、script或者text
	     * - 属性closeProgress：请求完成时，是否需要解除屏幕锁定，与needBlock参数配套使用
	     * - 其他用户参数属性，需要传递到后台的信息。
	     * 
	     * @param {Object} success  请求成功的回调函数，此参数可以不传，系统提示操作成功
	     * @param {Object} failure  请求失败的回调函数，此参数可以不传，系统提示操作失败
	     * 
	   	 * @method ajaxSubmit
	   	 */
       ajaxSubmit: function(options, success, failure){
           var url = options.url,
           	   method = options.method || 'POST',
           	   param,
               strParam,
               index = url.indexOf('?'),
               needBlock = options.needBlock !== false,
               async = options.async !== false,
               dataType = options.dataType || 'json',
               closeProgress = options.closeProgress !== false;
           if(!options.mime){
               options.mime = 'json';
           }
           //url中包含的参数
           if(-1 !== index && index !== url.length-1){
               strParam = url.substring(index+1).split('&');
               url = url.substring(0, index+1);
               for(var i=0,len=strParam.length; i<len; i++)
               {
                   if(strParam[i]){
                       if(-1 === strParam[i].indexOf('=')){
                           options[strParam[i]]='';
                       }else{
                           param = strParam[i].split('=');
                           options[param[0]]=param[1];
                       }
                   }
               }
           }
           $c.deleteProperties(options,['url', 'method', 'needBlock','async','dataType','closeProgress']);
           $.ajax({
               url 	: url,
               type	: method,
               async 	: async,
               data	: options,
               dataType: dataType,
               beforeSend : function(request){
                   if(needBlock){
                	   $.messager.progress();
                   }
                   if($consts.token){
                	   request.setRequestHeader("X-Auth-Token", $consts.token);
                   }
               },
               success : function(data, status, xhr){
                   if(dataType === 'json'){
                       if(typeof data === 'string'){
                           data = $c.parseJson(data);
                       }
                       var status = data.success,
                           msg = data.message || data.info,
                           data = data.data || data;
                       if(status === false){
                           if(typeof failure === 'function'){
                               failure.call(xhr, data, options);
                           }else if(data.detail || data.message){
                        	   $.messager.alert('错误提示',data.detail || data.message,'error'); 
                           }else if($.isArray(data.errors)){
                        	   $.messager.alert('错误提示',$.map(data.errors, function(i){return i.message;}).join('</br>'),'error'); 
                           }else{
                        	   $.messager.alert('错误提示','使用Ajax提交'+url+'出现错误','error'); 
                           }
                       }else{
                           if(typeof success === 'function'){
                               success.call(xhr, data, options);
                           }else{
                        	   $.messager.alert('系统提示','操作成功','info'); 
                           }
                       }
                   }else if(typeof success === 'function'){
                       success.call(xhr, data, options, status);
                   }
               },
               error	: function(xhr, status, error){
                   $.messager.alert('错误提示','url:'+xhr.responseText,'error'); 
               },
               complete: function(){
                   if(needBlock && closeProgress){
                	   $.messager.progress('close');
                   }
               }
           });
       },
       
       /**
	   	 * ### 描述
	   	 * ajax提交Form
	   	 * 
	     * @param {String} form  jquery选择器选择到的from对象
	     * @param {Object} options  一个参数对象
	     * 
	     * - 参数对象：{userName:'zs',sex:'mail'},以json的形式封装的对象，后台可以直接通过key获取到对应的参数，或是直接通过formbean进行接收前端的参数
	     * - 函数：提交成功后，执行的函数
	     * 
	     * @param {Object} success  请求成功的回调函数，此参数可以不传，系统提示操作成功
	     * @param {Object} failure  请求失败的回调函数，此参数可以不传，系统提示操作失败
	   	 * @method ajaxSubmitForm
	   	 */
       ajaxSubmitForm: function(form, options, success, failure){
    	   var url = options.url,
    	   	   method = options.method || 'POST',
    	   	   _s;
    	   
    	   $c.deleteProperties(options,['url','method']);
    	   if(method !== 'POST' && method !== 'GET'){
    		   _s = method;
    		   method = 'POST';
    	   }
    	   
    	   $(form).form('submit', {
               url :  url,
               method: method,
               contentType: "text/html",
               dataType: "text/html",
               accept: "text/plain; charset=utf-8",
               onSubmit: function(param){
                   if($(this).form('validate')){
                	   if(_s){
                		   param._method = _s;
                	   }
                       $.extend(param, options);
                       $.messager.progress();
                   }else{
                       return false;
                   }
               },
               success : function(data){
            	   $.messager.progress('close');
                   if(typeof data === 'string'){
                       data = $c.parseJson(data);
                   }
                   var status = data.success,
                       msg = data.message || data.info,
                       data = data.data || data;
                   if(status === false){
                       if(typeof failure === 'function'){
                    	   failure.call(this, data, options);
                       }else if(data.detail || data.message){
                    	   $.messager.alert('错误提示',data.detail || data.message,'error'); 
                       }else if($.isArray(data.errors)){
                    	   $.messager.alert('错误提示',$.map(data.errors, function(i){return i.message;}).join('</br>'),'error'); 
                       }else{
                    	   $.messager.alert('错误提示','Ajax提交表单错误','error'); 
                       }
                   }else{
                       if(typeof success === 'function'){
                    	   success.call(this, data, options);
                       }else{
                    	   $.messager.alert('系统提示','操作成功','info'); 
                       }
                   }
               }
           });
       }
	};
	
	$.extend($c, _c);
	return $c; 
});